# Six-profile benchmark results

This report preserves the pre-weighting benchmark. The current page uses a selected-feature positive sum, documented in [implementation notes](../../reviews/ikd/WEIGHTING-IMPLEMENTATION.md); these benchmark results are not its validation.

Run date: 27 September 2026. Synthetic engineering checks only. The cases were constructed from the same disease profiles used by the methods; these results are not a clinical accuracy estimate.

## Exact profile coverage

| Profile | Source ID | Full positive phenotype terms | Atlas inputs |
| --- | --- | ---: | ---: |
| Fabry disease | ORPHA:324 | 76 | 5 |
| Tuberous sclerosis complex | ORPHA:805 | 62 | 5 |
| Alport syndrome | ORPHA:63 | 34 | 6 |
| HNF1B-related disease | ORPHA:93111 | 29 | 6 |
| Autosomal recessive polycystic kidney disease | ORPHA:731 | 51 | 6 |
| Von Hippel–Lindau disease | ORPHA:892 | 41 | 7 |

All source pairings for the 34 unique Atlas questions are present in the pinned profiles. HPO supplies 293 positive terms across these six profiles. Zero explicit negative phenotype annotations were found for these six profiles; that does not mean every unlisted feature is absent.

## Behaviour comparison

Ranks are within the six targets, not the full differential diagnosis. A tied top rank remains tied. “No prompt” means the existing two-finding demonstration threshold was not reached.

| Case | Historical Atlas count prompts | Information similarity: leading profile(s) | LIRICAL: leading profile(s) |
| --- | --- | --- | --- |
| fabry_pattern | Fabry disease | Fabry disease | Fabry disease |
| tsc_pattern | Tuberous sclerosis complex | Tuberous sclerosis complex | Tuberous sclerosis complex |
| alport_pattern | Alport syndrome | Alport syndrome | Alport syndrome |
| hnf1b_pattern | HNF1B-related disease | HNF1B-related disease | HNF1B-related disease |
| arpkd_pattern | Autosomal recessive polycystic kidney disease | Autosomal recessive polycystic kidney disease | Autosomal recessive polycystic kidney disease |
| vhl_pattern | Von Hippel–Lindau disease | Von Hippel–Lindau disease | Von Hippel–Lindau disease |
| common_kidney_findings | No prompt | Fabry disease, Alport syndrome | Fabry disease |
| acroparaesthesia_only | No prompt | Fabry disease | Fabry disease |
| anterior_lenticonus_only | No prompt | Alport syndrome | Alport syndrome |
| fabry_missing_detail | Fabry disease | Fabry disease | Fabry disease |
| fabry_explicit_absence | Fabry disease | Fabry disease | Fabry disease |
| alport_redundant_parent | Alport syndrome | Alport syndrome | Alport syndrome |
| no_observations | No prompt | No evidence | Not run: no evidence |

## Findings that affect implementation

- Each of the six source-constructed patterns ranks its intended profile first with both methods. This checks wiring and expected examples, not sensitivity or specificity. The equal-count baseline also flags each of these simple three-finding examples.
- Acroparaesthesia alone favours Fabry; anterior lenticonus alone favours Alport. The existing two-finding workflow raises neither prompt. A weighted system can expose a distinctive single finding without an arbitrary minimum count.
- Common renal impairment, haematuria and proteinuria tie Fabry and Alport under information similarity. LIRICAL places Fabry slightly higher (log10 LR 5.053 versus 4.928). These are common renal findings, so the large absolute LRs illustrate the danger of treating model support against a broad Mendelian background as kidney-clinic diagnostic certainty.
- LIRICAL lowers Fabry log10 support from 5.157 to 4.458 when angiokeratomas are explicitly absent rather than unknown (a fivefold reduction in the LR). Positive-only similarity does not use absent findings. Neither behaviour establishes an age-appropriate exclusion rule.
- Removing redundant parent findings before scoring makes the Alport pattern and its parent-expanded version agree under both methods. Original observations are retained in the case record.
- With no observations, this wrapper reports no score/rank and does not run LIRICAL. It does not present the engine’s priors as patient evidence.

## Specificity illustration

Counts below are disease-profile annotation counts after ancestor propagation, not patient prevalences or diagnostic likelihood ratios. The information-content background has 4,355 Orphanet profiles. LIRICAL uses a broader loaded background, so its contribution numbers are not on the same scale.

| Feature | Profiles annotated | Information bits |
| --- | ---: | ---: |
| Proteinuria | 129 | 5.077 |
| Acroparaesthesia | 14 | 8.281 |
| Microscopic haematuria | 23 | 7.565 |
| Anterior lenticonus | 4 | 10.088 |

## Scope and limitations

The similarity comparator is mean best-match Resnik similarity, not a full Phenomizer implementation: it has no empirical p-values, uses only positive findings, and has no prevalence prior. The full source profiles support disease matching; Atlas’s abbreviated profiles are used only for the baseline count. General renal impairment and broad haematuria are not currently collected by Atlas, which is explicitly recorded in the case results.

LIRICAL 2.4.1 is executed unmodified with `--use-orphanet` and the six target IDs. The target flag filters candidate output after the phenotype LR evaluator is constructed. Its loaded background includes OMIM, DECIPHER and Orphanet; identifiers representing overlapping diseases can coexist. The observed uniform pretest value is approximately 1/12,880. No post-test percentages are included in this report or the exported candidate weight table. Raw engine JSON remains in the external cache.

The six targets are broad profiles: Alport inheritance subtypes and classic/non-classic Fabry are not differentiated. Annotation completeness, spectrum/age differences, correlated findings, drug mimics and appropriate negative evidence remain unresolved. A disease absent from this six-target set can still be the explanation.

## Recommended next step

Use the per-feature contribution table to review each disease’s proposed weighting, especially negative contributions based on missing annotations. Define the interpretation of a weighted support score before replacing the demo prompts. Benchmark additional atypical cases, realistic mimics and clinician-adjudicated held-out records. Runtime rules, UI and FHIR output still use the existing demonstration model; this benchmark does not activate new clinical scoring.
