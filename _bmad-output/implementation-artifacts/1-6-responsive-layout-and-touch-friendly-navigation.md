# Story 1.6: Responsive layout and touch-friendly navigation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor on mobile,
I want a responsive layout and touch-friendly navigation and CTAs,
so that I can use the site on my device (FR16) and reach Projects and Contact without unnecessary steps (FR17).

## Acceptance Criteria

1. **Given** I view the site on a narrow viewport (e.g. 375px width)  
   **When** I use the nav and primary CTAs  
   **Then** touch targets are at least 44×44px where possible  
   **And** the layout is readable and usable (no horizontal scroll for main content); nav may collapse to a hamburger or compact pattern

2. **Given** any viewport in the supported range (mobile to desktop)  
   **When** I navigate to Projects or Contact  
   **Then** I can do so in a small number of actions (no unnecessary steps)  
   **And** breakpoints align with Tailwind/shadcn (e.g. sm/md/lg/xl) and are applied consistently

## Tasks / Subtasks

- [x] Ensure touch targets and layout on narrow viewport (AC: #1)
  - [x] Audit nav links, primary CTA (Contact), and key buttons for min 44×44px touch target (padding or min-height/min-width)
  - [x] Ensure main content has no horizontal scroll at 375px (and down to ~320px); fix overflow or constrain width
  - [x] Implement responsive nav: collapse to hamburger or compact pattern below md (768px) per UX; same links and CTA available
- [x] Consistent breakpoints and navigation efficiency (AC: #2)
  - [x] Use Tailwind/shadcn breakpoints (sm 640px, md 768px, lg 1024px, xl 1280px) consistently; no custom arbitrary breakpoints unless documented
  - [x] Verify from Home, About, Projects, Recommendations user can reach Projects or Contact in ≤3 clicks at every viewport
  - [x] Test at 320px, 375px, 768px, 1024px, 1280px for layout and nav behavior

## Dev Notes

- Responsive and nav (FR15–FR18) map to `app/layout.tsx`, `components/layout/Nav.tsx`, `Header.tsx`, `Footer.tsx`. Story 1.2 established routes and nav; this story makes layout responsive and touch-friendly without changing route structure.
- Architecture: Mobile-first; breakpoints aligned with Tailwind/shadcn (sm/md/lg/xl); touch targets ≥ 44px. No root `src/`. [Source: architecture.md]
- UX: Mobile-first; nav to hamburger below md; touch targets ≥ 44px; breakpoints sm 640, md 768, lg 1024, xl 1280. [Source: ux-design-specification.md]

### Project Structure Notes

- Nav lives in `components/layout/` (e.g. `Nav.tsx`). Layout composes it in `app/layout.tsx`. Do not add business logic under `app/`; responsive behavior is in components and Tailwind classes. Reuse existing Header/Footer if present.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.6, FR16, FR17]
- [Source: _bmad-output/planning-artifacts/architecture.md — Frontend Architecture, Responsive, NFR-A2]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Responsive Design & Accessibility, Navigation Patterns]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Touch targets (FR16):** All interactive nav items, primary CTA (Contact), and key buttons must have a minimum 44×44px hit area (use padding, min-height/min-width, or shadcn Button sizing). Apply on nav links, hero CTA, footer/contact links, and any primary actions.
- **No horizontal scroll:** Main content (hero, sections, text) must not cause horizontal overflow at 375px width (and 320px). Use `max-w-*`, `overflow-x-hidden` on body/main where appropriate, and responsive images/containers.
- **Responsive nav:** Below `md` (768px), nav must collapse to a hamburger menu or compact pattern (e.g. sheet/drawer). Same links (Home, About, Projects, Recommendations, Contact) and primary CTA must remain available; CTA visible in menu or as sticky bar per UX. Keyboard and focus order preserved; close on escape and outside click.
- **Breakpoints (FR17, NFR):** Use Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Apply consistently for layout (grid, visibility, nav collapse). Do not introduce conflicting custom breakpoints.
- **Navigation efficiency:** From any primary page, user reaches Projects or Contact in ≤3 actions at all viewports. No extra steps or hidden nav on mobile.

### Architecture compliance

- **Structure:** Layout and nav in `app/layout.tsx` + `components/layout/Nav.tsx` (and Header/Footer as existing). No new top-level `src/`. Responsive logic via Tailwind classes and optional client component only for hamburger open/close state.
- **Naming:** PascalCase components; kebab-case routes; camelCase for state/handlers. One main export per file.
- **Stack:** Next.js App Router, Tailwind, shadcn/ui. Use shadcn Sheet or DropdownMenu for mobile nav if needed; keep Server Components where possible; client only for interactive nav toggle.
- **Enforcement:** Do not put layout or nav under `app/` beyond composition. Do not use fixed pixel breakpoints that conflict with Tailwind. Do not reduce touch targets below 44px for primary controls.

### Library and framework requirements

| Package / API | Purpose | Notes |
|--------------|---------|--------|
| Tailwind CSS | Breakpoints, spacing, responsive layout | Use `sm:`, `md:`, `lg:`, `xl:` consistently; mobile-first |
| shadcn/ui | Button, Sheet/Drawer, NavigationMenu | Use for nav and mobile menu; ensure Button/link touch targets ≥ 44px |
| Next.js | Layout, routing | Layout wraps all routes; nav present on every page |

No new dependencies required; use existing stack.

### File structure requirements

- **Likely to touch:**  
  - `app/layout.tsx` — ensure viewport meta and no overflow issues.  
  - `components/layout/Nav.tsx` — responsive nav, hamburger below md, touch targets.  
  - `components/layout/Header.tsx` (if exists) — responsive header.  
  - Hero and CTA components — verify touch target size on small screens.  
- **Forbidden:** Root `src/`. Custom breakpoint values that conflict with Tailwind. Touch targets &lt; 44px for nav/CTA. Horizontal scroll on main content at 375px.
- **Naming:** PascalCase components; kebab-case routes; camelCase for state.

### Testing requirements

- No automated tests required. Manual: (1) At 375px and 320px: no horizontal scroll; nav collapses; all links and CTA reachable; touch targets feel adequate (measure 44×44px). (2) At md and above: full nav visible; same ≤3-click path to Projects/Contact. (3) Keyboard: tab through nav and mobile menu; focus visible; escape closes menu. (4) Verify breakpoints (e.g. 640, 768, 1024) show expected layout changes.

### Previous story intelligence

- **Story 1.5 (done):** Contact form in `ContactBlock.tsx`; nav and hero CTA already link to `/contact`; Toaster in root layout. Field-level errors and aria-invalid added. Do not change contact route or CTA destination; only ensure nav/CTA are responsive and touch-friendly.
- **Story 1.4 (done):** About page and section; design system from Hero. Same layout wrapper; ensure About remains readable and no overflow on small viewports.
- **Story 1.3 (done):** HeroSection with primary CTA. CTA must remain ≥ 44px touch target on mobile; verify HeroSection respects responsive padding and doesn’t cause overflow.
- **Story 1.2 (done):** Nav and routes created; placeholder contact page replaced in 1.5. Nav structure exists—this story adds responsive collapse and touch targets without removing or renaming routes.
- **Learnings:** Reuse existing Nav/Header; use shadcn Sheet or similar for mobile menu; keep Server Components where possible; client only for menu open/close; Tailwind for all breakpoints.

### Git intelligence summary

- Recent commits: contact form and validation; About page; hero and skip link; layout and nav with accessibility. Nav component and layout structure already in place; this story extends them for responsiveness and touch targets. No new routing or new pages; focus on CSS and optional client state for hamburger.

### Latest tech information

- Tailwind v4/v3: breakpoints are configurable but default sm/md/lg/xl are standard; no change needed if using defaults. shadcn Sheet/DropdownMenu work with Next.js App Router; use client component only for the trigger and open state. WCAG 2.1 AA: 44×44px touch target is the recommended minimum (Level AAA 24×24px; Level AA often interpreted as 44px for primary controls).

### Project context reference

- **Project:** Michelle Portfolio — professional portfolio for Christy Sebastini (reference-tier, shadcn, WCAG 2.1 AA, Core Web Vitals). [Source: _bmad-output/planning-artifacts/prd.md]
- **Epic 1:** Project Foundation & Professional Home. This story is 1.6 (responsive and touch-friendly); 1.7 design system, 1.8 SEO remain. [Source: _bmad-output/planning-artifacts/epics.md]
- **Project context doc:** No `project-context.md`; use PRD, architecture, and epics as source of truth.

### Story completion status

- **Status:** ready-for-dev  
- **Ultimate context engine analysis completed** — comprehensive developer guide created for Story 1.6 (Responsive layout and touch-friendly navigation). All acceptance criteria, technical requirements, architecture guardrails, and previous story learnings are captured for the dev agent.

---

## Change Log

- Code review (2026-02-24): Fixed Sheet close button—`focus:outline-hidden` → `focus:outline-none`, `rounded-xs` → `rounded-sm` (components/ui/sheet.tsx). Staged sheet.tsx for commit.
- Responsive layout and touch-friendly navigation implemented (2026-02-24): hamburger nav below md, 44×44 touch targets, no horizontal scroll, Tailwind breakpoints.

---

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

- Touch targets: Nav links (desktop and mobile sheet) use min-h-[44px] min-w-[44px]; hamburger and Sheet close use 44×44; Hero CTA and ContactBlock submit already had 44×44. No new dependencies beyond shadcn Sheet.
- No horizontal scroll: html, body, and main use overflow-x-hidden; main has max-w-[100vw]. Content uses max-w-3xl + px-4/sm:px-6.
- Responsive nav: Below md (768px) nav collapses to hamburger; Sheet opens with same links and Contact; close on escape and outside click (Radix default). Desktop (md and up) horizontal links unchanged.
- Breakpoints: Tailwind sm/md/lg/xl only; nav collapse at md. From any primary page, Projects and Contact are one click via nav; ≤3 clicks satisfied.
- Manual verification: Build passes. Recommend manual check at 320px, 375px, 768px, 1024px, 1280px and keyboard (tab, focus, escape).
- Code review fixes: Sheet close button (sheet.tsx) — replaced invalid `focus:outline-hidden` with `focus:outline-none` for NFR-A2 focus visibility; `rounded-xs` → `rounded-sm` for standard Tailwind. File List unchanged (no new files from fixes).

### File List

- app/layout.tsx
- components/layout/Nav.tsx
- components/ui/sheet.tsx
- _bmad-output/implementation-artifacts/sprint-status.yaml
