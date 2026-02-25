# Content

Structured site copy lives here. Edit these files and redeploy to update the site without changing component code.

**Single source of truth:** Each content type has exactly one source file (listed below). Update that file and redeploy; you do not need to edit multiple places. No content is duplicated in component code — all data is loaded from `content/*.json` via loaders in `lib/`.

## Profile and About

- **File:** `profile.json`
- **Used by:** About page (`/about`)
- **How to edit:** Edit `content/profile.json`. Rebuild or redeploy for changes to appear.
- **JSON shape:** Top-level: `heading`, `intro`, and three section objects — `experience`, `sectors`, `positioning`. Each section has `title` and `paragraph` (strings). See `lib/schemas/profile.ts` for the full schema.

## Projects

- **File:** `projects.json`
- **Used by:** Projects list (`/projects`), project detail (`/projects/[slug]`)
- **How to edit:** Edit `content/projects.json`. Rebuild or redeploy for changes to appear. Array order = list order. Slug must match route `/projects/[slug]`.
- **JSON shape:** Array of project objects. Fields (camelCase): `slug`, `title`, `thumbnail` (optional), `role`, `period`, `domain`, `documentUrl`, `documentLabel`, `websiteUrl` (optional), `credit` (optional), `gallery` (optional: array of `{ src, alt? }` for project detail visuals). See `lib/schemas/project.ts` for the full schema.
- **Periods:** Replace "See LinkedIn" or "Ongoing" with exact dates from [Christy's LinkedIn](https://www.linkedin.com/in/sebastini-christy/) when available.
- **PDFs:** Only set `documentUrl` when the file exists in `public/documents/` (e.g. `documentUrl": "/documents/MyFile.pdf"`). Otherwise leave it out and use `documentLabel` for descriptive text only; no download link will be shown.

## Recommendations

- **File:** `recommendations.json`
- **Used by:** Recommendations page (`/recommendations`)
- **How to edit:** Edit `content/recommendations.json`. Rebuild or redeploy for changes to appear.
- **JSON shape:** Object with `recommendations` (array) and optional `attestations` (array). Recommendation items: `quote`, `attributorName`, `attributorRole`, `link`, `linkLabel` (camelCase). Attestation items: `label`, `path` (paths under `public/`, e.g. `/documents/...`). See `lib/schemas/recommendation.ts` for the full schema.
- **Note:** Recommendation letter from former manager backs ProteinesXTC and NewFoodData experience. Ex-manager LinkedIn links can be added to recommendations after permissions; keep site presentable first.

## Contact

- **File:** `contact.json`
- **Used by:** Contact page/section (`/contact`), `ContactBlock` component
- **How to edit:** Edit `content/contact.json` for heading, subheading, and CTA button label. Rebuild or redeploy for changes to appear.
- **JSON shape:** `heading`, `subheading`, `ctaLabel`. See `lib/schemas/contact-content.ts` for the full schema.
- **Env:** The form recipient email (and any API key for sending) must **not** be in the content file. Use environment variables (e.g. `CONTACT_EMAIL`, `RESEND_API_KEY`) in the server action only (`lib/actions/contact.ts`). Set these in `.env.local` (see project root `.env.example`). This keeps sensitive data out of the repo and allows safe updates without code change.

---

## Update process (how to update and redeploy)

1. **Edit the relevant file** under `content/` (e.g. `content/profile.json`, `content/projects.json`, `content/recommendations.json`, `content/contact.json`).
2. **Validate JSON** if needed (e.g. paste into a JSON validator) so the build does not fail.
3. **Commit and push** your changes.
4. **Deploy** or trigger a build (e.g. `bun run build` then deploy; or push to a branch that triggers your host’s deployment). The site will reflect the change in the correct sections after the next build.
