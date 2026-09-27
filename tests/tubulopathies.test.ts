import { describe, expect, it } from 'vitest';
import collections from '../src/generated/collections.json';
import evidence from '../reviews/ikd/tubulopathy-evidence.json';
import { createAnswers } from '../src/lib/assessment/answers';
import { buildAssessmentBundle } from '../src/lib/fhir';
import { buildHandoffBundle, RULE_ID_SYSTEM } from '../src/lib/fhir/handoff';
import type { AnswerState, CollectionManifest } from '../src/lib/types';

const manifest = collections.ikd as CollectionManifest;
const sessionId = '8a0501be-26cb-4750-ad11-35df9e63d996';
const ids = ['ikd_gitelman', 'ikd_bartter', 'ikd_east', 'ikd_drta', 'ikd_dent',
  'ikd_cystinosis', 'ikd_lowe', 'ikd_fhhnc', 'ikd_hhrh', 'ikd_xlh', 'ikd_liddle',
  'ikd_gordon', 'ikd_pha1', 'ikd_ndi'];

function assess(present: string[]) {
  const answers: Record<string, AnswerState> = createAnswers(manifest);
  for (const id of present) answers[id] = 'present';
  return buildHandoffBundle(manifest, buildAssessmentBundle(manifest, answers, sessionId));
}

describe('inherited tubulopathy extension', () => {
  it('has one question per feature and HPO term, with all new associations sourced', () => {
    expect(manifest.rules.slice(14).map(rule => rule.id)).toEqual(ids);
    expect(new Set(manifest.questions.map(q => q.featureId)).size).toBe(95);
    expect(new Set(manifest.questions.map(q => q.hpoId)).size).toBe(95);
    expect(manifest.questions).toHaveLength(95);
    expect(evidence.terminology.newTerms).toHaveLength(35);
    for (const term of evidence.terminology.newTerms) {
      expect(manifest.questions.find(q => q.featureId === term.featureId)?.hpoId).toBe(term.hpoId);
    }
    const newAssociations = manifest.questions.flatMap(q => q.diseases
      .filter(d => ids.includes(d.ruleId) || (d.ruleId === 'ikd_hnf1b' &&
        ['hypomagnesemia', 'renal_magnesium_wasting', 'renal_cysts'].includes(q.featureId)))
      .map(d => `${d.ruleId}/${q.featureId}/${q.hpoId}`));
    expect(newAssociations.sort()).toEqual(evidence.associations
      .map(row => `${row.ruleId}/${row.featureId}/${row.hpoId}`).sort());
    for (const row of evidence.associations) expect(manifest.sources[row.sourceId]).toBeDefined();
  });

  it('defaults all findings to absent and leaves pedigree-only answers unweighted', () => {
    expect(new Set(Object.values(createAnswers(manifest)))).toEqual(new Set(['absent']));
    for (const present of [[], ['family_history_autosomal_dominant',
      'family_history_autosomal_recessive', 'family_history_x_linked']]) {
      const { results } = assess(present);
      expect(results).toHaveLength(28);
      expect(results.every(result => result.weightedScore === 0 && !result.flagged)).toBe(true);
    }
    const assessment = buildAssessmentBundle(manifest, {}, sessionId);
    const observations = assessment.entry.map(entry => entry.resource)
      .filter(resource => resource.resourceType === 'Observation');
    expect(observations).toHaveLength(95);
    expect(observations.every(observation => observation.valueBoolean === false)).toBe(true);
  });

  it('shares blood magnesium across profiles without inferring urinary magnesium loss', () => {
    const { bundle, results } = assess(['hypomagnesemia']);
    expect(results.filter(result => result.weightedScore! > 0)
      .map(result => [result.ruleId, result.weightedScore]))
      .toEqual([['ikd_hnf1b', 1], ['ikd_gitelman', 1], ['ikd_east', 1], ['ikd_fhhnc', 1]]);
    const hnf = results.find(result => result.ruleId === 'ikd_hnf1b')!;
    expect(hnf.scoringModel).toBe('ikd-present-count-v1');
    expect(hnf.contributions?.find(item => item.featureId === 'renal_magnesium_wasting'))
      .toMatchObject({ present: false, value: 0 });
    const score = bundle.entry.map(entry => entry.resource).find(resource =>
      resource.resourceType === 'Observation' && resource.identifier?.some(identifier =>
        identifier.system === RULE_ID_SYSTEM && identifier.value === 'ikd_hnf1b'));
    expect(score).toMatchObject({ code: { coding: [{ code: 'present-feature-count' }] },
      valueQuantity: { value: 1, unit: 'count' } });
  });

  it.each([
    ['ikd_gitelman', ['hypokalemia', 'metabolic_alkalosis', 'hypomagnesemia', 'hypocalciuria'], 4],
    ['ikd_bartter', ['hypokalemia', 'polyhydramnios', 'premature_birth'], 3],
    ['ikd_east', ['seizure', 'ataxia', 'hypokalemia'], 3],
    ['ikd_drta', ['hyperchloremic_metabolic_acidosis', 'alkaline_urine', 'nephrocalcinosis'], 3],
    ['ikd_dent', ['low_molecular_weight_proteinuria', 'hypercalciuria'], 2],
    ['ikd_cystinosis', ['corneal_cystine_crystals', 'glycosuria', 'generalized_aminoaciduria'], 3],
    ['ikd_lowe', ['developmental_cataract', 'hypotonia', 'low_molecular_weight_proteinuria'], 3],
    ['ikd_fhhnc', ['hypomagnesemia', 'hypercalciuria', 'nephrocalcinosis'], 3],
    ['ikd_hhrh', ['renal_phosphate_wasting', 'hypophosphatemia', 'elevated_calcitriol'], 3],
    ['ikd_xlh', ['rickets', 'recurrent_dental_abscesses'], 2],
    ['ikd_liddle', ['hypertension', 'hypokalemia', 'decreased_aldosterone'], 3],
    ['ikd_gordon', ['hypertension', 'hyperkalemia', 'decreased_renin'], 3],
    ['ikd_pha1', ['hyponatremia', 'hyperkalemia', 'renal_salt_wasting'], 3],
    ['ikd_ndi', ['polyuria', 'polydipsia', 'hyposthenuria', 'hypernatremia'], 4],
  ] as const)('executes %s through the FHIR handoff without applying a diagnostic cutoff',
    (ruleId, findings, count) => {
      const { results } = assess([...findings]);
      expect(results.find(result => result.ruleId === ruleId)).toMatchObject({
        scoringModel: 'ikd-present-count-v1', weightedScore: count, flagged: false,
      });
    });

  it('keeps tubular proteinuria distinct from the existing broad proteinuria input', () => {
    const { results } = assess(['low_molecular_weight_proteinuria']);
    expect(results.find(result => result.ruleId === 'ikd_dent')?.weightedScore).toBe(1);
    expect(results.find(result => result.ruleId === 'ikd_alport')?.weightedScore).toBe(0);
    expect(results.find(result => result.ruleId === 'ikd_fabry')?.weightedScore).toBe(0);
  });
});
