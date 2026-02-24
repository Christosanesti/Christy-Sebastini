import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectThumbnail } from "@/components/sections/ProjectThumbnail";
import type { Project } from "@/lib/projects";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, title, thumbnail, role, period, domain } = project;
  const href = `/projects/${slug}`;
  const meta = [role, period, domain].filter(Boolean).join(" · ") || undefined;

  return (
    <Card className="flex h-full flex-col transition-[transform,box-shadow] duration-200 ease-out hover:shadow-md focus-within:shadow-md motion-reduce:transition-none">
      <CardHeader className="gap-2">
        {thumbnail ? (
          <ProjectThumbnail
            src={thumbnail}
            alt={`${title} — project thumbnail`}
            cardStyle
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : null}
        <CardTitle className="text-xl sm:text-2xl">{title}</CardTitle>
        {meta ? (
          <CardDescription className="text-base">{meta}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter>
        <Button asChild variant="outline" size="lg" className="min-h-[44px] min-w-[44px]">
          <Link
            href={href}
            className="inline-flex items-center gap-2"
            aria-label={`View ${title} project`}
          >
            View project
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
