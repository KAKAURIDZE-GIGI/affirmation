import type { MetadataRoute } from "next";
import { siteConfig, posts } from "@/lib/site";
import { LOCALES, LOCALE_HREFLANG, withLocale } from "@/lib/i18n";

// Required for `output: "export"` — emitted as a static /sitemap.xml at build.
export const dynamic = "force-static";

const STATIC_PAGES = [
  { path: "/", priority: 1 },
  { path: "/about/", priority: 0.7 },
  { path: "/disclosure/", priority: 0.5 },
];

function languages(path: string): Record<string, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [
      LOCALE_HREFLANG[l],
      `${siteConfig.url}${withLocale(l, path)}`,
    ]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    for (const l of LOCALES) {
      out.push({
        url: `${siteConfig.url}${withLocale(l, page.path)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page.priority,
        alternates: { languages: languages(page.path) },
      });
    }
  }

  for (const post of posts) {
    const path = `/${post.slug}/`;
    const lastModified = new Date(`${post.updated ?? post.date}T00:00:00Z`);
    for (const l of LOCALES) {
      out.push({
        url: `${siteConfig.url}${withLocale(l, path)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: languages(path) },
      });
    }
  }

  return out;
}
