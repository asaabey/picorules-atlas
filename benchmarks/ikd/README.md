# Six-disease phenotype-weighting benchmark

Research harness for Fabry, tuberous sclerosis complex, broad Alport, HNF1B-related disease, ARPKD and VHL. This harness remains independent of the application build. Atlas retains the extracted positive weights for five of these six profiles; expanded HNF1B now uses a present-feature count: see [implementation](../../reviews/ikd/WEIGHTING-IMPLEMENTATION.md). The benchmark below preserves the earlier count baseline and full LIRICAL comparison.

Read [REPORT.md](REPORT.md) for observed results and limitations. [candidate-weights.csv](candidate-weights.csv) contains **204 per-present-finding contributions: 34 Atlas findings × six disease profiles**. Each is the published LIRICAL engine's likelihood ratio and log10 weight, with match type and matched HPO term. These are research candidates, not approved clinical weights. The original 35 declared pairs are preserved here as a historical extraction; six HNF1B weights are no longer executed in Atlas. A nonmatching annotation may receive a heuristic negative weight; this does not prove clinical exclusion.

## Methods and inputs

- **Atlas baseline:** exact positive-input counts from the pinned authored question sets, with their historical two-present-finding prompts. This reproduces the count formula, not a separate browser execution. The application has since switched to weighted scores.
- **Information similarity:** mean best-match Resnik similarity against full target profiles, using `IC(h) = -log2(number of annotated background diseases / total background diseases)`. Ancestor annotations are propagated once per disease. Background: all valid positive P-aspect Orphanet profiles in HPO v2026-09-01 (4,355). This is a transparent comparator, not the full Phenomizer implementation; no p-values or probabilities are produced.
- **Published reference engine:** unmodified LIRICAL 2.4.1, with the HPO v2026-09-01 ontology and annotation file. The phenotype LR evaluator uses the engine's broader loaded disease background. All six exact source IDs must appear in the output or the run fails.
- **Queries:** six source-constructed patterns plus seven behavioural controls, including an all-unknown case. All are synthetic; no patient data is used. The cases are deliberately constructed from the reference profiles and cannot estimate clinical accuracy.
- **Preprocessing:** remove redundant positive ancestor terms while keeping the original query. For explicit negative terms, retain the broader excluded term. Reject contradictory positive/negative assertions. Unknown/unanswered terms are omitted; no-evidence input produces no ranking. The positive-only similarity method does not penalise explicit absences.

The single-feature contribution export uses a batch of all 34 terms because the engine calculates each term contribution independently. This is not a patient case. Its combined LR and probability are discarded. The benchmark cases, by contrast, use nonredundant query sets. Summing all table rows without that distinction would double-count related findings.

## Reproduce

Requirements: Python 3.12+, network access for first setup, Linux x86_64 for the pinned JRE. About 441 MB of download archives/data plus unpacked Java and LIRICAL files are kept outside the repository. No npm dependency changes are needed.

Run from `picorules-atlas/`:

```bash
python3 benchmarks/ikd/setup.py --cache /tmp/atlas-ikd-benchmark

python3 benchmarks/ikd/benchmark.py \
  --data /tmp/atlas-ikd-benchmark \
  --java /tmp/atlas-ikd-benchmark/jdk-17.0.20.1+1-jre/bin/java \
  --jar /tmp/atlas-ikd-benchmark/lirical-cli-2.4.1/lirical-cli-2.4.1.jar \
  --work /tmp/atlas-ikd-benchmark/runs

python3 benchmarks/ikd/feature_weights.py \
  --data /tmp/atlas-ikd-benchmark \
  --java /tmp/atlas-ikd-benchmark/jdk-17.0.20.1+1-jre/bin/java \
  --jar /tmp/atlas-ikd-benchmark/lirical-cli-2.4.1/lirical-cli-2.4.1.jar \
  --work /tmp/atlas-ikd-benchmark/runs

python3 -m unittest discover -s benchmarks/ikd -p 'test_*.py'
```

`benchmark.py --data /path/to/data` alone runs only the similarity/baseline comparisons; it explicitly records LIRICAL as not run. Full execution records the engine jar, source and benchmark input hashes. Source files and engine logs/full JSON remain external. The report is the written interpretation of the recorded run; review it when updating the fixtures or model.

`resources.json` pins all downloaded hashes. Two source URLs (`mim2gene_medgen` and Orphadata's gene-association XML) are mutable: if upstream data changes, setup stops rather than silently substituting a new resource. Preserve the external cache for exact reproduction. The benchmark snapshot of Atlas includes only scoring-relevant IDs and inputs, not images or other concurrent UI work.

## Compatibility findings

1. LIRICAL's bundled Phenol 2.1.4 HGNC reader uses positional column 18 for Entrez IDs. The current downloaded HGNC table has a different layout and also contains duplicate Entrez IDs. The benchmark pins the **unmodified 2025-01-06 HGNC archive**, which has the expected layout and unique nonempty IDs. No rows or identifiers were edited. [Reader source](https://github.com/monarch-initiative/phenol/blob/v2.1.4/phenol-annotations/src/main/java/org/monarchinitiative/phenol/annotations/assoc/HGNCGeneIdentifierLoader.java), [HGNC archives](https://www.genenames.org/download/archive/).
2. Use **both `--use-orphanet` and `--target-diseases`**. In this release the former is needed to load the Orphanet profiles, even though the documentation says it is ignored when targets are supplied. The wrapper asserts that exactly six requested profiles are returned; the first unflagged probe returned zero. [Engine configuration source](https://github.com/TheJacksonLaboratory/LIRICAL/blob/v2.4.1/lirical-configuration/src/main/java/org/monarchinitiative/lirical/configuration/LiricalBuilder.java).
3. Create the output directory before invoking the engine. Its JSON writer does not create a missing output directory.
4. LIRICAL's resource validator requires transcript-cache files even for phenotype-only execution. These are downloaded intact for compatibility; no variants or genomic observations enter this benchmark.

## Files

| File | Purpose |
| --- | --- |
| `atlas-baseline.json` | Frozen six-rule input sets and collection content version |
| `cases.json` | Synthetic observed/absent features and intended source patterns |
| `results.json` | Coverage, annotation information values, case ranks and LR contributions |
| `candidate-weights.csv` | Complete 34 × 6 present-feature LR matrix for review |
| `candidate-weights-provenance.json` | Matrix, resource and engine-output hashes |
| `resources.json` | Download URLs, versions, file sizes and hashes |
| `setup.py` | Download and verify external resources |
| `benchmark.py` | Run preprocessing, baseline, similarity and reference-engine comparisons |
| `feature_weights.py` | Extract independent per-finding contributions, discarding batch totals |
| `test_benchmark.py` | Similarity invariants and recorded-engine checks |

## References and reuse

- [LIRICAL paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC7477017/), [release 2.4.1](https://github.com/TheJacksonLaboratory/LIRICAL/releases/tag/v2.4.1), [CLI documentation](https://thejacksonlaboratory.github.io/LIRICAL/stable/running.html).
- [Phenomizer paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC2756558/) for ontology-based similarity; this implementation is explicitly a simpler comparator.
- [HPO v2026-09-01 release](https://github.com/obophenotype/human-phenotype-ontology/releases/tag/v2026-09-01). Ontology and annotation source files remain unmodified outside this repository. Follow HPO's applicable terms for subsequent distribution.
- Orphadata Science: Free access data from Orphanet. © INSERM 1999. [Source site](https://sciences.orphadata.com/). Target phenotype profiles correspond to the previously audited July 2026 knowledge-base release. The existing Atlas evidence snapshot retains its CC BY 4.0 attribution. This benchmark adds locally authored cases and numerical analyses; no endorsement is implied.

No numerical research score in this directory should be substituted for a clinical probability or an approved diagnostic criterion. The selected-feature page score differs from the full engine benchmark and still requires clinical review and validation.
