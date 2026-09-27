import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { createAnswers } from '../src/lib/assessment/answers';
import { buildAssessmentBundle } from '../src/lib/fhir';
import { evaluateCollectionDemo } from '../src/lib/runtime/ruleEngine';
import type { CollectionManifest } from '../src/lib/types';

const manifestData: Record<string, CollectionManifest> = JSON.parse(
  readFileSync(new URL('../src/generated/collections.json', import.meta.url), 'utf8'),
);
const manifest = manifestData.ikd;
const sessionId = '83a7d563-2e53-4f7b-9052-3e87a904d110';

function run(present: string[]) {
  const answers = createAnswers(manifest);
  for (const id of present) answers[id] = 'present';
  return evaluateCollectionDemo(manifest, buildAssessmentBundle(manifest, answers, sessionId));
}

describe('authored demonstration rules', () => {
  it.each([
    ['ikd_alport', ['microscopic_hematuria', 'anterior_lenticonus'], 9],
    ['ikd_hnf1b', ['renal_agenesis', 'diabetes_mellitus'], 7],
    ['ikd_arpkd', ['enlarged_kidney', 'congenital_hepatic_fibrosis'], 7],
    ['ikd_vhl', ['retinal_capillary_hemangioma', 'endolymphatic_sac_tumor'], 8],
  ] as const)('executes %s and keeps unrelated profiles unflagged', (ruleId, features, total) => {
    const results = run([...features]);
    expect(results.find(result => result.ruleId === ruleId)).toMatchObject({
      presentCount: 2, totalFeatures: total, flagged: false,
    });
    expect(results.find(result => result.ruleId === ruleId)!.weightedScore).toBeGreaterThan(0);
    expect(run([features[0]]).find(result => result.ruleId === ruleId))
      .toMatchObject({ presentCount: 1, flagged: false });
    expect(run([]).find(result => result.ruleId === ruleId))
      .toMatchObject({ presentCount: 0, flagged: false });
  });

  it('reuses one proteinuria answer for Fabry and Alport without duplicating the question', () => {
    expect(manifest.questions.filter(question => question.featureId === 'proteinuria')).toHaveLength(1);
    expect(run(['proteinuria']).filter(result => result.presentCount === 1)
      .map(result => result.ruleId)).toEqual(['ikd_fabry', 'ikd_alport']);
  });

  it('uses the Picorules evaluator and isolates each disease input set', () => {
    const [fabry, tsc] = run(['proteinuria', 'angiokeratoma']);
    expect(fabry).toMatchObject({ ruleId: 'ikd_fabry', threshold: 0, presentCount: 2, flagged: false });
    expect(fabry.presentFeatures.map(feature => feature.featureId)).toEqual(['proteinuria', 'angiokeratoma']);
    expect(tsc).toMatchObject({ ruleId: 'ikd_tuberous_sclerosis', presentCount: 0, flagged: false });
    expect(run(['proteinuria'])[0]).toMatchObject({ presentCount: 1, flagged: false });
    expect(run([]).map(result => result.presentCount)).toEqual(Array(14).fill(0));
    expect(run(['seizure', 'angiofibromas'])[1]).toMatchObject({ presentCount: 2, flagged: false });
  });

  it('uses exactly the 35 declared weights from the pinned extraction', () => {
    const csv = readFileSync(new URL('../benchmarks/ikd/candidate-weights.csv', import.meta.url));
    expect(createHash('sha256').update(csv).digest('hex'))
      .toBe('705e8b041e8e7dab17f3071d0bf017ceac5d1aec6971d764efd6961885cc82eb');
    const declared = csv.toString().trim().split(/\r?\n/).slice(1)
      .map(line => line.split(',')).filter(row => row.at(-2) === 'True');
    expect(declared).toHaveLength(35);
    for (const row of declared) {
      const rule = manifest.rules.find(rule => rule.id === row[0])!;
      expect(rule.scoring!.weights[row[2]]).toBe(Number(Number(row.at(-3)).toFixed(6)));
    }
    expect(manifest.rules.filter(rule => rule.scoring?.model === 'ikd-positive-log10-v1')
      .reduce((sum, rule) => sum + Object.values(rule.scoring!.weights)
        .filter(weight => weight! > 0).length, 0)).toBe(46);
  });

  it('weights distinctive findings more and treats omitted answers as absent', () => {
    expect(run(['acroparesthesia'])[0].weightedScore).toBeCloseTo(3.033761, 6);
    expect(run(['acroparesthesia'])[0].weightedScore).toBeGreaterThan(run(['proteinuria'])[0].weightedScore!);
    expect(run(['anterior_lenticonus'])[2].weightedScore).toBeCloseTo(2.787697, 6);
    const omitted = evaluateCollectionDemo(manifest, buildAssessmentBundle(manifest, {}, sessionId));
    expect(omitted.map(result => result.weightedScore)).toEqual(Array(14).fill(0));
    expect(omitted.every(result => result.contributions!.every(item => !item.present && item.value === 0))).toBe(true);
    const both = run(['acroparesthesia', 'proteinuria'])[0];
    expect(both.weightedScore).toBeCloseTo(4.616602, 6);
    expect(both.contributions!.reduce((sum, item) => sum + item.value, 0)).toBeCloseTo(both.weightedScore!, 9);
  });

  it('rejects FHIR input for another content version', () => {
    const bundle = buildAssessmentBundle(manifest, createAnswers(manifest), sessionId);
    const altered = structuredClone(bundle);
    const response = altered.entry.find(entry => entry.resource.resourceType === 'QuestionnaireResponse');
    if (!response || response.resource.resourceType !== 'QuestionnaireResponse') throw new Error('Missing response');
    response.resource.questionnaire += '-old';
    expect(() => evaluateCollectionDemo(manifest, altered)).toThrow(/content version/);
  });
});
