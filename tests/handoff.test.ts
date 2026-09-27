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
    expect(scores.map(score => score.valueQuantity?.value)).toEqual(results.map(result => result.weightedScore));
    expect(scores.every(score => score.valueInteger === undefined)).toBe(true);
    expect(scores[0].code.coding[0].code).toBe('phenotype-match-ikd-positive-log10-v1');
    expect(scores[0].component.map(component => component.valueInteger)).toEqual([6, 2]);
    expect(scores[0].note[0].text).toContain('ikd-positive-log10-v1');
    expect(scores[0].note[0].text).toContain('Angiokeratomas: present');
    expect(impression.finding).toEqual([]);
    expect(impression.summary).toContain('No diagnosis is confirmed');
    expect(results.filter(result => result.presentCount > 0).map(result => [result.ruleId, result.presentCount]))
      .toEqual([['ikd_fabry', 2], ['ikd_tuberous_sclerosis', 1], ['ikd_alport', 1], ['ikd_east', 1]]);
    expect(JSON.stringify(assessment)).not.toContain('ClinicalImpression');
    const patient = bundle.entry.find(entry => entry.resource.resourceType === 'Patient');
    expect(patient?.resource).toEqual({ resourceType: 'Patient', id: patient?.fullUrl.replace('urn:uuid:', '') });
    expect(scores.every(score => score.subject.reference === patient?.fullUrl)).toBe(true);
    expect(impression.subject.reference).toBe(patient?.fullUrl);
  });

  it('exports zero scores and no possible diagnoses without falsely excluding disease', () => {
    const { bundle } = handoff([]);
    const { scores, impression } = output(bundle);
    expect(scores.map(score => score.valueQuantity?.value)).toEqual(Array(manifest.rules.length).fill(0));
    expect(impression.finding).toEqual([]);
    expect(impression.summary).toContain('does not exclude');
  });

  it('includes results only from the selected collection', () => {
    const selected: CollectionManifest = {
      ...manifest, id: 'fabry-only', rules: manifest.rules.filter(rule => rule.id === 'ikd_fabry'),
      questions: manifest.questions.filter(question =>
        question.diseases.some(disease => disease.ruleId === 'ikd_fabry')),
    };
    const answers = createAnswers(selected);
    answers.proteinuria = 'present';
    answers.angiokeratoma = 'present';
    const assessment = buildAssessmentBundle(selected, answers, sessionId, date);
    const { bundle, results } = buildHandoffBundle(selected, assessment);
    const { scores, impression } = output(bundle);
    expect(results.map(result => result.ruleId)).toEqual(['ikd_fabry']);
    expect(scores.map(score => score.identifier[0].value)).toEqual(['ikd_fabry']);
    expect(impression.finding.map(finding => finding.itemCodeableConcept.text)).toEqual([]);
    expect(JSON.stringify(bundle)).not.toContain('ikd_tuberous_sclerosis');
  });

  it('validates the full handoff against the official FHIR R4 JSON Schema', () => {
    const { bundle } = handoff(['proteinuria', 'angiokeratoma']);
    const ajv = new Ajv({ schemaId: 'id', allErrors: true, validateSchema: false, meta: false });
    const validate = ajv.compile(schema);
    expect(validate(bundle), JSON.stringify(validate.errors)).toBe(true);
  });
});
