/**
 * Attestation and official document links (Story 3.3).
 * Documents live in public/documents/; copy from Assets/ (e.g. Attestation de résultat C. SEBASTINI.pdf → attestation-resultat-c-sebastini.pdf).
 * Paths are used with ProjectDocumentLink for HEAD fallback when file is missing.
 */

export interface AttestationEntry {
  /** Descriptive label for link (e.g. "View attestation (PDF)") */
  label: string;
  /** Path under public/ — e.g. /documents/attestation-resultat-c-sebastini.pdf */
  path: string;
}

/** Attestations/official documents to surface on Recommendations (and optionally About). */
export const attestations: AttestationEntry[] = [
  {
    label: "View attestation (PDF)",
    path: "/documents/attestation-resultat-c-sebastini.pdf",
  },
];
