import Ajv from 'ajv';
import { afterEach, describe, expect, it, vi } from 'vitest';
import schema from './fixtures/fhir-r4.schema.json';
import example from '../examples/fhir/ikd-input.json';
import collections from '../src/generated/collections.json';
import { evaluateInput, handleEvaluate } from '../src/lib/api/evaluate';
import { buildAssessmentBundle } from '../src/lib/fhir';
import { buildHandoffBundle } from '../src/lib/fhir/handoff';
import { createAnswers } from '../src/lib/assessment/answers';
import type { CollectionManifest } from '../src/lib/types';
const manifest = collections.ikd as CollectionManifest;
const validate = new Ajv({ schemaId: 'id', allErrors: true, validateSchema: false, meta: false }).compile(schema);
function request(body: unknown = example, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/v1/collections/ikd/$evaluate', {
    method: 'POST', headers: { 'content-type': 'application/fhir+json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}
afterEach(() => vi.unstubAllEnvs());
describe('FHIR evaluation API', () => {
  it('returns schema-valid output with browser-identical scores and preserved subject', async () => {
    const response = await handleEvaluate(request());
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    const output = await response.json();
    expect(validate(output), JSON.stringify(validate.errors)).toBe(true);
    const answers = createAnswers(manifest);
    answers.angiokeratoma = 'present';
    const browser = buildHandoffBundle(manifest, buildAssessmentBundle(manifest, answers,
      'b99c5916-39ed-4260-bcf7-83b7c8a7977e')).bundle;
    const scores = (bundle: typeof browser) => bundle.entry.flatMap(({ resource }) =>
      'valueQuantity' in resource ? [resource.valueQuantity?.value] : []);
    expect(scores(output)).toEqual(scores(browser));
    expect(scores(output)).toHaveLength(14);
    for (const { resource } of output.entry) {
      if (resource.subject) expect(resource.subject.reference).toBe('Patient/example');
    }
    expect(JSON.stringify(output)).toContain('Assumed absent: feature omitted');
  });
  it('supports an empty feature set and explicit absent values', () => {
    const empty = evaluateInput({ ...example, entry: example.entry.slice(0, 1) });
    expect(empty.entry.filter(e => 'valueQuantity' in e.resource)
      .every(e => 'valueQuantity' in e.resource && e.resource.valueQuantity?.value === 0)).toBe(true);
    const input = structuredClone(example);
    input.entry[1].resource.valueBoolean = false;
    expect(validate(evaluateInput(input))).toBe(true);
  });
  it.each(['code', 'subject', 'boolean', 'duplicate', 'status', 'resource', 'patient'])('rejects invalid %s', async kind => {
    const input = structuredClone(example);
    const observation = input.entry[1].resource;
    if (kind === 'code') observation.code!.coding[0].code = 'HP:9999999';
    if (kind === 'subject') observation.subject!.reference = 'Patient/other';
    if (kind === 'boolean') delete observation.valueBoolean;
    if (kind === 'duplicate') input.entry.push(input.entry[1]);
    if (kind === 'status') observation.status = 'entered-in-error';
    if (kind === 'resource') observation.resourceType = 'Condition';
    if (kind === 'patient') input.entry.shift();
    const result = await handleEvaluate(request(input));
    expect(result.status).toBe(400);
    expect(validate(await result.json())).toBe(true);
  });
  it('preserves a supplied patient fullUrl', () => {
    const input = { ...example, entry: example.entry.map((entry, index) => index === 0
      ? { ...entry, fullUrl: 'https://ehr.example/Patient/example' } : entry) };
    expect(JSON.stringify(evaluateInput(input))).toContain('https://ehr.example/Patient/example');
  });
  it('rejects malformed, oversized and wrong media requests', async () => {
    expect((await handleEvaluate(request('{'))).status).toBe(400);
    expect((await handleEvaluate(request(' '.repeat(262145)))).status).toBe(413);
    expect((await handleEvaluate(request(example, { 'content-type': 'text/plain' }))).status).toBe(415);
  });
  it('requires a configured key in production and checks bearer credentials', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('ATLAS_API_KEY', '');
    expect((await handleEvaluate(request())).status).toBe(503);
    vi.stubEnv('ATLAS_API_KEY', 'test-only-key');
    expect((await handleEvaluate(request())).status).toBe(401);
    expect((await handleEvaluate(request(example, { authorization: 'Bearer test-only-key' }))).status).toBe(200);
  });
});
