/**
 * Recommendations and attestations content loader (Story 4.3).
 * Single source of truth: content/recommendations.json.
 * Read at build/request time in server context only.
 */

import { readFileSync } from "fs";
import path from "path";
import {
  recommendationsContentSchema,
  type RecommendationItem,
  type AttestationEntry,
} from "@/lib/schemas/recommendation";

const RECOMMENDATIONS_PATH = path.join(
  process.cwd(),
  "content",
  "recommendations.json"
);

export type { RecommendationItem, AttestationEntry };

/**
 * Load recommendations and attestations from content/recommendations.json.
 * Server-only; call from Server Components or server context.
 * @throws Error with safe message if file is missing or content is invalid
 */
export function getRecommendations(): RecommendationItem[] {
  try {
    const raw = readFileSync(RECOMMENDATIONS_PATH, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    const result = recommendationsContentSchema.safeParse(parsed);
    if (!result.success) {
      const first = result.error.flatten().fieldErrors;
      const msg = Object.entries(first)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("; ");
      throw new Error(`Invalid recommendations content: ${msg}`);
    }
    return result.data.recommendations ?? [];
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("Recommendations file is not valid JSON.");
    }
    if (
      err instanceof Error &&
      err.message.startsWith("Invalid recommendations content:")
    ) {
      throw err;
    }
    if (
      err instanceof Error &&
      "code" in err &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      throw new Error(
        "Recommendations content file not found. Add content/recommendations.json."
      );
    }
    throw new Error("Failed to load recommendations content.");
  }
}

/**
 * Load attestations from content/recommendations.json (attestations array).
 * Server-only; call from Server Components or server context.
 * @throws Error with safe message if file is missing or content is invalid (same as getRecommendations)
 */
export function getAttestations(): AttestationEntry[] {
  try {
    const raw = readFileSync(RECOMMENDATIONS_PATH, "utf-8");
    const parsed: unknown = JSON.parse(raw);
    const result = recommendationsContentSchema.safeParse(parsed);
    if (!result.success) {
      const first = result.error.flatten().fieldErrors;
      const msg = Object.entries(first)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("; ");
      throw new Error(`Invalid recommendations content: ${msg}`);
    }
    return result.data.attestations ?? [];
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Invalid recommendations content:")) {
      throw err;
    }
    if (err instanceof SyntaxError) {
      throw new Error("Recommendations file is not valid JSON.");
    }
    if (
      err instanceof Error &&
      "code" in err &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      throw new Error(
        "Recommendations content file not found. Add content/recommendations.json."
      );
    }
    throw new Error("Failed to load recommendations content.");
  }
}
