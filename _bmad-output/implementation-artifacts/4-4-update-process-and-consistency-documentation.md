# Story 4.4: Update process and consistency documentation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer or site owner,
I want a clear update process (and optionally runbook/README) so content updates are done consistently,
so that the site stays accurate and presentation stays consistent (FR22, FR23).

## Acceptance Criteria

1. **Given** the content structure from Stories 4.1–4.3 **when** someone (developer or owner) needs to update profile, projects, recommendations, or contact info **then** the location of each content source is documented (e.g. in README or CONTENT.md) **and** the steps to update and redeploy (e.g. edit file, commit, deploy) are clear so updates are repeatable.

2. **Given** an update is performed **when** content is changed and deployed **then** the site reflects the change in the correct sections **and** no manual copy-paste into multiple files is required for a single logical update (single source of truth per content type).

## Tasks / Subtasks

- [x] Document content source locations and update steps (AC: #1)
  - [x] Ensure `content/README.md` lists every content source (profile, projects, recommendations, contact) with file path, used-by pages/sections, and "how to edit" — already present from 4.1–4.3; verify completeness and fix any gaps.
  - [x] Add a short **Update process** (or **How to update and redeploy**) section to `content/README.md`: steps in order (e.g. 1. Edit the relevant file under `content/`, 2. Validate JSON if needed, 3. Commit and push, 4. Deploy / trigger build). Keep it repeatable and copy-paste friendly.
  - [x] Document env-only items: contact form recipient (`CONTACT_EMAIL`) and any API keys live in env; document in `content/README.md` (contact section already has this) and optionally in root README so deployers know what to set.
- [x] Link root README to content docs (AC: #1)
  - [x] In project root `README.md`, add a **Content updates** (or **Updating site content**) subsection: point to `content/README.md` for where each content type lives and how to edit; mention that contact recipient/API keys are in env (see `.env.example` or README).
- [x] Verify single source of truth and no duplicate copy (AC: #2)
  - [x] Confirm no content copy lives in component code for profile, projects, recommendations, or contact — all from `content/*.json` and loaders in `lib/`. Spot-check one of each type if needed.
  - [x] In `content/README.md`, state explicitly that each content type has a single source file and that updating that file and redeploying is sufficient (no need to edit multiple places).

## Dev Notes

- **Relevant architecture:** Data in repo (Markdown/JSON); no database. Content lives under `content/`; loaders in `lib/`. Stories 4.1–4.3 established `content/profile.json`, `content/projects.json`, `content/recommendations.json`, `content/contact.json` and `content/README.md` with per-type docs. This story is documentation-only: no new code, no new content files; only README and process clarity.
- **Source tree to touch:** `content/README.md` (add/formalize update process section, verify all sources and env documented), `README.md` (root — add Content updates subsection linking to `content/README.md` and env).
- **Testing:** No test framework required. Manual check: follow the documented steps to edit one content file, rebuild, deploy (or simulate); confirm site reflects change. Confirm README is clear for a new maintainer.

### Project Structure Notes

- **Paths:** `content/` holds all site content JSON; `lib/` holds loaders and schemas. No root `src/`. Root `README.md` is the main project entry; `content/README.md` is the content maintainer entry.
- **Naming:** Keep section titles in README clear (e.g. "Update process", "Content updates").

### Developer Context & Guardrails

**Technical requirements**

- **Scope:** Documentation only. Do not add new app code, new routes, or new content files. Only edit `content/README.md` and root `README.md`.
- **Consistency:** Update process must match how the app actually works: edit file in `content/` → rebuild (e.g. `bun run build`) or redeploy so Next.js reads updated files. No CMS; MVP = file edit + deploy.
- **Env:** Contact form recipient and API keys are already documented in `content/README.md` (Contact section). Root README should point to that and to `.env.example` if it exists, so deployers know what to set.

**Architecture compliance**

- **Structure:** No changes to `app/`, `components/`, or `lib/`. Only markdown files in project root and `content/`.
- **Single source of truth:** README must state that each content type has one source file; no duplicate copy in code (already true from 4.1–4.3; this story documents it explicitly).

**Library/framework requirements**

- None for this story (documentation only).

**File structure requirements**

- Edit only: `content/README.md`, `README.md` (project root). Do not create new code files or new content files. Do not create a root `src/` folder.

**Testing requirements**

- MVP: no automated tests. Manual verification: read both READMEs as a new maintainer; follow "Update process" to change one content file and confirm the steps are correct and the site updates.

### Previous Story Intelligence

- **Story 4.1:** `content/profile.json` + `lib/profile.ts`; `content/README.md` has Profile and About section.
- **Story 4.2:** `content/projects.json` + `lib/projects.ts`; `content/README.md` has Projects section.
- **Story 4.3:** `content/recommendations.json`, `content/contact.json` + loaders; `content/README.md` has Recommendations and Contact sections and env note for `CONTACT_EMAIL`.
- **Current state:** `content/README.md` already documents file locations, used-by, how to edit, and contact env. What’s missing: an explicit **Update process** (steps to edit → commit → deploy) and a root README pointer so content updates are discoverable. No code changes required; only README enhancements.

### Project Context Reference

- **PRD:** FR22, FR23 — owner/updater can update and publish content; updated content appears in correct sections with consistent presentation. MVP: updates via developer (edit file, redeploy). This story makes that process explicit and discoverable.
- **Epic 4:** Content structure and owner update path. Stories 4.1–4.3 put all content in structured files and documented locations; 4.4 closes the loop with update process and consistency documentation.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Epic 4, Story 4.4]
- [Source: content/README.md — current content docs]
- [Source: README.md — project root README]
- [Source: _bmad-output/implementation-artifacts/4-1-structured-content-for-profile-and-about.md — profile content pattern]
- [Source: _bmad-output/implementation-artifacts/4-3-structured-content-for-recommendations-and-contact-info.md — recommendations and contact content, env note]

## Change Log

- 2026-02-25: Story implemented. content/README.md: single-source statement, Update process section, env note (CONTACT_EMAIL, RESEND_API_KEY, .env.example). README.md: Content updates subsection, Environment variables updated. Verified single source of truth (lib/ loaders only).
- 2026-02-25: Code review. Fixes: .env.example CONTACT_EMAIL (was NEXT_PUBLIC_CONTACT_EMAIL); agent placeholder; README prefers bun; content/README validation wording; File List + sprint status. Status → done.

## Dev Agent Record

### Agent Model Used

Amelia (Dev Agent)

### Debug Log References

- Story 4-4: documentation-only. No code changes. Verified content sources (profile, projects, recommendations, contact) in content/README.md; added Update process section and single-source statement; added Content updates + env pointer in root README; confirmed lib/ loaders only, no embedded content in app/components.

### Completion Notes List

- content/README.md: added single-source-of-truth statement at top; added "Update process (how to update and redeploy)" with 4 steps; Contact section env note extended with RESEND_API_KEY and .env.example reference.
- README.md: added "Content updates" subsection linking to content/README.md and env; updated Environment variables to reference content/README.md and .env.example.
- Verified: profile, projects, recommendations, contact all loaded from content/*.json via lib/; no duplicate copy in components. Manual verification: follow content/README.md steps to edit one file and redeploy.
- 2026-02-25 Code review: Fixed .env.example CONTACT_EMAIL (was NEXT_PUBLIC_CONTACT_EMAIL); replaced agent placeholder; README Getting Started prefers bun; content/README.md validation step no longer references nonexistent lint script; story file added to File List.

### File List

- content/README.md (modified)
- README.md (modified)
- .env.example (modified: CONTACT_EMAIL variable name)
- _bmad-output/implementation-artifacts/sprint-status.yaml (modified: 4-4 → done)
- _bmad-output/implementation-artifacts/4-4-update-process-and-consistency-documentation.md (story file: status, record, File List)
