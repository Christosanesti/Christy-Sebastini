# Story 1.3: Hero section with identity and primary CTA

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the home hero to show who Christy is and a clear primary CTA (e.g. Contact),
so that I form a clear first impression and know how to reach her (FR1, FR3, FR12, FR14).

## Acceptance Criteria

1. **Given** I land on the home page  
   **When** I view the hero (above the fold or first scroll)  
   **Then** Christy's name and a short positioning line (who she is / what she does) are visible  
   **And** a primary CTA (e.g. "Contact" or "Open to work") is visible and links to the contact path

2. **Given** the hero is rendered  
   **When** critical content (name, positioning, CTA) is present  
   **Then** LCP is not blocked by 3D or heavy motion (NFR-P2)  
   **And** hero uses semantic heading (e.g. h1) and the CTA is focusable and has a clear label

## Tasks / Subtasks

- [x] Implement hero section component (AC: #1)
  - [x] Create `components/sections/HeroSection.tsx` (or reuse/adapt if placeholder exists)
  - [x] Display Christy's name (e.g. "Christy Sebastini") and a short positioning line (who she is / what she does)
  - [x] Add primary CTA (e.g. "Contact" or "Open to work") that links to `/contact`
  - [x] Use semantic heading (h1) for the main hero title; ensure CTA is focusable and has clear label (AC: #2)
- [x] Ensure LCP and performance (AC: #2)
  - [x] Keep hero content server-rendered or static; do not block LCP with 3D or heavy motion (NFR-P2)
  - [x] If optional 3D or motion is added later, lazy-load and ensure critical content (name, positioning, CTA) is not dependent on it
- [x] Integrate hero into home page
  - [x] Compose HeroSection in `app/page.tsx` within the existing layout/shell from Story 1.2

## Dev Notes

- Hero is the first thing visitors see; it must convey identity and CTA without waiting on 3D or animation (NFR-P2).
- Architecture: `components/sections/HeroSection.tsx`; home page in `app/page.tsx` only composes layout and sections (no business logic under `app/`).
- Use shadcn/Tailwind tokens for typography and spacing; align with Direction A (minimal & airy) per UX if documented.
- CTA: use Next.js `Link` to `/contact` with accessible label (e.g. "Contact" or "Open to work"); ensure focus visible (NFR-A2).

### Project Structure Notes

- After Story 1.2: `app/page.tsx` is home with placeholder; `components/layout/Nav.tsx` and routes exist. This story adds `components/sections/HeroSection.tsx` and wires it into `app/page.tsx`. No new routes; hero is the main content of the home page.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.3, FR1, FR3, FR12, FR14]
- [Source: _bmad-output/planning-artifacts/architecture.md — Project Structure, components/sections/HeroSection.tsx, Requirements to Structure Mapping]
- [Source: _bmad-output/planning-artifacts/prd.md — NFR-P2, identity and first impression]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Hero content:** Christy's name (e.g. "Christy Sebastini") and a short positioning line (who she is / what she does) visible above the fold or on first scroll. Primary CTA (e.g. "Contact" or "Open to work") must link to `/contact` and be focusable with a clear label.
- **Semantic & a11y:** Use `<h1>` for the main hero heading. CTA must be keyboard focusable and have visible focus (NFR-A2). No critical content behind client-only render (SEO and LCP).
- **Performance (NFR-P2):** LCP must not be blocked by 3D or heavy motion. Hero critical content (name, positioning, CTA) must be server-rendered or static. If you add optional 3D or Framer Motion/GSAP later, lazy-load it and ensure it does not block or delay the critical hero content.
- **No root `src/`:** Do not create a root-level `src/` directory. Hero lives in `components/sections/HeroSection.tsx`; home page composes it in `app/page.tsx`.

### Architecture compliance

- **Structure:** Hero section in `components/sections/HeroSection.tsx`. Home page `app/page.tsx` imports and renders it; no business logic or shared components under `app/` beyond composition. Per architecture: identity & profile (FR1–FR3) map to `app/page.tsx` and `components/sections/HeroSection.tsx`.
- **Naming:** PascalCase for components (`HeroSection.tsx`). One main export per file.
- **Stack:** Tailwind CSS, shadcn/ui, Next.js. Use Server Component for hero unless you need client interactivity (e.g. optional motion); then use Client Component only for the interactive part and keep name/positioning/CTA in server or static markup.
- **Enforcement:** Do not add root `src/`. Do not put HeroSection under `app/`. Do not block LCP with 3D or heavy animation for critical hero content.

### Library and framework requirements

| Package / API | Purpose | Notes |
|---------------|---------|--------|
| next/link | CTA link to contact | Use `<Link href="/contact">` for primary CTA |
| shadcn/ui | Buttons/links | Use for primary CTA (e.g. Button) with design tokens |
| Tailwind CSS | Styling | Typography and spacing; align with globals.css and shadcn tokens |
| Framer Motion / GSAP | Optional motion | Only if adding light motion; must not block LCP; respect `prefers-reduced-motion` (NFR-A3) |

No new package installs required unless adding a shadcn component; 3D/motion are optional for this story and must not block LCP.

### File structure requirements

- **Required after this story:**  
  - `components/sections/HeroSection.tsx` — hero with name, positioning line, and primary CTA linking to `/contact`.  
  - `app/page.tsx` — updated to render HeroSection as the main home content (within existing layout from 1.2).  
- **Forbidden:** Root-level `src/`. Hero or shared section components under `app/`. Blocking LCP with 3D or heavy motion.  
- **Naming:** PascalCase for components; kebab-case for route segments.

### Testing requirements

- No automated tests required for this story. Success = on home page, hero shows Christy's name and positioning line, primary CTA is visible and links to `/contact`, h1 is used, CTA is focusable with clear label, and LCP is not blocked by 3D/heavy motion.
- Manual check: Load home page; verify name, positioning, and CTA above the fold; click CTA to reach `/contact`; tab to CTA and confirm focus visible; ensure no layout shift or long delay before hero content.

### Previous story intelligence

- **Story 1.2 (done):** App shell with persistent Nav, five routes (/, /about, /projects, /recommendations, /contact). Layout in `app/layout.tsx`; Nav in `components/layout/Nav.tsx` (client component, usePathname, active state, focus-visible). Route pages are placeholders. Skip link and touch targets (min 44px) and reduced-motion handling applied.
- **Files created in 1.2:** `app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/projects/page.tsx`, `app/recommendations/page.tsx`, `app/contact/page.tsx`, `components/layout/Nav.tsx`. Do not duplicate layout or nav; only add HeroSection and compose it in `app/page.tsx`.
- **Learnings:** Tailwind v4 with PostCSS and `@theme` in globals.css; no tailwind.config.ts. Use `bg-background`, `text-foreground`, and shadcn tokens. Bun for commands. No root `src/`. Design system already in place—reuse for hero typography and CTA.

### Project context reference

- **Project:** Michelle Portfolio — professional portfolio for Christy Sebastini (reference-tier presentation, optional 3D/motion, shadcn, WCAG 2.1 AA, Core Web Vitals). [Source: _bmad-output/planning-artifacts/prd.md]
- **Epic 1:** Project Foundation & Professional Home. This story is 1.3 (hero with identity and primary CTA); Stories 1.4–1.8 add about content, contact path, responsive, design system, SEO. [Source: _bmad-output/planning-artifacts/epics.md]
- **Project context doc:** No `project-context.md` in repo; use PRD, architecture, and epics as source of truth.

### Story completion status

- **Status:** review  
- **Ultimate context engine analysis completed** — comprehensive developer guide created for Story 1.3 (Hero section with identity and primary CTA). All acceptance criteria, technical requirements, architecture guardrails, and previous story learnings are captured for the dev agent.

---

## Dev Agent Record

### Agent Model Used

Amelia (Dev Agent); Code review fixes applied by same agent.

### Debug Log References

### Completion Notes List

- HeroSection implemented as Server Component: `components/sections/HeroSection.tsx` with h1 "Christy Sebastini", positioning line, primary CTA (Button + Link to `/contact`), aria-labelledby and CTA aria-label. LCP-safe: no client JS for critical content; static export. Integrated in `app/page.tsx`. Shadcn Button added via `bunx shadcn add button`. Lint and build pass; no automated tests per story (manual verification only).
- **Code review (2026-02-24):** Fixed redundant layout container (page.tsx now only renders HeroSection); added inline-flex to CTA Link for correct flex alignment; replaced agent placeholder and aligned story status to "review". Recommend committing changes before marking story done.

### Change Log

- 2026-02-24: Story 1.3 implementation complete. Added HeroSection (name, positioning, CTA to /contact), integrated into home page; LCP-safe server render; shadcn Button for CTA.
- 2026-02-24: Code review fixes. Removed redundant wrapper in app/page.tsx; added inline-flex to hero CTA Link; story doc placeholder and status consistency updated.

### File List

- `components/sections/HeroSection.tsx` (new)
- `components/ui/button.tsx` (new, shadcn)
- `app/page.tsx` (modified)
