# TKC inherited kidney disease phenotype source audit

Checked 26 September 2026. Scope: the eight disease groups and 17 study entities in León et al., DOI [10.1016/j.ekir.2026.107104](https://doi.org/10.1016/j.ekir.2026.107104). The study text was supplied by the user.

## Result

Usable baseline phenotype data is available. Orphadata provides an explicitly CC-BY-4.0 subset ready for data integration work. HPOA supplies additional subtype annotations under HPO's separate terms. The authors' public CURATED JSON is accessible, but permission to adapt or redistribute it and equivalence to the published study dataset remain unverified. None of these findings establishes clinical performance in TKC.

## Files

- `orphadata-phenotypes.csv`: 449 disease–phenotype rows across 13 selected profiles. This is a filtered, tabular transformation of Orphadata's English phenotype XML, not the authors' CURATED dataset. Frequency labels and diagnostic-criterion fields are preserved; blank fields remain unknown. All exported HPO IDs resolve to non-obsolete terms in HPO v2026-09-01.
- `study-entity-coverage.csv`: one row for each of the paper's 17 entities, with candidate HPOA source IDs, unique positive phenotypic-anomaly counts, and mapping caveats. These are candidate mappings, not the paper's verified MONDO crosswalk.
- `source-manifest.json`: source URLs, release dates, hashes, coverage and author-file validation findings. Full HPO and author downloads were inspected in temporary storage; their contents are not repackaged here.

## Orphadata coverage

| Paper group | ORPHA ID | Downloaded phenotype rows | Qualification |
| --- | --- | ---: | --- |
| Tuberous sclerosis | 805 | 62 | Broad profile |
| Nephronophthisis | 655 | 3 | Very sparse; requires subtype supplementation |
| Fabry disease | 324 | 76 | Does not separate classic/non-classic disease |
| Alport syndrome | 63 | 34 | Additional AD/XL/AR profiles contain 9/19/15 rows |
| ADTKD | 34149 | 0 | Disease exists in Orphanet, but no profile in this phenotype XML |
| HNF1B-related disease | 93111 | 29 | Renal disease profile |
| ARPKD | 731 | 51 | Broad profile |
| Von Hippel-Lindau | 892 | 41 | Broad profile |

The export also contains isolated Joubert, Joubert with renal defect, and Joubert with oculorenal defect (37/36/37 rows). These must remain separate candidates until the study's actual entity mapping is obtained. Mainzer-Saldino ORPHA:140969 was absent from this XML.

HPOA adds UMOD/MUC1 ADTKD (33/19 unique positive P-aspect terms), nephronophthisis 1/4/12 (12/9/2), and relevant ciliopathy profiles. OMIM:266920 is now labelled short-rib thoracic dysplasia 9 and contains 93 unique positive P-aspect terms; it is related to Mainzer-Saldino, not an automatically interchangeable profile. General Fabry annotations cannot be counted as two independently curated subtype profiles.

## Reuse terms

**Orphadata:** both the [phenotype download page](https://sciences.orphadata.com/phenotypes/) and the downloaded XML specify CC BY 4.0. Its [legal notice](https://www.orphadata.com/legal/) explicitly permits reuse in other information systems, including commercial use. Retain attribution, license reference, release date and an indication of changes. Do not imply endorsement. This finding applies to Orphadata Science phenotype data, not every Orphanet product.

**Attribution for this export:** Orphadata Science: Free access data from Orphanet. © INSERM 1999. Available at https://sciences.orphadata.com/. Data version: July 2026 knowledge-base release; source XML generated 2026-06-23. Accessed 2026-09-26. Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changes: selected kidney disease profiles, transformed XML to CSV, retained source labels and frequency categories.

**HPO:** the official repository [LICENSE.md](https://github.com/obophenotype/human-phenotype-ontology/blob/master/LICENSE.md) points to a web route that returned 404. The official website's [license component source](https://github.com/TheJacksonLaboratory/hpo-web/blob/main/src/app/static/resources/license/license.component.html) permits use with attribution and version disclosure while requiring HPO file content and logical relationships to remain unchanged. Do not label the HPO bulk resources CC BY based on the publication's license. Keep the source ontology intact and TKC-specific assertions in a separately identified layer; confirm terms before distributing modified HPO-derived files. The hpo-web application's separate software license does not establish the data license.

**Authors' CURATED:** no top-level or nested license filename was found in the repository's complete file listing; the inspected README and JSON provide no data reuse grant. Public access is not verified permission to adapt, redistribute or embed the dataset. Obtain an explicit data license and a study-matched release from the authors before incorporating it. No author contact was made.

## Authors' dataset findings

The paper's old URL redirects to the public [b2slab/KidneyDatabaseComparison repository](http://b2sdata.upc.edu:30080/b2slab/KidneyDatabaseComparison/). Its [curated_data.json](http://b2sdata.upc.edu:30080/b2slab/KidneyDatabaseComparison/-/blob/main/kidney/src/main/resources/databases/curated_data.json) contains 49 top-level groups and 83 profiles, with HPO symptom IDs, frequency-category values, gene fields and MONDO code strings.

The default branch resolves to commit `ef9217ddaeb0f7a78f97c2f2c73f87cc9b02f912`, dated 19 December 2024, predating the 2026 manuscript. It covers seven of the eight named groups; no nephronophthisis group was found. Fabry profiles are split by sex and classic/non-classic presentation; X-linked Alport is also split by sex. This does not match the paper's stated 17-entity evaluation directly.

Across the entire JSON, 23 distinct symptom IDs are absent from HPO v2026-09-01 and one is obsolete. These may include local extensions or errors; their meaning cannot be assumed. The exact IDs are recorded in the manifest. MAIN CHARS contains additional HPO-like identifiers which have not been comprehensively validated. MONDO code formatting varies and requires padding, existence checks, and semantic crosswalk review, not just string normalization. The README states that the three tools were reimplemented; using that code is not necessarily equivalent to running their upstream distributions.

## TKC use

Use the Orphadata export as a separately versioned disease-profile table. Picorules should emit patient findings with evidence, dates and present/absent/unknown state. A mapping table can join these findings to HPO IDs. Do not turn a patient's disease diagnosis into the expected phenotype list: that would introduce circular evidence into ranking.

Before implementing ranking, resolve the sparse nephronophthisis profiles, ADTKD subtype data, Fabry subtype separation and ciliopathy crosswalks. Preserve negative annotations and frequency ranges rather than converting every row into a positive feature or a calibrated probability. The HPOA inventory counts only aspect P; inheritance and onset annotations are not treated as phenotypic abnormalities.

Live TKC observation availability, clinical phenotype definitions, extraction accuracy and local ranking performance remain untested. Use held-out, pre-diagnosis records for evaluation; do not assume the paper's reported improvements transfer to TKC.

## Verification performed

Downloaded and parsed the official Orphadata XML, HPOA release and matching HPO ontology; checked source license declarations; counted source profiles and unique positive P-aspect terms; checked all exported phenotype IDs for existence and obsolescence; inspected the authors' complete file list, README, current commit and curated JSON. No runtime code or clinical rules were changed.
