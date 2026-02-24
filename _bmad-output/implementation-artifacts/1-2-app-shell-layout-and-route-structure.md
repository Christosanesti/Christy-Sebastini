# Story 1.2: App shell, layout, and route structure

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want a consistent layout with global navigation and routes for Home, About, Projects, Recommendations, and Contact,
so that I can move between main sections and orient myself (FR15, FR18).

## Acceptance Criteria

1. **Given** the running app  
   **When** I view any page  
   **Then** a persistent or sticky nav is visible with links to Home, About, Projects, Recommendations, Contact  
   **And** the current page or section is indicated (e.g. active state or aria-current)

2. **Given** the app structure  
   **When** I navigate to `/`, `/about`, `/projects`, `/recommendations`, `/contact`  
   **Then** each route resolves to a valid page (placeholder content acceptable)  
   **And** layout (header/footer if used) is consistent across routes; no content under `app/` except route composition and layout

3. **Given** keyboard or screen reader use  
   **When** I tab through the nav  
   **Then** focus order is logical and focus is visible (NFR-A2)

## Tasks / Subtasks

- [x] Add root layout with app shell and global nav (AC: #1)
  - [x] Create or extend `app/layout.tsx` to include a persistent header/nav (or use a shared layout component from `components/layout/`)
  - [x] Nav links: Home (`/`), About (`/about`), Projects (`/projects`), Recommendations (`/recommendations`), Contact (`/contact`)
  - [x] Indicate current page (active state or `aria-current="page"`) so visitors can orient (FR18)
- [x] Create route pages (AC: #2)
  - [x] Ensure `app/page.tsx` exists (home)
  - [x] Add `app/about/page.tsx`, `app/projects/page.tsx`, `app/recommendations/page.tsx`, `app/contact/page.tsx` with placeholder content
  - [x] Keep layout consistent; no business logic or shared components under `app/` beyond layout and page composition
- [x] Ensure nav is keyboard-accessible and focus visible (AC: #3)
  - [x] Logical tab order; visible focus styles (NFR-A2); use semantic links (`<a>` or Next.js `<Link>`)

## Dev Notes

- **Layout:** Use a single root layout in `app/layout.tsx` that wraps all pages with the same shell (nav + main content). Optional footer in layout or in a `Footer` component.
- **Nav component:** Place in `components/layout/Nav.tsx` (or `Header.tsx` containing nav); import into root layout. Do not put shared components under `app/`.
- **Routes:** App Router file-based. Use kebab-case for route segments: `about/`, `projects/`, `recommendations/`, `contact/`. No `src/` at project root.
- **Active state:** Use `usePathname()` (client) in Nav or pass path from server; apply active class or `aria-current="page"` to the current link.
- **References:** [Source: _bmad-output/planning-artifacts/architecture.md — Project Structure & Boundaries, Implementation Patterns]

### Project Structure Notes

- After Story 1.1: `app/` has `layout.tsx`, `page.tsx`, `globals.css`; `components/` has shadcn `ui/` and `lib/utils.ts`. This story adds `components/layout/Nav.tsx` (and optionally `Header.tsx`, `Footer.tsx`) and the new route folders under `app/`. Full directory tree per architecture: `app/about/`, `app/projects/`, `app/recommendations/`, `app/contact/` each with `page.tsx`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.2, FR15, FR18]
- [Source: _bmad-output/planning-artifacts/architecture.md — Project Structure & Boundaries, Naming Patterns, Frontend Architecture]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Next.js App Router:** All routes are file-based under `app/`. Root layout in `app/layout.tsx` must wrap children with the same app shell (nav + main). Use `<main>` for page content.
- **Navigation:** Persistent or sticky nav on every page with exactly five links: Home (`/`), About (`/about`), Projects (`/projects`), Recommendations (`/recommendations`), Contact (`/contact`). Use Next.js `Link` for client-side navigation; ensure hrefs match the route paths above.
- **Active state:** The current route must be indicated in the nav (e.g. CSS class for active link and/or `aria-current="page"` on the current link). Use `usePathname()` from `next/navigation` in a Client Component for the nav if needed, or equivalent server-side approach.
- **No root `src/`:** Do not create a root-level `src/` directory. All app routes live under `app/` at repo root; shared layout components in `components/layout/`.
- **Accessibility:** Focus order must be logical when tabbing through the nav; focus must be visible (Tailwind/shadcn focus styles or explicit focus-visible). NFR-A2.

### Architecture compliance

- **Structure:** `app/` contains only layout and route segments (`layout.tsx`, `page.tsx`, and route folders). Shared UI (Nav, Header, Footer) lives in `components/layout/`. No business logic or shared components under `app/` beyond composing layout and pages.
- **Naming:** Components PascalCase (e.g. `Nav.tsx`, `Header.tsx`); route segments kebab-case (`about/`, `projects/`, `recommendations/`, `contact/`). Per architecture: one main export per component file.
- **Stack:** Tailwind CSS, shadcn/ui, Next.js. Use shadcn components for nav/links if appropriate (e.g. navigation menu or links with design tokens). No removal or substitution of the locked stack.
- **Enforcement:** Do not add a root `src/` folder. Do not put layout components (Nav, Header, Footer) under `app/`; they belong in `components/layout/`.

### Library and framework requirements

| Package / API | Purpose | Notes |
|---------------|---------|--------|
| next/link | Client-side navigation | Use `<Link href="...">` for nav links |
| next/navigation | Pathname for active state | `usePathname()` in Client Component for nav |
| next/font | Typography | Already in layout (Geist); keep or align with design tokens |
| shadcn/ui | UI primitives | Use for nav/links/buttons as per design system; ensure focus visible |
| Tailwind CSS | Styling | Design tokens (e.g. from globals.css); consistent spacing and focus rings |

No new package installs required for this story unless adding a shadcn nav component (e.g. Navigation Menu); use existing stack.

### File structure requirements

- **Required after this story:**  
  - `app/layout.tsx` — root layout including app shell (nav + children).  
  - `app/page.tsx` — home (existing; may be updated to sit inside shell).  
  - `app/about/page.tsx`, `app/projects/page.tsx`, `app/recommendations/page.tsx`, `app/contact/page.tsx` — one placeholder page per route.  
  - `components/layout/Nav.tsx` (and optionally `Header.tsx`, `Footer.tsx`) — persistent nav and shell.  
- **Forbidden:** Root-level `src/`. Shared layout components under `app/`.  
- **Naming:** PascalCase for components; kebab-case for route folders.

### Testing requirements

- No automated tests required for this story. Success = all five routes resolve, nav is visible on each page, current page is indicated, and tab order/focus is logical and visible.
- Manual check: Navigate to each of `/`, `/about`, `/projects`, `/recommendations`, `/contact` and confirm layout and nav consistency; tab through nav and confirm focus visible.

### Previous story intelligence

- **Story 1.1 (done):** Next.js 16.x with App Router, TypeScript, Tailwind CSS 4, shadcn init, no root `src/`. Layout is minimal (fonts + body); no nav yet. Tailwind v4 uses PostCSS + `@theme` in `app/globals.css` (no `tailwind.config.ts`). Use `bun run dev` and existing design tokens (e.g. `bg-background`, `text-foreground`) for consistency.
- **Files created in 1.1:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `lib/utils.ts`, `components.json`, root configs. Do not duplicate or conflict with these; extend layout and add route pages and `components/layout/` only.
- **Learnings:** Package name in `package.json` was set to `michelle-portfolio` after create-next-app; keep using Bun for all commands. Design tokens and shadcn are already in place—reuse for nav and shell.

### Project context reference

- **Project:** Michelle Portfolio — professional portfolio for Christy (reference-tier presentation, optional 3D/motion, shadcn, WCAG 2.1 AA, Core Web Vitals). [Source: _bmad-output/planning-artifacts/prd.md]
- **Epic 1:** Project Foundation & Professional Home. This story is 1.2 (app shell and routes); Stories 1.3–1.8 add hero, about content, contact, responsive, design system, SEO. [Source: _bmad-output/planning-artifacts/epics.md]
- **Project context doc:** No `project-context.md` in repo; use PRD, architecture, and epics as source of truth.

### Story completion status

- **Status:** done  
- **Ultimate context engine analysis completed** — comprehensive developer guide created for Story 1.2 (App shell, layout, and route structure). All acceptance criteria, technical requirements, and architecture guardrails are captured above for the dev agent. Code review fixes applied (skip link, touch targets, reduced motion).

---

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

- Implemented app shell and route structure per story tasks. No automated tests required per story; manual verification: all five routes resolve, nav visible, active state and focus-visible applied.

### Completion Notes List

- Root layout extended with `Nav` and `<main>` in `app/layout.tsx`. `components/layout/Nav.tsx` added: client component using `usePathname()`, Next.js `Link`, active state via `aria-current="page"` and accent styling, `focus-visible:ring-2` for keyboard users. Route pages added: `app/page.tsx` (home placeholder), `app/about/page.tsx`, `app/projects/page.tsx`, `app/recommendations/page.tsx`, `app/contact/page.tsx` with placeholder content. Nav is sticky, semantic, and keyboard-accessible; build and lint pass.
- **Code review fixes (2026-02-24):** Skip link added in `app/layout.tsx` (Skip to main content, targets `#main-content`; main has `id="main-content"` and `tabIndex={-1}`). Nav touch targets: links use `min-h-[44px] flex items-center` and `motion-reduce:transition-none` for WCAG 2.1 AA. Uncommitted changes: commit app/layout.tsx, components/layout/Nav.tsx, and route pages for traceability.

### File List

- app/layout.tsx (modified)
- app/page.tsx (modified)
- app/about/page.tsx (new)
- app/projects/page.tsx (new)
- app/recommendations/page.tsx (new)
- app/contact/page.tsx (new)
- components/layout/Nav.tsx (new)

### Change Log

- 2026-02-24: Story 1.2 implemented — app shell with persistent Nav, five routes (/, /about, /projects, /recommendations, /contact), active state and keyboard-accessible nav.
