# Implemented prototype: 27 September 2026

The original discussion below is historical. The current two-state model records unstated/unticked findings as absent. Model `ikd-positive-log10-v1` adds the rounded LIRICAL candidate weights for present findings in each declared rule and assigns zero to absence. There is no unknown state, negative absence weight, diagnostic cutoff or probability. See [implementation notes](WEIGHTING-IMPLEMENTATION.md).

# Disease-specific phenotype weighting

Draft for discussion, 27 September 2026. This specifies the replacement for equal feature counts; it does not assign clinically validated numerical weights or change executable rules.

## What the score should mean

The proposed output is strength of phenotype support for a candidate disease. A higher score can prioritise review within a defined candidate set. It is not a probability of disease. Comparing raw totals between profiles with different feature counts requires explicit calibration or a justified common scoring model; dividing by maximum points alone does not solve that problem.

The clinical question is how much a finding distinguishes the candidate from relevant alternatives. Being frequent among patients with a disease is different from being specific to that disease. Where reliable estimates exist, a likelihood ratio compares the frequency of a finding in that disease with its frequency in the comparator population. A posterior probability additionally needs prevalence/prior odds and a justified treatment of dependent findings.

The saved Orphadata frequency categories describe within-disease associations. They cannot supply those comparator frequencies, and absence of an annotation does not mean absence of the finding. The six small Atlas question sets must not be used to estimate clinical specificity: deliberately omitted findings would falsely appear exclusive to other diseases.

## Initial clinical review rubric

Weights belong to the disease–feature association. The shared question and patient answer retain a single meaning across all diseases.

| Proposed evidence role | Candidate examples for review | Intended treatment |
| --- | --- | --- |
| Background kidney involvement | Reduced kidney function, proteinuria, haematuria | Limited individual influence; contextual findings may be important for eligibility and combinations |
| Characteristic finding | Acroparaesthesia in a Fabry assessment | Greater influence only after checking exact phenotype, alternative explanations and context |
| Highly distinctive documented finding | Anterior lenticonus in an Alport assessment | Strong evidence role; a single important finding should not require an arbitrary second positive |
| Characteristic combination | A reviewed combination of Fabry pain, sweating and skin findings | Explicit combination logic when supported; avoid multiplying correlated evidence as though independent |
| Diagnostic confirmation | A disease-appropriate interpreted molecular/biochemical result | Separate confirmation pathway, with its own criteria and evidence provenance |

These roles are proposed for review. There are intentionally no universal 1/3/5 weights or invented disease probability cutoffs.

Acroparaesthesia is associated with Fabry disease, but the current Atlas question about burning/tingling pain in hands or feet is broader than a specific Fabry pain history. Other causes of small-fibre neuropathy overlap. Age at onset, episodic pattern, triggers and accompanying features are potential refinements to review before assigning a high weight. See [Fabry pain recommendations](https://pmc.ncbi.nlm.nih.gov/articles/PMC5071655/) and [GeneReviews: Fabry](https://www.ncbi.nlm.nih.gov/books/NBK1292/?report=reader).

Anterior lenticonus provides a stronger specificity example: [GeneReviews: Alport](https://www.ncbi.nlm.nih.gov/books/NBK1207/) describes a particularly close association. This supports reviewing it as a distinctive feature, but does not supply a calibrated numerical weight.

## Rule authoring contract

Each disease–feature weight specification should carry: feature ID, evidence role, proposed numeric weight when available, source/rationale, population and age scope, required evidence quality, overlap group, review status and version. Unspecified weights must cause a content validation error for a weighted rule; they must not silently become 1 or 0.

The `.prb` remains the authority for question metadata and score computation. All feature fetches precede calculations. Conditional contributions only apply to present findings. Unknown and unanswered provide no positive or negative evidence, and assessment coverage is returned separately. Explicit absence can only reduce support when a reviewed, age-appropriate negative-evidence model exists.

Compute an evidence contribution per feature, then reviewed group contributions and any supported interactions. Parent/specific findings from the same observation must not be summed independently. Domain caps are possible editorial choices, but also require justification; broad organ-system membership alone does not establish dependence.

Return the weighted support total, contributing findings and points, assessed/unknown counts, key unassessed findings, and the scoring-model version. Keep evidence completeness separate from phenotype support. Do not interpret an all-unknown profile as low likelihood or a disease exclusion. Do not require an invented threshold merely to display the evidence summary.

## Atlas integration work

1. Add a versioned weighted model beside the legacy demo contract, with explicit weight provenance and pending/approved status. Keep disease-specific weights out of canonical shared question definitions.
2. Extend the content compiler beyond the exact three demonstration statements. Validate all referenced features, contribution metadata and executable outputs; preserve compatibility with reference images and other concurrent app changes.
3. Evaluate the `.prb` outputs as the authoritative score. The current runtime rechecks an unweighted count and derives its flag from that count; updating only the rule files would be insufficient.
4. Show contribution explanations and missingness in the result UI. Replace the generic two-finding candidate flag only when its replacement semantics are specified. Label numerical outputs as phenotype support unless calibration justifies stronger language.
5. Version the FHIR score code and metadata so a weighted score cannot be mistaken for the current present-feature count. Include model version, evidence and missingness; do not create a confirmed diagnosis from weighted phenotype support.
6. Regenerate clinical review records and add tests for shared findings with different disease weights, missing inputs, overlapping parent/specific evidence, a single distinctive finding, and consistent UI/FHIR results.

## Evidence needed for the first weights

Start with Fabry and Alport as worked examples. For each input, record clinical specificity evidence and decide whether its present wording is precise enough. Extend that table to HNF1B, ARPKD, VHL and TSC. Clinician-assigned weights must be labelled as expert judgement and versioned; data-derived weights need a suitable comparator cohort and validation. Compare performance against the existing equal-count baseline using held-out records, accounting for diagnosis leakage, age, sex and incomplete assessment.

Ontology information content is another possible similarity approach: [the original HPO paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC2668030/) describes using specificity in semantic similarity. Such scores measure annotation-based similarity, not clinical likelihood ratios. They should use a sufficiently broad, versioned annotation corpus and retain mapping/missingness caveats.
