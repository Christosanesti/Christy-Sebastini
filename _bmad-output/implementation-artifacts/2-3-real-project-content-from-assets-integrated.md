# Story 2.3: Real project content from Assets integrated

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see real projects (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial work) with correct labels and content,
so that I can distinguish between different projects and trust the content (FR4, FR6).

## Acceptance Criteria

1. **Given** project content is sourced from Assets or structured content (MD/JSON)  
   **When** the Projects list and detail pages are loaded  
   **Then** at least the key projects from the PRD Assets inventory (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial, Cinabre Paris) are present and distinguishable  
   **And** each project's title and context are correct and displayed in the right sections (no wrong content on wrong project)

2. **Given** assets (e.g. logos, PDFs) are referenced  
   **When** they are used on project cards or detail  
   **Then** paths are correct and assets are accessible (or fallback if missing)  
   **And** images have appropriate alt text for accessibility

## Tasks / Subtasks

- [x] Source real project content from Assets and wire to list/detail (AC: #1)
  - [x] Identify Assets to use per project (UBISOFT.pdf, Transavia.pdf, Présentation-ViaMapa.pptx, Projet entrepreneurial.pdf, Cinabre-paris.com.pdf; Logo-Ubisoft.pdf for thumbnail)
  - [x] Decide content format: keep data in lib/projects.ts enriched from Assets, or add MD/JSON under content/ and read at build time
  - [x] Update lib/projects.ts (or content source) with correct titles and context (role, period, domain) per project; ensure no content swap between projects
  - [x] Verify Projects list and project detail pages render correct project-specific content
- [x] Wire assets (logos, PDFs) and accessibility (AC: #2)
  - [x] Place or reference assets (e.g. under public/ or public/images/projects/) with stable paths; document in code or README
  - [x] Use asset paths in project thumbnail/logo and optional links (e.g. “View PDF”); implement fallback if file missing
  - [x] Add descriptive alt text for all project images; ensure links to PDFs have descriptive labels

## Dev Notes

- FR4, FR6 and epics: Real projects from PRD Assets inventory; each project distinguishable; titles and context correct. [Source: epics.md, prd.md]
- Current state: Story 2.1 (list) and 2.2 (detail) done. Data in lib/projects.ts is placeholder; Story 2.3 replaces/enriches with real content from Assets.
- Assets inventory (PRD): UBISOFT.pdf, Logo-Ubisoft.pdf, Transavia.pdf, Présentation-ViaMapa.pptx, Projet entrepreneurial.pdf, Cinabre-paris.com.pdf. Use for project copy and optional thumbnails/links. [Source: prd.md — Client Assets Inventory]

### Project Structure Notes

- **lib:** Update lib/projects.ts with real project data (or add content/projects.json / content/projects/*.md and a reader). Single source of truth; no duplicate project definitions.
- **public / Assets:** Reference logos/PDFs from public/ (e.g. copy or symlink from Assets) so paths work in production. Architecture: “Assets/ is canonical; reference via public/ or documented paths.” [Source: architecture.md — Structure Patterns, Data boundaries]
- **components:** No new components required unless adding e.g. “View PDF” link component; reuse ProjectCard and detail page.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 2, Story 2.3, FR4, FR6]
- [Source: _bmad-output/planning-artifacts/prd.md — Client Assets Inventory]
- [Source: _bmad-output/planning-artifacts/architecture.md — Projects (FR4–FR7), Data boundaries, Assets]
- [Source: lib/projects.ts — Project type, getProjects, getProjectBySlug]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Data source:** No database. Projects come from repo: either keep/expand lib/projects.ts or add structured content (e.g. content/projects.json or content/projects/*.md) and a reader. Must include at least: Ubisoft, Transavia, ViaMapa, entrepreneurial work, Cinabre Paris, with correct title and context (role, period, domain) per project. [Source: architecture.md — Data Architecture; prd.md — Assets]
- **Correctness:** Each project’s title and context must be correct and shown in the right places (list + detail). No mixing content between projects. [Source: Story AC#1]
- **Assets (logos/PDFs):** Store under public/ (e.g. public/images/projects/, public/documents/) or document path from Assets/. Use in ProjectCard (thumbnail) and/or detail (link to PDF). If file missing, show fallback (e.g. no image or “Document not available”). [Source: architecture.md — Assets, public/]
- **Accessibility:** All images have descriptive alt text; links to PDFs have clear labels (e.g. “View Ubisoft summary (PDF)”). [Source: AC#2, NFR-A1]
- **Routing and components:** No change to routes. Reuse app/projects/page.tsx, app/projects/[slug]/page.tsx, ProjectCard, and detail layout; only data and asset paths change. [Source: Story 2.1, 2.2]

### Architecture compliance

- **No root src/.** Code under app/, components/, lib/. [Source: architecture.md — Enforcement]
- **Naming:** PascalCase components; kebab-case routes; camelCase functions/data. [Source: architecture.md — Naming]
- **Single source of truth:** One place for project list data (lib/projects.ts or content/projects); one convention for asset paths. [Source: architecture.md — Structure, Data boundaries]
- **Stack:** Next.js (App Router), Tailwind, shadcn/ui, Bun. No new dependencies unless needed for PDF/PPTX (e.g. link only is fine). [Source: architecture.md — Mandatory stack]

### Library and framework requirements

| Package / API   | Purpose                          | Notes                                                                 |
|-----------------|----------------------------------|-----------------------------------------------------------------------|
| Next.js         | List/detail pages, metadata      | No route changes; same getProjects/getProjectBySlug usage              |
| shadcn/ui       | Cards, typography, layout        | Same as 2.1/2.2; optional Image with fallback                        |
| Existing lib    | lib/projects.ts                  | Extend or replace with real data; keep Project type and getters       |

No new npm packages required for MVP (links to PDFs and image paths only).

### File structure requirements

- **Update:** lib/projects.ts (or add content/projects.json + small reader in lib/) with real project entries: slug, title, thumbnail path (optional), role, period, domain. Add optional field for document link (e.g. pdfUrl) if linking to PDFs.
- **Assets:** Ensure Assets (or copies in public/) are referenced with correct paths. Prefer public/images/projects/ for logos, public/documents/ or similar for PDFs; document in README or code comment.
- **Do not create:** New routes, new pages, or duplicate project data. Do not break existing list/detail behavior.

### Testing requirements

- Manual: Load /projects and /projects/[slug] for each project. Confirm titles and context (role, period, domain) match and are not swapped. Confirm thumbnails/links resolve or fallback. Check alt text and link labels. No automated tests required for MVP per architecture.

### Previous story intelligence

- **Story 2.1:** Projects list at /projects; ProjectCard grid; data from lib/projects.ts (getProjects, getProjectBySlug, Project type). [Source: 2-1]
- **Story 2.2:** Detail page at app/projects/[slug]/page.tsx; getProjectBySlug(slug); notFound() when slug missing; generateMetadata; Back to Projects link; semantic structure (h1, role/period/domain). [Source: 2-2-project-detail-page-with-context-role-period-domain.md]
- **Patterns to reuse:** Same Project type and getters; Server Components; metadata pattern; no root src/; shadcn and Tailwind. Story 2.3 only changes data and asset paths, not route or component structure.

### Git intelligence summary

- Recent work: Story 2.2 added project detail route and page; lib/projects.ts already has placeholder entries for Ubisoft, Transavia, ViaMapa, entrepreneurial, Cinabre Paris. Replace placeholders with real content and wire Assets; do not remove or rename slugs that are already linked from the list.

### Project context reference

- No project-context.md. Product: Christy Sebastini portfolio. Key projects from PRD: Ubisoft, Transavia, ViaMapa, entrepreneurial, Cinabre Paris. Assets in Assets/ (see prd.md). [Source: epics, PRD]

### Story completion status

- **Status:** ready-for-dev
- **Completion note:** Ultimate context engine analysis completed — comprehensive developer guide created.

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

- Sprint status: 2-3 marked in-progress then review. No sprint_status issues.
- Format: kept single source in lib/projects.ts; added documentUrl/documentLabel for PDF links.
- ViaMapa: document path set to PDF export (Presentation-ViaMapa.pdf); README notes PPTX export.

### Completion Notes List

- **Task 1:** lib/projects.ts updated with real project titles and context (role, period, domain) per PRD; optional documentUrl/documentLabel; thumbnail path for Ubisoft (fallback when missing). All five key projects present and distinguishable; no content swap.
- **Task 2:** public/documents/ and public/images/projects/ created with README; ProjectThumbnail client component added for image fallback on error; detail page shows optional "View … (PDF)" link with descriptive labels; alt text on all project images. Lint and build pass.
- **Code review (AI):** Document fallback for missing PDFs: ProjectDocumentLink client component (HEAD check, shows "Document not available" when 404). ProjectThumbnail fallback div now has role="img" aria-label="Image unavailable". File List updated to include not-found.tsx and ProjectDocumentLink.tsx; public/documents README notes fallback behaviour.

### File List

- lib/projects.ts
- components/sections/ProjectThumbnail.tsx
- components/sections/ProjectDocumentLink.tsx
- components/sections/ProjectCard.tsx
- app/projects/[slug]/page.tsx
- app/projects/[slug]/not-found.tsx
- public/documents/README.md
- public/images/projects/README.md
- _bmad-output/implementation-artifacts/sprint-status.yaml
