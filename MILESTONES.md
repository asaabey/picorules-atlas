# Picorules Atlas development milestones

Status date: 27 September 2026. This roadmap covers development after the initial
questionnaire scaffold in [SPEC.md](SPEC.md). Milestones M1–M5 are proposed work,
not features of the current app. No target dates are assigned.

## Current position

| Milestone | Outcome | Status |
| --- | --- | --- |
| M0 | Ten-question IKD scaffold | Verified locally |
| M1 | Reproducible project baseline | Next |
| M2 | Clinically reviewed IKD content | Planned |
| M3 | Assessment review and FHIR handoff | Planned |
| M4 | Questionnaire pilot on HTTPS | Planned |
| M5 | Validated clinical evaluation, if pursued | Decision gate |

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
The Atlas directory is currently untracked by the workspace Git repository.

## M1 — Reproducible project baseline (next)

**Work**

- Put Atlas under version control with a clear repository owner and document how its
  adjacent `picorules-compiler-js-core` dependency is built from a clean checkout.
- Add CI for content validation, typecheck, unit tests, static build, and browser
  checks. Run at least one browser check in an ordinary HTTP LAN origin or with
  secure-context-only APIs unavailable.
- Keep a preview command that binds to `0.0.0.0` and document the expected local
  network URL. Confirm that no answer-bearing requests or browser storage writes
  occur during an assessment.

**Exit checks:** A clean checkout can build the static `out/` site from documented
commands; CI passes; the collection opens and answers work on the preview URL;
the project has a tracked change history. This milestone does not deploy the site.

## M2 — Clinically reviewed IKD content

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

## M3 — Assessment review and FHIR handoff

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

## M4 — Questionnaire pilot on HTTPS

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

## M5 — Validated clinical evaluation (decision gate)

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
| Atlas repository and CI location | M1 | No location chosen |
| Named clinical reviewers and review process | M2 | Review required before clinical use |
| Completion summary and FHIR download behavior | M3 | Proposed; no results today |
| Hosting, DNS, and pilot access | M4 | No deployment authorized by this roadmap |
| Whether to provide clinical evaluation | M5 | Undecided; no score or diagnosis today |
