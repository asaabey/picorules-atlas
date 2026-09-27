# Weighted phenotype matching prototype

Implemented in eight IKD ruleblocks. Collection version 0.5.0-weighted adds ADTKD–UMOD and ADTKD–MUC1.

- Model: `ikd-positive-log10-v1`, research status.
- Source: `benchmarks/ikd/candidate-weights.csv`, SHA-256 `705e8b041e8e7dab17f3071d0bf017ceac5d1aec6971d764efd6961885cc82eb`. Engine/data pins and extraction provenance remain in that directory.
- The original 35 declared disease–feature associations use the extracted log10 likelihood-ratio weights rounded to six decimals. The other 169 matrix rows are not used. This is a selected-feature positive matching score, not the full LIRICAL analysis or its probability.
- Answers are present or absent. Omitted and unticked answers become absent, contribute zero, and are exported as false. No negative evidence is inferred from the default absence assumption.
- Each `.prb` declares its disease-specific weights in `atlas.scoring`, computes individual contributions, then sums them into `weighted_score` and its primary output. The compiler requires exact agreement between metadata and executable arithmetic. Shared questions retain one answer.
- No threshold or diagnosis is inferred. Results retain collection order and expose all contributions. Empty assessments yield eight zero scores, not exclusions or a ranked winner.
- FHIR uses Observation `valueQuantity`, with code `phenotype-match-ikd-positive-log10-v1`. Model, rule version and contributions are preserved in notes. ClinicalImpression refers to the scores without creating candidate diagnoses from a cutoff.

## Limits to review

The selected profiles contain different feature sets and their totals are not calibrated for comparison of disease likelihood. LIRICAL background frequencies do not represent a kidney clinic population. Correlated findings can inflate sums: current rules have no automatic clinical dependence correction. Shared questions are deduplicated, but this is not correction for related manifestations (for example kidney enlargement and cystic dysplasia). No domain caps or arbitrary interaction weights were invented. Clinical review and held-out patient evaluation remain pending.

The earlier synthetic benchmark covers a different, fuller LIRICAL calculation and explicit negative evidence. Its performance must not be attributed to this positive-only page model. Current tests instead verify the implemented weights, binary semantics, arithmetic, source consistency and UI/FHIR agreement.

The additional 11 ADTKD weights are pinned separately in `benchmarks/ikd/adtkd-weights.json`, with a reproduction script. See `ADTKD-IMPLEMENTATION.md` for source and interpretation limits.
