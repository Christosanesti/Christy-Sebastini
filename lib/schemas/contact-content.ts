import { z } from "zod";

/** Contact section/page copy. Recipient email stays in env (CONTACT_EMAIL), not in this file. */
export const contactContentSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  ctaLabel: z.string(),
});

export type ContactContent = z.infer<typeof contactContentSchema>;
