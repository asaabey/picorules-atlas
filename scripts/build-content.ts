import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { compileCollection, type CollectionDefinition, type RuleSource } from '../src/lib/content/compiler';
import type { CollectionManifest, SourceRecord } from '../src/lib/types';

const projectRoot = resolve(import.meta.dirname, '..');
const collectionsRoot = resolve(projectRoot, 'content/collections');
const outputPath = resolve(projectRoot, 'src/generated/collections.json');
const assetRoot = resolve(projectRoot, 'public/generated/ruleblocks');
const sourceText = readFileSync(resolve(projectRoot, 'content/sources.json'), 'utf8');
const sources = JSON.parse(sourceText) as Record<string, SourceRecord>;
const manifests: Record<string, CollectionManifest> = {};

for (const folder of readdirSync(collectionsRoot, { withFileTypes: true }).filter(item => item.isDirectory())) {
  const folderPath = resolve(collectionsRoot, folder.name);
  const definitionText = readFileSync(resolve(folderPath, 'collection.json'), 'utf8');
  const definition = JSON.parse(definitionText) as CollectionDefinition;
  if (definition.id !== folder.name) throw new Error(`${folder.name}/collection.json: folder and ID disagree`);
  if (manifests[definition.id]) throw new Error(`duplicate collection ID ${definition.id}`);
  const ruleSources: RuleSource[] = definition.rules.map(rulePath => {
    if (!/^rules\/[a-z][a-z0-9_]*\.prb$/.test(rulePath)) {
      throw new Error(`${folder.name}/collection.json: invalid rule path ${rulePath}`);
    }
    const absolute = resolve(folderPath, rulePath);
    if (relative(folderPath, absolute).startsWith('..') || !existsSync(absolute)) {
      throw new Error(`${folder.name}/collection.json: missing or escaped rule path ${rulePath}`);
    }
    return { path: rulePath, text: readFileSync(absolute, 'utf8') };
  });
  const contentVersion = createHash('sha256')
    .update(definitionText).update(sourceText)
    .update(ruleSources.map(rule => rule.path + rule.text).join('\n'))
    .digest('hex').slice(0, 16);
  manifests[definition.id] = compileCollection(definition, ruleSources, sources, contentVersion);
}

if (!Object.keys(manifests).length) throw new Error('No collections found');
const output = `${JSON.stringify(manifests, null, 2)}\n`;
if (process.argv.includes('--check')) {
  if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8') !== output) {
    throw new Error('Generated collections are stale; run npm run content:build');
  }
  const expected = new Set<string>();
  for (const manifest of Object.values(manifests)) {
    for (const rule of manifest.rules) {
      const path = resolve(projectRoot, `public${rule.assetPath}`);
      expected.add(path);
      if (!existsSync(path) || readFileSync(path, 'utf8') !== rule.authoredSource) {
        throw new Error(`Generated ruleblock is stale: ${rule.assetPath}; run npm run content:build`);
      }
    }
  }
  for (const collection of existsSync(assetRoot) ? readdirSync(assetRoot) : []) {
    const folder = resolve(assetRoot, collection);
    for (const name of readdirSync(folder)) {
      if (!expected.has(resolve(folder, name))) {
        throw new Error(`Unexpected generated ruleblock: ${collection}/${name}; run npm run content:build`);
      }
    }
  }
  console.log(`Validated ${Object.keys(manifests).length} collection(s).`);
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, output);
  rmSync(assetRoot, { recursive: true, force: true });
  for (const manifest of Object.values(manifests)) {
    for (const rule of manifest.rules) {
      const path = resolve(projectRoot, `public${rule.assetPath}`);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, rule.authoredSource, 'utf8');
    }
  }
  console.log(`Built ${Object.keys(manifests).length} collection(s), ${Object.values(manifests).reduce((n, manifest) => n + manifest.questions.length, 0)} questions.`);
}
