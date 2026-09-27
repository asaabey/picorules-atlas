"""Download pinned benchmark inputs outside the repository (Linux x86_64).

No source files are modified. Existing files must match their recorded hashes.
"""
import argparse
import hashlib
import json
import tarfile
import urllib.request
import zipfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--cache', required=True, type=Path)
    args = parser.parse_args()
    cache = args.cache.resolve()
    if cache == ROOT or ROOT in cache.parents:
        parser.error('Use an external cache, not the benchmark source directory')
    cache.mkdir(parents=True, exist_ok=True)
    manifest = json.loads((ROOT / 'resources.json').read_text())

    def fetch(resource):
        path = cache / resource['name']
        if not path.exists():
            temporary = path.with_suffix(path.suffix + '.partial')
            with urllib.request.urlopen(resource['url'], timeout=60) as response, temporary.open('wb') as out:
                while chunk := response.read(1024 * 1024):
                    out.write(chunk)
            if hashlib.sha256(temporary.read_bytes()).hexdigest() != resource['sha256']:
                raise ValueError(f'{resource["name"]}: upstream data changed; review and repin explicitly')
            temporary.replace(path)
        if hashlib.sha256(path.read_bytes()).hexdigest() != resource['sha256']:
            raise ValueError(f'{path}: existing file does not match pinned resource')
        print(f'Checked {resource["name"]}', flush=True)

    with ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(fetch, manifest['resources']))
    if not (cache / manifest['jarRelativePath']).exists():
        with zipfile.ZipFile(cache / 'lirical.zip') as archive:
            for name in archive.namelist():
                if not (cache / name).resolve().is_relative_to(cache):
                    raise ValueError('Archive member escapes destination')
            archive.extractall(cache)
    if not (cache / manifest['javaRelativePath']).exists():
        with tarfile.open(cache / 'jre.tar.gz') as archive:
            archive.extractall(cache, filter='data')
    print(f'Ready: {cache}')


if __name__ == '__main__':
    main()
