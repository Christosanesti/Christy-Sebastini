# Story 1.8: SEO and shareability (metadata, Open Graph)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a recruiter or hiring manager,
I want each major page to have distinct metadata and shared links to show a proper preview,
so that search and link sharing present Christy and the site clearly (FR24, FR25).

## Acceptance Criteria

1. **Given** the app has routes for Home, About, Projects, Recommendations, Contact  
   **When** metadata is configured (Next.js metadata API)  
   **Then** each major page has a distinct title and description suitable for search and previews  
   **And** Open Graph (and optional Twitter card) values are set so shared links show who Christy is and what the link is

2. **Given** the site is built  
   **When** static export or SSG is used where applicable  
   **Then** critical content is not client-only so crawlers can index it  
   **And** URLs are clean and a sitemap is available if required for the deployment

## Tasks / Subtasks

- [x] Configure per-page metadata (AC: #1)
  - [x] Ensure root layout provides default metadata and Open Graph/Twitter base; child routes override with page-specific title and description
  - [x] Add or complete metadata (title, description) for Home, About, Projects, Recommendations, Contact; include Open Graph (og:title, og:description, og:image, og:url, og:type) and optional Twitter card (twitter:card, twitter:title, twitter:description, twitter:image)
  - [x] Use a shared OG image or per-page image where appropriate; ensure previews identify "Christy Sebastini" and the page purpose
- [x] Sitemap and crawlability (AC: #2)
  - [x] Add Next.js sitemap (e.g. app/sitemap.ts) covering main routes; ensure clean URLs (no hashes or query-only for core pages)
  - [x] Confirm critical content (hero, about, nav, contact) is server-rendered or static; no critical content hidden behind client-only render

## Dev Notes

- FR24, FR25 and architecture: "SEO: Semantic HTML; Next.js metadata API; Open Graph; sitemap; clean URLs; no critical content client-only." [Source: epics.md, architecture.md, prd.md]
- Existing state: Root layout has basic `metadata` (title, description only). About and Contact pages have per-page `metadata`. Projects and Recommendations have no metadata. No Open Graph or Twitter card fields; no sitemap found.
- Do not change semantic HTML or content structure; only add/complete metadata, OG/Twitter, and sitemap. Preserve existing design and routes.

### Project Structure Notes

- Metadata: Next.js App Router — export `metadata` or `generateMetadata` from `app/layout.tsx` and each `app/*/page.tsx`. Optional: shared metadata config in `lib/metadata.ts` for defaults and OG image path.
- Sitemap: `app/sitemap.ts` (or `sitemap.xml` route) per Next.js docs. No root `src/`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md — Story 1.8, FR24, FR25]
- [Source: _bmad-output/planning-artifacts/architecture.md — SEO, Frontend Architecture, Cross-Cutting Concerns]
- [Source: _bmad-output/planning-artifacts/prd.md — SEO strategy, FR24, FR25]

---

## Developer Context (for Dev Agent)

### Technical requirements

- **Next.js metadata API:** Use the built-in `Metadata` type and `metadata` export (or `generateMetadata` for dynamic routes). Set `title`, `description`, `openGraph` (title, description, url, type, images), and optionally `twitter` (card, title, description, image). Base URL for canonical and OG url should be the production URL (e.g. env `NEXT_PUBLIC_SITE_URL` or derive from request in generateMetadata). [Source: Next.js Metadata docs, architecture.md]
- **Per-page distinct metadata:** Home: Christy Sebastini + positioning; About: profile/experience; Projects: projects list; Recommendations: recommendations/trust; Contact: contact/CTA. Each title and description must be unique and suitable for search and link previews.
- **Open Graph:** og:title, og:description, og:url, og:type (website), og:image (absolute URL to image). Optional: og:site_name. Image: use a default portfolio/OG image (e.g. in `public/`) or hero asset; ensure absolute URL in production.
- **Twitter card:** twitter:card (summary_large_image or summary), twitter:title, twitter:description, twitter:image. Optional but recommended for shareability.
- **Sitemap:** Implement `app/sitemap.ts` returning a sitemap array for `/`, `/about`, `/projects`, `/recommendations`, `/contact`. Use same base URL as metadata. No dynamic project slugs required for this story unless already in route structure.
- **Crawlability:** Architecture states "critical content must be server-rendered or static." Current pages are Server Components; ensure no critical text or links are only in client-only components. No change to component boundaries unless something is currently client-only that should be server-rendered for SEO.

### Architecture compliance

- **Structure:** No new `src/`. Metadata in `app/layout.tsx` and `app/*/page.tsx`; optional `lib/metadata.ts` for shared defaults. Sitemap in `app/sitemap.ts`.
- **Naming:** PascalCase components; kebab-case routes; existing conventions unchanged.
- **Stack:** Next.js App Router metadata API only; no new dependencies. Use existing env pattern for `NEXT_PUBLIC_SITE_URL` if needed for absolute URLs.
- **Enforcement:** Do not put critical SEO content (titles, descriptions, main headings) in client-only components. Do not duplicate metadata logic across files without a shared helper if it reduces consistency.

### Library and framework requirements

| Package / API | Purpose | Notes |
|--------------|---------|--------|
| Next.js Metadata | title, description, openGraph, twitter | Use `metadata` export; type `Metadata` from `next` |
| Next.js Sitemap | app/sitemap.ts | Return array of { url, lastModified?, changeFrequency?, priority? } |

No new npm packages. Next.js 14+ built-in metadata and sitemap support only.

### File structure requirements

- **Likely to touch:**  
  - `app/layout.tsx` — add openGraph, twitter, and optional metadataBase; keep or refine title/description.  
  - `app/page.tsx` — ensure metadata (title, description) for Home; override if layout only has defaults.  
  - `app/about/page.tsx` — add openGraph and twitter to existing metadata.  
  - `app/contact/page.tsx` — add openGraph and twitter to existing metadata.  
  - `app/projects/page.tsx` — add full metadata (title, description, openGraph, twitter).  
  - `app/recommendations/page.tsx` — add full metadata (title, description, openGraph, twitter).  
  - `app/sitemap.ts` — new file; export default function returning sitemap entries for main routes.  
  - Optional: `lib/metadata.ts` — shared defaultMetadata, baseUrl, defaultOgImage for reuse.  
  - Optional: `public/og-image.png` (or similar) — default OG image if not already present.
- **Forbidden:** Root `src/`. Critical SEO content in client-only components. Duplicate or inconsistent titles/descriptions across pages.
- **Naming:** Existing conventions; sitemap file is `sitemap.ts` per Next.js convention.

### Testing requirements

- No automated tests required. Manual: (1) View page source or use "View Meta Tags" for each route; confirm distinct title and description. (2) Use a link preview tool (e.g. Facebook Sharing Debugger, Twitter Card Validator, or LinkedIn Post Inspector) with production or staging URL; confirm OG/Twitter preview shows Christy and correct page. (3) Fetch `/sitemap.xml` (or equivalent) and confirm all main routes listed with valid URLs. (4) Confirm no critical content (hero, about, contact) is only rendered on client (disable JS and check content is present).

### Previous story intelligence

- **Story 1.7 (done):** Design system and tokens; layout, Nav, Hero, About, Contact, projects/recommendations placeholders. Metadata and sitemap do not change layout or components; only add exports and one new file. Do not alter design or responsive behavior.
- **Story 1.6–1.5:** Nav and Contact CTA; routes and pages exist. This story adds metadata and sitemap to existing routes.
- **Learnings:** About and Contact already use `export const metadata`; replicate that pattern for Projects and Recommendations. Root layout already has basic metadata; extend with openGraph and twitter. Use same type `Metadata` from `next` everywhere.

### Git intelligence summary

- Not run. Rely on previous story files and codebase grep for current metadata usage (layout, about, contact have metadata; projects and recommendations do not).

### Latest tech information

- Next.js 14+ App Router: `metadata` export and `generateMetadata`; `metadataBase` in root layout for absolute URLs in OG/Twitter. Sitemap: `app/sitemap.ts` or `app/sitemap.xml/route.ts` returning array or XML. Open Graph and Twitter card fields documented in Next.js Metadata reference. Use canonical URLs (production base) for og:url and sitemap.

### Project context reference

- **Project:** Michelle Portfolio — professional portfolio for Christy Sebastini; reference-tier, shadcn, WCAG 2.1 AA. [Source: _bmad-output/planning-artifacts/prd.md]
- **Epic 1:** Project Foundation & Professional Home. This story is 1.8 (SEO and shareability); final story in Epic 1. [Source: _bmad-output/planning-artifacts/epics.md]
- **Project context doc:** No `project-context.md`; use PRD, architecture, and epics as source of truth.

### Story completion status

- **Status:** ready-for-dev  
- **Ultimate context engine analysis completed** — comprehensive developer guide created for Story 1.8 (SEO and shareability: metadata, Open Graph, sitemap). All acceptance criteria, technical requirements, architecture guardrails, and previous story learnings are captured for the dev agent.

---

## Change Log

- Story context created for 1.8 SEO and shareability (metadata, Open Graph). (Date: 2026-02-24)
- Implemented per-page metadata (layout + Home, About, Contact, Projects, Recommendations), Open Graph/Twitter, lib/metadata.ts, app/sitemap.ts; added NEXT_PUBLIC_SITE_URL to .env.example. (Date: 2026-02-24)
- Code review: fixed missing public/og-image.png, Dev Agent Record placeholder, File List + public/og-image.png; status → done. (Date: 2026-02-24)

---

## Senior Developer Review (AI)

- [x] Story file loaded; Status verified (review → done after fixes)
- [x] Acceptance Criteria cross-checked against implementation
- [x] File List reviewed; added public/og-image.png; .env.example noted as possibly already committed
- [x] Code quality review on changed files
- [x] HIGH fixed: added public/og-image.png (1200×630 default OG image)
- [x] MEDIUM fixed: {{agent_model_name_version}} replaced; File List updated
- [x] Outcome: Approve (fixes applied)
- [x] Change Log updated; Status set to done; Sprint status synced

---

## Dev Agent Record

### Agent Model Used

N/A (code review fixes applied by AI)

### Debug Log References

### Completion Notes List

- Root layout: metadataBase, default title/description, openGraph and twitter base. lib/metadata.ts: buildMetadata(), baseUrl (NEXT_PUBLIC_SITE_URL), defaultOgImage (/og-image.png), siteName.
- All five routes export metadata via buildMetadata (title, description, path); OG and Twitter card set per page. Sitemap: app/sitemap.ts returns /, /about, /projects, /recommendations, /contact with lastModified, changeFrequency, priority.
- Crawlability: Hero, About, Nav, Contact are used from Server Components; Nav and ContactBlock are client components but Next.js still sends initial markup in static build—no change to component boundaries. Build passes; sitemap.xml generated.
- **Code review (2026-02-24):** Fixed missing public/og-image.png (HIGH); replaced agent model placeholder; added Senior Developer Review section. File List verified; .env.example was in list (may have been committed earlier).

### File List

- lib/metadata.ts (new)
- app/layout.tsx (modified)
- app/page.tsx (modified)
- app/about/page.tsx (modified)
- app/contact/page.tsx (modified)
- app/projects/page.tsx (modified)
- app/recommendations/page.tsx (modified)
- app/sitemap.ts (new)
- public/og-image.png (new)
- .env.example (modified)
