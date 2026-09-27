import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { CollectionManifest } from '../src/lib/types';
import {
  assertClinicalReviewApproved,
  type ClinicalReviewRecord,
} from '../src/lib/content/reviewGate';

const root = resolve(import.meta.dirname, '..');
const reviewRoot = resolve(root, 'reviews/ikd');
const manifest = (JSON.parse(readFileSync(resolve(root, 'src/generated/collections.json'), 'utf8')) as
  Record<string, CollectionManifest>).ikd;
const evidence = JSON.parse(readFileSync(resolve(reviewRoot, 'orphadata-evidence.json'), 'utf8')) as {
  sourceId: string;
  sourceUrl: string;
  sourceSha256: string;
  sourceRelease: string;
  license: string;
  associations: {
    featureId: string; ruleId: string; diseaseId: string; hpoId: string; hpoLabel: string;
    sourceDate: string; frequency: string; diagnosticCriterion: string;
  }[];
};
const record = JSON.parse(readFileSync(resolve(reviewRoot, 'review-record.json'), 'utf8')) as ClinicalReviewRecord;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Clinical review: ${message}`);
}

assert(manifest?.id === 'ikd', 'IKD manifest is missing');
assert(evidence.sourceId === 'orphadata_2026_06', 'unexpected evidence source');
assert(/^[a-f0-9]{64}$/.test(evidence.sourceSha256), 'source XML SHA-256 is missing');
assert(evidence.sourceRelease === manifest.sources[evidence.sourceId]?.release,
  'source release differs from the content manifest');
assert(evidence.license === manifest.sources[evidence.sourceId]?.license,
  'source license differs from the content manifest');
assert(record.schemaVersion === '1' && record.collectionId === manifest.id,
  'review record collection or schema differs');
assert(record.contentVersion === manifest.contentVersion,
  'review record is for an older content version; review the changed content again');

const associations = manifest.questions.flatMap(question => question.diseases.map(disease => ({ question, disease })));
assert(evidence.associations.length === associations.length, 'source crosswalk has the wrong row count');
const evidenceByKey = new Map(evidence.associations.map(row => [`${row.ruleId}/${row.featureId}`, row]));
assert(evidenceByKey.size === evidence.associations.length, 'source crosswalk has duplicate rows');
for (const { question, disease } of associations) {
  const row = evidenceByKey.get(`${disease.ruleId}/${question.featureId}`);
  assert(row, `missing source row for ${disease.ruleId}/${question.featureId}`);
  assert(row.diseaseId === disease.diseaseId && row.hpoId === question.hpoId,
    `source association differs for ${disease.ruleId}/${question.featureId}`);
  assert(row.hpoLabel && row.sourceDate && disease.sourceRefs.includes(evidence.sourceId),
    `incomplete source provenance for ${disease.ruleId}/${question.featureId}`);
}

const globalKeys = ['answerSemantics', 'diseaseContext', 'limitations', 'sourceProvenance', 'fhirMapping'];
assert(JSON.stringify(Object.keys(record.featureReviews).sort()) ===
  JSON.stringify(manifest.questions.map(question => question.featureId).sort()),
  'review record must contain exactly the current features');
assert(JSON.stringify(Object.keys(record.globalReviews).sort()) === JSON.stringify(globalKeys.sort()),
  'review record has missing or extra global decisions');
const decisions = [...Object.values(record.featureReviews), ...Object.values(record.globalReviews)];
for (const decision of decisions) {
  assert(['pending', 'approved', 'changes_requested'].includes(decision.status), 'invalid decision status');
  if (decision.status !== 'pending') {
    assert(decision.reviewer?.trim() && /^\d{4}-\d{2}-\d{2}$/.test(decision.reviewedAt ?? ''),
      'completed decisions require a reviewer and date');
  }
  assert(typeof decision.decisionNotes === 'string', 'decision notes must be text');
  if (decision.wordingChanges) assert(Array.isArray(decision.wordingChanges), 'wording changes must be a list');
}

const lines = [
  '# IKD candidate content for clinical review',
  '',
  '> Review packet only. No clinical approval or diagnostic performance is implied.',
  '',
  `Collection: ${manifest.title} (${manifest.id}), version ${manifest.version}.`,
  `Content version: \`${manifest.contentVersion}\`.`,
  '',
  'Review every feature label, HPO mapping, question, help text, disease association, and source link.',
  'Record decisions and wording changes in `review-record.json` against this content version.',
  'After a wording or mapping change, rebuild the content, regenerate this packet, and review the new version.',
  '',
  '## Source provenance',
  '',
  ...Object.entries(manifest.sources).flatMap(([id, source]) => [
    `- **${id}:** [${source.title}](${source.url}). ${source.release ?? 'Release unspecified'}. Accessed ${source.accessed ?? 'date unspecified'}.`,
  ]),
  `- Orphadata source XML: [download](${evidence.sourceUrl}); SHA-256 \`${evidence.sourceSha256}\`; ${evidence.license}. The ten rows in \`orphadata-evidence.json\` were copied from the local source audit.`,
  '',
  '## Candidate features',
  '',
];

for (const [index, question] of manifest.questions.entries()) {
  lines.push(`### ${index + 1}. ${question.label} (\`${question.featureId}\`)`, '');
  lines.push(`- Section: ${manifest.sections.find(section => section.id === question.section)?.label ?? question.section}`);
  lines.push(`- HPO: ${question.hpoId}; EADV input: \`${question.sourceAttribute}\`.`);
  lines.push(`- Question: ${question.question}`);
  lines.push(`- Help: ${question.help ?? '(none)'}`);
  lines.push(`- Feature source IDs: ${question.sourceRefs.join(', ')}.`);
  for (const disease of question.diseases) {
    const row = evidenceByKey.get(`${disease.ruleId}/${question.featureId}`)!;
    lines.push(`- Association: ${disease.label} (${disease.diseaseId}); rule \`${disease.ruleId}\` v${disease.version}, input declaration line ${disease.inputLine}.`);
    lines.push(`- Orphadata row: ${row.hpoId} “${row.hpoLabel}”, source date ${row.sourceDate}; frequency category “${row.frequency}” is provenance context only, never a score or patient probability.`);
    lines.push(`- Disease source IDs: ${disease.sourceRefs.join(', ')}.`);
  }
  lines.push('');
}

lines.push(
  '## Shared review decisions', '',
  `- Assessment limitations shown in Atlas: ${manifest.limitations}`,
  `- Disease association context shown in Atlas: ${manifest.associationContext}`,
  '- Answer semantics: present and absent are explicit findings; unknown / not assessed is explicit; unanswered remains distinct and optional.',
  '- FHIR mapping: present/absent become boolean Observations; unknown has dataAbsentReason; unanswered produces no Observation. Check displayed wording against these states.',
  '- Disease context: an association is background information and cannot establish or exclude disease.',
  '- Scope: ten candidate features across two disease ruleblocks. This is not a complete inherited kidney disease screen or diagnostic criteria. It does not rank diseases or use Orphadata frequency categories as weights.',
  '- Reviewer checks: confirm source attribution, release/version, terminology meaning, wording, limitations, and whether any feature needs added clinical context.',
  '',
);

const output = `${lines.join('\n')}\n`;
const packetPath = resolve(reviewRoot, 'CANDIDATE-CONTENT.md');
if (process.argv.includes('--check') || process.argv.includes('--gate')) {
  assert(existsSync(packetPath) && readFileSync(packetPath, 'utf8') === output,
    'candidate packet is stale; run npm run review:build');
} else {
  writeFileSync(packetPath, output);
  console.log(`Wrote IKD review packet for ${manifest.contentVersion}.`);
}

const pending = decisions.filter(decision => decision.status !== 'approved').length;
if (process.argv.includes('--gate')) {
  assertClinicalReviewApproved(record, manifest.contentVersion);
  console.log('IKD clinical review gate passed.');
} else if (process.argv.includes('--check')) {
  console.log(`IKD review materials match content ${manifest.contentVersion}; ${pending} decisions await approval.`);
}
