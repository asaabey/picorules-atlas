# Picorules Atlas

Picorules Atlas is a static Next.js proof of concept. The inherited kidney disease (IKD) collection has five input features each for Fabry disease and tuberous sclerosis complex. Questions and disease associations are generated from Picorules rule references and `#define_attribute` metadata. A local journey records answers, reviews them, runs the selected rule sets, displays a simple score and possible diagnoses for review, and downloads a FHIR handoff. These outputs are demonstrations, not validated clinical scores, diagnoses, probabilities, or advice about tests or treatment. Atlas does not submit or save assessments.

Development status and next steps are tracked in [MILESTONES.md](MILESTONES.md).

## Run locally

Requirements: Node.js 20.9 or newer and npm. Node.js 24 is used for CI. The application
depends on an adjacent `picorules-compiler-js-core/` checkout. From a clean checkout
of this workspace repository, run these commands at the workspace root:

```bash
git clone https://github.com/asaabey/picorules-compiler-js-core.git picorules-compiler-js-core
git -C picorules-compiler-js-core checkout "$(cat picorules-atlas/CORE_COMPILER_SHA)"
cd picorules-compiler-js-core
npm ci
npm run build
cd ../picorules-atlas
npm ci
npm run dev
```

The pinned compiler commit is recorded in `CORE_COMPILER_SHA`. Update it only after
checking Atlas against the new compiler revision. If the adjacent compiler checkout
already exists, verify its revision with `git -C ../picorules-compiler-js-core rev-parse HEAD`
before building it.

Open `http://localhost:3000`. All answers stay in the current browser page's memory and disappear on reload. The planned address is `atlas.picorules.com`; deployment and DNS are outside this project.

## Build and check

Run these from `picorules-atlas/`:

```bash
npm run content:build   # validate content and write src/generated/collections.json
npm run content:check   # validate content and check generated output is current
npm run typecheck
npm test
npm run build           # regenerate content and export static files to out/
npm run preview:lan     # serve out/ on 0.0.0.0:3000 for LAN checks
npx playwright install chromium
npm run test:browser    # Playwright desktop and mobile interaction checks
ATLAS_TEST_STATIC=1 npm run test:browser # browser checks against the static export
```

`npm run build` uses Next.js static export. The resulting `out/` directory can be
served by any static file host. For a localhost preview, run `npm run start:static`;
for access from another device on the same network, run `npm run preview:lan` and
open `http://<this-machine's-LAN-IP>:3000`. The preview command binds to all IPv4
interfaces; access from another device also depends on the host firewall and network.
There is no application API, database, account service, or runtime compilation endpoint.
The repository's Atlas CI workflow builds the pinned compiler and runs these checks
against the static export. Browser checks include an HTTP compatibility case where
`crypto.randomUUID()` is unavailable.

The FHIR schema test uses the official [FHIR R4 JSON Schema](https://hl7.org/fhir/R4/fhir.schema.json), copied to `tests/fixtures/fhir-r4.schema.json` for reproducible offline tests (retrieved 2026-09-27). Browser screenshots are written under `test-results/`; reviewed reference captures are in `screenshots/`.

## Author collection content

Collection definitions live at `content/collections/<collection-id>/collection.json`; their `rules` array explicitly lists the member `.prb` files. Each collection declares its ID, title, description, version, and ordered sections. Add source records to `content/sources.json` before referring to them from rule metadata. Rebuild after editing content.

A rule starts with one `#define_ruleblock` whose ID matches its filename. Put executable input fetches and optional compute statements next, then one `#define_attribute` for each input. An Atlas question requires an exact `eadv.phen_<feature_id>.val.last()` fetch and matching `atlas` metadata: `role`, `feature_id`, `source_attribute`, `section`, `question`, `answer_type: "presence"`, `hpo_id`, and source references. The outer attribute `label` is the short question heading. Ruleblock metadata declares the disease name, terminology ID, version, and sources. The two IKD rules also declare a demonstration threshold and action wording. See `content/collections/ikd/rules/` for complete examples.

The content compiler reads quoted strings, nested objects, semicolons, URLs, and comments before passing executable statements to the browser-safe Picorules parser. It rejects missing or conflicting shared-feature definitions and includes both source locations in conflict errors. The build emits a manifest with executable rule payloads and source provenance; React contains no disease-specific question list. Adding a collection requires only versioned content files and a rebuild.

Presence answers have four form states: present, absent, explicit unknown, and unanswered. The review page shows all four distinctly. Running the demonstration creates a transient FHIR R4 `Questionnaire`, `QuestionnaireResponse`, and collection `Bundle` with feature `Observation` resources in memory. Present and absent observations use boolean values; explicit unknown uses `dataAbsentReason`; unanswered creates no observation. A local feature adapter maps observations to declared `phen_*` inputs, then the Picorules evaluator runs every selected authored rule. Each rule counts its own present findings and emits a review prompt at an illustrative threshold of two. The result shows its count as a score out of five, contributing findings, rule version, source, and authored next action. A triggered prompt is shown as a possible diagnosis for review; a low count does not exclude disease. Reload clears the assessment.

The downloaded FHIR R4 handoff contains the original answers, a score `Observation` for each selected rule, and an in-progress `ClinicalImpression` with only the raised candidates and their basis. It uses an anonymous `Patient` reference so the bundle is self-contained and contains no confirmed `Condition`. The score and possible diagnosis are prototype output, not a clinical assertion. The complete bundle is checked against the official FHIR R4 JSON Schema and is created only when the user chooses to download it. [FHIR R4 ClinicalImpression](https://hl7.org/fhir/R4/clinicalimpression.html) supports possible findings and diagnoses.

## Clinical content status

The ten features are a compact demonstration, not a complete screening instrument. The clinical reviewer accepted the current questions and workflow for the proof of concept; clinical accuracy review remains separate. The Orphadata phenotype subset and GeneReviews references are identified in `content/sources.json`; the local Orphadata source audit is at `../working-docs/docs/ikd-phenotype-data/README.md`. Orphadata frequency labels are not used as scores or probabilities.

Prototype sign-off and later clinical review materials are in [`reviews/ikd/`](reviews/ikd/README.md). The candidate packet is tied to the current content version and includes all ten questions, mappings, source pairings, and limitations. `npm run review:check` verifies that the packet and pending decision record match the generated manifest; `npm run review:gate` is reserved for a later clinical release decision. It is not an application-development gate.
