import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import {
  RecommendationBlock,
  type RecommendationBlockProps,
} from "@/components/sections/RecommendationBlock";

export const metadata: Metadata = buildMetadata({
  title: "Recommendations",
  description:
    "Recommendations and trust — what others say about working with Christy Sebastini.",
  path: "/recommendations",
});

function hasContent(rec: RecommendationBlockProps): boolean {
  return !!(rec.quote ?? rec.attributorName ?? rec.attributorRole ?? rec.link);
}

export default function Recommendations() {
  const recommendations: RecommendationBlockProps[] = [];

  const itemsWithContent = recommendations.filter(hasContent);

  return (
    <section
      className="mx-auto max-w-3xl px-4 py-[var(--section-gap)] sm:px-6 sm:py-24"
      aria-labelledby="recommendations-heading"
    >
      <h1
        id="recommendations-heading"
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        Recommendations
      </h1>
      <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
        What others say about working with Christy — recommendations and
        attestations from colleagues and clients.
      </p>

      {itemsWithContent.length === 0 ? (
        <div
          className="mt-10 rounded-xl border border-dashed border-muted-foreground/30 bg-muted/30 px-6 py-10 text-center sm:mt-12"
          data-empty-state="recommendations"
        >
          <p className="text-lg text-muted-foreground sm:text-xl">
            Recommendations will be featured here.
          </p>
        </div>
      ) : (
        <ul className="mt-10 flex flex-col gap-6 sm:mt-12" role="list">
          {itemsWithContent.map((rec, i) => (
            <li key={`rec-${i}`}>
              <RecommendationBlock
                quote={rec.quote}
                attributorName={rec.attributorName}
                attributorRole={rec.attributorRole}
                link={rec.link}
                linkLabel={rec.linkLabel}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
