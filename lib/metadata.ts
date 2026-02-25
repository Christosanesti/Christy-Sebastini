import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const defaultOgImage = `${baseUrl}/og-image.png`;

export const siteName = "Sebastini Christy — Portfolio";

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = path ? `${baseUrl}${path}` : baseUrl;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName,
      images: [{ url: defaultOgImage, alt: "Sebastini Christy — Portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
  };
}

export { baseUrl, defaultOgImage };
