import { Skeleton } from "@/components/ui/skeleton";

function ProjectCardSkeleton() {
  return (
    <div className="flex h-full flex-col gap-6 rounded-xl border bg-card py-6 shadow-sm">
      <div className="flex flex-col gap-2 px-6">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <div className="flex-1 px-6" />
      <div className="px-6">
        <Skeleton className="h-11 w-32 min-w-[44px]" />
      </div>
    </div>
  );
}

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-[var(--section-gap)] sm:px-6 sm:py-24">
      <p className="sr-only" aria-live="polite" aria-busy="true">
        Loading projects.
      </p>
      <header className="mb-10 sm:mb-12">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-3 h-6 w-full max-w-xl" />
      </header>
      <ul
        className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
        aria-label="Loading projects"
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <li key={i}>
            <ProjectCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
