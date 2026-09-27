# Picorules Atlas development milestones

Status date: 27 September 2026. This roadmap covers development after the initial
questionnaire scaffold in [SPEC.md](SPEC.md). Milestones M1–M6 are proposed work,
not features of the current app. No target dates are assigned.

## Current position

| Milestone | Outcome | Status |
| --- | --- | --- |
| M0 | Ten-question IKD scaffold | Verified locally |
| M1 | Reproducible project baseline | Complete |
| M2 | Read-only Picorules ruleblock viewer | Complete |
| M3 | Clinically reviewed IKD content | In progress |
| M4 | Assessment review and FHIR handoff | Planned |
| M5 | Questionnaire pilot on HTTPS | Planned |
| M6 | Validated clinical evaluation, if pursued | Decision gate |

Mark a milestone complete only when its exit checks and review evidence are recorded
here or linked from here. Keep candidate clinical content and unvalidated evaluation
out of clinical release claims.

## M0 — Ten-question IKD scaffold (verified locally)

**Delivered:** The static Atlas app selects IKD, generates ten questions from two
Picorules ruleblocks, records four answer states, and creates a transient FHIR R4
bundle in browser memory. It has no submission, diagnosis, score, recommendation,
saved assessment, or results screen.

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

The current app shows disease context beside each question, but it does not show
the authored `.prb` ruleblock. Its static manifest contains executable input
statements and metadata-derived questions, not the complete source text.

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

## M3 — Clinically reviewed IKD content

**Progress record**

| Step | Status | Evidence |
| --- | --- | --- |
| Prepare versioned review materials and source crosswalk | Done locally | Ten-row Orphadata evidence snapshot, content-versioned packet, pending decision record; `review:check` passed |
| Show candidate limits and source provenance in Atlas | Done locally | Static build and six browser tests passed; assessment explains incomplete coverage and the viewer exposes release, attribution, and license details |
| Version clinical context wording with collection content | Done locally | Limitations and disease-context text now enter the content hash; version `442bae27603451e8`; 20 unit tests and six static browser tests passed |
| Review all ten features and global wording | Awaiting qualified reviewers | Reviewer identities and decisions pending |
| Apply decisions, rebuild, inspect FHIR, and validate | Partly done | Real IKD FHIR mapping tests pass; final content and sign-off require reviewer decisions |

The [M3 review packet](reviews/ikd/README.md) contains the exact candidate wording,
ten source pairings, source provenance, answer semantics, and points requiring
clinical judgment. Its integrity check passes. `npm run review:gate` currently
stops on 15 pending decisions, as intended. Two qualified clinical reviewers
must record decisions and sign off on the final content version before M3 can
be marked complete. Technical validation does not substitute for that review.

**Work**

- Have qualified clinical reviewers check all ten feature labels, HPO mappings,
  question wording, answer semantics, help text, and disease-context language.
- Record reviewer, date, source version, decisions, and any wording changes.
  Rebuild the manifest and inspect the resulting questionnaire and FHIR mappings.
- State clearly what the ten-feature set does and does not cover. Do not turn
  Orphadata frequency labels into scores or probabilities.

**Exit checks:** The reviewed content and source provenance are versioned; reviewers
sign off on the questionnaire and limitations; content, FHIR, and browser checks pass.
Any added feature has a documented source and clinical meaning.

## M4 — Assessment review and FHIR handoff

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
the assessment; there is no disease ranking or diagnostic conclusion. Confirm the
review and export behavior with users before implementation.

## M5 — Questionnaire pilot on HTTPS

**Work**

- Choose static hosting and a deployment process for `atlas.picorules.com`; serve
  the app over HTTPS and verify the deployed artifact against the tested build.
- Review accessibility with keyboard and screen-reader use, mobile layouts,
  privacy behavior, source attribution, and user-facing limitations.
- Run a small, supervised pilot of the questionnaire and review/export flow;
  collect feedback without transmitting assessment answers to analytics or logs.

**Exit checks:** Deployment and DNS are approved separately; the hosted app passes
smoke checks; clinical reviewers approve the pilot content; a feedback and issue
triage process exists. This milestone can ship the questionnaire without evaluation.

## M6 — Validated clinical evaluation (decision gate)

Do not begin user-visible scoring or disease conclusions solely because ten answers
have been recorded. First decide whether Atlas should evaluate rules at all and what
clinical claim, if any, the output may make.

If evaluation is approved, specify each disease rule and its source, expected
behavior for missing and conflicting data, representative positive and negative
cases, and independent clinical review. Implement and test the rules behind the
existing runtime boundary. Expose results only after clinical validation and a
separate release decision; retain the source/version trail for every output.

**Exit checks if pursued:** Signed clinical logic specification, reviewed test cases,
documented limitations, and approval of the exact user-facing result language.

## Decisions to record before the next milestone starts

| Decision | Needed for | Current assumption |
| --- | --- | --- |
| CI workflow and clean-checkout setup | M1 | Atlas is in the workspace repository; CI remains to be added |
| Ruleblock source display and navigation | M2 | Delivered read-only for selected collection, with versioned static source and input links |
| Named clinical reviewers and review process | M3 | Review required before clinical use |
| Completion summary and FHIR download behavior | M4 | Proposed; no results today |
| Hosting, DNS, and pilot access | M5 | No deployment authorized by this roadmap |
| Whether to provide clinical evaluation | M6 | Undecided; no score or diagnosis today |
