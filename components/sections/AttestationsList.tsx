"use client";

import { useState, useEffect } from "react";
import { ProjectDocumentLink } from "@/components/sections/ProjectDocumentLink";

export interface AttestationEntry {
  label: string;
  path: string;
}

interface AttestationsListProps {
  attestations: AttestationEntry[];
}

/**
 * Only shows attestation items whose document path returns 200 (file exists).
 * Hides the whole section when no documents are available.
 */
export function AttestationsList({ attestations }: AttestationsListProps) {
  const [available, setAvailable] = useState<AttestationEntry[] | null>(null);

  useEffect(() => {
    if (attestations.length === 0) {
      setAvailable([]);
      return;
    }
    const check = async () => {
      const results = await Promise.all(
        attestations.map(async (att) => {
          try {
            const res = await fetch(att.path, { method: "HEAD" });
            return res.ok ? att : null;
          } catch {
            return null;
          }
        })
      );
      setAvailable(results.filter((a): a is AttestationEntry => a != null));
    };
    check();
  }, [attestations]);

  if (available === null || available.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-12 sm:mt-16"
      aria-labelledby="attestations-heading"
    >
      <h2
        id="attestations-heading"
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        Attestations &amp; official documents
      </h2>
      <p className="mt-2 text-muted-foreground">
        Credentials and attestations you can view or download.
      </p>
      <ul className="mt-4 flex flex-col gap-3" role="list">
        {available.map((att) => (
          <li key={att.path}>
            <ProjectDocumentLink
              documentUrl={att.path}
              documentLabel={att.label}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
