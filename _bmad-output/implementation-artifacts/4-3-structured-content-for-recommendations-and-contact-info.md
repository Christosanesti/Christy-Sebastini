# Story 4.3: Structured content for recommendations and contact info

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer or site owner,
I want recommendations and contact info in a structured source,
so that recommendations and contact details can be updated in one place (FR22, FR23).

## Acceptance Criteria

1. **Given** recommendation content (quotes, attributors, links to PDFs) and contact info (email, CTA copy) **when** they are stored in a defined structure (e.g. `content/recommendations.json`, `content/contact.json` or equivalent) **then** the Recommendations/Trust section and Contact section/page read from these sources **and** updating the source and redeploying updates the site without changing component code for content.

2. **Given** the structure is in place **when** content is updated **then** updated content appears in the correct sections with consistent presentation **and** contact info (e.g. email or form recipient) is not hardcoded in the repo in a way that blocks safe updates (e.g. env or content file).

## Tasks / Subtasks

- [x] Define recommendations and contact content schema and file locations (AC: #1)
  - [x] Choose format: single JSON files (e.g. `content/recommendations.json`, `content/contact.json`) to mirror 4.1/4.2. Architecture allows either; keep one file per content type for clarity.
  - [x] Recommendations schema: array of items with `quote`, `attributorName`, `attributorRole`, `link`, `linkLabel` (match current `RecommendationBlockProps`). Use camelCase in JSON.
  - [x] Contact schema: page/section copy (e.g. `heading`, `subheading`, `ctaLabel`) and optionally recipient/display config; sensitive recipient email stays in env (see AC #2). Define in `lib/schemas/contact-content.ts` or extend existing contact schema namespace.
  - [x] Attestations: either include in `content/recommendations.json` as a second array (e.g. `attestations: [{ label, path }]`) or keep separate `content/attestations.json`; document in content README. Paths remain under `public/` (e.g. `/documents/...`).
  - [x] Create Zod schemas in `lib/schemas/` (e.g. `recommendation.ts`, and contact content schema). Ensure they validate all fields used by Recommendations page and ContactBlock.
- [x] Add loaders and types (AC: #1)
  - [x] In `lib/`: add `lib/recommendations.ts` (or similar) that reads `content/recommendations.json` at build/request time. Export `getRecommendations()` and optionally `getAttestations()` if moved to content (or keep `lib/attestations.ts` reading from content file). Use sync read in server context; Zod validation; safe errors.
  - [x] In `lib/`: add or extend for contact content (e.g. `lib/contact-content.ts` or `getContactContent()`) reading `content/contact.json` for heading, subheading, CTA copy. Do not put recipient email in content file; keep in env (e.g. `CONTACT_EMAIL` or similar) for server action.
  - [x] Ensure `app/recommendations/page.tsx` and `components/sections/ContactBlock.tsx` (or their data source) can consume from these loaders without hardcoded copy.
- [x] Migrate existing recommendation and attestation data to content (AC: #1)
  - [x] Move the hardcoded `recommendations` array from `app/recommendations/page.tsx` into `content/recommendations.json`. Preserve existing Anne-Claire Petitcol entry and structure.
  - [x] Move attestations from `lib/attestations.ts` into content (e.g. `content/recommendations.json` attestations array or `content/attestations.json`) and have loader(s) read from file; remove hardcoded array from `lib/attestations.ts` (refactor to read from content or deprecate in favor of recommendation loader).
- [x] Migrate contact copy to content; keep recipient in env (AC: #1, #2)
  - [x] Add `content/contact.json` with heading, subheading, CTA copy. Refactor `ContactBlock` to accept props from content (or page to pass content from `getContactContent()`). Leave form recipient/API key in env; document in README.
- [x] Wire pages/sections to loaders only (AC: #1, #2)
  - [x] Recommendations page: call `getRecommendations()` (and attestations getter if separate) from server; pass data to existing UI. Remove all in-file arrays of recommendation/attestation data.
  - [x] Contact page/section: call `getContactContent()` and pass copy to ContactBlock; ensure contact form still uses Zod + Server Action; recipient from env in action only.
- [x] Document and verify single source (AC: #2)
  - [x] Update `content/README.md` with recommendations and contact: file paths, used-by pages/sections, how to edit, and that contact recipient is in env. No duplicate copy in components.
  - [x] Verify build and that Recommendations and Contact sections render correctly with content-driven data.

## Dev Notes

- **Relevant architecture:** Data in repo (Markdown/JSON); no database. `lib/` for utils and schemas; no business logic under `app/` beyond composition. Story 4.1 and 4.2 established: `content/profile.json` + `lib/profile.ts`, `content/projects.json` + `lib/projects.ts`; reuse the same pattern for recommendations and contact (content file(s) + lib loader + Zod schema). Contact form recipient/API key must remain in env for security (NFR-S2).
- **Source tree to touch:** `lib/schemas/recommendation.ts` (new, Zod for recommendation items and optionally attestations), `lib/recommendations.ts` (new, read from content), `lib/contact-content.ts` or equivalent (new, read contact copy from content), `lib/attestations.ts` (refactor to read from content or remove if merged into recommendations content), `content/recommendations.json` (new), `content/contact.json` (new), `content/README.md` (update). `app/recommendations/page.tsx` and `components/sections/ContactBlock.tsx`: refactor to consume from loaders/content; no hardcoded recommendation/attestation/contact copy.
- **Testing:** No test framework required for MVP. Manual check: edit content files, rebuild, confirm Recommendations and Contact sections update; confirm form still submits and validation/toast unchanged.

### Project Structure Notes

- **Paths:** Architecture: `app/` (routes only), `components/` (sections), `lib/` (utils, schemas). Loaders in `lib/`; do not put content logic in `app/`. No root `src/`.
- **Naming:** camelCase in JSON and for functions; PascalCase for components. Recommendation interface/schema aligned with existing `RecommendationBlockProps` so component can stay as-is with props from data.

### Developer Context & Guardrails

**Technical requirements**

- **Stack:** Next.js App Router, TypeScript, Tailwind, shadcn. No new runtime deps; use `fs.readFileSync` in server context (same as `lib/profile.ts`, `lib/projects.ts`). Zod for validation.
- **Data flow:** Content files → read at build/request time in server context → getters return typed data. Recommendations page and Contact section/page receive data via props or server-side loader calls. Contact form recipient/API key: server-only env (e.g. in `lib/actions/contact.ts`); never in content file or client.
- **Single source of truth:** Only content files hold recommendation and contact copy; attestations in content or dedicated file. No fallback arrays in code after migration.

**Architecture compliance**

- **Structure:** `app/recommendations/page.tsx` and contact page/section compose layout and page; they import from `lib/` and pass data to sections. No business logic under `app/` beyond composition; loaders and schemas in `lib/`.
- **Design system:** No UI change to RecommendationBlock or ContactBlock; only data source changes so presentation remains consistent (FR23).

**Library/framework requirements**

- Use Node `fs` only in server context (e.g. inside getters called from Server Components). Do not use `fs` in client components.
- JSON: read via `fs.readFileSync` + `JSON.parse` + Zod parse (same pattern as `lib/profile.ts`, `lib/projects.ts`). Ensure `content/` is on disk at build/run time.

**File structure requirements**

- Create `content/recommendations.json` and `content/contact.json`. Do not create a root `src/` folder. Add `lib/recommendations.ts` and contact-content loader; add `lib/schemas/recommendation.ts` (and contact content schema if separate). Refactor or remove hardcoded data from `app/recommendations/page.tsx` and `lib/attestations.ts`.
- Update `content/README.md` with recommendations and contact sections: file paths, used-by, how to edit, env note for contact recipient.

**Testing requirements**

- MVP: no automated tests required. Manual verification: change `content/recommendations.json` and `content/contact.json`, rebuild, confirm Recommendations and Contact sections reflect change and layout/design unchanged; confirm form validation and toast still work.

### Previous Story Intelligence

- **Story 4.1** established: `content/profile.json` + `lib/profile.ts` (getProfile()) + `lib/schemas/profile.ts` (Zod). getProfile() uses `fs.readFileSync`, `profileSchema.safeParse`, and throws safe errors. About page and AboutSection consume from getProfile(); no hardcoded copy.
- **Story 4.2** established: `content/projects.json` + `lib/projects.ts` (getProjects(), getProjectBySlug(slug)) + `lib/schemas/project.ts` (Zod). Same pattern: sync read in server context, Zod, safe errors; pages consume getters only.
- Reuse exactly for recommendations and contact: content file(s) + lib loader(s) + Zod schema(s). Do not reinvent: same error-handling pattern, same server-only read, same “single file under content/” per content type. Contact recipient stays in env (not in content) for safe updates and security.
- **Files from 4.1/4.2:** `content/profile.json`, `content/projects.json`, `content/README.md`, `lib/schemas/profile.ts`, `lib/schemas/project.ts`, `lib/profile.ts`, `lib/projects.ts`. Recommendation and contact content are the only remaining hardcoded sections; move them to content and mirror the loader pattern.

### Project Context Reference

- **PRD:** FR22, FR23 — owner/updater can update content; updated content appears in correct sections with consistent presentation. MVP: updates via developer (edit file, redeploy). Contact recipient/API key via env so safe updates without code change.
- **Epic 4:** Content structure and owner update path. Story 4.1 did profile/About; 4.2 did projects; this story does recommendations and contact info; 4.4 will document the update process.
- **Current state:** `app/recommendations/page.tsx` has hardcoded `recommendations` array and imports `attestations` from `lib/attestations.ts`. `ContactBlock` has hardcoded "Get in touch" and "Send a message...". `lib/attestations.ts` has hardcoded attestation array. Contact form uses Zod + Server Action; recipient not yet from env (stub). After this story, all content is in `content/` and loaders in `lib/`; contact recipient documented and in env.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.3]
- [Source: _bmad-output/planning-artifacts/architecture.md — Data Architecture, Project Structure, lib/ and content]
- [Source: _bmad-output/planning-artifacts/prd.md — FR22, FR23]
- [Source: app/recommendations/page.tsx — current recommendations array and attestations usage]
- [Source: components/sections/RecommendationBlock.tsx — RecommendationBlockProps]
- [Source: lib/attestations.ts — current attestation shape and usage]
- [Source: components/sections/ContactBlock.tsx — contact heading/subheading and form]
- [Source: lib/profile.ts, lib/projects.ts — getProfile/getProjects pattern to reuse]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
