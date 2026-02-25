# Story 4.1: Structured content for profile and About

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer or site owner,
I want profile and About content in a single structured source (e.g. Markdown or JSON),
so that updates are made in one place and appear correctly on the site (FR22, FR23).

## Acceptance Criteria

1. **Given** profile and About content (experience, sectors, positioning) **when** they are stored in a defined structure (e.g. `content/profile.json` or `content/about.md`) **then** the About page (or section) reads from this source and renders the content **and** changing the source and rebuilding (or redeploying) updates the site without code changes to components beyond the data binding.

2. **Given** the structure is in place **when** content is updated **then** the presentation remains consistent (same layout, typography, and design system) **and** no duplicate copy lives in component code for profile/About; a single source of truth is used.

## Tasks / Subtasks

- [x] Define content schema and file location (AC: #1)
  - [x] Choose format: JSON (e.g. `content/profile.json`) or Markdown (e.g. `content/about.md`); architecture allows either. Prefer one single file for profile + about for "one place" updates.
  - [x] Define fields: heading/title, short intro/tagline, experience paragraph, sectors paragraph, professional positioning paragraph (match current `AboutSection` sections).
  - [x] Create `content/` directory if missing; add chosen file.
- [x] Add loader/parser and types (AC: #1)
  - [x] In `lib/`: add module (e.g. `lib/profile.ts` or `lib/content/profile.ts`) that reads the content file, parses it, and exports typed profile data. Use sync read for static/build-time (e.g. `fs` in Node) or ensure Next.js can read at build/request time.
  - [x] No new dependencies required if using JSON + `require`/`fs` or `import` from JSON; for MD use a simple parser or `fs.readFileSync` + markdown parser if already in project.
- [x] Refactor AboutSection to consume content (AC: #1, #2)
  - [x] Remove all hardcoded copy from `components/sections/AboutSection.tsx`. Accept props or call a server-side loader that returns the profile data.
  - [x] Render heading, intro, experience, sectors, positioning from the loaded data. Keep existing layout and design (same classes, structure, aria) so presentation stays consistent.
  - [x] Ensure `app/about/page.tsx` fetches/loads profile and passes to `AboutSection` (or AboutSection reads via a lib call in a Server Component).
- [x] Verify single source and no duplicate copy (AC: #2)
  - [x] Confirm no profile/About text remains in component code; all copy comes from the content file.
  - [x] Document in README or CONTENT.md where profile/About content lives and how to edit (e.g. "Edit `content/profile.json` and redeploy").

## Dev Notes

- **Relevant architecture:** Data in repo (Markdown/JSON); no database. `lib/` for utils and schemas; no business logic under `app/` beyond composition. Content at repo root or under `content/`; architecture mentions "content in code or Markdown/JSON" and "Assets/ for source PDFs"; use `content/` for structured site copy to keep a single source of truth.
- **Source tree to touch:** `lib/` (new or existing module for profile load + types), `components/sections/AboutSection.tsx` (refactor to data-driven), `app/about/page.tsx` (wire in loader/data). Create `content/profile.json` or `content/about.md` and optionally `content/README.md` or a note in main README.
- **Testing:** No test framework required for MVP; if present, consider a quick sanity check that the loader returns expected shape. Manual check: edit content file, rebuild, confirm About page updates.

### Project Structure Notes

- **Paths:** Architecture: `app/` (routes only), `components/` (sections), `lib/` (utils, schemas). Put profile loader in `lib/profile.ts` or `lib/content/profile.ts`; do not put content logic in `app/` beyond calling the loader. No root `src/`.
- **Naming:** camelCase for functions/vars; PascalCase for components. File for profile data: `profile.json` or `about.md` under `content/` is fine; keep kebab-case for non-component files if using `about.md`.

### Developer Context & Guardrails

**Technical requirements**

- **Stack:** Next.js App Router, TypeScript, Tailwind, shadcn. No new runtime deps required for JSON; if using Markdown, use existing or minimal dependency (e.g. `gray-matter` if frontmatter needed).
- **Data flow:** Content file → read at build time or request time (getStaticProps equivalent or server component fetch) → pass to `AboutSection`. Prefer build-time read for static export/SSG so About is static and fast.
- **Single source of truth:** Only one file holds profile/About copy; component only renders what it receives. No fallback copy in code.

**Architecture compliance**

- **Structure:** `app/about/page.tsx` composes layout and page; it imports `AboutSection` and passes data from `lib` (or AboutSection imports the loader in a Server Component). No shared components or business logic under `app/`; loader lives in `lib/`.
- **Design system:** Keep current AboutSection layout and Tailwind/shadcn usage; only replace hardcoded strings with values from the content source so presentation remains consistent (FR23).

**Library/framework requirements**

- Use Node `fs` (or Next.js public asset read) only in server context (e.g. in a Server Component or in code that runs at build time). Do not use `fs` in client components.
- If using JSON: `import profile from '@/content/profile.json'` or `require` in Node; ensure `content/` is included in build if needed (Next.js can import JSON from project).

**File structure requirements**

- Create `content/` at project root (sibling to `app/`, `components/`, `lib/`). Place `profile.json` or `about.md` there. Do not create a root `src/` folder.
- Optional: add `content/README.md` describing that profile/About live here and how to edit.

**Testing requirements**

- MVP: no automated tests required. Manual verification: change content file, rebuild, confirm About page reflects change and layout/design unchanged.

### Previous Story Intelligence

- This is the first story in Epic 4; no previous story in this epic. Epics 1–3 established: Next.js + shadcn, `app/` routes (about, projects, recommendations, contact), `lib/metadata.ts`, `lib/projects.ts` for projects data. Pattern: data modules in `lib/` (e.g. `lib/projects.ts`) that return typed data; pages in `app/` import and pass to sections. Reuse that pattern for profile (e.g. `lib/profile.ts` or `getProfile()`).

### Project Context Reference

- **PRD:** FR22, FR23 — owner/updater can update profile and content; updated content appears in correct sections with consistent presentation. MVP: updates via developer (edit file, redeploy).
- **Epic 4:** Content structure and owner update path; this story establishes the profile/About single source; Stories 4.2–4.4 will do the same for projects, recommendations/contact, and documentation.
- **Current state:** `AboutSection` has all copy hardcoded; no `content/` folder. Refactor to one content file and one loader so future stories can mirror the approach for projects and recommendations.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.1]
- [Source: _bmad-output/planning-artifacts/architecture.md — Data Architecture, Project Structure, lib/ and content]
- [Source: _bmad-output/planning-artifacts/prd.md — FR22, FR23]
- [Source: components/sections/AboutSection.tsx — current sections: About Christy, Experience, Sectors, Professional positioning]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

- Content schema: `content/profile.json` with heading, intro, experience, sectors, positioning (Profile + ProfileSection types in lib/schemas/profile.ts).
- Loader: `lib/profile.ts` — getProfile() reads JSON via fs at build/request time; server-only; Zod validation via profileSchema; try/catch with safe error messages.
- AboutSection refactored to accept `profile: Profile`; all copy from content file; layout/classes/aria unchanged.
- About page: getProfile() in Server Component, passes to AboutSection; try/catch with user-facing error state and "Return home" link. Build verified (next build).
- Code review fixes: Zod schema in lib/schemas/profile.ts; getProfile() error handling and validation; About page error state; File List updated with sprint-status.yaml.

### File List

- content/profile.json (new)
- content/README.md (new)
- lib/schemas/profile.ts (new)
- lib/profile.ts (new)
- components/sections/AboutSection.tsx (modified)
- app/about/page.tsx (modified)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modified)

### Change Log

- 2026-02-25: Story 4.1 implemented — structured profile content, lib/profile.ts loader, AboutSection refactor, content/README.md.
- 2026-02-25: Code review fixes — Zod profile schema, getProfile() error handling, About page error state, File List and Completion Notes updated.
