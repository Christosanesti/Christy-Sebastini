import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      className="relative mx-auto max-w-3xl px-4 py-[var(--section-gap)] sm:px-6 sm:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 px-6 py-8 sm:px-8 sm:py-10">
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ background: "var(--accent-gradient)" }}
          aria-hidden
        />
        <h1
          id="hero-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Christy Sebastini
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          Marketer & creative professional — strategy, content, and campaigns
          experiences.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-6 py-2"
            aria-label="Contact Christy"
          >
            Contact
          </Link>
        </Button>
        </div>
      </div>
    </section>
  );
}
