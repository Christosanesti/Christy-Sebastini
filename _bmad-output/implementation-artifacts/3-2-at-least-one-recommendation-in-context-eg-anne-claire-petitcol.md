# Story 3.2: At least one recommendation in context (e.g. Anne-Claire Petitcol)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to read at least one short recommendation or endorsement (e.g. Anne-Claire Petitcol) in context,
so that I can trust Christy's credibility (FR9).

## Acceptance Criteria

1. **Given** the Recommendations/Trust section or page  
   **When** I view it  
   **Then** at least one recommendation is shown (e.g. quote or short excerpt) with attributor (name, role)  
   **And** the content is from the Assets (e.g. Lettre de recommandation Anne-Claire Petitcol) or from defined structured content

2. **Given** the recommendation block  
   **When** it is rendered  
   **Then** it is readable and visually distinct (e.g. quote styling, attribution)  
   **And** optional link to "Read full recommendation" or PDF is present and accessible

## Tasks / Subtasks

- [ ] Add at least one recommendation to the page (AC: #1)
  - [ ] Source content: from Assets (e.g. Anne-Claire Petitcol letter) or define structured content (quote, name, role)
  - [ ] Populate `recommendations` in `app/recommendations/page.tsx` with at least one entry matching `RecommendationBlockProps`
  - [ ] Ensure quote (or short excerpt), attributorName, and attributorRole are present
- [ ] Quote styling and optional link (AC: #2)
  - [ ] Confirm RecommendationBlock already provides quote styling and attribution (Card, blockquote, CardTitle/CardDescription)
  - [ ] Add optional link (link + linkLabel) to full recommendation or PDF when asset exists (e.g. in public/ or Assets/)

## Dev Notes

- FR9: A visitor can read at least one short recommendation or endorsement (e.g. Anne-Claire Petitcol) in context. [Source: epics.md, prd.md]
- Story 3.1 delivered: `/recommendations` page, RecommendationBlock component (quote, attributorName, attributorRole, link, linkLabel), empty state when no data. Page currently has `const recommendations: RecommendationBlockProps[] = [];` — this story adds at least one item.
- Architecture: Trust & credibility content in `app/recommendations/page.tsx`, `components/sections/RecommendationBlock.tsx`. [Source: architecture.md]
- UX: RecommendationBlock — quote or short excerpt, attributor (name, role), optional link to full PDF; use shadcn Card and typography. [Source: ux-design-specification.md]
- Assets: PRD/epics reference "Lettre de recommandation Anne-Claire Petitcol". Repo has `Assets/` (e.g. Websites list.txt); if recommendation letter PDF exists in Assets or public, link to it. Otherwise use inline quote + name/role from defined content.

### Project Structure Notes

- **app:** Only change `app/recommendations/page.tsx` — set `recommendations` array to at least one object with quote, attributorName, attributorRole; optionally link, linkLabel.
- **components:** No new components. Reuse `RecommendationBlock` from Story 3.1; do not duplicate or rename.
- **lib:** Optional: add `lib/recommendations.ts` or `content/recommendations.ts` for structured data if you prefer data separate from page (not required for MVP; inline array in page is acceptable).

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 3, Story 3.2, FR9]
- [Source: _bmad-output/planning-artifacts/architecture.md — Trust & credibility, RecommendationsBlock]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — RecommendationBlock / TrustBlock]
- [Source: app/recommendations/page.tsx — current empty recommendations array]
- [Source: components/sections/RecommendationBlock.tsx — props and styling]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Do not create new routes or components.** Use existing `/recommendations` page and `RecommendationBlock`. [Source: Story 3.1]
- **Data source:** At least one recommendation. Content from (a) Assets (e.g. Anne-Claire Petitcol letter — extract short quote + name/role; optional link to PDF in public/), or (b) defined structured content (quote, attributorName, attributorRole). Inline array in `app/recommendations/page.tsx` is acceptable; or move to `lib/recommendations.ts` / `content/recommendations.ts` if preferred. [Source: AC#1]
- **RecommendationBlockProps:** `quote?`, `attributorName?`, `attributorRole?`, `link?`, `linkLabel?`. All except link/linkLabel should be populated for the first recommendation. [Source: components/sections/RecommendationBlock.tsx]
- **Filtering:** Page already filters with `hasContent(rec)` — only items with at least one of quote, attributorName, attributorRole, link are rendered. Ensure your entry has content so it is not filtered out. [Source: app/recommendations/page.tsx]
- **Optional PDF link:** If a recommendation PDF exists (e.g. in `public/recommendations/` or similar), set `link` to path or URL and `linkLabel` (e.g. "Read full recommendation" or "View letter (PDF)"). Use `target="_blank"` and `rel="noopener noreferrer"` for external/PDF (handled inside RecommendationBlock). [Source: AC#2, NFR-S2]
- **Accessibility:** RecommendationBlock uses semantic blockquote, CardTitle/CardDescription, focus-visible link. No change required unless adding new UI. [Source: NFR-A1, NFR-A2]

### Architecture compliance

- **No root src/.** Code under `app/`, `components/`, `lib/`. [Source: architecture.md]
- **Naming:** PascalCase components; kebab-case routes. RecommendationBlock already correct. [Source: architecture.md]
- **Structure:** Section components in `components/sections/`; page composes them. Do not put recommendation data in `components/`; keep in app page or lib/content. [Source: architecture.md]
- **Stack:** Next.js App Router, Tailwind, shadcn/ui, Bun. Server Components by default; recommendations page is server-rendered. [Source: architecture.md]

### Library and framework requirements

| Package / API | Purpose | Notes |
|--------------|---------|--------|
| Next.js | Page, metadata | Keep existing buildMetadata; no new route |
| shadcn/ui | Card, typography (via RecommendationBlock) | Already used in RecommendationBlock |
| lib/metadata | buildMetadata | Retain in app/recommendations/page.tsx |

No new npm packages. Reuse existing RecommendationBlock and design tokens.

### File structure requirements

- **Update:** `app/recommendations/page.tsx` — set `recommendations` to an array with at least one object: `{ quote, attributorName, attributorRole, link?, linkLabel? }`. Optionally add `lib/recommendations.ts` or `content/recommendations.ts` and import.
- **Do not:** Create new components for recommendations, add new routes, or change RecommendationBlock props contract. Do not break Nav or metadata.

### Testing requirements

- Manual: Open `/recommendations`; confirm at least one recommendation block is visible with quote and attribution; confirm optional link works if present. Keyboard tab and focus visible. No automated tests required for MVP per architecture.

### Previous story intelligence (Story 3.1)

- **RecommendationBlock** lives in `components/sections/RecommendationBlock.tsx` with props: quote, attributorName, attributorRole, link, linkLabel. Returns null if no content; page filters with `hasContent(rec)` so only entries with at least one of quote/attributorName/attributorRole/link are rendered.
- **Page:** `app/recommendations/page.tsx` — section, h1 "Recommendations", supporting copy; empty state when `itemsWithContent.length === 0`; list of RecommendationBlock when data present. Layout: max-w-3xl, px-4 py-[var(--section-gap)] sm:px-6 sm:py-24.
- **Code review (3.1):** Filter recommendations so only items with content are shown; type from RecommendationBlockProps; list key `rec-${i}`. Reuse same patterns; do not re-add unfiltered list.

### Project context reference

- Product: Christy Sebastini portfolio. Epic 3 = Trust & credibility (FR8–FR10). Story 3.1 = structure + RecommendationBlock; Story 3.2 = at least one recommendation in context (e.g. Anne-Claire Petitcol); Story 3.3 = attestations/documents. [Source: epics.md, prd.md]
- No project-context.md. Content can be real (from Assets) or placeholder quote/name/role for MVP; ensure it reads credibly.

### Story completion status

- **Status:** ready-for-dev
- **Completion note:** Ultimate context engine analysis completed — comprehensive developer guide created.

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
