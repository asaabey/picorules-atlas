# Inherited tubulopathy extension

Collection `0.8.0-tubulopathies` adds 14 disease profiles to the existing IKD collection and extends HNF1B. It contains 28 profiles and 95 unique questions. Each input remains dichotomous: checked is present, unchecked defaults to absent. No numerical laboratory thresholds or unknown state are introduced.

## Profiles and sources

| Rule | Profile | Main clinical source |
| --- | --- | --- |
| `ikd_gitelman` | Gitelman syndrome | ERKNet Gitelman-like tubulopathies |
| `ikd_bartter` | Bartter syndrome | ERKNet consensus recommendations |
| `ikd_east` | EAST / SeSAME syndrome | Bockenhauer et al., KCNJ10 study |
| `ikd_drta` | Inherited distal renal tubular acidosis | GeneReviews hereditary dRTA |
| `ikd_dent` | Dent disease | GeneReviews |
| `ikd_cystinosis` | Nephropathic cystinosis | GeneReviews |
| `ikd_lowe` | Lowe syndrome | GeneReviews |
| `ikd_fhhnc` | Familial hypomagnesaemia with hypercalciuria and nephrocalcinosis | Claudin-19 clinical cohort |
| `ikd_hhrh` | Hereditary hypophosphataemic rickets with hypercalciuria | Tieder et al., original clinical study |
| `ikd_xlh` | X-linked hypophosphataemia | GeneReviews |
| `ikd_liddle` | Liddle syndrome | MedlinePlus Genetics |
| `ikd_gordon` | Gordon syndrome / pseudohypoaldosteronism II | GeneReviews |
| `ikd_pha1` | Inherited pseudohypoaldosteronism I | MedlinePlus Genetics |
| `ikd_ndi` | Hereditary nephrogenic diabetes insipidus | GeneReviews |
| `ikd_hnf1b` (extended) | HNF1B-related disease | Existing sources plus ERKNet HNF1B information |

URLs and access dates are in `content/sources.json`. The 131 new disease–feature associations are individually recorded in `tubulopathy-evidence.json`. These are Atlas adaptations of clinical descriptions, not claimed formal HPO disease annotations or frequency estimates. The candidate review packet includes all associations and exact authored questions.

## Feature reuse

Existing feature IDs, HPO IDs, wording, help and sections were inspected before authoring. The new associations reuse 16 existing features: ataxia, bilateral sensorineural hearing impairment, the three family-history patterns, global developmental delay, growth delay, hypertension, hyposthenuria, hypotonia, polydipsia, polyuria, renal cysts, renal insufficiency, seizures and short stature. HNF1B's original seven associations are retained as well.

The historical research feature-definition register was also checked: none of the 35 new HPO terms duplicates a draft feature there. Its historical answer-state model is not used by this extension. All 60 existing runtime feature definitions remain unchanged.

The 35 new features have distinct IDs and HPO terms. Their active terms were checked against HPO `hp/releases/2026-09-01`; the source hash and exact selected IDs/labels are in the evidence file. The extension adds an **Electrolytes and tubular function** section and reuses the existing organ sections for other findings. Existing disease filters make each new profile accessible without a separate collection.

Specific distinctions are intentional:

- Low-molecular-weight proteinuria requires a specific tubular finding and does not duplicate generic proteinuria.
- Renal magnesium/phosphate/salt wasting requires documented renal loss; blood levels do not automatically set these inputs.
- Nephrocalcinosis and calcium kidney stones are distinct. Unspecified stones do not meet the calcium-stone question.
- Corneal cystine crystals differ from existing cornea verticillata. Congenital developmental cataracts differ from acquired adult cataracts.
- Broad metabolic acidosis and hyperchloraemic metabolic acidosis are related, but no added profile scores both.
- Existing reduced urine-concentrating ability is reused for NDI; there is no second dilute-urine question.

## Scoring and scope

Each new profile counts one point per marked clinical finding and zero for family-history context or an unticked finding. HNF1B moves from `ikd-positive-log10-v1` to `ikd-present-count-v1`: the existing extraction has no weights for the added magnesium findings. Its original six clinical findings now each count one, alongside hypomagnesaemia, renal magnesium wasting and renal cysts. Its family-history prompt remains zero. The other seven weighted profiles retain their exact candidate weights. The benchmark extraction is preserved as historical material.

Counts are not calibrated likelihoods, and correlated findings can inflate them. Broad profiles do not identify genetic subtypes; hearing loss and ocular involvement vary by subtype. ORPHA:18, ORPHA:213 and ORPHA:223 are broader than the hereditary renal presentations assessed here. Alkaline urine alone does not establish dRTA, glycosuria alone does not establish Fanconi syndrome, and electrolyte abnormalities alone do not establish inherited disease. Clinical review remains pending, with no diagnostic cutoff.

## Verification

Content compilation checks consistent shared definitions, executable contributions and source references. Regression tests check unique HPO/feature IDs, complete new source pairings, absent defaults, shared answers without inferred renal wasting, zero family-history weight, each new rule through the FHIR handoff, and the HNF1B count code. Browser coverage exercises the new section, shared magnesium answer across disease filters, results, reset and mobile layout.

The existing standalone SQL wrapper does not parse semicolons inside Atlas metadata strings. SQL verification therefore uses the executable statements produced by Atlas's metadata-aware content compiler, with a minimal rule header; all 15 changed rule payloads compile to MSSQL. Full authored files are separately checked by `content:build` and used by the runtime tests.

Validation completed: 79 unit tests, all 17 browser scenarios (with targeted reruns after correcting stale test expectations), production build, TypeScript, content/review consistency and whitespace checks. Browser tests used the installed Chromium 1223 binary via `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` because the runner's default 1243 binary was unavailable. The mobile capture is `test-results/tubulopathies-mobile.png`. The 100 clinical review decisions remain pending; consistency checks do not constitute clinical approval.
