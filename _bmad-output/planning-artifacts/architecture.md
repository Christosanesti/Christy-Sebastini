---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-02-24'
inputDocuments:
  - prd.md
  - ux-design-specification.md
workflowType: 'architecture'
project_name: 'Michelle Portfolio'
user_name: 'Nawid'
date: '2026-02-24'
mandatoryTechStack:
  - Tailwind CSS
  - Three.js
  - Drei
  - React Three Fiber
  - shadcn/ui
  - Framer Motion
  - GSAP
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Mandatory technology stack (locked)

The following stack is **non-negotiable** and must be used across the project. All subsequent architecture decisions must align with these choices.

| Technology | Role |
|------------|------|
| **Tailwind CSS** | Utility-first styling, layout, theming |
| **Three.js** | 3D rendering engine |
| **Drei** | React helpers for React Three Fiber |
| **React Three Fiber** | React renderer for Three.js (R3F) |
| **shadcn/ui** | Accessible, customizable UI components |
| **Framer Motion** | Declarative animations and layout transitions |
| **GSAP** | Scroll- and interaction-driven animation, timelines |

These tools support the PRD and UX goals: reference-tier presentation, optional 3D/motion, structured accessible UI, and a cohesive design system.

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- **Identity & profile (FR1–FR3):** Hero and About must convey who Christy is and her positioning in one scan; drives need for a clear landing and profile section.
- **Projects & experience (FR4–FR7):** List of projects with at least one detailed view; distinction between projects (e.g. Ubisoft, Transavia, ViaMapa); post-MVP deeper narratives. Drives a projects list plus project-detail structure.
- **Trust & credibility (FR8–FR11):** Evidence section, at least one recommendation in context, access to attestations/documents; post-MVP optional PDFs. Drives a Recommendations/trust section and optional document links/embeds.
- **Contact & conversion (FR12–FR14):** Clear contact path (email/form/link), reachable in 2–3 actions from anywhere, unambiguous CTA. Drives persistent CTA and nav placement.
- **Navigation & discovery (FR15–FR18):** Persistent nav (Home, About, Projects, Recommendations, Contact), mobile-responsive and touch-friendly, minimal steps to Projects and Contact, clear orientation. Drives global nav and information architecture.
- **Presentation & polish (FR19–FR21):** Coherent visual system, reference-tier; post-MVP optional 3D/motion with reduced-motion support. Aligns with mandatory stack and design system.
- **Content management (FR22–FR23):** MVP = manual/developer updates; content in correct sections with consistent presentation.
- **SEO & shareability (FR24–FR25):** Per-page metadata and Open Graph for previews; no critical content client-only so crawlers and sharing work.

**Non-Functional Requirements:**
- **Performance (NFR-P1–P3):** Core Web Vitals "good" (LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1); main content usable without waiting on 3D/motion; above-the-fold usable within ~3s on fast 3G. 3D and heavy motion must be lazy-loaded and non-blocking.
- **Accessibility (NFR-A1–A3):** WCAG 2.1 AA for key flows; keyboard and focus management; `prefers-reduced-motion` respected for Framer Motion and GSAP.
- **Security (NFR-S1–S2):** HTTPS; secure handling of any contact/form data.

**Scale & Complexity:**
- **Primary domain:** Web (front-end–heavy portfolio; Next.js, optional 3D/motion).
- **Complexity level:** Low (single site, static content, no real-time or multi-tenant requirements).
- **Estimated architectural components:** App shell (layout, nav), Home (hero + sections), About, Projects (list + detail), Recommendations/Trust, Contact, shared UI (shadcn + Tailwind), optional 3D scene(s), animation boundaries (Framer Motion/GSAP with reduced-motion handling).

### Technical Constraints & Dependencies

- **Stack (locked):** Tailwind CSS, Three.js, Drei, React Three Fiber, shadcn/ui, Framer Motion, GSAP. All architecture and implementation must use this stack.
- **Framework:** Next.js (App Router); hybrid approach—static/SSG for core pages (SEO, fast load), client components only for 3D and animation.
- **Browsers:** Evergreen (Chrome, Firefox, Safari, Edge last 2) and mobile (iOS Safari, Chrome Android); no IE. WebGL optional with fallback (e.g. static hero or image).
- **Content:** MVP content in code or Markdown/JSON; no CMS required. Growth: optional headless CMS or structured content pipeline.
- **Hosting:** Static export or Node server (e.g. Vercel/Netlify); 3D and client-only features must work in chosen deployment model.

### Cross-Cutting Concerns Identified

- **Accessibility:** WCAG 2.1 AA, focus order, touch targets (≥ 44px), and reduced-motion handling affect layout, components, and all motion (Framer Motion, GSAP).
- **Performance:** CWV and "content first" affect when/where 3D and motion load (lazy-load, below-fold, or post-MVP); LCP must not depend on 3D or heavy animation.
- **SEO:** Semantic HTML, metadata API, OG, sitemap, and clean URLs; critical content must be server-rendered or static.
- **Design system consistency:** shadcn + Tailwind tokens (typography, spacing, color) applied across all pages so the site feels reference-tier and coherent.

## Starter Template Evaluation

### Primary Technology Domain

**Web application** — Next.js (App Router), front-end–heavy portfolio with optional 3D and motion. Aligns with PRD, UX, and mandatory stack (Tailwind, Three.js, Drei, React Three Fiber, shadcn/ui, Framer Motion, GSAP).

### Starter Options Considered

- **Official `create-next-app@latest`:** Defaults include TypeScript, Tailwind CSS, App Router, ESLint, Turbopack, and `@/*` alias. No shadcn or 3D/motion; these are added in a follow-up step. Chosen as the single foundation.
- **Community Next.js + shadcn starters:** Do not include the full mandatory stack (R3F, Drei, Framer Motion, GSAP). Would require adding 3D/motion and reconciling setup; rejected to avoid drift.
- **Custom from scratch:** Unnecessary; official starter provides the right base.

### Selected Starter: Official Next.js (`create-next-app@latest`)

**Rationale for Selection:**
- Matches project needs: App Router, Tailwind, TypeScript, and a standard Next.js layout.
- One canonical base; shadcn and 3D/motion are added explicitly so versions and config stay under our control.
- Package manager: **Bun** (project standard). Use `bun create next-app@latest` for init and `bunx` for shadcn.

**Initialization Command:**

```bash
bun create next-app@latest . --yes
```

(Use a project name instead of `.` if creating in a new directory. Defaults with `--yes`: TypeScript, Tailwind, App Router, ESLint, Turbopack.)

**Post-create steps (first implementation story):**
1. Initialize shadcn: `bunx shadcn@latest init` (Bun 1.2+ recommended for compatibility).
2. Install 3D and motion deps: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap`.

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript enabled by default; Node/Bun for tooling.

**Styling Solution:**
- Tailwind CSS (default); config and globals ready for shadcn and design tokens.

**Build Tooling:**
- Next.js build; Turbopack for dev; standard Next optimization (e.g. for images and static export if used).

**Testing Framework:**
- Not included by default; to be added as needed (e.g. Jest/Vitest + React Testing Library).

**Code Organization:**
- App Router layout (`app/`); `components/`, `lib/` where applicable; `@/*` import alias.

**Development Experience:**
- `bun run dev` (or `bun --bun run dev` if needed); hot reload; ESLint.

**Note:** Project initialization using the command above, followed by shadcn init and installation of Three.js, R3F, Drei, Framer Motion, and GSAP, should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data: No database; content in code or Markdown/JSON; Zod for form/input validation.
- Frontend: App Router; client boundaries only for 3D and motion; lazy-load 3D and respect `prefers-reduced-motion`.
- API/Contact: No backend API; contact via Server Action or third-party; validate with Zod.

**Important Decisions (Shape Architecture):**
- Security: No auth; HTTPS; secure form handling only.
- Infrastructure: Vercel or Netlify; env vars for any keys; optional CI/CD.

**Deferred Decisions (Post-MVP):**
- CMS or structured content pipeline for site-owner updates.
- Analytics and monitoring.
- Broader test automation (e.g. E2E).

### Data Architecture

- **Source of truth:** Content in repository (Markdown/JSON or inline) for MVP; no database.
- **Validation:** Zod for contact form and any structured input.
- **Caching:** Static generation and CDN; no application-level cache required for MVP.

### Authentication & Security

- **Authentication:** None; public portfolio.
- **Security:** HTTPS only; contact form data transmitted and handled securely (Server Action or provider); no sensitive data in client storage (NFR-S1, NFR-S2).

### API & Communication Patterns

- **API style:** No REST/GraphQL backend for MVP. Contact submission via Next.js Server Action or external service (e.g. Resend, Formspree).
- **Error handling:** Validation (Zod) at boundary; user-facing error messages; no sensitive details exposed.
- **Rate limiting:** Handled by hosting or form provider if needed.

### Frontend Architecture

- **State:** Local component state and URL; no global state store for MVP.
- **Components:** Server Components by default; Client Components for 3D (R3F/Drei), Framer Motion, and GSAP. shadcn for UI primitives.
- **Routing:** App Router file-based; clear sections: Home, About, Projects, Recommendations, Contact.
- **Performance:** Lazy-load 3D and heavy animation; `prefers-reduced-motion` respected; Core Web Vitals (LCP, FID, CLS) targets per NFR-P1–P3.
- **Bundle:** Dynamic imports for 3D and heavy client-only modules to protect LCP.

### Infrastructure & Deployment

- **Hosting:** Vercel or Netlify. Use Node/serverless if contact uses Server Actions; static export possible if form is client-only or third-party.
- **Environment:** `NEXT_PUBLIC_*` for client-exposed config; server-only env for API keys (e.g. email).
- **CI/CD:** Optional; Vercel/Netlify Git integration sufficient for MVP.

### Decision Impact Analysis

**Implementation sequence:**
1. Initialize project (create-next-app, shadcn, 3D/motion deps).
2. App shell: layout, nav, design tokens (Tailwind/shadcn).
3. Static pages and content (Home, About, Projects, Recommendations, Contact).
4. Contact path (form + Server Action or third-party) with Zod.
5. Optional 3D/motion in hero or key sections with lazy-load and reduced-motion handling.

**Cross-component dependencies:**
- Design tokens and shadcn affect all pages and components.
- 3D/motion boundaries affect layout and performance; keep LCP-critical content outside client-only trees.
- Contact flow depends on env (e.g. email API key) and deployment (serverless vs static).

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical conflict points:** Naming (components, files), project layout, form/contact format, loading and error handling, and 3D/motion boundaries. These are where agents could otherwise diverge.

### Naming Patterns

**Code naming:**
- **Components:** PascalCase (e.g. `ProjectCard`, `HeroSection`, `ContactForm`). Match shadcn convention for UI primitives.
- **Files:** kebab-case for non-component modules (e.g. `contact-schema.ts`, `project-data.ts`). React components: either `ComponentName.tsx` (PascalCase) or `component-name.tsx` (kebab-case); pick one and stick to it project-wide. Recommendation: `ComponentName.tsx` for components in `components/`.
- **Functions/variables:** camelCase. Constants that are config: UPPER_SNAKE_CASE if desired, otherwise camelCase.
- **Routes:** App Router uses folder names; use kebab-case for route segments (e.g. `app/projects/[slug]/page.tsx`).

**No database or REST API:** N/A for this project.

### Structure Patterns

**Project organization:**
- **`app/`:** App Router only. `layout.tsx`, `page.tsx`, route segments (e.g. `about/`, `projects/`, `contact/`). No business logic or shared components inside `app/` beyond layout and page composition.
- **`components/`:** Shared UI. Subfolders by role: e.g. `ui/` (shadcn + wrappers), `layout/` (Header, Footer, Nav), `sections/` (Hero, ProjectsList, Recommendations, ContactBlock), `three/` (3D scenes/canvases). One component per file; co-locate small helpers or styles only when they are single-use.
- **`lib/`:** Utilities, schemas (Zod), and pure helpers. No React components. E.g. `lib/schemas/contact.ts`, `lib/utils/cn.ts`.
- **`public/`:** Static assets (favicon, images referenced by URL). Keep path structure simple and predictable.
- **Content/assets:** Use existing `Assets/` (or agreed path) for PDFs, images, and reference data; reference from code or config, don't duplicate.

**File structure:**
- Config at repo root: `tailwind.config.*`, `next.config.*`, `tsconfig.json`, `.env*`. No `src/` at project root (per project rules).
- Env: `.env.local` for local secrets; document required vars (e.g. for contact) in README or env.example.

### Format Patterns

**Form and Server Action:**
- **Validation:** Zod schemas in `lib/schemas/`. Export schema and infer TypeScript types; use same schema in Client and Server Action.
- **Contact submission:** Server Action returns a result shape, e.g. `{ success: boolean; message?: string; error?: string }`. No raw stack traces or internal details to the client.
- **Client-side:** Use the same result shape for UI (toast success/error via sonner).

**Data exchange (if any JSON):**
- Prefer camelCase for JSON consumed by the app. Be consistent within a single boundary (e.g. contact payload and response).

### Communication Patterns

**State:** Local component state and URL. No global store. Avoid prop-drilling by grouping state in the nearest common parent or using composition.

**Events:** No custom event bus. Use React (callbacks, context only if needed) and DOM events only where necessary (e.g. scroll for GSAP).

### Process Patterns

**Error handling:**
- **Forms:** Validate with Zod; show field-level errors from schema; on submit failure show a single user-facing message (e.g. via sonner toast). Do not expose server internals.
- **Runtime errors:** Use error boundaries for client components (e.g. around 3D or heavy sections). Log details server-side or in dev; show a generic message to users.

**Loading states:**
- Use Skeleton components (shadcn or wrappers) for lists, cards, and sections that load async or feel slow. Avoid spinners-only where a skeleton is feasible (per project preference).
- **3D/motion:** Lazy-load 3D and heavy animation; show a placeholder or skip 3D when `prefers-reduced-motion` is set. Do not block LCP on 3D or motion.

### Enforcement Guidelines

**All agents MUST:**
- Use the chosen naming (PascalCase components, consistent file naming, camelCase for functions/variables).
- Place code in the correct directories (app vs components vs lib) and not create a top-level `src/` folder.
- Validate forms with Zod and use the agreed Server Action result shape for contact.
- Use skeletons for loading and sonner for toast; respect `prefers-reduced-motion` for motion and 3D.
- Use the locked stack (Tailwind, Three.js, Drei, R3F, shadcn, Framer Motion, GSAP) and Bun.

**Enforcement:** Code review and lint rules; document any exception in the architecture or README.

### Pattern Examples

**Good:**
- `components/sections/ProjectCard.tsx` with a single exported `ProjectCard` component.
- `lib/schemas/contact.ts` with `contactSchema` and `ContactFormValues = z.infer<typeof contactSchema>`.
- Server Action that parses with `contactSchema.safeParse()` and returns `{ success, message?, error? }`; client shows toast from that.

**Avoid:**
- Putting shared components or lib code under `app/`.
- Creating a root `src/` directory.
- Returning raw errors or stack traces to the client.
- Ignoring `prefers-reduced-motion` or blocking LCP with 3D/motion.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
Michelle-Portfolio/                    # or project root name
├── README.md
├── package.json
├── bun.lockb
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── recommendations/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── ui/                    # shadcn + wrappers
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Nav.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsList.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── RecommendationBlock.tsx
│   │   └── ContactBlock.tsx
│   └── three/
│       └── HeroScene.tsx      # optional 3D hero; lazy-loaded
├── lib/
│   ├── utils.ts               # e.g. cn()
│   ├── schemas/
│   │   └── contact.ts         # Zod contact schema
│   └── actions/
│       └── contact.ts         # Server Action for contact form
├── public/
│   ├── favicon.ico
│   └── images/                # optional optimized assets
├── Assets/                    # existing content (PDFs, refs, photos)
│   ├── Websites list.txt
│   └── ...
└── _bmad-output/               # planning/implementation artifacts; not deployed
```

### Architectural Boundaries

**API boundaries:** No REST/GraphQL API. Contact submission is the only server-side "API surface": one Server Action in `lib/actions/contact.ts`; no other route handlers required for MVP.

**Component boundaries:** `app/` only composes layout and pages; it imports from `components/` and `lib/`. Shared UI lives in `components/` (layout, sections, ui, three). Server Components by default; Client Components only in `components/three/`, motion wrappers, and any client-interactive form/UI. State is local or URL; no global store.

**Data boundaries:** No database. Content comes from repo (Markdown/JSON or inline). `Assets/` is the canonical location for PDFs and images; reference via `public/` copies or paths documented in code/config. Contact form data: client → Server Action → external (e.g. Resend) or internal handling; no persistence in app.

### Requirements to Structure Mapping

| FR area | Primary locations |
|--------|--------------------|
| Identity & profile (FR1–FR3) | `app/page.tsx`, `app/about/page.tsx`, `components/sections/HeroSection.tsx` |
| Projects (FR4–FR7) | `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`, `components/sections/ProjectsList.tsx`, `ProjectCard.tsx` |
| Trust & credibility (FR8–FR11) | `app/recommendations/page.tsx`, `components/sections/RecommendationBlock.tsx` |
| Contact (FR12–FR14) | `app/contact/page.tsx`, `components/sections/ContactBlock.tsx`, `lib/actions/contact.ts`, `lib/schemas/contact.ts` |
| Navigation (FR15–FR18) | `app/layout.tsx`, `components/layout/Nav.tsx`, `Header.tsx`, `Footer.tsx` |
| Presentation (FR19–FR21) | `app/globals.css`, `components/ui/`, design tokens; optional `components/three/HeroSection.tsx` with reduced-motion handling |

### Integration Points

**Internal:** Pages in `app/` import layout and section components from `components/`; sections may use `lib/schemas` and `lib/actions`. No circular dependencies; `lib/` does not import from `components/` or `app/`.

**External:** Contact: Server Action calls Resend (or similar) or form provider API. Optional: analytics script in layout. Assets in `Assets/` are referenced from config or content; no runtime external content API for MVP.

**Data flow:** Static content → build-time; contact: form → Zod → Server Action → email provider. No DB or cache layer.

### File Organization Patterns

**Config:** Root-level only: `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `.env*`. No `src/` at root.

**Source:** `app/` (routes and layout), `components/` (by role: ui, layout, sections, three), `lib/` (utils, schemas, actions). One main export per component file; schemas and actions in dedicated files.

**Tests:** Not required for MVP; if added, use `__tests__/` next to modules or a single `tests/` at root; e2e in `tests/e2e/` or similar.

**Assets:** `public/` for web-facing static files; `Assets/` for source PDFs and reference content; reference from app via consistent path convention.

## Architecture Validation Results

### Coherence Validation ✅

**Decision compatibility:** Technology choices (Next.js, Bun, Tailwind, shadcn, Three.js, R3F, Drei, Framer Motion, GSAP) are compatible. No database or auth keeps the model simple. Static content + Server Action for contact is consistent with hosting (Vercel/Netlify).

**Pattern consistency:** Naming (PascalCase components, camelCase functions, kebab-case routes), structure (app / components / lib, no root `src/`), and process (Zod, sonner, skeletons, reduced-motion) support the decisions and each other.

**Structure alignment:** Directory tree supports all FRs, component boundaries, and integration points. `lib/` does not import from `components/` or `app/`.

### Requirements Coverage Validation ✅

**Functional requirements:** All FR categories (Identity, Projects, Trust, Contact, Navigation, Presentation, Content, SEO) map to specific app routes and components. Contact flow has schema + Server Action + result shape.

**Non-functional requirements:** Performance (CWV, lazy-load 3D, non-blocking content), accessibility (WCAG 2.1 AA, reduced-motion), and security (HTTPS, secure form handling) are reflected in decisions and patterns.

### Implementation Readiness Validation ✅

**Decision completeness:** Stack, starter, data/auth/API/frontend/infra decisions are documented. Versions and rationale are clear.

**Structure completeness:** Project tree is concrete (app, components, lib, public, Assets). Requirements-to-structure mapping is explicit.

**Pattern completeness:** Naming, structure, format, communication, and process patterns are defined with examples and anti-patterns.

### Gap Analysis Results

- **Critical:** None.
- **Important:** Optional `middleware.ts` and `env.example` when contact env vars are fixed.
- **Nice-to-have:** Tests, E2E, and monitoring can be added later.

### Validation Issues Addressed

No blocking issues. Architecture is coherent and ready for implementation.

### Architecture Completeness Checklist

**✅ Requirements analysis:** Context, scale, constraints, and cross-cutting concerns documented.

**✅ Architectural decisions:** Critical decisions and stack specified; integration and performance considered.

**✅ Implementation patterns:** Naming, structure, format, communication, and process patterns documented.

**✅ Project structure:** Directory structure, boundaries, and FR mapping defined.

### Architecture Readiness Assessment

**Overall status:** READY FOR IMPLEMENTATION

**Confidence level:** High — requirements, decisions, patterns, and structure are aligned and specific.

**Strengths:** Single source of truth; mandatory stack and no-src rule clear; patterns and structure give agents a consistent target.

**Future enhancements:** CMS/content pipeline, tests, analytics, optional middleware and env.example.

### Implementation Handoff

**AI agent guidelines:**
- Follow this architecture document for all technical choices.
- Apply implementation patterns consistently.
- Respect project structure and boundaries (no root `src/`, app vs components vs lib).

**First implementation priority:** Run `bun create next-app@latest . --yes`, then `bunx shadcn@latest init`, then install `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap`.
