import { describe, expect, it } from 'vitest';
import collections from '../src/generated/collections.json';
import evidence from '../reviews/ikd/orphadata-evidence.json';
import adtkdEvidence from '../reviews/ikd/adtkd-evidence.json';
import inheritanceEvidence from '../reviews/ikd/inheritance-evidence.json';
import ciliopathyEvidence from '../reviews/ikd/ciliopathy-evidence.json';
import tubulopathyEvidence from '../reviews/ikd/tubulopathy-evidence.json';
const allEvidence = [...evidence.associations, ...adtkdEvidence.associations,
  ...inheritanceEvidence.associations, ...ciliopathyEvidence.associations,
  ...tubulopathyEvidence.associations];
import { buildAssessmentBundle, buildQuestionnaire, HPO_SYSTEM } from '../src/lib/fhir';
import { observationsToEadv } from '../src/lib/runtime/featureAdapter';
import type { AnswerState, CollectionManifest } from '../src/lib/types';

const manifest = collections.ikd as CollectionManifest;
const sessionId = 'a58060f9-b7b7-4fbb-9b83-9a28b85be19c';

describe('IKD candidate content review mapping', () => {
  it('retains all source-backed disease and HPO pairings in the questionnaire', () => {
    const pairings = manifest.questions.flatMap(question => question.diseases.map(disease => ({
      featureId: question.featureId,
      ruleId: disease.ruleId,
      diseaseId: disease.diseaseId,
      hpoId: question.hpoId,
    })));
    expect(pairings).toEqual(expect.arrayContaining(allEvidence.map(({ featureId, ruleId, diseaseId, hpoId }) => ({
      featureId, ruleId, diseaseId, hpoId,
    }))));
    expect(pairings).toHaveLength(allEvidence.length);
    const items = buildQuestionnaire(manifest).item.flatMap(section => section.item ?? []);
    expect(items).toHaveLength(manifest.questions.length);
    for (const item of items) {
      const source = allEvidence.find(row => row.featureId === item.linkId);
      expect(item.code).toContainEqual({
        system: HPO_SYSTEM, code: source?.hpoId,
        display: manifest.questions.find(question => question.featureId === item.linkId)?.label,
      });
      expect(item.required).toBe(false);
    }
  });

  it('keeps every IKD answer state and HPO code aligned through FHIR and EADV', () => {
    const states: AnswerState[] = ['present', 'absent'];
    const answers = Object.fromEntries(manifest.questions.map((question, index) => [
      question.featureId, states[index % states.length],
    ])) as Record<string, AnswerState>;
    const bundle = buildAssessmentBundle(manifest, answers, sessionId, new Date('2026-09-27T12:30:00Z'));
    const observations = bundle.entry.filter(entry => entry.resource.resourceType === 'Observation');
    expect(observations).toHaveLength(manifest.questions.length);
    const eadv = observationsToEadv(manifest, bundle);
    for (const question of manifest.questions) {
      const state = answers[question.featureId];
      const observation = observations.find(entry => entry.resource.resourceType === 'Observation' &&
        entry.resource.identifier[0].value === question.featureId)?.resource;
      expect(observation?.resourceType).toBe('Observation');
      if (observation?.resourceType === 'Observation') {
        expect(observation.code.coding[0]).toMatchObject({ system: HPO_SYSTEM, code: question.hpoId });
        expect(observation.valueBoolean).toBe(state === 'present');
      }
      expect(eadv[question.sourceAttribute]).toBe(state === 'present' ? 1 : 0);
    }
  });
});
