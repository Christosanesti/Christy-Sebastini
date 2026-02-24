# Story 1.1: Project initialization and stack setup

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want the project initialized with Next.js, shadcn, and 3D/motion dependencies,
so that the codebase is ready for layout, UI components, and optional 3D/motion work.

## Acceptance Criteria

1. **Given** a greenfield project directory  
   **When** I run `bun create next-app@latest . --yes` (or equivalent for project name)  
   **Then** the project has App Router, TypeScript, Tailwind CSS, ESLint, and no root `src/` folder  
   **And** I can run `bunx shadcn@latest init` and install `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap` without conflicts  

2. **Given** the initialized project  
   **When** I run `bun run dev`  
   **Then** the app serves a default page without errors  
   **And** Tailwind and shadcn are configured (e.g. `components.json` and design tokens available)  

## Tasks / Subtasks

- [x] Run Next.js init with Bun (AC: #1)
  - [x] Execute `bun create next-app@latest . --yes` (use `.` if already in project dir, or project name for new dir)
  - [x] Confirm App Router, TypeScript, Tailwind, ESLint; confirm no root `src/` folder
- [x] Initialize shadcn and install 3D/motion deps (AC: #1)
  - [x] Run `bunx shadcn@latest init`; complete prompts (style, base color, etc.)
  - [x] Install: `bun add three @react-three/fiber @react-three/drei framer-motion gsap`
  - [x] Verify no peer/version conflicts
- [x] Verify dev run and config (AC: #2)
  - [x] Run `bun run dev`; confirm default page loads without errors
  - [x] Confirm `components.json` exists and Tailwind/shadcn design tokens are available

## Dev Notes

- **Package manager:** Bun only. Use `bun create`, `bun add`, `bunx` (no npm/yarn/pnpm).
- **No root `src/`:** Project rule is strict: do not create a top-level `src/` folder; keep App Router structure at repo root (`app/`, `components/`, `lib/`, etc.).
- **Starter:** Official Next.js only. Do not use a community Next+shadcn starter; add shadcn and 3D/motion on top of the official base so versions and config stay under our control.
- **Architecture source:** [Source: _bmad-output/planning-artifacts/architecture.md] — Mandatory stack (Tailwind, Three.js, Drei, R3F, shadcn, Framer Motion, GSAP); Bun; no `src/`; structure will be expanded in Story 1.2.

### Project Structure Notes

- After this story the repo will have: `app/` (layout, page), `components/` (empty or shadcn only), `lib/` (if shadcn adds utils), `public/`, root config files. Full structure (routes, layout, sections) is Story 1.2.
- Align with architecture: config at root (`next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `.env*`); no `src/` at project root.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.1, Additional Requirements (Starter template)]
- [Source: _bmad-output/planning-artifacts/architecture.md — Mandatory technology stack, Starter Template Evaluation, Project Structure & Boundaries]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Runtime & package manager:** Bun. All commands: `bun create next-app@latest . --yes`, `bunx shadcn@latest init`, `bun add three @react-three/fiber @react-three/drei framer-motion gsap`, `bun run dev`.
- **Next.js:** Use latest stable `next-app@latest`. Ensure options with `--yes`: TypeScript, Tailwind CSS, App Router, ESLint. Turbopack for dev is acceptable.
- **No root `src/`:** Do not create or use a root-level `src/` directory. App Router lives under `app/` at repo root; shared code in `components/` and `lib/` at repo root.
- **shadcn:** Run `bunx shadcn@latest init` after Next.js create. Accept defaults or choose style/base color as per project; ensure `components.json` is generated and design tokens (Tailwind/shadcn) are available.
- **3D/motion deps:** Install exactly: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap`. Resolve any peer dependency warnings; do not downgrade Next or React below what Next recommends.
- **Verification:** `bun run dev` must serve the default Next page with no console/build errors; Tailwind and shadcn config must be present and valid.

### Architecture compliance

- **Stack (locked):** Tailwind CSS, Three.js, Drei, React Three Fiber, shadcn/ui, Framer Motion, GSAP. This story only installs and configures; no removal or substitution.
- **Structure:** `app/` for routes only; `components/` for UI (shadcn will add `ui/`); `lib/` for utils/schemas later. No business logic or shared components under `app/` beyond what the starter provides.
- **Config:** Keep all config at repo root: `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `.env*`. No `src/` at root.
- **Enforcement:** Do not add a root `src/` folder. Do not use npm/yarn/pnpm for install or run. Do not replace the official Next.js starter with a third-party monorepo or template.

### Library and framework requirements

| Package | Purpose | Notes |
|--------|---------|--------|
| next | App framework | Use version from `next-app@latest` (App Router, TypeScript, Tailwind) |
| three | 3D engine | Used with R3F/Drei; actual 3D usage in later stories |
| @react-three/fiber | React renderer for Three.js | Peer with three |
| @react-three/drei | Helpers for R3F | Peer with three, @react-three/fiber |
| framer-motion | Declarative animation | For layout/UI motion; respect prefers-reduced-motion in later stories |
| gsap | Timeline/scroll animation | For scroll- and interaction-driven animation in later stories |
| shadcn/ui | UI components | Via `bunx shadcn@latest init`; components added when building UI in later stories |

Use Bun for all installs; fix any peer dependency issues without changing the locked stack.

### File structure requirements

- **Required after this story:**  
  `app/` (with `layout.tsx`, `page.tsx`, `globals.css`), `components/` (shadcn may add `ui/` and `lib/utils.ts` or similar), `public/`, `package.json`, `bun.lockb`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `components.json` (from shadcn init), `.gitignore`. Optional: `.env.local`, `.env.example` when env is needed later.
- **Forbidden:** Root-level `src/` directory. Do not move `app/` or config under `src/`.
- **Naming:** Not critical for this story; from Story 1.2 onward: PascalCase components, kebab-case routes, camelCase functions (per architecture).

### Testing requirements

- No automated tests required for this story. Success = `bun run dev` runs and default page loads; Tailwind and shadcn are configured.
- If the dev agent adds a smoke test (e.g. one build + dev check), it is optional and must not block completion.

### Project context reference

- **Project:** Michelle Portfolio — professional portfolio for Christy (reference-tier presentation, optional 3D/motion, shadcn, WCAG 2.1 AA, Core Web Vitals). [Source: _bmad-output/planning-artifacts/prd.md]
- **Epic 1:** Project Foundation & Professional Home. This story is 1.1 (foundation); Stories 1.2–1.8 add app shell, hero, about, contact, responsive, design system, SEO. [Source: _bmad-output/planning-artifacts/epics.md]
- **Project context doc:** No `project-context.md` found in repo; use PRD, architecture, and epics as source of truth.

### Story completion status

- **Status:** ready-for-dev  
- **Ultimate context engine analysis completed** — comprehensive developer guide created for Story 1.1 (Project initialization and stack setup). All acceptance criteria, technical requirements, and architecture guardrails are captured above for the dev agent.

---

## Dev Agent Record

### Agent Model Used

Amelia (Dev Agent). Code review 2026-02-24: placeholder replaced during CR.

### Debug Log References

- Next.js create failed when run with `.` (directory name "Michelle Portfolio" invalid for npm package name). Created app in temp dir `michelle-portfolio-temp` then moved app/, public/, config files, node_modules to repo root and set package.json name to `michelle-portfolio`.

### Completion Notes List

- Next.js 16.1.6 initialized with App Router, TypeScript, Tailwind CSS 4, ESLint. No root `src/`; structure at repo root (app/, lib/, public/).
- shadcn init run with defaults (-d); components.json and design tokens in app/globals.css.
- Installed three, @react-three/fiber, @react-three/drei, framer-motion, gsap with Bun; no conflicts.
- `bun run build` succeeded; components.json and Tailwind/shadcn design tokens verified. No automated tests required per story.
- **CR 2026-02-24:** Tailwind v4 uses PostCSS + `@theme` in globals.css (no `tailwind.config.ts`). Architecture doc references v3 pattern; this is intentional and valid for v4.

### Change Log

- 2026-02-24: Story 1.1 implemented. Next.js + shadcn + 3D/motion stack initialized at repo root; all ACs satisfied.
- 2026-02-24: Code review fixes applied. Agent placeholder replaced; Tailwind v4 note added; layout metadata and page design tokens updated; .env.example and README env section added.

### File List

- app/layout.tsx
- app/page.tsx
- app/globals.css
- public/next.svg
- public/vercel.svg
- lib/utils.ts
- package.json
- bun.lock
- next.config.ts
- next-env.d.ts
- postcss.config.mjs
- tsconfig.json
- eslint.config.mjs
- README.md
- .gitignore
- components.json
- .env.example
