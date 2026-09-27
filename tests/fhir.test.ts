import { describe, expect, it } from 'vitest';
import { countAnswered, createAnswers, resetAnswers, setAnswer } from '../src/lib/assessment/answers';
import {
  buildAssessmentBundle,
  buildQuestionnaire,
  buildQuestionnaireResponse,
  DATA_ABSENT_REASON_SYSTEM,
  HPO_SYSTEM,
  PRESENCE_SYSTEM,
} from '../src/lib/fhir';
import { observationsToEadv } from '../src/lib/runtime/featureAdapter';
import type { CollectionManifest } from '../src/lib/types';

const manifest: CollectionManifest = {
  schemaVersion: '1',
  id: 'synthetic',
  title: 'Synthetic features',
  description: 'Fixture for FHIR behavior',
  version: '0.1.0',
  limitations: 'Candidate content only.',
  associationContext: 'Background context only.',
  contentVersion: 'sha256-fixture',
  sections: [{ id: 'kidney', label: 'Kidney' }],
  questions: ['present', 'absent', 'unknown', 'unanswered'].map((featureId, index) => ({
    featureId,
    sourceAttribute: `phen_${featureId}`,
    label: `Feature ${featureId}`,
    question: `Is ${featureId} documented?`,
    section: 'kidney',
    answerType: 'presence' as const,
    hpoId: `HP:${String(index + 1).padStart(7, '0')}`,
    sourceRefs: [],
    diseases: [],
  })),
  rules: [],
  sources: {},
};

const sessionId = 'a58060f9-b7b7-4fbb-9b83-9a28b85be19c';
const authoredAt = new Date('2026-09-27T12:30:00.000Z');

describe('assessment answer states', () => {
  it('starts and resets with every feature unanswered, counting explicit unknown', () => {
    const initial = createAnswers(manifest);
    expect(Object.values(initial)).toEqual(Array(4).fill('unanswered'));
    const changed = setAnswer(manifest, initial, 'unknown', 'unknown');
    expect(initial.unknown).toBe('unanswered');
    expect(countAnswered(manifest, changed)).toBe(1);
    expect(resetAnswers(manifest)).toEqual(initial);
  });

  it('rejects unknown features and invalid values', () => {
    expect(() => setAnswer(manifest, {}, 'other', 'present')).toThrow(/not in collection/);
    expect(() => setAnswer(manifest, {}, 'present', 'yes' as never)).toThrow(/Unsupported/);
  });
});

describe('FHIR R4 representation', () => {
  const answers = {
    present: 'present',
    absent: 'absent',
    unknown: 'unknown',
    unanswered: 'unanswered',
  } as const;

  it('builds versioned section and feature links with three coded choices', () => {
    const questionnaire = buildQuestionnaire(manifest);
    expect(questionnaire.resourceType).toBe('Questionnaire');
    expect(questionnaire.version).toBe(manifest.contentVersion);
    expect(questionnaire.item[0].linkId).toBe('section-kidney');
    const features = questionnaire.item[0].item ?? [];
    expect(features.map((item) => item.linkId)).toEqual(manifest.questions.map((q) => q.featureId));
    expect(features[0].code).toEqual([{ system: HPO_SYSTEM, code: 'HP:0000001', display: 'Feature present' }]);
    expect(features[0].answerOption?.map((option) => option.valueCoding.code)).toEqual([
      'present', 'absent', 'unknown',
    ]);
    expect(features[0].answerOption?.every(
      (option) => option.valueCoding.system === PRESENCE_SYSTEM,
    )).toBe(true);
  });

  it('keeps explicit unknown in the response and leaves unanswered without an answer', () => {
    const response = buildQuestionnaireResponse(manifest, answers, sessionId, authoredAt);
    expect(response.questionnaire).toContain(`|${manifest.contentVersion}`);
    expect(response.authored).toBe('2026-09-27T12:30:00.000Z');
    const items = response.item[0].item ?? [];
    expect(items[0].answer?.[0].valueCoding.code).toBe('present');
    expect(items[1].answer?.[0].valueCoding.code).toBe('absent');
    expect(items[2].answer?.[0].valueCoding.code).toBe('unknown');
    expect(items[3]).not.toHaveProperty('answer');
  });

  it('packages derived observations and maps false to zero, unknown to null', () => {
    const bundle = buildAssessmentBundle(manifest, answers, sessionId, authoredAt);
    expect(bundle.type).toBe('collection');
    expect(bundle.entry.map((entry) => entry.resource.resourceType)).toEqual([
      'Questionnaire', 'QuestionnaireResponse', 'Observation', 'Observation', 'Observation',
    ]);
    const observations = bundle.entry.slice(2).map((entry) => entry.resource);
    expect(observations[0]).toHaveProperty('valueBoolean', true);
    expect(observations[1]).toHaveProperty('valueBoolean', false);
    expect(observations[2]).not.toHaveProperty('valueBoolean');
    expect(observations[2]).toHaveProperty('dataAbsentReason.coding.0', {
      system: DATA_ABSENT_REASON_SYSTEM, code: 'unknown', display: 'Unknown',
    });
    for (const observation of observations) {
      expect(observation).not.toHaveProperty('effectiveDateTime');
      expect(observation).toHaveProperty('derivedFrom.0.reference', bundle.entry[1].fullUrl);
    }
    expect(observationsToEadv(manifest, bundle)).toEqual({
      phen_present: 1,
      phen_absent: 0,
      phen_unknown: null,
      phen_unanswered: null,
    });
  });

  it('refuses an observation whose HPO coding does not match its declared feature', () => {
    const bundle = buildAssessmentBundle(manifest, answers, sessionId, authoredAt);
    const observation = bundle.entry[2].resource;
    if (observation.resourceType !== 'Observation') throw new Error('Fixture has no observation');
    observation.code.coding[0].code = 'HP:9999999';
    expect(() => observationsToEadv(manifest, bundle)).toThrow(/code does not match/);
  });

  it('rejects a response for another content version', () => {
    const bundle = buildAssessmentBundle(manifest, answers, sessionId, authoredAt);
    const response = bundle.entry[1].resource;
    if (response.resourceType !== 'QuestionnaireResponse') throw new Error('Fixture has no response');
    response.questionnaire += '-different';
    expect(() => observationsToEadv(manifest, bundle)).toThrow(/content version/);
  });

  it('requires a UUID session identifier for the bundle reference', () => {
    expect(() => buildAssessmentBundle(manifest, answers, 'session-one', authoredAt)).toThrow(/UUID/);
  });
});
