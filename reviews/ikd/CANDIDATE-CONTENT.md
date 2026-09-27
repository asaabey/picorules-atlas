# IKD candidate content for clinical review

> Review packet only. No clinical approval or diagnostic performance is implied.
> These ruleblocks calculate research phenotype matching scores using declared positive-finding weights. This is not a diagnostic criterion, probability, or clinical recommendation.

Collection: Inherited kidney disease (ikd), version 0.6.0-family-history.
Content version: `bda54c22d356132f`.

Review every feature label, HPO mapping, question, help text, disease association, and source link.
Record decisions and wording changes in `review-record.json` against this content version.
After a wording or mapping change, rebuild the content, regenerate this packet, and review the new version.

## Source provenance

- **orphadata_2026_06:** [Orphadata Science: Phenotypes Associated with Rare Disorders, English phenotype XML](https://sciences.orphadata.com/phenotypes/). July 2026 knowledge-base release; source XML generated 2026-06-23. Accessed 2026-09-26.
- **genereviews_fabry:** [GeneReviews: Fabry Disease](https://www.ncbi.nlm.nih.gov/books/NBK1292/). Revised 2024-04-11. Accessed 2026-09-27.
- **genereviews_alport:** [GeneReviews: Alport Syndrome](https://www.ncbi.nlm.nih.gov/books/NBK1207/). Release unspecified. Accessed 2026-09-27.
- **genereviews_hnf1b:** [GeneReviews: ADPKD genetic differential diagnosis (HNF1B)](https://www.ncbi.nlm.nih.gov/books/NBK1246/table/pkd-ad.T.genetic_disorders_in_the_differ/). Release unspecified. Accessed 2026-09-27.
- **genereviews_arpkd:** [GeneReviews: Autosomal Recessive Polycystic Kidney Disease - PKHD1](https://www.ncbi.nlm.nih.gov/books/NBK1326/). Release unspecified. Accessed 2026-09-27.
- **genereviews_vhl:** [GeneReviews: Von Hippel-Lindau Syndrome](https://www.ncbi.nlm.nih.gov/books/NBK1463/). Release unspecified. Accessed 2026-09-27.
- **genereviews_tsc:** [GeneReviews: Tuberous Sclerosis Complex](https://www.ncbi.nlm.nih.gov/books/NBK1220/). Updated 2024-08-01. Accessed 2026-09-27.
- **lirical_2020:** [LIRICAL: Interpretable Clinical Genomics with a Likelihood Ratio Paradigm](https://pmc.ncbi.nlm.nih.gov/articles/PMC7477017/). Release unspecified. Accessed date unspecified.
- **ikd_weights_2026_09:** [LIRICAL 2.4.1 candidate weights, HPO September 2026 snapshot](https://github.com/TheJacksonLaboratory/LIRICAL/releases/tag/v2.4.1). 2.4.1; HPO 2026-09-01 / annotations 2026-09-02. Accessed date unspecified.
- **hpoa_2026_09:** [HPO disease annotations, September 2026](https://github.com/obophenotype/human-phenotype-ontology/releases/download/v2026-09-01/phenotype.hpoa). 2026-09-02. Accessed date unspecified.
- **genereviews_adtkd_umod:** [GeneReviews: ADTKD–UMOD](https://www.ncbi.nlm.nih.gov/books/NBK1356/). Release unspecified. Accessed 2026-09-27.
- **genereviews_adtkd_muc1:** [GeneReviews: ADTKD–MUC1](https://www.ncbi.nlm.nih.gov/books/NBK153723/). Release unspecified. Accessed 2026-09-27.
- **adtkd_weights_2026_09:** [ADTKD candidate weights from pinned LIRICAL 2.4.1](https://github.com/TheJacksonLaboratory/LIRICAL/releases/tag/v2.4.1). HPO v2026-09-01, annotations 2026-09-02. Accessed date unspecified.
- Orphadata source XML: [download](https://www.orphadata.com/data/xml/en_product4.xml); SHA-256 `4f44e8a61201399911aa1ba44a293c0ccaa5ce11272c47d40862255cb72f6b32`; CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). The 35 rows in `orphadata-evidence.json` were copied from the local source audit.

- HPOA ADTKD evidence: release 2026-09-02, SHA-256 e89aa39c8f97bf5a52c5d160f9250a603681d630ade8ec2679d84ac5aece1f72. See adtkd-evidence.json for original annotation references and evidence codes.
- Family-history patterns: GeneReviews inheritance and pedigree descriptions are mapped in inheritance-evidence.json. These are contextual observations, not HPO phenotype annotations or LIRICAL-weighted findings.
## Candidate features

### 1. Documented family history suggesting autosomal dominant inheritance (`family_history_autosomal_dominant`)

- Section: Family history
- HPO: HP:0000006; EADV input: `phen_family_history_autosomal_dominant`.
- Question: Does the documented family history show a similar condition in successive generations?
- Help: A pattern in a parent and child or across successive generations may suggest dominant inheritance. A negative or unclear family history does not exclude disease.
- Feature source IDs: genereviews_tsc, genereviews_alport, genereviews_hnf1b, genereviews_vhl, genereviews_adtkd_umod, genereviews_adtkd_muc1.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 182.
- Source row (genereviews_tsc): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 165.
- Source row (genereviews_alport): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.6.0-family-history, input declaration line 165.
- Source row (genereviews_hnf1b): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 179.
- Source row (genereviews_vhl): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 177.
- Source row (genereviews_adtkd_umod): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 151.
- Source row (genereviews_adtkd_muc1): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.

### 2. Documented family history suggesting autosomal recessive inheritance (`family_history_autosomal_recessive`)

- Section: Family history
- HPO: HP:0000007; EADV input: `phen_family_history_autosomal_recessive`.
- Question: Does the documented family history show affected siblings with unaffected parents?
- Help: Affected siblings with unaffected parents may suggest recessive inheritance. An isolated case or no affected siblings does not exclude it.
- Feature source IDs: genereviews_alport, genereviews_arpkd.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 181.
- Source row (genereviews_alport): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 159.
- Source row (genereviews_arpkd): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.

### 3. Documented family history suggesting X-linked inheritance (`family_history_x_linked`)

- Section: Family history
- HPO: HP:0001417; EADV input: `phen_family_history_x_linked`.
- Question: Does transmission among affected relatives in the documented family history suggest an X-linked pattern?
- Help: Affected relatives through the maternal line or affected daughters of an affected father may suggest X-linked inheritance. There is no father-to-son transmission. Females can also be affected, and an unclear pedigree does not exclude it.
- Feature source IDs: genereviews_fabry, genereviews_alport.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 149.
- Source row (genereviews_fabry): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 197.
- Source row (genereviews_alport): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.

### 4. Decreased glomerular filtration rate (`decreased_glomerular_filtration_rate`)

- Section: Kidney
- HPO: HP:0012213; EADV input: `phen_decreased_glomerular_filtration_rate`.
- Question: Has a decreased glomerular filtration rate been documented?
- Help: Records documented reduced GFR without inferring chronicity, cause or a new laboratory threshold.
- Feature source IDs: hpoa_2026_09.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 90.
- Source row (hpoa_2026_09): HP:0012213 “Decreased glomerular filtration rate”, source date 2026-09-02; frequency category “28/32” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 87.
- Source row (hpoa_2026_09): HP:0012213 “Decreased glomerular filtration rate”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.

### 5. Enlarged kidney (`enlarged_kidney`)

- Section: Kidney
- HPO: HP:0000105; EADV input: `phen_enlarged_kidney`.
- Question: Has kidney enlargement been documented on imaging?
- Help: Records documented kidney enlargement without applying a size threshold.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 57.
- Source row (orphadata_2026_06): HP:0000105 “Enlarged kidney”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 6. Glomerular basement membrane lamellation (`glomerular_basement_membrane_lamellation`)

- Section: Kidney
- HPO: HP:0030034; EADV input: `phen_glomerular_basement_membrane_lamellation`.
- Question: Has glomerular basement membrane lamellation been documented in a kidney biopsy report?
- Help: Requires the named biopsy finding. an unspecified abnormal biopsy is insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 148.
- Source row (orphadata_2026_06): HP:0030034 “Glomerular basement membrane lamellation”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 7. Horseshoe kidney (`horseshoe_kidney`)

- Section: Kidney
- HPO: HP:0000085; EADV input: `phen_horseshoe_kidney`.
- Question: Has a horseshoe kidney been documented on imaging?
- Help: Records the named structural kidney finding.
- Image metadata: radiology, Axial CT. No reference image selected: this finding does not need a visual recognition aid in Atlas. Reference asset status: not_selected.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.6.0-family-history, input declaration line 91.
- Source row (orphadata_2026_06): HP:0000085 “Horseshoe kidney”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 8. Hyperechogenic kidneys (`hyperechogenic_kidneys`)

- Section: Kidney
- HPO: HP:0004719; EADV input: `phen_hyperechogenic_kidneys`.
- Question: Have hyperechogenic kidneys been documented on ultrasound?
- Help: Records increased renal echogenicity in the ultrasound report. This is nonspecific and does not establish a genetic diagnosis.
- Image metadata: radiology, Renal ultrasound. No reference image selected: this finding does not need a visual recognition aid in Atlas. Reference asset status: not_selected.
- Feature source IDs: hpoa_2026_09.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 153.
- Source row (hpoa_2026_09): HP:0004719 “Hyperechogenic kidneys”, source date 2026-09-02; frequency category “4/23” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.

### 9. Microscopic haematuria (`microscopic_hematuria`)

- Section: Kidney
- HPO: HP:0002907; EADV input: `phen_microscopic_hematuria`.
- Question: Has microscopic haematuria been documented on urine testing?
- Help: Specifically documented microscopic haematuria.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 63.
- Source row (orphadata_2026_06): HP:0002907 “Microscopic hematuria”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 10. Multicystic kidney dysplasia (`multicystic_kidney_dysplasia`)

- Section: Kidney
- HPO: HP:0000003; EADV input: `phen_multicystic_kidney_dysplasia`.
- Question: Has multicystic kidney dysplasia been documented?
- Help: Records explicitly documented dysplasia. renal cysts alone do not establish this finding.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.6.0-family-history, input declaration line 57.
- Source row (orphadata_2026_06): HP:0000003 “Multicystic kidney dysplasia”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 11. Multiple renal cysts (`multiple_renal_cysts`)

- Section: Kidney
- HPO: HP:0005562; EADV input: `phen_multiple_renal_cysts`.
- Question: Have multiple renal cysts been documented on imaging?
- Help: Multiple renal cysts explicitly documented in an imaging report.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 77.
- Source row (orphadata_2026_06): HP:0005562 “Multiple renal cysts”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 12. Polycystic kidney dysplasia (`polycystic_kidney_dysplasia`)

- Section: Kidney
- HPO: HP:0000113; EADV input: `phen_polycystic_kidney_dysplasia`.
- Question: Has polycystic kidney dysplasia been documented?
- Help: Requires the named structural finding. multiple renal cysts alone are insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 74.
- Source row (orphadata_2026_06): HP:0000113 “Polycystic kidney dysplasia”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 13. Proteinuria (`proteinuria`)

- Section: Kidney
- HPO: HP:0000093; EADV input: `phen_proteinuria`.
- Question: Has proteinuria been documented?
- Help: Records documented protein in the urine without applying a quantitative threshold.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 134.
- Source row (orphadata_2026_06): HP:0000093 “Proteinuria”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 80.
- Source row (orphadata_2026_06): HP:0000093 “Proteinuria”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 14. Renal agenesis (`renal_agenesis`)

- Section: Kidney
- HPO: HP:0000104; EADV input: `phen_renal_agenesis`.
- Question: Has renal agenesis been documented?
- Help: Records congenital absence of a kidney. an acquired solitary kidney is not equivalent.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.6.0-family-history, input declaration line 74.
- Source row (orphadata_2026_06): HP:0000104 “Renal agenesis”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 15. Renal angiomyolipoma (`renal_angiomyolipoma`)

- Section: Kidney
- HPO: HP:0006772; EADV input: `phen_renal_angiomyolipoma`.
- Question: Has a renal angiomyolipoma been documented on imaging?
- Help: Records a documented kidney lesion, without applying a size or number threshold.
- Reference image: [Example renal angiomyolipoma on CT before (left) and after (right) contrast. This image is an example, not a diagnostic template.](/reference-images/renal-angiomyolipoma-ct.jpg); Greco et al., Journal of Renal and Hepatic Disorders (2018); [source](https://commons.wikimedia.org/wiki/File:CT_of_angiomyolipoma,_before_and_after_radiocontrast.jpg); [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); SHA-256 `31157f4f281d178b47b1bb06c613bf2054cbc52c62b99d0642dcae82cb6c0cb6`.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 140.
- Source row (orphadata_2026_06): HP:0006772 “Renal angiomyolipoma”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 16. Renal cell carcinoma (`renal_cell_carcinoma`)

- Section: Kidney
- HPO: HP:0005584; EADV input: `phen_renal_cell_carcinoma`.
- Question: Has renal cell carcinoma been documented?
- Help: A documented renal cell carcinoma diagnosis.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 60.
- Source row (orphadata_2026_06): HP:0005584 “Renal cell carcinoma”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 17. Renal corticomedullary cysts (`renal_corticomedullary_cysts`)

- Section: Kidney
- HPO: HP:0000108; EADV input: `phen_renal_corticomedullary_cysts`.
- Question: Have renal corticomedullary cysts been documented on imaging?
- Help: Requires documented corticomedullary location. Simple cysts elsewhere are not equivalent. Cysts may be absent in ADTKD.
- Image metadata: radiology, CT and T2-weighted MRI. No reference image selected: this finding does not need a visual recognition aid in Atlas. Reference asset status: not_selected.
- Feature source IDs: hpoa_2026_09.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 130.
- Source row (hpoa_2026_09): HP:0000108 “Renal corticomedullary cysts”, source date 2026-09-02; frequency category “2/3” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 127.
- Source row (hpoa_2026_09): HP:0000108 “Renal corticomedullary cysts”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.

### 18. Renal tubular atrophy (`renal_tubular_atrophy`)

- Section: Kidney
- HPO: HP:0000092; EADV input: `phen_renal_tubular_atrophy`.
- Question: Has renal tubular atrophy been documented on a previous kidney biopsy?
- Help: Use an existing histopathology report. This assessment does not recommend obtaining a biopsy.
- Image metadata: histopathology, Light microscopy. No reference image selected: this finding does not need a visual recognition aid in Atlas. Reference asset status: not_selected.
- Feature source IDs: hpoa_2026_09.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 107.
- Source row (hpoa_2026_09): HP:0000092 “Renal tubular atrophy”, source date 2026-09-02; frequency category “24/24” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 104.
- Source row (hpoa_2026_09): HP:0000092 “Renal tubular atrophy”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.

### 19. Angiofibromas (`angiofibromas`)

- Section: Skin and sweating
- HPO: HP:0010615; EADV input: `phen_angiofibromas`.
- Question: Have angiofibromas been identified?
- Help: Records the broad angiofibroma finding, without restricting it to facial lesions or applying a count.
- Image metadata: dermatology, Clinical photograph. Facial angiofibromas in a published tuberous sclerosis example. Appearance varies between individuals. Reference asset status: available_reference.
- Reference image: [Facial angiofibromas in a published tuberous sclerosis example. Appearance varies between individuals.](/reference-images/facial-angiofibromas.jpg); M. Sand, D. Sand, C. Thrandorf, V. Paech, P. Altmeyer and F. G. Bechara (2010). Unmodified source image.; [source](https://commons.wikimedia.org/wiki/File:Adenoma_sebaceum_01.jpg); [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); SHA-256 `31bf1152217a464c857f41b098e4f1b1c68717713b6092e86fa706296cae7a72`.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 77.
- Source row (orphadata_2026_06): HP:0010615 “Angiofibromas”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 20. Angiokeratomas (`angiokeratoma`)

- Section: Skin and sweating
- HPO: HP:0001014; EADV input: `phen_angiokeratoma`.
- Question: Have angiokeratomas been identified?
- Help: Records whether these vascular skin lesions have been identified.
- Reference image: [Examples of Fabry-associated angiokeratomas near the navel and on the oral mucosa.](/reference-images/fabry-angiokeratomas.jpg); Burlina et al., BMC Neurology (2011); [source](https://commons.wikimedia.org/wiki/File:Morbus_Fabry_Angiokeratoma_01.jpg); [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); SHA-256 `93d2a3bd16121c60ae815c992f6cbc795abd33397839c52b45af6e149be61d00`.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 65.
- Source row (orphadata_2026_06): HP:0001014 “Angiokeratoma”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 21. Hypomelanotic macules (`hypomelanotic_macule`)

- Section: Skin and sweating
- HPO: HP:0009719; EADV input: `phen_hypomelanotic_macule`.
- Question: Have hypomelanotic macules been identified?
- Help: Records identified patches of skin with reduced pigmentation. No lesion count is applied.
- Reference image: [Top panel (A): hypomelanotic macules. The other panels show different TSC skin findings.](/reference-images/tsc-skin-findings.png); Portocarrero et al., Anais Brasileiros de Dermatologia (2018); [source](https://commons.wikimedia.org/wiki/File:Hypopigmented_macules,_Shagreen_patch_and_periungual_fibroma_of_tuberous_sclerosis.png); [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); SHA-256 `234f5ffc30708ab4b68d549e51884a9c0627ad415cf2207acc02fc69f30582c8`.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 50.
- Source row (orphadata_2026_06): HP:0009719 “Hypomelanotic macule”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 22. Reduced sweating (`hypohidrosis`)

- Section: Skin and sweating
- HPO: HP:0000966; EADV input: `phen_hypohidrosis`.
- Question: Does the patient report reduced sweating?
- Help: Records a history of sweating less than expected.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 92.
- Source row (orphadata_2026_06): HP:0000966 “Hypohidrosis”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 23. Shagreen patch (`shagreen_patch`)

- Section: Skin and sweating
- HPO: HP:0009721; EADV input: `phen_shagreen_patch`.
- Question: Has a shagreen patch been identified?
- Help: Records whether this skin finding has been identified.
- Reference image: [Middle panel (B): shagreen patch. The other panels show different TSC skin findings.](/reference-images/tsc-skin-findings.png); Portocarrero et al., Anais Brasileiros de Dermatologia (2018); [source](https://commons.wikimedia.org/wiki/File:Hypopigmented_macules,_Shagreen_patch_and_periungual_fibroma_of_tuberous_sclerosis.png); [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); SHA-256 `234f5ffc30708ab4b68d549e51884a9c0627ad415cf2207acc02fc69f30582c8`.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 113.
- Source row (orphadata_2026_06): HP:0009721 “Shagreen patch”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 24. Anterior lenticonus (`anterior_lenticonus`)

- Section: Eyes
- HPO: HP:0011501; EADV input: `phen_anterior_lenticonus`.
- Question: Has anterior lenticonus been documented on eye examination?
- Help: Records a documented lens finding. the patient is not asked to identify it.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 114.
- Source row (orphadata_2026_06): HP:0011501 “Anterior lenticonus”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 25. Cornea verticillata (`cornea_verticillata`)

- Section: Eyes
- HPO: HP:0500008; EADV input: `phen_cornea_verticillata`.
- Question: Has cornea verticillata been documented on eye examination?
- Help: Records a documented corneal finding. It does not ask the patient to identify it.
- Reference image: [Cornea verticillata seen on slit-lamp examination in Fabry disease.](/reference-images/fabry-cornea-verticillata.jpg); Burlina et al., BMC Neurology (2011); [source](https://commons.wikimedia.org/wiki/File:Morbus_Fabry_Cornea_verticillata_01.jpg); [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); SHA-256 `845b4fb804ada470192274095556740d18d2f2b79dd6a356176548d25a0a3066`.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 107.
- Source row (orphadata_2026_06): HP:0500008 “Cornea verticillata”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 26. Retinal capillary haemangioma (`retinal_capillary_hemangioma`)

- Section: Eyes
- HPO: HP:0009711; EADV input: `phen_retinal_capillary_hemangioma`.
- Question: Has a retinal capillary haemangioma been documented?
- Help: Records the specific documented retinal lesion. other retinal lesions are not equivalent.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 94.
- Source row (orphadata_2026_06): HP:0009711 “Retinal capillary hemangioma”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 27. Retinal flecks (`retinal_flecks`)

- Section: Eyes
- HPO: HP:0012045; EADV input: `phen_retinal_flecks`.
- Question: Have retinal flecks been documented on eye examination?
- Help: Records the named retinal finding without inferring an inherited cause.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 131.
- Source row (orphadata_2026_06): HP:0012045 “Retinal flecks”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 28. Acroparaesthesia (`acroparesthesia`)

- Section: Neurological history
- HPO: HP:0031006; EADV input: `phen_acroparesthesia`.
- Question: Has the patient experienced episodes of burning or tingling pain in the hands or feet?
- Help: Episodes of pain or abnormal sensation in the extremities.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 50.
- Source row (orphadata_2026_06): HP:0031006 “Acroparesthesia”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 29. Cerebellar haemangioblastoma (`cerebellar_hemangioblastoma`)

- Section: Neurological history
- HPO: HP:0006880; EADV input: `phen_cerebellar_hemangioblastoma`.
- Question: Has a cerebellar haemangioblastoma been documented?
- Help: Records the named tumour and location, not an unspecified brain lesion.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 111.
- Source row (orphadata_2026_06): HP:0006880 “Cerebellar hemangioblastoma”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 30. Seizures (`seizure`)

- Section: Neurological history
- HPO: HP:0001250; EADV input: `phen_seizure`.
- Question: Is there a history of seizures?
- Help: Records a history of seizures without implying when they occurred.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 167.
- Source row (orphadata_2026_06): HP:0001250 “Seizure”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 31. Bilateral sensorineural hearing impairment (`bilateral_sensorineural_hearing_impairment`)

- Section: Hearing
- HPO: HP:0008619; EADV input: `phen_bilateral_sensorineural_hearing_impairment`.
- Question: Has sensorineural hearing impairment in both ears been documented?
- Help: Documented sensorineural impairment affecting both ears.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 97.
- Source row (orphadata_2026_06): HP:0008619 “Bilateral sensorineural hearing impairment”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 32. Endolymphatic sac tumour (`endolymphatic_sac_tumor`)

- Section: Hearing
- HPO: HP:0030393; EADV input: `phen_endolymphatic_sac_tumor`.
- Question: Has an endolymphatic sac tumour been documented?
- Help: Records the named tumour. hearing impairment alone is insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 162.
- Source row (orphadata_2026_06): HP:0030393 “Endolymphatic sac tumor”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 33. Adrenal pheochromocytoma (`adrenal_pheochromocytoma`)

- Section: Endocrine and metabolic
- HPO: HP:0006748; EADV input: `phen_adrenal_pheochromocytoma`.
- Question: Has an adrenal pheochromocytoma been documented?
- Help: Requires the documented tumour diagnosis. hypertension alone does not establish this finding.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 128.
- Source row (orphadata_2026_06): HP:0006748 “Adrenal pheochromocytoma”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 34. Diabetes mellitus (`diabetes_mellitus`)

- Section: Endocrine and metabolic
- HPO: HP:0000819; EADV input: `phen_diabetes_mellitus`.
- Question: Has diabetes mellitus been documented?
- Help: Records documented diabetes without inferring its type, genetic cause or age at onset.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.6.0-family-history, input declaration line 114.
- Source row (orphadata_2026_06): HP:0000819 “Diabetes mellitus”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 35. Gout (`gout`)

- Section: Endocrine and metabolic
- HPO: HP:0001997; EADV input: `phen_gout`.
- Question: Has gout been clinically documented?
- Help: Records diagnosed gout, not hyperuricaemia alone. This question does not encode whether gout preceded kidney impairment.
- Feature source IDs: hpoa_2026_09.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 73.
- Source row (hpoa_2026_09): HP:0001997 “Gout”, source date 2026-09-02; frequency category “36/85” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 70.
- Source row (hpoa_2026_09): HP:0001997 “Gout”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.

### 36. Hyperuricaemia (`hyperuricemia`)

- Section: Endocrine and metabolic
- HPO: HP:0002149; EADV input: `phen_hyperuricemia`.
- Question: Has hyperuricaemia been documented?
- Help: Records a documented elevated urate finding without applying a new laboratory threshold.
- Feature source IDs: orphadata_2026_06, hpoa_2026_09.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.6.0-family-history, input declaration line 148.
- Source row (orphadata_2026_06): HP:0002149 “Hyperuricemia”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 56.
- Source row (hpoa_2026_09): HP:0002149 “Hyperuricemia”, source date 2026-09-02; frequency category “100/130” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 53.
- Source row (hpoa_2026_09): HP:0002149 “Hyperuricemia”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.

### 37. Pancreatic aplasia or hypoplasia (`pancreatic_aplasia_hypoplasia`)

- Section: Endocrine and metabolic
- HPO: HP:0100800; EADV input: `phen_pancreatic_aplasia_hypoplasia`.
- Question: Has pancreatic aplasia or hypoplasia been documented?
- Help: Records documented absent or underdeveloped pancreatic tissue. diabetes alone is insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.6.0-family-history, input declaration line 131.
- Source row (orphadata_2026_06): HP:0100800 “Aplasia/Hypoplasia of the pancreas”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 38. Pancreatic endocrine tumour (`pancreatic_endocrine_tumor`)

- Section: Endocrine and metabolic
- HPO: HP:0030405; EADV input: `phen_pancreatic_endocrine_tumor`.
- Question: Has a pancreatic endocrine tumour been documented?
- Help: Records the specific tumour diagnosis. an unspecified pancreatic lesion is insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 145.
- Source row (orphadata_2026_06): HP:0030405 “Pancreatic endocrine tumor”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 39. Congenital hepatic fibrosis (`congenital_hepatic_fibrosis`)

- Section: Liver and prenatal history
- HPO: HP:0002612; EADV input: `phen_congenital_hepatic_fibrosis`.
- Question: Has congenital hepatic fibrosis been documented?
- Help: Records congenital hepatic fibrosis. unspecified liver fibrosis does not establish this subtype.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 91.
- Source row (orphadata_2026_06): HP:0002612 “Congenital hepatic fibrosis”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 40. Oligohydramnios in the patient’s prenatal history (`oligohydramnios`)

- Section: Liver and prenatal history
- HPO: HP:0001562; EADV input: `phen_oligohydramnios`.
- Question: Was oligohydramnios documented during the pregnancy in which this patient was carried?
- Help: Refers to the patient’s own prenatal history, not a later pregnancy carried by the patient. Unknown if records are unavailable.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 125.
- Source row (orphadata_2026_06): HP:0001562 “Oligohydramnios”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 41. Portal hypertension (`portal_hypertension`)

- Section: Liver and prenatal history
- HPO: HP:0001409; EADV input: `phen_portal_hypertension`.
- Question: Has portal hypertension been documented?
- Help: Records documented portal hypertension, separately from systemic arterial hypertension.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 108.
- Source row (orphadata_2026_06): HP:0001409 “Portal hypertension”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 42. Hypertension (`hypertension`)

- Section: Cardiovascular
- HPO: HP:0000822; EADV input: `phen_hypertension`.
- Question: Has hypertension been documented?
- Help: Documented hypertension without deriving a diagnosis from a single blood pressure.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 142.
- Source row (orphadata_2026_06): HP:0000822 “Hypertension”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

## Shared review decisions

- Assessment limitations shown in Atlas: These 42 questions across eight disease profiles are an incomplete research assessment. Three shared family-history prompts record patterns that may suggest dominant, recessive, or X-linked inheritance; they do not establish a genetic diagnosis. Unticked findings are recorded as absent for this proof of concept. Family-history prompts have zero score weight while the other present findings add candidate weights derived from LIRICAL. Scores are not calibrated disease probabilities or diagnostic criteria. A zero score does not exclude disease. A negative or unclear family history does not exclude disease, and Alport remains a broad profile without inheritance subtypes. Related findings may inflate totals, profiles have different selected features, and UMOD and MUC1 remain hard to distinguish. Timing of gout is not encoded.
- Disease association context shown in Atlas: This is background context; an answer here does not establish or exclude a diagnosis.
- Answer semantics: tick a finding to record present; every unticked finding is assumed absent for this demonstration.
- FHIR mapping: all selected features produce boolean Observations, including false for unticked findings. Check displayed wording against this assumption.
- Disease context: an association is background information and cannot establish or exclude disease.
- Research output: each rule sums its declared weights for present features. Unticked features are absent and contribute zero. No diagnostic cutoff is applied. Review weights, correlated findings, feature selection and population calibration before clinical use.
- Scope: 42 candidate features across 8 disease ruleblocks. This is not a complete inherited kidney disease screen or diagnostic criteria. It does not rank diseases or use Orphadata frequency categories as weights.
- Reviewer checks: confirm source attribution, release/version, terminology meaning, wording, limitations, and whether any feature needs added clinical context.

