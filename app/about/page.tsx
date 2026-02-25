import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "@/components/sections/AboutSection";
import { buildMetadata } from "@/lib/metadata";
import { getProfile } from "@/lib/profile";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "About Christy Sebastini — experience, sectors, and professional positioning as a designer and creative professional.",
  path: "/about",
});

export default function About() {
  let profile;
  try {
    profile = getProfile();
  } catch (err) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <p className="text-muted-foreground">
          Profile content is temporarily unavailable. Please try again later.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-primary underline">
          Return home
        </Link>
      </section>
    );
  }
  return <AboutSection profile={profile} />;
}
