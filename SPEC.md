# Picorules Atlas — scaffold specification

Status: initial specification, ready to guide scaffolding.\
Date: 27 September 2026.\
Project: `picorules-atlas`.\
Planned address: `atlas.picorules.com` (deployment and DNS are outside this task).

## Purpose

Atlas turns collections of Picorules phenotype definitions into structured clinical assessments. A clinician selects one collection and answers a combined questionnaire generated from the inputs declared by its rules. Shared features appear once, with linked disease associations explaining their relevance.

The initial use case is a nephrologist assessing unexplained kidney disease for inherited causes. The application and content model must also accommodate future collections, such as neurological diseases, without changing the questionnaire renderer.

The first release is a small questionnaire scaffold. It does not diagnose, rank diseases, calculate match scores, suggest investigations, or produce assessment recommendations. After entering answers, the clinician remains on the assessment; there is no submission or results screen.

## Agreed scope

- Next.js application with TypeScript; browser-held assessment state.
- No database backend, including for rules, collections, or question metadata. All authored content lives in version-controlled files shipped with the application.
- Bundle the browser-compatible Picorules compiler/parser and runtime with the application; no remote compilation service is required.
- Collection selection before entering an assessment; one active collection at a time.
- One initial collection: **Inherited kidney disease (IKD)**, ID `ikd`.
- Two new disease ruleblocks: **Fabry disease** and **tuberous sclerosis complex**.
- Five candidate features per disease, ten distinct questions initially.
- Combined questions grouped into clinical sections, with disease links beside each feature.
- Questions generated from rule input references and explicit attribute metadata.
- Transient FHIR representation of answers, with an architecture reusable by a future API.
- No accounts, patient identifiers entered by the user, saved assessments, or backend patient database.

Existing clinical ruleblocks are not dependencies of this collection. The existing compiler/runtime may be reused and extended where needed. Non-inherited differential diagnoses such as lupus and vasculitis are outside the IKD collection.

## User journey

1. Open Atlas and select a collection card. Initially only IKD is available; do not show placeholder neurological content.
2. Open the IKD assessment with its name, short purpose, and included disease names visible.
3. Browse the combined questionnaire under **Kidney**, **Skin and sweating**, **Eyes**, and **Neurological history**.
4. Record findings using each feature's declared answer control. No answer is mandatory.
5. Open a disease label beside a question to see its associated feature, a brief explanation, and a source link. This is contextual information, not a patient-specific conclusion.
6. Reset the assessment or return to collection selection. Reset clears all answers. When leaving an answered assessment, explain that answers will be discarded and offer cancel/continue; never transfer answers implicitly between collections.

Use a single page with section anchors or collapsible sections. There is no conditional question hiding, adaptive sequence, or disease-specific questionnaire in this version. A simple answered count may indicate progress but must not imply clinical completeness.

Example question:

> **Acroparaesthesia**\
> Has the patient experienced episodes of burning or tingling pain in the hands or feet?\
> Present · Absent · Unknown / not assessed\
> Associated with: **Fabry disease ↗**

Use keyboard-accessible, explicitly labelled controls and links. Disease information must work on click/tap and keyboard activation, not hover alone. Do not rely on colour to communicate answer state.

## Initial feature set

These are candidate scaffold features, selected for a compact demonstration across several clinical sections. They are not a complete screening instrument, diagnostic criteria, or a claim of sensitivity. Clinical wording and help text require review before clinical release. In particular, a recorded feature association does not establish a disease, and lack of a recorded feature does not exclude it.

### Fabry disease — `ikd_fabry`

| Feature ID | Display label | HPO identifier | Section | Proposed question |
| --- | --- | --- | --- | --- |
| `acroparesthesia` | Acroparaesthesia | HP:0031006 | Neurological history | Has the patient experienced episodes of burning or tingling pain in the hands or feet? |
| `angiokeratoma` | Angiokeratomas | HP:0001014 | Skin and sweating | Have angiokeratomas been identified? |
| `hypohidrosis` | Reduced sweating | HP:0000966 | Skin and sweating | Does the patient report reduced sweating? |
| `cornea_verticillata` | Cornea verticillata | HP:0500008 | Eyes | Has cornea verticillata been documented on eye examination? |
| `proteinuria` | Proteinuria | HP:0000093 | Kidney | Has proteinuria been documented? |

These associations are supported by [GeneReviews: Fabry Disease](https://www.ncbi.nlm.nih.gov/books/NBK1292/). This scaffold records feature presence; it does not introduce quantitative proteinuria thresholds or severity scales.

### Tuberous sclerosis complex — `ikd_tuberous_sclerosis`

| Feature ID | Display label | HPO identifier | Section | Proposed question |
| --- | --- | --- | --- | --- |
| `hypomelanotic_macule` | Hypomelanotic macules | HP:0009719 | Skin and sweating | Have hypomelanotic macules been identified? |
| `angiofibromas` | Angiofibromas | HP:0010615 | Skin and sweating | Have angiofibromas been identified? |
| `shagreen_patch` | Shagreen patch | HP:0009721 | Skin and sweating | Has a shagreen patch been identified? |
| `renal_angiomyolipoma` | Renal angiomyolipoma | HP:0006772 | Kidney | Has a renal angiomyolipoma been documented on imaging? |
| `seizure` | Seizures | HP:0001250 | Neurological history | Is there a history of seizures? |

These associations are supported by [GeneReviews: Tuberous Sclerosis Complex](https://www.ncbi.nlm.nih.gov/books/NBK1220/). The questions do not implement diagnostic lesion counts, sizes, or combinations. The broad HPO term for angiofibromas is retained rather than silently treating it as a facial-only code.

All ten feature identifiers and disease associations also occur in the local [Orphadata phenotype export](../working-docs/docs/ikd-phenotype-data/orphadata-phenotypes.csv). Preserve source attribution and release information from its [source audit](../working-docs/docs/ikd-phenotype-data/README.md). The question wording above is Atlas-authored adaptation, not source text. Imported frequency labels must not become scoring weights or probabilities.

## Answer semantics

For these ten features, use the same presence control:

- `present`: explicitly reported or documented as present.
- `absent`: explicitly reported or assessed as absent.
- `unknown`: the clinician explicitly selects unknown / not assessed.
- `unanswered`: initial internal state; no selection has been made.

Unanswered must never default to absent. Unknown and unanswered are distinct in form state even if both eventually yield a null input to a rule. A history question describes historical occurrence; do not imply that the finding began on the date the form was completed.

The metadata schema should also allow future coded grades and numeric quantities with units. Do not invent grading scales for the initial ten features to exercise those types. Each future phenotype must define its allowed values and meaning explicitly.

## Collections and content model

Use versioned, declarative content rather than collection-specific React components.

| Entity | Required information |
| --- | --- |
| Collection | Stable ID, title, description, version, ordered ruleblock IDs, section order |
| Disease ruleblock | Stable ID, disease name and terminology ID, version, `.prb` source, source references |
| Input feature | Stable feature ID, source attribute, label, question, section, answer type/options, terminology coding, source references |
| Compiled question | Canonical feature definition plus the selected collection's referring disease/rule IDs |
| Assessment | Selected collection/version, content version, transient session ID, answers by feature ID |

Collection membership determines which rules contribute questions. Disease associations are derived from rules referencing an input, restricted to the selected collection. Do not include a disease label solely because that feature occurs in another collection.

Deduplicate by canonical feature ID, not display text. The initial ten questions happen to be distinct; shared-question behaviour must still be supported and verified with a synthetic fixture. Conflicting definitions for a shared ID—such as different units, choice meanings, or wording—must fail content validation with both source locations rather than silently selecting one.

## Picorules metadata contract

Use `#define_attribute` as the proposed authoring surface, with an `atlas` namespace for questionnaire metadata. Link the declared variable to an explicit fetched input attribute. Computed outputs are not automatically questions.

Illustrative proposed syntax, **not currently supported end to end**:

```text
#define_ruleblock(ikd_fabry, {
    description: "Fabry disease assessment features",
    is_active: 2
});

acroparesthesia => eadv.phen_acroparesthesia.val.last();

#define_attribute(acroparesthesia, {
    label: "Acroparaesthesia",
    atlas: {
        role: "input",
        feature_id: "acroparesthesia",
        source_attribute: "phen_acroparesthesia",
        section: "neurological_history",
        question: "Has the patient experienced episodes of burning or tingling pain in the hands or feet?",
        answer_type: "presence",
        hpo_id: "HP:0031006"
    }
});
```

At this stage, ruleblocks declare phenotype inputs without disease-detection thresholds or diagnostic outputs. Adding a referenced input with valid metadata to a member rule must add its question without editing UI code.

The existing core parser currently skips compiler directives: see [ruleblock-parser.ts](../picorules-compiler-js-core/src/parsing/ruleblock-parser.ts). Implementation must add a structured metadata extraction step, either as a focused parser extension or an Atlas content compiler. It must handle nested objects, strings and comments; do not execute metadata using JavaScript `eval` or rely on a single regular expression. Validate metadata against a versioned schema and check input references against parsed rules.

Produce a collection manifest at build time from the rules and metadata. Keep the source metadata authoritative; do not maintain a second hand-written questionnaire. Disease-level sources and feature-level mappings must remain traceable in the manifest.

## How to author Atlas Picorules

This is the proposed Atlas authoring contract. The underlying fetch syntax already exists; the `atlas` metadata schema and its extraction tooling must be implemented as part of the scaffold. The examples below describe files to create during implementation, not files already delivered with this specification.

### 1. Create a collection folder and definition

Keep each collection and its rule files together:

```text
content/collections/
  ikd/
    collection.json
    rules/
      ikd_fabry.prb
      ikd_tuberous_sclerosis.prb
```

An initial `collection.json` would declare membership explicitly:

```json
{
  "schemaVersion": "1",
  "id": "ikd",
  "title": "Inherited kidney disease",
  "description": "Structured history and findings for an inherited kidney disease assessment.",
  "version": "0.1.0",
  "sections": [
    { "id": "kidney", "label": "Kidney" },
    { "id": "skin_sweating", "label": "Skin and sweating" },
    { "id": "eyes", "label": "Eyes" },
    { "id": "neurological_history", "label": "Neurological history" }
  ],
  "rules": [
    "rules/ikd_fabry.prb",
    "rules/ikd_tuberous_sclerosis.prb"
  ]
}
```

Only listed rules contribute questions. Build tooling discovers collection definitions under `content/collections/`, resolves their relative rule paths, and rejects missing files, duplicate IDs, and paths outside the content directory. A new collection is added through files and a rebuild, without database records or edits to the collection selector.

### 2. Write one ruleblock per disease

Use lowercase snake_case for filenames, ruleblock IDs, variables, and feature IDs. The `.prb` basename and `#define_ruleblock` ID must agree. Begin with the disease declaration, followed by all input-fetch statements, any future computation statements, and finally attribute metadata. Terminate every statement and directive with a semicolon.

For example, the Fabry input section is:

```text
/* Atlas IKD collection: five Fabry-associated assessment features. */
#define_ruleblock(ikd_fabry, {
    description: "Fabry disease assessment features",
    is_active: 2,
    atlas: {
        schema_version: "1",
        version: "0.1.0",
        disease_label: "Fabry disease",
        disease_id: "ORPHA:324",
        source_refs: ["genereviews_fabry", "orphadata_2026_06"]
    }
});

acroparesthesia => eadv.phen_acroparesthesia.val.last();
angiokeratoma => eadv.phen_angiokeratoma.val.last();
hypohidrosis => eadv.phen_hypohidrosis.val.last();
cornea_verticillata => eadv.phen_cornea_verticillata.val.last();
proteinuria => eadv.phen_proteinuria.val.last();

/* Append one #define_attribute directive for each input, as above. */
```

These `eadv` expressions describe the runtime's logical input interface. They do not require an EADV database: the adapter supplies values from the transient FHIR bundle in memory. Use the same feature ID and `phen_<feature_id>` attribute whenever another disease refers to that exact feature.

For the first release, do not add conditional disease flags or a synthetic always-true disease output merely to fill a rule template. These files serve as input declarations, and the parser/runtime must accept them without diagnostic computations. Future conditional statements should include an explicit default, preserve missing-data semantics, and be introduced only when clinical evaluation enters scope.

### 3. Declare every question explicitly

Append the `#define_attribute` pattern in the preceding section for each input. Required Atlas fields are `role`, `feature_id`, `source_attribute`, `section`, `question`, `answer_type`, and `hpo_id` for these HPO-backed features. The outer `label` provides the short heading. The schema must define the `presence` answer type centrally with the answer states specified above; authors must not assign their own incompatible yes/no encodings.

For the initial library, require one exact input attribute per question, with `.val.last()`. Wildcard fetches, multi-attribute fetches, and computed variables need explicit future mapping rules before they can generate questions. Do not infer a questionnaire from arbitrary calculations.

Use data-only directive values: quoted strings, numbers, booleans, arrays, and objects. Do not embed executable functions or HTML. Optional help text must describe the finding without asserting that its presence establishes the associated disease. Future grades need explicit coded choices; future numeric inputs need units and validation bounds.

### 4. Register sources and validate shared features

Store bibliographic records in `content/sources.json`, keyed by the `source_refs` identifiers. Include title, URL, source release/access date, and attribution where relevant. Attribute metadata may additionally declare `source_refs` for a feature-specific source. Disease links derive from the enclosing disease declaration and its input references; do not maintain a separate UI list of disease associations.

Every reference must resolve. Every fetched question input must have exactly one attribute definition in its ruleblock. Shared definitions across ruleblocks must be semantically consistent; identifiers are not interchangeable solely because the questions sound similar.

### 5. Build and check before publishing content

The content build must extract and validate directives using a string-aware parser, then pass the executable statements separately to the core Picorules parser. The current core parser removes comments and splits on semicolons without preserving string context; feeding metadata containing URLs or punctuation through that path can corrupt it. Preserve original source text and locations for diagnostics, while keeping metadata out of the executable parsing input.

Validation must check collection membership, ruleblock names, source references, known sections, question completeness, feature mappings, supported answer types, and shared-feature conflicts. Fail the build rather than silently omit invalid questions. Generate the manifest and executable rule payload from the same content version.

Review the generated questionnaire, disease labels, and FHIR mappings after each content change. Adding or changing clinical content requires rebuilding and redeploying the static application; there is no in-app rule editor or live database update in this release.

## Transient FHIR contract

Target FHIR R4 for the scaffold. Generate a FHIR `Questionnaire` from the same manifest and use stable feature IDs as item `linkId` values. Maintain a corresponding `QuestionnaireResponse` in memory as answers change.

Package the response and derived feature `Observation` resources in a transient `Bundle` of type `collection`. This FHIR bundle type is a packaging term, distinct from an Atlas clinical collection. Reference the versioned questionnaire and keep collection/rule-set versions available to consumers. The precise Atlas identifiers and profiles must be fixed and tested during implementation.

- Explicit present/absent findings become `Observation.valueBoolean` true/false.
- Explicit unknown has no `value[x]` and uses an appropriate `dataAbsentReason`; it remains an explicit unknown choice in the questionnaire response.
- Unanswered items have no answer and produce no feature observation.
- Feature observations use the declared terminology coding; do not create disease `Condition` resources from disease associations.
- Use transient resource IDs and resolvable bundle references where needed. Do not require a named Patient resource for the questionnaire scaffold.
- Record response authorship time separately from clinical occurrence time. Do not fabricate onset or examination dates.

The future rules adapter must map these coded feature observations to the declared `phen_*` input attributes, preserving false as zero and unknown as null. Do not assume the existing FHIR adapter recognises arbitrary HPO codes or boolean observations; inspect and extend it or supply an Atlas adapter with explicit mappings.

FHIR references: [Questionnaire](https://hl7.org/fhir/R4/questionnaire.html), [QuestionnaireResponse](https://hl7.org/fhir/R4/questionnaireresponse.html), [Observation](https://hl7.org/fhir/R4/observation.html), and [Bundle](https://hl7.org/fhir/R4/bundle.html).

FHIR generation is an internal capability in this release. A download button, import flow, EHR integration, server endpoint, and results display are deferred.

## Application architecture

Use Next.js for routing and static content delivery, with client components for the assessment. Patient answers stay in browser memory and disappear on reload or tab closure. Do not store them in localStorage, sessionStorage, cookies, URLs, server logs, or analytics. Static collection and rule content can be served normally.

There is **no database backend** for either clinical content or assessments. Use a static-export-compatible Next.js design with collection routes known at build time. Node.js filesystem access is confined to build tooling: it reads the `.prb`, collection, and source files and emits versioned static manifests and executable rule payloads. The browser loads those generated assets; it never reads the server filesystem or queries a database. Generated files are build artifacts, not a second authoring source.

Install and lock `picorules-compiler-js-core` as an application dependency and bundle its browser-safe entry point in the assessment client code. Use its `parse` API for executable rules and retain `evaluate`/`evaluateAll` behind the runtime module boundary. Do not import the package's `/node` entry point into client code, load the compiler from a runtime CDN, or call a compilation server. The questionnaire scaffold needs no SQL generation or SQL execution. The bundled parser can initialise the selected rule payload; actual disease evaluation and user-visible outputs remain deferred.

The data path is: **repository content files → build-time metadata validation and manifest generation → static app assets plus bundled compiler → collection questionnaire → browser-memory answers and FHIR bundle**. Loading the application requires static hosting, but interacting with a loaded assessment does not require a database or application API. Offline installation/caching is not part of this release.

Keep framework-independent modules for manifest generation, answer validation, FHIR serialization, and future adapter/evaluation integration. A future API can accept a FHIR bundle plus explicit collection/version, apply the same mappings and runtime, and return results without depending on React. Do not build that endpoint in the scaffold.

Suggested structure (to be created during implementation):

```text
picorules-atlas/
  SPEC.md
  src/app/                         # Collection selector and assessment routes
  src/components/                  # Section, question, disease-context components
  src/lib/content/                 # Metadata schema and manifest compiler
  src/lib/assessment/              # Answer model and validation
  src/lib/fhir/                    # Questionnaire/response/bundle generation
  src/lib/runtime/                 # Future explicit feature adapter boundary
  content/sources.json             # Source records referenced by rule metadata
  content/collections/ikd/
    collection.json               # Membership, version, section ordering
    rules/ikd_fabry.prb            # New disease input declarations and metadata
    rules/ikd_tuberous_sclerosis.prb
  scripts/                        # File-based content validation/build tooling
  tests/                          # Content, FHIR and interaction checks
```

The current task creates this specification only. It does not install packages, modify the shared compiler, deploy the site, or create clinical rules.

## Scaffold acceptance criteria

1. Landing page offers IKD; selecting it opens an assessment containing exactly ten unique feature questions, five from each disease ruleblock.
2. The renderer contains no Fabry- or TSC-specific question list. Editing rule input metadata and rebuilding changes the questionnaire.
3. Questions show the appropriate disease association and an accessible source/context link.
4. Shared inputs in a synthetic two-rule fixture produce one question with two disease labels. Conflicting metadata produces an actionable validation error.
5. A synthetic second collection verifies isolation without adding a second clinical collection to the product.
6. All questions begin unanswered. Explicit absent, unknown, present, answer changes, and reset retain their defined semantics.
7. Questionnaire response and bundle generation preserve these states; generated resources validate against the selected FHIR contract, with stable question links and valid resource references.
8. No patient answers are sent over the network or persisted. Reload clears assessment state.
9. There is no score, inferred diagnosis, investigation recommendation, results page, or assessment submission.
10. Production build, meaningful metadata/FHIR unit tests, and a browser interaction check pass. Record screenshots of the selector, assessment, and disease-context display.
11. The application builds and runs from static assets without a database connection, database credentials, compilation service, or application API. Collection/rule changes are delivered through files and a rebuild.
12. The browser-safe compiler/parser is bundled locally with the app. The selected collection's executable inputs parse successfully, and metadata containing URLs, comments, or semicolons in strings survives extraction correctly.

## Deferred decisions

Larger feature libraries, progressive disclosure, additional collections, graded clinical definitions, measurement units, family-history modelling, clinical evaluation logic, saved/exported assessments, and an external API will be designed when needed. They must not expand the first ten-question scaffold implicitly.
