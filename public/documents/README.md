# Project documents (Assets)

Place project PDFs (and optional PPTX export) here so project detail pages can link to them. Attestation/official documents are also linked from the Recommendations page.

**Expected files (from PRD Assets inventory):**

| File | Project / Use |
|------|----------------|
| UBISOFT.pdf | Ubisoft |
| Transavia.pdf | Transavia |
| Presentation-ViaMapa.pdf | ViaMapa (export from Présentation-ViaMapa.pptx) |
| Projet-entrepreneurial.pdf | Entrepreneurial work |
| Cinabre-paris.com.pdf | Cinabre Paris |
| attestation-resultat-c-sebastini.pdf | Attestation (Trust/credentials); copy from Assets/ "Attestation de résultat C. SEBASTINI.pdf". Linked from Recommendations (`lib/attestations.ts`). |

Copy or symlink from project root `Assets/` folder. Paths are referenced in `lib/projects.ts` (projects) and `lib/attestations.ts` (attestations). Until files are present, the detail/recommendations page shows "Document not available" instead of a link (AC#2 fallback).
