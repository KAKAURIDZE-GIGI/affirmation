import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & methodology",
  description:
    "Who writes Host or Die, and exactly how each VPS and cloud host is tested — the tools, the metrics (CPU, disk I/O, network throughput, boot time) and the ground rules.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About &amp; methodology</h1>
      <p className="article-meta">By {siteConfig.author} · backend &amp; infrastructure developer</p>

      <h2>Who writes this</h2>
      <p>
        I&apos;m {siteConfig.author}, a backend and infrastructure developer.
        I&apos;ve spent the better part of a decade shipping web applications,
        APIs and background workers onto Linux servers — bare metal, VPS, and
        the big clouds — and keeping them running. Choosing where to host a
        project always came down to the same frustrating search: marketing
        pages full of adjectives, benchmarks that never disclosed their setup,
        and &quot;top 10&quot; listicles ranked by affiliate payout.
      </p>
      <p>
        Host or Die is my attempt at the resource I wanted: every provider put
        through the same deployment and the same measurements, with the method
        written down so you can reproduce it or poke holes in it. If a number
        here looks wrong, tell me and I&apos;ll re-run it.
      </p>

      <h2>How each provider is tested</h2>
      <p>
        Every review starts from a clean account and a fresh server in the
        provider&apos;s default configuration. Unless a review says otherwise,
        the test box is the cheapest plan with at least 1&nbsp;vCPU and
        1&nbsp;GB RAM, running <strong>Ubuntu&nbsp;24.04&nbsp;LTS</strong>, in
        the region geographically closest to me. I provision it twice, on
        different days, and average the results.
      </p>

      <h3>The workload</h3>
      <p>
        A representative deployment goes on first: a Dockerised Node.js API in
        front of PostgreSQL, plus an Nginx reverse proxy with a Let&apos;s
        Encrypt certificate. This shakes out real-world friction — image pull
        speed, build time, whether the control panel fights you — before any
        synthetic numbers are collected.
      </p>

      <h3>The measurements</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Tool</th>
              <th>What it tells you</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CPU, single &amp; multi-core</td>
              <td>
                <code>sysbench cpu</code>, <code>stress-ng</code>,
                <code> 7z b</code>
              </td>
              <td>
                Sustained compute for build steps, request handling and
                background jobs; whether a &quot;shared&quot; vCPU throttles
                under load.
              </td>
            </tr>
            <tr>
              <td>Disk I/O</td>
              <td>
                <code>fio</code> (4K random read/write, 1M sequential)
              </td>
              <td>
                Database performance, log-heavy workloads, and how honest the
                &quot;NVMe&quot; label is.
              </td>
            </tr>
            <tr>
              <td>Network throughput</td>
              <td>
                <code>iperf3</code> to third-party endpoints,
                <code> speedtest-cli</code>
              </td>
              <td>
                Real egress to other regions, not just the provider&apos;s own
                speed-test mirror.
              </td>
            </tr>
            <tr>
              <td>Boot &amp; provision time</td>
              <td>
                <code>systemd-analyze</code>, API timestamps, wall clock
              </td>
              <td>
                How fast you can scale out or replace a failed node.
              </td>
            </tr>
            <tr>
              <td>Latency</td>
              <td>
                <code>ping</code>, <code>mtr</code>, TTFB from three continents
              </td>
              <td>
                Route quality and peering, not just distance on a map.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Also noted, not scored</h3>
      <ul>
        <li>Time from signup to a usable SSH session.</li>
        <li>
          Whether IPv6, private networking, snapshots and firewalls are included
          or billed as extras.
        </li>
        <li>Egress/bandwidth allowance and the overage price per GB.</li>
        <li>
          Support: a real ticket is opened during each review and the response
          time and usefulness recorded.
        </li>
        <li>Billing behaviour — hourly caps, minimums, and how hard it is to fully destroy a resource so it stops charging.</li>
      </ul>

      <h2>Ground rules</h2>
      <ul>
        <li>
          <strong>No sponsored reviews.</strong> No provider is given copy
          approval, an embargo, or advance sight of a score.
        </li>
        <li>
          <strong>Affiliate links never move the ranking.</strong> Where a
          referral link exists it&apos;s used; where one doesn&apos;t, the
          provider is still covered. See the{" "}
          <a href="/disclosure/">disclosure page</a>.
        </li>
        <li>
          <strong>Numbers include their setup.</strong> Plan, region, date,
          kernel and tool versions are published with every result so you can
          re-run them.
        </li>
        <li>
          <strong>Reviews get revisited.</strong> Providers change hardware and
          pricing; dated updates are appended rather than quietly edited.
        </li>
      </ul>

      <p>
        Spotted a mistake or want a provider tested? Mail{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </article>
  );
}
