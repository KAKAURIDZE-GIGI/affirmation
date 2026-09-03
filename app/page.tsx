import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig, sortedPosts, formatDate } from "@/lib/site";

export const metadata: Metadata = {
  // Homepage keeps the full site title rather than the "%s — Host or Die" template.
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Independent · benchmark-based</p>
        <h1>VPS &amp; cloud hosting reviews for developers</h1>
        <p className="lead">
          I deploy real applications to real servers, run the same battery of
          benchmarks on each one — CPU, disk I/O, network throughput, boot time
          — and write up what actually happened.
        </p>
        <p>
          No provider pays for a place on this site and no review is sponsored.
          Some links are affiliate links, which is how the hosting bill gets
          paid; that never changes the numbers or the recommendation. Here is
          how the testing works:{" "}
          <Link href="/about/">the methodology</Link>, and here is the{" "}
          <Link href="/disclosure/">affiliate disclosure</Link>.
        </p>
      </section>

      <section aria-labelledby="latest">
        <h2 id="latest">Latest</h2>
        <ul className="post-list">
          {sortedPosts.map((post) => (
            <li key={post.slug} className="post-card">
              <div className="meta">
                <span className="badge">{post.kind}</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h3>
                <Link href={`/${post.slug}/`}>{post.title}</Link>
              </h3>
              <p>{post.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="signup">
        {/* No-JS signup: submitting opens the reader's mail client with a
            pre-addressed message. To run a managed list instead, point `action`
            at a Formspree / Buttondown / ConvertKit endpoint — no other change
            needed. */}
        <form
          className="signup"
          action={`mailto:${siteConfig.contactEmail}`}
          method="post"
          encType="text/plain"
        >
          <label htmlFor="email" id="signup">
            Get new reviews and benchmarks by email
          </label>
          <div className="signup-row">
            <input
              id="email"
              type="email"
              name="subscriber"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            <button type="submit" className="btn">
              Subscribe
            </button>
          </div>
          <p className="signup-note">
            One email when a new benchmark or review goes live. No spam, no
            sharing your address. Unsubscribe any time.
          </p>
        </form>
      </section>
    </>
  );
}
