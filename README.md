# Picorules Atlas

Picorules Atlas is a static Next.js questionnaire scaffold. The first collection is inherited kidney disease (IKD), with five input features each for Fabry disease and tuberous sclerosis complex. Questions and disease associations are generated from Picorules rule references and `#define_attribute` metadata. This release records findings; it does not score, diagnose, recommend, submit, or save an assessment.

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

A rule starts with one `#define_ruleblock` whose ID matches its filename. Put executable input fetches next, then one `#define_attribute` for each input. An Atlas question currently requires an exact `eadv.phen_<feature_id>.val.last()` fetch and matching `atlas` metadata: `role`, `feature_id`, `source_attribute`, `section`, `question`, `answer_type: "presence"`, `hpo_id`, and source references. The outer attribute `label` is the short question heading. Ruleblock metadata declares the disease name, terminology ID, version, and sources. See `content/collections/ikd/rules/` for complete examples.

The content compiler reads quoted strings, nested objects, semicolons, URLs, and comments before passing executable statements to the browser-safe Picorules parser. It rejects missing or conflicting shared-feature definitions and includes both source locations in conflict errors. The build emits a manifest with executable rule payloads and source provenance; React contains no disease-specific question list. Adding a collection requires only versioned content files and a rebuild.

Presence answers have four form states: present, absent, explicit unknown, and unanswered. A transient FHIR R4 `Questionnaire`, `QuestionnaireResponse`, and collection `Bundle` with feature `Observation` resources are built in memory. Present and absent observations use boolean values; explicit unknown uses `dataAbsentReason`; unanswered creates no observation. A local feature adapter maps these observations back to declared `phen_*` inputs for future evaluation work. No clinical evaluation output is used in the current interface.

## Clinical content status

The ten features are a compact demonstration, not a complete screening instrument. Question wording and help text need clinical review before clinical release. The Orphadata phenotype subset and GeneReviews references are identified in `content/sources.json`; the local Orphadata source audit is at `../working-docs/docs/ikd-phenotype-data/README.md`. Orphadata frequency labels are not used as scores or probabilities.

M3 review materials are in [`reviews/ikd/`](reviews/ikd/README.md). The candidate packet is tied to the current content version and includes all ten questions, mappings, source pairings, and limitations. `npm run review:check` verifies that the packet and pending decision record match the generated manifest; `npm run review:gate` requires completed decisions and one qualified clinical reviewer sign-off. The review gate is pending until those decisions are recorded.
