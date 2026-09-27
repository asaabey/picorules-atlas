# IKD candidate content for clinical review

> Review packet only. No clinical approval or diagnostic performance is implied.
> These ruleblocks calculate research phenotype matching scores using declared positive-finding weights. This is not a diagnostic criterion, probability, or clinical recommendation.

Collection: Inherited kidney disease (ikd), version 0.8.0-tubulopathies.
Content version: `e1fb404ac6ba9dec`.

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
- **genereviews_nphp:** [GeneReviews: Nephronophthisis-Related Ciliopathies](https://www.ncbi.nlm.nih.gov/books/NBK368475/). Updated 2023-03-02. Accessed 2026-09-27.
- **genereviews_joubert:** [GeneReviews: Joubert Syndrome](https://www.ncbi.nlm.nih.gov/books/NBK1325/). Release unspecified. Accessed 2026-09-27.
- **orphanet_mainzer:** [Orphanet: Saldino-Mainzer syndrome](https://www.orpha.net/en/disease/detail/140969). Release unspecified. Accessed 2026-09-27.
- **erknet_gitelman:** [ERKNet: Gitelman-like tubulopathies](https://www.erknet.org/fileadmin/files/user_upload/220628_Nijenhuis_ERKNet_Webinar_Gitelman_final.pdf). Release unspecified. Accessed 2026-09-27.
- **erknet_bartter:** [ERKNet: Bartter syndrome consensus recommendations](https://www.erknet.org/fileadmin/files/user_upload/Bartter_syndrome_consensus_paper__extended_version_.pdf). Release unspecified. Accessed 2026-09-27.
- **east_kcnj10:** [Bockenhauer et al: Epilepsy, ataxia, sensorineural deafness, tubulopathy, and KCNJ10 mutations](https://www.nejm.org/doi/abs/10.1056/nejmoa0810276). Release unspecified. Accessed 2026-09-27.
- **erknet_hnf1b:** [ERKNet: HNF1B nephropathy](https://www.erknet.org/patients/da/your-kidney-disease/hnf1b-nephropathy/disease-information). Release unspecified. Accessed 2026-09-27.
- **genereviews_drta:** [GeneReviews: Hereditary Distal Renal Tubular Acidosis](https://www.ncbi.nlm.nih.gov/sites/books/NBK547595/). Release unspecified. Accessed 2026-09-27.
- **genereviews_dent:** [GeneReviews: Dent Disease](https://www.ncbi.nlm.nih.gov/sites/books/NBK99494/). Release unspecified. Accessed 2026-09-27.
- **genereviews_cystinosis:** [GeneReviews: Cystinosis](https://www.ncbi.nlm.nih.gov/books/NBK1400/). Release unspecified. Accessed 2026-09-27.
- **genereviews_lowe:** [GeneReviews: Lowe Syndrome](https://www.ncbi.nlm.nih.gov/books/NBK1480/). Release unspecified. Accessed 2026-09-27.
- **fhhnc_cohort:** [Claudin-19 mutations and clinical phenotype in Spanish patients with familial hypomagnesemia with hypercalciuria and nephrocalcinosis](https://pubmed.ncbi.nlm.nih.gov/23301036/). Release unspecified. Accessed 2026-09-27.
- **hhrh_original:** [Tieder et al: Hereditary hypophosphatemic rickets with hypercalciuria](https://pubmed.ncbi.nlm.nih.gov/2983203/). Release unspecified. Accessed 2026-09-27.
- **genereviews_xlh:** [GeneReviews: X-Linked Hypophosphatemia](https://www.ncbi.nlm.nih.gov/books/NBK83985/). Release unspecified. Accessed 2026-09-27.
- **medline_liddle:** [MedlinePlus Genetics: Liddle syndrome](https://medlineplus.gov/genetics/condition/liddle-syndrome/). Release unspecified. Accessed 2026-09-27.
- **genereviews_gordon:** [GeneReviews: Pseudohypoaldosteronism Type II](https://www.ncbi.nlm.nih.gov/books/NBK65707/?report=reader). Release unspecified. Accessed 2026-09-27.
- **medline_pha1:** [MedlinePlus Genetics: Pseudohypoaldosteronism type 1](https://medlineplus.gov/genetics/condition/pseudohypoaldosteronism-type-1/). Release unspecified. Accessed 2026-09-27.
- **genereviews_ndi:** [GeneReviews: Hereditary Nephrogenic Diabetes Insipidus](https://www.ncbi.nlm.nih.gov/books/NBK1177/?report=printable). Release unspecified. Accessed 2026-09-27.
- **hpo_terms_2026_09:** [Human Phenotype Ontology: September 2026 terminology](https://github.com/obophenotype/human-phenotype-ontology/releases/tag/v2026-09-01). hp/releases/2026-09-01. Accessed 2026-09-27.
- Orphadata source XML: [download](https://www.orphadata.com/data/xml/en_product4.xml); SHA-256 `4f44e8a61201399911aa1ba44a293c0ccaa5ce11272c47d40862255cb72f6b32`; CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). The 35 original rows in `orphadata-evidence.json` and three broad nephronophthisis rows in `ciliopathy-evidence.json` came from the local source audit.

- HPOA ADTKD evidence: release 2026-09-02, SHA-256 e89aa39c8f97bf5a52c5d160f9250a603681d630ade8ec2679d84ac5aece1f72. See adtkd-evidence.json for original annotation references and evidence codes.
- Six added profiles: ciliopathy-evidence.json separates exact HPOA and Orphadata annotations from supplemental GeneReviews and Orphanet descriptions. The present-feature count is Atlas-authored and has no clinical calibration.
- Tubulopathy extension: tubulopathy-evidence.json records 14 new profiles and three added HNF1B associations, terminology verification, reused features and broad-code limitations. All use the present-feature count model; HNF1B no longer uses its historical candidate weights.
- Family-history patterns: GeneReviews inheritance and pedigree descriptions are mapped in inheritance-evidence.json. These are contextual observations, not HPO phenotype annotations or LIRICAL-weighted findings.
## Candidate features

### 1. Documented family history suggesting autosomal dominant inheritance (`family_history_autosomal_dominant`)

- Section: Family history
- HPO: HP:0000006; EADV input: `phen_family_history_autosomal_dominant`.
- Question: Does the documented family history show a similar condition in successive generations?
- Help: A pattern in a parent and child or across successive generations may suggest dominant inheritance. A negative or unclear family history does not exclude disease.
- Feature source IDs: genereviews_tsc, genereviews_alport, genereviews_hnf1b, genereviews_vhl, genereviews_adtkd_umod, genereviews_adtkd_muc1, genereviews_drta, medline_liddle, genereviews_gordon, medline_pha1, genereviews_ndi.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 182.
- Source row (genereviews_tsc): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 165.
- Source row (genereviews_alport): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 171.
- Source row (genereviews_hnf1b): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 179.
- Source row (genereviews_vhl): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 177.
- Source row (genereviews_adtkd_umod): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 151.
- Source row (genereviews_adtkd_muc1): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 224.
- Source row (genereviews_drta): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_drta.
- Association: Liddle syndrome (ORPHA:526); rule `ikd_liddle` v0.8.0-tubulopathies, input declaration line 138.
- Source row (medline_liddle): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: medline_liddle.
- Association: Gordon syndrome / pseudohypoaldosteronism type II (ORPHA:757); rule `ikd_gordon` v0.8.0-tubulopathies, input declaration line 141.
- Source row (genereviews_gordon): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_gordon.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 183.
- Source row (medline_pha1): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: medline_pha1.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 162.
- Source row (genereviews_ndi): HP:0000006 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_ndi.

### 2. Documented family history suggesting autosomal recessive inheritance (`family_history_autosomal_recessive`)

- Section: Family history
- HPO: HP:0000007; EADV input: `phen_family_history_autosomal_recessive`.
- Question: Does the documented family history show affected siblings with unaffected parents?
- Help: Affected siblings with unaffected parents may suggest recessive inheritance. An isolated case or no affected siblings does not exclude it.
- Feature source IDs: genereviews_alport, genereviews_arpkd, genereviews_nphp, genereviews_joubert, orphanet_mainzer, erknet_gitelman, erknet_bartter, east_kcnj10, genereviews_drta, genereviews_cystinosis, fhhnc_cohort, hhrh_original, genereviews_gordon, medline_pha1, genereviews_ndi.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 181.
- Source row (genereviews_alport): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 159.
- Source row (genereviews_arpkd): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: Nephronophthisis, unspecified (ORPHA:655); rule `ikd_nephronophthisis` v0.7.0-ciliopathies, input declaration line 161.
- Source row (genereviews_nphp): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06, genereviews_nphp.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 227.
- Source row (genereviews_nphp): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 207.
- Source row (genereviews_nphp): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 12 (OMIM:613820); rule `ikd_nphp12` v0.7.0-ciliopathies, input declaration line 115.
- Source row (genereviews_nphp): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Joubert syndrome (ORPHA:140874); rule `ikd_joubert` v0.7.0-ciliopathies, input declaration line 174.
- Source row (genereviews_joubert): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_joubert.
- Association: Mainzer–Saldino syndrome (ORPHA:140969); rule `ikd_mainzer_saldino` v0.7.0-ciliopathies, input declaration line 154.
- Source row (orphanet_mainzer): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphanet_mainzer.
- Association: Gitelman syndrome (ORPHA:358); rule `ikd_gitelman` v0.8.0-tubulopathies, input declaration line 160.
- Source row (erknet_gitelman): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: erknet_gitelman.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 264.
- Source row (erknet_bartter): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: erknet_bartter.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 198.
- Source row (east_kcnj10): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: east_kcnj10.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 242.
- Source row (genereviews_drta): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_drta.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 324.
- Source row (genereviews_cystinosis): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_cystinosis.
- Association: Familial hypomagnesaemia with hypercalciuria and nephrocalcinosis (ORPHA:306516); rule `ikd_fhhnc` v0.8.0-tubulopathies, input declaration line 159.
- Source row (fhhnc_cohort): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: fhhnc_cohort.
- Association: Hereditary hypophosphataemic rickets with hypercalciuria (ORPHA:157215); rule `ikd_hhrh` v0.8.0-tubulopathies, input declaration line 159.
- Source row (hhrh_original): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: hhrh_original.
- Association: Gordon syndrome / pseudohypoaldosteronism type II (ORPHA:757); rule `ikd_gordon` v0.8.0-tubulopathies, input declaration line 159.
- Source row (genereviews_gordon): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_gordon.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 201.
- Source row (medline_pha1): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: medline_pha1.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 180.
- Source row (genereviews_ndi): HP:0000007 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_ndi.

### 3. Documented family history suggesting X-linked inheritance (`family_history_x_linked`)

- Section: Family history
- HPO: HP:0001417; EADV input: `phen_family_history_x_linked`.
- Question: Does transmission among affected relatives in the documented family history suggest an X-linked pattern?
- Help: Affected relatives through the maternal line or affected daughters of an affected father may suggest X-linked inheritance. There is no father-to-son transmission. Females can also be affected, and an unclear pedigree does not exclude it.
- Feature source IDs: genereviews_fabry, genereviews_alport, erknet_bartter, genereviews_dent, genereviews_lowe, genereviews_xlh, genereviews_ndi.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 149.
- Source row (genereviews_fabry): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 197.
- Source row (genereviews_alport): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: orphadata_2026_06.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 282.
- Source row (erknet_bartter): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: erknet_bartter.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 201.
- Source row (genereviews_dent): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_dent.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 262.
- Source row (genereviews_lowe): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_lowe.
- Association: X-linked hypophosphataemia (ORPHA:89936); rule `ikd_xlh` v0.8.0-tubulopathies, input declaration line 159.
- Source row (genereviews_xlh): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_xlh.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 198.
- Source row (genereviews_ndi): HP:0001417 inheritance-mode term; family-history pattern recorded for context with zero score weight. Source checked 2026-09-27.
- Disease source IDs: genereviews_ndi.

### 4. Anaemia (`anemia`)

- Section: Kidney
- HPO: HP:0001903; EADV input: `phen_anemia`.
- Question: Has anaemia been documented?
- Help: Records anaemia without assuming that kidney disease caused it.
- Feature source IDs: orphadata_2026_06, hpoa_2026_09.
- Association: Nephronophthisis, unspecified (ORPHA:655); rule `ikd_nephronophthisis` v0.7.0-ciliopathies, input declaration line 70.
- Source row (orphadata_2026_06): HP:0001903 “Anemia”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, genereviews_nphp.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 96.
- Source row (hpoa_2026_09): HP:0001903 “Anaemia”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 93.
- Source row (hpoa_2026_09): HP:0001903 “Anaemia”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.

### 5. Calcium kidney stones (`calcium_nephrolithiasis`)

- Section: Kidney
- HPO: HP:0004724; EADV input: `phen_calcium_nephrolithiasis`.
- Question: Have calcium-containing kidney stones been documented?
- Help: Requires documented calcium stone composition or a specific clinical diagnosis; unspecified stones are insufficient.
- Feature source IDs: genereviews_drta, hpo_terms_2026_09, genereviews_dent.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 154.
- Source row (genereviews_drta): HP:0004724 “Calcium kidney stones”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 112.
- Source row (genereviews_dent): HP:0004724 “Calcium kidney stones”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_dent.

### 6. Decreased glomerular filtration rate (`decreased_glomerular_filtration_rate`)

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

### 7. Dehydration (`dehydration`)

- Section: Kidney
- HPO: HP:0001944; EADV input: `phen_dehydration`.
- Question: Has dehydration been documented?
- Help: Records a clinical finding without inferring renal salt or water loss.
- Feature source IDs: genereviews_cystinosis, hpo_terms_2026_09, medline_pha1, genereviews_ndi.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 218.
- Source row (genereviews_cystinosis): HP:0001944 “Dehydration”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 148.
- Source row (medline_pha1): HP:0001944 “Dehydration”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_pha1.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 127.
- Source row (genereviews_ndi): HP:0001944 “Dehydration”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_ndi.

### 8. Enlarged kidney (`enlarged_kidney`)

- Section: Kidney
- HPO: HP:0000105; EADV input: `phen_enlarged_kidney`.
- Question: Has kidney enlargement been documented on imaging?
- Help: Records documented kidney enlargement without applying a size threshold.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 57.
- Source row (orphadata_2026_06): HP:0000105 “Enlarged kidney”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 9. Glomerular basement membrane lamellation (`glomerular_basement_membrane_lamellation`)

- Section: Kidney
- HPO: HP:0030034; EADV input: `phen_glomerular_basement_membrane_lamellation`.
- Question: Has glomerular basement membrane lamellation been documented in a kidney biopsy report?
- Help: Requires the named biopsy finding. an unspecified abnormal biopsy is insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 148.
- Source row (orphadata_2026_06): HP:0030034 “Glomerular basement membrane lamellation”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 10. Horseshoe kidney (`horseshoe_kidney`)

- Section: Kidney
- HPO: HP:0000085; EADV input: `phen_horseshoe_kidney`.
- Question: Has a horseshoe kidney been documented on imaging?
- Help: Records the named structural kidney finding.
- Image metadata: radiology, Axial CT. No reference image selected: this finding does not need a visual recognition aid in Atlas. Reference asset status: not_selected.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 79.
- Source row (orphadata_2026_06): HP:0000085 “Horseshoe kidney”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.

### 11. Hyperechogenic kidneys (`hyperechogenic_kidneys`)

- Section: Kidney
- HPO: HP:0004719; EADV input: `phen_hyperechogenic_kidneys`.
- Question: Have hyperechogenic kidneys been documented on ultrasound?
- Help: Records increased renal echogenicity in the ultrasound report. This is nonspecific and does not establish a genetic diagnosis.
- Image metadata: radiology, Renal ultrasound. No reference image selected: this finding does not need a visual recognition aid in Atlas. Reference asset status: not_selected.
- Feature source IDs: hpoa_2026_09.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 153.
- Source row (hpoa_2026_09): HP:0004719 “Hyperechogenic kidneys”, source date 2026-09-02; frequency category “4/23” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.

### 12. Microscopic haematuria (`microscopic_hematuria`)

- Section: Kidney
- HPO: HP:0002907; EADV input: `phen_microscopic_hematuria`.
- Question: Has microscopic haematuria been documented on urine testing?
- Help: Specifically documented microscopic haematuria.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 63.
- Source row (orphadata_2026_06): HP:0002907 “Microscopic hematuria”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 13. Multicystic kidney dysplasia (`multicystic_kidney_dysplasia`)

- Section: Kidney
- HPO: HP:0000003; EADV input: `phen_multicystic_kidney_dysplasia`.
- Question: Has multicystic kidney dysplasia been documented?
- Help: Records explicitly documented dysplasia. renal cysts alone do not establish this finding.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 120.
- Source row (orphadata_2026_06): HP:0000003 “Multicystic kidney dysplasia”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.

### 14. Multiple renal cysts (`multiple_renal_cysts`)

- Section: Kidney
- HPO: HP:0005562; EADV input: `phen_multiple_renal_cysts`.
- Question: Have multiple renal cysts been documented on imaging?
- Help: Multiple renal cysts explicitly documented in an imaging report.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 77.
- Source row (orphadata_2026_06): HP:0005562 “Multiple renal cysts”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 15. Nephrocalcinosis (`nephrocalcinosis`)

- Section: Kidney
- HPO: HP:0000121; EADV input: `phen_nephrocalcinosis`.
- Question: Has nephrocalcinosis been documented on imaging?
- Help: Records calcium deposition in kidney tissue; a discrete kidney stone alone is not equivalent.
- Feature source IDs: erknet_bartter, hpo_terms_2026_09, genereviews_drta, genereviews_dent, fhhnc_cohort.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 142.
- Source row (erknet_bartter): HP:0000121 “Nephrocalcinosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 136.
- Source row (genereviews_drta): HP:0000121 “Nephrocalcinosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 94.
- Source row (genereviews_dent): HP:0000121 “Nephrocalcinosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_dent.
- Association: Familial hypomagnesaemia with hypercalciuria and nephrocalcinosis (ORPHA:306516); rule `ikd_fhhnc` v0.8.0-tubulopathies, input declaration line 106.
- Source row (fhhnc_cohort): HP:0000121 “Nephrocalcinosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: fhhnc_cohort.

### 16. Polycystic kidney dysplasia (`polycystic_kidney_dysplasia`)

- Section: Kidney
- HPO: HP:0000113; EADV input: `phen_polycystic_kidney_dysplasia`.
- Question: Has polycystic kidney dysplasia been documented?
- Help: Requires the named structural finding. multiple renal cysts alone are insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 74.
- Source row (orphadata_2026_06): HP:0000113 “Polycystic kidney dysplasia”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 17. Polydipsia (`polydipsia`)

- Section: Kidney
- HPO: HP:0001959; EADV input: `phen_polydipsia`.
- Question: Has persistent excessive thirst been documented?
- Help: Records excessive thirst without assuming a kidney cause.
- Feature source IDs: genereviews_nphp, hpoa_2026_09, erknet_bartter, genereviews_cystinosis, genereviews_ndi.
- Association: Nephronophthisis, unspecified (ORPHA:655); rule `ikd_nephronophthisis` v0.7.0-ciliopathies, input declaration line 121.
- Source row (genereviews_nphp): HP:0001959 “Polydipsia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, genereviews_nphp.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 79.
- Source row (hpoa_2026_09): HP:0001959 “Polydipsia”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 76.
- Source row (hpoa_2026_09): HP:0001959 “Polydipsia”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 12 (OMIM:613820); rule `ikd_nphp12` v0.7.0-ciliopathies, input declaration line 64.
- Source row (genereviews_nphp): HP:0001959 “Polydipsia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 177.
- Source row (erknet_bartter): HP:0001959 “Polydipsia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 201.
- Source row (genereviews_cystinosis): HP:0001959 “Polydipsia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 75.
- Source row (genereviews_ndi): HP:0001959 “Polydipsia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_ndi.

### 18. Polyuria (`polyuria`)

- Section: Kidney
- HPO: HP:0000103; EADV input: `phen_polyuria`.
- Question: Has persistent excessive urine output been documented?
- Help: Records the history or measured finding without setting a volume threshold.
- Feature source IDs: genereviews_nphp, hpoa_2026_09, erknet_bartter, genereviews_cystinosis, genereviews_ndi.
- Association: Nephronophthisis, unspecified (ORPHA:655); rule `ikd_nephronophthisis` v0.7.0-ciliopathies, input declaration line 104.
- Source row (genereviews_nphp): HP:0000103 “Polyuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, genereviews_nphp.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 62.
- Source row (hpoa_2026_09): HP:0000103 “Polyuria”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 59.
- Source row (hpoa_2026_09): HP:0000103 “Polyuria”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 12 (OMIM:613820); rule `ikd_nphp12` v0.7.0-ciliopathies, input declaration line 47.
- Source row (genereviews_nphp): HP:0000103 “Polyuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 160.
- Source row (erknet_bartter): HP:0000103 “Polyuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 184.
- Source row (genereviews_cystinosis): HP:0000103 “Polyuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 58.
- Source row (genereviews_ndi): HP:0000103 “Polyuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_ndi.

### 19. Proteinuria (`proteinuria`)

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

### 20. Reduced kidney function (`renal_insufficiency`)

- Section: Kidney
- HPO: HP:0000083; EADV input: `phen_renal_insufficiency`.
- Question: Has reduced kidney function been documented?
- Help: Records an existing finding without assigning a cause or a new laboratory threshold.
- Feature source IDs: orphadata_2026_06, orphanet_mainzer, genereviews_dent, genereviews_cystinosis, genereviews_lowe, fhhnc_cohort.
- Association: Nephronophthisis, unspecified (ORPHA:655); rule `ikd_nephronophthisis` v0.7.0-ciliopathies, input declaration line 53.
- Source row (orphadata_2026_06): HP:0000083 “Renal insufficiency”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, genereviews_nphp.
- Association: Mainzer–Saldino syndrome (ORPHA:140969); rule `ikd_mainzer_saldino` v0.7.0-ciliopathies, input declaration line 52.
- Source row (orphanet_mainzer): HP:0000083 “Reduced kidney function”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphanet_mainzer.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 166.
- Source row (genereviews_dent): HP:0000083 “Reduced kidney function”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_dent.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 307.
- Source row (genereviews_cystinosis): HP:0000083 “Reduced kidney function”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 245.
- Source row (genereviews_lowe): HP:0000083 “Reduced kidney function”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.
- Association: Familial hypomagnesaemia with hypercalciuria and nephrocalcinosis (ORPHA:306516); rule `ikd_fhhnc` v0.8.0-tubulopathies, input declaration line 124.
- Source row (fhhnc_cohort): HP:0000083 “Reduced kidney function”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: fhhnc_cohort.

### 21. Reduced urine-concentrating ability (`hyposthenuria`)

- Section: Kidney
- HPO: HP:0003158; EADV input: `phen_hyposthenuria`.
- Question: Has reduced urine-concentrating ability been documented?
- Help: Use a documented concentrating defect; polyuria alone does not establish it.
- Feature source IDs: hpoa_2026_09, genereviews_ndi.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 130.
- Source row (hpoa_2026_09): HP:0003158 “Reduced urine-concentrating ability”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 92.
- Source row (genereviews_ndi): HP:0003158 “Reduced urine-concentrating ability”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_ndi.

### 22. Renal agenesis (`renal_agenesis`)

- Section: Kidney
- HPO: HP:0000104; EADV input: `phen_renal_agenesis`.
- Question: Has renal agenesis been documented?
- Help: Records congenital absence of a kidney. an acquired solitary kidney is not equivalent.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 154.
- Source row (orphadata_2026_06): HP:0000104 “Renal agenesis”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.

### 23. Renal angiomyolipoma (`renal_angiomyolipoma`)

- Section: Kidney
- HPO: HP:0006772; EADV input: `phen_renal_angiomyolipoma`.
- Question: Has a renal angiomyolipoma been documented on imaging?
- Help: Records a documented kidney lesion, without applying a size or number threshold.
- Reference image: [Example renal angiomyolipoma on CT before (left) and after (right) contrast. This image is an example, not a diagnostic template.](/reference-images/renal-angiomyolipoma-ct.jpg); Greco et al., Journal of Renal and Hepatic Disorders (2018); [source](https://commons.wikimedia.org/wiki/File:CT_of_angiomyolipoma,_before_and_after_radiocontrast.jpg); [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); SHA-256 `31157f4f281d178b47b1bb06c613bf2054cbc52c62b99d0642dcae82cb6c0cb6`.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 140.
- Source row (orphadata_2026_06): HP:0006772 “Renal angiomyolipoma”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 24. Renal cell carcinoma (`renal_cell_carcinoma`)

- Section: Kidney
- HPO: HP:0005584; EADV input: `phen_renal_cell_carcinoma`.
- Question: Has renal cell carcinoma been documented?
- Help: A documented renal cell carcinoma diagnosis.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 60.
- Source row (orphadata_2026_06): HP:0005584 “Renal cell carcinoma”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 25. Renal corticomedullary cysts (`renal_corticomedullary_cysts`)

- Section: Kidney
- HPO: HP:0000108; EADV input: `phen_renal_corticomedullary_cysts`.
- Question: Have renal corticomedullary cysts been documented on imaging?
- Help: Requires documented corticomedullary location. Simple cysts elsewhere are not equivalent. Cysts may be absent in ADTKD.
- Image metadata: radiology, CT and T2-weighted MRI. No reference image selected: this finding does not need a visual recognition aid in Atlas. Reference asset status: not_selected.
- Feature source IDs: hpoa_2026_09, genereviews_nphp.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 130.
- Source row (hpoa_2026_09): HP:0000108 “Renal corticomedullary cysts”, source date 2026-09-02; frequency category “2/3” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 127.
- Source row (hpoa_2026_09): HP:0000108 “Renal corticomedullary cysts”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.
- Association: Nephronophthisis, unspecified (ORPHA:655); rule `ikd_nephronophthisis` v0.7.0-ciliopathies, input declaration line 138.
- Source row (genereviews_nphp): HP:0000108 “Renal corticomedullary cysts”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, genereviews_nphp.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 147.
- Source row (hpoa_2026_09): HP:0000108 “Renal corticomedullary cysts”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 127.
- Source row (hpoa_2026_09): HP:0000108 “Renal corticomedullary cysts”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.

### 26. Renal cysts (`renal_cysts`)

- Section: Kidney
- HPO: HP:0000107; EADV input: `phen_renal_cysts`.
- Question: Have renal cysts been documented on imaging?
- Help: Records cysts without inferring their location or type.
- Feature source IDs: erknet_hnf1b, genereviews_joubert.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 230.
- Source row (erknet_hnf1b): HP:0000107 “Renal cysts”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.
- Association: Joubert syndrome (ORPHA:140874); rule `ikd_joubert` v0.7.0-ciliopathies, input declaration line 157.
- Source row (genereviews_joubert): HP:0000107 “Renal cysts”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_joubert.

### 27. Renal tubular atrophy (`renal_tubular_atrophy`)

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
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 170.
- Source row (hpoa_2026_09): HP:0000092 “Renal tubular atrophy”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 150.
- Source row (hpoa_2026_09): HP:0000092 “Renal tubular atrophy”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.

### 28. Stage 5 chronic kidney disease (`stage_5_ckd`)

- Section: Kidney
- HPO: HP:0003774; EADV input: `phen_stage_5_ckd`.
- Question: Has stage 5 chronic kidney disease been documented?
- Help: Records an existing advanced kidney disease stage, not a recommendation to investigate.
- Feature source IDs: hpoa_2026_09.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 193.
- Source row (hpoa_2026_09): HP:0003774 “Stage 5 chronic kidney disease”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 173.
- Source row (hpoa_2026_09): HP:0003774 “Stage 5 chronic kidney disease”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 12 (OMIM:613820); rule `ikd_nphp12` v0.7.0-ciliopathies, input declaration line 81.
- Source row (hpoa_2026_09): HP:0003774 “Stage 5 chronic kidney disease”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.

### 29. Alkaline urine (`alkaline_urine`)

- Section: Electrolytes and tubular function
- HPO: HP:0032944; EADV input: `phen_alkaline_urine`.
- Question: Has alkaline urine been documented?
- Help: Records urine pH only. Interpretation for distal RTA requires contemporaneous systemic acidosis and consideration of infection and treatment; this checkbox alone does not establish an acidification defect.
- Feature source IDs: genereviews_drta, hpo_terms_2026_09.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 100.
- Source row (genereviews_drta): HP:0032944 “Alkaline urine”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.

### 30. Elevated calcitriol (`elevated_calcitriol`)

- Section: Electrolytes and tubular function
- HPO: HP:0031415; EADV input: `phen_elevated_calcitriol`.
- Question: Has elevated blood 1,25-dihydroxyvitamin D (calcitriol) been documented?
- Help: This is the active vitamin D metabolite, not the routine 25-hydroxyvitamin D measurement. Consider supplementation when interpreting it.
- Feature source IDs: hhrh_original, hpo_terms_2026_09.
- Association: Hereditary hypophosphataemic rickets with hypercalciuria (ORPHA:157215); rule `ikd_hhrh` v0.8.0-tubulopathies, input declaration line 106.
- Source row (hhrh_original): HP:0031415 “Elevated calcitriol”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hhrh_original.

### 31. Generalised aminoaciduria (`generalized_aminoaciduria`)

- Section: Electrolytes and tubular function
- HPO: HP:0002909; EADV input: `phen_generalized_aminoaciduria`.
- Question: Has generalised aminoaciduria been documented?
- Help: Requires increased urinary loss of multiple amino acids; an isolated amino acid abnormality is insufficient.
- Feature source IDs: genereviews_cystinosis, hpo_terms_2026_09, genereviews_lowe.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 94.
- Source row (genereviews_cystinosis): HP:0002909 “Generalised aminoaciduria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 85.
- Source row (genereviews_lowe): HP:0002909 “Generalised aminoaciduria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.

### 32. Glycosuria (`glycosuria`)

- Section: Electrolytes and tubular function
- HPO: HP:0003076; EADV input: `phen_glycosuria`.
- Question: Has glucose in the urine been documented?
- Help: Record the urine finding. Proximal tubular interpretation requires blood glucose and medication context; this finding alone does not establish Fanconi syndrome.
- Feature source IDs: genereviews_cystinosis, hpo_terms_2026_09.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 76.
- Source row (genereviews_cystinosis): HP:0003076 “Glycosuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.

### 33. High circulating aldosterone (`increased_aldosterone`)

- Section: Electrolytes and tubular function
- HPO: HP:0000859; EADV input: `phen_increased_aldosterone`.
- Question: Has elevated circulating aldosterone been documented?
- Help: Records a measured hormonal finding; it does not establish primary aldosteronism.
- Feature source IDs: medline_pha1, hpo_terms_2026_09.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 130.
- Source row (medline_pha1): HP:0000859 “High circulating aldosterone”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_pha1.

### 34. High urinary calcium (`hypercalciuria`)

- Section: Electrolytes and tubular function
- HPO: HP:0002150; EADV input: `phen_hypercalciuria`.
- Question: Has high urinary calcium excretion been documented?
- Help: Use urine measurements interpreted for age, collection method and treatment; this is not high blood calcium.
- Feature source IDs: erknet_bartter, hpo_terms_2026_09, genereviews_drta, genereviews_dent, genereviews_lowe, fhhnc_cohort, hhrh_original, genereviews_gordon.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 124.
- Source row (erknet_bartter): HP:0002150 “High urinary calcium”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 118.
- Source row (genereviews_drta): HP:0002150 “High urinary calcium”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 76.
- Source row (genereviews_dent): HP:0002150 “High urinary calcium”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_dent.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 157.
- Source row (genereviews_lowe): HP:0002150 “High urinary calcium”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.
- Association: Familial hypomagnesaemia with hypercalciuria and nephrocalcinosis (ORPHA:306516); rule `ikd_fhhnc` v0.8.0-tubulopathies, input declaration line 88.
- Source row (fhhnc_cohort): HP:0002150 “High urinary calcium”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: fhhnc_cohort.
- Association: Hereditary hypophosphataemic rickets with hypercalciuria (ORPHA:157215); rule `ikd_hhrh` v0.8.0-tubulopathies, input declaration line 88.
- Source row (hhrh_original): HP:0002150 “High urinary calcium”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hhrh_original.
- Association: Gordon syndrome / pseudohypoaldosteronism type II (ORPHA:757); rule `ikd_gordon` v0.8.0-tubulopathies, input declaration line 123.
- Source row (genereviews_gordon): HP:0002150 “High urinary calcium”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_gordon.

### 35. Hyperchloraemic metabolic acidosis (`hyperchloremic_metabolic_acidosis`)

- Section: Electrolytes and tubular function
- HPO: HP:0004918; EADV input: `phen_hyperchloremic_metabolic_acidosis`.
- Question: Has hyperchloraemic metabolic acidosis been documented?
- Help: Requires the specific acid–base pattern, rather than low bicarbonate or high chloride alone.
- Feature source IDs: genereviews_drta, hpo_terms_2026_09, genereviews_gordon.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 64.
- Source row (genereviews_drta): HP:0004918 “Hyperchloraemic metabolic acidosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.
- Association: Gordon syndrome / pseudohypoaldosteronism type II (ORPHA:757); rule `ikd_gordon` v0.8.0-tubulopathies, input declaration line 70.
- Source row (genereviews_gordon): HP:0004918 “Hyperchloraemic metabolic acidosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_gordon.

### 36. Hyperkalaemia (`hyperkalemia`)

- Section: Electrolytes and tubular function
- HPO: HP:0002153; EADV input: `phen_hyperkalemia`.
- Question: Has hyperkalaemia been documented on blood testing?
- Help: Use a documented laboratory finding interpreted for age and clinical context. A low or high blood concentration alone does not establish renal wasting or an inherited cause.
- Feature source IDs: genereviews_gordon, hpo_terms_2026_09, medline_pha1.
- Association: Gordon syndrome / pseudohypoaldosteronism type II (ORPHA:757); rule `ikd_gordon` v0.8.0-tubulopathies, input declaration line 52.
- Source row (genereviews_gordon): HP:0002153 “Hyperkalaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_gordon.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 94.
- Source row (medline_pha1): HP:0002153 “Hyperkalaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_pha1.

### 37. Hypernatraemia (`hypernatremia`)

- Section: Electrolytes and tubular function
- HPO: HP:0003228; EADV input: `phen_hypernatremia`.
- Question: Has hypernatraemia been documented on blood testing?
- Help: Use a documented laboratory finding interpreted for age and clinical context. A low or high blood concentration alone does not establish renal wasting or an inherited cause.
- Feature source IDs: genereviews_ndi, hpo_terms_2026_09.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 109.
- Source row (genereviews_ndi): HP:0003228 “Hypernatraemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_ndi.

### 38. Hypokalaemia (`hypokalemia`)

- Section: Electrolytes and tubular function
- HPO: HP:0002900; EADV input: `phen_hypokalemia`.
- Question: Has hypokalaemia been documented on blood testing?
- Help: Use a documented laboratory finding interpreted for age and clinical context. A low or high blood concentration alone does not establish renal wasting or an inherited cause.
- Feature source IDs: erknet_gitelman, hpo_terms_2026_09, erknet_bartter, east_kcnj10, genereviews_drta, medline_liddle.
- Association: Gitelman syndrome (ORPHA:358); rule `ikd_gitelman` v0.8.0-tubulopathies, input declaration line 52.
- Source row (erknet_gitelman): HP:0002900 “Hypokalaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_gitelman.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 70.
- Source row (erknet_bartter): HP:0002900 “Hypokalaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 58.
- Source row (east_kcnj10): HP:0002900 “Hypokalaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: east_kcnj10.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 82.
- Source row (genereviews_drta): HP:0002900 “Hypokalaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.
- Association: Liddle syndrome (ORPHA:526); rule `ikd_liddle` v0.8.0-tubulopathies, input declaration line 49.
- Source row (medline_liddle): HP:0002900 “Hypokalaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_liddle.

### 39. Hypomagnesaemia (`hypomagnesemia`)

- Section: Electrolytes and tubular function
- HPO: HP:0002917; EADV input: `phen_hypomagnesemia`.
- Question: Has hypomagnesaemia been documented on blood testing?
- Help: Use a documented laboratory finding interpreted for age and clinical context. A low or high blood concentration alone does not establish renal wasting or an inherited cause.
- Feature source IDs: erknet_hnf1b, hpo_terms_2026_09, erknet_gitelman, east_kcnj10, fhhnc_cohort.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 194.
- Source row (erknet_hnf1b): HP:0002917 “Hypomagnesaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.
- Association: Gitelman syndrome (ORPHA:358); rule `ikd_gitelman` v0.8.0-tubulopathies, input declaration line 88.
- Source row (erknet_gitelman): HP:0002917 “Hypomagnesaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_gitelman.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 94.
- Source row (east_kcnj10): HP:0002917 “Hypomagnesaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: east_kcnj10.
- Association: Familial hypomagnesaemia with hypercalciuria and nephrocalcinosis (ORPHA:306516); rule `ikd_fhhnc` v0.8.0-tubulopathies, input declaration line 52.
- Source row (fhhnc_cohort): HP:0002917 “Hypomagnesaemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: fhhnc_cohort.

### 40. Hyponatraemia (`hyponatremia`)

- Section: Electrolytes and tubular function
- HPO: HP:0002902; EADV input: `phen_hyponatremia`.
- Question: Has hyponatraemia been documented on blood testing?
- Help: Use a documented laboratory finding interpreted for age and clinical context. A low or high blood concentration alone does not establish renal wasting or an inherited cause.
- Feature source IDs: medline_pha1, hpo_terms_2026_09.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 76.
- Source row (medline_pha1): HP:0002902 “Hyponatraemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_pha1.

### 41. Hypophosphataemia (`hypophosphatemia`)

- Section: Electrolytes and tubular function
- HPO: HP:0002148; EADV input: `phen_hypophosphatemia`.
- Question: Has hypophosphataemia been documented on blood testing?
- Help: Use a documented laboratory finding interpreted for age and clinical context. A low or high blood concentration alone does not establish renal wasting or an inherited cause.
- Feature source IDs: genereviews_dent, hpo_terms_2026_09, genereviews_cystinosis, genereviews_lowe, hhrh_original, genereviews_xlh.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 148.
- Source row (genereviews_dent): HP:0002148 “Hypophosphataemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_dent.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 148.
- Source row (genereviews_cystinosis): HP:0002148 “Hypophosphataemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 139.
- Source row (genereviews_lowe): HP:0002148 “Hypophosphataemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.
- Association: Hereditary hypophosphataemic rickets with hypercalciuria (ORPHA:157215); rule `ikd_hhrh` v0.8.0-tubulopathies, input declaration line 70.
- Source row (hhrh_original): HP:0002148 “Hypophosphataemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hhrh_original.
- Association: X-linked hypophosphataemia (ORPHA:89936); rule `ikd_xlh` v0.8.0-tubulopathies, input declaration line 70.
- Source row (genereviews_xlh): HP:0002148 “Hypophosphataemia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_xlh.

### 42. Low circulating aldosterone (`decreased_aldosterone`)

- Section: Electrolytes and tubular function
- HPO: HP:0004319; EADV input: `phen_decreased_aldosterone`.
- Question: Has suppressed or low circulating aldosterone been documented?
- Help: Use the documented interpretation with potassium, medications and sampling conditions considered.
- Feature source IDs: medline_liddle, hpo_terms_2026_09.
- Association: Liddle syndrome (ORPHA:526); rule `ikd_liddle` v0.8.0-tubulopathies, input declaration line 120.
- Source row (medline_liddle): HP:0004319 “Low circulating aldosterone”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_liddle.

### 43. Low circulating renin (`decreased_renin`)

- Section: Electrolytes and tubular function
- HPO: HP:0003351; EADV input: `phen_decreased_renin`.
- Question: Has suppressed or low circulating renin been documented?
- Help: Use the documented interpretation with posture, salt intake and medications considered.
- Feature source IDs: medline_liddle, hpo_terms_2026_09, genereviews_gordon.
- Association: Liddle syndrome (ORPHA:526); rule `ikd_liddle` v0.8.0-tubulopathies, input declaration line 102.
- Source row (medline_liddle): HP:0003351 “Low circulating renin”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_liddle.
- Association: Gordon syndrome / pseudohypoaldosteronism type II (ORPHA:757); rule `ikd_gordon` v0.8.0-tubulopathies, input declaration line 105.
- Source row (genereviews_gordon): HP:0003351 “Low circulating renin”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_gordon.

### 44. Low urinary calcium (`hypocalciuria`)

- Section: Electrolytes and tubular function
- HPO: HP:0003127; EADV input: `phen_hypocalciuria`.
- Question: Has low urinary calcium excretion been documented?
- Help: Use urine measurements interpreted for age, collection method and treatment; this is not low blood calcium.
- Feature source IDs: erknet_gitelman, hpo_terms_2026_09.
- Association: Gitelman syndrome (ORPHA:358); rule `ikd_gitelman` v0.8.0-tubulopathies, input declaration line 106.
- Source row (erknet_gitelman): HP:0003127 “Low urinary calcium”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_gitelman.

### 45. Low-molecular-weight proteinuria (`low_molecular_weight_proteinuria`)

- Section: Electrolytes and tubular function
- HPO: HP:0003126; EADV input: `phen_low_molecular_weight_proteinuria`.
- Question: Has low-molecular-weight proteinuria been documented?
- Help: Requires a documented tubular protein measurement or assessment; a routine positive protein dipstick or albuminuria alone is insufficient.
- Feature source IDs: genereviews_dent, hpo_terms_2026_09, genereviews_cystinosis, genereviews_lowe.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 58.
- Source row (genereviews_dent): HP:0003126 “Low-molecular-weight proteinuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_dent.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 112.
- Source row (genereviews_cystinosis): HP:0003126 “Low-molecular-weight proteinuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 67.
- Source row (genereviews_lowe): HP:0003126 “Low-molecular-weight proteinuria”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.

### 46. Metabolic acidosis (`metabolic_acidosis`)

- Section: Electrolytes and tubular function
- HPO: HP:0001942; EADV input: `phen_metabolic_acidosis`.
- Question: Has metabolic acidosis been documented?
- Help: Use a documented acid–base assessment. This broad finding does not establish renal tubular acidosis.
- Feature source IDs: genereviews_cystinosis, hpo_terms_2026_09, genereviews_lowe, medline_pha1.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 166.
- Source row (genereviews_cystinosis): HP:0001942 “Metabolic acidosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 103.
- Source row (genereviews_lowe): HP:0001942 “Metabolic acidosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 112.
- Source row (medline_pha1): HP:0001942 “Metabolic acidosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_pha1.

### 47. Metabolic alkalosis (`metabolic_alkalosis`)

- Section: Electrolytes and tubular function
- HPO: HP:0200114; EADV input: `phen_metabolic_alkalosis`.
- Question: Has metabolic alkalosis been documented?
- Help: Use a documented acid–base assessment; an isolated bicarbonate result is not sufficient.
- Feature source IDs: erknet_gitelman, hpo_terms_2026_09, erknet_bartter, east_kcnj10, medline_liddle.
- Association: Gitelman syndrome (ORPHA:358); rule `ikd_gitelman` v0.8.0-tubulopathies, input declaration line 70.
- Source row (erknet_gitelman): HP:0200114 “Metabolic alkalosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_gitelman.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 88.
- Source row (erknet_bartter): HP:0200114 “Metabolic alkalosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 76.
- Source row (east_kcnj10): HP:0200114 “Metabolic alkalosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: east_kcnj10.
- Association: Liddle syndrome (ORPHA:526); rule `ikd_liddle` v0.8.0-tubulopathies, input declaration line 67.
- Source row (medline_liddle): HP:0200114 “Metabolic alkalosis”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_liddle.

### 48. Renal magnesium wasting (`renal_magnesium_wasting`)

- Section: Electrolytes and tubular function
- HPO: HP:0005567; EADV input: `phen_renal_magnesium_wasting`.
- Question: Has inappropriate renal magnesium loss been documented?
- Help: Requires a clinical assessment of urinary magnesium in relation to blood magnesium and kidney function; hypomagnesaemia alone is insufficient.
- Feature source IDs: erknet_hnf1b, hpo_terms_2026_09, fhhnc_cohort.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 212.
- Source row (erknet_hnf1b): HP:0005567 “Renal magnesium wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.
- Association: Familial hypomagnesaemia with hypercalciuria and nephrocalcinosis (ORPHA:306516); rule `ikd_fhhnc` v0.8.0-tubulopathies, input declaration line 70.
- Source row (fhhnc_cohort): HP:0005567 “Renal magnesium wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: fhhnc_cohort.

### 49. Renal phosphate wasting (`renal_phosphate_wasting`)

- Section: Electrolytes and tubular function
- HPO: HP:0000117; EADV input: `phen_renal_phosphate_wasting`.
- Question: Has inappropriate renal phosphate loss been documented?
- Help: Requires a documented renal phosphate-handling assessment; low blood phosphate alone is insufficient.
- Feature source IDs: genereviews_dent, hpo_terms_2026_09, genereviews_cystinosis, genereviews_lowe, hhrh_original, genereviews_xlh.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 130.
- Source row (genereviews_dent): HP:0000117 “Renal phosphate wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_dent.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 130.
- Source row (genereviews_cystinosis): HP:0000117 “Renal phosphate wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 121.
- Source row (genereviews_lowe): HP:0000117 “Renal phosphate wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.
- Association: Hereditary hypophosphataemic rickets with hypercalciuria (ORPHA:157215); rule `ikd_hhrh` v0.8.0-tubulopathies, input declaration line 52.
- Source row (hhrh_original): HP:0000117 “Renal phosphate wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hhrh_original.
- Association: X-linked hypophosphataemia (ORPHA:89936); rule `ikd_xlh` v0.8.0-tubulopathies, input declaration line 52.
- Source row (genereviews_xlh): HP:0000117 “Renal phosphate wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_xlh.

### 50. Renal salt wasting (`renal_salt_wasting`)

- Section: Electrolytes and tubular function
- HPO: HP:0000127; EADV input: `phen_renal_salt_wasting`.
- Question: Has renal salt wasting been documented?
- Help: Requires evidence of inappropriate renal salt loss; low blood sodium or dehydration alone is insufficient.
- Feature source IDs: erknet_gitelman, hpo_terms_2026_09, erknet_bartter, east_kcnj10, medline_pha1.
- Association: Gitelman syndrome (ORPHA:358); rule `ikd_gitelman` v0.8.0-tubulopathies, input declaration line 124.
- Source row (erknet_gitelman): HP:0000127 “Renal salt wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_gitelman.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 106.
- Source row (erknet_bartter): HP:0000127 “Renal salt wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 112.
- Source row (east_kcnj10): HP:0000127 “Renal salt wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: east_kcnj10.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 58.
- Source row (medline_pha1): HP:0000127 “Renal salt wasting”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_pha1.

### 51. Angiofibromas (`angiofibromas`)

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

### 52. Angiokeratomas (`angiokeratoma`)

- Section: Skin and sweating
- HPO: HP:0001014; EADV input: `phen_angiokeratoma`.
- Question: Have angiokeratomas been identified?
- Help: Records whether these vascular skin lesions have been identified.
- Reference image: [Examples of Fabry-associated angiokeratomas near the navel and on the oral mucosa.](/reference-images/fabry-angiokeratomas.jpg); Burlina et al., BMC Neurology (2011); [source](https://commons.wikimedia.org/wiki/File:Morbus_Fabry_Angiokeratoma_01.jpg); [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); SHA-256 `93d2a3bd16121c60ae815c992f6cbc795abd33397839c52b45af6e149be61d00`.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 65.
- Source row (orphadata_2026_06): HP:0001014 “Angiokeratoma”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 53. Hypomelanotic macules (`hypomelanotic_macule`)

- Section: Skin and sweating
- HPO: HP:0009719; EADV input: `phen_hypomelanotic_macule`.
- Question: Have hypomelanotic macules been identified?
- Help: Records identified patches of skin with reduced pigmentation. No lesion count is applied.
- Reference image: [Top panel (A): hypomelanotic macules. The other panels show different TSC skin findings.](/reference-images/tsc-skin-findings.png); Portocarrero et al., Anais Brasileiros de Dermatologia (2018); [source](https://commons.wikimedia.org/wiki/File:Hypopigmented_macules,_Shagreen_patch_and_periungual_fibroma_of_tuberous_sclerosis.png); [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); SHA-256 `234f5ffc30708ab4b68d549e51884a9c0627ad415cf2207acc02fc69f30582c8`.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 50.
- Source row (orphadata_2026_06): HP:0009719 “Hypomelanotic macule”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 54. Reduced sweating (`hypohidrosis`)

- Section: Skin and sweating
- HPO: HP:0000966; EADV input: `phen_hypohidrosis`.
- Question: Does the patient report reduced sweating?
- Help: Records a history of sweating less than expected.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 92.
- Source row (orphadata_2026_06): HP:0000966 “Hypohidrosis”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 55. Shagreen patch (`shagreen_patch`)

- Section: Skin and sweating
- HPO: HP:0009721; EADV input: `phen_shagreen_patch`.
- Question: Has a shagreen patch been identified?
- Help: Records whether this skin finding has been identified.
- Reference image: [Middle panel (B): shagreen patch. The other panels show different TSC skin findings.](/reference-images/tsc-skin-findings.png); Portocarrero et al., Anais Brasileiros de Dermatologia (2018); [source](https://commons.wikimedia.org/wiki/File:Hypopigmented_macules,_Shagreen_patch_and_periungual_fibroma_of_tuberous_sclerosis.png); [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); SHA-256 `234f5ffc30708ab4b68d549e51884a9c0627ad415cf2207acc02fc69f30582c8`.
- Feature source IDs: genereviews_tsc, orphadata_2026_06.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 113.
- Source row (orphadata_2026_06): HP:0009721 “Shagreen patch”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.

### 56. Abnormal retinal pigmentation (`abnormal_retinal_pigmentation`)

- Section: Eyes
- HPO: HP:0007703; EADV input: `phen_abnormal_retinal_pigmentation`.
- Question: Has abnormal retinal pigmentation been documented by an eye specialist?
- Help: Use a documented examination finding; this is not equivalent to all forms of retinal dystrophy.
- Feature source IDs: orphadata_2026_06.
- Association: Nephronophthisis, unspecified (ORPHA:655); rule `ikd_nephronophthisis` v0.7.0-ciliopathies, input declaration line 87.
- Source row (orphadata_2026_06): HP:0007703 “Abnormality of retinal pigmentation”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, genereviews_nphp.

### 57. Anterior lenticonus (`anterior_lenticonus`)

- Section: Eyes
- HPO: HP:0011501; EADV input: `phen_anterior_lenticonus`.
- Question: Has anterior lenticonus been documented on eye examination?
- Help: Records a documented lens finding. the patient is not asked to identify it.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 114.
- Source row (orphadata_2026_06): HP:0011501 “Anterior lenticonus”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 58. Congenital developmental cataract (`developmental_cataract`)

- Section: Eyes
- HPO: HP:0000519; EADV input: `phen_developmental_cataract`.
- Question: Has a congenital developmental cataract been documented?
- Help: Uses the HPO developmental cataract term for congenital lens opacity; an acquired adult cataract is not equivalent.
- Feature source IDs: genereviews_lowe, hpo_terms_2026_09.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 193.
- Source row (genereviews_lowe): HP:0000519 “Congenital developmental cataract”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.

### 59. Cornea verticillata (`cornea_verticillata`)

- Section: Eyes
- HPO: HP:0500008; EADV input: `phen_cornea_verticillata`.
- Question: Has cornea verticillata been documented on eye examination?
- Help: Records a documented corneal finding. It does not ask the patient to identify it.
- Reference image: [Cornea verticillata seen on slit-lamp examination in Fabry disease.](/reference-images/fabry-cornea-verticillata.jpg); Burlina et al., BMC Neurology (2011); [source](https://commons.wikimedia.org/wiki/File:Morbus_Fabry_Cornea_verticillata_01.jpg); [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); SHA-256 `845b4fb804ada470192274095556740d18d2f2b79dd6a356176548d25a0a3066`.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 107.
- Source row (orphadata_2026_06): HP:0500008 “Cornea verticillata”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 60. Corneal cystine crystals (`corneal_cystine_crystals`)

- Section: Eyes
- HPO: HP:6000955; EADV input: `phen_corneal_cystine_crystals`.
- Question: Have corneal cystine crystals been documented by an eye specialist?
- Help: Requires the named crystal finding; corneal verticillata or nonspecific corneal changes are not equivalent.
- Feature source IDs: genereviews_cystinosis, hpo_terms_2026_09.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 271.
- Source row (genereviews_cystinosis): HP:6000955 “Corneal cystine crystals”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.

### 61. Oculomotor apraxia (`oculomotor_apraxia`)

- Section: Eyes
- HPO: HP:0000657; EADV input: `phen_oculomotor_apraxia`.
- Question: Has oculomotor apraxia been documented?
- Help: Use a named eye-movement finding from an examination.
- Feature source IDs: genereviews_joubert.
- Association: Joubert syndrome (ORPHA:140874); rule `ikd_joubert` v0.7.0-ciliopathies, input declaration line 123.
- Source row (genereviews_joubert): HP:0000657 “Oculomotor apraxia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_joubert.

### 62. Photophobia (`photophobia`)

- Section: Eyes
- HPO: HP:0000613; EADV input: `phen_photophobia`.
- Question: Has abnormal sensitivity to light been documented?
- Help: Records the symptom without inferring corneal crystals.
- Feature source IDs: genereviews_cystinosis, hpo_terms_2026_09.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 289.
- Source row (genereviews_cystinosis): HP:0000613 “Photophobia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.

### 63. Retinal capillary haemangioma (`retinal_capillary_hemangioma`)

- Section: Eyes
- HPO: HP:0009711; EADV input: `phen_retinal_capillary_hemangioma`.
- Question: Has a retinal capillary haemangioma been documented?
- Help: Records the specific documented retinal lesion. other retinal lesions are not equivalent.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 94.
- Source row (orphadata_2026_06): HP:0009711 “Retinal capillary hemangioma”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 64. Retinal dystrophy (`retinal_dystrophy`)

- Section: Eyes
- HPO: HP:0000556; EADV input: `phen_retinal_dystrophy`.
- Question: Has retinal dystrophy been documented by an eye specialist?
- Help: Use a documented retinal diagnosis; nonspecific visual impairment is insufficient.
- Feature source IDs: genereviews_nphp, genereviews_joubert, orphanet_mainzer.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 210.
- Source row (genereviews_nphp): HP:0000556 “Retinal dystrophy”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 190.
- Source row (genereviews_nphp): HP:0000556 “Retinal dystrophy”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Joubert syndrome (ORPHA:140874); rule `ikd_joubert` v0.7.0-ciliopathies, input declaration line 140.
- Source row (genereviews_joubert): HP:0000556 “Retinal dystrophy”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_joubert.
- Association: Mainzer–Saldino syndrome (ORPHA:140969); rule `ikd_mainzer_saldino` v0.7.0-ciliopathies, input declaration line 69.
- Source row (orphanet_mainzer): HP:0000556 “Retinal dystrophy”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphanet_mainzer.

### 65. Retinal flecks (`retinal_flecks`)

- Section: Eyes
- HPO: HP:0012045; EADV input: `phen_retinal_flecks`.
- Question: Have retinal flecks been documented on eye examination?
- Help: Records the named retinal finding without inferring an inherited cause.
- Feature source IDs: orphadata_2026_06.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 131.
- Source row (orphadata_2026_06): HP:0012045 “Retinal flecks”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 66. Visual impairment (`visual_impairment`)

- Section: Eyes
- HPO: HP:0000505; EADV input: `phen_visual_impairment`.
- Question: Has visual impairment been documented?
- Help: Records the broad finding; it does not establish a specific retinal or ocular disorder.
- Feature source IDs: fhhnc_cohort, hpo_terms_2026_09.
- Association: Familial hypomagnesaemia with hypercalciuria and nephrocalcinosis (ORPHA:306516); rule `ikd_fhhnc` v0.8.0-tubulopathies, input declaration line 141.
- Source row (fhhnc_cohort): HP:0000505 “Visual impairment”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: fhhnc_cohort.

### 67. Acroparaesthesia (`acroparesthesia`)

- Section: Neurological history
- HPO: HP:0031006; EADV input: `phen_acroparesthesia`.
- Question: Has the patient experienced episodes of burning or tingling pain in the hands or feet?
- Help: Episodes of pain or abnormal sensation in the extremities.
- Feature source IDs: genereviews_fabry, orphadata_2026_06.
- Association: Fabry disease (ORPHA:324); rule `ikd_fabry` v0.6.0-family-history, input declaration line 50.
- Source row (orphadata_2026_06): HP:0031006 “Acroparesthesia”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_fabry, orphadata_2026_06.

### 68. Ataxia (`ataxia`)

- Section: Neurological history
- HPO: HP:0001251; EADV input: `phen_ataxia`.
- Question: Has ataxia been documented?
- Help: Records an established coordination finding, including a historical finding.
- Feature source IDs: genereviews_joubert, orphanet_mainzer, east_kcnj10.
- Association: Joubert syndrome (ORPHA:140874); rule `ikd_joubert` v0.7.0-ciliopathies, input declaration line 106.
- Source row (genereviews_joubert): HP:0001251 “Ataxia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_joubert.
- Association: Mainzer–Saldino syndrome (ORPHA:140969); rule `ikd_mainzer_saldino` v0.7.0-ciliopathies, input declaration line 103.
- Source row (orphanet_mainzer): HP:0001251 “Ataxia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphanet_mainzer.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 147.
- Source row (east_kcnj10): HP:0001251 “Ataxia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: east_kcnj10.

### 69. Cerebellar haemangioblastoma (`cerebellar_hemangioblastoma`)

- Section: Neurological history
- HPO: HP:0006880; EADV input: `phen_cerebellar_hemangioblastoma`.
- Question: Has a cerebellar haemangioblastoma been documented?
- Help: Records the named tumour and location, not an unspecified brain lesion.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 111.
- Source row (orphadata_2026_06): HP:0006880 “Cerebellar hemangioblastoma”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 70. Global developmental delay (`global_developmental_delay`)

- Section: Neurological history
- HPO: HP:0001263; EADV input: `phen_global_developmental_delay`.
- Question: Was global developmental delay documented in childhood?
- Help: A historical developmental finding; do not infer it from kidney disease.
- Feature source IDs: genereviews_joubert, east_kcnj10, genereviews_lowe.
- Association: Joubert syndrome (ORPHA:140874); rule `ikd_joubert` v0.7.0-ciliopathies, input declaration line 89.
- Source row (genereviews_joubert): HP:0001263 “Global developmental delay”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_joubert.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 181.
- Source row (east_kcnj10): HP:0001263 “Global developmental delay”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: east_kcnj10.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 228.
- Source row (genereviews_lowe): HP:0001263 “Global developmental delay”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.

### 71. Hypotonia (`hypotonia`)

- Section: Neurological history
- HPO: HP:0001252; EADV input: `phen_hypotonia`.
- Question: Has hypotonia been documented?
- Help: Records reduced muscle tone observed clinically.
- Feature source IDs: genereviews_joubert, genereviews_lowe.
- Association: Joubert syndrome (ORPHA:140874); rule `ikd_joubert` v0.7.0-ciliopathies, input declaration line 72.
- Source row (genereviews_joubert): HP:0001252 “Hypotonia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_joubert.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 211.
- Source row (genereviews_lowe): HP:0001252 “Hypotonia”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.

### 72. Molar tooth sign on MRI (`molar_tooth_sign`)

- Section: Neurological history
- HPO: HP:0002419; EADV input: `phen_molar_tooth_sign`.
- Question: Has a molar tooth sign been documented on brain MRI?
- Help: Use the named radiology finding, not an inferred interpretation of an unrelated MRI.
- Feature source IDs: genereviews_joubert.
- Association: Joubert syndrome (ORPHA:140874); rule `ikd_joubert` v0.7.0-ciliopathies, input declaration line 55.
- Source row (genereviews_joubert): HP:0002419 “Molar tooth sign on MRI”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_joubert.

### 73. Seizures (`seizure`)

- Section: Neurological history
- HPO: HP:0001250; EADV input: `phen_seizure`.
- Question: Is there a history of seizures?
- Help: Records a history of seizures without implying when they occurred.
- Feature source IDs: genereviews_tsc, orphadata_2026_06, east_kcnj10.
- Association: Tuberous sclerosis complex (ORPHA:805); rule `ikd_tuberous_sclerosis` v0.6.0-family-history, input declaration line 167.
- Source row (orphadata_2026_06): HP:0001250 “Seizure”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_tsc, orphadata_2026_06.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 130.
- Source row (east_kcnj10): HP:0001250 “Seizures”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: east_kcnj10.

### 74. Bone pain (`bone_pain`)

- Section: Skeletal
- HPO: HP:0002653; EADV input: `phen_bone_pain`.
- Question: Has bone pain been documented?
- Help: Records pain localised to bone rather than nonspecific joint or muscle pain.
- Feature source IDs: genereviews_xlh, hpo_terms_2026_09.
- Association: X-linked hypophosphataemia (ORPHA:89936); rule `ikd_xlh` v0.8.0-tubulopathies, input declaration line 123.
- Source row (genereviews_xlh): HP:0002653 “Bone pain”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_xlh.

### 75. Cone-shaped finger-bone epiphyses (`cone_shaped_phalangeal_epiphyses`)

- Section: Skeletal
- HPO: HP:0034281; EADV input: `phen_cone_shaped_phalangeal_epiphyses`.
- Question: Have cone-shaped finger-bone epiphyses been documented on imaging?
- Help: Use the named skeletal radiology finding.
- Feature source IDs: orphanet_mainzer.
- Association: Mainzer–Saldino syndrome (ORPHA:140969); rule `ikd_mainzer_saldino` v0.7.0-ciliopathies, input declaration line 86.
- Source row (orphanet_mainzer): HP:0034281 “Cone-shaped finger-bone epiphyses”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphanet_mainzer.

### 76. Recurrent dental abscesses (`recurrent_dental_abscesses`)

- Section: Skeletal
- HPO: HP:5210249; EADV input: `phen_recurrent_dental_abscesses`.
- Question: Have recurrent dental abscesses been documented?
- Help: Use documented recurrent abscesses; toothache alone is insufficient.
- Feature source IDs: genereviews_xlh, hpo_terms_2026_09.
- Association: X-linked hypophosphataemia (ORPHA:89936); rule `ikd_xlh` v0.8.0-tubulopathies, input declaration line 141.
- Source row (genereviews_xlh): HP:5210249 “Recurrent dental abscesses”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_xlh.

### 77. Rickets (`rickets`)

- Section: Skeletal
- HPO: HP:0002748; EADV input: `phen_rickets`.
- Question: Has rickets been documented?
- Help: Use a documented clinical or radiological diagnosis; adult osteomalacia is a different finding.
- Feature source IDs: genereviews_drta, hpo_terms_2026_09, genereviews_dent, genereviews_cystinosis, genereviews_lowe, hhrh_original, genereviews_xlh.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 189.
- Source row (genereviews_drta): HP:0002748 “Rickets”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.
- Association: Dent disease (ORPHA:1652); rule `ikd_dent` v0.8.0-tubulopathies, input declaration line 183.
- Source row (genereviews_dent): HP:0002748 “Rickets”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_dent.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 253.
- Source row (genereviews_cystinosis): HP:0002748 “Rickets”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Lowe syndrome (ORPHA:534); rule `ikd_lowe` v0.8.0-tubulopathies, input declaration line 175.
- Source row (genereviews_lowe): HP:0002748 “Rickets”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_lowe.
- Association: Hereditary hypophosphataemic rickets with hypercalciuria (ORPHA:157215); rule `ikd_hhrh` v0.8.0-tubulopathies, input declaration line 124.
- Source row (hhrh_original): HP:0002748 “Rickets”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hhrh_original.
- Association: X-linked hypophosphataemia (ORPHA:89936); rule `ikd_xlh` v0.8.0-tubulopathies, input declaration line 88.
- Source row (genereviews_xlh): HP:0002748 “Rickets”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_xlh.

### 78. Short thorax (`short_thorax`)

- Section: Skeletal
- HPO: HP:0010306; EADV input: `phen_short_thorax`.
- Question: Has a short thorax been documented on examination or imaging?
- Help: Records the described skeletal finding without using it to assign a genetic subtype.
- Feature source IDs: genereviews_nphp, orphanet_mainzer.
- Association: Nephronophthisis 12 (OMIM:613820); rule `ikd_nphp12` v0.7.0-ciliopathies, input declaration line 98.
- Source row (genereviews_nphp): HP:0010306 “Short thorax”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Mainzer–Saldino syndrome (ORPHA:140969); rule `ikd_mainzer_saldino` v0.7.0-ciliopathies, input declaration line 137.
- Source row (orphanet_mainzer): HP:0010306 “Short thorax”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphanet_mainzer.

### 79. Bilateral sensorineural hearing impairment (`bilateral_sensorineural_hearing_impairment`)

- Section: Hearing
- HPO: HP:0008619; EADV input: `phen_bilateral_sensorineural_hearing_impairment`.
- Question: Has sensorineural hearing impairment in both ears been documented?
- Help: Documented sensorineural impairment affecting both ears.
- Feature source IDs: orphadata_2026_06, erknet_bartter, east_kcnj10, genereviews_drta.
- Association: Alport syndrome (ORPHA:63); rule `ikd_alport` v0.6.0-family-history, input declaration line 97.
- Source row (orphadata_2026_06): HP:0008619 “Bilateral sensorineural hearing impairment”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 247.
- Source row (erknet_bartter): HP:0008619 “Bilateral sensorineural hearing impairment”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: EAST / SeSAME syndrome (ORPHA:199343); rule `ikd_east` v0.8.0-tubulopathies, input declaration line 164.
- Source row (east_kcnj10): HP:0008619 “Bilateral sensorineural hearing impairment”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: east_kcnj10.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 207.
- Source row (genereviews_drta): HP:0008619 “Bilateral sensorineural hearing impairment”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.

### 80. Endolymphatic sac tumour (`endolymphatic_sac_tumor`)

- Section: Hearing
- HPO: HP:0030393; EADV input: `phen_endolymphatic_sac_tumor`.
- Question: Has an endolymphatic sac tumour been documented?
- Help: Records the named tumour. hearing impairment alone is insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 162.
- Source row (orphadata_2026_06): HP:0030393 “Endolymphatic sac tumor”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 81. Adrenal pheochromocytoma (`adrenal_pheochromocytoma`)

- Section: Endocrine and metabolic
- HPO: HP:0006748; EADV input: `phen_adrenal_pheochromocytoma`.
- Question: Has an adrenal pheochromocytoma been documented?
- Help: Requires the documented tumour diagnosis. hypertension alone does not establish this finding.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 128.
- Source row (orphadata_2026_06): HP:0006748 “Adrenal pheochromocytoma”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 82. Diabetes mellitus (`diabetes_mellitus`)

- Section: Endocrine and metabolic
- HPO: HP:0000819; EADV input: `phen_diabetes_mellitus`.
- Question: Has diabetes mellitus been documented?
- Help: Records documented diabetes without inferring its type, genetic cause or age at onset.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 62.
- Source row (orphadata_2026_06): HP:0000819 “Diabetes mellitus”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.

### 83. Gout (`gout`)

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

### 84. Growth delay (`growth_delay`)

- Section: Endocrine and metabolic
- HPO: HP:0001510; EADV input: `phen_growth_delay`.
- Question: Was delayed growth documented during childhood?
- Help: A historical childhood finding; adult short stature alone is not the same observation.
- Feature source IDs: hpoa_2026_09, erknet_bartter, genereviews_drta, genereviews_cystinosis, medline_pha1, genereviews_ndi.
- Association: Nephronophthisis 1 (OMIM:256100); rule `ikd_nphp1` v0.7.0-ciliopathies, input declaration line 113.
- Source row (hpoa_2026_09): HP:0001510 “Growth delay”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Nephronophthisis 4 (OMIM:606966); rule `ikd_nphp4` v0.7.0-ciliopathies, input declaration line 110.
- Source row (hpoa_2026_09): HP:0001510 “Growth delay”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_nphp.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 194.
- Source row (erknet_bartter): HP:0001510 “Growth delay”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.
- Association: Inherited distal renal tubular acidosis (ORPHA:18); rule `ikd_drta` v0.8.0-tubulopathies, input declaration line 172.
- Source row (genereviews_drta): HP:0001510 “Growth delay”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_drta.
- Association: Nephropathic cystinosis (ORPHA:213); rule `ikd_cystinosis` v0.8.0-tubulopathies, input declaration line 236.
- Source row (genereviews_cystinosis): HP:0001510 “Growth delay”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_cystinosis.
- Association: Inherited pseudohypoaldosteronism type I (ORPHA:756); rule `ikd_pha1` v0.8.0-tubulopathies, input declaration line 166.
- Source row (medline_pha1): HP:0001510 “Growth delay”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_pha1.
- Association: Hereditary nephrogenic diabetes insipidus (ORPHA:223); rule `ikd_ndi` v0.8.0-tubulopathies, input declaration line 145.
- Source row (genereviews_ndi): HP:0001510 “Growth delay”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_ndi.

### 85. Hyperuricaemia (`hyperuricemia`)

- Section: Endocrine and metabolic
- HPO: HP:0002149; EADV input: `phen_hyperuricemia`.
- Question: Has hyperuricaemia been documented?
- Help: Records a documented elevated urate finding without applying a new laboratory threshold.
- Feature source IDs: orphadata_2026_06, hpoa_2026_09.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 102.
- Source row (orphadata_2026_06): HP:0002149 “Hyperuricemia”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.
- Association: ADTKD–UMOD (OMIM:162000); rule `ikd_adtkd_umod` v0.6.0-family-history, input declaration line 56.
- Source row (hpoa_2026_09): HP:0002149 “Hyperuricemia”, source date 2026-09-02; frequency category “100/130” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_umod.
- Association: ADTKD–MUC1 (OMIM:174000); rule `ikd_adtkd_muc1` v0.6.0-family-history, input declaration line 53.
- Source row (hpoa_2026_09): HP:0002149 “Hyperuricemia”, source date 2026-09-02; frequency category “Not supplied” is provenance context only, never a score or patient probability.
- Disease source IDs: hpoa_2026_09, genereviews_adtkd_muc1.

### 86. Pancreatic aplasia or hypoplasia (`pancreatic_aplasia_hypoplasia`)

- Section: Endocrine and metabolic
- HPO: HP:0100800; EADV input: `phen_pancreatic_aplasia_hypoplasia`.
- Question: Has pancreatic aplasia or hypoplasia been documented?
- Help: Records documented absent or underdeveloped pancreatic tissue. diabetes alone is insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: HNF1B-related disease (ORPHA:93111); rule `ikd_hnf1b` v0.8.0-tubulopathies, input declaration line 137.
- Source row (orphadata_2026_06): HP:0100800 “Aplasia/Hypoplasia of the pancreas”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06, erknet_hnf1b.

### 87. Pancreatic endocrine tumour (`pancreatic_endocrine_tumor`)

- Section: Endocrine and metabolic
- HPO: HP:0030405; EADV input: `phen_pancreatic_endocrine_tumor`.
- Question: Has a pancreatic endocrine tumour been documented?
- Help: Records the specific tumour diagnosis. an unspecified pancreatic lesion is insufficient.
- Feature source IDs: orphadata_2026_06.
- Association: Von Hippel–Lindau disease (ORPHA:892); rule `ikd_vhl` v0.6.0-family-history, input declaration line 145.
- Source row (orphadata_2026_06): HP:0030405 “Pancreatic endocrine tumor”, source date 2026-06-23 07:57:18; frequency category “Occasional (29-5%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 88. Short stature (`short_stature`)

- Section: Endocrine and metabolic
- HPO: HP:0004322; EADV input: `phen_short_stature`.
- Question: Has short stature been documented?
- Help: Records documented stature without applying a new height cutoff.
- Feature source IDs: orphanet_mainzer, hhrh_original, genereviews_xlh.
- Association: Mainzer–Saldino syndrome (ORPHA:140969); rule `ikd_mainzer_saldino` v0.7.0-ciliopathies, input declaration line 120.
- Source row (orphanet_mainzer): HP:0004322 “Short stature”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: orphanet_mainzer.
- Association: Hereditary hypophosphataemic rickets with hypercalciuria (ORPHA:157215); rule `ikd_hhrh` v0.8.0-tubulopathies, input declaration line 142.
- Source row (hhrh_original): HP:0004322 “Short stature”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: hhrh_original.
- Association: X-linked hypophosphataemia (ORPHA:89936); rule `ikd_xlh` v0.8.0-tubulopathies, input declaration line 106.
- Source row (genereviews_xlh): HP:0004322 “Short stature”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_xlh.

### 89. Congenital hepatic fibrosis (`congenital_hepatic_fibrosis`)

- Section: Liver and prenatal history
- HPO: HP:0002612; EADV input: `phen_congenital_hepatic_fibrosis`.
- Question: Has congenital hepatic fibrosis been documented?
- Help: Records congenital hepatic fibrosis. unspecified liver fibrosis does not establish this subtype.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 91.
- Source row (orphadata_2026_06): HP:0002612 “Congenital hepatic fibrosis”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 90. Oligohydramnios in the patient’s prenatal history (`oligohydramnios`)

- Section: Liver and prenatal history
- HPO: HP:0001562; EADV input: `phen_oligohydramnios`.
- Question: Was oligohydramnios documented during the pregnancy in which this patient was carried?
- Help: Refers to the patient’s own prenatal history, not a later pregnancy carried by the patient. Unknown if records are unavailable.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 125.
- Source row (orphadata_2026_06): HP:0001562 “Oligohydramnios”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 91. Polyhydramnios in the patient’s prenatal history (`polyhydramnios`)

- Section: Liver and prenatal history
- HPO: HP:0001561; EADV input: `phen_polyhydramnios`.
- Question: Was polyhydramnios documented during the pregnancy in which this patient was carried?
- Help: Refers to the assessed patient’s prenatal history, not a pregnancy they subsequently carried.
- Feature source IDs: erknet_bartter, hpo_terms_2026_09.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 211.
- Source row (erknet_bartter): HP:0001561 “Polyhydramnios in the patient’s prenatal history”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.

### 92. Portal hypertension (`portal_hypertension`)

- Section: Liver and prenatal history
- HPO: HP:0001409; EADV input: `phen_portal_hypertension`.
- Question: Has portal hypertension been documented?
- Help: Records documented portal hypertension, separately from systemic arterial hypertension.
- Feature source IDs: orphadata_2026_06.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 108.
- Source row (orphadata_2026_06): HP:0001409 “Portal hypertension”, source date 2026-06-23 07:57:18; frequency category “Frequent (79-30%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.

### 93. Premature birth (`premature_birth`)

- Section: Liver and prenatal history
- HPO: HP:0001622; EADV input: `phen_premature_birth`.
- Question: Was this patient born prematurely?
- Help: Use the documented birth history.
- Feature source IDs: erknet_bartter, hpo_terms_2026_09.
- Association: Bartter syndrome (ORPHA:112); rule `ikd_bartter` v0.8.0-tubulopathies, input declaration line 229.
- Source row (erknet_bartter): HP:0001622 “Premature birth”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_bartter.

### 94. Hypertension (`hypertension`)

- Section: Cardiovascular
- HPO: HP:0000822; EADV input: `phen_hypertension`.
- Question: Has hypertension been documented?
- Help: Documented hypertension without deriving a diagnosis from a single blood pressure.
- Feature source IDs: orphadata_2026_06, medline_liddle, genereviews_gordon.
- Association: Autosomal recessive polycystic kidney disease (ORPHA:731); rule `ikd_arpkd` v0.6.0-family-history, input declaration line 142.
- Source row (orphadata_2026_06): HP:0000822 “Hypertension”, source date 2026-06-23 07:57:18; frequency category “Very frequent (99-80%)” is provenance context only, never a score or patient probability.
- Disease source IDs: orphadata_2026_06.
- Association: Liddle syndrome (ORPHA:526); rule `ikd_liddle` v0.8.0-tubulopathies, input declaration line 85.
- Source row (medline_liddle): HP:0000822 “Hypertension”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: medline_liddle.
- Association: Gordon syndrome / pseudohypoaldosteronism type II (ORPHA:757); rule `ikd_gordon` v0.8.0-tubulopathies, input declaration line 88.
- Source row (genereviews_gordon): HP:0000822 “Hypertension”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: genereviews_gordon.

### 95. Hypotension (`hypotension`)

- Section: Cardiovascular
- HPO: HP:0002615; EADV input: `phen_hypotension`.
- Question: Has low blood pressure been documented?
- Help: Use blood pressure interpreted for age and clinical context. Normal blood pressure is not counted as hypotension.
- Feature source IDs: erknet_gitelman, hpo_terms_2026_09.
- Association: Gitelman syndrome (ORPHA:358); rule `ikd_gitelman` v0.8.0-tubulopathies, input declaration line 142.
- Source row (erknet_gitelman): HP:0002615 “Hypotension”, source date 2026-09-27; frequency category “not quantified” is provenance context only, never a score or patient probability.
- Disease source IDs: erknet_gitelman.

## Shared review decisions

- Assessment limitations shown in Atlas: These candidate questions across 28 disease profiles are an incomplete research assessment. Twenty-one profiles, including the tubulopathies and expanded HNF1B profile, count one point per marked clinical finding; seven retain LIRICAL-derived candidate weights. The models have different units and totals cannot be compared as likelihoods. Family-history prompts add zero. Unticked findings are recorded as absent for this proof of concept. A zero score does not exclude disease. Related profiles and correlated findings may yield similar or inflated counts. Tubulopathy profiles combine manifestations that vary by age and genetic subtype; electrolyte findings do not establish renal wasting or an inherited cause. Broad dRTA, cystinosis and NDI terminology codes cover more than the inherited renal presentations assessed here. NPHP12 source coverage is sparse; Joubert and Mainzer–Saldino source mappings need review. Outputs are not diagnostic criteria, probabilities, or treatment advice.
- Disease association context shown in Atlas: This is background context; an answer here does not establish or exclude a diagnosis.
- Answer semantics: tick a finding to record present; every unticked finding is assumed absent for this demonstration.
- FHIR mapping: all selected features produce boolean Observations, including false for unticked findings. Check displayed wording against this assumption.
- Disease context: an association is background information and cannot establish or exclude disease.
- Research output: each rule sums its declared weights for present features. Unticked features are absent and contribute zero. No diagnostic cutoff is applied. Review weights, correlated findings, feature selection and population calibration before clinical use.
- Scope: 95 candidate features across 28 disease ruleblocks. This is not a complete inherited kidney disease screen or diagnostic criteria. The display sorts positive numerical scores and hides zeros; this is not a ranking of disease likelihoods. Orphadata frequency categories are not used as weights.
- Reviewer checks: confirm source attribution, release/version, terminology meaning, wording, limitations, and whether any feature needs added clinical context.

