import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { compileCollection } from '../src/lib/content/compiler';
import { assertReferenceImageAsset } from '../src/lib/content/referenceImageAsset';
import type { CollectionManifest, SourceRecord } from '../src/lib/types';

const contentRoot = new URL('../content/', import.meta.url);
const definition = JSON.parse(readFileSync(new URL('collections/ikd/collection.json', contentRoot), 'utf8'));
const sources = JSON.parse(readFileSync(new URL('sources.json', contentRoot), 'utf8')) as
  Record<string, SourceRecord>;
const rules = definition.rules.map((path: string) => ({
  path, text: readFileSync(new URL(`collections/ikd/${path}`, contentRoot), 'utf8'),
}));

describe('authored reference images', () => {
  it('links six visible findings to exact licensed static assets', () => {
    const manifest = compileCollection(definition, rules, sources) as CollectionManifest;
    const linked = manifest.questions.filter(question => question.referenceImage);
    expect(linked.map(question => question.featureId).sort()).toEqual([
      'angiofibromas', 'angiokeratoma', 'cornea_verticillata',
      'hypomelanotic_macule', 'renal_angiomyolipoma', 'shagreen_patch',
    ]);
    for (const question of linked) {
      const image = question.referenceImage!;
      const bytes = readFileSync(new URL(`../public${image.path}`, import.meta.url));
      expect(() => assertReferenceImageAsset(image, bytes)).not.toThrow();
      expect(image.sourceUrl).toMatch(/^https:\/\/(commons\.wikimedia\.org\/wiki\/File:|pmc\.ncbi\.nlm\.nih\.gov\/articles\/)/);
      expect(image.license).toMatch(/^CC BY/);
      const altered = Buffer.from(bytes);
      altered[altered.length - 1] ^= 1;
      expect(() => assertReferenceImageAsset(image, altered)).toThrow(/checksum differs/);
    }
    expect(linked.find(question => question.featureId === 'shagreen_patch')?.referenceImage?.path)
      .toBe(linked.find(question => question.featureId === 'hypomelanotic_macule')?.referenceImage?.path);
  });

  it('rejects external image URLs and markup in image descriptions', () => {
    const external = rules.map((rule: { path: string; text: string }) => ({ ...rule }));
    external[0].text = external[0].text.replace(
      '/reference-images/fabry-angiokeratomas.jpg', 'https://example.org/patient.jpg');
    expect(() => compileCollection(definition, external, sources)).toThrow(/local reference-images asset/);
    const markup = rules.map((rule: { path: string; text: string }) => ({ ...rule }));
    markup[0].text = markup[0].text.replace('Examples of Fabry-associated angiokeratomas',
      '<script>Examples</script> of Fabry-associated angiokeratomas');
    expect(() => compileCollection(definition, markup, sources)).toThrow(/plain text without HTML/);
  });
});
