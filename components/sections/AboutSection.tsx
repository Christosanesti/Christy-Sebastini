export function AboutSection() {
  return (
    <section
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="about-heading"
    >
      <h1
        id="about-heading"
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        About Christy
      </h1>
      <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
        Designer and creative professional with a focus on thoughtful digital
        experiences and user-centred outcomes.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground sm:mt-12 sm:text-2xl">
        Experience
      </h2>
      <p className="mt-2 text-muted-foreground">
        Years of experience across digital design, brand identity, and
        product interfaces. Work spans e‑commerce, editorial, and
        product-led projects with an emphasis on clarity and craft.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground sm:mt-12 sm:text-2xl">
        Sectors
      </h2>
      <p className="mt-2 text-muted-foreground">
        Retail, energy and sustainability, food and nutrition, and
        B2B digital products. Comfortable in regulated and
        multi-stakeholder environments.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground sm:mt-12 sm:text-2xl">
        Professional positioning
      </h2>
      <p className="mt-2 text-muted-foreground">
        Positions design as a bridge between user needs and business
        goals. Advocates for accessible, performant, and maintainable
        digital experiences aligned with brand and product strategy.
      </p>
    </section>
  );
}
