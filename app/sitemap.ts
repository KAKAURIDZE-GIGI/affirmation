import type { MetadataRoute } from "next";
import { siteConfig, posts } from "@/lib/site";

// Required for `output: "export"` — emitted as a static /sitemap.xml at build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/about/", priority: 0.7 },
    { path: "/disclosure/", priority: 0.5 },
  ].map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${siteConfig.url}/${p.slug}/`,
    lastModified: new Date(`${p.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
