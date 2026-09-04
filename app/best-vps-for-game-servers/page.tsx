import Link from "next/link";
import AffiliateNotice from "@/components/AffiliateNotice";
import JsonLd from "@/components/JsonLd";
import { siteConfig, posts } from "@/lib/site";
import { pageMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";

const post = posts.find((p) => p.slug === "best-vps-for-game-servers")!;

export const metadata = pageMeta({
  title: "Best VPS for Game Servers (Minecraft & More) 2026",
  description:
    "Five VPS providers compared for self-hosting a Minecraft, Valheim or other game server — RAM per dollar, player latency and DDoS protection, not web-app benchmarks.",
  path: "/best-vps-for-game-servers/",
  type: "article",
  published: post.date,
  modified: post.updated,
});

const schema = [
  articleSchema({
    headline: "Best VPS for game servers: Minecraft, Valheim and more (2026)",
    description: post.description,
    path: "/best-vps-for-game-servers/",
    published: post.date,
    modified: post.updated,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Best VPS for Game Servers", path: "/best-vps-for-game-servers/" },
  ]),
];

export default function Page() {
  return (
    <article className="prose">
      <JsonLd data={schema} />

      <Link href="/" className="back-link">
        ← All posts
      </Link>

      <h1>Best VPS for Game Servers (Minecraft, Valheim, and More) in 2026</h1>
      <p className="article-meta">
        Comparison · published 1 September 2026 · specs pulled from this
        site&apos;s own provider reviews — verify current pricing before you
        buy
      </p>

      <AffiliateNotice />

      <p>
        Everything else on this site is about deploying a web app or API.
        Self-hosting a game server for you and some friends — a{" "}
        <strong>Minecraft</strong> world, a <strong>Valheim</strong> server, a
        Rust or Palworld box — is a different job with different priorities.
        Nobody&apos;s autoscaling a Minecraft server; it runs 24/7 at a fixed
        size, players notice latency immediately, and the thing that kills a
        session isn&apos;t a slow database query, it&apos;s the server running
        out of RAM and the tick rate falling apart.
      </p>
      <p>
        This is the same five providers already covered on the site —
        DigitalOcean, Vultr, Hetzner, Contabo and Linode — looked at through
        that lens instead. If you want the web-app side of any of them, the{" "}
        <Link href="/digitalocean-vs-vultr/">
          DigitalOcean vs Vultr comparison
        </Link>{" "}
        and the Docker deployment walkthroughs for{" "}
        <Link href="/deploy-node-app-hetzner/">Hetzner</Link>,{" "}
        <Link href="/deploy-nextjs-contabo/">Contabo</Link> and{" "}
        <Link href="/deploy-fastapi-linode/">Linode</Link> are the ones to
        read instead of this one.
      </p>

      <h2>What actually matters for game server hosting</h2>
      <ul>
        <li>
          <strong>RAM matters more than it does for a typical web app.</strong>{" "}
          A small vanilla Minecraft world runs fine on ~2&nbsp;GB. A Paper
          server with a handful of plugins is comfortable on 4&nbsp;GB. A
          heavily modded Forge or Fabric pack routinely wants 6–8&nbsp;GB or
          more, and that&apos;s before you add a second game server on the
          same box. Buy RAM headroom first, CPU second.
        </li>
        <li>
          <strong>Latency to the players, not throughput, is the network
          metric that matters.</strong> A game server doesn&apos;t move much
          data, but every packet round-trip shows up as input lag. A
          datacentre in the right region beats a technically faster network
          in the wrong one.
        </li>
        <li>
          <strong>DDoS protection is a real, not theoretical, concern.</strong>{" "}
          A public game server on a well-known port is a much softer target
          than an API behind a domain most people have never heard of —
          Minecraft and Rust servers get hit with volumetric attacks often
          enough that what a provider includes by default versus sells as an
          add-on is worth knowing before launch, not after.
        </li>
        <li>
          <strong>Billing predictability matters more here than
          flexibility.</strong> Most of the web-app content on this site
          assumes you might scale a box up, down, or to zero. A game server
          usually just runs, continuously, at one size, for as long as the
          world exists — so the number you actually care about is the flat
          monthly cost of the tier with enough RAM, not an hourly rate you
          might optimise.
        </li>
      </ul>

      <h2>Provider by provider</h2>
      <p>
        Prices and specs below are the ones already checked for this
        site&apos;s other reviews and tutorials, current when written.
        Hosting prices move — treat every number here as a starting point and
        confirm on the provider&apos;s own pricing page before you commit.
      </p>

      <h3>DigitalOcean</h3>
      <p>
        DigitalOcean&apos;s Basic Droplets run roughly $6/mo for 1&nbsp;GB and
        $24/mo for a 2&nbsp;vCPU / 4&nbsp;GB box — the 4&nbsp;GB tier is a
        reasonable home for a Paper server with plugins. Base Droplets get
        standard network-level filtering rather than a dedicated DDoS
        product — DigitalOcean&apos;s more explicit DDoS protection ships
        with Load Balancers, which most single-game-server setups won&apos;t
        run. Regions: around 15 datacentres, covering North America, Europe,
        and parts of Asia-Pacific — solid if your player base is mostly in one
        of those, thinner if it isn&apos;t. The real strength here for a
        first-timer is DigitalOcean&apos;s documentation and one-click
        Marketplace images, which lower the setup bar more than any of the
        other four.
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
        Vultr&apos;s High Frequency and High Performance lines land at similar
        prices to DigitalOcean — roughly $6/mo for 1&nbsp;GB, $24/mo for
        2&nbsp;vCPU / 4&nbsp;GB — but on NVMe with higher-clocked cores, which
        helps single-threaded tick processing. DDoS protection is a paid,
        per-instance add-on around $10/mo rather than bundled, so budget for
        it separately if you&apos;re running a public server. Where Vultr
        pulls ahead is regions: roughly 32 of them, including several
        DigitalOcean and most competitors don&apos;t operate in (São Paulo,
        Johannesburg, Tokyo, Seoul, Mumbai, Delhi) — if your player base is
        genuinely global or concentrated somewhere unusual, that wider map is
        the deciding factor more often than the spec sheet.
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
          and you get $300 in credit to try a game server yourself — plenty to
          run one for months before deciding whether to keep it. Limited-time
          offer; the amount may differ by the time you click through.
        </p>
      </aside>

      <h3>Hetzner</h3>
      <p>
        Hetzner is the RAM-per-euro leader among the mainstream options here:
        a CX22 (2&nbsp;vCPU / 4&nbsp;GB) runs about €3.79/mo, or €3.29/mo on
        the Arm-based CAX11 at the same spec — noticeably cheaper than
        DigitalOcean or Vultr at the same RAM. Hetzner includes basic DDoS
        mitigation at the network edge for every customer by default, no
        add-on required, though it&apos;s worth confirming the current scope
        of that on their site. The catch is geography: datacentres in
        Germany, Finland, the US, and Singapore cover Europe and North America
        well but leave South America, Africa, and Oceania without a close
        option — fine for a server whose players are mostly in Europe, a
        clear ping penalty otherwise.
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
        Contabo&apos;s reputation is built almost entirely on this exact use
        case: its VPS plans are known for shipping more RAM per dollar than
        anyone else on this list, which is exactly what a modded Minecraft
        pack or a couple of game servers sharing a box wants. The trade-off
        that comes with that value is worth knowing going in — Contabo&apos;s
        lower tiers are more likely to share physical hardware resources than
        a Hetzner or DigitalOcean box at a similar price, so performance can
        be less consistent under sustained load. Its datacentres span
        Germany, the US, the UK, Singapore, Australia, and Japan, a genuinely
        wide spread for the price. Exact current plan pricing and DDoS
        protection details are worth checking directly on Contabo&apos;s site
        — pricing structure there tends to move more than the other four.
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
        Linode — now part of Akamai Cloud Computing — charges the same price
        for a given plan regardless of region, which simplifies picking a
        datacentre close to your players instead of trading location off
        against cost. Its network spans roughly 20 regions. The genuinely
        distinctive thing for a public game server is what sits behind it
        now: Akamai runs one of the largest edge and DDoS-mitigation networks
        in the world, and Linode&apos;s infrastructure benefits from that
        backing — worth confirming exactly what&apos;s included by default
        versus an add-on for your plan, but it&apos;s a real differentiator
        rather than a marketing line. For a household running more than one
        game server (say, Minecraft and Valheim side by side), Linode
        Kubernetes Engine is also there once a single box stops being the
        right shape — well beyond what a first server needs, but worth
        knowing it exists.
      </p>
      <p>
        {/* Plain link — Linode/Akamai has no affiliate programme yet; not tracked */}
        <a href="https://www.linode.com/" rel="noopener" target="_blank">
          Linode
        </a>
        .
      </p>

      <h2>Getting the server running</h2>
      <p>
        This isn&apos;t a setup walkthrough — the mechanics are almost
        identical to the Docker tutorials already on this site, just with a
        game server image instead of a web app. Some providers (DigitalOcean
        and Vultr among them) offer one-click Marketplace images for popular
        game servers if you want the absolute minimum setup. Otherwise, a
        plain Ubuntu instance plus Docker gets you there in the same shape as{" "}
        <Link href="/deploy-node-app-hetzner/">
          the Hetzner
        </Link>
        , <Link href="/deploy-nextjs-contabo/">Contabo</Link> and{" "}
        <Link href="/deploy-fastapi-linode/">Linode</Link> walkthroughs: harden
        the box, install Docker, then run a container — for Minecraft
        specifically, <code>itzg/minecraft-server</code> is a well-known,
        actively maintained image that handles the Java/Paper/Forge setup for
        you. Swap the image, adjust the memory limits to match the RAM you
        bought above, and the rest of those tutorials&apos; server-hardening
        steps (non-root user, SSH keys, <code>ufw</code>) apply unchanged.
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
                <td>The most RAM per dollar for a modded pack</td>
                <td>Contabo</td>
                <td>
                  Highest RAM-to-price ratio of the five, at the cost of some
                  performance consistency on the cheapest tiers.
                </td>
              </tr>
              <tr>
                <td>Best value with more predictable performance</td>
                <td>Hetzner</td>
                <td>
                  NVMe, free basic DDoS mitigation, and low prices — best
                  fit if your players are mostly in Europe.
                </td>
              </tr>
              <tr>
                <td>The widest map of player-facing regions</td>
                <td>Vultr</td>
                <td>
                  ~32 locations including several none of the others offer,
                  for a genuinely global or unusually-located player base.
                </td>
              </tr>
              <tr>
                <td>A DDoS-hardened network behind a public server</td>
                <td>Linode</td>
                <td>
                  Backed by Akamai&apos;s edge network post-acquisition —
                  confirm current inclusions for your plan.
                </td>
              </tr>
              <tr>
                <td>The easiest first-time setup</td>
                <td>DigitalOcean</td>
                <td>
                  Best documentation and one-click Marketplace game server
                  images of the five.
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
        so its link is plain for now and earns nothing either way; it&apos;ll
        be swapped for a tracked one if and when that&apos;s approved.
        Hetzner, Contabo and Linode don&apos;t run affiliate programmes at
        all, so those three links are plain and untracked by design, not by
        omission. None of that changes the recommendations above — see the{" "}
        <Link href="/disclosure/">disclosure</Link> for the full policy.
      </p>

      <h2>Bottom line</h2>
      <p>
        There isn&apos;t one right answer here, which is really the point of
        breaking it down by scenario instead of picking a winner. If
        you&apos;re just getting a Minecraft world running for a few friends
        and don&apos;t want to think about it, Hetzner or DigitalOcean will
        get you there with the least friction. If the pack is heavily modded
        and RAM is the binding constraint, Contabo&apos;s value is hard to
        match. If your players are spread across continents, Vultr&apos;s
        region count is the thing that actually moves the needle, and if a
        public server getting attacked is a real worry, Linode&apos;s Akamai
        backing is worth the look. Pick for your situation, not for whichever
        provider happens to pay this site the most — that&apos;s the same
        rule the rest of the site runs on, and this post doesn&apos;t get an
        exception.
      </p>

      <hr />
      <p className="article-meta">
        Running something else — Valheim, Rust, Palworld, ARK — and want the
        specifics? {" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </article>
  );
}
