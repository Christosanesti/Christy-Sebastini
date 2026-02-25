import type { Metadata } from "next";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { buildMetadata } from "@/lib/metadata";
import { getContactContent } from "@/lib/contact-content";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Christy Sebastini — send a message or find contact details.",
  path: "/contact",
});

export default function Contact() {
  const content = getContactContent();
  return (
    <div className="mx-auto max-w-3xl">
      <ContactBlock
        heading={content.heading}
        subheading={content.subheading}
        submitButtonLabel={content.ctaLabel}
      />
    </div>
  );
}
