# FHIR evaluation API

POST `/api/v1/collections/ikd/$evaluate/` (include the trailing slash to avoid a redirect).
Content-Type: `application/fhir+json` or `application/json`. Maximum body: 256 KiB.

## Try locally

From `picorules-atlas`, run `npm run dev`. In another terminal:

```bash
curl --fail-with-body 'http://localhost:3000/api/v1/collections/ikd/$evaluate/' \
  -H 'Content-Type: application/fhir+json' \
  --data-binary @examples/fhir/ikd-input.json \
  -o /tmp/atlas-result.fhir.json
```

In production (`npm start` or Netlify), set `ATLAS_API_KEY` and send
`Authorization: Bearer <your-key>`. Missing production configuration returns 503;
missing or incorrect credentials return 401. Never use a NEXT_PUBLIC variable for the key.
Development allows requests without authentication only when no key is configured.

## Supported input

A collection Bundle containing exactly one Patient with an id, and zero or more
Observation resources. Each Observation requires:

- `subject.reference`: `Patient/<id>` or the Patient entry's fullUrl.
- `status`: preliminary, final, amended or corrected.
- Exactly one `code.coding`, with system `http://human-phenotype-ontology.org`
  and an HPO code declared in the current IKD collection.
- `valueBoolean`: true for present, false for absent.

Omitted findings are assumed absent and contribute zero. Duplicate features, mixed
subjects, unknown codes, nonboolean values, components and observation modifiers
are rejected. Other resource types are rejected. This first version accepts the
minimal external input contract, not Atlas's complete downloaded handoff bundle.
QuestionnaireResponse-only input and general hospital FHIR mappings are not supported.
Only Patient identity is retained; demographic fields are not copied to the output.

## Output

A FHIR R4 collection Bundle with a generated Questionnaire and QuestionnaireResponse,
normalised boolean findings, one score Observation per profile, Patient identity and
ClinicalImpression. Notes distinguish supplied findings from assumed absence.
The generated response records the deployed collection/content version; score notes
record rule versions, scoring models and contributions. All profiles use the same
Picorules evaluator as the page. Results remain research scores, not probabilities.

Responses use `application/fhir+json` and `Cache-Control: no-store`. Invalid requests
return OperationOutcome (400), oversized input 413, unsupported media 415, and
unexpected evaluation failures 500 with no internal details. No payloads are stored
or logged by the handler. This is a custom evaluation operation, not a full FHIR server.

## Netlify

Connect the private `asaabey/picorules-atlas` repository to Netlify:

- Base directory: repository root (leave blank).
- Package directory: leave blank.
- Build command: `npm run build`.
- Publish directory: `.next`.
- Secret environment variable `ATLAS_API_KEY`, available to Functions at runtime.

Netlify installs the integrity-locked npm dependencies, including compiler 1.1.1,
and uses its automatic OpenNext integration for the page and server route.
The repository's `netlify.toml` supplies the build settings. No sibling repositories,
custom clone script or static export are required.

No deployment is performed by these changes. After deployment, repeat the curl
request against the Netlify URL with the bearer header. Keep keys on server clients;
a public browser should not embed them. There is no FHIR upload panel in the page yet.

References: [Netlify Next.js](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/),
[Netlify monorepos](https://docs.netlify.com/build/configure-builds/monorepos/).
