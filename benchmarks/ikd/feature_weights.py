"""Export per-finding LIRICAL contributions for review, never a patient diagnosis.

The engine evaluates each query term independently. A single batch query permits
extraction of the full matrix; its composite scores/probabilities are discarded.
"""
import argparse
import csv
import json
import math
from pathlib import Path

from benchmark import ROOT, run_lirical, sha256


def main():
    parser = argparse.ArgumentParser()
    for name in ('data', 'java', 'jar', 'work'):
        parser.add_argument('--' + name, type=Path, required=True)
    args = parser.parse_args()
    baseline = json.loads((ROOT / 'atlas-baseline.json').read_text())
    features = {f['hpoId']: f for r in baseline['rules'] for f in r['inputs']}
    report = {'coverage': baseline['rules'], 'cases': [{
        'id': 'feature_contributions', 'normalizedPresent': sorted(features), 'normalizedAbsent': [],
    }]}
    run_lirical(args, report)
    engine = report['cases'][0]['lirical']
    rows = []
    for result in engine['result']:
        if {f['query'] for f in result['observed']} != set(features):
            raise ValueError('Engine did not return every requested feature contribution')
        disease = next(r for r in baseline['rules'] if r['diseaseId'] == result['diseaseId'])
        for feature in result['observed']:
            query = features[feature['query']]
            rows.append({
                'rule_id': disease['ruleId'], 'disease_id': disease['diseaseId'],
                'feature_id': query['featureId'], 'hpo_id': feature['query'],
                'label': query['label'], 'match_type': feature['matchType'],
                'matched_hpo_id': feature['match'], 'likelihood_ratio': feature['lr'],
                'log10_weight': math.log10(feature['lr']),
                'declared_in_atlas_rule': query['featureId'] in {f['featureId'] for f in disease['inputs']},
                'status': 'research_candidate_not_clinically_calibrated',
            })
    rows.sort(key=lambda row: (row['rule_id'], row['feature_id']))
    destination = ROOT / 'candidate-weights.csv'
    with destination.open('w') as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    provenance = {
        'engine': 'LIRICAL 2.4.1', 'hpo': 'v2026-09-01', 'rows': len(rows),
        'engineOutputSha256': engine['outputSha256'],
        'weightsSha256': sha256(destination),
        'scriptSha256': sha256(Path(__file__)),
        'resourceManifestSha256': sha256(ROOT / 'resources.json'),
        'interpretation': 'Per-present-finding log10 LR from the published engine. No composite score or probability from the batch query is retained. Nonmatches can have negative weights due to engine heuristics; do not deploy as clinical exclusion criteria.',
    }
    (ROOT / 'candidate-weights-provenance.json').write_text(json.dumps(provenance, indent=2) + '\n')
    print(f'Wrote {len(rows)} candidate contributions')


if __name__ == '__main__':
    main()
