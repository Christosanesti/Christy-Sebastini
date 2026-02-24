import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectThumbnail } from "@/components/sections/ProjectThumbnail";
import { ProjectDocumentLink } from "@/components/sections/ProjectDocumentLink";
import { ArrowLeft } from "lucide-react";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project not found",
      description: "The project you're looking for doesn't exist or has been removed.",
    };
  }
  const context = [project.role, project.period, project.domain]
    .filter(Boolean)
    .join(" · ");
  const description = context
    ? `${project.title} — ${context}. Christy Sebastini portfolio project.`
    : `${project.title} — Christy Sebastini portfolio project.`;
  return buildMetadata({
    title: project.title,
    description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { title, thumbnail, role, period, domain, documentUrl, documentLabel } = project;
  const contextParts = [role, period, domain].filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-[var(--section-gap)] sm:px-6 sm:py-24">
      <nav aria-label="Back navigation" className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Projects
        </Link>
      </nav>

      <article>
        <header className="mb-10 sm:mb-12">
          {thumbnail ? (
            <div className="mb-6">
              <ProjectThumbnail
                src={thumbnail}
                alt={`${title} — project thumbnail`}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {contextParts.length > 0 ? (
            <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
              {contextParts.join(" · ")}
            </p>
          ) : null}
        </header>

        <section aria-labelledby="project-context-heading" className="space-y-4">
          <h2 id="project-context-heading" className="sr-only">
            Project context
          </h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {role ? (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Role</dt>
                <dd className="mt-0.5 text-foreground">{role}</dd>
              </div>
            ) : null}
            {period ? (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Period</dt>
                <dd className="mt-0.5 text-foreground">{period}</dd>
              </div>
            ) : null}
            {domain ? (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Domain</dt>
                <dd className="mt-0.5 text-foreground">{domain}</dd>
              </div>
            ) : null}
          </dl>
        </section>

        {documentUrl && documentLabel ? (
          <section aria-labelledby="project-document-heading" className="mt-8">
            <h2 id="project-document-heading" className="sr-only">
              Project document
            </h2>
            <ProjectDocumentLink
              documentUrl={documentUrl}
              documentLabel={documentLabel}
            />
          </section>
        ) : null}
      </article>
    </div>
  );
}
