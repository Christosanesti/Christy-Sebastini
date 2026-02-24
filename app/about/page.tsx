import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "About Christy Sebastini — experience, sectors, and professional positioning as a designer and creative professional.",
  path: "/about",
});

export default function About() {
  return <AboutSection />;
}
