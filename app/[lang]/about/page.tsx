import { getDict } from "@/content";
import { pageMeta } from "@/lib/seo";
import { rich } from "@/lib/rich";
import Blocks from "@/components/Blocks";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";

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
  const d = getDict(l).about;
  return pageMeta({
    lang: l,
    path: "/about/",
    title: d.title,
    description: d.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : "en";
  const d = getDict(l).about;

  return (
    <article className="prose">
      <h1>{d.h1}</h1>
      {d.metaLine ? (
        <p
          className="article-meta"
          dangerouslySetInnerHTML={{ __html: rich(d.metaLine, l) }}
        />
      ) : null}
      <Blocks blocks={d.blocks} lang={l} />
    </article>
  );
}
