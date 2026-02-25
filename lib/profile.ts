/**
 * Profile and About content loader (Story 4.1).
 * Single source of truth: content/profile.json.
 * Read at build/request time in server context only.
 */

import { readFileSync } from "fs";
import path from "path";
import { profileSchema, type Profile } from "@/lib/schemas/profile";

const PROFILE_PATH = path.join(process.cwd(), "content", "profile.json");

export type { Profile } from "@/lib/schemas/profile";

/**
 * Load profile data from content/profile.json.
 * Server-only; call from Server Components or server context.
 * @throws Error with safe message if file is missing or content is invalid
 */
export function getProfile(): Profile {
  try {
    const raw = readFileSync(PROFILE_PATH, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    const result = profileSchema.safeParse(parsed);
    if (!result.success) {
      const first = result.error.flatten().fieldErrors;
      const msg = Object.entries(first)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("; ");
      throw new Error(`Invalid profile content: ${msg}`);
    }
    return result.data;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("Profile file is not valid JSON.");
    }
    if (err instanceof Error && err.message.startsWith("Invalid profile content:")) {
      throw err;
    }
    if (err instanceof Error && "code" in err && (err as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("Profile content file not found. Add content/profile.json.");
    }
    throw new Error("Failed to load profile content.");
  }
}
