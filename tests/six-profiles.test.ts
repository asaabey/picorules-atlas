import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import collections from '../src/generated/collections.json';
import evidence from '../reviews/ikd/ciliopathy-evidence.json';
import { compileCollection } from '../src/lib/content/compiler';
import { buildAssessmentBundle } from '../src/lib/fhir';
import { buildHandoffBundle, RULE_ID_SYSTEM, type RuleScoreObservation } from '../src/lib/fhir/handoff';
import type { CollectionManifest } from '../src/lib/types';

const manifest = collections.ikd as CollectionManifest;
const ids = ['ikd_nephronophthisis', 'ikd_nphp1', 'ikd_nphp4', 'ikd_nphp12',
  'ikd_joubert', 'ikd_mainzer_saldino'];
const sessionId = 'be6898ea-5ee3-47b5-88af-813c777a7f37';

describe('six missing IKD entities', () => {
  it('retains exact authored source, individual entity IDs, and a complete evidence crosswalk', () => {
    expect(manifest.rules.slice(8).map(rule => rule.id)).toEqual(ids);
    expect(manifest.questions).toHaveLength(60);
    expect(evidence.associations).toHaveLength(46);
    const pairings = manifest.questions.flatMap(question => question.diseases
      .filter(disease => ids.includes(disease.ruleId))
      .map(disease => `${disease.ruleId}/${question.featureId}/${question.hpoId}`));
    expect(pairings.sort()).toEqual(evidence.associations
      .map(row => `${row.ruleId}/${row.featureId}/${row.hpoId}`).sort());
    for (const rule of manifest.rules.slice(8)) {
      const text = readFileSync(new URL(`../content/collections/ikd/rules/${rule.id}.prb`, import.meta.url), 'utf8');
      expect(rule.authoredSource).toBe(text);
      expect(rule.scoring?.model).toBe('ikd-present-count-v1');
      expect(text).not.toContain('eadv.phen_nephronophthisis.val.last()');
      for (const question of manifest.questions) {
        const association = question.diseases.find(disease => disease.ruleId === rule.id);
        if (!association) continue;
        expect(text.split('\n')[association.inputLine - 1])
          .toBe(`#define_attribute(${question.featureId}, {`);
      }
    }
    expect(manifest.rules.find(rule => rule.id === 'ikd_nphp12')?.diseaseId).toBe('OMIM:613820');
    expect(manifest.rules.find(rule => rule.id === 'ikd_joubert')?.diseaseId).toBe('ORPHA:140874');
    expect(manifest.rules.find(rule => rule.id === 'ikd_mainzer_saldino')?.diseaseId).toBe('ORPHA:140969');
  });

  it('counts clinical findings, shares answers, leaves pedigree context unweighted, and exports a distinct score code', () => {
    const answers = {
      polyuria: 'present' as const, polydipsia: 'present' as const,
      family_history_autosomal_recessive: 'present' as const,
    };
    const assessment = buildAssessmentBundle(manifest, answers, sessionId);
    const { bundle, results } = buildHandoffBundle(manifest, assessment);
    expect(results).toHaveLength(14);
    for (const id of ['ikd_nephronophthisis', 'ikd_nphp1', 'ikd_nphp4', 'ikd_nphp12']) {
      expect(results.find(result => result.ruleId === id)).toMatchObject({
        presentCount: 3, weightedScore: 2, scoringModel: 'ikd-present-count-v1',
      });
    }
    expect(results.find(result => result.ruleId === 'ikd_joubert')?.weightedScore).toBe(0);
    expect(results.find(result => result.ruleId === 'ikd_mainzer_saldino')?.weightedScore).toBe(0);
    expect(manifest.questions.filter(question => question.featureId === 'polyuria')).toHaveLength(1);
    expect(manifest.questions.find(question => question.featureId === 'polyuria')?.diseases).toHaveLength(4);
    const scores = bundle.entry.map(entry => entry.resource).filter((resource): resource is RuleScoreObservation =>
      resource.resourceType === 'Observation' && resource.identifier?.[0]?.system === RULE_ID_SYSTEM);
    expect(scores).toHaveLength(14);
    const nphp1 = scores.find(score => score.identifier?.[0]?.value === 'ikd_nphp1');
    expect(nphp1?.code.coding[0].code).toBe('present-feature-count');
    expect(nphp1?.valueQuantity?.value).toBe(2);
    expect(nphp1?.valueQuantity?.unit).toBe('count');
    expect(nphp1?.note[0].text).toContain('ikd-present-count-v1');
  });

  it('rejects invented non-unit weights in present-count rules', () => {
    const root = new URL('../content/', import.meta.url);
    const definition = JSON.parse(readFileSync(new URL('collections/ikd/collection.json', root), 'utf8'));
    const sources = JSON.parse(readFileSync(new URL('sources.json', root), 'utf8'));
    const rules = definition.rules.map((path: string) => ({
      path, text: readFileSync(new URL(`collections/ikd/${path}`, root), 'utf8'),
    }));
    const nphp1 = rules.find((rule: { path: string }) => rule.path.endsWith('ikd_nphp1.prb'))!;
    nphp1.text = nphp1.text.replace('"polyuria": 1', '"polyuria": 2');
    expect(() => compileCollection(definition, rules, sources))
      .toThrow(/present-count rule must assign one per clinical feature/);
  });

  it('keeps a selected Joubert-only collection free of the other thirteen rule associations', () => {
    const root = new URL('../content/', import.meta.url);
    const definition = JSON.parse(readFileSync(new URL('collections/ikd/collection.json', root), 'utf8'));
    const sources = JSON.parse(readFileSync(new URL('sources.json', root), 'utf8'));
    definition.rules = ['rules/ikd_joubert.prb'];
    const selected = compileCollection(definition, [{
      path: definition.rules[0],
      text: readFileSync(new URL(`collections/ikd/${definition.rules[0]}`, root), 'utf8'),
    }], sources);
    expect(selected.rules.map(rule => rule.id)).toEqual(['ikd_joubert']);
    expect(selected.questions).toHaveLength(8);
    expect(selected.questions.every(question => question.diseases.length === 1 &&
      question.diseases[0].ruleId === 'ikd_joubert')).toBe(true);
    const assessment = buildAssessmentBundle(selected, { molar_tooth_sign: 'present' }, sessionId);
    expect(buildHandoffBundle(selected, assessment).results.map(result => result.ruleId))
      .toEqual(['ikd_joubert']);
  });
});
