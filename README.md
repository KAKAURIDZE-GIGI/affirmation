# Host or Die

A minimal, fast, SEO-friendly affiliate content site for a VPS / cloud hosting
review niche (production domain: `hostordie.com`). Built with **Next.js (App
Router) + TypeScript**, statically generated, static-exported to a plain `./out`
folder. No client-side JavaScript ships except what Next needs for routing —
every page is a React Server Component.

## Stack

| Concern        | Choice                                                        |
| -------------- | ----------------------------------------------------------- |
| Framework      | Next.js 15, App Router, TypeScript                           |
| Rendering      | 100% static generation (`output: "export"`)                  |
| Styling        | Plain CSS (`app/globals.css`) — no framework, dark-first + light-mode override |
| SEO            | Metadata API on every page, `app/sitemap.ts`, `app/robots.ts` |
| Images         | None shipped; `next/image` left enabled with `unoptimized: true` for later |
| Dependencies   | `next`, `react`, `react-dom` only (plus type packages)       |

## Pages

| Route                       | File                                    | Purpose                                  |
| --------------------------- | --------------------------------------- | ---------------------------------------- |
| `/`                         | `app/page.tsx`                          | Homepage — pitch, latest posts, email signup |
| `/about/`                   | `app/about/page.tsx`                    | Author bio + full testing methodology    |
| `/disclosure/`              | `app/disclosure/page.tsx`              | FTC-compliant affiliate disclosure       |
| `/digitalocean-vs-vultr/`   | `app/digitalocean-vs-vultr/page.tsx`   | Comparison post                          |
| `/deploy-node-app-hetzner/` | `app/deploy-node-app-hetzner/page.tsx` | Docker-on-Hetzner tutorial               |
| `/sitemap.xml`              | `app/sitemap.ts`                        | Generated at build                       |
| `/robots.txt`               | `app/robots.ts`                         | Generated at build                       |

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build / preview the static export

```bash
npm run build          # outputs ./out
npx serve out          # or: python3 -m http.server -d out 8000
```

`npm run build` performs the static export automatically (because
`output: "export"` is set in `next.config.mjs`). The entire site is in `./out`.

## Deploy to Vercel

Next.js is Vercel's own framework, so this is close to zero-config.

**Option A — Git integration (recommended):**

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. On <https://vercel.com/new>, import the repo.
3. Framework preset auto-detects as **Next.js**. Leave build/output settings at
   their defaults — Vercel handles `output: "export"` correctly.
4. Optional: set **`NEXT_PUBLIC_SITE_URL`** for preview deploys (used for
   canonical URLs, Open Graph tags, sitemap, robots). Production already
   defaults to `https://hostordie.com` in `lib/site.ts`.
5. Deploy. Then **Project → Settings → Domains** to attach `hostordie.com`.

**Option B — CLI:**

```bash
npm i -g vercel
vercel            # first run links/creates the project
vercel --prod     # production deploy
```

> Any static host also works: upload `./out` to Cloudflare Pages, Netlify,
> GitHub Pages, S3 + CloudFront, etc.

## Configured values

These are already filled in — listed here so you know where they live if you
want to change them. `grep -rn TODO .` returns nothing; there are no visible
placeholder holes left in the pages.

| Value | Where | Current |
| ----- | ----- | ------- |
| Site name | `lib/site.ts` `name` | `Host or Die` |
| Domain | `lib/site.ts` `url` (or `NEXT_PUBLIC_SITE_URL`) | `https://hostordie.com` |
| Contact email | `lib/site.ts` `contactEmail` — used by footer, signup form, every "corrections" line | `gigikakauridze1302@gmail.com` |
| Byline | `lib/site.ts` `author` — shown on `/about/` and in page metadata | `Gigi` |
| Post list | `lib/site.ts` `posts[]` — drives the homepage list and the sitemap | 2 posts |

Still worth doing before or soon after launch:

- **`app/about/page.tsx`** — add a photo and a GitHub / personal-site link under
  the byline. A face and a code trail make reviewers trust the methodology.
- **Email signup** (`app/page.tsx`) — the `<form>` uses `mailto:` (opens the
  reader's mail client, no JS, no third party). For a managed list, point its
  `action` at a Formspree / Buttondown / ConvertKit endpoint; nothing else
  changes.
- **`app/disclosure/page.tsx`** — as you join or leave programmes, keep the
  "Programmes this site participates in" paragraph and the last-updated date
  current.

## Dropping in real affiliate links once approved

The placeholder link spots are marked with an uppercase comment right above the
`<a href="#" rel="sponsored nofollow noopener">` tag. Find them with:

```bash
grep -rn "AFFILIATE LINK" app/
```

Current placeholders:

| File                                    | Marker                          | Replace `href="#"` with |
| --------------------------------------- | ------------------------------- | ----------------------- |
| `app/digitalocean-vs-vultr/page.tsx`    | `AFFILIATE LINK: DigitalOcean`  | your DigitalOcean / AWIN tracking URL |
| `app/digitalocean-vs-vultr/page.tsx`    | `AFFILIATE LINK: Vultr`         | your Vultr / AWIN tracking URL |
| `app/deploy-node-app-hetzner/page.tsx`  | `AFFILIATE LINK: Hetzner`       | your Hetzner / AWIN tracking URL |

Keep `rel="sponsored nofollow noopener"` on affiliate links — it's the correct
signal to search engines and keeps you compliant. Leave plain reference links
(docs, pricing pages) as normal links.

The disclosure notice at the **top** of each content page
(`components/AffiliateNotice.tsx`) must stay above the article body — that
placement is what FTC guidance expects.

## Benchmark numbers

Nothing on the site states a measurement that hasn't been taken. The
DigitalOcean vs Vultr post covers performance qualitatively — CPU, disk,
network, provisioning — and tells readers the full numeric tables live on each
provider's individual review. Run the methodology in `app/about/page.tsx`, then
publish those tables (plan, region, kernel, tool versions, raw output, dated)
on the per-provider reviews as you add them.

## Going live checklist

- [ ] `npm run build` passes
- [ ] Review every page at `npx serve out`
- [ ] Add a photo + GitHub link to `/about/`
- [ ] Deploy to Vercel, attach `hostordie.com`
- [ ] Submit the live URL to the AWIN application
- [ ] On approval: `grep -rn "AFFILIATE LINK" app/` and drop in the real tracking links (keep `rel="sponsored nofollow noopener"`)
