import type { Metadata } from "next";
import { ContactBlock } from "@/components/sections/ContactBlock";

export const metadata: Metadata = {
  title: "Contact | Christy Sebastini",
  description:
    "Get in touch with Christy Sebastini — send a message or find contact details.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl">
      <ContactBlock />
    </div>
  );
}
