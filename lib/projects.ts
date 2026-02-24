/**
 * Project data for list and future detail page (Story 2.2).
 * Single source; camelCase. Story 2.3 will integrate real content from Assets.
 */

export interface Project {
  slug: string;
  title: string;
  thumbnail?: string;
  role?: string;
  period?: string;
  domain?: string;
}

const projects: Project[] = [
  {
    slug: "ubisoft",
    title: "Ubisoft",
    role: "Design",
    period: "—",
    domain: "Gaming & digital products",
  },
  {
    slug: "transavia",
    title: "Transavia",
    role: "Design",
    period: "—",
    domain: "Travel & aviation",
  },
  {
    slug: "viamapa",
    title: "ViaMapa",
    role: "Design",
    period: "—",
    domain: "Digital products",
  },
  {
    slug: "entrepreneurial",
    title: "Entrepreneurial work",
    domain: "Various",
  },
  {
    slug: "cinabre-paris",
    title: "Cinabre Paris",
    domain: "Creative",
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
