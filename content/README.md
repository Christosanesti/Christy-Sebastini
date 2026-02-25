# Content

Structured site copy lives here. Edit these files and redeploy to update the site without changing component code.

## Profile and About

- **File:** `profile.json`
- **Used by:** About page (`/about`)
- **How to edit:** Edit `content/profile.json`. Rebuild or redeploy for changes to appear.
- **JSON shape:** Top-level: `heading`, `intro`, and three section objects — `experience`, `sectors`, `positioning`. Each section has `title` and `paragraph` (strings). See `lib/schemas/profile.ts` for the full schema.

## Projects

- **File:** `projects.json`
- **Used by:** Projects list (`/projects`), project detail (`/projects/[slug]`)
- **How to edit:** Edit `content/projects.json`. Rebuild or redeploy for changes to appear. Array order = list order. Slug must match route `/projects/[slug]`.
- **JSON shape:** Array of project objects. Fields (camelCase): `slug`, `title`, `thumbnail` (optional), `role`, `period`, `domain`, `documentUrl`, `documentLabel`. See `lib/schemas/project.ts` for the full schema.

## Recommendations

- **File:** `recommendations.json`
- **Used by:** Recommendations page (`/recommendations`)
- **How to edit:** Edit `content/recommendations.json`. Rebuild or redeploy for changes to appear.
- **JSON shape:** Object with `recommendations` (array) and optional `attestations` (array). Recommendation items: `quote`, `attributorName`, `attributorRole`, `link`, `linkLabel` (camelCase). Attestation items: `label`, `path` (paths under `public/`, e.g. `/documents/...`). See `lib/schemas/recommendation.ts` for the full schema.

## Contact

- **File:** `contact.json`
- **Used by:** Contact page/section (`/contact`), `ContactBlock` component
- **How to edit:** Edit `content/contact.json` for heading, subheading, and CTA button label. Rebuild or redeploy for changes to appear.
- **JSON shape:** `heading`, `subheading`, `ctaLabel`. See `lib/schemas/contact-content.ts` for the full schema.
- **Env:** The form recipient email (and any API key for sending) must **not** be in the content file. Use environment variables (e.g. `CONTACT_EMAIL`) in the server action only (`lib/actions/contact.ts`). This keeps sensitive data out of the repo and allows safe updates without code change.
