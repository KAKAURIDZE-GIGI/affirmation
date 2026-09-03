import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageMetaInput = {
  /** Full <title>, used verbatim (no site-name template appended). Keep < 60 chars. */
  title: string;
  /** Meta description. Aim for 150–160 chars and give a reason to click. */
  description: string;
  /** Route path with trailing slash, e.g. "/about/". Used for canonical + og:url. */
  path: string;
  type?: "website" | "article";
  /** ISO date (YYYY-MM-DD) — articles only. */
  published?: string;
  /** ISO date (YYYY-MM-DD) — articles only. */
  modified?: string;
};

/**
 * One place that builds a complete, consistent metadata block for a page:
 * absolute title, description, self-referential canonical, Open Graph and
 * Twitter card. Relative URLs resolve against `metadataBase` (set in the root
 * layout) to absolute URLs at build time.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  published,
  modified,
}: PageMetaInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      ...(type === "article"
        ? {
            publishedTime: published,
            modifiedTime: modified ?? published,
            authors: [siteConfig.author],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

/** schema.org Article for a content post. */
export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  published: string;
  modified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.published,
    dateModified: input.modified ?? input.published,
    author: { "@type": "Person", name: siteConfig.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absolute("/icon.svg") },
    },
    mainEntityOfPage: absolute(input.path),
    url: absolute(input.path),
  } as const;
}

/** schema.org BreadcrumbList — Home > … > current page. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absolute(c.path),
    })),
  } as const;
}
