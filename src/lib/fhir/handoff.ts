import { createUuid } from '../uuid';
import type { CollectionManifest } from '../types';
import { evaluateCollectionDemo, type DemoResult } from '../runtime/ruleEngine';
import type { AssessmentBundle, AssessmentResource, Coding } from './index';

export const RULE_SCORE_SYSTEM = 'https://atlas.picorules.com/fhir/CodeSystem/rule-score';
export const RULE_ID_SYSTEM = 'https://atlas.picorules.com/fhir/NamingSystem/rule-id';
export const ORPHA_ID_SYSTEM = 'https://atlas.picorules.com/fhir/NamingSystem/orpha-id';

interface Reference { reference: string }

export interface AnonymousPatient {
  resourceType: 'Patient';
  id: string;
}

export interface RuleScoreObservation {
  resourceType: 'Observation';
  id: string;
  status: 'preliminary';
  identifier: { system: string; value: string }[];
  code: { coding: Coding[]; text: string };
  subject: Reference;
  valueInteger?: number;
  valueQuantity?: { value: number; unit: string; system: string; code: string };
  component: {
    code: { coding: Coding[] };
    valueInteger?: number;
    valueBoolean?: boolean;
  }[];
  derivedFrom: Reference[];
  note: { text: string }[];
}

export interface PrototypeClinicalImpression {
  resourceType: 'ClinicalImpression';
  id: string;
  status: 'in-progress';
  subject: Reference;
  date: string;
  description: string;
  summary: string;
  finding: {
    itemCodeableConcept: { coding: Coding[]; text: string };
    basis: string;
  }[];
  supportingInfo: Reference[];
  note: { text: string }[];
}

export type HandoffResource = AssessmentResource | AnonymousPatient | RuleScoreObservation |
  PrototypeClinicalImpression;

export interface HandoffBundle extends Omit<AssessmentBundle, 'entry'> {
  entry: { fullUrl: string; resource: HandoffResource }[];
}

function scoreComponent(code: string, display: string, value: number | boolean) {
  return {
    code: { coding: [{ system: RULE_SCORE_SYSTEM, code, display }] },
    ...(typeof value === 'boolean' ? { valueBoolean: value } : { valueInteger: value }),
  };
}

/** Add rule scores and provisional candidate diagnoses to the reviewed assessment. */
export function buildHandoffBundle(
  manifest: CollectionManifest,
  assessment: AssessmentBundle,
): { bundle: HandoffBundle; results: DemoResult[] } {
  const results = evaluateCollectionDemo(manifest, assessment);
  if (!results.length) throw new Error('This collection has no executable demonstration rules');
  const patientId = createUuid();
  const patientReference = `urn:uuid:${patientId}`;
  const response = assessment.entry.find(entry => entry.resource.resourceType === 'QuestionnaireResponse');
  if (!response) throw new Error('Assessment has no QuestionnaireResponse');
  const entry: HandoffBundle['entry'] = assessment.entry.map(item => {
    if (item.resource.resourceType === 'QuestionnaireResponse' ||
      item.resource.resourceType === 'Observation') {
      return { ...item, resource: { ...item.resource, subject: { reference: patientReference } } };
    }
    return item;
  });
  entry.push({ fullUrl: patientReference, resource: { resourceType: 'Patient', id: patientId } });

  const scoreReferences: Reference[] = [];
  for (const result of results) {
    const id = createUuid();
    const reference = `urn:uuid:${id}`;
    scoreReferences.push({ reference });
    entry.push({
      fullUrl: reference,
      resource: {
        resourceType: 'Observation', id, status: 'preliminary',
        identifier: [{ system: RULE_ID_SYSTEM, value: result.ruleId }],
        code: { coding: [{ system: RULE_SCORE_SYSTEM,
          code: result.scoringModel === 'ikd-positive-log10-v1'
            ? 'phenotype-match-ikd-positive-log10-v1' : 'present-feature-count',
          display: result.scoringModel === 'ikd-positive-log10-v1'
            ? 'Research phenotype matching score' : 'Present clinical feature count',
        }], text: `${result.label} research score` },
        subject: { reference: patientReference },
        ...(result.weightedScore === undefined ? { valueInteger: result.presentCount } : {
          valueQuantity: { value: result.weightedScore,
            unit: result.scoringModel === 'ikd-present-count-v1' ? 'count' : 'score',
            system: 'http://unitsofmeasure.org', code: '1' },
        }),
        component: [
          scoreComponent('total-features', 'Total declared features', result.totalFeatures),
          scoreComponent('present-features', 'Present features', result.presentCount),
        ],
        derivedFrom: [{ reference: response.fullUrl }],
        note: [{ text: `Rule ${result.ruleId} v${result.ruleVersion}; model ${result.scoringModel ?? 'count'}. ` +
          'Research output, not a diagnostic probability. Unstated findings are absent and contribute zero. ' +
          (result.contributions ?? []).map(item => `${item.label}: ${item.present ? 'present' : 'absent'}, weight ${item.weight}, contribution ${item.value}`).join('; ') }],
      },
    });
  }

  const findings: PrototypeClinicalImpression['finding'] = results.filter(result => !result.scoringModel && result.flagged)
    .map(result => {
      const rule = manifest.rules.find(item => item.id === result.ruleId);
      if (!rule) throw new Error(`Missing source rule ${result.ruleId}`);
      return {
        itemCodeableConcept: {
          coding: [{ system: ORPHA_ID_SYSTEM, code: rule.diseaseId, display: result.label }],
          text: result.label,
        },
        basis: `Possible diagnosis for review only. Rule ${result.ruleId} v${result.ruleVersion}: ` +
          `${result.presentCount}/${result.totalFeatures} features present; illustrative threshold ` +
          `${result.threshold}. Contributing findings: ${result.presentFeatures.map(feature => feature.label).join(', ')}.`,
      };
    });
  const impressionId = createUuid();
  entry.push({
    fullUrl: `urn:uuid:${impressionId}`,
    resource: {
      resourceType: 'ClinicalImpression', id: impressionId, status: 'in-progress',
      subject: { reference: patientReference }, date: assessment.timestamp,
      description: `${manifest.title} Atlas rule demonstration`,
      summary: 'Research phenotype matching scores are provided in the supporting Observations. ' +
        'No diagnosis is confirmed. A zero score does not exclude disease.',
      finding: findings,
      supportingInfo: [{ reference: response.fullUrl }, ...scoreReferences],
      note: results.map(result => ({ text: `${result.label}: ${result.action}` })),
    },
  });
  return { bundle: { ...assessment, entry }, results };
}
