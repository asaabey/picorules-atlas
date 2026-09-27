# Atlas reference images

Atlas can attach an optional `atlas.reference_image` object to an input
`#define_attribute` in a `.prb` ruleblock. The question card shows it in a
keyboard-accessible disclosure. Images are local static files; opening a
reference image does not send assessment answers to an image host.

Each image declaration includes a local path, descriptive alt text, a caption,
credit, source page, license and license link, original dimensions, and the
SHA-256 of the committed file. The content build rejects a missing file, changed
bytes, unsupported format, external image path, or HTML in descriptive text.
The metadata and checksum enter the collection content version.

| Feature | Static asset | Source and reuse terms |
| --- | --- | --- |
| Fabry angiokeratomas | `fabry-angiokeratomas.jpg` | [Burlina et al. image](https://commons.wikimedia.org/wiki/File:Morbus_Fabry_Angiokeratoma_01.jpg), CC BY 2.0 |
| Fabry cornea verticillata | `fabry-cornea-verticillata.jpg` | [Burlina et al. image](https://commons.wikimedia.org/wiki/File:Morbus_Fabry_Cornea_verticillata_01.jpg), CC BY 2.0 |
| TSC hypomelanotic macules and shagreen patch | `tsc-skin-findings.png` | [Portocarrero et al. composite](https://commons.wikimedia.org/wiki/File:Hypopigmented_macules,_Shagreen_patch_and_periungual_fibroma_of_tuberous_sclerosis.png), CC BY 4.0 |
| Renal angiomyolipoma on CT | `renal-angiomyolipoma-ct.jpg` | [Greco et al. image](https://commons.wikimedia.org/wiki/File:CT_of_angiomyolipoma,_before_and_after_radiocontrast.jpg), CC BY 4.0 |

The TSC composite shows macules in its top panel and a shagreen patch in its
middle panel; captions identify the relevant panel for each question. The CT
image is an example of renal angiomyolipoma and is not specific to TSC. These
images are visual references, not criteria for answering a question or making
a diagnosis. The original files are included without cropping or alteration.

## Selection policy

Use images for distinctive findings that benefit from a visual recognition aid.
Do not add routine kidney ultrasound, horseshoe kidney, nonspecific cyst or
atrophy illustrations. Their modality metadata is retained as `not_selected`,
and no image controls or placeholders are shown for these findings.

Added facial angiofibromas (`facial-angiofibromas.jpg`), also historically called
adenoma sebaceum: [Sand et al. (2010)](https://commons.wikimedia.org/wiki/File:Adenoma_sebaceum_01.jpg),
CC BY 2.0. The original photograph, including its eye masking, is unchanged.
The existing Fabry/TSC reference images remain available.

`atlas.image_guidance` records category (`radiology`, `histopathology` or
`dermatology`), modality, description and asset status (`available_reference`,
`pending_verified_reference` or `not_selected`). An available reference must
have the complete `reference_image` provenance record. `not_selected` is a
selection decision, not a missing download.
