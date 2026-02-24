/**
 * Project data for list and detail pages (Story 2.1, 2.2, 2.3).
 * Single source of truth; camelCase. Real content from PRD Assets inventory.
 * Assets: place PDFs in public/documents/, logos in public/images/projects/ (see README).
 */

export interface Project {
  slug: string;
  title: string;
  thumbnail?: string;
  role?: string;
  period?: string;
  domain?: string;
  /** Optional link to project document (e.g. PDF); descriptive label for accessibility */
  documentUrl?: string;
  documentLabel?: string;
}

const projects: Project[] = [
  {
    slug: "ubisoft",
    title: "Ubisoft",
    role: "Design",
    period: "—",
    domain: "Gaming & digital products",
    thumbnail: "/images/projects/logo-ubisoft.png",
    documentUrl: "/documents/UBISOFT.pdf",
    documentLabel: "View Ubisoft experience summary (PDF)",
  },
  {
    slug: "transavia",
    title: "Transavia",
    role: "Design",
    period: "—",
    domain: "Travel & aviation",
    documentUrl: "/documents/Transavia.pdf",
    documentLabel: "View Transavia experience summary (PDF)",
  },
  {
    slug: "viamapa",
    title: "ViaMapa",
    role: "Design",
    period: "—",
    domain: "Digital products",
    documentUrl: "/documents/Presentation-ViaMapa.pdf",
    documentLabel: "View ViaMapa presentation (PDF)",
  },
  {
    slug: "entrepreneurial",
    title: "Entrepreneurial work",
    role: "—",
    period: "—",
    domain: "Various",
    documentUrl: "/documents/Projet-entrepreneurial.pdf",
    documentLabel: "View entrepreneurial project summary (PDF)",
  },
  {
    slug: "cinabre-paris",
    title: "Cinabre Paris",
    role: "—",
    period: "—",
    domain: "Creative",
    documentUrl: "/documents/Cinabre-paris.com.pdf",
    documentLabel: "View Cinabre Paris reference (PDF)",
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
