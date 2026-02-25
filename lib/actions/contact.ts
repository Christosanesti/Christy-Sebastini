"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";

export type ContactResult =
  | { success: true; message?: string }
  | { success: false; error: string };

const RESEND_FROM =
  process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

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

  const recipient = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!recipient && process.env.NODE_ENV === "production") {
    return { success: false, error: "Contact form is not configured. Set CONTACT_EMAIL." };
  }

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      return { success: false, error: "Contact form is not configured. Set RESEND_API_KEY." };
    }
    return { success: true, message: "Thank you. Your message has been received." };
  }

  if (!recipient) {
    return { success: false, error: "Contact recipient not configured. Set CONTACT_EMAIL." };
  }

  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  try {
    const resend = new Resend(apiKey);
    const { name, email, message } = parsed.data;
    const subject = `Contact form: ${name} <${email}>`;
    const html = `
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: recipient,
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return { success: false, error: "Failed to send. Please try again later." };
    }
    return { success: true, message: "Thank you. Your message has been received." };
  } catch (err) {
    console.error("[contact] Send error:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
