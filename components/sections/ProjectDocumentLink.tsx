"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectDocumentLinkProps {
  documentUrl: string;
  documentLabel: string;
}

type Availability = "checking" | "available" | "unavailable";

/**
 * Renders a link to a project document (e.g. PDF) with fallback when the file is missing (AC#2).
 * Uses checking state to avoid flashing link before HEAD resolves (code-review fix).
 */
export function ProjectDocumentLink({
  documentUrl,
  documentLabel,
}: ProjectDocumentLinkProps) {
  const [status, setStatus] = useState<Availability>("checking");

  useEffect(() => {
    let cancelled = false;
    fetch(documentUrl, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setStatus(res.ok ? "available" : "unavailable");
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });
    return () => {
      cancelled = true;
    };
  }, [documentUrl]);

  if (status === "checking") {
    return (
      <span
        className="inline-flex items-center gap-2 rounded-md border border-input bg-muted/50 px-4 py-2 text-sm text-muted-foreground"
        aria-busy="true"
        aria-live="polite"
      >
        <FileText className="size-4 shrink-0 animate-pulse" aria-hidden />
        <span>Checking…</span>
      </span>
    );
  }

  if (status === "unavailable") {
    return null;
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
