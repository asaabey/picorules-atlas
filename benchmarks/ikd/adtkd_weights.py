"""Reproduce the selected ADTKD contributions using the existing pinned resources.

Usage: python3 adtkd_weights.py --data /tmp/atlas-ikd-benchmark
Only observed feature contributions are retained, never composite probabilities.
"""
import argparse
import hashlib
import json
import math
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--data', type=Path, required=True)
    args = parser.parse_args()
    data = args.data.resolve()
    destination = ROOT / 'adtkd-weights.json'
    saved = json.loads(destination.read_text())
    resources = json.loads((ROOT / 'resources.json').read_text())
    jar = next(data.glob('lirical-cli-2.4.1/*.jar'))
    assert sha(jar) == resources['jarSha256']
    for resource in resources['resources']:
        if not resource['name'].endswith(('.zip', '.tar.gz')):
            assert sha(data / resource['name']) == resource['sha256']
    output = data / 'adtkd-reproduction'
    output.mkdir(exist_ok=True)
    features = list(dict.fromkeys(row['hpoId'] for row in saved['weights']))
    with (output / 'weights.log').open('w') as log:
        subprocess.run([
            str(data / 'jdk-17.0.20.1+1-jre/bin/java'), '-Xmx2g', '-jar', str(jar),
            'prioritize', '-d', str(data), '--use-orphanet', '--target-diseases',
            'OMIM:162000,OMIM:174000', '-p', ','.join(features), '-f', 'json',
            '-o', str(output), '-x', 'weights',
        ], stdout=log, stderr=log, check=True, timeout=180)
    raw = json.loads((output / 'weights.json').read_text())
    assert {row['diseaseId'] for row in raw['analysisResults']} == {'OMIM:162000', 'OMIM:174000'}
    for row in saved['weights']:
        disease = next(r for r in raw['analysisResults'] if r['diseaseId'] == row['diseaseId'])
        feature = next(f for f in disease['observedPhenotypicFeatures'] if f['query'] == row['hpoId'])
        assert row['weight'] == round(math.log10(feature['lr']), 6)
        assert row['likelihoodRatio'] == feature['lr']
        assert row['matchedHpoId'] == feature['match']
    print('Verified all 11 ADTKD weights against pinned LIRICAL resources.')


if __name__ == '__main__':
    main()
