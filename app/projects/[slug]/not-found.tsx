import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-[var(--section-gap)] sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Project not found
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        The project you’re looking for doesn’t exist or has been removed.
      </p>
      <p className="mt-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Projects
        </Link>
      </p>
    </div>
  );
}
