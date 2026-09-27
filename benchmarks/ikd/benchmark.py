"""Offline, synthetic six-profile benchmark. Never imported by the Atlas app."""
import argparse
import csv
import hashlib
import json
import math
import subprocess
from collections import Counter, defaultdict
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PINNED = {
    'hp.json': 'a7b3a012e7b4007a35a7cf8da35f2373b54cc16907f80d13d62470d31f833501',
    'phenotype.hpoa': 'e89aa39c8f97bf5a52c5d160f9250a603681d630ade8ec2679d84ac5aece1f72',
}


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def term_id(iri):
    return iri.rsplit('/', 1)[-1].replace('HP_', 'HP:')


class Similarity:
    """Mean best-match Resnik similarity, not full Phenomizer or a probability."""

    def __init__(self, parents, profiles):
        self.parents = parents
        self.profiles = profiles
        self.counts = Counter()
        for terms in profiles.values():
            inherited = set().union(*(self.ancestors(t) for t in terms))
            self.counts.update(inherited)
        self.size = len(profiles)

    @lru_cache(maxsize=None)
    def ancestors(self, term):
        result = {term}
        for parent in self.parents.get(term, ()):
            result.update(self.ancestors(parent))
        return frozenset(result)

    def information(self, term):
        count = self.counts.get(term, 0)
        return -math.log2(count / self.size) if count else None

    def nonredundant(self, terms):
        terms = set(terms)
        return sorted(t for t in terms if not any(
            t != other and t in self.ancestors(other) for other in terms))

    def score(self, query, disease):
        if not query:
            return None
        matches = []
        for term in query:
            best = 0.0
            for other in self.profiles[disease]:
                for ancestor in self.ancestors(term) & self.ancestors(other):
                    best = max(best, self.information(ancestor) or 0.0)
            matches.append(best)
        return sum(matches) / len(matches)


def load_model(data):
    for name, digest in PINNED.items():
        if sha256(data / name) != digest:
            raise ValueError(f'{name} differs from pinned HPO v2026-09-01 input')
    graph = json.loads((data / 'hp.json').read_text())['graphs'][0]
    nodes = {term_id(n['id']): n for n in graph['nodes']}
    parents = defaultdict(set)
    for edge in graph['edges']:
        if edge['pred'] == 'is_a':
            parents[term_id(edge['sub'])].add(term_id(edge['obj']))
    profiles = defaultdict(set)
    negatives = defaultdict(set)
    with (data / 'phenotype.hpoa').open() as handle:
        for row in csv.DictReader((line for line in handle if not line.startswith('#')), delimiter='\t'):
            if row['aspect'] != 'P' or not row['database_id'].startswith('ORPHA:'):
                continue
            hpo = row['hpo_id']
            if hpo not in nodes or nodes[hpo].get('meta', {}).get('deprecated'):
                raise ValueError(f'Invalid/obsolete source annotation: {hpo}')
            if row['qualifier'] == 'NOT':
                negatives[row['database_id']].add(hpo)
            else:
                profiles[row['database_id']].add(hpo)
    return Similarity(parents, profiles), negatives


def ranked(values):
    """Competition ranks with tied leaders preserved; no arbitrary tie breaking."""
    return {key: None if value is None else 1 + sum(
        other is not None and other > value + 1e-10 for other in values.values())
        for key, value in values.items()}


def prepare(data):
    baseline = json.loads((ROOT / 'atlas-baseline.json').read_text())
    cases = json.loads((ROOT / 'cases.json').read_text())['cases']
    model, negatives = load_model(data)
    targets = baseline['rules']
    for target in targets:
        if target['diseaseId'] not in model.profiles:
            raise ValueError(f'Missing exact target {target["diseaseId"]}')
    coverage = [{
        'diseaseId': t['diseaseId'], 'label': t['label'],
        'fullProfileTerms': len(model.profiles[t['diseaseId']]),
        'explicitNegativeTerms': len(negatives[t['diseaseId']]),
        'atlasInputs': len(t['inputs']),
        'unmatchedAtlasInputs': [f['hpoId'] for f in t['inputs']
                                 if f['hpoId'] not in model.profiles[t['diseaseId']]],
    } for t in targets]
    if any(row['unmatchedAtlasInputs'] for row in coverage):
        raise ValueError('An Atlas input is not paired with its pinned source profile')
    results = []
    for case in cases:
        positive = model.nonredundant(case['present'])
        # Excluded parent terms are stronger than excluded children: keep parents.
        negative = sorted(t for t in set(case['absent']) if not any(
            other != t and other in model.ancestors(t) for other in case['absent']))
        if any(n in model.ancestors(p) for p in positive for n in negative):
            raise ValueError(f'Contradictory evidence in {case["id"]}')
        for term in positive + negative:
            if term not in model.parents:
                raise ValueError(f'Unknown query term {term}')
        scores = {t['diseaseId']: model.score(positive, t['diseaseId']) for t in targets}
        counts = {t['diseaseId']: sum(f['hpoId'] in case['present'] for f in t['inputs'])
                  for t in targets}
        results.append({**case, 'normalizedPresent': positive, 'normalizedAbsent': negative,
                        'removedRedundantPresent': sorted(set(case['present']) - set(positive)),
                        'informationSimilarity': scores, 'similarityRanks': ranked(scores),
                        'equalCount': counts, 'equalCountRanks': ranked(counts) if positive else
                        {key: None for key in counts},
                        'equalCountPrompts': [t['diseaseId'] for t in targets
                                              if counts[t['diseaseId']] >= t['threshold']],
                        'notCollectedByAtlas': sorted((set(case['present']) | set(case['absent'])) -
                            {f['hpoId'] for t in targets for f in t['inputs']})})
    feature_weights = []
    for target in targets:
        for feature in target['inputs']:
            feature_weights.append({**feature, 'diseaseId': target['diseaseId'],
                                    'backgroundProfileCount': model.counts[feature['hpoId']],
                                    'informationBits': model.information(feature['hpoId'])})
    return {'atlasContentVersion': baseline['contentVersion'], 'hpoRelease': 'v2026-09-01',
            'background': {'method': 'Positive P-aspect Orphanet profiles; ancestors propagated; one count per disease',
                           'profileCount': model.size},
            'coverage': coverage, 'featureInformation': feature_weights, 'cases': results}


def run_lirical(args, report):
    resources = json.loads((ROOT / 'resources.json').read_text())
    if sha256(args.jar) != resources['jarSha256']:
        raise ValueError('LIRICAL jar differs from the pinned engine')
    for resource in resources['resources']:
        if resource['name'].endswith(('.zip', '.tar.gz')):
            continue
        if sha256(args.data / resource['name']) != resource['sha256']:
            raise ValueError(f'LIRICAL resource changed: {resource["name"]}')
    args.work.mkdir(parents=True, exist_ok=True)
    target_ids = ','.join(t['diseaseId'] for t in report['coverage'])
    for case in report['cases']:
        if not case['normalizedPresent'] and not case['normalizedAbsent']:
            case['lirical'] = {'status': 'not_run_no_evidence'}
            continue
        command = [str(args.java), '-Xmx2g', '-jar', str(args.jar), 'prioritize',
                   '-d', str(args.data), '--use-orphanet', '--target-diseases', target_ids,
                   '-f', 'json', '-o', str(args.work), '-x', case['id']]
        if case['normalizedPresent']:
            command += ['-p', ','.join(case['normalizedPresent'])]
        if case['normalizedAbsent']:
            command += ['-n', ','.join(case['normalizedAbsent'])]
        with (args.work / f'{case["id"]}.log').open('w') as log:
            subprocess.run(command, stdout=log, stderr=subprocess.STDOUT, check=True, timeout=180)
        raw_path = args.work / f'{case["id"]}.json'
        raw = json.loads(raw_path.read_text())
        results = raw['analysisResults']
        if {r['diseaseId'] for r in results} != set(target_ids.split(',')) or len(results) != 6:
            raise ValueError('LIRICAL did not return exactly the six requested profiles')
        summaries = [{
            'diseaseId': r['diseaseId'], 'compositeLR': r['compositeLR'],
            'log10LR': math.log10(r['compositeLR']),
            'modelPretestProbability': r['pretestProbability'],
            'observed': [{k: f[k] for k in ('query', 'match', 'matchType', 'lr')}
                         for f in r['observedPhenotypicFeatures']],
            'excluded': [{k: f[k] for k in ('query', 'match', 'matchType', 'lr')}
                         for f in r['excludedPhenotypicFeatures']],
        } for r in results]
        case['lirical'] = {'status': 'completed', 'outputSha256': sha256(raw_path),
                           'result': summaries,
                           'ranks': ranked({r['diseaseId']: r['log10LR'] for r in summaries})}
        print(f'LIRICAL completed {case["id"]}', flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--data', type=Path, required=True)
    parser.add_argument('--java', type=Path)
    parser.add_argument('--jar', type=Path)
    parser.add_argument('--work', type=Path)
    parser.add_argument('--output', type=Path, default=ROOT / 'results.json')
    args = parser.parse_args()
    report = prepare(args.data)
    if any((args.java, args.jar, args.work)) and not all((args.java, args.jar, args.work)):
        parser.error('--java, --jar and --work must be supplied together')
    if args.java:
        run_lirical(args, report)
        report['liricalVersion'] = '2.4.1'
        report['liricalJarSha256'] = sha256(args.jar)
    else:
        for case in report['cases']:
            case['lirical'] = {'status': 'not_run'}
    report['provenance'] = {name: sha256(args.data / name) for name in PINNED}
    report['benchmarkInputHashes'] = {name: sha256(ROOT / name) for name in
                                      ('cases.json', 'atlas-baseline.json', 'benchmark.py', 'resources.json')}
    args.output.write_text(json.dumps(report, indent=2, allow_nan=False) + '\n')
    print(f'Wrote {args.output}', flush=True)


if __name__ == '__main__':
    main()
