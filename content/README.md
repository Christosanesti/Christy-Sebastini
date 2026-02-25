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
