# Story 4.2: Structured content for projects

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer or site owner,
I want project list and project detail content in a structured source (e.g. Markdown or JSON),
so that projects can be updated without editing page components (FR22, FR23).

## Acceptance Criteria

1. **Given** project data (title, slug, role, period, domain, assets, etc.) **when** it is stored in a defined structure (e.g. `content/projects.json` or one file per project in `content/projects/`) **then** the Projects list and project detail pages read from this source **and** adding or editing a project is done by updating the content source and redeploying (MVP: no CMS).

2. **Given** the structure is in place **when** content is updated **then** new or updated projects appear in the correct sections with consistent presentation (FR23) **and** slugs or IDs map correctly to detail routes (e.g. `/projects/[slug]`).

## Tasks / Subtasks

- [x] Define projects content schema and file location (AC: #1)
  - [x] Choose format: single JSON (e.g. `content/projects.json`) or one file per project (e.g. `content/projects/*.json` or `.md`). Architecture allows either; mirror 4.1 pattern (single file) for consistency unless multi-file is preferred for scalability.
  - [x] Define fields: slug, title, thumbnail (optional), role, period, domain, documentUrl, documentLabel (match current `Project` interface in `lib/projects.ts`). Use camelCase in JSON.
  - [x] Create schema in `lib/schemas/project.ts` (Zod) and ensure it validates all fields used by list/detail pages.
- [x] Add loader and types (AC: #1)
  - [x] In `lib/`: add or refactor `lib/projects.ts` to read from content file (e.g. `content/projects.json`) at build/request time. Export `getProjects()` and `getProjectBySlug(slug)` unchanged so `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` require no route changes.
  - [x] Use sync read (e.g. `fs.readFileSync`) in server context only; Zod validation via project schema; safe error messages (no raw stack to user).
- [x] Migrate existing project data to content source (AC: #1)
  - [x] Move the current hardcoded array from `lib/projects.ts` into `content/projects.json` (or chosen structure). Preserve all existing projects (Ubisoft, Transavia, ViaMapa, entrepreneurial, Cinabre Paris) and field values so behavior is unchanged.
- [x] Wire pages to loader only (AC: #1, #2)
  - [x] Ensure `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` keep calling `getProjects()` and `getProjectBySlug(slug)`; only the implementation of those functions changes (read from content file instead of in-memory array).
  - [x] Confirm slugs map correctly to `/projects/[slug]` and that list order is stable (e.g. array order in JSON).
- [x] Document and verify single source (AC: #2)
  - [x] Update `content/README.md` with projects: file path, used-by pages, how to edit, and JSON shape or schema reference.
  - [x] Remove all project data from component/code; no duplicate copy. Verify build and that list/detail pages render correctly.

## Dev Notes

- **Relevant architecture:** Data in repo (Markdown/JSON); no database. `lib/` for utils and schemas; no business logic under `app/` beyond composition. Story 4.1 established: `content/profile.json` + `lib/profile.ts` + `lib/schemas/profile.ts`; reuse the same pattern for projects (content file + lib loader + Zod schema).
- **Source tree to touch:** `lib/schemas/project.ts` (new, Zod schema for project/projects array), `lib/projects.ts` (refactor to read from content file, keep same exports), `content/projects.json` (new, migrate current data), `content/README.md` (update). No changes to `app/projects/page.tsx` or `app/projects/[slug]/page.tsx` beyond ensuring they still use `getProjects()` / `getProjectBySlug(slug)`.
- **Testing:** No test framework required for MVP. Manual check: edit `content/projects.json`, rebuild, confirm list and detail pages update; confirm slug routing still works.

### Project Structure Notes

- **Paths:** Architecture: `app/` (routes only), `components/` (sections), `lib/` (utils, schemas). Loader stays in `lib/projects.ts`; do not put content logic in `app/`. No root `src/`.
- **Naming:** camelCase in JSON and for functions; PascalCase for components. Project interface remains `Project`; schema can be `projectSchema` and `projectsSchema` (array).

### Developer Context & Guardrails

**Technical requirements**

- **Stack:** Next.js App Router, TypeScript, Tailwind, shadcn. No new runtime deps; use `fs.readFileSync` in server context (same as `lib/profile.ts`). Zod for validation.
- **Data flow:** Content file → read at build/request time in server context → `getProjects()` / `getProjectBySlug(slug)` return typed data. Pages remain Server Components that call lib; no change to client boundaries.
- **Single source of truth:** Only the content file (e.g. `content/projects.json`) holds project data; `lib/projects.ts` only reads and validates. No fallback array in code after migration.

**Architecture compliance**

- **Structure:** `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` continue to import from `@/lib/projects` and call getters; no shared components or business logic under `app/`. Loader and schema live in `lib/`.
- **Design system:** No UI change; existing ProjectCard and detail layout stay. Only the data source changes so presentation remains consistent (FR23).

**Library/framework requirements**

- Use Node `fs` only in server context (e.g. inside `getProjects()` / `getProjectBySlug()` which are called from Server Components). Do not use `fs` in client components.
- If using JSON: read via `fs.readFileSync` + `JSON.parse` + Zod parse (same pattern as `lib/profile.ts`). Ensure `content/` is on disk at build/run time (no special Next.js config needed for server-side read).

**File structure requirements**

- Create `content/projects.json` (or `content/projects/` with one file per project if that option is chosen). Do not create a root `src/` folder. Keep `lib/projects.ts` and add `lib/schemas/project.ts`.
- Update `content/README.md` with projects section: file path, used-by pages, how to edit, and schema/field reference.

**Testing requirements**

- MVP: no automated tests required. Manual verification: change `content/projects.json` (e.g. title or add a project), rebuild, confirm list and detail pages reflect change and layout/design unchanged; confirm slug routing and metadata still work.

### Previous Story Intelligence

- **Story 4.1** established the pattern: `content/profile.json` + `lib/profile.ts` (getProfile()) + `lib/schemas/profile.ts` (Zod). getProfile() uses `fs.readFileSync`, `profileSchema.safeParse`, and throws safe errors. About page and AboutSection consume from getProfile(); no hardcoded copy in components. Reuse this exactly for projects: `content/projects.json` + `lib/projects.ts` (refactor to read file, keep getProjects/getProjectBySlug) + `lib/schemas/project.ts` (Zod). Do not reinvent: same error-handling pattern, same server-only read, same “single file under content/” approach unless a multi-file layout is explicitly needed.
- **Files from 4.1:** `content/profile.json`, `content/README.md`, `lib/schemas/profile.ts`, `lib/profile.ts`, `components/sections/AboutSection.tsx`, `app/about/page.tsx`. Projects list/detail do not need new components; only lib and content change.

### Git Intelligence Summary

- Current `lib/projects.ts` exports a hardcoded `Project[]` and getters; `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` use them. Refactor is in-place: replace the array with file read + parse; keep the same export names and types so callers are unchanged.

### Project Context Reference

- **PRD:** FR22, FR23 — owner/updater can update content; updated content appears in correct sections with consistent presentation. MVP: updates via developer (edit file, redeploy).
- **Epic 4:** Content structure and owner update path. Story 4.1 did profile/About; this story does projects; 4.3 will do recommendations and contact info; 4.4 will document the update process.
- **Current state:** `lib/projects.ts` contains a hardcoded array of 5 projects. Projects list and detail pages work; they must continue to work with data moved to `content/projects.json` (or equivalent).

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.2]
- [Source: _bmad-output/planning-artifacts/architecture.md — Data Architecture, Project Structure, lib/ and content]
- [Source: _bmad-output/planning-artifacts/prd.md — FR22, FR23]
- [Source: lib/projects.ts — current Project interface and array]
- [Source: lib/profile.ts — getProfile() pattern to reuse]
- [Source: lib/schemas/profile.ts — Zod schema pattern to reuse]

## Dev Agent Record

### Agent Model Used

Amelia (Dev Agent)

### Debug Log References

- Sprint status set to in-progress; story 4-2 executed in order.
- Schema and loader mirror 4.1 (profile): single JSON, fs.readFileSync, Zod safeParse, safe errors.
- Build verified: `bun run build` succeeded; list and detail routes unchanged.

### Completion Notes List

- Implemented `lib/schemas/project.ts` (projectSchema, projectsSchema, Project type).
- Refactored `lib/projects.ts` to read `content/projects.json` at build/request time; getProjects() and getProjectBySlug(slug) unchanged; no hardcoded array.
- Created `content/projects.json` with all 5 projects (Ubisoft, Transavia, ViaMapa, entrepreneurial, Cinabre Paris); field values preserved.
- Updated `content/README.md` with projects section (file path, used-by, how to edit, schema reference).
- No changes to `app/projects/page.tsx` or `app/projects/[slug]/page.tsx`; they already use getters only. Manual verification: build passes.

### File List

- lib/schemas/project.ts (new)
- lib/projects.ts (refactored)
- content/projects.json (new)
- content/README.md (updated)
- _bmad-output/implementation-artifacts/sprint-status.yaml (4-2 → in-progress then review)

## Change Log

- 2026-02-25: Story 4.2 implemented. Projects content moved to content/projects.json; loader + Zod schema added; single source verified; status → review.
