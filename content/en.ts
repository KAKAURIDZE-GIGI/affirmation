import type { Dict } from "./schema";

const EMAIL = "gigikakauridze1302@gmail.com";

export const en: Dict = {
  ui: {
    htmlLang: "en",
    nav: { home: "Home", about: "About", disclosure: "Disclosure" },
    langLabel: "Language",
    skipToContent: "Skip to content",
    backToPosts: "← All posts",
    latest: "Latest",
    footerTagline:
      "Reader-supported — some links are affiliate links.",
    footerAbout: "About",
    footerDisclosure: "Affiliate disclosure",
    footerContact: "Contact",
    affiliateNotice:
      "This article contains affiliate links. If you sign up through one, this site may earn a commission at no extra cost to you. Recommendations are based on hands-on testing, not commission size — see the [full disclosure](~/disclosure/).",
    signup: {
      label: "Get new reviews and benchmarks by email",
      placeholder: "you@example.com",
      button: "Subscribe",
      note: "One email when a new benchmark or review goes live. No spam, no sharing your address. Unsubscribe any time.",
    },
    articleFooter: `Corrections and requests: [${EMAIL}](mailto:${EMAIL}).`,
    postKind: { Comparison: "Comparison", Tutorial: "Tutorial" },
    postTitle: {
      "digitalocean-vs-vultr":
        "DigitalOcean vs Vultr: a developer's comparison",
      "deploy-node-app-hetzner":
        "Deploy a Node.js app on a Hetzner VPS with Docker",
    },
    postBlurb: {
      "digitalocean-vs-vultr":
        "Pricing, specs, performance, ease of use and support compared across DigitalOcean and Vultr — plus which one I reach for, and when.",
      "deploy-node-app-hetzner":
        "A copy-paste tutorial: provision a Hetzner Cloud server, harden it, install Docker, and ship a Node.js app with automatic HTTPS.",
    },
  },

  home: {
    title: "VPS Hosting Reviews for Developers — Host or Die",
    description:
      "Developer-run VPS and cloud hosting reviews: the same deployment and benchmarks on every provider — CPU, disk I/O, network, boot time. No sponsored rankings.",
    eyebrow: "Independent · benchmark-based",
    h1Lead: "VPS & cloud hosting reviews",
    h1Accent: "for developers",
    lead: "I deploy real applications to real servers, run the same battery of benchmarks on each one — CPU, disk I/O, network throughput, boot time — and write up what actually happened.",
    intro:
      "No provider pays for a place on this site and no review is sponsored. Some links are affiliate links, which is how the hosting bill gets paid; that never changes the numbers or the recommendation. Here is how the testing works: [the methodology](~/about/), and here is the [affiliate disclosure](~/disclosure/).",
  },

  about: {
    title: "VPS Benchmark Methodology — Host or Die",
    description:
      "How every VPS here is tested: the exact tools, the metrics (CPU, disk I/O, network, boot time), the test box, and the ground rules that keep rankings honest.",
    h1: "About & methodology",
    metaLine: "By Gigi · backend & infrastructure developer",
    blocks: [
      { k: "h2", t: "Who writes this" },
      {
        k: "p",
        t: 'I\'m Gigi, a backend and infrastructure developer. I\'ve spent the better part of a decade shipping web applications, APIs and background workers onto Linux servers — bare metal, VPS, and the big clouds — and keeping them running. Choosing where to host a project always came down to the same frustrating search: marketing pages full of adjectives, benchmarks that never disclosed their setup, and "top 10" listicles ranked by affiliate payout.',
      },
      {
        k: "p",
        t: "Host or Die is my attempt at the resource I wanted: every provider put through the same deployment and the same measurements, with the method written down so you can reproduce it or poke holes in it. If a number here looks wrong, tell me and I'll re-run it.",
      },
      { k: "h2", t: "How each provider is tested" },
      {
        k: "p",
        t: "Every review starts from a clean account and a fresh server in the provider's default configuration. Unless a review says otherwise, the test box is the cheapest plan with at least 1 vCPU and 1 GB RAM, running <b>Ubuntu 24.04 LTS</b>, in the region geographically closest to me. I provision it twice, on different days, and average the results.",
      },
      { k: "h3", t: "The workload" },
      {
        k: "p",
        t: "A representative deployment goes on first: a Dockerised Node.js API in front of PostgreSQL, plus an Nginx reverse proxy with a Let's Encrypt certificate. This shakes out real-world friction — image pull speed, build time, whether the control panel fights you — before any synthetic numbers are collected. My [step-by-step guide to deploying a Node.js app with Docker on a Hetzner VPS](~/deploy-node-app-hetzner/) walks through the same deployment shape.",
      },
      { k: "h3", t: "The measurements" },
      {
        k: "table",
        head: ["Metric", "Tool", "What it tells you"],
        rows: [
          [
            "CPU, single & multi-core",
            "<c>sysbench cpu</c>, <c>stress-ng</c>, <c>7z b</c>",
            'Sustained compute for build steps, request handling and background jobs; whether a "shared" vCPU throttles under load.',
          ],
          [
            "Disk I/O",
            "<c>fio</c> (4K random read/write, 1M sequential)",
            'Database performance, log-heavy workloads, and how honest the "NVMe" label is.',
          ],
          [
            "Network throughput",
            "<c>iperf3</c> to third-party endpoints, <c>speedtest-cli</c>",
            "Real egress to other regions, not just the provider's own speed-test mirror.",
          ],
          [
            "Boot & provision time",
            "<c>systemd-analyze</c>, API timestamps, wall clock",
            "How fast you can scale out or replace a failed node.",
          ],
          [
            "Latency",
            "<c>ping</c>, <c>mtr</c>, TTFB from three continents",
            "Route quality and peering, not just distance on a map.",
          ],
        ],
      },
      { k: "h3", t: "Also noted, not scored" },
      {
        k: "ul",
        items: [
          "Time from signup to a usable SSH session.",
          "Whether IPv6, private networking, snapshots and firewalls are included or billed as extras.",
          "Egress/bandwidth allowance and the overage price per GB.",
          "Support: a real ticket is opened during each review and the response time and usefulness recorded.",
          "Billing behaviour — hourly caps, minimums, and how hard it is to fully destroy a resource so it stops charging.",
        ],
      },
      { k: "h2", t: "Ground rules" },
      {
        k: "ul",
        items: [
          "<b>No sponsored reviews.</b> No provider is given copy approval, an embargo, or advance sight of a score.",
          "<b>Affiliate links never move the ranking.</b> Where a referral link exists it's used; where one doesn't, the provider is still covered. See the [disclosure page](~/disclosure/).",
          "<b>Numbers include their setup.</b> Plan, region, date, kernel and tool versions are published with every result so you can re-run them.",
          "<b>Reviews get revisited.</b> Providers change hardware and pricing; dated updates are appended rather than quietly edited.",
        ],
      },
      {
        k: "p",
        t: "You can see the method applied end to end in the [DigitalOcean vs Vultr comparison](~/digitalocean-vs-vultr/). Spotted a mistake or want a provider tested? Mail [" +
          EMAIL +
          "](mailto:" +
          EMAIL +
          ").",
      },
    ],
  },

  disclosure: {
    title: "Affiliate Disclosure — Host or Die",
    description:
      "How Host or Die makes money: some outbound links are affiliate links that pay a commission at no extra cost to you. Rankings are based on testing, not payouts.",
    h1: "Affiliate disclosure",
    blocks: [
      {
        k: "p",
        t: "<b>This site earns commissions from some of the links on it, at no extra cost to you.</b> If you click certain links to a hosting provider and then sign up or buy a plan, Host or Die may receive a referral fee. You pay the same price you would by going to the provider directly — in some cases less, when a referral link carries a sign-up credit.",
      },
      { k: "h2", t: "What this changes about the content — nothing" },
      {
        k: "p",
        t: "Recommendations on this site are based on hands-on testing and the benchmark results described in the [methodology](~/about/). They are not based on which company pays the most, or pays at all. Specifically:",
      },
      {
        k: "ul",
        items: [
          "Providers that run no affiliate programme are reviewed and recommended on exactly the same terms as those that do.",
          "Commission rates are never a factor in a verdict, a score, or the order providers appear in.",
          "No provider is given payment, free hosting, copy approval, or advance sight of a review in exchange for coverage.",
          "When a recommendation changes because the testing changed, the old verdict stays visible with a dated update.",
        ],
      },
      { k: "h2", t: "Where affiliate links appear" },
      {
        k: "p",
        t: 'Affiliate links may appear inside comparison posts and tutorials, in clearly labelled "where to sign up" sections, and in the site footer. Every page that contains them carries a disclosure notice at the top, not just this page. Plain informational links — documentation, status pages, source code, pricing pages cited for reference — are not affiliate links.',
      },
      { k: "h2", t: "Programmes this site participates in" },
      {
        k: "p",
        t: "Host or Die earns referral commission through affiliate programmes run directly by hosting providers and through the [Awin](https://www.awin.com/) affiliate network. Where a recommendation carries an affiliate link, the provider it points to is named in the disclosure notice at the top of that page.",
      },
      {
        k: "p",
        t: "As of September 2026, this site has an active affiliate relationship with <b>DigitalOcean</b> (via Awin) and a referral relationship with <b>Vultr</b>. Links to Hetzner and any other providers mentioned are not affiliate links: Hetzner discontinued its referral programme in 2026, and no arrangement is in place with the others. This section is updated as that changes.",
      },
      { k: "h2", t: "FTC & advertising standards" },
      {
        k: "p",
        t: "This disclosure is provided to comply with the U.S. Federal Trade Commission's <i>Guides Concerning the Use of Endorsements and Testimonials in Advertising</i> (16 CFR Part 255) and equivalent guidance elsewhere, including the UK CAP Code. The intent is simple: you should always know when a link can earn this site money.",
      },
      { k: "h2", t: "Questions" },
      {
        k: "p",
        t: "Email [" + EMAIL + "](mailto:" + EMAIL + ") and I'll answer.",
      },
      { k: "p", t: "<i>Last updated: 4 September 2026.</i>" },
    ],
  },

  dovv: {
    title: "DigitalOcean vs Vultr: Developer Comparison (2026)",
    description:
      "DigitalOcean or Vultr? A hands-on comparison of pricing, specs, real-world performance, support and ease of use — plus which one to pick, and when.",
    h1: "DigitalOcean vs Vultr: a developer's comparison",
    metaLine:
      "Comparison · published 12 August 2026 · updated 4 September 2026 · pricing checked August 2026",
    blocks: [
      { k: "affiliateNotice" },
      {
        k: "p",
        t: "DigitalOcean and Vultr sit in the same part of the market: unmanaged Linux VPS instances, billed by the hour with a monthly cap, aimed at developers who are comfortable with a terminal. They are close enough that the decision usually comes down to three things — how wide a geographic footprint you need, whether you want first-party managed add-ons, and how much you care about squeezing the most compute out of each dollar.",
      },
      {
        k: "p",
        t: "I run both accounts continuously and deploy the same reference stack (a Dockerised Node.js API in front of PostgreSQL, behind Nginx with a Let's Encrypt certificate) to each — the same build covered in my [Node.js on Hetzner with Docker walkthrough](~/deploy-node-app-hetzner/). This post is the qualitative side — pricing, features, workflow, support. The synthetic benchmark numbers get their own section below; see the [methodology](~/about/) for how those are collected.",
      },
      {
        k: "verdict",
        heading: "Quick verdict",
        head: ["If you want…", "Pick", "Because"],
        rows: [
          [
            "Best docs, polished UI, first-party managed services",
            "DigitalOcean",
            "App Platform, managed databases, and a tutorial library that covers almost anything you'll hit.",
          ],
          [
            "Most compute and NVMe per dollar",
            "Vultr",
            "High Frequency / High Performance plans start with NVMe at a lower entry price than DigitalOcean's SSD Droplets.",
          ],
          [
            "Unusual regions (South America, Africa, more of Asia)",
            "Vultr",
            "~32 locations vs DigitalOcean's ~15, including Johannesburg, São Paulo, and several extra Asian cities.",
          ],
          [
            "Custom OS via ISO upload, bare metal, or fractional GPUs",
            "Vultr",
            "DigitalOcean has no ISO upload; its bare-metal and GPU story is narrower.",
          ],
          [
            "A team account with roles, and predictable billing",
            "DigitalOcean",
            "More mature team/RBAC features and pooled bandwidth across Droplets.",
          ],
        ],
        note: "<b>Short version:</b> if you're shipping a typical web app and value documentation and managed add-ons, DigitalOcean is the smoother ride. If you want raw performance per dollar, an odd region, or hardware DigitalOcean doesn't sell, Vultr wins. Neither is a bad choice.",
      },
      { k: "h2", t: "Pricing & specs" },
      {
        k: "p",
        t: "Both providers bill hourly and cap at the monthly rate, meter outbound bandwidth with a per-plan allowance and roughly $0.01/GB overage, and charge separately for block storage and snapshots. The entry plans line up like this:",
      },
      {
        k: "table",
        head: ["Plan", "vCPU / RAM", "Disk", "Transfer", "Price/mo"],
        rows: [
          ["DigitalOcean Basic Droplet", "1 / 512 MB", "10 GB SSD", "0.5 TB", "~$4"],
          ["DigitalOcean Basic Droplet", "1 / 1 GB", "25 GB SSD", "1 TB", "~$6"],
          ["DigitalOcean Basic Droplet", "2 / 4 GB", "80 GB SSD", "4 TB", "~$24"],
          ["Vultr Cloud Compute (Regular)", "1 / 1 GB", "25 GB SSD", "1 TB", "~$5"],
          ["Vultr High Frequency", "1 / 1 GB", "32 GB NVMe", "1 TB", "~$6"],
          ["Vultr High Performance", "2 / 4 GB", "128 GB NVMe", "3 TB", "~$24"],
        ],
      },
      {
        k: "p",
        t: "The pattern: DigitalOcean's base Droplets are SSD, not NVMe, and you can't buy an NVMe box at the bottom of the range. Vultr's High Frequency and High Performance lines put NVMe and higher-clocked cores within a dollar of the regular plans, which is why Vultr tends to look better on price-per-performance. DigitalOcean counters with bandwidth that's <i>pooled</i> across every Droplet on the account, so a fleet with uneven traffic wastes less allowance.",
      },
      { k: "p", t: "A few line items that catch people out:" },
      {
        k: "ul",
        items: [
          "<b>Snapshots are not free on either.</b> Both bill roughly $0.05–$0.06 per GB-month; automated backups add ~20% to the instance price.",
          "<b>Vultr's cheapest plans are sometimes IPv6-only</b> or have limited regional stock. A dedicated IPv4 address is an add-on on the very bottom tier.",
          "<b>DDoS protection</b> is bundled on DigitalOcean Load Balancers; on Vultr it's a ~$10/mo per-instance add-on.",
          'Hosting prices move. Treat the table above as "checked August 2026" and confirm on each provider\'s pricing page before you commit.',
        ],
      },
      { k: "h2", t: "Performance" },
      {
        k: "p",
        t: "Both providers run current-generation hardware in their main regions, and for an ordinary web workload on the entry plans you won't feel a difference in a blind test. They separate under sustained load and on disk-bound work. Here is where each one lands, from running the [standard test workload](~/about/) plus production traffic on both over an extended period.",
      },
      {
        k: "p",
        t: "<b>CPU.</b> Vultr's High Frequency and High Performance lines use higher-clocked cores than a base DigitalOcean Droplet, so single-threaded work — template rendering, JSON serialisation, most request handling — finishes faster per dollar on those tiers. On the regular shared plans the two are close, and both will throttle a noisy vCPU under a long pin at 100%, which is expected at this price.",
      },
      {
        k: "p",
        t: "<b>Disk.</b> This is the clearest gap. DigitalOcean's Basic Droplets are SSD; Vultr's High Frequency and High Performance plans are NVMe, and it shows in 4K random I/O — the access pattern a relational database actually generates. For a Postgres or MySQL box on a budget, the Vultr NVMe tiers are the better hardware.",
      },
      {
        k: "p",
        t: "<b>Network.</b> Roughly a wash. Both peer well from their primary regions, hold close to line rate on cross-continent transfers, and showed comparable route stability over a week of monitoring.",
      },
      {
        k: "p",
        t: "<b>Provisioning.</b> Both create a usable instance in well under a minute through the API. Vultr is typically a few seconds quicker to an SSH-ready box; neither is slow enough to matter unless you're autoscaling aggressively.",
      },
      {
        k: "p",
        t: "Full benchmark tables — exact plan, region, kernel, tool versions and raw command output — are published on each provider's individual review as that round is completed. The [methodology](~/about/) lists every command used.",
      },
      { k: "h2", t: "Ease of use & developer workflow" },
      {
        k: "p",
        t: 'This is DigitalOcean\'s strongest area. The control panel is clean and fast, the <c>doctl</c> CLI and the API are well documented, the Terraform provider is first-party and current, and the tutorial library is genuinely the best in the industry — for a huge range of "how do I set up X on Ubuntu" problems, the top search result is a DigitalOcean article that actually works. If you\'d rather not manage a database or a deploy pipeline at all, <b>App Platform</b> (their PaaS) and managed PostgreSQL / MySQL / Redis / Kafka are a click away and integrate with the rest of the account.',
      },
      {
        k: "p",
        t: 'Vultr\'s panel is functional and has caught up a lot. It does things DigitalOcean won\'t: <b>upload a custom ISO</b> and install any OS you like, provision <b>bare metal</b> from the same dashboard, and spin up <b>fractional GPU</b> instances. Its API and Terraform provider are solid. What\'s thinner is the surrounding ecosystem — fewer one-click marketplace apps, a smaller documentation set, and managed add-ons that feel a step behind DigitalOcean\'s in polish. For pure "give me a fast Linux box in region X", that gap doesn\'t matter; for "give me a managed Postgres and a PaaS and a load balancer that all know about each other", it does.',
      },
      { k: "h2", t: "Support" },
      {
        k: "p",
        t: "Both offer 24/7 ticket support on every plan with no paid tier required to open a ticket. In my experience the first-response times are similar — usually well under an hour for anything that looks urgent. Vultr includes ticket support on all plans by default; DigitalOcean sells Standard and Premium support plans (priced as a percentage of monthly spend) that add faster SLAs and, at Premium, Slack access and an architecture review. For most solo developers and small teams the free support on either is adequate, and DigitalOcean's documentation offsets a lot of tickets you'd otherwise file.",
      },
      { k: "h2", t: "Pros & cons" },
      {
        k: "pros",
        groups: [
          {
            title: "DigitalOcean — good",
            items: [
              "Best-in-class documentation and tutorials",
              "Polished UI, mature CLI/API/Terraform",
              "First-party App Platform + managed databases",
              "Bandwidth pooled across the account",
              "Stronger team / role-based access features",
            ],
          },
          {
            title: "DigitalOcean — less good",
            items: [
              "Base Droplets are SSD, not NVMe",
              "No NVMe option at the low end",
              "~15 regions — no South America or Africa",
              "No custom ISO upload",
              "Narrow bare-metal / GPU range",
            ],
          },
          {
            title: "Vultr — good",
            items: [
              "NVMe + high-clock cores near the entry price",
              "~32 locations, including rare regions",
              "Custom ISO upload; install any OS",
              "Bare metal and fractional GPUs in the same panel",
              "Ticket support on every plan",
            ],
          },
          {
            title: "Vultr — less good",
            items: [
              "Smaller docs / community library",
              "Managed add-ons less polished than DigitalOcean's",
              "Cheapest tier can be IPv6-only / stock-limited",
              "DDoS protection is a paid add-on",
              "Fewer one-click marketplace apps",
            ],
          },
        ],
      },
      { k: "h2", t: "Recommendation" },
      {
        k: "p",
        t: "<b>Pick DigitalOcean if</b> you're deploying a typical web app or API and you value the documentation, the polished console, and having managed Postgres, a load balancer or the App Platform PaaS one click away. The workflow is smoother end to end, and for most teams that saved time is worth more than the few dollars a month Vultr shaves off the bill.",
      },
      {
        k: "p",
        t: "<b>Pick Vultr if</b> the specifics pull you there: you want the most CPU and NVMe per dollar, you need a region DigitalOcean doesn't operate in, you need to boot a custom ISO, or you want bare metal or a fractional GPU without leaving the panel. The High Frequency and High Performance instances are genuinely faster hardware than a base Droplet, not just a cheaper label.",
      },
      {
        k: "p",
        t: "Still on the fence? Both bill hourly with no minimum, so the honest answer is to run your own workload on each for a few days and keep the one that felt better. Nothing here is a decision you can't reverse in an afternoon.",
      },
      {
        k: "p",
        t: "One note on the disclosure side: DigitalOcean's affiliate programme pays out over a customer's first year, which matches how these accounts actually get used — you spin something up and keep it running. If you're leaning DigitalOcean after reading this, [start here](aff:do).",
      },
      {
        k: "callout",
        label: "Vultr credit",
        body: "Vultr is currently running a promo: sign up [through this link](aff:vultr) and you get $300 in credit to try the platform yourself — no strings beyond linking a payment method. It's a limited-time offer and may not always be active; if the amount shown when you click through is different, that's why.",
      },
      { k: "h2", t: "Where to sign up" },
      {
        k: "p",
        t: "The two links below are tracked: DigitalOcean is an affiliate link (via Awin), Vultr is a referral link. If you create an account through one, this site may earn a commission at no cost to you. See the [disclosure](~/disclosure/).",
      },
      {
        k: "ul",
        items: [
          "[Create a DigitalOcean account](aff:do) — new accounts often start with free credit.",
          "[Create a Vultr account](aff:vultr) — currently $300 in trial credit (see the note above).",
        ],
      },
      {
        k: "p",
        t: "Prefer not to use a tracked link? Going directly to <c>digitalocean.com</c> or <c>vultr.com</c> costs you the same and the review stands either way.",
      },
    ],
  },

  hetzner: {
    title: "Deploy a Node.js App on a Hetzner VPS with Docker",
    description:
      "Copy-paste tutorial: provision a Hetzner VPS, harden it, install Docker, and deploy a Node.js app with automatic HTTPS via Caddy. Tested on Ubuntu 24.04.",
    h1: "Deploy a Node.js app on a Hetzner VPS with Docker",
    metaLine:
      "Tutorial · published 26 August 2026 · updated 4 September 2026 · tested on Ubuntu 24.04 LTS",
    blocks: [
      {
        k: "p",
        t: "Hetzner Cloud is my default for small-to-medium production boxes: an Arm <c>CAX11</c> (2 vCPU, 4 GB RAM, 40 GB NVMe) is about €3.29/month and an x86 <c>CX22</c> with the same specs is about €3.79/month, both on fast NVMe. This walkthrough takes a fresh server to a running, HTTPS-served Node.js app. Every command here was run on a clean Ubuntu 24.04 <c>CX22</c>. If you're still choosing a provider, my [DigitalOcean vs Vultr comparison](~/digitalocean-vs-vultr/) covers how the mainstream options stack up.",
      },
      { k: "h2", t: "What you'll end up with" },
      {
        k: "ul",
        items: [
          "A hardened Ubuntu 24.04 server (non-root sudo user, key-only SSH, firewall).",
          "Docker Engine + Compose plugin from Docker's official repo.",
          "A containerised Express app that restarts on reboot.",
          "Caddy in front of it, terminating TLS with an auto-renewing Let's Encrypt certificate.",
        ],
      },
      { k: "h2", t: "Prerequisites" },
      {
        k: "ul",
        items: [
          "An SSH key pair on your machine (<c>ssh-keygen -t ed25519</c> if you don't have one).",
          "A domain name you can add a DNS record to (needed for HTTPS in step 9).",
          "Basic terminal familiarity. No prior Docker knowledge required.",
        ],
      },
      { k: "h2", t: "1. Create the server" },
      {
        k: "p",
        t: "[Sign up for Hetzner Cloud](aff:hetzner) and create a new <b>Project</b>. In the project:",
      },
      {
        k: "ol",
        items: [
          "<b>Security → SSH keys → Add SSH key</b>. Paste the contents of your <c>~/.ssh/id_ed25519.pub</c>.",
          "<b>Servers → Add Server</b>. Choose: the location closest to your users (Nuremberg, Falkenstein, Helsinki, Ashburn, Hillsboro, Singapore); image <b>Ubuntu 24.04</b>; type <c>CX22</c> (x86) or <c>CAX11</c> (Arm) — this tutorial builds the image on the server, so either works; the SSH key you just added; name <c>app-01</c>.",
          "Create it, then copy the server's public IPv4 address.",
        ],
      },
      {
        k: "p",
        t: "Optional but recommended: under <b>Firewalls</b>, create a Hetzner Cloud firewall allowing inbound TCP <c>22</c>, <c>80</c> and <c>443</c> only, and attach it to the server. That's a second layer in front of the host firewall we set up in step 5.",
      },
      { k: "h2", t: "2. First login and system update" },
      { k: "p", t: "Connect as <c>root</c> using the key Hetzner installed:" },
      { k: "code", ref: "firstLogin" },
      {
        k: "p",
        t: "The <c>reboot</c> picks up any new kernel. Wait ~20 seconds and SSH back in.",
      },
      { k: "h2", t: "3. Create a non-root user" },
      {
        k: "p",
        t: "Running containers and everyday work as root is unnecessary risk. Create a user with sudo:",
      },
      { k: "code", ref: "createUser" },
      {
        k: "p",
        t: "Open a <i>new</i> terminal (keep the root session open as a safety net) and confirm the new user works:",
      },
      { k: "code", ref: "verifyUser" },
      { k: "h2", t: "4. Harden SSH" },
      {
        k: "p",
        t: "Disable root login and password authentication. Put the overrides in a drop-in file so a future <c>openssh-server</c> upgrade doesn't clobber them:",
      },
      { k: "code", ref: "hardenSsh" },
      {
        k: "p",
        t: "On Ubuntu 24.04 SSH is socket-activated; if the restart above has no effect, run <c>sudo systemctl restart ssh.socket</c>. Test in a new terminal <b>before</b> closing your working session: <c>ssh deploy@YOUR_SERVER_IP</c> should still work, and <c>ssh root@YOUR_SERVER_IP</c> should now be refused.",
      },
      { k: "h2", t: "5. Host firewall" },
      { k: "p", t: "Allow SSH, HTTP and HTTPS; deny everything else inbound:" },
      { k: "code", ref: "firewall" },
      { k: "h2", t: "6. Install Docker" },
      {
        k: "p",
        t: "Use Docker's official APT repository, not the older distro package:",
      },
      { k: "code", ref: "installDocker" },
      {
        k: "p",
        t: "The <c>hello-world</c> container printing a success message means the engine is up.",
      },
      { k: "h2", t: "7. The application" },
      {
        k: "p",
        t: "Create the project on the server (or build it locally and <c>git clone</c> / <c>scp</c> it up). It's a minimal Express API with a health check.",
      },
      { k: "code", ref: "mkProject" },
      { k: "file", name: "package.json" },
      { k: "code", ref: "packageJson" },
      { k: "file", name: "app.js" },
      { k: "code", ref: "appJs" },
      {
        k: "p",
        t: "<c>Dockerfile</c> — multi-stage so the final image carries only production dependencies, and it runs as the built-in non-root <c>node</c> user.",
      },
      { k: "code", ref: "dockerfile" },
      {
        k: "p",
        t: "<c>npm ci</c> needs a lockfile. Generate one once (locally or on the server) with <c>npm install</c>, which creates <c>package-lock.json</c>. Then add <c>.dockerignore</c>:",
      },
      { k: "code", ref: "dockerignore" },
      { k: "h2", t: "8. Build and run (HTTP)" },
      { k: "p", t: "Quick check that the container works before adding TLS:" },
      { k: "code", ref: "buildRun" },
      {
        k: "p",
        t: "Visit <c>http://YOUR_SERVER_IP</c> in a browser — you should get the JSON payload. Then stop it, because step 9 needs port 80:",
      },
      { k: "code", ref: "rmContainer" },
      { k: "h2", t: "9. HTTPS with Caddy" },
      {
        k: "p",
        t: "Point DNS at the server first: create an <b>A record</b> for your domain (say <c>app.example.com</c>) to <c>YOUR_SERVER_IP</c> and wait for it to resolve (<c>dig +short app.example.com</c>). Caddy needs this to pass the Let's Encrypt challenge.",
      },
      { k: "file", name: "compose.yaml" },
      { k: "code", ref: "composeYaml" },
      { k: "p", t: "<c>Caddyfile</c> — replace the domain and the email:" },
      { k: "code", ref: "caddyfile" },
      { k: "p", t: "Bring it all up:" },
      { k: "code", ref: "composeUp" },
      {
        k: "p",
        t: "Within a few seconds Caddy fetches and installs the certificate. Load <c>https://app.example.com</c> — valid padlock, JSON response, and plain <c>http://</c> now redirects to <c>https://</c>. Renewal is automatic.",
      },
      { k: "h2", t: "10. Deploying updates" },
      { k: "p", t: "Change your code, then rebuild and roll the containers:" },
      { k: "code", ref: "deployUpdate" },
      { k: "p", t: "Useful day-to-day commands:" },
      { k: "code", ref: "dayToDay" },
      { k: "h2", t: "Where to go next" },
      {
        k: "ul",
        items: [
          "Add a <c>deploy</c> step to CI that SSHes in and runs the step 10 commands, or switch to <c>docker context</c> and build locally.",
          "Put a real database in its own service with a named volume, and take <c>hetzner</c> volume snapshots on a schedule.",
          "Set unattended-upgrades (<c>sudo dpkg-reconfigure -plow unattended-upgrades</c>) so security patches land automatically.",
        ],
      },
      {
        k: "callout",
        label: "Note",
        body: "I use Hetzner for my own servers and recommend it here because the price-to-NVMe-performance ratio is the best I've measured. Hetzner discontinued its referral programme in 2026, so the link above is a plain, untracked link and nothing on this page earns a commission. See the [disclosure](~/disclosure/) for the full picture.",
      },
    ],
  },
};
