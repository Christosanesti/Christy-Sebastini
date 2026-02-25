import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export interface RecommendationBlockProps {
  /** Quote or short excerpt from the recommendation */
  quote?: string;
  /** Name of the person who gave the recommendation */
  attributorName?: string;
  /** Role or title of the attributor */
  attributorRole?: string;
  /** Image path under public (e.g. /images/recommendations/name.jpg) */
  attributorImage?: string;
  /** Optional link to full document (e.g. PDF) */
  link?: string;
  /** Optional label for the link */
  linkLabel?: string;
}

export function RecommendationBlock({
  quote,
  attributorName,
  attributorRole,
  attributorImage,
  link,
  linkLabel = "View full recommendation",
}: RecommendationBlockProps) {
  const hasContent = quote ?? attributorName ?? attributorRole ?? attributorImage ?? link;

  if (!hasContent) {
    return null;
  }

  return (
    <Card
      className="transition-[box-shadow] duration-200 ease-out hover:shadow-md focus-within:shadow-md motion-reduce:transition-none"
      data-block="recommendation"
    >
      <CardHeader className="gap-2">
        {(attributorImage ?? quote) && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {attributorImage ? (
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-muted">
                <Image
                  src={attributorImage}
                  alt={attributorName ? `${attributorName} — photo` : "Recommender photo"}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="min-w-0 flex-1">
              {quote ? (
                <blockquote className="text-lg text-foreground sm:text-xl leading-relaxed border-l-0 pl-0 italic">
                  {quote}
                </blockquote>
              ) : null}
            </div>
          </div>
        )}
        {!attributorImage && quote ? (
          <blockquote className="text-lg text-foreground sm:text-xl leading-relaxed border-l-0 pl-0 italic">
            {quote}
          </blockquote>
        ) : null}
        {(attributorName ?? attributorRole) ? (
          <footer className="not-italic">
            {attributorName ? (
              <CardTitle className="text-base font-medium">
                {attributorName}
              </CardTitle>
            ) : null}
            {attributorRole ? (
              <CardDescription className="text-sm mt-0.5">
                {attributorRole}
              </CardDescription>
            ) : null}
          </footer>
        ) : null}
      </CardHeader>
      {link ? (
        <CardContent className="pt-0">
          <Link
            href={link}
            className="text-sm font-medium text-primary underline underline-offset-4 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            target={link.startsWith("http") ? "_blank" : undefined}
            rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {linkLabel}
          </Link>
        </CardContent>
      ) : null}
    </Card>
  );
}
