/**
 * Project data loader for list and detail pages (Story 4.2).
 * Single source of truth: content/projects.json.
 * Read at build/request time in server context only.
 */

import { readFileSync } from "fs";
import path from "path";
import { projectsSchema, type Project } from "@/lib/schemas/project";

const PROJECTS_PATH = path.join(process.cwd(), "content", "projects.json");

export type { Project } from "@/lib/schemas/project";

/**
 * Load all projects from content/projects.json.
 * Server-only; call from Server Components or server context.
 * @throws Error with safe message if file is missing or content is invalid
 */
export function getProjects(): Project[] {
  try {
    const raw = readFileSync(PROJECTS_PATH, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    const result = projectsSchema.safeParse(parsed);
    if (!result.success) {
      const first = result.error.flatten().fieldErrors;
      const msg = Object.entries(first)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("; ");
      throw new Error(`Invalid projects content: ${msg}`);
    }
    return result.data;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("Projects file is not valid JSON.");
    }
    if (err instanceof Error && err.message.startsWith("Invalid projects content:")) {
      throw err;
    }
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("Projects content file not found. Add content/projects.json.");
    }
    throw new Error("Failed to load projects content.");
  }
}

/**
 * Get a single project by slug. Returns undefined if not found.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
