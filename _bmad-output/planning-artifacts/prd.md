---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments:
  - Assets/Websites list.txt
  - Assets/ (full folder inventory below)
documentCounts:
  briefCount: 0
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
  clientAssetsCount: 17
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
techStack:
  - Next.js
  - Three.js
  - Drei
  - React Three Fiber
  - shadcn/ui
  - Framer Motion
  - GSAP
workflowType: 'prd'
---

# Product Requirements Document - Michelle Portfolio

**Author:** Nawid
**Date:** 2026-02-24

## Executive Summary

**Christy Sebastini** needs a professional portfolio website that presents her experience, projects, and credentials so she stands out to recruiters, hiring managers, and potential clients. The product is a greenfield web app: one cohesive site that replaces scattered links and documents with a single, memorable presence. Success means visitors quickly understand who she is, what she's done (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial work), and why she's a strong candidate or partner.

### What Makes This Special

- **Reference-tier presentation:** The site should feel in the same league as the provided references (e.g. catnipster.store, viessmann.fr, mawzi.com, newfooddata.com, proteinesxtc.com)—strong layout, typography, and visual hierarchy.
- **3D and motion:** Use of **Three.js**, **React Three Fiber**, and **Drei** for optional 3D or spatial elements, plus **Framer Motion** and **GSAP** for scroll- and interaction-driven animation, so the portfolio feels modern and distinctive without sacrificing clarity or performance.
- **Structured, accessible UI:** **shadcn/ui** and a consistent design system keep the site readable, accessible, and maintainable while still allowing a custom, high-end look.
- **Content-backed credibility:** Surface real proof points—attestations, letters of recommendation (e.g. Anne-Claire Petitcol), project summaries, and professional documents—so the experience is credible and verifiable.

### Project Classification

| Field | Value |
|-------|--------|
| **Project type** | Web app (portfolio site) |
| **Domain** | General (personal branding / professional portfolio) |
| **Complexity** | Low |
| **Project context** | Greenfield |
| **Tech stack** | Next.js, Three.js, Drei, React Three Fiber, shadcn/ui, Framer Motion, GSAP |

### Client Assets Inventory (Assets folder)

All content in `Assets/` is in scope for the portfolio. Use this inventory so no asset is missed during implementation.

| Asset | Suggested use |
|-------|----------------|
| **Websites list.txt** | Design references (catnipster.store, viessmann.fr, mawzi.com, newfooddata.com, proteinesxtc.com). |
| **Attestation de résultat C. SEBASTINI.pdf** | Trust / credentials — attestation; link or embed in About or dedicated credentials section. |
| **Lettre de recommandation Anne-Claire Petitcol.pdf** | Recommendations — letter of recommendation; excerpt or link (FR8–FR11). |
| **UBISOFT.pdf** | Projects — Ubisoft experience; project page or case summary. |
| **Logo-Ubisoft.pdf** | Projects — Ubisoft visual asset for project block or thumbnail. |
| **Transavia.pdf** | Projects — Transavia experience; project page or case summary. |
| **Présentation-ViaMapa.pptx** | Projects — ViaMapa; use slides as source for project narrative, visuals, or PDF export for download. |
| **Projet entrepreneurial.pdf** | Projects — Entrepreneurial project; project page or case summary. |
| **Cinabre-paris.com.pdf** | Projects / experience — Cinabre Paris; project or employer reference. |
| **Workelo - Recrutement avec CV.pdf** | Experience / recruitment — Workelo context; optional link or mention in About/Experience. |
| **photo_2026-02-24_13-13-41.jpg** | About / hero / visuals — photo asset (use for profile, hero, or gallery). |
| **photo_2026-02-24_13-14-48.jpg** | About / hero / visuals — photo asset. |
| **photo_2026-02-24_13-31-40.jpg** | About / hero / visuals — photo asset. |
| **photo_2026-02-24_14-45-33.jpg** | About / hero / visuals — photo asset. |
| **photo_2026-02-24_14-45-40.jpg** | About / hero / visuals — photo asset. |
| **photo_2026-02-24_14-45-53.jpg** | About / hero / visuals — photo asset. |

**Total:** 1 reference list, 8 PDFs, 1 presentation (PPTX), 6 photos. All should be accounted for in content, Projects, Trust/Credentials, or visual design.

The sections below define success, scope, journeys, and requirements that deliver this vision.

## Success Criteria

### User Success

- **Primary visitors** (recruiters, hiring managers, clients) quickly understand who Christy is, her experience, and key proof points (e.g. Ubisoft, Transavia, ViaMapa).
- They can **complete key actions**: view projects, read recommendations, find contact/CTA without friction.
- **Emotional outcome:** "This looks serious and professional" within the first 30–60 seconds; no confusion about expertise or how to reach her.

### Business Success

- **Short term (e.g. 3 months):** Portfolio is live, shareable, and used in applications and conversations; no "I'll send you my CV" as the only artifact.
- **Medium term (e.g. 6–12 months):** Measurable use in job/opportunity applications; Christy or you can point to "X applications used the portfolio" or "Y interviews mentioned the site."
- **Indicator of success:** Quality leads or interviews where the portfolio is part of the story, not just a nice-to-have.

### Technical Success

- **Performance:** Strong Core Web Vitals (LCP, FID, CLS) so the site feels fast on typical devices and networks.
- **Reliability:** Uptime and stability so links shared in applications always work.
- **Stack delivered:** Next.js, Three.js/R3F/Drei, shadcn, Framer Motion, GSAP implemented as planned; 3D/motion used where it adds value without hurting performance or accessibility.
- **Accessibility:** Meets a defined baseline (e.g. WCAG 2.1 AA for key flows) so it doesn't exclude recruiters or clients using assistive tech.

### Measurable Outcomes

- Time-to-understanding: a recruiter can summarize "who she is and what she does" after one pass (qualitative check).
- Contact/CTA is reachable within 2–3 clicks from any page.
- No critical accessibility or performance regressions before launch (tooling + manual check).

## Product Scope

### MVP - Minimum Viable Product

- **Core pages:** Home, About/Profile, Projects (with real projects from assets), Contact/CTA.
- **Content:** Integrate existing assets (recommendations, attestations, key projects) in a clear, scannable way.
- **Design:** Reference-tier layout and hierarchy; shadcn-based UI; optional light motion (e.g. Framer Motion) where it supports clarity.
- **Technical:** Next.js, responsive, SEO basics, fast load, accessible.

### Growth Features (Post-MVP)

- **3D and motion:** Intentional use of Three.js/R3F/Drei and GSAP for hero/section moments that reinforce "reference-tier" without hurting usability.
- **Case studies:** Deeper project pages with context, results, and visuals.
- **Content polish:** Refined copy, more proof points, optional PDFs/downloads.

### Vision (Future)

- Ongoing updates (new projects, recommendations, roles).
- Optional: blog, talks, or thought leadership if it supports her positioning.
- Optional: multi-language if she targets multiple markets.

The following user journeys illustrate how these scope levels play out for different visitors.

## User Journeys

### 1. Recruiter / HR (Primary – Success Path)

*Marie, 34, internal recruiter at a mid-size company.*

- **Opening:** She has 50 applications for a role. She opens Christy's LinkedIn, sees "Portfolio" and clicks through. She needs a clear, professional signal in under a minute.
- **Rising action:** Lands on the portfolio. Sees a clear hero and "Who I am" so she immediately gets Christy's profile (e.g. experience, sectors). Clicks "Projects," scans Ubisoft, Transavia, ViaMapa and similar. Reads one short recommendation to confirm credibility. Looks for "Contact" or "Open to work."
- **Climax:** She can answer "Who is she? What has she done? Can I trust it?" and finds a clear CTA (email, LinkedIn, or form) without digging.
- **Resolution:** Adds Christy to the shortlist and shares the portfolio link with the hiring manager. The site did the job of a first screening.

### 2. Hiring Manager / Potential Client (Primary – Different Goal)

*Thomas, 42, head of product considering a consultant or hire.*

- **Opening:** He got the portfolio link from a colleague or LinkedIn. He cares about depth of experience and fit with his team, not only "looks professional."
- **Rising action:** Goes to "Projects" or "Experience." Wants to see *what* Christy did (context, role, outcome), not just company names. Might open a recommendation PDF or attestation if linked. Checks if the kind of work (e.g. product, data, entrepreneurship) matches his need.
- **Climax:** Finds enough evidence (projects + recommendations + optional case story) to decide "worth a call" or "not this time."
- **Resolution:** Either reaches out via Contact/CTA or bookmarks the site for later. No dead ends or "I still don't know what she actually does."

### 3. Christy (Site Owner / Content Updater)

*Christy wants the site to stay current and accurate.*

- **Opening:** She has a new role, project, or recommendation and wants it on the site without depending on a developer every time.
- **Rising action:** If we scope a simple CMS or structured content (e.g. MD/JSON + clear process): she (or you) adds or edits content, previews, then publishes. If MVP is "developer updates": she sends you the new asset or text and you deploy.
- **Climax:** New content is live and looks consistent with the rest of the site.
- **Resolution:** Portfolio stays up to date; she can share the link with confidence.

### Journey Requirements Summary

| Journey | Capabilities Surfaced |
|--------|------------------------|
| Recruiter (success) | Clear home/hero, About, Projects list, Recommendations/trust, Contact/CTA, fast scan, mobile-friendly |
| Hiring manager / client | Deeper project pages (context, role, outcomes), optional PDFs/attestations, clear navigation, Contact |
| Christy (owner) | Content update path (CMS or defined process), consistency of layout and tone, optional preview before publish |

For MVP, Christy's journey is satisfied by manual updates (you); Growth can add a simple admin or content workflow.

## Web App Specific Requirements

Technical choices below support the journeys above and the stated stack.

### Project-Type Overview

Single-site professional portfolio for Christy Sebastini. Next.js-based web app with optional 3D (Three.js/R3F/Drei) and motion (Framer Motion, GSAP). Content is mostly static; interactivity is for presentation and UX, not real-time or multi-user features.

### Technical Architecture Considerations

- **SPA vs MPA:** Prefer **hybrid** (Next.js App Router): static or SSG for core pages (Home, About, Projects, Contact) for SEO and fast load; client components only where needed (3D scenes, animations). Avoid full SPA for the whole site so crawlers and sharing work well.
- **Browser matrix:** Target **evergreen** (Chrome, Firefox, Safari, Edge last 2 versions) and **mobile** (iOS Safari, Chrome Android). No IE. Optional: detect WebGL for 3D and show a fallback (e.g. static hero or image) when unsupported.
- **Responsive design:** Mobile-first; breakpoints aligned with shadcn and reference sites. Touch-friendly CTAs and nav; 3D/motion tuned so it doesn't block or slow core content on low-end devices.
- **Performance targets:** Strong Core Web Vitals (LCP, FID, CLS). Lazy-load 3D and heavy motion where possible; avoid blocking main content. Consider reduced motion or no-3D for users who prefer it or on slow connections.
- **SEO strategy:** Semantic HTML, meta titles/descriptions per page, Open Graph (and optional Twitter cards) for link previews. Use Next.js metadata API. Sitemap and clean URLs. No critical content behind client-only render.
- **Accessibility level:** WCAG 2.1 AA for key flows (navigation, projects, contact). Keyboard and screen-reader friendly; focus management in modals/nav; sufficient contrast and touch targets. Respect `prefers-reduced-motion` (e.g. tone down or disable GSAP/Framer Motion where appropriate).

### Implementation Considerations

- **Stack:** Next.js (App Router), shadcn/ui, Three.js + React Three Fiber + Drei, Framer Motion, GSAP. Use React Server Components for static content; client boundaries only for 3D and animation.
- **Hosting:** Static export or Node server (Vercel/Netlify or similar). Ensure 3D/motion and any client-only features work in the chosen deployment model.
- **Content:** MVP: content in code or Markdown/JSON; no CMS required. Growth: optional headless CMS or structured content pipeline for Christy to update copy/projects without code deploys.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

- **MVP Approach:** Experience MVP — the smallest set of pages and content that makes the portfolio "useful": visitors understand who Christy is, see proof (projects, recommendations), and can reach her. No CMS required for MVP; content in code or Markdown/JSON; you handle updates.
- **Resource Requirements:** Single developer (you) or small team. Skills: Next.js, React, shadcn, optional 3D/motion. Design can be reference-led (e.g. sites list) with light customisation.

### MVP Feature Set (Phase 1)

- **Core User Journeys Supported:** Recruiter (scan + contact); Hiring manager / client (projects + credibility + contact). Christy's journey = you update content and deploy.
- **Must-Have Capabilities:** Home (hero + clarity), About/Profile, Projects (list + key projects from assets), Recommendations/trust (e.g. Anne-Claire Petitcol + attestations), Contact/CTA; responsive; SEO basics (meta, OG); WCAG 2.1 AA for key flows; stack in place (Next.js, shadcn; 3D/motion optional in MVP or light use).

### Post-MVP Features

- **Phase 2 (Growth):** Intentional 3D (R3F/Drei) and motion (GSAP/Framer) for hero/sections; deeper project pages (context, outcomes); optional PDFs/downloads; content polish.
- **Phase 3 (Expansion):** Ongoing content updates; optional blog/talks; optional multi-language; optional CMS or structured pipeline for Christy to self-serve updates.

### Risk Mitigation Strategy

- **Technical Risks:** Biggest unknowns = 3D/motion performance and accessibility. Mitigation: keep 3D/motion optional or minimal in MVP; lazy-load; respect `prefers-reduced-motion`; fallbacks for no-WebGL.
- **Market Risks:** Risk = "looks generic." Mitigation: MVP still hits reference-tier layout and hierarchy; Phase 2 adds distinctive 3D/motion.
- **Resource Risks:** If bandwidth is tight, ship MVP without 3D/motion and add in Phase 2.

## Functional Requirements

These FRs form the capability contract: UX designs for them, implementation delivers them, and anything not listed is out of scope unless added.

### Identity & Profile

- FR1: A visitor can see who Christy is and her professional positioning from the home or landing experience.
- FR2: A visitor can read a dedicated profile/about section with experience, sectors, and positioning.
- FR3: A visitor can form a clear first impression of Christy's expertise and focus within a short scan (e.g. one screen or one scroll).

### Projects & Experience

- FR4: A visitor can see a list of Christy's projects (e.g. employers, clients, or initiatives).
- FR5: A visitor can open at least one project to see context (e.g. role, period, or domain).
- FR6: A visitor can distinguish between different projects (e.g. Ubisoft, Transavia, ViaMapa, entrepreneurial work).
- FR7: (Post-MVP) A visitor can read deeper project narratives (e.g. context, outcomes, visuals) where provided.

### Trust & Credibility

- FR8: A visitor can see evidence of credibility (e.g. recommendations, attestations, or similar proof).
- FR9: A visitor can read at least one short recommendation or endorsement (e.g. Anne-Claire Petitcol) in context.
- FR10: A visitor can access or view attestations or official documents where the product surfaces them (e.g. link or embed).
- FR11: (Post-MVP) A visitor can download or open PDFs (e.g. recommendation letters, attestations) where offered.

### Contact & Conversion

- FR12: A visitor can find a clear way to contact Christy (e.g. email, form, or link) from the main experience.
- FR13: A visitor can reach the contact/CTA from any primary section within a small number of actions (e.g. 2–3 clicks or equivalent).
- FR14: A visitor can use the primary CTA (e.g. "Contact", "Open to work") without confusion about next step.

### Navigation & Discovery

- FR15: A visitor can move between main sections (e.g. Home, About, Projects, Recommendations, Contact) via persistent or obvious navigation.
- FR16: A visitor can use the site on mobile (responsive layout and touch-friendly navigation and CTAs).
- FR17: A visitor can reach Projects and Contact without going through unnecessary steps.
- FR18: A visitor can orient themselves (e.g. where they are in the site and how to get to key sections).

### Presentation & Polish

- FR19: A visitor experiences a coherent visual system (layout, typography, hierarchy) aligned with a reference-tier, professional standard.
- FR20: (Post-MVP) A visitor can experience optional 3D or motion-enhanced sections (e.g. hero or key sections) where implemented.
- FR21: (Post-MVP) A visitor who prefers reduced motion can still complete key journeys (e.g. navigation, projects, contact) without relying on motion.

### Content Management (Site Owner)

- FR22: The site owner (or designated updater) can have profile, projects, recommendations, and contact information updated and published (MVP: via you/developer; post-MVP: optionally via CMS or structured process).
- FR23: Updated content appears in the correct sections and maintains consistent presentation with the rest of the site.

### SEO & Shareability

- FR24: Each major page or section can have distinct metadata (e.g. title, description) for search and link previews.
- FR25: Shared links can show an appropriate preview (e.g. Open Graph) so recipients see who Christy is and what the link is.

## Non-Functional Requirements

### Performance

- NFR-P1: Core Web Vitals (LCP, FID, CLS) meet "good" thresholds (e.g. LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1) on representative devices and networks for core pages (Home, About, Projects, Contact).
- NFR-P2: Main content (hero, profile, project list, contact) is usable without waiting on 3D or heavy motion; 3D/motion must not block or delay critical content.
- NFR-P3: Initial load of above-the-fold content completes within a defined budget (e.g. ≤ 3s on fast 3G) so recruiters on slow connections can still form a first impression.

### Accessibility

- NFR-A1: Key user flows (navigation, viewing profile, viewing projects, reaching contact) meet WCAG 2.1 Level AA (perceivable, operable, understandable, robust).
- NFR-A2: Interactive elements (links, buttons, CTAs) are keyboard operable and have visible focus; focus order is logical.
- NFR-A3: When the product uses motion (e.g. Framer Motion, GSAP), it respects `prefers-reduced-motion` so users who request reduced motion can complete the same flows without relying on animation.

### Security

- NFR-S1: The site is served over HTTPS.
- NFR-S2: If a contact form or similar collects data, submissions are transmitted securely and handled in a way that avoids exposure (e.g. no sensitive data in client-side storage or logs beyond what's necessary).
