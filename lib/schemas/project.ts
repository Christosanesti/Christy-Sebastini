import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  thumbnail: z.string().optional(),
  role: z.string().optional(),
  period: z.string().optional(),
  domain: z.string().optional(),
  documentUrl: z.string().optional(),
  documentLabel: z.string().optional(),
  /** Live site URL; shown when present. */
  websiteUrl: z.string().url().optional(),
  /** Design credit: "my-design" (Figma/own), "content", "collaboration". */
  credit: z.enum(["my-design", "content", "collaboration"]).optional(),
  /** Gallery images for project detail page. */
  gallery: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string().optional(),
      })
    )
    .optional(),
});

export const projectsSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;
