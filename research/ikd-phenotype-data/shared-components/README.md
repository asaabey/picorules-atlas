# Shared IKD phenotype components — first authoring draft

Created 27 September 2026 as item 1 of the [Atlas rule-authoring plan](../../ikd-atlas-rule-authoring-plan-2026-09.md). These files are authoring material for the Atlas agent; they are not loaded by the application.

The [first candidate review](CANDIDATE-REVIEW.md) checks all 16 new definitions against the pinned HPO release: 11 retained, four revised, and renal insufficiency retained as context. Proposed edits and their rationale are recorded in [candidate-review.json](candidate-review.json); clinical approval remains pending.

## What can be shared

One finding should have one stable definition and question, with one patient answer reused by each relevant disease rule. For example, proteinuria can be collected once and referenced by the Fabry and Alport profiles. The associated disease, source frequency and interpretation remain properties of each disease–feature association.

| Component | Shared responsibility | Disease-specific responsibility |
| --- | --- | --- |
| Feature definition | Stable identifier, precise meaning, HPO ID, wording, evidence requirement, temporal scope | Which findings the disease profile references |
| Question and answer | Reusable presence control, help text, present/absent/unknown/unanswered semantics | Additional context required by a particular assessment |
| Evidence record | Patient finding, source/report reference, dates, assertion method and assessment state | How reviewed logic uses that evidence |
| Section | Kidney, hearing, eyes, skin, cardiovascular and neurological navigation | Which sections/features apply to a selected profile |
| Association record | Common storage format and source/version handling | Source disease identifier, frequency, criterion annotation and mapping caveat |
| Result explanation | Common display of supporting findings and missing information | Reviewed predicate and its clinical interpretation |

The current Atlas content compiler already merges identical `feature_id` definitions and rejects conflicting shared definitions. Initially the authoring register can supply identical metadata to each `.prb`; it does not require a new runtime dependency or `.bind()` support. A future exporter should read this register and the association table, rather than maintain separate hand-edited question copies. Do not implement that exporter until the selected definitions and association subset are reviewed.

## Files and current completeness

- [feature-register.csv](feature-register.csv): 305 distinct HPO terms with profile/group coverage and authoring status. All terms are inventoried; 279 still require triage. Empty `feature_id` and `source_attribute` mean no canonical Atlas definition has been proposed yet.
- [feature-definitions.json](feature-definitions.json): 26 question definitions: 10 copied exactly from Atlas content `bc826888e7405139`, plus 16 locally authored candidates. Every definition has a pending clinical review status. Candidate definitions focus on reusable kidney, hearing, cardiovascular and neurological findings.
- [disease-feature-associations.csv](disease-feature-associations.csv): all 449 original rows, retaining every original source column, with join key, editorial disease group and pending review status added. No frequency is converted into a score.
- [overlap-review.json](overlap-review.json): six editorial clusters for reviewing related concepts. These are not verified ontology edges and do not implement automatic propagation or exclusion.
- [manifest.json](manifest.json): input CSV hash, provenance, Atlas snapshot version, counts, group assignments and attribution.

There are **83 terms shared by multiple source profiles**, of which **42 span different disease groups** under the editorial grouping in the manifest. Grouping the Alport and ciliopathy profiles avoids presenting every subtype overlap as a separate disease-group reuse opportunity. These seven represented groups exclude ADTKD, which has no source rows in this export. The 13 source profiles remain distinct in the association table; grouping does not resolve the study's 17-entity crosswalk.

## Definition and evidence semantics

`featureKey` is the exact HPO ID and joins definitions to the inventory and association table. `featureId` is the stable Atlas identifier; `sourceAttribute` is `phen_<featureId>`. The initial design has one question per selected HPO term. If later work needs multiple contexts for the same term, add an explicit context identifier rather than silently changing the existing question's meaning.

The register's source labels remain verbatim. Locally authored display labels and questions are stored separately. Definition source references establish terminology/provenance, not clinical approval of the wording. Association sources and frequencies remain separate from shared question provenance. A blank diagnostic-criterion field remains unknown.

Proposed patient evidence contract for a later implementation:

| Field | Meaning |
| --- | --- |
| `featureId`, `hpoId` | Which precise finding is being assessed |
| `state` | `present`, `absent`, `unknown`, or `unanswered` |
| `assertionMethod` | Reported history, documented finding, or derived measurement; must be explicit |
| `observedAt`, `recordedAt` | Clinical event date and recording date, nullable separately |
| `sourceReferences` | Questionnaire response, report or observation identifiers |
| `definitionVersion` | Version used to interpret the finding |
| `evidenceGroupId` | Optional link between assertions derived from the same report/event for duplicate review |

This is a proposed contract, not a claim that Atlas currently captures these fields. Missing evidence remains unknown. A patient's disease diagnosis must not manufacture expected findings. An explicit negative on a specialist finding requires an appropriate assessment; absence of a report is not a negative result.

Broad and specific concepts remain separately identifiable: haematuria does not establish microscopic haematuria; general hearing impairment does not establish sensorineural hearing impairment; renal insufficiency does not establish chronicity. Do not automatically propagate answers between the overlap clusters. A later reviewed ontology policy can make entailment explicit while preserving the original observation and preventing duplicate contributions to a result.

## Candidate definitions and integration

The 16 new candidate definitions cover haematuria (broad/microscopic/macroscopic), hearing impairment (broad/sensorineural/bilateral sensorineural), renal cyst/multiple cysts, CKD/renal insufficiency/CKD stage 5, hypertension, ataxia, hypotonia, global developmental delay and renal cell carcinoma. They ask about documented findings and introduce no numerical diagnostic thresholds.

The `hearing` and `cardiovascular` sections are proposed additions; they are not yet present in the Atlas collection. Existing feature identifiers, labels, help, sections and question text are preserved exactly. The existing ten questions' original prototype acceptance does not extend to new disease associations or to these new candidate definitions.

Next authoring steps:

1. Review the 16 candidate definitions for precise meaning, wording and suitability for the intended respondent. Resolve the six overlap clusters before any scoring use.
2. Triage the remaining 279 terms into initial collection, specialist extension, overlap review, source review or deferred. A source row alone does not justify a question.
3. Select reviewed disease–feature pairs for the first six-group collection. Keep uncertain Joubert mappings and sparse nephronophthisis coverage explicit; supplement ADTKD separately.
4. Agree the evidence/result contract with the Atlas implementation, then export selected definitions into versioned `.prb` input metadata and regenerate the review packet.

No executable rules, runtime files or application tests were changed. This draft was checked for unique keys/identifiers, complete association joins, preservation of original source rows, matching coverage counts and exact preservation of the ten Atlas questions.

Orphadata attribution and reuse information are retained in the manifest and [original source audit](../README.md). The new authoring fields, groupings, wording and overlap clusters are local proposals.
