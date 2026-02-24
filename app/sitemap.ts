import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/recommendations",
    "/contact",
  ] as const;

  return routes.map((path) => ({
    url: path ? `${baseUrl}${path}` : baseUrl,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
