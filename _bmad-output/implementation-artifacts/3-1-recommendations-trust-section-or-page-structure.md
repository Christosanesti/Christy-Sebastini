# Story 3.1: Recommendations / Trust section or page structure

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want a dedicated place (section or page) for recommendations and attestations,
so that I can find evidence of credibility (FR8).

## Acceptance Criteria

1. **Given** I am on the site  
   **When** I go to Recommendations (or Trust) via nav or link  
   **Then** I see a section or page dedicated to credibility (recommendations, attestations, or similar)  
   **And** the section is clearly labeled and uses the design system (e.g. RecommendationBlock or TrustBlock)

2. **Given** the Recommendations/Trust area  
   **When** it is empty or has minimal content  
   **Then** an empty state or placeholder is shown (no blank block that causes confusion)  
   **And** the layout is consistent with the rest of the site

## Tasks / Subtasks

- [x] Implement Recommendations/Trust page structure (AC: #1)
  - [x] Ensure `/recommendations` route shows a dedicated credibility area (page already exists with placeholder)
  - [x] Add or compose section using design system (RecommendationBlock or TrustBlock per UX/architecture)
  - [x] Clearly label the area (e.g. "Recommendations", "Trust & Credibility") and match typography/spacing to rest of site
- [x] Empty state and layout consistency (AC: #2)
  - [x] When no recommendations/attestations content yet: show empty state or placeholder (e.g. "Recommendations coming soon" or structured empty block)
  - [x] Apply same layout tokens (e.g. --section-gap, max-width, padding) as About, Projects, Contact for consistency

## Dev Notes

- FR8: Visitor can see evidence of credibility (recommendations, attestations). [Source: epics.md, prd.md]
- Current state: `app/recommendations/page.tsx` exists with placeholder text and metadata (buildMetadata). Nav already links to `/recommendations`. No RecommendationBlock/TrustBlock component yet—Story 3.2 will add at least one recommendation; this story establishes structure and empty state.
- Architecture: Trust & credibility maps to `app/recommendations/page.tsx`, `components/sections/RecommendationsBlock.tsx` (or RecommendationBlock/TrustBlock). [Source: architecture.md — Requirements to Structure Mapping]
- UX: RecommendationBlock/TrustBlock — quote or short excerpt, attributor (name, role), optional link to full PDF; use shadcn Card and typography. [Source: ux-design-specification.md — RecommendationBlock / TrustBlock]

### Project Structure Notes

- **app:** Use existing `app/recommendations/page.tsx`; replace placeholder with structured layout and optional RecommendationBlock/TrustBlock placeholder or empty state.
- **components:** Add `components/sections/RecommendationBlock.tsx` (or `RecommendationsBlock.tsx` / TrustBlock) as the design-system component for one recommendation/attestation block—even if empty for now, so 3.2 only adds data.
- **lib:** No data source required for 3.1; Story 3.2 will wire content. Keep structure ready for future list or single block.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 3, Story 3.1, FR8]
- [Source: _bmad-output/planning-artifacts/architecture.md — Trust & credibility, components/sections/RecommendationsBlock]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — RecommendationBlock / TrustBlock]
- [Source: app/recommendations/page.tsx — current placeholder and metadata]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Route:** `/recommendations` already exists. Do not add a new route; update the existing page to a dedicated credibility section with clear heading and layout. [Source: Story 1.2, 1.8]
- **Design system:** Use shadcn Card (and typography) for the block; match spacing (--section-gap), max-width, and padding to AboutSection, projects page, ContactBlock so the page feels part of the same layout system. [Source: architecture.md — Design system; 1.7]
- **Empty state:** When there is no recommendation/attestation content yet, show an explicit empty state (e.g. "Recommendations will be featured here" or a subtle placeholder card) so the area is not a confusing blank. [Source: AC#2]
- **Component:** Introduce RecommendationBlock (or RecommendationsBlock / TrustBlock) in `components/sections/` with props suitable for later content (e.g. quote, attributor name/role, optional link). For 3.1 it can render empty or a single placeholder block. [Source: UX — RecommendationBlock anatomy]
- **Accessibility:** Semantic structure (section, heading level); any link or block focusable with visible focus; no critical content client-only (SSR). [Source: NFR-A1, NFR-A2]

### Architecture compliance

- **No root src/.** Code under `app/`, `components/`, `lib/`. [Source: architecture.md — Enforcement]
- **Naming:** PascalCase components (e.g. RecommendationBlock.tsx); kebab-case routes. [Source: architecture.md — Naming]
- **Structure:** Section components in `components/sections/`; page in `app/recommendations/page.tsx` composes section(s). [Source: architecture.md — Project Structure]
- **Stack:** Next.js App Router, Tailwind, shadcn/ui, Bun. Server Components by default. [Source: architecture.md — Mandatory stack]

### Library and framework requirements

| Package / API | Purpose | Notes |
|--------------|---------|--------|
| Next.js | Page, metadata | Keep existing buildMetadata for Recommendations page; no new route |
| shadcn/ui | Card, typography, spacing | Same as ProjectCard, AboutSection, ContactBlock |
| lib/metadata | buildMetadata | Already used in app/recommendations/page.tsx — retain |

No new npm packages. Reuse existing design tokens and --section-gap.

### File structure requirements

- **Update:** `app/recommendations/page.tsx` — replace placeholder with structured layout: heading, section wrapper, and RecommendationBlock (or empty state). Preserve metadata export.
- **Create:** `components/sections/RecommendationBlock.tsx` (or `RecommendationsBlock.tsx`) — one export; props for quote, attributor (name, role), optional link; empty/placeholder state when no content. Use shadcn Card and typography.
- **Do not:** Create new routes, move recommendations to a different path, or add root `src/`. Do not break Nav link to `/recommendations`.

### Testing requirements

- Manual: Open `/recommendations`; confirm dedicated section/page with clear label; confirm empty state or placeholder when no content; confirm layout matches other pages (gap, max-width, padding). Keyboard tab and focus visible. No automated tests required for MVP per architecture.

### Git intelligence summary

- Recent work: Project detail page and real project content (2.2, 2.3); SEO metadata and layout consistency (1.8, 1.7). Recommendations page exists as placeholder with metadata; Nav already has Recommendations link. This story adds structure and RecommendationBlock component without changing routes or nav.

### Project context reference

- No project-context.md. Product: Christy Sebastini portfolio. Epic 3 delivers trust & credibility (FR8–FR10). Story 3.1 is structure only; 3.2 adds at least one recommendation (e.g. Anne-Claire Petitcol); 3.3 adds attestations/documents. [Source: epics.md, prd.md]

### Story completion status

- **Status:** ready-for-dev
- **Completion note:** Ultimate context engine analysis completed — comprehensive developer guide created.

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

- 2026-02-24: Implemented Recommendations page structure and empty state. Created `RecommendationBlock` in `components/sections/RecommendationBlock.tsx` with props: quote, attributorName, attributorRole, link, linkLabel; uses shadcn Card and typography. Updated `app/recommendations/page.tsx`: semantic section with aria-labelledby, h1 "Recommendations", supporting copy; empty state when no recommendations ("Recommendations will be featured here" in dashed-border block); list of RecommendationBlock when data present. Layout: max-w-3xl, px-4 py-[var(--section-gap)] sm:px-6 sm:py-24 to match About/Contact. No new route; metadata preserved. Manual verification: /recommendations shows dedicated credibility area, clear label, empty state, consistent layout. No automated tests per story.
- 2026-02-25: Code review fixes (Amelia). MEDIUM: Filter recommendations so only items with content (quote, attributorName, attributorRole, or link) are rendered—avoids empty list items when RecommendationBlock would return null. LOW: Array type now uses RecommendationBlockProps from component (single source of truth). LOW: List key remains index-based (rec-${i}) until recommendations have stable ids. File List unchanged.

### File List

- app/recommendations/page.tsx (updated)
- components/sections/RecommendationBlock.tsx (new)
- _bmad-output/implementation-artifacts/sprint-status.yaml (updated)

## Change Log

- 2026-02-24: Story 3.1 implemented — RecommendationBlock component, recommendations page structure, empty state, layout consistency with About/Contact. Status → review.
- 2026-02-25: Code review (Amelia). Fixes applied: filter empty recommendation entries, type from RecommendationBlockProps, stable list keys. Status → done.
