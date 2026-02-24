# Code Review: Story 2-1 — Projects list page with project cards

**Reviewed:** 2026-02-24  
**Story file:** `2-1-projects-list-page-with-project-cards.md`  
**Story key:** `2-1-projects-list-page-with-project-cards`

---

## Git vs Story Discrepancies

**Discrepancies found:** 1 (documentation scope)

| Type | Detail |
|------|--------|
| MEDIUM | Uncommitted/modified files outside 2.1 File List: `app/about/page.tsx`, `app/contact/page.tsx`, `app/layout.tsx`, `app/page.tsx`, `app/recommendations/page.tsx`, `app/sitemap.ts`, `public/og-image.png`. These are not listed in the story's File List. If they were changed in 2.1, they should be documented; otherwise confirm they are from Story 1.8 and consider committing 1.8 separately. |

All files in the story File List are present and modified/added in git as claimed.

---

## Issues Summary

| Severity | Count |
|----------|--------|
| CRITICAL | 0 |
| HIGH     | 0 |
| MEDIUM   | 1 |
| LOW      | 3 |

---

## AC Validation

| AC | Status | Evidence |
|----|--------|----------|
| AC1: List/grid of projects, distinguishable, link to view more | IMPLEMENTED | `app/projects/page.tsx`: grid of `ProjectCard`; each card has title, optional meta, link to `/projects/[slug]` (`ProjectCard.tsx` L44–54). |
| AC2: Design system, responsive 1/2/3 cols, Skeleton loading | IMPLEMENTED | Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`; `app/projects/loading.tsx` uses Skeleton grid; Card from shadcn. |

---

## Task Audit

All tasks marked [x] were verified done:

- **Data source:** `lib/projects.ts` — `Project` type, `getProjects()`, `getProjectBySlug()`, camelCase, placeholder entries (Ubisoft, Transavia, ViaMapa, entrepreneurial, Cinabre Paris).
- **ProjectCard:** `components/sections/ProjectCard.tsx` — Card, title, optional thumbnail, meta (role/period/domain), CTA link to `/projects/[slug]`, min-h/min-w 44px, `motion-reduce:transition-none`.
- **Projects page:** Server Component, grid 1/md:2/lg:3, semantic `<ul>`/`<li>`, `aria-labelledby="projects-heading"`, metadata via `buildMetadata`.
- **Loading:** `app/projects/loading.tsx` — Skeleton grid matching page layout, `aria-busy`, `aria-label`.
- **Accessibility:** List semantics, heading, focus order, alt text on thumbnail, prefers-reduced-motion respected.

---

## MEDIUM Issues

### 1. Files changed in git but not in story File List

**Location:** Story Dev Agent Record → File List  
**Finding:** Git shows modifications/untracked in: `app/about/page.tsx`, `app/contact/page.tsx`, `app/layout.tsx`, `app/page.tsx`, `app/recommendations/page.tsx`, `app/sitemap.ts`, `public/og-image.png`. None appear in the 2.1 File List.  
**Impact:** Unclear whether 2.1 touched these (e.g. global layout/metadata) or they are from 1.8; reduces traceability.  
**Recommendation:** Either add any files actually changed in 2.1 to the File List, or add a short note that these changes are from 1.8 and not part of 2.1.

---

## LOW Issues

### 2. Empty `CardContent` in ProjectCard

**Location:** `components/sections/ProjectCard.tsx` L42  
**Finding:** `<CardContent className="flex-1" />` is empty; used only for flex spacing so the footer stays at the bottom.  
**Impact:** Cosmetic/structure only; could remove and use `flex-1` on a wrapper if preferred.  
**Recommendation:** Optional cleanup; no functional change required.

### 3. Loading skeleton count vs actual list length

**Location:** `app/projects/loading.tsx` L29  
**Finding:** Loading shows 6 skeleton cards (`[1,2,3,4,5,6].map`); actual `getProjects()` returns 5 projects.  
**Impact:** Minor visual mismatch during route transition.  
**Recommendation:** Consider a constant (e.g. 6) or matching a typical count; acceptable as-is for MVP.

### 4. Screen reader announcement for loading state

**Location:** `app/projects/loading.tsx`  
**Finding:** `aria-busy="true"` and `aria-label="Loading projects"` on the list help; no `aria-live` region to announce “Loading” to screen readers.  
**Impact:** Some users may not hear an explicit loading announcement.  
**Recommendation:** Optional: add a visually hidden live region with “Loading projects” for screen readers.

---

## What was not reviewed

- `_bmad/`, `_bmad-output/` (excluded per workflow).
- Non–source files (e.g. `default-wifi-powersave-on.conf`, `fix-wifi-arch.sh`).
- Automated tests (none required for this story per architecture).

---

## Conclusion

- **Story status:** All 2.1 Acceptance Criteria and tasks are implemented and match the story.
- **Recommended next step:** Resolve MEDIUM (document or clarify scope of changed files), then mark review complete and set story status to **done** (or **in-progress** if you want the MEDIUM fixed first).
