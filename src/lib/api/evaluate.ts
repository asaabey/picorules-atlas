import { randomUUID, timingSafeEqual } from 'node:crypto';
import collections from '../../generated/collections.json';
import { createAnswers } from '../assessment/answers';
import { buildAssessmentBundle, HPO_SYSTEM } from '../fhir';
import { buildHandoffBundle } from '../fhir/handoff';
import type { CollectionManifest } from '../types';

const manifest = collections.ikd as CollectionManifest;
const MAX_BYTES = 256 * 1024;
class InputError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new InputError('Expected a JSON object.');
  }
  return value as Record<string, unknown>;
}
function response(body: unknown, status = 200) {
  return Response.json(body, { status, headers: {
    'Content-Type': 'application/fhir+json', 'Cache-Control': 'no-store',
  } });
}
function outcome(message: string, status: number) {
  return response({ resourceType: 'OperationOutcome', issue: [{
    severity: 'error', code: status === 401 ? 'login' : status === 500 ? 'exception' : 'invalid',
    diagnostics: message,
  }] }, status);
}

/** Narrow v1 contract: one Patient plus HPO boolean Observations, no arbitrary EHR bundle. */
export function evaluateInput(input: unknown) {
  const bundle = object(input);
  if (bundle.resourceType !== 'Bundle' || bundle.type !== 'collection' || !Array.isArray(bundle.entry)) {
    throw new InputError('Expected a collection Bundle with entry array.');
  }
  const entries = bundle.entry.map(item => object(item));
  const resources = entries.map(item => object(item.resource));
  const patients = resources.filter(item => item.resourceType === 'Patient');
  if (patients.length !== 1 || typeof patients[0].id !== 'string' ||
    !/^[A-Za-z0-9.-]{1,64}$/.test(patients[0].id)) {
    throw new InputError('Include exactly one Patient with a valid id.');
  }
  const patient = patients[0];
  const patientEntry = entries[resources.indexOf(patient)];
  const relativeReference = `Patient/${patient.id}`;
  const fullUrl = patientEntry.fullUrl;
  if (fullUrl !== undefined && (typeof fullUrl !== 'string' ||
    !/^(https?:\/\/[^\s]+|urn:uuid:[0-9a-f-]{36})$/i.test(fullUrl))) {
    throw new InputError('Patient fullUrl must be an absolute HTTP(S) URL or UUID URN.');
  }
  const subject = (fullUrl as string | undefined) ?? relativeReference;
  const answers = createAnswers(manifest);
  const seen = new Set<string>();
  const byHpo = new Map(manifest.questions.map(question => [question.hpoId, question]));
  for (const resource of resources) {
    if (resource === patient) continue;
    if (resource.resourceType !== 'Observation') {
      throw new InputError('Only Patient and phenotype Observation resources are supported.');
    }
    if (!['preliminary', 'final', 'amended', 'corrected'].includes(String(resource.status))) {
      throw new InputError('Observation status must be preliminary, final, amended or corrected.');
    }
    const reference = object(resource.subject).reference;
    if (reference !== subject && reference !== relativeReference) {
      throw new InputError('All Observations must reference the single supplied Patient.');
    }
    const coding = object(resource.code).coding;
    if (!Array.isArray(coding) || coding.length !== 1) {
      throw new InputError('Each Observation requires exactly one HPO coding.');
    }
    const code = object(coding[0]);
    const question = code.system === HPO_SYSTEM && typeof code.code === 'string'
      ? byHpo.get(code.code) : undefined;
    if (!question) throw new InputError('Observation code is not a supported IKD HPO feature.');
    if (seen.has(question.featureId)) throw new InputError('Duplicate phenotype Observations are not supported.');
    if (typeof resource.valueBoolean !== 'boolean' || resource.dataAbsentReason !== undefined ||
      Object.keys(resource).some(key => key.startsWith('value') && key !== 'valueBoolean') ||
      resource.component !== undefined || resource.modifierExtension !== undefined) {
      throw new InputError('Phenotype Observations require only valueBoolean, without modifiers or components.');
    }
    seen.add(question.featureId);
    answers[question.featureId] = resource.valueBoolean ? 'present' : 'absent';
  }
  const assessment = buildAssessmentBundle(manifest, answers, randomUUID());
  for (const entry of assessment.entry) {
    if (entry.resource.resourceType !== 'Observation') continue;
    const feature = entry.resource.identifier[0].value;
    entry.resource.note = [...(entry.resource.note ?? []), { text: seen.has(feature)
      ? 'Value supplied by API caller.' : 'Assumed absent: feature omitted from API input.' }];
  }
  const handoff = buildHandoffBundle(manifest, assessment).bundle;
  // Replace the browser's anonymous subject with the caller's subject throughout the handoff.
  handoff.entry = handoff.entry.filter(entry => entry.resource.resourceType !== 'Patient');
  for (const entry of handoff.entry) {
    if ('subject' in entry.resource) entry.resource.subject = { reference: subject };
  }
  // Preserve identity only; demographic fields are not needed for phenotype evaluation.
  handoff.entry.push({ fullUrl: (fullUrl as string | undefined) ??
    new URL(relativeReference, 'https://atlas.picorules.com/fhir/').href,
  resource: { resourceType: 'Patient', id: patient.id as string } });
  return handoff;
}

export async function handleEvaluate(request: Request): Promise<Response> {
  try {
    const key = process.env.ATLAS_API_KEY;
    if (!key && process.env.NODE_ENV === 'production') {
      return outcome('API authentication is not configured.', 503);
    }
    if (key) {
      const supplied = Buffer.from(request.headers.get('authorization') ?? '');
      const expected = Buffer.from(`Bearer ${key}`);
      if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
        return outcome('A valid bearer API key is required.', 401);
      }
    }
    const media = request.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    if (media !== 'application/fhir+json' && media !== 'application/json') {
      return outcome('Use application/fhir+json or application/json.', 415);
    }
    const reader = request.body?.getReader();
    if (!reader) throw new InputError('Request body is required.');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new InputError('Request exceeds 256 KiB.', 413);
      }
      chunks.push(chunk.value);
    }
    let input: unknown;
    try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { throw new InputError('Request body must be valid JSON.'); }
    return response(evaluateInput(input));
  } catch (error) {
    return error instanceof InputError ? outcome(error.message, error.status)
      : outcome('Assessment could not be evaluated.', 500);
  }
}
