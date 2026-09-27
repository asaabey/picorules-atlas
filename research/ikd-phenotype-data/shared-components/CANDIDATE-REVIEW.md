# Review of the 16 shared phenotype candidates

27 September 2026. Editorial and terminology review by Codex; clinical decisions remain pending. Wording assumes a clinician recording history and documented findings, pending the user's respondent preference. Sources: the local association export and the unmodified [HPO v2026-09-01 release](https://github.com/obophenotype/human-phenotype-ontology/releases/tag/v2026-09-01). Its ontology hash matches the earlier source audit. All 16 candidate IDs exist and are not obsolete in this release.

Recommendation: **retain 11 candidates, revise four definitions/questions, and retain renal insufficiency as broad context**. The proposed revisions are applied to the authoring JSON and recorded with before/after values in [candidate-review.json](candidate-review.json). These are proposed editorial changes, not recorded user approval.

| Candidate | Recommendation | Review finding |
| --- | --- | --- |
| Haematuria | Revise definition/help | Include both known and unknown subtypes. A broad parent concept must not be defined as subtype unknown. |
| Microscopic haematuria | Retain | Ask for documented microscopic haematuria. Preserve the test/report; a broad haematuria record cannot establish the subtype. No new lab threshold is specified. |
| Visible haematuria | Retain | Record the event without assuming persistence or inherited cause. A clinician may document reported history; the source method should distinguish that from a test result. |
| Hearing impairment | Revise definition/help | The initial phrase “of unspecified type” was too narrow. Include hearing impairment whether or not its type is known. |
| Sensorineural hearing impairment | Retain | Require the documented type. General hearing difficulty does not establish sensorineural impairment. |
| Bilateral sensorineural hearing impairment | Retain | Require both ears to be explicitly identified; do not infer laterality. |
| Renal cyst | Revise question/help | Ask “Has at least one renal cyst been documented on imaging?” to include both single and multiple cysts. |
| Multiple renal cysts | Retain | Use the documented report description. HPO does not provide a numerical threshold here. Preserve number/distribution if later collected. |
| CKD | Retain | Record documented CKD. Deriving chronicity from measurements is a separate extraction rule. |
| Renal insufficiency | Context/fallback | The source term covers reduced kidney function broadly. Retain records expressed this way, but avoid treating this as an additional independent signal alongside CKD or CKD stage 5. |
| Hypertension | Retain | Record documented hypertension. The HPO concept concerns chronic elevation; one raised reading does not establish it. |
| CKD stage 5 | Retain | Ask about a documented stage. Do not make dialysis a required checkbox or infer stage 5 from any dialysis exposure. |
| Ataxia | Retain | Use clinical documentation of impaired coordination, not an unspecified report of dizziness. |
| Hypotonia | Retain | Low muscle tone is distinct from weakness. The existing clinical-assessment wording is appropriate for this draft. |
| Global developmental delay | Revise question and time scope | Ask whether it was documented before age five. An adult can have this childhood history; adult difficulties alone must not create the childhood finding. |
| Renal cell carcinoma | Retain | Require the documented diagnosis, not an unspecified renal mass. Record the date before using it in a pre-diagnosis analysis. |

These recommendations concern what is collected. They do not endorse every disease association in the source export or establish clinical screening performance.

## Proposed shared question groups

Keep all precise feature identifiers, but organise their questions into related groups:

1. **Haematuria:** broad finding, then microscopic/visible detail. Both details may be present at different times; they are not mutually exclusive.
2. **Hearing:** broad impairment, then documented sensorineural type and laterality. Laterality unknown is distinct from unilateral impairment.
3. **Kidney function:** recorded impairment, CKD and stage. Offer the most specific documented information without forcing repeated answers for every broader term.
4. **Kidney imaging:** cyst presence, multiple cysts and separately documented dysplasia. Cyst presence alone does not establish a dysplasia subtype.
5. **Neurological history:** separate ataxia, hypotonia and childhood developmental delay findings. These are distinct findings and should not share one boolean answer.

This is a layout recommendation. Do not hard-hide a specific question merely because its broader question is unanswered or unknown. If answers conflict for the same time/context, request clarification instead of overwriting an answer. Across different dates, apparent conflicts may be valid.

## Overlap policy

The pinned ontology supports broad/specific relationships within haematuria, hearing, kidney function, cyst morphology, retinal hamartoma and hepatic fibrosis. The six editorial clusters remain useful, but membership alone does not mean equivalence. In particular, nephropathy is not interchangeable with CKD; cystic dysplasia forms are not interchangeable; congenital and periportal hepatic fibrosis are not synonyms.

For the initial Atlas implementation, preserve answers exactly as entered and do not automatically populate other questions. In a later reviewed inference layer, a specific positive may support a broader concept with explicit provenance. This must be distinguishable from a directly answered question. Never derive a specific subtype from a broad positive, or infer all negatives from missing records.

An evidence summary should show related findings together and avoid presenting broad plus specific assertions from the same evidence as independent support. There is no endorsed scoring formula in this review. Separate observations can still carry useful detail and must remain available for review.

## Common answer instructions

- **Present:** the named finding is documented, with the method indicated where possible.
- **Absent:** an appropriate assessment explicitly found it absent within the question's time scope.
- **Unknown:** not assessed, records unavailable, insufficient specificity, or unresolved conflicting evidence.
- **Unanswered:** the question has not yet been completed.

For a historical question, a normal examination today does not establish that the finding has never occurred. Event/assessment dates and source references are desirable next inputs. The current presence-only interface cannot express all temporal details; this review does not imply they have been implemented.

## Review boundary

The ten original Atlas questions are unchanged by this pass. Their more varied evidence wording (patient report, history, or specialist finding) still needs a later consistency review. The other 279 inventoried terms remain untriaged. No runtime or `.prb` changes were made.
