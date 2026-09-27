import Ajv from 'ajv';
import { describe, expect, it } from 'vitest';
import collections from '../src/generated/collections.json';
import schema from './fixtures/fhir-r4.schema.json';
import { createAnswers, setAnswer } from '../src/lib/assessment/answers';
import { buildAssessmentBundle } from '../src/lib/fhir';
import type { CollectionManifest } from '../src/lib/types';

describe('official FHIR R4 JSON Schema', () => {
  it('validates the generated Questionnaire, Response, and feature Observations in a Bundle', () => {
    const manifest = collections.ikd as CollectionManifest;
    let answers = createAnswers(manifest);
    answers = setAnswer(manifest, answers, 'proteinuria', 'present');
    answers = setAnswer(manifest, answers, 'seizure', 'absent');
    const bundle = buildAssessmentBundle(
      manifest, answers, 'a58060f9-b7b7-4fbb-9b83-9a28b85be19c',
      new Date('2026-09-27T12:30:00.000Z'),
    );
    const ajv = new Ajv({ schemaId: 'id', allErrors: true, validateSchema: false, meta: false });
    const validate = ajv.compile(schema);
    const valid = validate(bundle);
    expect(validate.errors).toBeNull();
    expect(valid).toBe(true);
  });
});
