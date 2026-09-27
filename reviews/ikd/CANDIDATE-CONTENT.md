# IKD candidate content for clinical review

> Review packet only. No clinical approval or diagnostic performance is implied.

Collection: Inherited kidney disease (ikd), version 0.1.0.
Content version: `442bae27603451e8`.

Review every feature label, HPO mapping, question, help text, disease association, and source link.
Record decisions and wording changes in `review-record.json` against this content version.
After a wording or mapping change, rebuild the content, regenerate this packet, and review the new version.

## Source provenance

- **orphadata_2026_06:** [Orphadata Science: Phenotypes Associated with Rare Disorders, English phenotype XML](https://sciences.orphadata.com/phenotypes/). July 2026 knowledge-base release; source XML generated 2026-06-23. Accessed 2026-09-26.
- **genereviews_fabry:** [GeneReviews: Fabry Disease](https://www.ncbi.nlm.nih.gov/books/NBK1292/). Revised 2024-04-11. Accessed 2026-09-27.
- **genereviews_tsc:** [GeneReviews: Tuberous Sclerosis Complex](https://www.ncbi.nlm.nih.gov/books/NBK1220/). Updated 2024-08-01. Accessed 2026-09-27.
- Orphadata source XML: [download](https://www.orphadata.com/data/xml/en_product4.xml); SHA-256 `4f44e8a61201399911aa1ba44a293c0ccaa5ce11272c47d40862255cb72f6b32`; CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). The ten rows in `orphadata-evidence.json` were copied from the local source audit.

## Candidate features

### 1. Proteinuria (`proteinuria`)

- Section: Kidney
- HPO: HP:0000093; EADV input: `phen_proteinuria`.
- Question: Has proteinuria been documented?
- Help: Records documented protein in the urine without applying a quantitative threshold.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.1.0, input declaration line 80.
- Orphadata row: HP:0000093 “Proteinuria”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 2. Renal angiomyolipoma (`renal_angiomyolipoma`)

- Section: Kidney
- HPO: HP:0006772; EADV input: `phen_renal_angiomyolipoma`.
- Question: Has a renal angiomyolipoma been documented on imaging?
- Help: Records a documented kidney lesion, without applying a size or number threshold.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.1.0, input declaration line 65.
- Orphadata row: HP:0006772 “Renal angiomyolipoma”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 3. Angiofibromas (`angiofibromas`)

- Section: Skin and sweating
- HPO: HP:0010615; EADV input: `phen_angiofibromas`.
- Question: Have angiofibromas been identified?
- Help: Records the broad angiofibroma finding, without restricting it to facial lesions or applying a count.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.1.0, input declaration line 35.
- Orphadata row: HP:0010615 “Angiofibromas”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 4. Angiokeratomas (`angiokeratoma`)

- Section: Skin and sweating
- HPO: HP:0001014; EADV input: `phen_angiokeratoma`.
- Question: Have angiokeratomas been identified?
- Help: Records whether these vascular skin lesions have been identified.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.1.0, input declaration line 35.
- Orphadata row: HP:0001014 “Angiokeratoma”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 5. Hypomelanotic macules (`hypomelanotic_macule`)

- Section: Skin and sweating
- HPO: HP:0009719; EADV input: `phen_hypomelanotic_macule`.
- Question: Have hypomelanotic macules been identified?
- Help: Records identified patches of skin with reduced pigmentation; no lesion count is applied.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.1.0, input declaration line 20.
- Orphadata row: HP:0009719 “Hypomelanotic macule”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 6. Reduced sweating (`hypohidrosis`)

- Section: Skin and sweating
- HPO: HP:0000966; EADV input: `phen_hypohidrosis`.
- Question: Does the patient report reduced sweating?
- Help: Records a history of sweating less than expected.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.1.0, input declaration line 50.
- Orphadata row: HP:0000966 “Hypohidrosis”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 7. Shagreen patch (`shagreen_patch`)

- Section: Skin and sweating
- HPO: HP:0009721; EADV input: `phen_shagreen_patch`.
- Question: Has a shagreen patch been identified?
- Help: Records whether this skin finding has been identified.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.1.0, input declaration line 50.
- Orphadata row: HP:0009721 “Shagreen patch”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 8. Cornea verticillata (`cornea_verticillata`)

- Section: Eyes
- HPO: HP:0500008; EADV input: `phen_cornea_verticillata`.
- Question: Has cornea verticillata been documented on eye examination?
- Help: Records a documented corneal finding; it does not ask the patient to identify it.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.1.0, input declaration line 65.
- Orphadata row: HP:0500008 “Cornea verticillata”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 9. Acroparaesthesia (`acroparesthesia`)

- Section: Neurological history
- HPO: HP:0031006; EADV input: `phen_acroparesthesia`.
- Question: Has the patient experienced episodes of burning or tingling pain in the hands or feet?
- Help: Episodes of pain or abnormal sensation in the extremities.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.1.0, input declaration line 20.
- Orphadata row: HP:0031006 “Acroparesthesia”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 10. Seizures (`seizure`)

- Section: Neurological history
- HPO: HP:0001250; EADV input: `phen_seizure`.
- Question: Is there a history of seizures?
- Help: Records a history of seizures without implying when they occurred.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.1.0, input declaration line 80.
- Orphadata row: HP:0001250 “Seizure”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

## Shared review decisions

- Assessment limitations shown in Atlas: These ten candidate features do not form a complete inherited kidney disease screening instrument or diagnostic criteria. A finding does not establish a disease, and an absent finding does not exclude it.
- Disease association context shown in Atlas: This is background context; an answer here does not establish or exclude a diagnosis.
- Answer semantics: present and absent are explicit findings; unknown / not assessed is explicit; unanswered remains distinct and optional.
- FHIR mapping: present/absent become boolean Observations; unknown has dataAbsentReason; unanswered produces no Observation. Check displayed wording against these states.
- Disease context: an association is background information and cannot establish or exclude disease.
- Scope: ten candidate features across two disease ruleblocks. This is not a complete inherited kidney disease screen or diagnostic criteria. It does not rank diseases or use Orphadata frequency categories as weights.
- Reviewer checks: confirm source attribution, release/version, terminology meaning, wording, limitations, and whether any feature needs added clinical context.

