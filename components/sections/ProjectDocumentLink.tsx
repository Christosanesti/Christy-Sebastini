"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectDocumentLinkProps {
  documentUrl: string;
  documentLabel: string;
}

/**
 * Renders a link to a project document (e.g. PDF) with fallback when the file is missing (AC#2).
 */
export function ProjectDocumentLink({
  documentUrl,
  documentLabel,
}: ProjectDocumentLinkProps) {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(documentUrl, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && !res.ok) setAvailable(false);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [documentUrl]);

  if (!available) {
    return (
      <p className="inline-flex items-center gap-2 rounded-md border border-dashed border-muted-foreground/30 bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
        <FileText className="size-4 shrink-0" aria-hidden />
        <span>Document not available</span>
      </p>
    );
  }

  return (
    <Link
      href={documentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={documentLabel}
    >
      <FileText className="size-4" aria-hidden />
      {documentLabel}
    </Link>
  );
}
