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
  /** ISO date, YYYY-MM-DD */
  date: string;
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
    kind: "Comparison",
  },
  {
    slug: "deploy-node-app-hetzner",
    title: "Deploy a Node.js app on a Hetzner VPS with Docker",
    description:
      "A copy-paste tutorial: provision a Hetzner Cloud server, harden it, install Docker, and ship a Node.js app with automatic HTTPS.",
    date: "2026-08-26",
    kind: "Tutorial",
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
