# IKD clinical content review (M3)

**Status: awaiting clinical review decisions.** This folder prepares the current
candidate content for review. Its presence does not approve the questionnaire.

## Current calculation boundary

The two `.prb` files declare feature fetches and a simple count of present findings.
Each emits an illustrative review prompt when at least two of its five inputs are
present. The browser runs these authored rules against the transient FHIR bundle
and shows the count and contributing findings. The threshold is an invented
demonstration rule, not a disease criterion, calibrated score, or probability.
The next action is authored workflow text for reviewing findings or clarifying
missing answers; it does not advise tests or treatment. This M3 packet asks for
review of the questionnaire content and its limitations. The
[M6 decision gate](../../MILESTONES.md#m6--validated-clinical-evaluation-decision-gate)
covers any future conclusions or recommendations, including a clinician-authored
logic specification, missing-data behavior, test cases, and validation before use.

## What to review

Open the static Atlas assessment and [candidate content packet](CANDIDATE-CONTENT.md)
for the content version named in the packet. Check each of the ten features against the
authored ruleblock and its sources. For every feature, decide whether the short
label, HPO code and meaning, question, help text, section, answer control, and
disease association are suitable. Check the shared answer semantics, disease
context, FHIR mapping, source provenance, and limitations separately. The packet
contains the exact candidate wording and input declaration line for each item.

The source pairings in [orphadata-evidence.json](orphadata-evidence.json) reproduce
the ten relevant rows from the locally audited Orphadata phenotype export. Its
provenance records the source XML URL, SHA-256, release, and CC BY 4.0 license.
The local audit at `../working-docs/docs/ikd-phenotype-data/README.md` is
untracked working material, so this committed subset is the stable evidence
snapshot for M3. [GeneReviews: Fabry Disease](https://www.ncbi.nlm.nih.gov/books/NBK1292/)
and [GeneReviews: Tuberous Sclerosis Complex](https://www.ncbi.nlm.nih.gov/books/NBK1220/)
provide disease context. The candidate questions are Atlas-authored wording.

Orphadata Science: Free access data from Orphanet. © INSERM 1999. Available at
https://sciences.orphadata.com/. July 2026 knowledge-base release; source XML
generated 2026-06-23. Accessed 2026-09-26. Licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changes: selected
the ten Atlas disease–phenotype rows from the kidney disease export and recorded
them in JSON. No endorsement is implied.

## Review decisions

1. Enter a `pending`, `approved`, or `changes_requested` decision for every feature
   and every shared topic in [review-record.json](review-record.json). A completed
   decision needs the reviewer's name and ISO date. Record the reason and any
   proposed wording change in `decisionNotes` and `wordingChanges`.
2. Resolve requested changes in the authored `.prb` files or UI. Increment the
   relevant version when changing clinical content; run `npm run content:build`.
   Update the review record's content version, run `npm run review:build`, and have
   the clinical reviewer inspect the resulting questionnaire and FHIR mapping again. A prior
   approval does not carry over automatically to changed content.
3. Record the qualified clinical reviewer's name, qualification, date,
   and final content version in `signOffs` only after approving the questionnaire
   and its limitations. `npm run review:gate` checks that all decisions and the sign-off
   refer to the current content. It cannot verify professional qualifications.
4. Run `npm run content:check`, `npm run review:check`, `npm run typecheck`,
   `npm test`, `npm run build`, and the static browser suite before closing M3.

`npm run review:check` verifies that the packet, source crosswalk, and pending or
completed review record still match the manifest. It does not signify approval.

## Points needing explicit clinical judgment

- The ten features are a compact demonstration, not a complete inherited kidney
  disease screen, diagnostic criteria, or a sensitivity claim. Recorded absence
  does not exclude either disease.
- The TSC questions record single findings. They do not capture lesion counts,
  sizes, distribution, or combinations used in clinical diagnostic criteria.
  The HPO angiofibroma term is broad, while the TSC source discusses facial
  angiofibromas. Review the wording and mapping without silently equating them.
- Fabry manifestations vary by phenotype and patient. These five features do not
  cover the full disease spectrum or quantify proteinuria.
- Orphadata frequency categories are preserved only as source context in the
  evidence snapshot. They are not scores, calibrated probabilities, or weights.
  In particular, the local Orphadata row calls TSC renal angiomyolipoma
  “Occasional (29-5%),” while the [GeneReviews TSC clinical-features table](https://www.ncbi.nlm.nih.gov/books/NBK1220/)
  gives 70%. The discrepancy needs reviewer interpretation; Atlas displays
  neither frequency to assessment users.
- No patient answers are persisted or sent to a service. The FHIR bundle is
  transient and has no disease Condition resource or diagnostic conclusion.
