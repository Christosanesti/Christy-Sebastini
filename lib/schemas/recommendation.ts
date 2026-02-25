import { z } from "zod";

/** Single recommendation item (matches RecommendationBlockProps). */
export const recommendationItemSchema = z.object({
  quote: z.string().optional(),
  attributorName: z.string().optional(),
  attributorRole: z.string().optional(),
  link: z.string().optional(),
  linkLabel: z.string().optional(),
});

/** Attestation/official document link. */
export const attestationEntrySchema = z.object({
  label: z.string(),
  path: z.string(),
});

export const recommendationsContentSchema = z.object({
  recommendations: z.array(recommendationItemSchema),
  attestations: z.array(attestationEntrySchema).optional(),
});

export type RecommendationItem = z.infer<typeof recommendationItemSchema>;
export type AttestationEntry = z.infer<typeof attestationEntrySchema>;
export type RecommendationsContent = z.infer<typeof recommendationsContentSchema>;
