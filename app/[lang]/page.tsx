import Link from "next/link";
import { getDict } from "@/content";
import { pageMeta } from "@/lib/seo";
import { rich } from "@/lib/rich";
import { siteConfig, sortedPosts, formatDate } from "@/lib/site";
import { LOCALES, isLocale, withLocale, type Locale } from "@/lib/i18n";

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
  const d = getDict(l).home;
  return pageMeta({ lang: l, path: "/", title: d.title, description: d.description });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: Locale = isLocale(lang) ? lang : "en";
  const dict = getDict(l);
  const { home, ui } = dict;

  return (
    <>
      <section className="hero">
        <p className="eyebrow">{home.eyebrow}</p>
        <h1>
          {home.h1Lead}{" "}
          <span className="accent-text">{home.h1Accent}</span>
        </h1>
        <p className="lead">{home.lead}</p>
        <p dangerouslySetInnerHTML={{ __html: rich(home.intro, l) }} />
        <pre aria-hidden="true">
          <code>
            <span className="c-prompt">$</span> ./review --provider any
            --sponsored=false{"\n"}
            <span className="c-out">
              → same box, same benchmarks, every provider
            </span>
            {"\n"}
            <span className="c-out">
              → cpu · disk i/o · network · boot time
            </span>
            {"\n\n"}
            <span className="c-prompt">$</span> grep -c sponsored verdict.md
            {"\n"}
            <span className="c-out">0</span>
          </code>
        </pre>
      </section>

      <section aria-labelledby="latest">
        <h2 id="latest">{ui.latest}</h2>
        <ul className="post-list">
          {sortedPosts.map((post) => (
            <li key={post.slug} className="post-card">
              <div className="meta">
                <span className="badge">{ui.postKind[post.kind]}</span>
                <time dateTime={post.date}>{formatDate(post.date, l)}</time>
              </div>
              <h3>
                <Link href={withLocale(l, `/${post.slug}/`)}>
                  {ui.postTitle[post.slug]}
                </Link>
              </h3>
              <p>{ui.postBlurb[post.slug]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="signup">
        <form
          className="signup"
          action={`mailto:${siteConfig.contactEmail}`}
          method="post"
          encType="text/plain"
        >
          <label htmlFor="email" id="signup">
            {ui.signup.label}
          </label>
          <div className="signup-row">
            <input
              id="email"
              type="email"
              name="subscriber"
              required
              autoComplete="email"
              placeholder={ui.signup.placeholder}
            />
            <button type="submit" className="btn">
              {ui.signup.button}
            </button>
          </div>
          <p className="signup-note">{ui.signup.note}</p>
        </form>
      </section>
    </>
  );
}
