import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { compileCollection, splitStatements, type CollectionDefinition } from '../src/lib/content/compiler';
import type { SourceRecord } from '../src/lib/types';

const sources: Record<string, SourceRecord> = {
  reference: { title: 'Example', url: 'https://example.org/path?a=1;b=2' },
};
const sections = [{ id: 'kidney', label: 'Kidney' }];

function fixture(id: string, question = 'Has this been found?') {
  return `/* comment ; URL https://example.org/test */
#define_ruleblock(${id}, {description: "A; // statement", atlas: {
  schema_version: "1", version: "0.1", disease_label: "Disease ${id}",
  disease_id: "ORPHA:1", source_refs: ["reference"]
}});
proteinuria => eadv.phen_proteinuria.val.last();
#define_attribute(proteinuria, {label: "Proteinuria", atlas: {
  role: "input", feature_id: "proteinuria", source_attribute: "phen_proteinuria",
  section: "kidney", question: "${question}", answer_type: "presence",
  hpo_id: "HP:0000093", source_refs: ["reference"],
  help: "See https://example.org/a;b // still text", nested: {note: "brace } ; and /*"}
}});`;
}

function definition(id: string, rules: string[]): CollectionDefinition {
  return { schemaVersion: '1', id, title: id, description: 'Fixture', version: '1', sections, rules };
}

describe('Atlas content compilation', () => {
  it('parses nested metadata with punctuation, URLs and comments without corrupting executable rules', () => {
    const text = fixture('disease_a');
    expect(splitStatements(text, 'rules/disease_a.prb')).toHaveLength(3);
    const manifest = compileCollection(definition('one', ['rules/disease_a.prb']),
      [{ path: 'rules/disease_a.prb', text }], sources);
    expect(manifest.questions).toHaveLength(1);
    expect(manifest.questions[0].help).toContain('https://example.org/a;b // still text');
    expect(manifest.rules[0].source).toBe('proteinuria => eadv.phen_proteinuria.val.last();');
    expect(manifest.rules[0].authoredSource).toBe(text);
    expect(manifest.questions[0].diseases[0].inputLine).toBe(
      text.slice(0, text.indexOf('#define_attribute(proteinuria')).split('\n').length,
    );
  });

  it('rejects executable directive values', () => {
    const text = fixture('disease_a').replace('"Has this been found?"', '(() => "bad")()');
    expect(() => compileCollection(definition('one', ['rules/disease_a.prb']),
      [{ path: 'rules/disease_a.prb', text }], sources)).toThrow(/invalid data-only directive value/);
  });

  it('rejects HTML in authored question text', () => {
    const text = fixture('disease_a', '<strong>Has this been found?</strong>');
    expect(() => compileCollection(definition('one', ['rules/disease_a.prb']),
      [{ path: 'rules/disease_a.prb', text }], sources)).toThrow(/plain text without HTML/);
  });

  it('deduplicates a shared feature and preserves both disease associations', () => {
    const manifest = compileCollection(definition('one', ['rules/disease_a.prb', 'rules/disease_b.prb']), [
      { path: 'rules/disease_a.prb', text: fixture('disease_a') },
      { path: 'rules/disease_b.prb', text: fixture('disease_b') },
    ], sources);
    expect(manifest.questions).toHaveLength(1);
    expect(manifest.questions[0].diseases.map(disease => disease.ruleId)).toEqual(['disease_a', 'disease_b']);
  });

  it('reports both source locations for conflicting shared metadata', () => {
    expect(() => compileCollection(definition('one', ['rules/disease_a.prb', 'rules/disease_b.prb']), [
      { path: 'rules/disease_a.prb', text: fixture('disease_a') },
      { path: 'rules/disease_b.prb', text: fixture('disease_b', 'Different question?') },
    ], sources)).toThrow(/rules\/disease_b\.prb:\d+: conflicting definition.*rules\/disease_a\.prb:\d+/);
  });

  it('isolates membership of a synthetic second collection', () => {
    const all = [
      { path: 'rules/disease_a.prb', text: fixture('disease_a') },
      { path: 'rules/disease_b.prb', text: fixture('disease_b') },
    ];
    const first = compileCollection(definition('one', ['rules/disease_a.prb']), all, sources);
    const second = compileCollection(definition('two', ['rules/disease_b.prb']), all, sources);
    expect(first.questions[0].diseases.map(d => d.ruleId)).toEqual(['disease_a']);
    expect(second.questions[0].diseases.map(d => d.ruleId)).toEqual(['disease_b']);
    expect(first.rules.map(rule => [rule.id, rule.authoredSource])).toEqual([['disease_a', all[0].text]]);
    expect(second.rules.map(rule => [rule.id, rule.authoredSource])).toEqual([['disease_b', all[1].text]]);
    expect(first.questions[0].diseases[0].inputLine).toBeGreaterThan(1);
  });

  it('compiles the ten authored IKD questions with five associations per rule', () => {
    const root = new URL('../content/', import.meta.url);
    const collection = JSON.parse(readFileSync(new URL('collections/ikd/collection.json', root), 'utf8'));
    const sourceRecords = JSON.parse(readFileSync(new URL('sources.json', root), 'utf8'));
    const rules = collection.rules.map((path: string) => ({
      path, text: readFileSync(new URL(`collections/ikd/${path}`, root), 'utf8'),
    }));
    const manifest = compileCollection(collection, rules, sourceRecords);
    for (const rule of manifest.rules) {
      const committed = rules.find((item: { path: string; text: string }) => item.path.endsWith(`${rule.id}.prb`));
      expect(rule.authoredSource).toBe(committed?.text);
      expect(rule.assetPath).toBe(`/generated/ruleblocks/ikd/${rule.id}-test.prb`);
      for (const question of manifest.questions) {
        const association = question.diseases.find(disease => disease.ruleId === rule.id);
        if (!association) continue;
        expect(rule.authoredSource.split('\n')[association.inputLine - 1])
          .toMatch(new RegExp(`^#define_attribute\\(${question.featureId},`));
      }
    }
    expect(manifest.questions).toHaveLength(10);
    expect(manifest.questions.filter(q => q.diseases[0].ruleId === 'ikd_fabry')).toHaveLength(5);
    expect(manifest.questions.filter(q => q.diseases[0].ruleId === 'ikd_tuberous_sclerosis')).toHaveLength(5);
    expect(Object.fromEntries(manifest.questions.map(q => [q.featureId, [q.hpoId, q.diseases[0].ruleId]]))).toEqual({
      acroparesthesia: ['HP:0031006', 'ikd_fabry'],
      angiokeratoma: ['HP:0001014', 'ikd_fabry'],
      hypohidrosis: ['HP:0000966', 'ikd_fabry'],
      cornea_verticillata: ['HP:0500008', 'ikd_fabry'],
      proteinuria: ['HP:0000093', 'ikd_fabry'],
      hypomelanotic_macule: ['HP:0009719', 'ikd_tuberous_sclerosis'],
      angiofibromas: ['HP:0010615', 'ikd_tuberous_sclerosis'],
      shagreen_patch: ['HP:0009721', 'ikd_tuberous_sclerosis'],
      renal_angiomyolipoma: ['HP:0006772', 'ikd_tuberous_sclerosis'],
      seizure: ['HP:0001250', 'ikd_tuberous_sclerosis'],
    });
  });
});
