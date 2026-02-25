/**
 * Contact section/page copy loader (Story 4.3).
 * Single source of truth: content/contact.json.
 * Recipient email stays in env (e.g. CONTACT_EMAIL), not in this file.
 * Read at build/request time in server context only.
 */

import { readFileSync } from "fs";
import path from "path";
import {
  contactContentSchema,
  type ContactContent,
} from "@/lib/schemas/contact-content";

const CONTACT_PATH = path.join(process.cwd(), "content", "contact.json");

export type { ContactContent };

/**
 * Load contact copy from content/contact.json.
 * Server-only; call from Server Components or server context.
 * @throws Error with safe message if file is missing or content is invalid
 */
export function getContactContent(): ContactContent {
  try {
    const raw = readFileSync(CONTACT_PATH, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    const result = contactContentSchema.safeParse(parsed);
    if (!result.success) {
      const first = result.error.flatten().fieldErrors;
      const msg = Object.entries(first)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("; ");
      throw new Error(`Invalid contact content: ${msg}`);
    }
    return result.data;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("Contact file is not valid JSON.");
    }
    if (
      err instanceof Error &&
      err.message.startsWith("Invalid contact content:")
    ) {
      throw err;
    }
    if (
      err instanceof Error &&
      "code" in err &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      throw new Error(
        "Contact content file not found. Add content/contact.json."
      );
    }
    throw new Error("Failed to load contact content.");
  }
}
