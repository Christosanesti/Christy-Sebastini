---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
---

# Michelle Portfolio - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Michelle Portfolio, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: A visitor can see who Christy is and her professional positioning from the home or landing experience.
FR2: A visitor can read a dedicated profile/about section with experience, sectors, and positioning.
FR3: A visitor can form a clear first impression of Christy's expertise and focus within a short scan (e.g. one screen or one scroll).
FR4: A visitor can see a list of Christy's projects (e.g. employers, clients, or initiatives).
FR5: A visitor can open at least one project to see context (e.g. role, period, or domain).
FR6: A visitor can distinguish between different projects (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial work).
FR7: (Post-MVP) A visitor can read deeper project narratives (e.g. context, outcomes, visuals) where provided.
FR8: A visitor can see evidence of credibility (e.g. recommendations, attestations, or similar proof).
FR9: A visitor can read at least one short recommendation or endorsement (e.g. Anne-Claire Petitcol) in context.
FR10: A visitor can access or view attestations or official documents where the product surfaces them (e.g. link or embed).
FR11: (Post-MVP) A visitor can download or open PDFs (e.g. recommendation letters, attestations) where offered.
FR12: A visitor can find a clear way to contact Christy (e.g. email, form, or link) from the main experience.
FR13: A visitor can reach the contact/CTA from any primary section within a small number of actions (e.g. 2–3 clicks or equivalent).
FR14: A visitor can use the primary CTA (e.g. "Contact", "Open to work") without confusion about next step.
FR15: A visitor can move between main sections (e.g. Home, About, Projects, Recommendations, Contact) via persistent or obvious navigation.
FR16: A visitor can use the site on mobile (responsive layout and touch-friendly navigation and CTAs).
FR17: A visitor can reach Projects and Contact without going through unnecessary steps.
FR18: A visitor can orient themselves (e.g. where they are in the site and how to get to key sections).
FR19: A visitor experiences a coherent visual system (layout, typography, hierarchy) aligned with a reference-tier, professional standard.
FR20: (Post-MVP) A visitor can experience optional 3D or motion-enhanced sections (e.g. hero or key sections) where implemented.
FR21: (Post-MVP) A visitor who prefers reduced motion can still complete key journeys (e.g. navigation, projects, contact) without relying on motion.
FR22: The site owner (or designated updater) can have profile, projects, recommendations, and contact information updated and published (MVP: via you/developer; post-MVP: optionally via CMS or structured process).
FR23: Updated content appears in the correct sections and maintains consistent presentation with the rest of the site.
FR24: Each major page or section can have distinct metadata (e.g. title, description) for search and link previews.
FR25: Shared links can show an appropriate preview (e.g. Open Graph) so recipients see who Christy is and what the link is.

### NonFunctional Requirements

NFR-P1: Core Web Vitals (LCP, FID, CLS) meet "good" thresholds (e.g. LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1) on representative devices and networks for core pages (Home, About, Projects, Contact).
NFR-P2: Main content (hero, profile, project list, contact) is usable without waiting on 3D or heavy motion; 3D/motion must not block or delay critical content.
NFR-P3: Initial load of above-the-fold content completes within a defined budget (e.g. ≤ 3s on fast 3G) so recruiters on slow connections can still form a first impression.
NFR-A1: Key user flows (navigation, viewing profile, viewing projects, reaching contact) meet WCAG 2.1 Level AA (perceivable, operable, understandable, robust).
NFR-A2: Interactive elements (links, buttons, CTAs) are keyboard operable and have visible focus; focus order is logical.
NFR-A3: When the product uses motion (e.g. Framer Motion, GSAP), it respects `prefers-reduced-motion` so users who request reduced motion can complete the same flows without relying on animation.
NFR-S1: The site is served over HTTPS.
NFR-S2: If a contact form or similar collects data, submissions are transmitted securely and handled in a way that avoids exposure (e.g. no sensitive data in client-side storage or logs beyond what's necessary).

### Additional Requirements

- **Starter template (Epic 1 Story 1):** Initialize with `bun create next-app@latest . --yes`; then `bunx shadcn@latest init`; install `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap`. No root `src/` folder; use App Router, Tailwind, TypeScript.
- **Data:** No database; content in code or Markdown/JSON; Zod for form/input validation.
- **Contact:** Next.js Server Action or third-party (e.g. Resend, Formspree); validate with Zod; return shape `{ success, message?, error? }`; client uses sonner for toast.
- **Frontend:** Server Components by default; Client Components only for 3D (R3F/Drei), Framer Motion, GSAP; lazy-load 3D and heavy animation; respect `prefers-reduced-motion`.
- **Hosting:** Vercel or Netlify; env vars for API keys; static or Node/serverless depending on contact implementation.
- **Structure:** `app/` (routes only), `components/` (ui, layout, sections, three), `lib/` (utils, schemas, actions); PascalCase components, kebab-case routes; no shared code under `app/`.
- **Error/loading:** Skeleton components for loading; error boundaries for client-heavy sections; no raw errors to client.
- **Responsive:** Mobile-first; breakpoints aligned with Tailwind/shadcn (sm/md/lg/xl); touch targets ≥ 44px.
- **Accessibility (UX):** WCAG 2.1 AA; semantic HTML; visible focus; form labels and errors associated; `prefers-reduced-motion` for motion; no critical content behind motion-only.
- **Design system:** shadcn/ui + Tailwind tokens; Direction A (minimal & airy) per UX; Hero, ProjectCard, RecommendationBlock, ContactSection as custom components using shadcn.
- **SEO:** Semantic HTML; Next.js metadata API; Open Graph; sitemap; clean URLs; no critical content client-only.

### FR Coverage Map

FR1: Epic 1 - See who Christy is from home/landing
FR2: Epic 1 - Read dedicated About/profile
FR3: Epic 1 - Clear first impression in one scan
FR4: Epic 2 - See list of projects
FR5: Epic 2 - Open at least one project for context
FR6: Epic 2 - Distinguish between projects
FR7: Epic 2 (post-MVP) - Deeper project narratives
FR8: Epic 3 - See evidence of credibility
FR9: Epic 3 - Read at least one recommendation in context
FR10: Epic 3 - Access attestations/official documents
FR11: Epic 3 (post-MVP) - Download/open PDFs where offered
FR12: Epic 1 - Find clear way to contact
FR13: Epic 1 - Reach contact in 2–3 actions from anywhere
FR14: Epic 1 - Use primary CTA without confusion
FR15: Epic 1 - Move between main sections via nav
FR16: Epic 1 - Use site on mobile (responsive, touch-friendly)
FR17: Epic 1 - Reach Projects and Contact without unnecessary steps
FR18: Epic 1 - Orient (where they are, how to get to key sections)
FR19: Epic 1 - Coherent reference-tier visual system
FR20: Post-MVP - Optional 3D/motion sections
FR21: Post-MVP - Reduced-motion support for key journeys
FR22: Epic 4 - Owner/updater can update and publish content
FR23: Epic 4 - Updated content in correct sections, consistent presentation
FR24: Epic 1 - Distinct metadata per major page
FR25: Epic 1 - Open Graph preview for shared links

## Epic List

### Epic 1: Project Foundation & Professional Home
Visitors can land on a live, professional site; see who Christy is and her positioning; use clear navigation; and see a visible Contact/CTA—reachable in 2–3 actions from anywhere.
**FRs covered:** FR1, FR2, FR3, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR24, FR25

### Epic 2: Projects & Experience
Visitors can see a list of Christy's projects (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial) and open at least one to see context (role, period, domain).
**FRs covered:** FR4, FR5, FR6 (FR7 post-MVP)

### Epic 3: Trust & Credibility
Visitors can see evidence of credibility, read at least one short recommendation (e.g. Anne-Claire Petitcol) in context, and access attestations/official documents where the product surfaces them.
**FRs covered:** FR8, FR9, FR10 (FR11 post-MVP)

### Epic 4: Content Structure & Owner Update Path
Profile, projects, recommendations, and contact info live in a consistent structure so the owner (or developer) can update and publish; updated content appears in the correct sections with consistent presentation.
**FRs covered:** FR22, FR23

---

## Epic 1: Project Foundation & Professional Home

Visitors can land on a live, professional site; see who Christy is and her positioning; use clear navigation; and see a visible Contact/CTA—reachable in 2–3 actions from anywhere.

**FRs covered:** FR1, FR2, FR3, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR24, FR25

### Story 1.1: Project initialization and stack setup

As a developer,
I want the project initialized with Next.js, shadcn, and 3D/motion dependencies,
So that the codebase is ready for layout, UI components, and optional 3D/motion work.

**Acceptance Criteria:**

**Given** a greenfield project directory
**When** I run `bun create next-app@latest . --yes` (or equivalent for project name)
**Then** the project has App Router, TypeScript, Tailwind CSS, ESLint, and no root `src/` folder
**And** I can run `bunx shadcn@latest init` and install `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap` without conflicts

**Given** the initialized project
**When** I run `bun run dev`
**Then** the app serves a default page without errors
**And** Tailwind and shadcn are configured (e.g. `components.json` and design tokens available)

### Story 1.2: App shell, layout, and route structure

As a visitor,
I want a consistent layout with global navigation and routes for Home, About, Projects, Recommendations, and Contact,
So that I can move between main sections and orient myself (FR15, FR18).

**Acceptance Criteria:**

**Given** the running app
**When** I view any page
**Then** a persistent or sticky nav is visible with links to Home, About, Projects, Recommendations, Contact
**And** the current page or section is indicated (e.g. active state or aria-current)

**Given** the app structure
**When** I navigate to `/`, `/about`, `/projects`, `/recommendations`, `/contact`
**Then** each route resolves to a valid page (placeholder content acceptable)
**And** layout (header/footer if used) is consistent across routes; no content under `app/` except route composition and layout

**Given** keyboard or screen reader use
**When** I tab through the nav
**Then** focus order is logical and focus is visible (NFR-A2)

### Story 1.3: Hero section with identity and primary CTA

As a visitor,
I want the home hero to show who Christy is and a clear primary CTA (e.g. Contact),
So that I form a clear first impression and know how to reach her (FR1, FR3, FR12, FR14).

**Acceptance Criteria:**

**Given** I land on the home page
**When** I view the hero (above the fold or first scroll)
**Then** Christy's name and a short positioning line (who she is / what she does) are visible
**And** a primary CTA (e.g. "Contact" or "Open to work") is visible and links to the contact path

**Given** the hero is rendered
**When** critical content (name, positioning, CTA) is present
**Then** LCP is not blocked by 3D or heavy motion (NFR-P2)
**And** hero uses semantic heading (e.g. h1) and the CTA is focusable and has a clear label

### Story 1.4: About page with profile, experience, and positioning

As a visitor,
I want a dedicated About (or profile) section/page with experience, sectors, and positioning,
So that I can read who Christy is in depth (FR2, FR3).

**Acceptance Criteria:**

**Given** I am on the site
**When** I go to the About page or section
**Then** I see profile content: experience, sectors, and professional positioning
**And** the content is readable and hierarchically clear (headings, spacing)

**Given** the About content
**When** it is rendered
**Then** it uses the same design system as the rest of the site (FR19)
**And** no critical content is client-only so crawlers and sharing work (SEO)

### Story 1.5: Contact section and contact path (CTA, form or link)

As a visitor,
I want a clear way to contact Christy (link or form) and a primary CTA reachable in 2–3 actions from anywhere,
So that I can reach her without confusion (FR12, FR13, FR14).

**Acceptance Criteria:**

**Given** I am on any primary page (Home, About, Projects, Recommendations)
**When** I look for contact
**Then** I can reach the contact path (dedicated page or section) within 2–3 clicks or equivalent actions
**And** the primary CTA (e.g. in nav or hero) leads to that contact path

**Given** the contact path is implemented as a form
**When** I submit the form
**Then** submission is validated with Zod; invalid input shows field-level or summary errors
**And** the server responds with a result shape `{ success, message?, error? }`; client shows success/error via sonner (no raw server errors to user). Submissions are transmitted securely (NFR-S2).

**Given** the contact path is implemented as a link (e.g. mailto or external)
**When** I click the CTA
**Then** I am taken to the intended destination (email client or contact page)
**And** the link is accessible (focusable, descriptive label)

### Story 1.6: Responsive layout and touch-friendly navigation

As a visitor on mobile,
I want a responsive layout and touch-friendly navigation and CTAs,
So that I can use the site on my device (FR16) and reach Projects and Contact without unnecessary steps (FR17).

**Acceptance Criteria:**

**Given** I view the site on a narrow viewport (e.g. 375px width)
**When** I use the nav and primary CTAs
**Then** touch targets are at least 44×44px where possible
**And** the layout is readable and usable (no horizontal scroll for main content); nav may collapse to a hamburger or compact pattern

**Given** any viewport in the supported range (mobile to desktop)
**When** I navigate to Projects or Contact
**Then** I can do so in a small number of actions (no unnecessary steps)
**And** breakpoints align with Tailwind/shadcn (e.g. sm/md/lg/xl) and are applied consistently

### Story 1.7: Design system application (reference-tier visual system)

As a visitor,
I want a coherent visual system (layout, typography, hierarchy) aligned with a reference-tier, professional standard,
So that the site feels serious and professional (FR19).

**Acceptance Criteria:**

**Given** any page on the site
**When** I view content
**Then** typography, spacing, and color use shadcn/Tailwind tokens consistently
**And** the visual direction matches the chosen UX direction (e.g. Direction A: minimal & airy) and reference-tier hierarchy

**Given** interactive elements (buttons, links)
**When** I use them
**Then** primary vs secondary hierarchy is clear (e.g. one primary CTA per view where appropriate)
**And** contrast meets WCAG 2.1 AA for text and UI (NFR-A1)

### Story 1.8: SEO and shareability (metadata, Open Graph)

As a recruiter or hiring manager,
I want each major page to have distinct metadata and shared links to show a proper preview,
So that search and link sharing present Christy and the site clearly (FR24, FR25).

**Acceptance Criteria:**

**Given** the app has routes for Home, About, Projects, Recommendations, Contact
**When** metadata is configured (Next.js metadata API)
**Then** each major page has a distinct title and description suitable for search and previews
**And** Open Graph (and optional Twitter card) values are set so shared links show who Christy is and what the link is

**Given** the site is built
**When** static export or SSG is used where applicable
**Then** critical content is not client-only so crawlers can index it
**And** URLs are clean and a sitemap is available if required for the deployment

---

## Epic 2: Projects & Experience

Visitors can see a list of Christy's projects (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial) and open at least one to see context (role, period, domain).

**FRs covered:** FR4, FR5, FR6 (FR7 post-MVP)

### Story 2.1: Projects list page with project cards

As a visitor,
I want to see a list of Christy's projects (employers, clients, or initiatives) as cards or list items,
So that I can scan what she has done (FR4, FR6).

**Acceptance Criteria:**

**Given** I am on the site
**When** I go to the Projects page (or Projects section)
**Then** I see a list or grid of projects, each distinguishable (e.g. title, optional thumbnail)
**And** each project has a way to open or view more (e.g. link to detail or expand)

**Given** the projects list
**When** it is rendered
**Then** it uses the design system (e.g. ProjectCard or equivalent) and is responsive (e.g. 1 column on mobile, 2–3 on desktop)
**And** loading state uses a Skeleton or equivalent where content is async

### Story 2.2: Project detail page with context (role, period, domain)

As a visitor,
I want to open at least one project and see context (e.g. role, period, domain),
So that I understand what Christy did (FR5).

**Acceptance Criteria:**

**Given** I am on the Projects list
**When** I click a project (e.g. Ubisoft, Transavia, ViaMapa)
**Then** I am taken to a project detail page (e.g. `/projects/[slug]`)
**And** the detail page shows context: at least role, period, or domain (and other fields as defined in content)

**Given** the project detail page
**When** it is rendered
**Then** it has its own metadata (title/description) for SEO
**And** navigation back to Projects or to other sections is available (FR18)

### Story 2.3: Real project content from Assets integrated

As a visitor,
I want to see real projects (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial work) with correct labels and content,
So that I can distinguish between different projects and trust the content (FR4, FR6).

**Acceptance Criteria:**

**Given** project content is sourced from Assets or structured content (MD/JSON)
**When** the Projects list and detail pages are loaded
**Then** at least the key projects from the PRD Assets inventory (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial, Cinabre Paris) are present and distinguishable
**And** each project’s title and context are correct and displayed in the right sections (no wrong content on wrong project)

**Given** assets (e.g. logos, PDFs) are referenced
**When** they are used on project cards or detail
**Then** paths are correct and assets are accessible (or fallback if missing)
**And** images have appropriate alt text for accessibility

---

## Epic 3: Trust & Credibility

Visitors can see evidence of credibility, read at least one short recommendation (e.g. Anne-Claire Petitcol) in context, and access attestations/official documents where the product surfaces them.

**FRs covered:** FR8, FR9, FR10 (FR11 post-MVP)

### Story 3.1: Recommendations / Trust section or page structure

As a visitor,
I want a dedicated place (section or page) for recommendations and attestations,
So that I can find evidence of credibility (FR8).

**Acceptance Criteria:**

**Given** I am on the site
**When** I go to Recommendations (or Trust) via nav or link
**Then** I see a section or page dedicated to credibility (recommendations, attestations, or similar)
**And** the section is clearly labeled and uses the design system (e.g. RecommendationBlock or TrustBlock)

**Given** the Recommendations/Trust area
**When** it is empty or has minimal content
**Then** an empty state or placeholder is shown (no blank block that causes confusion)
**And** the layout is consistent with the rest of the site

### Story 3.2: At least one recommendation in context (e.g. Anne-Claire Petitcol)

As a visitor,
I want to read at least one short recommendation or endorsement (e.g. Anne-Claire Petitcol) in context,
So that I can trust Christy’s credibility (FR9).

**Acceptance Criteria:**

**Given** the Recommendations/Trust section or page
**When** I view it
**Then** at least one recommendation is shown (e.g. quote or short excerpt) with attributor (name, role)
**And** the content is from the Assets (e.g. Lettre de recommandation Anne-Claire Petitcol) or from defined structured content

**Given** the recommendation block
**When** it is rendered
**Then** it is readable and visually distinct (e.g. quote styling, attribution)
**And** optional link to "Read full recommendation" or PDF is present and accessible

### Story 3.3: Attestations and official documents linked or embedded

As a visitor,
I want to access or view attestations or official documents where the product surfaces them,
So that I can verify credentials (FR10).

**Acceptance Criteria:**

**Given** attestations or official documents (e.g. Attestation de résultat C. SEBASTINI.pdf) are in scope
**When** the product surfaces them (e.g. in Recommendations or About)
**Then** they are linked or embedded so I can open or view them
**And** link text or label is descriptive (e.g. "View attestation" or "Attestation – PDF")

**Given** any linked document
**When** I click the link
**Then** the document opens (new tab or same tab as designed) or is embedded without breaking layout
**And** no sensitive data is exposed in client-side storage or logs (NFR-S2)

---

## Epic 4: Content Structure & Owner Update Path

Profile, projects, recommendations, and contact info live in a consistent structure so the owner (or developer) can update and publish; updated content appears in the correct sections with consistent presentation.

**FRs covered:** FR22, FR23

### Story 4.1: Structured content for profile and About

As a developer or site owner,
I want profile and About content in a single structured source (e.g. Markdown or JSON),
So that updates are made in one place and appear correctly on the site (FR22, FR23).

**Acceptance Criteria:**

**Given** profile and About content (experience, sectors, positioning)
**When** they are stored in a defined structure (e.g. `content/profile.json` or `content/about.md`)
**Then** the About page (or section) reads from this source and renders the content
**And** changing the source and rebuilding (or redeploying) updates the site without code changes to components beyond the data binding

**Given** the structure is in place
**When** content is updated
**Then** the presentation remains consistent (same layout, typography, and design system)
**And** no duplicate copy lives in component code for profile/About; a single source of truth is used

### Story 4.2: Structured content for projects

As a developer or site owner,
I want project list and project detail content in a structured source (e.g. Markdown or JSON),
So that projects can be updated without editing page components (FR22, FR23).

**Acceptance Criteria:**

**Given** project data (title, slug, role, period, domain, assets, etc.)
**When** it is stored in a defined structure (e.g. `content/projects.json` or one file per project in `content/projects/`)
**Then** the Projects list and project detail pages read from this source
**And** adding or editing a project is done by updating the content source and redeploying (MVP: no CMS)

**Given** the structure is in place
**When** content is updated
**Then** new or updated projects appear in the correct sections with consistent presentation (FR23)
**And** slugs or IDs map correctly to detail routes (e.g. `/projects/[slug]`)

### Story 4.3: Structured content for recommendations and contact info

As a developer or site owner,
I want recommendations and contact info in a structured source,
So that recommendations and contact details can be updated in one place (FR22, FR23).

**Acceptance Criteria:**

**Given** recommendation content (quotes, attributors, links to PDFs) and contact info (email, CTA copy)
**When** they are stored in a defined structure (e.g. `content/recommendations.json`, `content/contact.json` or equivalent)
**Then** the Recommendations/Trust section and Contact section/page read from these sources
**And** updating the source and redeploying updates the site without changing component code for content

**Given** the structure is in place
**When** content is updated
**Then** updated content appears in the correct sections with consistent presentation
**And** contact info (e.g. email or form recipient) is not hardcoded in the repo in a way that blocks safe updates (e.g. env or content file)

### Story 4.4: Update process and consistency documentation

As a developer or site owner,
I want a clear update process (and optionally runbook/README) so content updates are done consistently,
So that the site stays accurate and presentation stays consistent (FR22, FR23).

**Acceptance Criteria:**

**Given** the content structure from Stories 4.1–4.3
**When** someone (developer or owner) needs to update profile, projects, recommendations, or contact info
**Then** the location of each content source is documented (e.g. in README or CONTENT.md)
**And** the steps to update and redeploy (e.g. edit file, commit, deploy) are clear so updates are repeatable

**Given** an update is performed
**When** content is changed and deployed
**Then** the site reflects the change in the correct sections
**And** no manual copy-paste into multiple files is required for a single logical update (single source of truth per content type)
