# Picorules Atlas development milestones

Status date: 27 September 2026. This roadmap covers development after the initial
questionnaire scaffold in [SPEC.md](SPEC.md). The local proof of concept extends
that initial scope; clinical approval and deployment remain separate. No target
dates are assigned.

## Current position

| Milestone | Outcome | Status |
| --- | --- | --- |
| M0 | Ten-question IKD scaffold | Verified locally |
| M1 | Reproducible project baseline | Complete |
| M2 | Read-only Picorules ruleblock viewer | Complete |
| M3 | IKD content accepted for prototype | Complete for proof of concept; accuracy review deferred |
| M4 | Assessment review and FHIR handoff | Complete for local proof of concept |
| M5 | Rule results and possible-diagnosis handoff | Complete locally |
| M6 | Single-action results on the assessment page | In progress |
| M7 | Hosted demonstration | Deferred at user request |

## End-to-end proof of concept (complete locally)

The clinical reviewer accepted the ten questions in principle for a proof of
concept and asked to see how rules lead to conclusions and next actions. The local
questionnaire → answer review → Picorules evaluation → explanatory result →
user-initiated FHIR download flow is implemented. The example rule output uses an
explicit demonstration threshold and shows the contributing findings. It does
not claim diagnostic accuracy or recommend tests or treatment. Clinical release
and deployment remain separate decisions.

| Step | Status | Evidence |
| --- | --- | --- |
| Author and validate executable demonstration outputs | Done locally | Two versioned ruleblocks emit review prompts; content checks, FHIR bridge evaluation tests, and 26 unit tests passed |
| Complete review, result, and FHIR download UI | Done locally | Eight static browser tests passed, including changed-answer output, FHIR download, keyboard, mobile, and privacy checks |
| Validate full flow and record evidence | Done locally | `content:check`, `review:check`, `typecheck`, 26 unit tests, static build, and eight static browser tests passed on 27 September 2026 |

The next application step adds structured rule scores and possible diagnoses to
the downloaded FHIR handoff. Prototype score semantics remain the authored
present-feature count and two-feature threshold.

The browser checks cover both branches of the illustrative conclusion, answer
editing, the downloaded FHIR observations, keyboard focus, a 390px viewport,
assessment clearing on reload, and absence of answer-bearing requests or browser
storage writes. The current content version is `bc826888e7405139`.

Mark a milestone complete only when its exit checks and review evidence are recorded
here or linked from here. Keep candidate clinical content and unvalidated evaluation
out of clinical release claims.

## M0 — Ten-question IKD scaffold (verified locally)

**Delivered at M0:** The static Atlas app selected IKD, generated ten questions from two
Picorules ruleblocks, recorded four answer states, and created a transient FHIR R4
bundle in browser memory. At M0 it had no submission, diagnosis, score,
recommendation, saved assessment, or results screen.

**Evidence:** On 27 September 2026, `npm run content:check`, `npm run typecheck`,
`npm test` (16 tests), `npm run build`, and `npm run test:browser` (3 tests) passed.
The served build opened all ten questions through an HTTP LAN address after the UUID
compatibility fix. Reference screenshots are in `screenshots/`.

**Limit:** This is a demonstration scaffold, not a clinically reviewed instrument.
Atlas was added to the workspace Git repository in commit `cc2ce19`.

## M1 — Reproducible project baseline (complete)

**Progress record**

| Step | Status | Evidence |
| --- | --- | --- |
| Track Atlas in Git | Done | Commit `cc2ce19` |
| Pin compiler and document clean setup | Done locally | Clean temporary checkout passed install, validation, 16 tests, and build on 27 September 2026 |
| Add automated validation | Done | [Atlas CI run 36293714044](https://github.com/asaabey/picorules-top-node/actions/runs/36293714044) passed all steps |
| Check static LAN preview and answer privacy | Done locally | 3 static browser tests passed; HTTP LAN opened 10 questions, answered without new requests or browser storage |

All M1 exit checks passed on 27 September 2026. The GitHub Actions run built the
pinned compiler and Atlas from checkout, validated content, typechecked, ran unit
tests, built the static site, and passed browser tests against that export.

**Work**

- Document how Atlas and its adjacent `picorules-compiler-js-core` dependency are
  built from a clean checkout. Atlas is now tracked in the workspace repository.
- Add CI for content validation, typecheck, unit tests, static build, and browser
  checks. Run at least one browser check in an ordinary HTTP LAN origin or with
  secure-context-only APIs unavailable.
- Keep a preview command that binds to `0.0.0.0` and document the expected local
  network URL. Confirm that no answer-bearing requests or browser storage writes
  occur during an assessment.

**Exit checks:** A clean checkout can build the static `out/` site from documented
commands; CI passes; the collection opens and answers work on the preview URL;
the project has a tracked change history. This milestone does not deploy the site.

## M2 — Read-only Picorules ruleblock viewer

**Progress record**

| Step | Status | Evidence |
| --- | --- | --- |
| Publish exact authored source in the static build | Done locally | Versioned `.prb` assets, manifest source text, input line locations; source-fidelity and synthetic isolation tests passed |
| Add selected-collection viewer and input links | Done locally | Five static browser tests passed, including keyboard and 390px mobile navigation; rendered source matches authored files |
| Validate and close M2 | Done locally | `content:check`, `typecheck`, 17 unit tests, static build, and 5 static browser tests passed on 27 September 2026 |

All M2 exit checks passed locally on 27 September 2026. Both IKD ruleblocks are
served as versioned static `.prb` assets and displayed byte-for-byte as their
committed UTF-8 text. Every question association links to its authored
`#define_attribute` input declaration. Synthetic fixtures verify collection
isolation and shared-feature links. Browser checks verify all ten links, source
fidelity, keyboard activation and focus, and a 390px mobile layout. The viewer
states that these ruleblocks declare features and contain no diagnostic logic.
This completion does not represent clinical review or deployment.

Before M2, the app showed disease context beside each question but did not show
the authored `.prb` ruleblock. Its manifest held only executable input statements
and metadata-derived questions.

**Work**

- Add a read-only view of each ruleblock in the selected collection, showing its
  exact versioned `.prb` source, rule ID, disease label, version, and references.
  The build must supply the source as a static asset; the browser must not read the
  server filesystem or call a rule service.
- Link each question's disease association to the relevant ruleblock and input
  declaration. Keep ruleblocks from other collections out of the selected view.
- Render source as escaped text with keyboard-accessible navigation and a usable
  mobile layout. Display the content version so reviewers can identify the source
  they inspected.

**Exit checks:** Both IKD ruleblocks are viewable and match the committed `.prb`
files; question links lead to the correct input declaration; synthetic collection
tests verify isolation; browser tests cover keyboard and mobile access. Explain in
the viewer that these first ruleblocks declare features and do not contain a
diagnostic algorithm.

## M3 — IKD content accepted for prototype

**Prototype decision:** The clinical reviewer accepted the current questions and
workflow for building the end-to-end application on 27 September 2026. See
[prototype sign-off](reviews/ikd/PROTOTYPE-SIGNOFF.md). This closes M3 for the
prototype only. The detailed review record remains pending for a future clinical
accuracy and release decision; it does not block application development.

**Progress record**

| Step | Status | Evidence |
| --- | --- | --- |
| Prepare versioned review materials and source crosswalk | Done locally | Ten-row Orphadata evidence snapshot, content-versioned packet, pending decision record; `review:check` passed |
| Show candidate limits and source provenance in Atlas | Done locally | Static build and six browser tests passed; assessment explains incomplete coverage and the viewer exposes release, attribution, and license details |
| Version clinical context wording with collection content | Done locally | Limitations and disease-context text now enter the content hash; version `442bae27603451e8`; 20 unit tests and six static browser tests passed |
| Set clinical review sign-off count | Done locally | User confirmed one clinical reviewer is sufficient; gate accepts one sign-off and still requires all decisions and matching content version; 23 unit tests passed |
| Clarify conclusion and recommendation scope | Local proof of concept delivered | Reviewer asked how conclusions and recommendations are computed. The new rules count present findings and emit an illustrative review prompt; clinical accuracy remains a later release decision. |
| Accept ten questions and workflow for prototype | Done | Reviewer tested the app, accepted the current questions for the proof of concept, and signed off on application-first development |
| Detailed clinical accuracy review | Deferred | The existing 15-decision record stays pending for a later clinical release decision |

The [M3 review packet](reviews/ikd/README.md) contains the exact candidate wording,
ten source pairings, source provenance, answer semantics, and points requiring
clinical judgment. Its integrity check passes. `npm run review:gate` currently
stops on 15 pending decisions, as intended for later clinical validation.
Prototype acceptance is recorded separately and is sufficient to continue
application development. Technical validation does not establish clinical accuracy.

**Work**

- Have the qualified clinical reviewer check all ten feature labels, HPO mappings,
  question wording, answer semantics, help text, and disease-context language.
- Record reviewer, date, source version, decisions, and any wording changes.
  Rebuild the manifest and inspect the resulting questionnaire and FHIR mappings.
- State clearly what the ten-feature set does and does not cover. Do not turn
  Orphadata frequency labels into scores or probabilities.

**Prototype exit checks:** The source and content version are recorded; the
clinical reviewer accepted the prototype workflow and questions in principle;
content, FHIR, and browser checks pass. Detailed accuracy review remains open.

## M4 — Assessment review and FHIR handoff

**Local proof of concept complete:** The assessment has a review screen that
distinguishes present, absent, unknown, and unanswered; a user-initiated FHIR
download follows the illustrative rule output. The clinical reviewer tested the
running app on 27 September 2026 and reported that it works as expected. This
confirms the flow, not clinical validity of the questions or rule threshold.

**Work**

- Define the clinician's next action after answering the questions. The proposed
  first outcome is a review summary of recorded findings, with a way to edit them.
  It must distinguish absent, explicit unknown, and unanswered.
- Offer a user-initiated download of the existing FHIR bundle after reviewing the
  output format and identifiers. Keep the data in browser memory until download;
  no account, database, or server submission is part of this milestone.
- Show collection and content versions with the handoff, and test the exported
  bundle against the FHIR R4 contract and representative answer combinations.

**Exit checks:** A completed assessment has a clear, accessible review path; the
exported bundle matches the displayed answers and validates; reload still clears
the assessment. The M4 review/export flow was accepted before M5 added possible
diagnoses for prototype review.

## M5 — Rule results and possible-diagnosis handoff

Each selected rule set now contributes a present-feature score and its threshold
decision. The result screen displays the score, contributing findings, source
rule, and a possible diagnosis for review when the prompt fires. The FHIR R4
download includes a score Observation for every selected rule and a
ClinicalImpression with the raised candidates, their basis, and workflow actions.
It includes an anonymous Patient reference and no confirmed Condition. The
result is still a demonstration: the count is not a calibrated clinical score.

On 27 September 2026, `content:check`, `review:check`, `typecheck`, 30 unit
tests, the static build, and eight browser tests passed. Tests cover both
candidate branches, selected-collection isolation, score and source trace,
FHIR R4 schema validity, download content, keyboard and mobile use, and absence
of answer-bearing requests or browser storage writes. M5 is complete locally.

**Exit checks:** The exported scores and candidates match the displayed rule
results, the full bundle validates against the official FHIR R4 JSON Schema,
collection isolation holds, and browser tests cover both candidate branches.

## M6 — Single-action results on the assessment page

The reviewer found the separate review and result pages added unnecessary
clicks. Replace them with one action at the end of the questionnaire that runs
the selected rules and displays scores, possible diagnoses, and FHIR download
on the same page. Keep answer editing available in place and never show a stale
result after an answer changes. Verify keyboard focus, mobile layout, and the
downloaded handoff against the displayed results.

## M7 — Hosted demonstration

Deployment is on hold while the application interface is improved.

**Work**

- Choose static hosting and a deployment process for `atlas.picorules.com`; serve
  the app over HTTPS and verify the deployed artifact against the tested build.
- Review accessibility with keyboard and screen-reader use, mobile layouts,
  privacy behavior, source attribution, and user-facing limitations.
- Run a small, supervised demonstration with synthetic cases across the questionnaire,
  rule output, and review/export flow;
  collect feedback without transmitting assessment answers to analytics or logs.

**Exit checks:** Deployment and DNS are approved separately; the hosted app passes
smoke checks; the prototype limitations are visible; and a feedback and issue
triage process exists. The score and possible diagnosis remain demonstration
outputs until a separate clinical validation effort is completed.

## Later clinical validation and release decision

The application can show an illustrative score and possible diagnosis for review
without claiming clinical accuracy. Before clinical use, decide what claim the
output may make and validate the exact rules and wording.

For clinical release, review each disease rule and its source, expected behavior
for missing and conflicting data, representative positive and negative cases,
and clinical performance. Retain the source/version trail for every output.

**Exit checks if pursued:** Signed clinical logic specification, reviewed test cases,
documented limitations, and approval of the exact user-facing result language.

## Decisions to record before the next milestone starts

| Decision | Needed for | Current assumption |
| --- | --- | --- |
| CI workflow and clean-checkout setup | M1 | Atlas is in the workspace repository; CI remains to be added |
| Ruleblock source display and navigation | M2 | Delivered read-only for selected collection, with versioned static source and input links |
| Prototype content and workflow | M3 | User is the clinical reviewer and signed off for proof of concept; detailed accuracy decisions remain pending for clinical release |
| Completion summary and FHIR download behavior | M4 | Implemented and accepted by the clinical reviewer in the local proof of concept |
| Hosting, DNS, and pilot access | M7 | On hold at the user's request while the application is improved |
| Clinical accuracy claim | Later clinical validation | No clinical claim; current score and possible diagnosis are demonstration outputs |
