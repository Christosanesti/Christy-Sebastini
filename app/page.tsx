import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Christy Sebastini — Marketer & Creative Professional",
  description:
    "Professional portfolio for Christy Sebastini. Explore work, experience, and get in touch.",
  path: "/",
});

export default function Home() {
  return <HeroSection />;
}
