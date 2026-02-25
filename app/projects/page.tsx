import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Projects by Christy Sebastini — design and creative work across sectors.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-[var(--section-gap)] sm:px-6 sm:py-24">
      <header className="relative mb-10 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 px-6 py-6 sm:mb-12 sm:px-8 sm:py-8">
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ background: "var(--accent-gradient)" }}
          aria-hidden
        />
        <h1
          id="projects-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Projects
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          Selection of design and creative work across employers, clients, and
          initiatives.
        </p>
      </header>

      <ul
        className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        aria-labelledby="projects-heading"
      >
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
