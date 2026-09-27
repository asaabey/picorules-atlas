import {
  COLLECTION_VERSION_EXTENSION,
  FEATURE_ID_SYSTEM,
  HPO_SYSTEM,
  questionnaireUrl,
  type AssessmentBundle,
  type FeatureObservation,
  type QuestionnaireResponse,
} from '../fhir';
import type { CollectionManifest } from '../types';

export type EadvFeatureValues = Record<string, 0 | 1>;

/** Maps only declared HPO-coded Atlas features, never arbitrary FHIR observations. */
export function observationsToEadv(
  manifest: CollectionManifest,
  bundle: AssessmentBundle,
): EadvFeatureValues {
  if (bundle.resourceType !== 'Bundle' || bundle.type !== 'collection') {
    throw new Error('Expected a FHIR collection Bundle');
  }
  const responses = bundle.entry.filter(
    (entry): entry is { fullUrl: string; resource: QuestionnaireResponse } =>
      entry.resource.resourceType === 'QuestionnaireResponse',
  );
  if (responses.length !== 1) {
    throw new Error('Expected exactly one QuestionnaireResponse');
  }
  const response = responses[0];
  if (response.resource.questionnaire !== `${questionnaireUrl(manifest)}|${manifest.contentVersion}`) {
    throw new Error('QuestionnaireResponse does not match the collection content version');
  }
  const version = response.resource.extension.find(
    (extension) => extension.url === COLLECTION_VERSION_EXTENSION,
  )?.valueString;
  if (version !== manifest.version) {
    throw new Error('QuestionnaireResponse does not match the collection version');
  }

  const questions = new Map(manifest.questions.map((question) => [question.featureId, question]));
  const values: EadvFeatureValues = Object.fromEntries(
    manifest.questions.map((question) => [question.sourceAttribute, 0]),
  );
  const seen = new Set<string>();
  for (const entry of bundle.entry) {
    if (entry.resource.resourceType !== 'Observation') continue;
    const observation: FeatureObservation = entry.resource;
    const featureIds = observation.identifier.filter(
      (identifier) => identifier.system === FEATURE_ID_SYSTEM,
    );
    if (featureIds.length !== 1) {
      throw new Error('Atlas feature Observation must have exactly one feature identifier');
    }
    const featureId = featureIds[0].value;
    const question = questions.get(featureId);
    if (!question) {
      throw new Error(`Observation feature ${featureId} is not in collection ${manifest.id}`);
    }
    if (seen.has(featureId)) {
      throw new Error(`Duplicate Observation for feature ${featureId}`);
    }
    seen.add(featureId);
    if (!observation.code.coding.some(
      (coding) => coding.system === HPO_SYSTEM && coding.code === question.hpoId,
    )) {
      throw new Error(`Observation code does not match feature ${featureId}`);
    }
    if (!observation.derivedFrom.some(({ reference }) => reference === response.fullUrl)) {
      throw new Error(`Observation ${featureId} does not reference its QuestionnaireResponse`);
    }
    if (typeof observation.valueBoolean === 'boolean') {
      values[question.sourceAttribute] = observation.valueBoolean ? 1 : 0;
    } else {
      throw new Error(`Observation ${featureId} must have a boolean value`);
    }
  }
  if (seen.size !== questions.size) {
    throw new Error('FHIR bundle must contain a boolean Observation for every selected feature');
  }
  return values;
}
