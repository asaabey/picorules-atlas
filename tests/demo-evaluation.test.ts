import { readFileSync } from 'node:fs';
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

function run(present: string[], absent: string[] = [], unknown: string[] = []) {
  const answers = createAnswers(manifest);
  for (const id of present) answers[id] = 'present';
  for (const id of absent) answers[id] = 'absent';
  for (const id of unknown) answers[id] = 'unknown';
  return evaluateCollectionDemo(manifest, buildAssessmentBundle(manifest, answers, sessionId));
}

describe('authored demonstration rules', () => {
  it('uses the Picorules evaluator and isolates each disease input set', () => {
    const [fabry, tsc] = run(['proteinuria', 'angiokeratoma'], ['seizure'], ['hypohidrosis']);
    expect(fabry).toMatchObject({ ruleId: 'ikd_fabry', threshold: 2, presentCount: 2, flagged: true });
    expect(fabry.presentFeatures.map(feature => feature.featureId)).toEqual(['proteinuria', 'angiokeratoma']);
    expect(tsc).toMatchObject({ ruleId: 'ikd_tuberous_sclerosis', presentCount: 0, flagged: false });
    expect(run(['proteinuria'])[0]).toMatchObject({ presentCount: 1, flagged: false });
    expect(run([]).map(result => result.presentCount)).toEqual([0, 0]);
    expect(run(['seizure', 'angiofibromas'])[1]).toMatchObject({ presentCount: 2, flagged: true });
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
