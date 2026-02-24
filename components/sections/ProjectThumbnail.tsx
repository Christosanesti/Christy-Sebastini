"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** When true, uses card-style negative margins for list layout */
  cardStyle?: boolean;
}

/**
 * Renders project thumbnail with fallback when image is missing or fails to load.
 * AC#2: fallback if file missing; descriptive alt for accessibility.
 */
export function ProjectThumbnail({
  src,
  alt,
  className,
  sizes,
  cardStyle = false,
}: ProjectThumbnailProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={
          cardStyle
            ? "relative -mx-6 -mt-6 aspect-video overflow-hidden rounded-t-xl bg-muted"
            : "relative aspect-video overflow-hidden rounded-xl bg-muted"
        }
        role="img"
        aria-label="Image unavailable"
      />
    );
  }

  const wrapperClass = cardStyle
    ? "relative -mx-6 -mt-6 aspect-video overflow-hidden rounded-t-xl bg-muted"
    : "relative aspect-video overflow-hidden rounded-xl bg-muted";

  return (
    <div className={wrapperClass}>
      <Image
        src={src}
        alt={alt}
        fill
        className={className ?? "object-cover"}
        sizes={sizes ?? "(max-width: 1024px) 100vw, 1024px"}
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
}
