"use server";

import { contactSchema } from "@/lib/schemas/contact";

export type ContactResult =
  | { success: true; message?: string }
  | { success: false; error: string };

export async function submitContact(
  _prev: unknown,
  formData: FormData
): Promise<ContactResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      [first.name?.[0], first.email?.[0], first.message?.[0]]
        .filter(Boolean)
        .join(" ") || "Invalid input";
    return { success: false, error: msg };
  }

  try {
    // No email provider configured: stub success. Wire Resend/Formspree via env when ready.
    // Recipient email: use process.env.CONTACT_EMAIL in server action; never in content file. See content/README.md.
    return { success: true, message: "Thank you. Your message has been received." };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
