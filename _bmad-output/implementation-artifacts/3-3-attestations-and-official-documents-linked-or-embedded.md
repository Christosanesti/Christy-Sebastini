# Story 3.3: Attestations and official documents linked or embedded

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to access or view attestations or official documents where the product surfaces them,
so that I can verify credentials (FR10).

## Acceptance Criteria

1. **Given** attestations or official documents (e.g. Attestation de résultat C. SEBASTINI.pdf) are in scope  
   **When** the product surfaces them (e.g. in Recommendations or About)  
   **Then** they are linked or embedded so I can open or view them  
   **And** link text or label is descriptive (e.g. "View attestation" or "Attestation – PDF")

2. **Given** any linked document  
   **When** I click the link  
   **Then** the document opens (new tab or same tab as designed) or is embedded without breaking layout  
   **And** no sensitive data is exposed in client-side storage or logs (NFR-S2)

## Tasks / Subtasks

- [x] Surface attestations/official documents (AC: #1)
  - [x] Identify attestation assets: PRD lists "Attestation de résultat C. SEBASTINI.pdf" in Assets/ — Trust/credentials; link or embed in About or dedicated credentials section (or Recommendations).
  - [x] Add attestations section or list on Recommendations page (or About) with link(s) to document(s). Use existing `public/documents/` pattern from Story 2.3 (copy/symlink from Assets/; paths in code).
  - [x] Ensure each link has descriptive label (e.g. "View attestation (PDF)", "Attestation – PDF").
- [x] Link behavior and security (AC: #2)
  - [x] PDF links open in new tab with `target="_blank"` and `rel="noopener noreferrer"`; or embed via iframe/object if design specifies embed. Do not store PDF content or sensitive data in client storage or logs.
  - [x] If PDF is missing (e.g. not yet in public/documents/), use same fallback pattern as project documents: "Document not available" or hide link (see ProjectDocumentLink / Story 2.3).

## Dev Notes

- FR10: A visitor can access or view attestations or official documents where the product surfaces them (e.g. link or embed). [Source: epics.md, prd.md]
- PRD Assets: "Attestation de résultat C. SEBASTINI.pdf" — Trust/credentials; link or embed in About or dedicated credentials section. [Source: prd.md — Client Assets Inventory]
- Story 3.1: Recommendations page exists; Story 3.2: RecommendationBlock and at least one recommendation. Attestations can be a separate subsection on the same page or alongside recommendations (epics: "in Recommendations or About").
- Architecture: Trust & credibility in `app/recommendations/page.tsx`, `components/sections/RecommendationBlock.tsx`. No new route required; add attestation links/section to Recommendations (or About). [Source: architecture.md]
- Story 2.3: Established `public/documents/` and optional `ProjectDocumentLink`-style fallback for missing PDFs. Reuse pattern: document path from config or constant; link with descriptive label; fallback when 404.

### Project Structure Notes

- **app:** Only `app/recommendations/page.tsx` (and optionally `app/about/page.tsx` if attestation is also surfaced there). Add attestations list/links; no new routes.
- **components:** Reuse existing patterns. If attestations are link-only, a small list or reuse of card/link styling from RecommendationBlock is enough; optional `AttestationLink` or reuse generic document link component from 2.3 if present.
- **lib:** Optional: `lib/attestations.ts` or constants for document paths/labels (e.g. `{ label: "View attestation (PDF)", path: "/documents/attestation-resultat-c-sebastini.pdf" }`). Paths point to `public/documents/`; files copied from Assets/.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 3, Story 3.3, FR10]
- [Source: _bmad-output/planning-artifacts/prd.md — Client Assets Inventory, Attestation de résultat C. SEBASTINI.pdf]
- [Source: _bmad-output/planning-artifacts/architecture.md — Trust & credibility, FR8–FR11]
- [Source: app/recommendations/page.tsx — current structure; add attestations section]
- [Source: public/documents/README.md — document path convention and fallback]

---

## Change Log

- **2026-02-25:** Story implemented. Attestations section on Recommendations page; `lib/attestations.ts`; ProjectDocumentLink reuse; public/documents README updated.
- **2026-02-25:** Code review (CR). Fixes: ProjectDocumentLink checking state (no flash before HEAD); stable keys for attestations list; File List + sprint-status; Story completion status set to review.

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Do not add new routes.** Surface attestations on the existing Recommendations page (and optionally About). [Source: Story 3.1, 3.2]
- **Document source:** PRD lists "Attestation de résultat C. SEBASTINI.pdf" in Assets/. For web, place copy in `public/documents/` (e.g. `attestation-resultat-c-sebastini.pdf`) and link from the page. Same pattern as Story 2.3 for project PDFs. [Source: prd.md, architecture.md — Data boundaries]
- **Link UX:** Descriptive label (e.g. "View attestation (PDF)", "Attestation – PDF"). Open in new tab: `target="_blank"` and `rel="noopener noreferrer"`. [Source: AC#1, AC#2, ux-design-specification.md]
- **Missing file:** If PDF is not in public/documents/, show fallback (e.g. "Document not available") or omit link; do not break layout. Reuse ProjectDocumentLink or equivalent from Story 2.3 if available. [Source: Story 2.3]
- **Security:** No sensitive data in client-side storage or logs (NFR-S2). Linking to static PDF in public/ is fine; do not log document content or user access.

### Architecture compliance

- **No root src/.** Code under `app/`, `components/`, `lib/`. [Source: architecture.md]
- **Naming:** PascalCase components; kebab-case routes and file paths. [Source: architecture.md]
- **Structure:** Trust content on Recommendations page; optional small component for attestation link list in `components/sections/` if needed. [Source: architecture.md]
- **Stack:** Next.js App Router, Tailwind, shadcn/ui, Bun. Server Components for page; client only if interactive link/embed behavior requires it. [Source: architecture.md]

### Library and framework requirements

| Package / API | Purpose | Notes |
|--------------|---------|--------|
| Next.js | Page, metadata, Link | Use `<Link>` or `<a>` for document URLs; no new route |
| shadcn/ui | Card, typography (if attestation block) | Optional; match Recommendations styling |

No new npm packages. Reuse existing design tokens and link styles.

### File structure requirements

- **Update:** `app/recommendations/page.tsx` — add attestations section (list of links to documents in `public/documents/`). Optionally `app/about/page.tsx` if product decision is to also show attestation on About.
- **Optional:** `lib/attestations.ts` or inline array of `{ label, path }` for attestation links. Paths: `/documents/...` (public).
- **Assets:** Copy or symlink "Attestation de résultat C. SEBASTINI.pdf" from Assets/ to `public/documents/` with a URL-safe filename (e.g. `attestation-resultat-c-sebastini.pdf`). Document in README or code comment.
- **Do not:** Create new top-level route for attestations; do not break RecommendationBlock or existing recommendations layout.

### Testing requirements

- Manual: Open `/recommendations`; confirm attestation link(s) are visible with descriptive labels; click opens PDF in new tab (or shows fallback if file missing). Keyboard focus and no sensitive data in console. No automated tests required for MVP per architecture.

### Previous story intelligence (Story 3.2)

- **Recommendations page:** `app/recommendations/page.tsx` has recommendations array, `RecommendationBlock`, empty state, and section copy. Add a separate "Attestations" or "Official documents" subsection below recommendations with one or more document links.
- **RecommendationBlock:** Used for recommendation quotes; attestations are document links, not quotes — use a simple link list or card with link + label, or a small reusable "document link" pattern.
- **Story 2.3:** `public/documents/` exists; project PDFs linked from project detail; optional ProjectDocumentLink with 404 fallback. Reuse same path convention and fallback for attestation PDF.

### Project context reference

- Product: Christy Sebastini portfolio. Epic 3 = Trust & credibility (FR8–FR10). Story 3.3 = attestations and official documents linked or embedded. PRD asset: "Attestation de résultat C. SEBASTINI.pdf". [Source: epics.md, prd.md]
- No project-context.md. Place attestation PDF in public/documents/ and link from Recommendations (or About) with clear label.

### Story completion status

- **Status:** done
- **Completion note:** Code review complete; MEDIUM/LOW fixes applied; story and sprint status synced.

## Dev Agent Record

### Agent Model Used

Amelia (Developer Agent); workflow: dev-story.

### Debug Log References

- Story 3-3 loaded from sprint-status (first ready-for-dev). No project-context.md. Reused ProjectDocumentLink from Story 2.3 for attestation links with HEAD fallback.

### Completion Notes List

- Added `lib/attestations.ts` with attestation entries (label, path) for `/documents/attestation-resultat-c-sebastini.pdf`.
- Recommendations page: new "Attestations & official documents" subsection below recommendations list; each attestation rendered via ProjectDocumentLink (target="_blank", rel="noopener noreferrer"; fallback "Document not available" when 404). No sensitive data in client storage or logs.
- Updated `public/documents/README.md` with attestation file and path convention. Build and lint pass.
- **Code review fixes:** ProjectDocumentLink now uses checking state ("Checking…") until HEAD resolves, then shows link or fallback (no flash); attestations list uses stable key `att.path`; File List includes ProjectDocumentLink and sprint-status.yaml; Story completion status set to review.

### File List

- lib/attestations.ts (new)
- app/recommendations/page.tsx (updated: attestations section, ProjectDocumentLink, attestations import, stable list keys)
- public/documents/README.md (updated: attestation PDF entry)
- components/sections/ProjectDocumentLink.tsx (updated: code-review fix — checking state to avoid flash before HEAD resolves)
- _bmad-output/implementation-artifacts/sprint-status.yaml (workflow: story status set to review)
