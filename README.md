# Picorules Atlas

Picorules Atlas is a Next.js proof of concept. The inherited kidney disease (IKD) collection has 60 shared questions across fourteen profiles. The original eight are Fabry disease, tuberous sclerosis complex, broad Alport syndrome, HNF1B-related disease, ARPKD, Von Hippel–Lindau disease, ADTKD–UMOD and ADTKD–MUC1. Six more cover broad nephronophthisis, NPHP1, NPHP4, NPHP12, Joubert syndrome and Mainzer–Saldino syndrome. Questions and disease associations are generated from Picorules rule references and `#define_attribute` metadata. One action below the questions runs every authored rule and shows its research score or present-feature count, contribution breakdown, and a FHIR download on the same page. These outputs are demonstrations, not validated clinical scores, diagnoses, probabilities, or advice about tests or treatment. The browser assessment stays local; the FHIR API processes submitted bundles without saving them.

Development status and next steps are tracked in [MILESTONES.md](MILESTONES.md).

## Run locally

Requirements: Node.js 22 or newer and npm. This repository is self-contained;
the compiler is pinned to npm version `1.1.1` with an integrity-locked dependency.

```bash
git clone https://github.com/asaabey/picorules-atlas.git
cd picorules-atlas
npm ci
npm run dev
```

`CORE_COMPILER_SHA` records the previously validated source revision. The published
1.1.1 package's source commit is `cafe91f03a2ca29ba75415c7e99604281640b386`;
the recorded revision differs only in its package-lock version metadata.

Open `http://localhost:3000`. All answers stay in the current browser page's memory and disappear on reload. The planned address is `atlas.picorules.com`; deployment and DNS are outside this project.

## Build and check

Run these from `picorules-atlas/`:

```bash
npm run content:build   # validate content and write src/generated/collections.json
npm run content:check   # validate content and check generated output is current
npm run typecheck
npm test
npm run build           # regenerate content and build Next.js
npm run preview:lan     # serve Next.js on 0.0.0.0:3000 for LAN checks
npx playwright install chromium
npm run test:browser    # Playwright desktop and mobile interaction checks
ATLAS_TEST_STATIC=1 npm run test:browser # browser checks against the production server
```

`npm run build` builds the Next.js page and server API. Use `npm start` locally or
`npm run preview:lan` for access from another device. The legacy `ATLAS_TEST_STATIC=1`
test flag now selects the production Next.js server. There is no database or payload logging.

See [FHIR API and Netlify setup](FHIR-API.md) for requests, authentication and hosting.

The FHIR schema test uses the official [FHIR R4 JSON Schema](https://hl7.org/fhir/R4/fhir.schema.json), copied to `tests/fixtures/fhir-r4.schema.json` for reproducible offline tests (retrieved 2026-09-27). Browser screenshots are written under `test-results/`; reviewed reference captures are in `screenshots/`.

## Author collection content

Collection definitions live at `content/collections/<collection-id>/collection.json`; their `rules` array explicitly lists the member `.prb` files. Each collection declares its ID, title, description, version, and ordered sections. Add source records to `content/sources.json` before referring to them from rule metadata. Rebuild after editing content.

A rule starts with one `#define_ruleblock` whose ID matches its filename. Put executable input fetches and optional compute statements next, then one `#define_attribute` for each input. An Atlas question requires an exact `eadv.phen_<feature_id>.val.last()` fetch and matching `atlas` metadata: `role`, `feature_id`, `source_attribute`, `section`, `question`, `answer_type: "presence"`, `hpo_id`, and source references. The outer attribute `label` is the short question heading. Ruleblock metadata declares the disease name, terminology ID, version, and sources. Eight IKD rules declare versioned research weights; the six new rules count each present clinical feature as one point. Both models declare executable per-feature contributions. See `content/collections/ikd/rules/` for complete examples.

The content compiler reads quoted strings, nested objects, semicolons, URLs, and comments before passing executable statements to the browser-safe Picorules parser. It rejects missing or conflicting shared-feature definitions and includes both source locations in conflict errors. The build emits a manifest with executable rule payloads and source provenance; React contains no disease-specific question list. Adding a collection requires only versioned content files and a rebuild.

Each finding has one checkbox: checked means present, and unchecked is assumed absent for this demonstration. The assumption is visible on the assessment page. Selecting **Show results** creates a transient FHIR R4 `Questionnaire`, completed `QuestionnaireResponse`, and collection `Bundle` with a boolean feature `Observation` for every question. Unticked findings have `valueBoolean: false`. A local feature adapter maps observations to declared `phen_*` inputs, then the Picorules evaluator runs every selected authored rule. The original eight use LIRICAL-derived candidate weights; the six new profiles count each present clinical feature once. Their totals have different units and cannot be compared as disease likelihoods. Three shared family-history prompts record patterns suggesting dominant, recessive, or X-linked inheritance but carry zero weight; absence of a family pattern does not exclude disease. Results show the score or count and an expandable contribution breakdown. No diagnostic cutoff is applied. Changing a checkbox clears the prior result and download until **Show results** is selected again. Reload clears the assessment.

The downloaded FHIR R4 handoff contains the original answers, a score `Observation` for each selected rule, and an in-progress `ClinicalImpression` summarising the research assessment without cutoff-based diagnoses. It uses an anonymous `Patient` reference so the bundle is self-contained and contains no confirmed `Condition`. Scores and counts are research output, not disease probabilities. The FHIR score code distinguishes the two models. See [weighting implementation](reviews/ikd/WEIGHTING-IMPLEMENTATION.md). The complete bundle is checked against the official FHIR R4 JSON Schema and is created only when the user chooses to download it. [FHIR R4 ClinicalImpression](https://hl7.org/fhir/R4/clinicalimpression.html) supports possible findings and diagnoses.

## Clinical content status

The 60 questions are a compact demonstration, not a complete screening instrument. The earlier prototype acceptance covers the original ten questions and workflow. Later profiles, including all six new ones, are pending clinical content review. Orphadata, HPOA, GeneReviews and Orphanet sources are identified in `content/sources.json`; the local Orphadata source audit is at `research/ikd-phenotype-data/README.md`. Source frequency labels are not used as scores or probabilities. NPHP12 has sparse subtype annotations, and related nephronophthisis profiles can produce similar counts.

Prototype sign-off and later clinical review materials are in [`reviews/ikd/`](reviews/ikd/README.md). The candidate packet is tied to the current content version and includes all 60 questions, mappings, source pairings, and limitations. `npm run review:check` verifies that the packet and pending decision record match the generated manifest; `npm run review:gate` is reserved for a later clinical release decision. It is not an application-development gate.
