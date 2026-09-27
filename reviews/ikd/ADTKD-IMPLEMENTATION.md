# ADTKD–UMOD and ADTKD–MUC1

Added as research assessments on 27 September 2026. Clinical review remains pending.

| Assessment | Identity | Selected findings |
| --- | --- | --- |
| UMOD | OMIM:162000 | Hyperuricaemia, gout, decreased GFR, renal tubular atrophy, corticomedullary cysts, hyperechogenic kidneys |
| MUC1 | OMIM:174000 | Hyperuricaemia, gout, decreased GFR, renal tubular atrophy, corticomedullary cysts |

These are compact source-backed selections, not complete diagnostic criteria. HPOA September 2026 associations, original evidence codes, references and supplied frequencies are in `adtkd-evidence.json`. Clinical wording was checked against [UMOD GeneReviews](https://www.ncbi.nlm.nih.gov/books/NBK1356/) and [MUC1 GeneReviews](https://www.ncbi.nlm.nih.gov/books/NBK153723/). Existing general gout and tubulointerstitial EHR rules were inspected but not bound: Atlas consumes questionnaire findings, not medication or diagnosis proxies.

## Weights and limitations

Eleven selected contributions were extracted with the same pinned LIRICAL 2.4.1 and resources as the earlier six profiles. Run `python3 benchmarks/ikd/adtkd_weights.py --data /tmp/atlas-ikd-benchmark` to reproduce and verify them. The original six-profile benchmark and weight files remain frozen.

Only present features contribute. Unstated means absent, with zero contribution. No probabilities, cutoffs, negative evidence or diagnostic ranking are introduced. HPOA frequencies are provenance, not directly assigned weights. Missing frequencies invoke engine defaults. In particular, MUC1 gout and hyperuricaemia weights exceed UMOD weights in this extraction: this must not be interpreted as clinical evidence that these are more characteristic of MUC1. The scores do not reliably distinguish these genetic causes.

The questions do not encode family history, age of onset, gout preceding kidney impairment, or documented bland urinary sediment. Those require separate, explicitly sourced definitions and scoring work. Never infer bland sediment from unticked haematuria/proteinuria. Reduced GFR is not automatically chronic kidney disease. Histological atrophy and cysts are nonspecific, and correlated renal findings may inflate totals. Clinical review and validation remain necessary.

## Images

The rules declare `atlas.image_guidance` with category, modality, description and `asset_status: not_selected` for:

- Corticomedullary cysts: radiology, renal ultrasound or MRI.
- Hyperechogenic kidneys: radiology, renal ultrasound.
- Renal tubular atrophy: histopathology, light microscopy of an existing biopsy.

The compiler preserves and validates these fields; the review packet preserves them. Routine imaging and nonspecific histology examples are deliberately omitted under the visual-recognition selection policy. No image placeholder is shown. A future verified asset must use the existing `reference_image` contract with source, license, attribution, dimensions and SHA-256. No biopsy is recommended by this assessment. Imaging can be normal in ADTKD and cysts are not required.
