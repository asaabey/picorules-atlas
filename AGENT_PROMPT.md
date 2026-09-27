Build the initial Picorules Atlas application from its specification.

Workspace: /home/asaabey/projects/picorules-top-node
Project: picorules-atlas/
Specification: picorules-atlas/SPEC.md

First read the workspace AGENTS.md, any applicable project instructions, and the complete specification. Use relevant skills. The spec is the source of truth; implement the application, not just a plan.

Product intent
Atlas generates clinical questionnaires from collections of Picorules files. Users select one collection and answer a combined assessment containing only questions referenced by that collection’s rules. Shared features appear once, with linked disease associations for context.

Initial scope
- Name: Picorules Atlas.
- Planned domain: atlas.picorules.com. Do not deploy or change DNS.
- One collection: inherited kidney disease (IKD).
- Two new disease ruleblocks: Fabry disease and tuberous sclerosis complex.
- Exactly five features per disease, as specified.
- No scores, diagnoses, recommendations, submission flow, or results screen.
- No database, accounts, or assessment persistence.
- Answers remain in browser memory and become a transient FHIR representation.
- Next.js and TypeScript, compatible with static export.
- Rules and metadata live in version-controlled files under collection subfolders.
- Bundle the browser-safe Picorules compiler/parser with the application.

Use sub-agents proactively
You are explicitly authorized and encouraged to delegate. Assign bounded tasks with clear ownership, such as:
1. Content schema, metadata extraction, collection manifests, and new .prb files.
2. Answer semantics, FHIR serialization, and validation tests.
3. Interface implementation or independent integration review.

Define shared contracts before parallel implementation. Avoid overlapping file edits. Keep integration, scope control, and final verification with the lead agent. Use available agents without requiring a particular model override.

Important implementation details
- Read the existing compiler and browser prototype for reusable patterns; do not reuse existing clinical rules.
- The current core parser skips compiler directives and uses naive comment removal/semicolon splitting. Build a safe, structured metadata extraction step before passing executable statements to it. Do not use eval.
- Metadata belongs in #define_attribute directives using the proposed Atlas namespace.
- Generate questions from rule references and metadata. Do not hand-code a parallel question list in React.
- Validate shared feature definitions and fail clearly on conflicts.
- Keep collection membership explicit and isolate questions and disease labels to the active collection.
- Preserve present, absent, explicit unknown, and unanswered as distinct form states.
- Do not assume the existing FHIR adapter supports arbitrary HPO-coded boolean observations.
- Clinical evaluation outputs remain deferred. Do not invent diagnostic criteria, thresholds, or grading scales.
- Keep shared compiler changes minimal; prefer an Atlas-local content compiler where practical.
- Use the local phenotype source material referenced in the spec. Verify clinical help text and FHIR implementation details against authoritative sources when needed.

Working approach
Inspect the repository and current git state before editing. Preserve unrelated changes. Make reasonable implementation decisions within the spec and proceed without repeatedly asking for confirmation. Ask only if a consequential ambiguity cannot be resolved from the specification or code.

Build a polished, responsive interface with a collection selector, sectioned questionnaire, accessible answer controls, disease-context links, and reset/navigation behaviour. Keep compiler and FHIR implementation details out of the clinician-facing interface.

Validation
Run the production/static build and meaningful tests covering:
- Metadata extraction, including punctuation, URLs, comments, and nested objects.
- Exactly ten initial questions and correct disease associations.
- Deduplication and conflicting metadata using synthetic fixtures.
- Isolation between collections using a synthetic second collection.
- Answer-state semantics and FHIR serialization.
- Browser interaction, reset, and collection navigation.
- No answer persistence or network transmission.

Use browser tooling if available and capture screenshots. If any verification cannot be performed, state that explicitly rather than claiming success.

Deliverables
- Working application in picorules-atlas/.
- File-based collection definition, source records, and two new .prb files.
- Content validation/build tooling and bundled browser compiler integration.
- Tests and a README with exact setup, development, build, and content-authoring commands.
- Brief final report: what works, checks performed, limitations, and how to run locally.

Do not deploy, configure DNS, or introduce a database. Continue through implementation and verification rather than stopping after scaffolding or planning.
