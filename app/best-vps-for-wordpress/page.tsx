import Link from "next/link";
import AffiliateNotice from "@/components/AffiliateNotice";
import JsonLd from "@/components/JsonLd";
import { siteConfig, posts } from "@/lib/site";
import { pageMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";

const post = posts.find((p) => p.slug === "best-vps-for-wordpress")!;

export const metadata = pageMeta({
  title: "Best VPS for WordPress in 2026",
  description:
    "Seven VPS and managed-VPS options compared for self-hosting WordPress — performance, caching, one-click installs, and cost versus managed WordPress hosting.",
  path: "/best-vps-for-wordpress/",
  type: "article",
  published: post.date,
  modified: post.updated,
});

const schema = [
  articleSchema({
    headline: "Best VPS for WordPress in 2026",
    description: post.description,
    path: "/best-vps-for-wordpress/",
    published: post.date,
    modified: post.updated,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Best VPS for WordPress", path: "/best-vps-for-wordpress/" },
  ]),
];

export default function Page() {
  return (
    <article className="prose">
      <JsonLd data={schema} />

      <Link href="/" className="back-link">
        ← All posts
      </Link>

      <h1>Best VPS for WordPress in 2026</h1>
      <p className="article-meta">
        Comparison · published 5 September 2026 · specs pulled from this
        site&apos;s own provider reviews — verify current pricing before you
        buy
      </p>

      <AffiliateNotice />

      <p>
        WordPress gives you three real paths: cheap shared hosting, managed
        WordPress hosting (WP Engine, Kinsta and similar — someone else runs
        the server and the caching layer for a premium), or a{" "}
        <strong>self-managed VPS</strong>. This post is for the third group:
        developers and technical readers who want more control and better
        price-per-resource than managed WordPress hosting charges for, and
        who are either comfortable running their own LEMP/LAMP stack or
        willing to put a managed layer like Cloudways on top of a VPS to get
        some of that convenience back without paying full managed-hosting
        prices.
      </p>
      <p>
        Same approach as the rest of this site: the providers already
        covered here, looked at specifically through the WordPress lens
        instead of the usual Docker/app-deployment one. If you want that
        angle instead, the{" "}
        <Link href="/deploy-node-app-hetzner/">Hetzner</Link>,{" "}
        <Link href="/deploy-nextjs-contabo/">Contabo</Link> and{" "}
        <Link href="/deploy-fastapi-linode/">Linode</Link> tutorials are the
        ones to read, and the{" "}
        <Link href="/digitalocean-vs-vultr/">
          DigitalOcean vs Vultr comparison
        </Link>{" "}
        covers those two on general infrastructure terms rather than
        WordPress specifically. Hosting a game server instead of a website?
        The <Link href="/best-vps-for-game-servers/">
          game server hosting guide
        </Link>{" "}
        runs the same providers through that different lens.
      </p>

      <h2>What actually matters for WordPress on a VPS</h2>
      <ul>
        <li>
          <strong>PHP and MySQL performance, not just raw CPU.</strong> A
          properly tuned PHP-FPM pool size and an OPcache that&apos;s
          actually enabled matter more for WordPress&apos;s time-to-first-byte
          than another vCPU core does — this is a configuration problem as
          much as a hardware one.
        </li>
        <li>
          <strong>Caching, at two layers.</strong> A page cache (a plugin
          like WP Super Cache or a server-level cache) handles anonymous
          traffic; an object cache (Redis or Memcached) is what actually
          protects the database once you have logged-in users, WooCommerce,
          or anything dynamic. Managed WordPress hosts bundle both by
          default — on a raw VPS, that&apos;s on you to install.
        </li>
        <li>
          <strong>Enough RAM for concurrency and the admin side, not just
          the front end.</strong> A vanilla WordPress front end is light. A
          page builder like Elementor or Divi, several plugins, and a few
          editors working in <code>wp-admin</code> at once is not — that&apos;s
          usually where a 1&nbsp;GB box starts to struggle before the public
          site does.
        </li>
        <li>
          <strong>How fast you can get a working stack up.</strong> A
          one-click WordPress image saves the LEMP/LAMP setup entirely; a
          plain Ubuntu box means installing Nginx or Apache, PHP-FPM and
          MySQL/MariaDB yourself, or containerising it with the official{" "}
          <code>wordpress</code> Docker image instead.
        </li>
        <li>
          <strong>Backups are your responsibility on a raw VPS.</strong>{" "}
          Managed WordPress hosting bundles automatic backups; on a VPS,
          scheduled database dumps and file snapshots are something you set
          up yourself, not something that happens by default.
        </li>
      </ul>

      <h2>Two paths: raw VPS vs. a managed layer on top</h2>
      <p>
        <strong>Raw VPS, fully self-managed</strong> — DigitalOcean, Vultr,
        Hetzner, Contabo and Linode all work well here: you provision a
        server, install or image a LEMP/LAMP stack (or run WordPress in
        Docker, the same pattern as this site&apos;s{" "}
        <Link href="/deploy-node-app-hetzner/">Node.js on Hetzner</Link>,{" "}
        <Link href="/deploy-nextjs-contabo/">Next.js on Contabo</Link> and{" "}
        <Link href="/deploy-fastapi-linode/">FastAPI on Linode</Link>{" "}
        tutorials, swapping the app container for <code>wordpress</code> plus
        a database container), and you own every layer including caching and
        backups. Cheapest option, most work, most control.
      </p>
      <p>
        <strong>VPS infrastructure with a managed WordPress layer</strong> —{" "}
        Cloudways is the clearest example: it provisions and manages VPS
        infrastructure (on top of DigitalOcean, Vultr, Linode or AWS, your
        choice) specifically for WordPress, with one-click installs, built-in
        page and object caching, staging environments and managed backups
        included. Hostinger sits partway there too — its VPS line (covered in
        full in the{" "}
        <Link href="/hostinger-vps-review/">Hostinger VPS review</Link>) leans
        toward WordPress with relevant templates, on top of a business that&apos;s
        broadly WordPress-focused across its whole hosting lineup. Both cost
        more than the raw-VPS path. What you&apos;re paying for is the
        ongoing maintenance time you&apos;re not spending — a fair trade for
        some readers, not for others.
      </p>

      <h2>Provider by provider</h2>
      <p>
        Numbers below follow the same figures already used elsewhere on this
        site for consistency. Confirm current specs and pricing on each
        provider&apos;s own page before buying — this list changes the most
        of anything covered here.
      </p>

      <h3>DigitalOcean</h3>
      <p>
        DigitalOcean&apos;s Marketplace has a one-click WordPress Droplet,
        which gets a working LEMP stack running in a few minutes. A
        2&nbsp;vCPU / 4&nbsp;GB Droplet (~$24/mo) is a reasonable home for a
        small-to-medium site with a page builder in play; the 1&nbsp;GB tier
        (~$6/mo) suits a light, mostly-static site. The genuine edge is
        documentation — a huge share of &quot;how do I configure WordPress
        caching on Ubuntu&quot; searches resolve to a working DigitalOcean
        guide.
      </p>
      <p>
        {/* TODO: replace with real AWIN deep link — affiliate application pending approval */}
        <a
          href="https://www.digitalocean.com/"
          rel="sponsored nofollow noopener"
          target="_blank"
        >
          DigitalOcean
        </a>
        .
      </p>

      <h3>Vultr</h3>
      <p>
        Vultr also ships a one-click WordPress app in its Marketplace, on
        NVMe-backed plans at similar prices to DigitalOcean — roughly $24/mo
        for 2&nbsp;vCPU / 4&nbsp;GB. The wider draw for WordPress
        specifically is Vultr&apos;s ~32 regions — useful if your visitors
        (or your CDN&apos;s origin pulls) are concentrated somewhere the
        bigger providers don&apos;t reach as directly.
      </p>
      <aside className="callout" role="note">
        <span className="callout-label">Vultr credit</span>
        <p>
          Vultr is currently running a promo: sign up{" "}
          {/* Vultr referral link (ref=9921215-9J) */}
          <a
            href="https://www.vultr.com/?ref=9921215-9J"
            rel="sponsored nofollow noopener"
            target="_blank"
          >
            through this link
          </a>{" "}
          and you get $300 in credit — plenty to run a WordPress site on it
          for months before deciding whether to keep it. Limited-time offer;
          the amount may differ by the time you click through.
        </p>
      </aside>

      <h3>Hetzner</h3>
      <p>
        Hetzner doesn&apos;t offer an official one-click WordPress image the
        way DigitalOcean and Vultr do — you&apos;re installing a stack
        yourself or containerising it, the same shape as the{" "}
        <Link href="/deploy-node-app-hetzner/">Docker tutorial</Link> on this
        site. What you get in exchange is the best RAM-per-euro on this
        list — a CX22 (2&nbsp;vCPU / 4&nbsp;GB) runs about €3.79/mo — plus
        free basic DDoS mitigation by default. Worth the extra 15 minutes of
        setup if you&apos;re comfortable with a terminal.
      </p>
      <p>
        {/* Plain link — Hetzner's referral programme ended in 2026; not tracked */}
        <a href="https://www.hetzner.com/cloud" rel="noopener" target="_blank">
          Hetzner Cloud
        </a>
        .
      </p>

      <h3>Contabo</h3>
      <p>
        Contabo&apos;s VPS signup flow includes an application-image option
        that has historically included WordPress alongside plain OS images —
        worth checking at signup, since template lists change. What&apos;s
        consistent is the value: Contabo ships more RAM per dollar than
        anyone else here, which matters more for WordPress with a heavy page
        builder than it does for a lot of other workloads. The trade-off is
        less consistent performance under sustained load on the cheapest
        tiers than a Hetzner or DigitalOcean box at a similar price.
      </p>
      <p>
        {/* Plain link — Contabo has no affiliate programme; not tracked */}
        <a href="https://contabo.com/en/vps/" rel="noopener" target="_blank">
          Contabo VPS
        </a>
        .
      </p>

      <h3>Linode</h3>
      <p>
        Linode&apos;s Marketplace includes a one-click WordPress deployment,
        and pricing is flat across regions — so you&apos;re not trading
        location against cost the way you can be elsewhere. For the full
        Docker-based alternative on Linode, see the{" "}
        <Link href="/deploy-fastapi-linode/">FastAPI on Linode</Link>{" "}
        tutorial for the same VPS-hardening steps, with a{" "}
        <code>wordpress</code> container swapped in for the app.
      </p>
      <p>
        {/* Plain link — Linode/Akamai has no affiliate programme yet; not tracked */}
        <a href="https://www.linode.com/" rel="noopener" target="_blank">
          Linode
        </a>
        .
      </p>

      <h3>Cloudways</h3>
      <p>
        Cloudways isn&apos;t a VPS provider itself — it provisions and
        manages servers on top of DigitalOcean, Vultr, Linode or AWS,
        specifically tuned for WordPress: one-click installs, built-in
        page and object caching (typically Varnish and Redis), staging
        sites, and managed backups, all through one dashboard regardless of
        which underlying provider you pick. It costs more than running the
        same underlying VPS yourself, and that premium is the entire
        point — you&apos;re buying back the caching and maintenance work the
        rest of this list leaves to you.
      </p>
      <p>
        {/* Plain link — Cloudways has no affiliate programme configured on this site yet; not tracked */}
        <a href="https://www.cloudways.com/" rel="noopener" target="_blank">
          Cloudways
        </a>
        .
      </p>

      <h3>Hostinger</h3>
      <p>
        Hostinger&apos;s whole business leans WordPress-heavy across its
        hosting lineup, and that shows up in the VPS line too, with
        WordPress-relevant templates alongside the general-purpose ones.{" "}
        <Link href="/hostinger-vps-review/">The full review</Link> covers the
        VPS line in detail — the short version for WordPress specifically is
        that hPanel makes setup genuinely easy for a less technical reader,
        at the cost of the portability and hourly billing the rest of this
        list offers.
      </p>
      <p>
        {/* Plain link — Hostinger has no affiliate programme yet; not tracked */}
        <a
          href="https://www.hostinger.com/vps-hosting"
          rel="noopener"
          target="_blank"
        >
          Hostinger VPS
        </a>
        .
      </p>

      <div className="verdict">
        <h2>Quick verdict</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>If you want…</th>
                <th>Pick</th>
                <th>Because</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The cheapest raw VPS that still performs well</td>
                <td>Hetzner</td>
                <td>
                  Best RAM-per-euro with consistent performance; no
                  one-click image, but the Docker-based setup is
                  well-documented on this site.
                </td>
              </tr>
              <tr>
                <td>The most RAM per dollar, budget above all</td>
                <td>Contabo</td>
                <td>
                  Cheapest way to get enough headroom for a page-builder-heavy
                  site, at the cost of some performance consistency.
                </td>
              </tr>
              <tr>
                <td>
                  Managed WordPress features without full managed hosting
                  cost
                </td>
                <td>Cloudways</td>
                <td>
                  Caching, staging and backups built in, on top of
                  infrastructure from providers already on this list.
                </td>
              </tr>
              <tr>
                <td>The easiest first-time setup, one-click included</td>
                <td>DigitalOcean or Vultr</td>
                <td>
                  Official Marketplace WordPress images and the best
                  documentation for troubleshooting afterward.
                </td>
              </tr>
              <tr>
                <td>
                  You&apos;re already comfortable with Docker and want one
                  consistent workflow
                </td>
                <td>Hetzner, Contabo or Linode</td>
                <td>
                  Run the official <code>wordpress</code> image the same way
                  this site&apos;s Docker tutorials deploy anything else —
                  see the{" "}
                  <Link href="/deploy-node-app-hetzner/">
                    tutorials
                  </Link>{" "}
                  for the pattern.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2>Where these links stand</h2>
      <p>
        Vultr&apos;s link above is a real, tracked referral link — sign up
        through it and this site may earn a commission at no cost to you.
        DigitalOcean&apos;s affiliate application is still pending approval,
        so its link is plain for now and earns nothing either way.
        Hetzner, Contabo, Linode, Cloudways and Hostinger don&apos;t run
        affiliate programmes on this site at all, so those links are plain
        and untracked by design. None of that changes the recommendations
        above — see the <Link href="/disclosure/">disclosure</Link> for the
        full policy.
      </p>

      <h2>Bottom line</h2>
      <p>
        There&apos;s no single best answer, because &quot;best&quot; depends
        on how much of the maintenance work you actually want. If you&apos;re
        comfortable owning the stack, Hetzner or Contabo get you the most
        server for the least money, and this site&apos;s Docker tutorials
        cover the setup pattern either way. If you want WordPress-specific
        conveniences — caching, staging, backups — without paying full
        managed-hosting rates, Cloudways is the honest middle ground. If
        you&apos;d rather a friendlier panel handle the details and
        you&apos;re less concerned with squeezing out every dollar,
        Hostinger&apos;s VPS line or a one-click DigitalOcean or Vultr
        Droplet will get you there fastest. Pick based on how much of this
        you actually want to manage yourself — not on which of these links
        happens to pay this site the most.
      </p>

      <hr />
      <p className="article-meta">
        Running WordPress somewhere else on this list and want it covered?{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </article>
  );
}
