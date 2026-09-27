import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import collections from '../src/generated/collections.json';
import { compileCollection } from '../src/lib/content/compiler';
import { buildAssessmentBundle } from '../src/lib/fhir';
import { evaluateCollectionDemo } from '../src/lib/runtime/ruleEngine';
import type { CollectionManifest } from '../src/lib/types';

const manifest = collections.ikd as CollectionManifest;
const sessionId = 'ea2b045f-4133-4c55-8836-50f68fc649a0';
const expected: Record<string, string[]> = {
  family_history_autosomal_dominant: [
    'ikd_tuberous_sclerosis', 'ikd_alport', 'ikd_hnf1b', 'ikd_vhl',
    'ikd_adtkd_umod', 'ikd_adtkd_muc1',
  ],
  family_history_autosomal_recessive: ['ikd_alport', 'ikd_arpkd'],
  family_history_x_linked: ['ikd_fabry', 'ikd_alport'],
};

describe('authored family-history patterns', () => {
  it('shares exactly three prompts across the relevant ruleblocks with exact source links', () => {
    const questions = manifest.questions.filter(question => question.evidenceKind === 'family_history');
    expect(questions).toHaveLength(3);
    for (const question of questions) {
      expect(question.section).toBe('family_history');
      expect(question.diseases.map(disease => disease.ruleId)).toEqual(expected[question.featureId]);
      for (const disease of question.diseases) {
        const rule = manifest.rules.find(item => item.id === disease.ruleId)!;
        const source = readFileSync(new URL(`../content/collections/ikd/rules/${rule.id}.prb`, import.meta.url), 'utf8');
        expect(rule.authoredSource).toBe(source);
        expect(source.split('\n')[disease.inputLine - 1])
          .toBe(`#define_attribute(${question.featureId}, {`);
        expect(rule.scoring?.weights[question.featureId]).toBe(0);
      }
    }
  });

  it('exports the checked patterns and leaves every research score unchanged', () => {
    const answers = Object.fromEntries(Object.keys(expected).map(featureId => [featureId, 'present' as const]));
    const bundle = buildAssessmentBundle(manifest, answers, sessionId);
    const observations = bundle.entry.filter(entry => entry.resource.resourceType === 'Observation');
    for (const featureId of Object.keys(expected)) {
      const observation = observations.find(entry => entry.resource.resourceType === 'Observation' &&
        entry.resource.identifier[0].value === featureId)?.resource;
      expect(observation?.resourceType).toBe('Observation');
      if (observation?.resourceType === 'Observation') {
        expect(observation.valueBoolean).toBe(true);
        expect(observation.note?.[0].text).toContain('does not establish a molecular inheritance mode');
      }
    }
    const withPatterns = evaluateCollectionDemo(manifest, bundle);
    const withoutPatterns = evaluateCollectionDemo(manifest,
      buildAssessmentBundle(manifest, {}, sessionId));
    for (const result of withPatterns) {
      expect(result.weightedScore).toBe(withoutPatterns.find(item => item.ruleId === result.ruleId)?.weightedScore);
      expect(result.presentCount).toBe(Object.values(expected).filter(ids => ids.includes(result.ruleId)).length);
      expect(result.contributions?.filter(item => item.weight === 0 && item.present))
        .toHaveLength(result.presentCount);
    }
  });

  it('rejects a score weight assigned to a family-history prompt', () => {
    const root = new URL('../content/', import.meta.url);
    const definition = JSON.parse(readFileSync(new URL('collections/ikd/collection.json', root), 'utf8'));
    const sources = JSON.parse(readFileSync(new URL('sources.json', root), 'utf8'));
    const rules = definition.rules.map((path: string) => ({
      path,
      text: readFileSync(new URL(`collections/ikd/${path}`, root), 'utf8'),
    }));
    const fabry = rules.find((rule: { path: string }) => rule.path.endsWith('ikd_fabry.prb'))!;
    fabry.text = fabry.text.replace('"family_history_x_linked": 0', '"family_history_x_linked": 1');
    expect(() => compileCollection(definition, rules, sources)).toThrow(/only family-history inputs may have zero score weight/);
  });
});
