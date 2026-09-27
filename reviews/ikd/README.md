# IKD clinical content review (M3)

**Status: original prototype accepted; later profiles and detailed accuracy review pending.** The
clinical reviewer accepted the original ten questions and workflow for application
development in [prototype sign-off](PROTOTYPE-SIGNOFF.md). The decision record
below remains pending for any later clinical release claim.

## Current calculation boundary

Eight rules calculate candidate LIRICAL-weighted phenotype matching scores. Six new nephronophthisis and ciliopathy rules count present clinical features, one point each. Both models give zero for family-history context and unticked findings; their totals have different units. Results and the FHIR handoff distinguish the models and apply no diagnostic cutoff. See [implementation details and limitations](WEIGHTING-IMPLEMENTATION.md). Clinical approval remains pending.

## What to review

Open the static Atlas assessment and [candidate content packet](CANDIDATE-CONTENT.md)
for the content version named in the packet. Check each of the 60 questions against the
authored ruleblock and its sources. For every feature, decide whether the short
label, HPO code and meaning, question, help text, section, answer control, and
disease association are suitable. Check the shared answer semantics, disease
context, FHIR mapping, source provenance, and limitations separately. The packet
contains the exact candidate wording and input declaration line for each item.

The source pairings in [orphadata-evidence.json](orphadata-evidence.json) reproduce
the 35 relevant rows from the locally audited Orphadata phenotype export. Its
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
the 35 Atlas disease–phenotype rows from the kidney disease export and recorded
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
   `npm test`, `npm run build`, and the static browser suite before any clinical
   release decision. Prototype acceptance is recorded separately.

`npm run review:check` verifies that the packet, source crosswalk, and pending or
completed review record still match the manifest. It does not signify approval.

## Points needing explicit clinical judgment

- The 60 questions are a compact demonstration, not a complete inherited kidney
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
  transient and has no confirmed disease Condition. Its in-progress
  ClinicalImpression holds possible diagnoses for review only.

## Added profiles in collection 0.3.0-demo

Alport (6 inputs), HNF1B (6), ARPKD (6) and VHL (7) extend the original Fabry/TSC demonstration. Proteinuria is shared by Fabry and Alport, giving 34 unique questions and 35 associations. The new profiles use the audited Orphadata snapshot; they do not claim complete screening coverage. Alport is broad, with no inheritance subtype inference. HNF1B hypomagnesaemia is deferred because it is absent from this source profile. Prenatal oligohydramnios refers to the pregnancy in which the assessed patient was carried.

The original two-finding prompts have been replaced by versioned LIRICAL-derived candidate weights. The previous prototype sign-off is historical and does not approve the new profiles; the current review record is pending against the regenerated content version.

## ADTKD extension

UMOD (6 inputs) and MUC1 (5 inputs) add five unique questions, giving 39 questions and 46 associations. `adtkd-evidence.json` separately preserves HPOA evidence and frequency fields for 11 associations. These are not Orphadata rows. Image modality and reference status are declared in rule metadata. See [ADTKD review](ADTKD-IMPLEMENTATION.md).

## Family-history extension

Three shared prompts record documented pedigree patterns suggesting autosomal dominant, autosomal recessive, or X-linked inheritance. Alport links to all three because its inheritance varies by genetic subtype. These prompts are context, not proof of a molecular diagnosis, and add zero to the LIRICAL-derived score. The ten rule associations and GeneReviews sources are recorded in [inheritance-evidence.json](inheritance-evidence.json). Negative or unclear family history does not exclude any profile.

## Six-profile ciliopathy extension

Broad nephronophthisis, NPHP1, NPHP4, NPHP12, Joubert syndrome, and Mainzer–Saldino syndrome add 18 new shared questions, giving 60 in total. Their 46 new disease–question associations are recorded in [ciliopathy-evidence.json](ciliopathy-evidence.json). Each present clinical finding contributes one point; the shared recessive pedigree prompt contributes zero. This simple count keeps the application flow working while exact subtype mappings and performance remain unreviewed. NPHP12 has particularly sparse subtype annotations; related profiles can produce the same count. The generic Joubert and Mainzer–Saldino profiles use GeneReviews and Orphanet descriptions rather than treating narrower or broader source profiles as exact equivalents.
