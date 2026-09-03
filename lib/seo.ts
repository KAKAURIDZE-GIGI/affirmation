import type { Metadata } from "next";
import { siteConfig } from "./site";
import {
  LOCALES,
  LOCALE_HREFLANG,
  OG_LOCALE,
  DEFAULT_LOCALE,
  withLocale,
  type Locale,
} from "./i18n";

type PageMetaInput = {
  lang: Locale;
  /** Locale-less route with trailing slash, e.g. "/about/" or "/". */
  path: string;
  /** Full <title>, used verbatim. Keep < 60 chars. */
  title: string;
  /** Meta description, 150–160 chars. */
  description: string;
  type?: "website" | "article";
  published?: string;
  modified?: string;
};

/** hreflang alternates: every locale for this path + x-default -> English. */
function languageAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[LOCALE_HREFLANG[l]] = withLocale(l, path);
  out["x-default"] = withLocale(DEFAULT_LOCALE, path);
  return out;
}

export function pageMeta({
  lang,
  path,
  title,
  description,
  type = "website",
  published,
  modified,
}: PageMetaInput): Metadata {
  const canonical = withLocale(lang, path);
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: OG_LOCALE[lang],
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

const abs = (path: string) => new URL(path, siteConfig.url).toString();

export function articleSchema(input: {
  lang: Locale;
  headline: string;
  description: string;
  /** locale-less path, e.g. "/digitalocean-vs-vultr/" */
  path: string;
  published: string;
  modified?: string;
}) {
  const url = abs(withLocale(input.lang, input.path));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    inLanguage: LOCALE_HREFLANG[input.lang],
    datePublished: input.published,
    dateModified: input.modified ?? input.published,
    author: { "@type": "Person", name: siteConfig.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: abs("/icon.svg") },
    },
    mainEntityOfPage: url,
    url,
  } as const;
}

export function breadcrumbSchema(
  lang: Locale,
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(withLocale(lang, c.path)),
    })),
  } as const;
}
