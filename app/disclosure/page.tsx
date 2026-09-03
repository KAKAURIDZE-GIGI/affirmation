import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate disclosure",
  description:
    "How Host or Die makes money: some outbound links are affiliate links that pay a commission at no extra cost to you. Rankings are based on testing, not payouts.",
  alternates: { canonical: "/disclosure/" },
};

export default function DisclosurePage() {
  return (
    <article className="prose">
      <h1>Affiliate disclosure</h1>

      <p>
        <strong>
          This site earns commissions from some of the links on it, at no extra
          cost to you.
        </strong>{" "}
        If you click certain links to a hosting provider and then sign up or buy
        a plan, Host or Die may receive a referral fee. You pay the same price
        you would by going to the provider directly — in some cases less, when a
        referral link carries a sign-up credit.
      </p>

      <h2>What this changes about the content — nothing</h2>
      <p>
        Recommendations on this site are based on hands-on testing and the
        benchmark results described in the{" "}
        <a href="/about/">methodology</a>. They are not based on which company
        pays the most, or pays at all. Specifically:
      </p>
      <ul>
        <li>
          Providers that run no affiliate programme are reviewed and recommended
          on exactly the same terms as those that do.
        </li>
        <li>
          Commission rates are never a factor in a verdict, a score, or the
          order providers appear in.
        </li>
        <li>
          No provider is given payment, free hosting, copy approval, or advance
          sight of a review in exchange for coverage.
        </li>
        <li>
          When a recommendation changes because the testing changed, the old
          verdict stays visible with a dated update.
        </li>
      </ul>

      <h2>Where affiliate links appear</h2>
      <p>
        Affiliate links may appear inside comparison posts and tutorials, in
        clearly labelled &quot;where to sign up&quot; sections, and in the site
        footer. Every page that contains them carries a disclosure notice at the
        top, not just this page. Plain informational links — documentation,
        status pages, source code, pricing pages cited for reference — are not
        affiliate links.
      </p>

      <h2>Programmes this site participates in</h2>
      <p>
        Host or Die earns referral commission through affiliate programmes run
        directly by hosting providers and through the{" "}
        <a href="https://www.awin.com/" rel="nofollow noopener" target="_blank">
          AWIN
        </a>{" "}
        affiliate network. Where a recommendation carries an affiliate link, the
        provider it points to is named in the disclosure notice at the top of
        that page.
      </p>
      <p>
        Active referral partner at the moment: <strong>Vultr</strong>. This list
        is kept current as programmes are added or dropped.
      </p>

      <h2>FTC &amp; advertising standards</h2>
      <p>
        This disclosure is provided to comply with the U.S. Federal Trade
        Commission&apos;s{" "}
        <em>Guides Concerning the Use of Endorsements and Testimonials in
        Advertising</em>{" "}
        (16 CFR Part 255) and equivalent guidance elsewhere, including the UK
        CAP Code. The intent is simple: you should always know when a link can
        earn this site money.
      </p>

      <h2>Questions</h2>
      <p>
        Email{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>{" "}
        and I&apos;ll answer.
      </p>

      <p className="article-meta">Last updated: 4 September 2026.</p>
    </article>
  );
}
