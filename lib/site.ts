// -----------------------------------------------------------------------------
// Site-wide configuration. Edit these values before you publish.
// -----------------------------------------------------------------------------

export const siteConfig = {
  name: "Host or Die",
  title:
    "Host or Die — independent, benchmark-based VPS & cloud hosting reviews for developers",
  description:
    "Independent VPS and cloud hosting reviews for developers. Real deployments, real benchmarks — CPU, disk I/O, network throughput, and boot time — with no sponsored fluff.",

  // Used for canonical URLs, sitemap, robots.txt and Open Graph tags.
  // Set NEXT_PUBLIC_SITE_URL in your host to override for previews; the
  // fallback below is the production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hostordie.com",

  contactEmail: "gigikakauridze1302@gmail.com",

  author: "Gigi",
} as const;

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD — first published */
  date: string;
  /** ISO date, YYYY-MM-DD — last meaningful content update (defaults to `date`) */
  updated?: string;
  kind: "Comparison" | "Tutorial";
};

// The homepage and sitemap read from this list. Add an entry when you publish
// a new page under app/<slug>/page.tsx.
export const posts: Post[] = [
  {
    slug: "digitalocean-vs-vultr",
    title: "DigitalOcean vs Vultr: a developer's comparison",
    description:
      "Pricing, specs, performance, ease of use and support compared across DigitalOcean and Vultr — plus which one I reach for, and when.",
    date: "2026-08-12",
    updated: "2026-09-04",
    kind: "Comparison",
  },
  {
    slug: "deploy-node-app-hetzner",
    title: "Deploy a Node.js app on a Hetzner VPS with Docker",
    description:
      "A copy-paste tutorial: provision a Hetzner Cloud server, harden it, install Docker, and ship a Node.js app with automatic HTTPS.",
    date: "2026-08-26",
    updated: "2026-09-04",
    kind: "Tutorial",
  },
  {
    slug: "deploy-nextjs-contabo",
    title: "Deploy Next.js on a Contabo VPS with Docker & Nginx",
    description:
      "A copy-paste tutorial: provision a Contabo VPS, containerise a production Next.js build, and serve it over HTTPS with an Nginx reverse proxy and Let's Encrypt.",
    date: "2026-08-28",
    kind: "Tutorial",
  },
  {
    slug: "deploy-fastapi-linode",
    title: "Deploy FastAPI on Linode with Docker & Caddy",
    description:
      "A copy-paste tutorial: provision a Linode instance, containerise a production FastAPI app, and get automatic HTTPS with Caddy — no manual Certbot steps.",
    date: "2026-08-30",
    kind: "Tutorial",
  },
  {
    slug: "best-vps-for-game-servers",
    title: "Best VPS for Game Servers (Minecraft & More) 2026",
    description:
      "DigitalOcean, Vultr, Hetzner, Contabo and Linode compared for self-hosting a Minecraft, Valheim or other game server — RAM per dollar, latency and DDoS protection.",
    date: "2026-09-01",
    kind: "Comparison",
  },
  {
    slug: "hostinger-vps-review",
    title: "Hostinger VPS Review for Developers (2026)",
    description:
      "An honest look at Hostinger's KVM VPS line for developers — specs, hPanel vs cPanel, and where it holds up (or doesn't) against Hetzner or DigitalOcean.",
    date: "2026-09-02",
    kind: "Comparison",
  },
  {
    slug: "best-vps-for-wordpress",
    title: "Best VPS for WordPress in 2026",
    description:
      "Seven VPS and managed-VPS options compared for self-hosting WordPress — performance, caching, one-click installs, and cost versus managed WordPress hosting.",
    date: "2026-09-03",
    kind: "Comparison",
  },
  {
    slug: "github-actions-cicd-vps-deploy",
    title: "GitHub Actions CI/CD: Auto-Deploy Docker to a VPS",
    description:
      "A GitHub Actions pipeline that builds a Docker image and deploys it to any VPS over SSH on every push to main — provider-agnostic, works anywhere.",
    date: "2026-09-04",
    kind: "Tutorial",
  },
  {
    slug: "vps-benchmarks-2026",
    title: "VPS Benchmarks 2026: What the Published Data Shows",
    description:
      "A sourced summary of published DigitalOcean, Vultr, Hetzner and Contabo benchmarks and current list pricing — shown as ranges, not invented precise numbers.",
    date: "2026-09-04",
    kind: "Comparison",
  },
  {
    slug: "cloudways-vs-raw-vps",
    title: "Cloudways vs Raw VPS: Which Should You Pick? (2026)",
    description:
      "Cloudways' managed layer versus running your own raw VPS — pricing, setup time, performance and control, compared honestly so you can pick the right one.",
    date: "2026-09-04",
    kind: "Comparison",
  },
];

export const sortedPosts = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
