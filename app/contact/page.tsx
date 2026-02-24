import type { Metadata } from "next";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Christy Sebastini — send a message or find contact details.",
  path: "/contact",
});

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl">
      <ContactBlock />
    </div>
  );
}
