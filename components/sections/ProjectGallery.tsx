import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt?: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
  projectTitle: string;
}

/**
 * Renders a responsive gallery of project images on the project detail page.
 */
export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  if (!images?.length) return null;

  return (
    <section
      className="mt-10 sm:mt-12"
      aria-labelledby="project-gallery-heading"
    >
      <h2
        id="project-gallery-heading"
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl mb-6"
      >
        Project visuals
      </h2>
      <ul
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        role="list"
      >
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`} className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={img.src}
                alt={img.alt ?? `${projectTitle} — visual ${i + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
