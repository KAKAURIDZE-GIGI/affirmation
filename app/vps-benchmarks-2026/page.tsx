import Link from "next/link";
import type { Metadata } from "next";
import AffiliateNotice from "@/components/AffiliateNotice";
import { pageMeta } from "@/lib/seo";

// ---------------------------------------------------------------------------
// STRUCTURE-ONLY PAGE. Every metric below is `null` = "— pending" until a real
// benchmark run fills it in. To publish real data, edit RESULTS + LAST_UPDATED
// here (numbers come from benchmark-results/<provider>-<date>.txt) — the table
// and the charts read straight from this array, no other change needed.
//
// This route is deliberately NOT in lib/site.ts posts[], the sitemap, the
// homepage list, or the nav, and it is robots:noindex. Wire it in as a
// separate step once the data is real.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  ...pageMeta({
    title: "VPS Benchmarks 2026: Real Performance Data — Host or Die",
    description:
      "Ongoing, independently-run VPS benchmarks — CPU, disk I/O, network throughput and boot time on a comparable instance tier across DigitalOcean, Vultr, Hetzner and Contabo.",
    path: "/vps-benchmarks-2026/",
    type: "article",
  }),
  robots: { index: false, follow: true },
};

/** Set to a real date (e.g. "14 September 2026") once the first run is in. */
const LAST_UPDATED = "pending first run";

/** The single instance tier tested on every provider. */
const TESTED_TIER = "2 vCPU / 4 GB RAM";

type Metric = number | null;

type ProviderResult = {
  name: string;
  /** exact plan name at the tested tier */
  plan: string;
  priceMonthly: string | null;
  cpuScore: Metric; // sysbench cpu — events/sec (higher better)
  seqReadMBs: Metric; // fio 1M sequential read — MB/s
  seqWriteMBs: Metric; // fio 1M sequential write — MB/s
  randReadIops: Metric; // fio 4k random read — IOPS
  randWriteIops: Metric; // fio 4k random write — IOPS
  networkMbps: Metric; // iperf3 — Mbit/s (manual step)
  bootSeconds: Metric; // create -> SSH ready, seconds (manual step)
};

const RESULTS: ProviderResult[] = [
  {
    name: "DigitalOcean",
    plan: "Basic Droplet — Premium AMD",
    priceMonthly: null,
    cpuScore: null,
    seqReadMBs: null,
    seqWriteMBs: null,
    randReadIops: null,
    randWriteIops: null,
    networkMbps: null,
    bootSeconds: null,
  },
  {
    name: "Vultr",
    plan: "High Performance",
    priceMonthly: null,
    cpuScore: null,
    seqReadMBs: null,
    seqWriteMBs: null,
    randReadIops: null,
    randWriteIops: null,
    networkMbps: null,
    bootSeconds: null,
  },
  {
    name: "Hetzner",
    plan: "CX22 (x86) / CAX11 (Arm)",
    priceMonthly: null,
    cpuScore: null,
    seqReadMBs: null,
    seqWriteMBs: null,
    randReadIops: null,
    randWriteIops: null,
    networkMbps: null,
    bootSeconds: null,
  },
  {
    name: "Contabo",
    plan: "Cloud VPS 10",
    priceMonthly: null,
    cpuScore: null,
    seqReadMBs: null,
    seqWriteMBs: null,
    randReadIops: null,
    randWriteIops: null,
    networkMbps: null,
    bootSeconds: null,
  },
  // Add more providers here as they are tested.
];

const PENDING = "— pending";

function Cell({
  value,
  suffix = "",
}: {
  value: string | number | null;
  suffix?: string;
}) {
  if (value == null) return <span className="pending">{PENDING}</span>;
  return (
    <>
      {typeof value === "number" ? value.toLocaleString("en-US") : value}
      {suffix}
    </>
  );
}

function BarChart({
  title,
  unit,
  metric,
}: {
  title: string;
  unit: string;
  metric: (r: ProviderResult) => Metric;
}) {
  const values = RESULTS.map(metric);
  const max = Math.max(0, ...values.filter((v): v is number => v != null));
  const hasData = max > 0;

  return (
    <figure className="bench-chart">
      <figcaption>
        {title} <span className="bench-unit">({unit}, higher is better)</span>
      </figcaption>
      <div className="bench-bars">
        {RESULTS.map((r) => {
          const v = metric(r);
          const pct = hasData && v != null ? Math.max(2, (v / max) * 100) : 0;
          return (
            <div className="bench-bar-row" key={r.name}>
              <span className="bench-bar-name">{r.name}</span>
              <div className="bench-bar-track">
                {v != null && hasData ? (
                  <div
                    className="bench-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                ) : null}
                <span className="bench-bar-val">
                  {v == null ? PENDING : v.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {!hasData ? (
        <p className="bench-chart-note">
          Bars render automatically once <code>RESULTS</code> in this page&apos;s
          source has real numbers.
        </p>
      ) : null}
    </figure>
  );
}

export default function Page() {
  return (
    <article className="prose">
      <Link href="/" className="back-link">
        ← Home
      </Link>

      <h1>VPS Benchmarks 2026</h1>
      <p className="article-meta">
        Living document · last updated: {LAST_UPDATED} · re-tested periodically
        as providers change hardware and pricing
      </p>

      <AffiliateNotice />

      <p>
        This page is an ongoing, independently-run performance comparison across
        VPS providers, all measured on the same instance tier
        (<strong>{TESTED_TIER}</strong>) with the same test suite. It is not a
        one-off: providers swap CPUs, move to NVMe, and adjust pricing, so the
        table below is re-run periodically and dated.
      </p>
      <p>
        <strong>Status:</strong> the harness and this page are built; the first
        measured run has not been published yet. Every number currently shows{" "}
        <span className="pending">{PENDING}</span> — nothing here is estimated or
        filled in by hand.
      </p>

      <h2>Methodology</h2>
      <p>
        Each provider is tested on a fresh instance of the{" "}
        <strong>{TESTED_TIER}</strong> tier, running Ubuntu 24.04 LTS in the
        region closest to the test controller. The exact tooling is the{" "}
        <code>scripts/benchmark.sh</code> script in this repository — run as{" "}
        <code>./benchmark.sh &lt;provider&gt;</code>, which saves raw output to{" "}
        <code>benchmark-results/&lt;provider&gt;-&lt;date&gt;.txt</code>.
      </p>
      <ul>
        <li>
          <strong>CPU — <code>sysbench cpu</code>.</strong> Prime-number
          crunching across every vCPU (<code>--cpu-max-prime=20000</code>,{" "}
          <code>--threads=$(nproc)</code>). A stand-in for build steps, request
          handling and anything compute-bound; shows whether a &quot;shared&quot;
          vCPU sustains its clock under load.
        </li>
        <li>
          <strong>Disk — <code>fio</code>.</strong> Sequential read/write at 1M
          block size (throughput, MB/s — matters for backups, log flushing,
          large file serving) and 4K random read/write with{" "}
          <code>numjobs=4</code> (IOPS — the access pattern a Postgres or MySQL
          database actually generates). All with <code>--direct=1</code> so the
          page cache is bypassed.
        </li>
        <li>
          <strong>Network — <code>iperf3</code>.</strong> Throughput to a
          fixed third-party reference host, both directions. Run manually
          because it needs a second machine.
        </li>
        <li>
          <strong>Boot time.</strong> Wall-clock from the provider&apos;s
          &quot;create&quot; API call to the first successful SSH connection.
          Measured by hand / from API timestamps.
        </li>
      </ul>
      <p>
        Why these and not a synthetic score: they map directly onto real
        workloads — containers pulling and building images, a database doing
        small random I/O, a web server pushing bytes. The full reasoning is in
        the <Link href="/about/">methodology</Link>.
      </p>

      <h2>Results</h2>
      <p>
        One row per provider at the {TESTED_TIER} tier. Numbers are filled in
        from the raw <code>benchmark-results/</code> files as each run completes;
        an empty cell means that measurement has not been taken yet.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>CPU (events/s)</th>
              <th>Seq read (MB/s)</th>
              <th>Seq write (MB/s)</th>
              <th>Rand read (IOPS)</th>
              <th>Rand write (IOPS)</th>
              <th>Network (Mbit/s)</th>
              <th>Boot (s)</th>
              <th>Price/mo</th>
            </tr>
          </thead>
          <tbody>
            {RESULTS.map((r) => (
              <tr key={r.name}>
                <td>
                  {r.name}
                  <br />
                  <span className="pending">{r.plan}</span>
                </td>
                <td>
                  <Cell value={r.cpuScore} />
                </td>
                <td>
                  <Cell value={r.seqReadMBs} />
                </td>
                <td>
                  <Cell value={r.seqWriteMBs} />
                </td>
                <td>
                  <Cell value={r.randReadIops} />
                </td>
                <td>
                  <Cell value={r.randWriteIops} />
                </td>
                <td>
                  <Cell value={r.networkMbps} />
                </td>
                <td>
                  <Cell value={r.bootSeconds} />
                </td>
                <td>
                  <Cell value={r.priceMonthly} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Charts</h2>
      <p>
        Same data, drawn as bars for quick comparison. They stay empty until the
        table above has real numbers.
      </p>
      <BarChart
        title="CPU — sysbench"
        unit="events/sec"
        metric={(r) => r.cpuScore}
      />
      <BarChart
        title="Disk — sequential read"
        unit="MB/s"
        metric={(r) => r.seqReadMBs}
      />
      <BarChart
        title="Disk — sequential write"
        unit="MB/s"
        metric={(r) => r.seqWriteMBs}
      />

      <h2>Where these providers stand today</h2>
      <p>
        Until the measured numbers land, the qualitative picture is in the
        long-form reviews: our{" "}
        <Link href="/digitalocean-vs-vultr/">
          DigitalOcean vs Vultr comparison
        </Link>{" "}
        covers pricing, workflow and support, and the{" "}
        <Link href="/deploy-node-app-hetzner/">
          Node.js on Hetzner with Docker walkthrough
        </Link>{" "}
        shows the kind of deployment these boxes get benchmarked against.
      </p>
      <p>
        If you want to run your own numbers alongside these, new accounts on{" "}
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
        usually start with trial credit — both bill hourly, so a full benchmark
        run costs cents. These are affiliate links; see the{" "}
        <Link href="/disclosure/">disclosure</Link>.
      </p>

      <hr />
      <p className="article-meta">
        Raw benchmark output for every run is kept in{" "}
        <code>benchmark-results/</code> in the site repository once published.
      </p>
    </article>
  );
}
