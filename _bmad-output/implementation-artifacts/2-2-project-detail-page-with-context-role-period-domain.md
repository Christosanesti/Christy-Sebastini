# Story 2.2: Project detail page with context (role, period, domain)

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to open at least one project and see context (e.g. role, period, domain),
so that I understand what Christy did (FR5).

## Acceptance Criteria

1. **Given** I am on the Projects list  
   **When** I click a project (e.g. Ubisoft, Transavia, ViaMapa)  
   **Then** I am taken to a project detail page (e.g. `/projects/[slug]`)  
   **And** the detail page shows context: at least role, period, or domain (and other fields as defined in content)

2. **Given** the project detail page  
   **When** it is rendered  
   **Then** it has its own metadata (title/description) for SEO  
   **And** navigation back to Projects or to other sections is available (FR18)

## Tasks / Subtasks

- [x] Implement project detail route and data (AC: #1, #2)
  - [x] Ensure `app/projects/[slug]/page.tsx` exists; use existing `getProjectBySlug(slug)` from `lib/projects.ts` for data
  - [x] Handle not-found: return 404 or notFound() when slug has no matching project; preserve design system on error/not-found
- [x] Build detail page content and layout (AC: #1)
  - [x] Display project title and context: at least role, period, or domain (match `Project` type: slug, title, thumbnail?, role?, period?, domain?)
  - [x] Optional: show thumbnail/logo if present; semantic structure (heading, sections); back link to `/projects`
- [x] Metadata and navigation (AC: #2)
  - [x] Set page-specific metadata (title, description) via Next.js metadata API or `lib/metadata.ts` pattern; use project title and context in description
  - [x] Ensure nav (header) is available so user can reach Projects or other sections (FR18)
- [x] Accessibility and polish (AC: #2)
  - [x] Semantic HTML; keyboard and focus order; alt text for images; respect `prefers-reduced-motion` if any motion

## Dev Notes

- FR5 and architecture: "Visitors can open at least one project to see context (role, period, domain)." [Source: epics.md, architecture.md]
- Current state: Projects list (2.1) exists; cards link to `/projects/[slug]`. `lib/projects.ts` has `getProjectBySlug(slug)` and `Project` type with slug, title, thumbnail?, role?, period?, domain?. Detail route does not exist yet.
- Story 2.3 will integrate real content from Assets; this story uses existing project data shape and adds the detail page only.

### Project Structure Notes

- **app:** Add `app/projects/[slug]/page.tsx` (and optionally `app/projects/[slug]/not-found.tsx` or use root not-found). Compose layout and page; import from `components/` and `lib/projects`.
- **components:** Reuse or extend section components if needed (e.g. a `ProjectDetailSection` or inline content in page). No new section required if page composes existing layout + content.
- **lib:** Use existing `lib/projects.ts` (getProjectBySlug). Use `lib/metadata.ts` pattern for dynamic metadata (buildMetadata with params).

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 2, Story 2.2, FR5]
- [Source: _bmad-output/planning-artifacts/architecture.md — Projects (FR4–FR7), app/projects/[slug]/page.tsx, Naming, Structure]
- [Source: lib/projects.ts — Project type, getProjectBySlug]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Data:** No database. Project detail from `lib/projects.ts`: `getProjectBySlug(slug: string)` returns `Project | undefined`. Project shape: `{ slug, title, thumbnail?, role?, period?, domain? }` (camelCase). [Source: architecture.md — Data Architecture; lib/projects.ts]
- **Routing:** Dynamic segment `[slug]`. Route: `app/projects/[slug]/page.tsx`. When slug has no match, call `notFound()` (Next.js) so 404 or custom not-found is shown. [Source: architecture.md — Project Structure]
- **Components:** Server Component for detail page (fetch project in page; no client state required for static content). Use Client Components only for interactivity if needed; do not block LCP. [Source: architecture.md — Frontend Architecture]
- **Metadata:** Per-page metadata required (AC#2). Use `generateMetadata` with params (slug) or `buildMetadata`-style helper; include project title and short context (e.g. role, period, domain) in title/description for SEO. [Source: Story 1.8, lib/metadata.ts]
- **Navigation:** Global nav already in layout; ensure "Projects" and other links are present. Add in-page "Back to Projects" link for orientation (FR18). [Source: architecture.md — Navigation]
- **Accessibility:** Semantic structure (h1 for project title, sections for context); focus order; alt text for images; `prefers-reduced-motion` for any motion. [Source: NFR-A1, NFR-A2, NFR-A3]

### Architecture compliance

- **No root `src/`.** All code under `app/`, `components/`, `lib/`. [Source: architecture.md — Enforcement]
- **Naming:** PascalCase for components; kebab-case for route segments (`[slug]`); camelCase for functions and data. [Source: architecture.md — Naming Patterns]
- **Structure:** `app/projects/[slug]/page.tsx` composes layout and imports from `components/` and `lib/`. [Source: architecture.md — Structure Patterns]
- **Stack:** Next.js (App Router), Tailwind, shadcn/ui, Bun. No new dependencies; reuse existing projects data and metadata pattern. [Source: architecture.md — Mandatory stack]

### Library and framework requirements

| Package / API       | Purpose                                      | Notes                                                                 |
|---------------------|----------------------------------------------|-----------------------------------------------------------------------|
| Next.js App Router  | Dynamic route `app/projects/[slug]/page.tsx` | Use `params.slug` (or `params Promise` in Next 15); call getProjectBySlug(slug); notFound() if undefined |
| Next.js Metadata    | Page title and description                  | generateMetadata({ params }) or equivalent; use project title + context |
| shadcn/ui           | Typography, spacing, optional Card           | Match design system from 1.7 and projects list page                   |
| Tailwind CSS        | Layout, spacing                              | Consistent with rest of site                                          |

No new npm packages required.

### File structure requirements

- **Create:**  
  - `app/projects/[slug]/page.tsx` — Server Component; read `params.slug`, call `getProjectBySlug(slug)`; if undefined, `notFound()`; render project title and context (role, period, domain); set metadata; include "Back to Projects" link.  
  - Optionally `app/projects/[slug]/not-found.tsx` for slug-specific 404 (or rely on root not-found).
- **Update (if needed):**  
  - `lib/metadata.ts` — only if adding a helper for project detail metadata (e.g. `buildProjectMetadata(project)`); otherwise inline generateMetadata in page.
- **Do not create:** New data sources (use lib/projects.ts); no CMS or API routes; no changes to list page except optional cross-links.

### Testing requirements

- Manual: From `/projects`, click a project card → land on `/projects/[slug]`; see project title and context (role, period, domain). Page has distinct title/description in tab and preview. "Back to Projects" and nav work. Visit `/projects/nonexistent` → 404/not-found. Keyboard nav and focus order; images have alt text.
- No automated tests required for MVP per architecture.

### Previous story intelligence

- **Story 2.1:** Projects list at `/projects` with ProjectCard grid; each card links to `/projects/[slug]`. Data in `lib/projects.ts`: `getProjects()`, `getProjectBySlug(slug)`, `Project` type (slug, title, thumbnail?, role?, period?, domain?). Components: `ProjectCard`, `components/ui/card.tsx`, `components/ui/skeleton.tsx`. List page uses Server Component and `loading.tsx` with Skeleton. [Source: 2-1-projects-list-page-with-project-cards.md]
- **Patterns to reuse:** Per-page metadata via `lib/metadata.ts` / buildMetadata; Server Components; shadcn and Tailwind; no root `src/`; content from `lib/`.
- **Files to align with:** `app/projects/page.tsx` (same layout/nav); `app/about/page.tsx`, `app/contact/page.tsx` for section spacing and design system.

### Git intelligence summary

- Recent work: Story 2.1 added `lib/projects.ts`, ProjectCard, projects list page, loading.tsx, card and skeleton UI. Detail route was explicitly out of scope. Implement detail route and page in this story without changing list page behavior (links already point to `/projects/[slug]`).

### Project context reference

- No `project-context.md` found. Key product: Christy Sebastini portfolio. Projects to surface: Ubisoft, Transavia, ViaMapa, entrepreneurial work, Cinabre Paris (data already in lib/projects.ts). [Source: epics, PRD, Story 2.1]

### Story completion status

- **Status:** ready-for-dev  
- **Completion note:** Ultimate context engine analysis completed — comprehensive developer guide created.

---

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

- Implemented `app/projects/[slug]/page.tsx`: Server Component; async params (Next 16); getProjectBySlug(slug), notFound() when undefined; generateMetadata with buildMetadata(project title + context); Back to Projects link; semantic article/header/section with h1 and dl/dt/dd for role/period/domain; optional thumbnail with descriptive alt.
- Implemented `app/projects/[slug]/not-found.tsx`: slug-level 404 with same layout spacing and Back to Projects link. No automated tests (MVP per story); manual verification: build passes, route /projects/[slug] generated.

### File List

- app/projects/[slug]/page.tsx (new)
- app/projects/[slug]/not-found.tsx (new)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modified)
- _bmad-output/implementation-artifacts/2-2-project-detail-page-with-context-role-period-domain.md (modified)

## Change Log

- 2026-02-24: Story 2.2 implementation complete. Added project detail route and page; metadata and not-found; accessibility and polish.
