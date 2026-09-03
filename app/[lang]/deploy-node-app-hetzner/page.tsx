import Link from "next/link";
import { getDict } from "@/content";
import { pageMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { rich } from "@/lib/rich";
import Blocks from "@/components/Blocks";
import JsonLd from "@/components/JsonLd";
import { posts } from "@/lib/site";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";

const SLUG = "deploy-node-app-hetzner";
const post = posts.find((p) => p.slug === SLUG)!;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : "en";
  const d = getDict(l).hetzner;
  return pageMeta({
    lang: l,
    path: `/${SLUG}/`,
    title: d.title,
    description: d.description,
    type: "article",
    published: post.date,
    modified: post.updated,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : "en";
  const dict = getDict(l);
  const d = dict.hetzner;

  const schema = [
    articleSchema({
      lang: l,
      headline: d.h1,
      description: d.description,
      path: `/${SLUG}/`,
      published: post.date,
      modified: post.updated,
    }),
    breadcrumbSchema(l, [
      { name: dict.ui.nav.home, path: "/" },
      { name: "Deploy Node.js on Hetzner with Docker", path: `/${SLUG}/` },
    ]),
  ];

  return (
    <article className="prose">
      <JsonLd data={schema} />

      <Link href={`/${l}/`} className="back-link">
        {dict.ui.backToPosts}
      </Link>

      <h1>{d.h1}</h1>
      {d.metaLine ? (
        <p
          className="article-meta"
          dangerouslySetInnerHTML={{ __html: rich(d.metaLine, l) }}
        />
      ) : null}

      <Blocks blocks={d.blocks} lang={l} />

      <hr />
      <p
        className="article-meta"
        dangerouslySetInnerHTML={{ __html: rich(dict.ui.articleFooter, l) }}
      />
    </article>
  );
}
