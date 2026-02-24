# Story 2.1: Projects list page with project cards

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see a list of Christy's projects (employers, clients, or initiatives) as cards or list items,
so that I can scan what she has done (FR4, FR6).

## Acceptance Criteria

1. **Given** I am on the site  
   **When** I go to the Projects page (or Projects section)  
   **Then** I see a list or grid of projects, each distinguishable (e.g. title, optional thumbnail)  
   **And** each project has a way to open or view more (e.g. link to detail or expand)

2. **Given** the projects list  
   **When** it is rendered  
   **Then** it uses the design system (e.g. ProjectCard or equivalent) and is responsive (e.g. 1 column on mobile, 2–3 on desktop)  
   **And** loading state uses a Skeleton or equivalent where content is async

## Tasks / Subtasks

- [x] Implement projects data source (AC: #1, #2)
  - [x] Add structured project data (e.g. in code, `lib/projects.ts` or `content/projects.json`) with at least: title, slug, optional thumbnail/logo path; optional role, period, domain for card or future detail
  - [x] Ensure data shape is consistent with architecture (camelCase; single source for list and future detail page)
- [x] Build ProjectCard component (AC: #1, #2)
  - [x] Create `components/sections/ProjectCard.tsx` (or under `components/ui` if purely presentational); use shadcn + Tailwind; show title, optional thumbnail, and link/CTA to view more (e.g. to `/projects/[slug]` or expand)
  - [x] Match design system (typography, spacing, hierarchy per architecture and Epic 1.7); touch targets ≥ 44px
- [x] Build Projects list page (AC: #1, #2)
  - [x] Update `app/projects/page.tsx` to fetch or import project list and render a grid/list of ProjectCard components
  - [x] Responsive: 1 column on mobile, 2–3 on desktop (Tailwind breakpoints sm/md/lg)
  - [x] Use Skeleton (shadcn or wrapper) for loading state if content is async; do not block LCP with client-only loading
- [x] Accessibility and polish (AC: #2)
  - [x] Semantic structure (e.g. list or grid with proper headings); keyboard and focus order; alt text for any project images
  - [x] Respect `prefers-reduced-motion` if any motion on cards (e.g. hover); no critical content behind motion

## Dev Notes

- FR4, FR6 and architecture: "Visitors can see a list of Christy's projects; distinguish between different projects (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial)." [Source: epics.md, architecture.md, prd.md]
- Current state: `app/projects/page.tsx` exists with placeholder (title + short text). Metadata already set (Story 1.8). No `ProjectCard`, `ProjectsList`, or project data yet. No `app/projects/[slug]` yet (Story 2.2).
- Story 2.3 will integrate real content from Assets; this story can use inline or file-based list that matches the structure needed for 2.2 and 2.3 (slug, title, optional image, optional role/period/domain).

### Project Structure Notes

- **app:** `app/projects/page.tsx` — compose layout and page; import list/card from `components/`. No business logic in app beyond composition.
- **components:** `components/sections/ProjectCard.tsx` (and optionally `ProjectsList.tsx` if you want a wrapper). Architecture lists `ProjectCard`, `ProjectsList` in sections. [Source: architecture.md — Project Structure & Boundaries]
- **lib:** Project data can live in `lib/projects.ts` or `lib/data/projects.ts` (array or getter); or `content/projects.json` if using file-based content. No React components in lib.
- **public/Assets:** Thumbnails/logos can live in `public/` (e.g. `public/images/projects/`); reference from project data. Assets folder has project PDFs (e.g. Ubisoft, Transavia, ViaMapa); actual images for cards can be placeholders or from Assets where applicable.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 2, Story 2.1, FR4, FR6]
- [Source: _bmad-output/planning-artifacts/architecture.md — Projects (FR4–FR7), components/sections/ProjectCard, ProjectsList, Naming, Structure, Loading states]
- [Source: _bmad-output/planning-artifacts/prd.md — Projects & Experience, FR4–FR6, Client Assets (UBISOFT, Transavia, ViaMapa, etc.)]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Data:** No database. Project list from in-repo source: TypeScript/JSON array or Markdown. Suggested shape per project: `{ id or slug, title, optional image/thumbnail, optional role, period, domain }`. Use camelCase. Same shape should support future detail page (Story 2.2) and real content (Story 2.3). [Source: architecture.md — Data Architecture]
- **Routing:** Projects list at `/projects` (existing). Each card should link to `/projects/[slug]` so Story 2.2 can add the detail route. Implement list and cards only; detail page is out of scope for this story.
- **Components:** Server Component by default for list page. Use Client Components only if needed for interactivity (e.g. hover animation); prefer CSS or minimal JS. Lazy-load 3D/heavy only; do not block LCP. [Source: architecture.md — Frontend Architecture]
- **Loading:** Use Skeleton (shadcn Skeleton or wrapper) for list/cards when content is async. Avoid spinner-only where a skeleton is feasible. [Source: architecture.md — Process Patterns, project rules]
- **Responsive:** Mobile-first; 1 column on small, 2–3 on desktop (Tailwind sm/md/lg). Touch targets ≥ 44px. [Source: architecture.md, PRD]
- **Accessibility:** Semantic list or grid; headings; focus order; alt text for images; `prefers-reduced-motion` for any motion. [Source: NFR-A1, NFR-A2, NFR-A3]

### Architecture compliance

- **No root `src/`.** All code under `app/`, `components/`, `lib/`. [Source: architecture.md — Enforcement]
- **Naming:** PascalCase for components (`ProjectCard`, `ProjectsList`); kebab-case for routes (`app/projects/page.tsx`, future `app/projects/[slug]/page.tsx`); camelCase for functions and data. [Source: architecture.md — Naming Patterns]
- **Structure:** `app/projects/page.tsx` composes layout and imports from `components/`. Section components in `components/sections/`. Data/helpers in `lib/`. [Source: architecture.md — Structure Patterns]
- **Stack:** Next.js (App Router), Tailwind, shadcn/ui, Bun. No new dependencies required unless you add a content loader (e.g. gray-matter for MD); prefer TS/JSON for MVP. [Source: architecture.md — Mandatory stack]

### Library and framework requirements

| Package / API     | Purpose                          | Notes                                                |
|------------------|----------------------------------|------------------------------------------------------|
| Next.js App Router | `/projects` page, future `[slug]` | Use existing `app/projects/page.tsx`; add data + components |
| shadcn/ui        | Card, Skeleton, typography       | Use Card or custom card with shadcn tokens; Skeleton for loading |
| Tailwind CSS     | Layout, responsive grid          | Grid: e.g. `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |

No new npm packages required. Framer Motion/GSAP not required for list/cards unless you add subtle hover; if so, respect `prefers-reduced-motion`.

### File structure requirements

- **Create or update:**  
  - `components/sections/ProjectCard.tsx` — one card component (props: project item, optional link to `/projects/[slug]`).  
  - Optionally `components/sections/ProjectsList.tsx` — grid wrapper that maps projects to ProjectCard.  
  - `lib/projects.ts` (or `lib/data/projects.ts`) — export project list (array or async getter).  
  - Update `app/projects/page.tsx` — import data and section components; render list/grid; add Skeleton for loading if async.
- **Do not create:** `app/projects/[slug]/page.tsx` in this story (Story 2.2). Do not add CMS or API routes.

### Testing requirements

- Manual: Load `/projects`; see list/grid of project cards; responsive on narrow and wide viewport; each card has a way to “view more” (link or button). Loading state shows Skeleton when applicable. Keyboard nav and focus order work; images have alt text.
- No automated tests required for MVP per architecture; if added later, keep in `__tests__/` or `tests/`.

### Previous story intelligence

- **Epic 1 (1.1–1.8):** App is initialized with Next.js, shadcn, Tailwind, routes for Home, About, Projects, Recommendations, Contact. Design system applied (1.7); metadata and sitemap on all main pages (1.8). Projects page currently placeholder only.
- **Patterns to reuse:** Per-page metadata via `lib/metadata.ts` and `buildMetadata()`; Server Components by default; shadcn components and Tailwind tokens; no `src/` at root; content in `lib/` or `app/` composition only.
- **Files to align with:** `app/about/page.tsx`, `app/contact/page.tsx` for layout and section-gap; `components/sections/HeroSection.tsx`, `AboutSection.tsx`, `ContactBlock.tsx` for section structure and design system.

### Project context reference

- No `project-context.md` found. All context from epics, PRD, and architecture. Key product name: Christy Sebastini; key projects to surface later: Ubisoft, Transavia, ViaMapa, entrepreneurial work, Cinabre Paris (Story 2.3 will plug real content).

### Story completion status

- **Status:** ready-for-dev  
- **Completion note:** Ultimate context engine analysis completed — comprehensive developer guide created.

---

## Dev Agent Record

### Agent Model Used

Amelia (Dev Agent) / workflow dev-story

### Debug Log References

- Implemented projects data in `lib/projects.ts` (Project type, getProjects, getProjectBySlug); placeholder entries for Ubisoft, Transavia, ViaMapa, entrepreneurial, Cinabre Paris.
- Added shadcn-style Card and Skeleton in `components/ui/card.tsx` and `components/ui/skeleton.tsx` (no new npm deps).
- ProjectCard: Link to `/projects/[slug]`, title, optional meta (role/period/domain), CTA "View project" (min-h/min-w 44px), optional thumbnail with descriptive alt; `motion-reduce:transition-none` on card.
- Projects page: Server Component; grid 1 col / md:2 / lg:3; semantic `<ul>`/`<li>`, `aria-labelledby="projects-heading"`; `loading.tsx` with Skeleton grid for route loading.
- Fixed pre-existing lint in ContactBlock (setState in effect) via startTransition so full lint passes.
- Code review fixes: File List scope note added (other modified files from 1.8); loading.tsx given sr-only aria-live region for "Loading projects" (a11y).

### Completion Notes List

- AC1: Projects page shows list/grid of project cards; each has title, optional meta, link to view more (`/projects/[slug]`).
- AC2: Design system (Card, typography, spacing); responsive 1/2/3 cols; loading state uses Skeleton in `app/projects/loading.tsx`.
- Accessibility: list semantics, heading, focus order, alt text on images, prefers-reduced-motion respected.

### Change Log

- 2026-02-24: Implemented projects data source, ProjectCard, projects list page with grid and Skeleton loading; accessibility and polish. Fixed ContactBlock lint (startTransition).
- 2026-02-24: Code review (AI): File List scope clarified; loading state announced to screen readers (aria-live in loading.tsx). MEDIUM/LOW findings addressed.

### File List

- lib/projects.ts (new)
- lib/metadata.ts (unchanged; reused)
- components/ui/card.tsx (new)
- components/ui/skeleton.tsx (new)
- components/sections/ProjectCard.tsx (new)
- app/projects/page.tsx (updated)
- app/projects/loading.tsx (new)
- components/sections/ContactBlock.tsx (updated — lint fix)

**Note:** Other modified files in repo (app/about, app/contact, app/layout, app/page, app/recommendations, app/sitemap.ts, public/og-image.png) are from Story 1.8 or prior; not part of 2.1 scope.
