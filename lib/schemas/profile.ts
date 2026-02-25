import { z } from "zod";

const profileSectionSchema = z.object({
  title: z.string(),
  paragraph: z.string(),
  /** Optional bullet points for scannable reading. */
  bullets: z.array(z.string()).optional(),
});

export const profileSchema = z.object({
  heading: z.string(),
  intro: z.string(),
  experience: profileSectionSchema,
  sectors: profileSectionSchema,
  positioning: profileSectionSchema,
});

export type Profile = z.infer<typeof profileSchema>;
export type ProfileSection = z.infer<typeof profileSectionSchema>;
