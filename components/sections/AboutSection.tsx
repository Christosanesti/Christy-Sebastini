import type { Profile } from "@/lib/profile";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section
      className="mx-auto max-w-3xl px-4 py-[var(--section-gap)] sm:px-6 sm:py-24"
      aria-labelledby="about-heading"
    >
      {/* Intro block with gradient accent */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 px-6 py-6 sm:px-8 sm:py-8">
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ background: "var(--accent-gradient)" }}
          aria-hidden
        />
        <h1
          id="about-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {profile.heading}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.intro}
        </p>
      </div>

      {/* Experience — numbered list (01, 02, …) like reference */}
      <div className="mt-10 sm:mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
          {profile.experience.title}
        </h2>
        <p className="mt-1.5 text-base text-muted-foreground sm:text-lg">
          {profile.experience.paragraph}
        </p>
        {profile.experience.bullets?.length ? (
          <ul className="mt-5 space-y-4 sm:mt-6 sm:space-y-5" role="list">
            {profile.experience.bullets.map((b, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
                  style={{ background: "var(--accent-bar)" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pt-0.5 text-muted-foreground sm:text-lg sm:leading-relaxed">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Sectors — compact with gradient bar */}
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 py-5 pl-6 pr-5 sm:mt-12 sm:py-6 sm:pl-8 sm:pr-6">
        <div
          className="absolute left-0 top-0 bottom-0 w-2"
          style={{ background: "var(--accent-gradient)" }}
          aria-hidden
        />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
          {profile.sectors.title}
        </h2>
        <p className="mt-1.5 text-base text-muted-foreground sm:text-lg">
          {profile.sectors.paragraph}
        </p>
        {profile.sectors.bullets?.length ? (
          <p className="mt-3 text-sm text-muted-foreground/95 sm:text-base sm:leading-relaxed">
            {profile.sectors.bullets[0]}
          </p>
        ) : null}
      </div>

      {/* Positioning — short block with bottom gradient */}
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 px-6 py-5 sm:mt-12 sm:px-8 sm:py-6">
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ background: "var(--accent-gradient)" }}
          aria-hidden
        />
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
          {profile.positioning.title}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.positioning.paragraph}
        </p>
      </div>
    </section>
  );
}
