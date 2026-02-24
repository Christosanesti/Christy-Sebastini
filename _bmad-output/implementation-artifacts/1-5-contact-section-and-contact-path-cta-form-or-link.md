# Story 1.5: Contact section and contact path (CTA, form or link)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want a clear way to contact Christy (link or form) and a primary CTA reachable in 2–3 actions from anywhere,
so that I can reach her without confusion (FR12, FR13, FR14).

## Acceptance Criteria

1. **Given** I am on any primary page (Home, About, Projects, Recommendations)  
   **When** I look for contact  
   **Then** I can reach the contact path (dedicated page or section) within 2–3 clicks or equivalent actions  
   **And** the primary CTA (e.g. in nav or hero) leads to that contact path

2. **Given** the contact path is implemented as a form  
   **When** I submit the form  
   **Then** submission is validated with Zod; invalid input shows field-level or summary errors  
   **And** the server responds with a result shape `{ success, message?, error? }`; client shows success/error via sonner (no raw server errors to user). Submissions are transmitted securely (NFR-S2).

3. **Given** the contact path is implemented as a link (e.g. mailto or external)  
   **When** I click the CTA  
   **Then** I am taken to the intended destination (email client or contact page)  
   **And** the link is accessible (focusable, descriptive label)

## Tasks / Subtasks

- [x] Ensure contact path is reachable in 2–3 actions (AC: #1)
  - [x] Verify nav and hero CTA link to `/contact` (or contact section)
  - [x] Confirm from Home, About, Projects, Recommendations user can reach contact in ≤3 clicks
- [x] Implement contact page: form OR link (AC: #2 or #3)
  - [x] If form: add `lib/schemas/contact.ts` (Zod), `lib/actions/contact.ts` (Server Action returning `{ success, message?, error? }`), wire form in `app/contact/page.tsx`, use sonner for toast
  - [x] If link: ensure CTA is mailto or external link with accessible label; contact page can explain or redirect
- [x] Validation and security (AC: #2)
  - [x] Zod validation; field-level or summary errors; no raw server errors to client; secure transmission (NFR-S2)

## Dev Notes

- Contact route exists from Story 1.2: `app/contact/page.tsx` (placeholder). This story implements the real contact path (form with Server Action or link).
- Architecture: Contact (FR12–FR14) → `app/contact/page.tsx`, `components/sections/ContactBlock.tsx`, `lib/actions/contact.ts`, `lib/schemas/contact.ts`. Server Action returns `{ success, message?, error? }`; client uses sonner for feedback.
- No database; contact submission via Next.js Server Action or third-party (e.g. Resend, Formspree). Validate with Zod; NFR-S2: secure handling, no sensitive data in client storage.

### Project Structure Notes

- `app/contact/page.tsx` exists; fill with form (preferred per PRD) or link. Prefer `components/sections/ContactBlock.tsx` for reuse. Per architecture: no business logic under `app/` beyond composition; schemas in `lib/schemas/`, actions in `lib/actions/`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.5, FR12, FR13, FR14]
- [Source: _bmad-output/planning-artifacts/architecture.md — Contact (FR12–FR14), Format Patterns, Form and Server Action]
- [Source: _bmad-output/planning-artifacts/prd.md — Contact & Conversion, NFR-S2]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Contact path (FR12–FR14):** From any primary page (Home, About, Projects, Recommendations), visitor reaches contact in 2–3 actions. Primary CTA (nav and/or hero) goes to contact path (`/contact`). Implement either: (a) contact form with Server Action + Zod + sonner, or (b) mailto/external link with clear label.
- **Form path (if chosen):** Zod schema in `lib/schemas/contact.ts`; Server Action in `lib/actions/contact.ts` returning exactly `{ success: boolean; message?: string; error?: string }`. Client: validate with same schema, on submit call action, show success/error via sonner; no raw server errors or stack traces to user. Transmit securely (NFR-S2).
- **Link path (if chosen):** CTA and contact page link to mailto or external contact; focusable, descriptive (e.g. "Contact Christy by email"). Contact page can be short copy + link.
- **Design system:** Same shadcn/Tailwind as rest of site; form inputs and button from shadcn; touch targets ≥ 44px where applicable.

### Architecture compliance

- **Structure:** Contact page at `app/contact/page.tsx`; optional section at `components/sections/ContactBlock.tsx`. Page composes layout and section; no business logic under `app/`. Schemas in `lib/schemas/contact.ts`, Server Action in `lib/actions/contact.ts`. Per architecture: Contact (FR12–FR14) → `app/contact/page.tsx`, `components/sections/ContactBlock.tsx`, `lib/actions/contact.ts`, `lib/schemas/contact.ts`.
- **Naming:** PascalCase components (`ContactBlock.tsx`). kebab-case route segments. camelCase for functions/variables. One main export per file.
- **Stack:** Next.js App Router, Tailwind, shadcn/ui, Zod, sonner. Server Action for form submit; Client Component only for form interactivity and toast. No root `src/`.
- **Enforcement:** Do not put schemas or actions under `app/`. Do not return raw errors to client. Do not skip Zod validation or sonner for user feedback.

### Library and framework requirements

| Package / API | Purpose | Notes |
|--------------|---------|--------|
| Zod | Form validation | `lib/schemas/contact.ts`; use in Server Action and client for consistent validation |
| Next.js Server Actions | Contact submit | `lib/actions/contact.ts`; return `{ success, message?, error? }` only |
| sonner | Toast feedback | Success/error after submit; no raw server errors |
| shadcn/ui | Form inputs, Button | Use existing Form/Input/Button or add shadcn form components as needed |

Optional for form delivery: Resend, Formspree, or similar (env var for API key). Architecture allows "Server Action or third-party."

### File structure requirements

- **Required after this story:**  
  - `app/contact/page.tsx` — implement contact form or link (replace placeholder).  
  - `lib/schemas/contact.ts` — Zod schema for contact fields; export schema and inferred type.  
  - `lib/actions/contact.ts` — Server Action: parse with schema, return `{ success, message?, error? }`; call email provider or stub.  
  - Optional: `components/sections/ContactBlock.tsx` — reusable contact form or link block.  
- **Forbidden:** Root `src/`. Schemas or actions under `app/`. Exposing raw server errors or stack traces to client. Skipping Zod or sonner.
- **Naming:** PascalCase components; kebab-case routes; camelCase functions/variables.

### Testing requirements

- No automated tests required. Manual: (1) From Home, About, Projects, Recommendations, reach contact in ≤3 clicks; (2) primary CTA goes to contact; (3) if form: invalid submit shows errors, valid submit shows sonner success/error and no raw server message; (4) if link: CTA is focusable and has descriptive label; (5) keyboard and focus order logical (NFR-A2).

### Previous story intelligence

- **Story 1.4 (done):** About page and AboutSection; Server Component; design system from Hero; metadata for SEO; no root `src/`; `app/about/page.tsx` composes section. Same pattern: page in `app/`, section in `components/sections/`, design tokens from Tailwind/shadcn.
- **Story 1.3 (done):** HeroSection with primary CTA (e.g. "Contact"); CTA should link to `/contact`. Verify hero CTA points to contact path.
- **Story 1.2 (done):** Nav has Contact link; routes include `/contact`. Placeholder contact page exists; this story replaces it with real implementation.
- **Learnings:** Reuse section pattern; keep form/action in lib; use design system consistently; Server Action + Zod + sonner is the agreed pattern for contact.

### Project context reference

- **Project:** Michelle Portfolio — professional portfolio for Christy Sebastini (reference-tier, shadcn, WCAG 2.1 AA, Core Web Vitals). [Source: _bmad-output/planning-artifacts/prd.md]
- **Epic 1:** Project Foundation & Professional Home. This story is 1.5 (contact section and path); 1.6–1.8 cover responsive, design system, SEO. [Source: _bmad-output/planning-artifacts/epics.md]
- **Project context doc:** No `project-context.md`; use PRD, architecture, and epics as source of truth.

### Story completion status

- **Status:** ready-for-dev  
- **Ultimate context engine analysis completed** — comprehensive developer guide created for Story 1.5 (Contact section and contact path). All acceptance criteria, technical requirements, architecture guardrails, and previous story learnings are captured for the dev agent.

---

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

- Contact path: Nav and Hero already linked to `/contact`; verified ≤3 clicks from Home, About, Projects, Recommendations (1 click via nav).
- Contact form: `lib/schemas/contact.ts` (Zod), `lib/actions/contact.ts` (Server Action `{ success, message?, error? }`), `components/sections/ContactBlock.tsx` (client form with useActionState + sonner), `app/contact/page.tsx` composes ContactBlock. Toaster added in root layout.
- Validation: Client-side Zod before submit; server safeParse; summary errors via sonner; no raw server errors to client.
- Code review (2026-02-24): Fixed HIGH — contact page metadata added (FR24); ContactBlock now sets aria-invalid and shows field-level errors on validation failure. Fixed LOW — redundant textarea min-height removed.

### File List

- app/contact/page.tsx
- app/layout.tsx
- components/sections/ContactBlock.tsx
- components/ui/input.tsx
- components/ui/label.tsx
- lib/actions/contact.ts
- lib/schemas/contact.ts
- package.json

### Change Log

- 2026-02-24: Story 1.5 implemented — contact form with Zod, Server Action, sonner; nav/hero CTA verified; status → review.
- 2026-02-24: Code review fixes applied — metadata on contact page; field-level errors and aria-invalid in ContactBlock; status → done.
