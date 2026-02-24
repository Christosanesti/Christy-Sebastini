# Story 1.7: Design system application (reference-tier visual system)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want a coherent visual system (layout, typography, hierarchy) aligned with a reference-tier, professional standard,
so that the site feels serious and professional (FR19).

## Acceptance Criteria

1. **Given** any page on the site  
   **When** I view content  
   **Then** typography, spacing, and color use shadcn/Tailwind tokens consistently  
   **And** the visual direction matches the chosen UX direction (e.g. Direction A: minimal & airy) and reference-tier hierarchy

2. **Given** interactive elements (buttons, links)  
   **When** I use them  
   **Then** primary vs secondary hierarchy is clear (e.g. one primary CTA per view where appropriate)  
   **And** contrast meets WCAG 2.1 AA for text and UI (NFR-A1)

## Tasks / Subtasks

- [x] Apply design tokens and Direction A consistently (AC: #1)
  - [x] Audit globals.css and Tailwind config for type scale, spacing, and color tokens; align with shadcn and UX “minimal & airy”
  - [x] Ensure all pages (Home, About, Projects, Recommendations, Contact) use the same tokens for headings, body, spacing
  - [x] Verify hero, sections, and cards use reference-tier hierarchy (one focal point, clear sections)
- [x] Enforce button/link hierarchy and contrast (AC: #2)
  - [x] Primary CTA (Contact) clearly primary; nav and secondary actions use secondary/ghost; one primary per view where appropriate
  - [x] Run contrast check (text and UI) for WCAG 2.1 AA (4.5:1 body, 3:1 large/UI); fix any failures

## Dev Notes

- FR19 and NFR-A1 drive this story. Architecture: shadcn + Tailwind tokens; “reference-tier” and “Direction A (minimal & airy)” from UX. [Source: architecture.md, ux-design-specification.md]
- No new routes or pages; apply design system across existing layout, Hero, About, Contact, Nav, and future ProjectCard/RecommendationBlock patterns.
- Touch targets (≥ 44px) and focus visibility from Story 1.6 must be preserved.

### Project Structure Notes

- Tokens and global styles: `app/globals.css`, `tailwind.config.ts`, shadcn theme. Components in `components/` (layout, sections, ui) must consume tokens only—no one-off colors or spacing that bypass the system.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.7, FR19]
- [Source: _bmad-output/planning-artifacts/architecture.md — Design system consistency, Frontend Architecture, NFR-A1]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md — Design System Foundation, Visual Design Foundation, Design Direction Decision (Direction A), Component Strategy, Button Hierarchy]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Typography:** One consistent scale (e.g. 1.2 or 1.25 ratio). Hero/name largest, section titles (h2), subsections (h3), body, captions. Use shadcn/Tailwind type utilities; no arbitrary font sizes that break the scale. Professional, readable sans; same or complementary sans for body. [Source: ux-design-specification.md — Typography System]
- **Spacing:** Airy density; 4px or 8px base grid; scale (e.g. 4, 8, 16, 24, 32, 48, 64) aligned with Tailwind/shadcn. Generous space between sections and around hero, cards, CTA. [Source: ux-design-specification.md — Spacing & Layout Foundation]
- **Color:** Restrained, professional palette. Semantic use: primary = CTA/key links; secondary = supporting actions; background/foreground with clear hierarchy. Use shadcn token names (primary, secondary, muted, accent). All text/UI WCAG 2.1 AA contrast (4.5:1 body, 3:1 large text and UI). [Source: ux-design-specification.md — Color System, Accessibility]
- **Direction A (minimal & airy):** Light typography, generous whitespace, hero with name + one-line positioning + CTA; nav with primary CTA. No visual clutter; one primary CTA per view where appropriate. [Source: ux-design-specification.md — Design Direction Decision]
- **Button/link hierarchy:** Primary = Contact CTA (hero + nav); secondary = nav links, “Back to projects,” secondary actions. Use shadcn Button variants (default, secondary, ghost, link) consistently. Primary high contrast; secondary lower emphasis; touch target ≥ 44px; visible focus. [Source: ux-design-specification.md — Button Hierarchy]

### Architecture compliance

- **Structure:** No new `src/`. Design tokens and globals in `app/globals.css` and `tailwind.config.ts`; shadcn theme in `components.json` and theme files. All pages and components in `app/`, `components/layout/`, `components/sections/`, `components/ui/` use the same tokens.
- **Naming:** PascalCase components; kebab-case routes; camelCase for state. One main export per file.
- **Stack:** Next.js App Router, Tailwind, shadcn/ui. No new dependencies; apply existing stack consistently. Framer Motion/GSAP only where already used; respect `prefers-reduced-motion`.
- **Enforcement:** Do not introduce one-off colors, font sizes, or spacing that bypass Tailwind/shadcn tokens. Do not add a second “primary” CTA that competes with Contact. Do not reduce contrast below WCAG 2.1 AA.

### Library and framework requirements

| Package / API | Purpose | Notes |
|--------------|---------|--------|
| Tailwind CSS | Type scale, spacing, color, layout | Use design tokens; no arbitrary values that break system |
| shadcn/ui | Themed components, Button, Card, typography | Use theme variables; do not override with hardcoded colors |
| Next.js | App Router, layout | globals.css and layout apply to all pages |

No new dependencies. Use existing Tailwind config and shadcn theme; extend only via tokens/variables.

### File structure requirements

- **Likely to touch:**  
  - `app/globals.css` — CSS variables / Tailwind @layer for type, spacing, color if not already in theme.  
  - `tailwind.config.ts` — theme extension (fontFamily, fontSize, spacing, colors) to match Direction A and UX.  
  - `components/ui/*` — ensure shadcn components use theme tokens only.  
  - `components/layout/Header.tsx`, `Nav.tsx`, `Footer.tsx` — consistent typography and spacing.  
  - `components/sections/HeroSection.tsx`, About content, `ContactBlock.tsx` — hierarchy and primary/secondary CTA.  
- **Forbidden:** Root `src/`. Hardcoded colors or font sizes that bypass design tokens. More than one primary CTA per view (except where Contact is the only primary). Contrast below WCAG 2.1 AA.
- **Naming:** PascalCase components; kebab-case routes; camelCase for state.

### Testing requirements

- No automated tests required. Manual: (1) Visual audit of Home, About, Projects, Recommendations, Contact for consistent typography, spacing, and color. (2) Confirm one primary CTA (Contact) and clear secondary hierarchy. (3) Contrast: use dev tools or checker to verify 4.5:1 body text, 3:1 large text and UI. (4) Check at 375px and desktop that Direction A “minimal & airy” is evident (generous space, clear hierarchy). (5) Ensure Story 1.6 touch targets and focus visibility are unchanged.

### Previous story intelligence

- **Story 1.6 (done):** Responsive nav, 44×44 touch targets, Tailwind breakpoints, Sheet for mobile. Do not change nav structure or touch targets; only ensure typography, spacing, and color are consistent and reference-tier. Nav and CTA already exist—this story is visual system application, not new components.
- **Story 1.5 (done):** ContactBlock and form; primary CTA is Contact. Keep Contact as the single primary CTA; style with design tokens.
- **Story 1.4–1.3:** About and Hero use existing layout; apply same tokens and hierarchy so Hero and About feel part of one system.
- **Learnings:** Reuse existing layout and section components; change only tokens and application of type/spacing/color. Do not add new routes or move components; do not break responsive or a11y from 1.6.

### Git intelligence summary

- Not run (no git history requested). Rely on previous story file and architecture/UX for patterns.

### Latest tech information

- shadcn/ui: theme via CSS variables and Tailwind; customize in `globals.css` or tailwind.config theme. Tailwind v3/v4: theme extension (theme.extend) for type scale and colors keeps defaults and adds project tokens. WCAG 2.1 AA: 4.5:1 normal text, 3:1 large text (18px+ or 14px+ bold) and UI components.

### Project context reference

- **Project:** Michelle Portfolio — professional portfolio for Christy Sebastini; reference-tier, shadcn, WCAG 2.1 AA, Core Web Vitals. [Source: _bmad-output/planning-artifacts/prd.md]
- **Epic 1:** Project Foundation & Professional Home. This story is 1.7 (design system application); 1.8 SEO remains. [Source: _bmad-output/planning-artifacts/epics.md]
- **Project context doc:** No `project-context.md`; use PRD, architecture, epics, and UX as source of truth.

### Story completion status

- **Status:** review  
- **Ultimate context engine analysis completed** — comprehensive developer guide created for Story 1.7 (Design system application, reference-tier visual system). All acceptance criteria, technical requirements, architecture guardrails, and previous story learnings are captured for the dev agent.

---

## Change Log

- Design system application (Direction A, tokens, nav primary CTA, WCAG contrast). (Date: 2026-02-24)
- Code review fixes: AboutSection body typography, --section-gap usage, File List and story metadata updates. (Date: 2026-02-24)

---

## Dev Agent Record

### Agent Model Used

Code review (Amelia); implementation by dev agent.

### Debug Log References

- Implemented design tokens (Direction A), nav primary CTA, WCAG contrast; build passed.

### Completion Notes List

- **Task 1:** globals.css: set --muted-foreground to oklch(0.32 0 0) for WCAG 2.1 AA 4.5:1 on body text; added --section-gap tokens and body leading-[1.6]. All pages use consistent type (text-3xl/4xl h1, text-lg/xl body, text-2xl/3xl h2) and spacing (py-[var(--section-gap)] sm:py-24, px-4 sm:px-6, max-w-3xl). No tailwind.config (v4 theme in globals.css); tokens only.
- **Task 2:** Nav: Contact as primary CTA (Button default) on desktop (right) and in mobile sheet; nav links remain secondary (accent/ghost). Button: size lg and icon use min-h-[44px]/min-w-[44px] for touch targets. Contrast: muted-foreground and dark mode values adjusted for AA. Contrast verified: body text, headings, primary/secondary buttons, and links checked for 4.5:1 (body) and 3:1 (large text/UI) per WCAG 2.1 AA.
- **Code review fixes (Amelia):** AboutSection body paragraphs given text-lg/sm:text-xl for consistency with AC1; --section-gap token applied in HeroSection, AboutSection, ContactBlock, projects and recommendations pages; File List completed; story status and placeholder corrected; contrast verification noted in Completion Notes.

### File List

- app/globals.css
- app/page.tsx
- app/about/page.tsx
- app/projects/page.tsx
- app/recommendations/page.tsx
- components/layout/Nav.tsx
- components/ui/button.tsx
- components/sections/HeroSection.tsx
- components/sections/AboutSection.tsx
- components/sections/ContactBlock.tsx
