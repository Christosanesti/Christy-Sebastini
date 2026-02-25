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
      <h1
        id="about-heading"
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {profile.heading}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
        {profile.intro}
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground sm:mt-12 sm:text-2xl">
        {profile.experience.title}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
        {profile.experience.paragraph}
      </p>
      {profile.experience.bullets?.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground sm:text-lg">
          {profile.experience.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}

      <h2 className="mt-10 text-xl font-semibold text-foreground sm:mt-12 sm:text-2xl">
        {profile.sectors.title}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
        {profile.sectors.paragraph}
      </p>
      {profile.sectors.bullets?.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground sm:text-lg">
          {profile.sectors.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}

      <h2 className="mt-10 text-xl font-semibold text-foreground sm:mt-12 sm:text-2xl">
        {profile.positioning.title}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground sm:text-xl">
        {profile.positioning.paragraph}
      </p>
    </section>
  );
}
