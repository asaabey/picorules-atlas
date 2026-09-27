import { assertAnswers } from '../assessment/answers';
import type { AnswerState, Answers, AtlasQuestion, CollectionManifest } from '../types';
import { createUuid } from '../uuid';

// These URI contracts are stable identifiers, not network endpoints.
export const HPO_SYSTEM = 'http://human-phenotype-ontology.org';
export const PRESENCE_SYSTEM = 'https://atlas.picorules.com/fhir/CodeSystem/presence-answer';
export const FEATURE_ID_SYSTEM = 'https://atlas.picorules.com/fhir/NamingSystem/feature-id';
export const DATA_ABSENT_REASON_SYSTEM =
  'http://terminology.hl7.org/CodeSystem/data-absent-reason';
export const COLLECTION_VERSION_EXTENSION =
  'https://atlas.picorules.com/fhir/StructureDefinition/collection-version';
export const CONTENT_VERSION_EXTENSION =
  'https://atlas.picorules.com/fhir/StructureDefinition/content-version';

export interface Coding {
  system: string;
  code: string;
  display?: string;
}

export interface QuestionnaireItem {
  linkId: string;
  type: 'group' | 'choice';
  text: string;
  code?: Coding[];
  required?: boolean;
  answerOption?: { valueCoding: Coding }[];
  item?: QuestionnaireItem[];
}

export interface Questionnaire {
  resourceType: 'Questionnaire';
  id: string;
  url: string;
  version: string;
  status: 'draft';
  title: string;
  description: string;
  extension: { url: string; valueString: string }[];
  item: QuestionnaireItem[];
}

export interface QuestionnaireResponseItem {
  linkId: string;
  text?: string;
  answer?: { valueCoding: Coding }[];
  item?: QuestionnaireResponseItem[];
}

export interface QuestionnaireResponse {
  resourceType: 'QuestionnaireResponse';
  id: string;
  questionnaire: string;
  status: 'in-progress';
  authored: string;
  extension: { url: string; valueString: string }[];
  item: QuestionnaireResponseItem[];
}

export interface FeatureObservation {
  resourceType: 'Observation';
  id: string;
  status: 'preliminary';
  identifier: { system: string; value: string }[];
  code: { coding: Coding[]; text: string };
  valueBoolean?: boolean;
  dataAbsentReason?: { coding: Coding[] };
  derivedFrom: { reference: string }[];
}

export type AssessmentResource = Questionnaire | QuestionnaireResponse | FeatureObservation;

export interface AssessmentBundle {
  resourceType: 'Bundle';
  id: string;
  type: 'collection';
  timestamp: string;
  entry: { fullUrl: string; resource: AssessmentResource }[];
}

const presenceOptions: { state: Exclude<AnswerState, 'unanswered'>; display: string }[] = [
  { state: 'present', display: 'Present' },
  { state: 'absent', display: 'Absent' },
  { state: 'unknown', display: 'Unknown / not assessed' },
];

function contextExtensions(manifest: CollectionManifest) {
  return [
    { url: COLLECTION_VERSION_EXTENSION, valueString: manifest.version },
    { url: CONTENT_VERSION_EXTENSION, valueString: manifest.contentVersion },
  ];
}

export function questionnaireUrl(manifest: CollectionManifest): string {
  return `https://atlas.picorules.com/fhir/Questionnaire/${encodeURIComponent(manifest.id)}`;
}

export function buildQuestionnaire(manifest: CollectionManifest): Questionnaire {
  const item = manifest.sections.filter(
    (section) => manifest.questions.some((question) => question.section === section.id),
  ).map((section): QuestionnaireItem => ({
    linkId: `section-${section.id}`,
    type: 'group',
    text: section.label,
    item: manifest.questions
      .filter((question) => question.section === section.id)
      .map((question): QuestionnaireItem => ({
        linkId: question.featureId,
        type: 'choice',
        text: question.question,
        code: [{ system: HPO_SYSTEM, code: question.hpoId, display: question.label }],
        required: false,
        answerOption: presenceOptions.map(({ state, display }) => ({
          valueCoding: { system: PRESENCE_SYSTEM, code: state, display },
        })),
      })),
  }));
  return {
    resourceType: 'Questionnaire',
    id: `atlas-${manifest.id}`,
    url: questionnaireUrl(manifest),
    version: manifest.contentVersion,
    status: 'draft',
    title: manifest.title,
    description: manifest.description,
    extension: contextExtensions(manifest),
    item,
  };
}

function assertSessionId(sessionId: string): void {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(sessionId)) {
    throw new Error('Session ID must be a UUID for its urn:uuid bundle reference');
  }
}

function assertAuthoredAt(authoredAt: Date): string {
  if (Number.isNaN(authoredAt.getTime())) {
    throw new Error('Authorship time must be a valid date');
  }
  return authoredAt.toISOString();
}

export function buildQuestionnaireResponse(
  manifest: CollectionManifest,
  answers: Answers,
  sessionId: string,
  authoredAt: Date = new Date(),
): QuestionnaireResponse {
  assertAnswers(manifest, answers);
  assertSessionId(sessionId);
  const item = manifest.sections.filter(
    (section) => manifest.questions.some((question) => question.section === section.id),
  ).map((section): QuestionnaireResponseItem => ({
    linkId: `section-${section.id}`,
    text: section.label,
    item: manifest.questions
      .filter((question) => question.section === section.id)
      .map((question): QuestionnaireResponseItem => {
        const state = answers[question.featureId] ?? 'unanswered';
        const option = presenceOptions.find(({ state: code }) => code === state);
        return {
          linkId: question.featureId,
          text: question.question,
          ...(option
            ? { answer: [{ valueCoding: {
                system: PRESENCE_SYSTEM,
                code: option.state,
                display: option.display,
              } }] }
            : {}),
        };
      }),
  }));
  return {
    resourceType: 'QuestionnaireResponse',
    id: sessionId,
    questionnaire: `${questionnaireUrl(manifest)}|${manifest.contentVersion}`,
    status: 'in-progress',
    authored: assertAuthoredAt(authoredAt),
    extension: contextExtensions(manifest),
    item,
  };
}

function observationFor(
  question: AtlasQuestion,
  state: AnswerState,
  responseReference: string,
  id: string,
): FeatureObservation {
  return {
    resourceType: 'Observation',
    id,
    status: 'preliminary',
    identifier: [{ system: FEATURE_ID_SYSTEM, value: question.featureId }],
    code: {
      coding: [{ system: HPO_SYSTEM, code: question.hpoId, display: question.label }],
      text: question.label,
    },
    ...(state === 'unknown'
      ? { dataAbsentReason: {
          coding: [{ system: DATA_ABSENT_REASON_SYSTEM, code: 'unknown', display: 'Unknown' }],
        } }
      : { valueBoolean: state === 'present' }),
    derivedFrom: [{ reference: responseReference }],
  };
}

export function buildAssessmentBundle(
  manifest: CollectionManifest,
  answers: Answers,
  sessionId: string,
  authoredAt: Date = new Date(),
): AssessmentBundle {
  const questionnaire = buildQuestionnaire(manifest);
  const response = buildQuestionnaireResponse(manifest, answers, sessionId, authoredAt);
  const responseReference = `urn:uuid:${sessionId}`;
  const entry: AssessmentBundle['entry'] = [
    { fullUrl: questionnaire.url, resource: questionnaire },
    { fullUrl: responseReference, resource: response },
  ];
  for (const question of manifest.questions) {
    const state = answers[question.featureId] ?? 'unanswered';
    if (state === 'unanswered') continue;
    const id = createUuid();
    entry.push({
      fullUrl: `urn:uuid:${id}`,
      resource: observationFor(question, state, responseReference, id),
    });
  }
  return {
    resourceType: 'Bundle',
    id: createUuid(),
    type: 'collection',
    timestamp: assertAuthoredAt(authoredAt),
    entry,
  };
}
