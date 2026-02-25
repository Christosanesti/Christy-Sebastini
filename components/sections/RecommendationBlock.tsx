import Link from "next/link";
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
  /** Optional link to full document (e.g. PDF) */
  link?: string;
  /** Optional label for the link */
  linkLabel?: string;
}

export function RecommendationBlock({
  quote,
  attributorName,
  attributorRole,
  link,
  linkLabel = "View full recommendation",
}: RecommendationBlockProps) {
  const hasContent = quote ?? attributorName ?? attributorRole ?? link;

  if (!hasContent) {
    return null;
  }

  return (
    <Card
      className="transition-[box-shadow] duration-200 ease-out hover:shadow-md focus-within:shadow-md motion-reduce:transition-none"
      data-block="recommendation"
    >
      <CardHeader className="gap-2">
        {quote ? (
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
