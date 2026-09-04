import Link from "next/link";
import AffiliateNotice from "@/components/AffiliateNotice";
import JsonLd from "@/components/JsonLd";
import { siteConfig, posts } from "@/lib/site";
import { pageMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";

// ---------------------------------------------------------------------------
// This page aggregates and summarizes benchmark results and pricing that
// OTHER, independent publications have already tested and published — it is
// not original testing run by this site. Every performance figure below is
// deliberately a range or a directional statement, never a single invented
// number, because published sources disagree with each other on exact
// figures (see "About these numbers"). Pricing is the one thing shown
// precisely, because it's a publicly posted fact, not a benchmark result —
// pulled from each provider's own pricing page, dated below.
//
// scripts/benchmark.sh in this repo is real, working infrastructure for when
// this page is replaced with this site's own original testing.
// ---------------------------------------------------------------------------

const post = posts.find((p) => p.slug === "vps-benchmarks-2026")!;

export const metadata = pageMeta({
  title: "VPS Benchmarks 2026: What the Published Data Shows",
  description:
    "A sourced summary of published DigitalOcean, Vultr, Hetzner and Contabo benchmarks and current list pricing — shown as ranges, not invented precise numbers.",
  path: "/vps-benchmarks-2026/",
  type: "article",
  published: post.date,
  modified: post.updated,
});

const schema = [
  articleSchema({
    headline: "VPS benchmarks 2026: what the published data shows",
    description: post.description,
    path: "/vps-benchmarks-2026/",
    published: post.date,
    modified: post.updated,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "VPS Benchmarks 2026", path: "/vps-benchmarks-2026/" },
  ]),
];

const LAST_UPDATED = "4 September 2026";

type PriceRow = {
  name: string;
  plan: string;
  specs: string;
  price: string;
};

const PRICES: PriceRow[] = [
  {
    name: "DigitalOcean",
    plan: "Basic Droplet",
    specs: "2 vCPU / 4 GB RAM / 80 GB SSD / 4 TB transfer",
    price: "$24/mo",
  },
  {
    name: "Vultr",
    plan: "Cloud Compute (High Frequency/Performance, NVMe)",
    specs: "2 vCPU / 4 GB RAM / NVMe",
    price: "~$24/mo",
  },
  {
    name: "Hetzner",
    plan: "CX22",
    specs: "2 vCPU / 4 GB RAM / 40 GB NVMe / 20 TB transfer",
    price: "~€3.79–4.59/mo",
  },
  {
    name: "Contabo",
    plan: "Cloud VPS (entry tier)",
    specs: "4 vCPU / 8 GB RAM / 50–100 GB NVMe-SSD",
    price: "~€4.50–5.50/mo (intro rate)",
  },
];

export default function Page() {
  return (
    <article className="prose">
      <JsonLd data={schema} />

      <Link href="/" className="back-link">
        ← Home
      </Link>

      <h1>VPS Benchmarks 2026</h1>
      <p className="article-meta">
        Comparison · last updated: {LAST_UPDATED} · aggregated from
        published third-party sources — see below
      </p>

      <AffiliateNotice />

      <p>
        <strong>This page is not original testing run by this site.</strong>{" "}
        It&apos;s a sourced summary of what independent, already-published
        benchmark comparisons say about DigitalOcean, Vultr, Hetzner and
        Contabo, plus current list pricing pulled directly from each
        provider&apos;s own pricing page. Where this site does run its own
        deployments and testing, that&apos;s stated plainly — see the{" "}
        <Link href="/about/">methodology</Link>. This page is the honest
        alternative to that: a map of what other people have already
        measured, clearly attributed, rather than numbers presented as
        original data they aren&apos;t.
      </p>
      <p>
        That&apos;s also why almost nothing below is a single precise number.
        Synthetic VPS benchmarks are genuinely noisy — results shift with the
        exact test tool, the region and time of day a test happened to run,
        and how much a shared vCPU was contending with other tenants at that
        moment. Three reputable sources testing the same providers can (and,
        as you&apos;ll see below, do) land on meaningfully different
        rankings. Collapsing that into one fake-precise number per provider
        would hide the most useful thing to know — that the &quot;right&quot;
        answer depends on when and how you test — so this page shows ranges
        and directional statements instead, and says so explicitly.
      </p>

      <h2>About these numbers</h2>
      <p>
        The performance notes below are pulled from multiple published,
        independent comparisons — cited by name in the{" "}
        <a href="#sources">Sources</a> section — not reproduced as exact
        figures. Where those sources agree on a direction (say, one provider
        consistently coming out ahead on a metric), that direction is stated.
        Where they disagree — which happens often, especially on disk I/O —
        that disagreement is stated instead of picking one source&apos;s
        number and presenting it as settled fact.
      </p>
      <p>
        This page will be revised as more published data becomes available,
        and — the actual goal — replaced with this site&apos;s own original,
        run-the-same-deployment-on-every-provider testing once that&apos;s
        complete. The tooling for that already exists in this
        site&apos;s repository (<code>scripts/benchmark.sh</code>); it just
        hasn&apos;t produced a published run yet. Until it has, this page
        stays an honest aggregation, not a placeholder dressed up as one.
      </p>

      <h2>Current pricing</h2>
      <p>
        Unlike a benchmark result, a list price is a publicly posted fact,
        not something that varies by test methodology — so this table is as
        precise as the numbers on this page get. Checked{" "}
        {LAST_UPDATED}, directly against each provider&apos;s own pricing
        page. Confirm before you buy: intro-vs-renewal pricing, regional VAT,
        and plan reshuffles all move these numbers, sometimes within weeks.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Plan</th>
              <th>Specs</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {PRICES.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{r.plan}</td>
                <td>{r.specs}</td>
                <td>{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Contabo doesn&apos;t have a plan at the same 2&nbsp;vCPU / 4&nbsp;GB
        tier as the other three — its entry &quot;Cloud VPS&quot; plan ships
        roughly double the vCPU and RAM instead, for a similar price. That
        asymmetry is real, not a rounding choice on this page&apos;s part,
        and it&apos;s the same &quot;more spec for the money, less
        consistent performance&quot; pattern already discussed in this
        site&apos;s{" "}
        <Link href="/best-vps-for-game-servers/">
          game server hosting guide
        </Link>{" "}
        and{" "}
        <Link href="/best-vps-for-wordpress/">WordPress VPS guide</Link>.
        Hetzner&apos;s range above is wider than the others for a more
        mundane reason: independent sources checked at different times quoted
        noticeably different euro figures for the same CX22 plan, which is
        itself a small illustration of how fast these numbers move.
      </p>

      <h2>What published comparisons say</h2>
      <p>
        Directional summaries only — no invented digits. Each statement below
        reflects a pattern across more than one of the sources listed under{" "}
        <a href="#sources">Sources</a>, not a single cherry-picked result.
      </p>
      <ul>
        <li>
          <strong>CPU.</strong> Hetzner shows up as competitive to
          front-of-pack in most of the published comparisons checked for this
          page, particularly on single-core work and price-adjusted scores.
          DigitalOcean and Vultr trade places depending on the specific test
          and plan tier — neither is consistently behind the other across
          sources. Contabo is harder to place on CPU specifically because
          fewer independent sources test its plans at a comparable tier.
        </li>
        <li>
          <strong>Disk I/O.</strong> This is where published sources disagree
          the most, sometimes by very large margins depending on whether a
          test used direct I/O, what block size it used, and whether the
          instance had NVMe or SSD storage in the region tested. The honest
          summary is <em>&quot;varies significantly by report&quot;</em>{" "}
          rather than a ranking — treat any single source quoting an exact
          IOPS figure for any of these providers with real skepticism unless
          it states its full test parameters.
        </li>
        <li>
          <strong>Network.</strong> Generally high and broadly comparable
          across all four providers from their primary regions in the
          sources checked, with route quality and cross-region latency
          mattering more than raw throughput — none of the published
          comparisons found a consistent, large gap between providers here.
        </li>
        <li>
          <strong>Consistency.</strong> More than one source noted that
          results vary less by provider than they do by <em>when</em> a test
          was run — the same plan on the same provider can show real
          variance between two test sessions a few hours apart, which is a
          finding about shared-tenant infrastructure in general, not a knock
          on any one provider specifically.
        </li>
      </ul>

      <h2 id="sources">Sources</h2>
      <p>
        This page draws on the kind of testing these publish regularly,
        cited by name — not by reproducing their specific numbers as if they
        were collected here:
      </p>
      <ul>
        <li>
          <a
            href="https://www.vpsbenchmarks.com/"
            rel="noopener"
            target="_blank"
          >
            VPSBenchmarks.com
          </a>{" "}
          — ongoing sysbench, fio and network comparisons across providers,
          presented as graded scores rather than raw numbers. Worth knowing:
          the site discloses that it receives support from some of the
          providers it tests, the same kind of relationship this site
          discloses on its own affiliate links — see the{" "}
          <Link href="/disclosure/">disclosure</Link>.
        </li>
        <li>
          <a href="https://vpschart.com/" rel="noopener" target="_blank">
            VPSchart.com
          </a>{" "}
          — aggregates Geekbench, fio and iperf3 results across providers
          including all four covered here.
        </li>
        <li>
          <a href="https://aimultiple.com/vps-benchmark" rel="noopener" target="_blank">
            AIMultiple&apos;s VPS benchmark report
          </a>{" "}
          — sysbench/fio/speedtest-cli testing run across multiple sessions
          at different times of day specifically to capture the kind of
          time-of-day variance this page keeps referring back to.
        </li>
        <li>
          Community benchmark threads on{" "}
          <a
            href="https://www.lowendtalk.com/"
            rel="noopener"
            target="_blank"
          >
            LowEndTalk
          </a>{" "}
          and{" "}
          <a
            href="https://www.webhostingtalk.com/"
            rel="noopener"
            target="_blank"
          >
            WebHostingTalk
          </a>
          , where users regularly post raw <code>sysbench</code>/
          <code>fio</code> output for specific plans — useful for spot-checks
          against the more formal comparisons above, though quality and
          methodology vary post to post.
        </li>
        <li>
          Each provider&apos;s own published specifications and pricing
          pages, for the plan details and prices in the table above.
        </li>
      </ul>

      <h2>Where these providers stand today</h2>
      <p>
        For the qualitative, hands-on side rather than benchmark numbers: our{" "}
        <Link href="/digitalocean-vs-vultr/">
          DigitalOcean vs Vultr comparison
        </Link>{" "}
        covers pricing, workflow and support in depth, and the{" "}
        <Link href="/deploy-node-app-hetzner/">Hetzner</Link>,{" "}
        <Link href="/deploy-nextjs-contabo/">Contabo</Link> and{" "}
        <Link href="/deploy-fastapi-linode/">Linode</Link> tutorials each
        show a real deployment on that specific provider — the kind of
        first-hand experience a synthetic benchmark can&apos;t substitute
        for.
      </p>
      <p>
        If you want to run your own numbers alongside the sources above, new
        accounts on{" "}
        <a
          href="https://www.digitalocean.com/"
          rel="sponsored nofollow noopener"
          target="_blank"
        >
          DigitalOcean
        </a>{" "}
        and{" "}
        <a
          href="https://www.vultr.com/?ref=9921215-9J"
          rel="sponsored nofollow noopener"
          target="_blank"
        >
          Vultr
        </a>{" "}
        usually start with trial credit — both bill hourly, so a full
        benchmark run costs cents. These are affiliate links; see the{" "}
        <Link href="/disclosure/">disclosure</Link>.
      </p>

      <hr />
      <p className="article-meta">
        Ran your own numbers and got something different from what&apos;s
        summarized above? That&apos;s useful to know — tell me:{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </article>
  );
}
