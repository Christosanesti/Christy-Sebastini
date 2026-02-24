import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Recommendations",
  description:
    "Recommendations and trust — what others say about working with Christy Sebastini.",
  path: "/recommendations",
});

export default function Recommendations() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-[var(--section-gap)] sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Recommendations
      </h1>
      <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
        Placeholder content for the recommendations page.
      </p>
    </div>
  );
}
