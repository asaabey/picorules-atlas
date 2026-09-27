import Ajv from 'ajv';
import { describe, expect, it } from 'vitest';
import collections from '../src/generated/collections.json';
import schema from './fixtures/fhir-r4.schema.json';
import { createAnswers } from '../src/lib/assessment/answers';
import { buildAssessmentBundle } from '../src/lib/fhir';
import { buildHandoffBundle, RULE_ID_SYSTEM, type PrototypeClinicalImpression,
  type RuleScoreObservation } from '../src/lib/fhir/handoff';
import type { CollectionManifest } from '../src/lib/types';

const manifest = collections.ikd as CollectionManifest;
const sessionId = 'b99c5916-39ed-4260-bcf7-83b7c8a7977e';
const date = new Date('2026-09-27T12:30:00.000Z');

function handoff(present: string[]) {
  const answers = createAnswers(manifest);
  for (const id of present) answers[id] = 'present';
  const assessment = buildAssessmentBundle(manifest, answers, sessionId, date);
  return { assessment, ...buildHandoffBundle(manifest, assessment) };
}

function output(bundle: ReturnType<typeof handoff>['bundle']) {
  const scores = bundle.entry.map(entry => entry.resource).filter((resource): resource is RuleScoreObservation =>
    resource.resourceType === 'Observation' && resource.identifier.some(id => id.system === RULE_ID_SYSTEM));
  const impression = bundle.entry.map(entry => entry.resource).find((resource): resource is PrototypeClinicalImpression =>
    resource.resourceType === 'ClinicalImpression');
  if (!impression) throw new Error('Missing clinical impression');
  return { scores, impression };
}

describe('FHIR rule-result handoff', () => {
  it('exports every rule score and only triggered possible diagnoses with source trace', () => {
    const { bundle, assessment, results } = handoff(['proteinuria', 'angiokeratoma', 'seizure']);
    const { scores, impression } = output(bundle);
    expect(scores.map(score => [score.identifier[0].value, score.valueInteger])).toEqual([
      ['ikd_fabry', 2], ['ikd_tuberous_sclerosis', 1],
    ]);
    expect(scores[0].component.map(component =>
      component.valueInteger ?? component.valueBoolean)).toEqual([5, 2, true]);
    expect(scores[1].component.map(component =>
      component.valueInteger ?? component.valueBoolean)).toEqual([5, 2, false]);
    expect(impression.finding).toHaveLength(1);
    expect(impression.finding[0].itemCodeableConcept.coding[0].code).toBe('ORPHA:324');
    expect(impression.finding[0].basis).toContain('Rule ikd_fabry v0.2.0-demo: 2/5');
    expect(impression.finding[0].basis).toContain('Proteinuria, Angiokeratomas');
    expect(impression.summary).toContain('No diagnosis is confirmed');
    expect(results.map(result => result.presentCount)).toEqual([2, 1]);
    expect(JSON.stringify(assessment)).not.toContain('ClinicalImpression');
    const patient = bundle.entry.find(entry => entry.resource.resourceType === 'Patient');
    expect(patient?.resource).toEqual({ resourceType: 'Patient', id: patient?.fullUrl.replace('urn:uuid:', '') });
    expect(scores.every(score => score.subject.reference === patient?.fullUrl)).toBe(true);
    expect(impression.subject.reference).toBe(patient?.fullUrl);
  });

  it('exports zero scores and no possible diagnoses without falsely excluding disease', () => {
    const { bundle } = handoff([]);
    const { scores, impression } = output(bundle);
    expect(scores.map(score => score.valueInteger)).toEqual([0, 0]);
    expect(impression.finding).toEqual([]);
    expect(impression.summary).toContain('does not exclude');
  });

  it('validates the full handoff against the official FHIR R4 JSON Schema', () => {
    const { bundle } = handoff(['proteinuria', 'angiokeratoma']);
    const ajv = new Ajv({ schemaId: 'id', allErrors: true, validateSchema: false, meta: false });
    const validate = ajv.compile(schema);
    expect(validate(bundle), JSON.stringify(validate.errors)).toBe(true);
  });
});
