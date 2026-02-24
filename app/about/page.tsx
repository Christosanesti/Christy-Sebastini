import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About | Christy Sebastini",
  description:
    "About Christy Sebastini — experience, sectors, and professional positioning as a designer and creative professional.",
};

export default function About() {
  return <AboutSection />;
}
