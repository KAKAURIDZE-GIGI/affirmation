import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { siteConfig, posts } from "@/lib/site";
import { pageMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";

const post = posts.find((p) => p.slug === "deploy-nextjs-contabo")!;

export const metadata = pageMeta({
  title: "Deploy Next.js on a Contabo VPS with Docker & Nginx",
  description:
    "Copy-paste tutorial: containerise a Next.js production build, run it on a budget Contabo VPS, and serve it over HTTPS with an Nginx reverse proxy and Let's Encrypt. Tested on Ubuntu 24.04.",
  path: "/deploy-nextjs-contabo/",
  type: "article",
  published: post.date,
  modified: post.updated,
});

const schema = [
  articleSchema({
    headline: "Deploy Next.js on a Contabo VPS with Docker and Nginx",
    description: post.description,
    path: "/deploy-nextjs-contabo/",
    published: post.date,
    modified: post.updated,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    {
      name: "Deploy Next.js on Contabo with Docker",
      path: "/deploy-nextjs-contabo/",
    },
  ]),
];

export default function Page() {
  return (
    <article className="prose">
      <JsonLd data={schema} />

      <Link href="/" className="back-link">
        ← All posts
      </Link>

      <h1>Deploy Next.js on a Contabo VPS with Docker and Nginx</h1>
      <p className="article-meta">
        Tutorial · published 28 August 2026 · tested on Ubuntu 24.04 LTS
      </p>

      <p>
        This walkthrough takes a fresh Contabo VPS to a running,
        HTTPS-served <strong>Next.js</strong> app: the app runs as a Docker
        container built from a production <code>next build</code>, and Nginx on
        the host terminates TLS and reverse-proxies to it. It&apos;s aimed at
        Next.js specifically — the standalone output mode, the{" "}
        <code>NEXT_PUBLIC_</code> build-time/runtime split, and the memory
        behaviour of <code>next build</code> all get their own treatment below —
        rather than the generic Node.js case.
      </p>
      <p>
        Contabo is worth a look here for two reasons: it has European datacentre
        locations (its home region is Germany, alongside US, UK, Singapore,
        Australia, Japan and India sites), and its price-per-resource is
        typically lower than DigitalOcean or Vultr at a comparable vCPU/RAM
        tier — you get more cores and RAM per euro, with the trade-off usually
        being raw single-core speed and provisioning time. If you&apos;re still
        weighing the mainstream options, my{" "}
        <Link href="/digitalocean-vs-vultr/">
          DigitalOcean vs Vultr comparison
        </Link>{" "}
        covers how those two stack up, and the{" "}
        <Link href="/deploy-node-app-hetzner/">
          Node.js on Hetzner with Docker walkthrough
        </Link>{" "}
        is the same deployment shape on a different provider if you want to
        compare VPS hosts for this kind of work.
      </p>

      <h2>What you&apos;ll end up with</h2>
      <ul>
        <li>A hardened Ubuntu 24.04 server (non-root sudo user, key-only SSH, firewall).</li>
        <li>Docker Engine + Compose plugin from Docker&apos;s official repo.</li>
        <li>
          A containerised Next.js app built with <code>output: &quot;standalone&quot;</code>{" "}
          — a ~150&nbsp;MB image, not a 1&nbsp;GB one — that restarts on reboot.
        </li>
        <li>
          Nginx on the host in front of it, terminating TLS with an
          auto-renewing Let&apos;s Encrypt certificate from Certbot.
        </li>
      </ul>

      <h2>Prerequisites</h2>
      <ul>
        <li>
          A Next.js app that builds locally with <code>next build</code> (App or
          Pages router, any version from 13 on).
        </li>
        <li>
          A Contabo VPS instance —{" "}
          {/* Plain link — Contabo has no affiliate programme; not tracked */}
          <a href="https://contabo.com/en/vps/" rel="noopener" target="_blank">
            Contabo VPS
          </a>
          . The smallest &quot;Cloud VPS&quot; tier is plenty for a single
          Next.js app; pick an Ubuntu 24.04 image at checkout.
        </li>
        <li>An SSH key pair (<code>ssh-keygen -t ed25519</code> if you don&apos;t have one) and basic terminal familiarity.</li>
        <li>
          Optional but recommended: a domain name with an <strong>A record</strong>{" "}
          pointing at the server&apos;s IPv4 address. You can manage DNS at your
          registrar or move the domain to Cloudflare — either works; Certbot in
          step&nbsp;4 needs the record to resolve before it can issue a
          certificate.
        </li>
      </ul>

      <h2>1. Initial server setup</h2>
      <p>
        Contabo emails you the IP and a root password (add an SSH key in the
        control panel first if you can). Log in and bring the system up to date:
      </p>
      <pre>
        <code>{`ssh root@YOUR_SERVER_IP

apt update && apt upgrade -y
apt install -y ca-certificates curl ufw rsync
reboot`}</code>
      </pre>
      <p>Wait ~20 seconds, SSH back in, and create a non-root user with sudo:</p>
      <pre>
        <code>{`adduser deploy            # set a password, accept the defaults
usermod -aG sudo deploy

# copy your authorised key so you can SSH in directly as 'deploy'
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy`}</code>
      </pre>
      <p>
        In a <em>new</em> terminal (keep the root session open as a safety net),
        confirm <code>ssh deploy@YOUR_SERVER_IP</code> works and{" "}
        <code>sudo whoami</code> prints <code>root</code>. Then disable root
        login and password auth with a drop-in so a future{" "}
        <code>openssh-server</code> upgrade doesn&apos;t clobber it:
      </p>
      <pre>
        <code>{`sudo tee /etc/ssh/sshd_config.d/99-hardening.conf >/dev/null <<'EOF'
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
EOF

sudo systemctl restart ssh`}</code>
      </pre>
      <p>
        On Ubuntu 24.04 SSH is socket-activated; if that restart has no effect,
        run <code>sudo systemctl restart ssh.socket</code>. Test a fresh{" "}
        <code>ssh deploy@…</code> session <strong>before</strong> closing this
        one.
      </p>
      <p>Host firewall — allow SSH, HTTP and HTTPS, deny the rest inbound:</p>
      <pre>
        <code>{`sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable`}</code>
      </pre>
      <p>Install Docker from its official APT repository, not the distro package:</p>
      <pre>
        <code>{`sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \\
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \\
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \\
  | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io \\
  docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker $USER
newgrp docker      # or log out and back in

docker run --rm hello-world`}</code>
      </pre>

      <h2>2. Containerise the Next.js app</h2>
      <p>
        First switch the build to <strong>standalone output</strong>. This makes{" "}
        <code>next build</code> emit a self-contained{" "}
        <code>.next/standalone</code> folder with only the files and
        node_modules the server actually needs — the runtime image drops from
        ~1&nbsp;GB to ~150&nbsp;MB. In <code>next.config.mjs</code>:
      </p>
      <pre>
        <code>{`/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

export default nextConfig;`}</code>
      </pre>
      <p>
        <code>Dockerfile</code> — three stages: install deps, build, then a
        minimal runner that copies only the standalone bundle and runs as a
        non-root user.
      </p>
      <pre>
        <code>{`# syntax=docker/dockerfile:1

# 1. Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* must be present HERE to be inlined into the client bundle.
# ARG values are visible to the RUN below as env vars — Next picks them up.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 3. Runtime image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs \\
  && adduser --system --uid 1001 nextjs

# standalone does NOT include public/ or .next/static — copy them explicitly
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]`}</code>
      </pre>
      <p>
        <code>HOSTNAME=0.0.0.0</code> matters: the standalone server binds to
        localhost by default, which is unreachable from outside the container.
      </p>
      <p>
        <code>.dockerignore</code> — keeps the build context small and stops a
        local <code>.next</code> or <code>.env</code> leaking into the image:
      </p>
      <pre>
        <code>{`node_modules
.next
.git
.gitignore
Dockerfile
.dockerignore
npm-debug.log
README.md
.env*.local`}</code>
      </pre>

      <h2>3. Docker Compose setup</h2>
      <p>
        One service. The key line is the port bind:{" "}
        <code>127.0.0.1:3000:3000</code> publishes the container only to the
        host&apos;s loopback interface, so the app is reachable by Nginx (next
        step) but never directly from the internet. Create{" "}
        <code>compose.yaml</code> next to the Dockerfile:
      </p>
      <pre>
        <code>{`services:
  web:
    build:
      context: .
      args:
        # NEXT_PUBLIC_* are baked in at build time — set them here, not below.
        NEXT_PUBLIC_SITE_URL: "https://example.com"
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"   # loopback only; Nginx on the host proxies to it
    environment:
      - NODE_ENV=production
    # Server-only secrets (DATABASE_URL, API keys) are read at RUNTIME.
    # Put them in a .env file next to this one; do not commit it.
    env_file:
      - .env`}</code>
      </pre>
      <p>
        Create an empty <code>.env</code> now if you have no server-side secrets
        yet (<code>touch .env</code>) so <code>env_file</code> doesn&apos;t error.
      </p>

      <h2>4. Nginx reverse proxy and HTTPS</h2>
      <p>
        Install Nginx on the host (simpler to reason about with Certbot than a
        containerised proxy, and it&apos;s the piece most likely to also serve
        other vhosts on the box later):
      </p>
      <pre>
        <code>{`sudo apt install -y nginx`}</code>
      </pre>
      <p>
        Create <code>/etc/nginx/sites-available/nextjs</code> — replace{" "}
        <code>example.com</code> with your domain:
      </p>
      <pre>
        <code>{`server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Build assets are content-hashed — let browsers cache them hard.
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}`}</code>
      </pre>
      <p>Enable it, drop the default site, and reload:</p>
      <pre>
        <code>{`sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx`}</code>
      </pre>
      <p>
        Now get the certificate. The <code>python3-certbot-nginx</code> plugin
        edits the vhost above in place to add the <code>443</code> block and an
        HTTP→HTTPS redirect:
      </p>
      <pre>
        <code>{`sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com

# confirm the renewal timer works — Certbot installs a systemd timer
sudo certbot renew --dry-run`}</code>
      </pre>

      <h2>5. Deploy and verify</h2>
      <p>Copy the project to the server (<code>git clone</code> or <code>scp</code>) and bring it up:</p>
      <pre>
        <code>{`cd ~/my-next-app
docker compose up -d --build
docker compose ps
docker compose logs -f web      # watch it boot, Ctrl-C to exit`}</code>
      </pre>
      <p>Check each layer in turn:</p>
      <pre>
        <code>{`curl -sI http://127.0.0.1:3000            # container: expect HTTP/1.1 200
curl -sI https://example.com             # through Nginx + TLS: expect HTTP/2 200`}</code>
      </pre>
      <p>
        Load <code>https://example.com</code> in a browser — valid padlock, your
        app rendered, and plain <code>http://</code> redirecting to{" "}
        <code>https://</code>. If the container answers on <code>:3000</code> but
        the domain doesn&apos;t, the problem is DNS or the Nginx vhost, not the
        app.
      </p>
      <p>To ship a change later:</p>
      <pre>
        <code>{`cd ~/my-next-app
git pull
docker compose up -d --build     # rebuilds and recreates 'web' only
docker image prune -f            # drop the now-dangling old image`}</code>
      </pre>

      <h2>Common gotchas</h2>
      <ul>
        <li>
          <strong>
            <code>NEXT_PUBLIC_</code> vars are frozen at build time.
          </strong>{" "}
          Anything referenced as <code>process.env.NEXT_PUBLIC_*</code> in
          client code is string-replaced during <code>next build</code>, so it
          must be passed as a Docker <strong>build arg</strong> (as in the{" "}
          <code>compose.yaml</code> above), and changing it means a rebuild — not
          just a container restart. Server-only values (database URLs, secret
          keys, anything used in a Server Component, route handler or{" "}
          <code>getServerSideProps</code>) are read at runtime instead: keep
          those in <code>.env</code> / <code>environment:</code> and they take
          effect on the next <code>docker compose up -d</code> with no rebuild.
        </li>
        <li>
          <strong>
            <code>next build</code> can OOM on the smaller Contabo tiers.
          </strong>{" "}
          The build is the memory-hungry part, not the running app. On a box
          with little RAM the Alpine build stage gets killed with an opaque{" "}
          <code>exit code 137</code>. Cheapest fix is swap:
          <pre>
            <code>{`sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab`}</code>
          </pre>
          Better for repeatable deploys: build the image in CI (or locally),
          push it to a registry, and have the server only <code>docker compose pull</code>{" "}
          — the server never runs the heavy build at all.
        </li>
        <li>
          <strong>Standalone output has two easy-to-miss pieces.</strong> The{" "}
          <code>.next/standalone</code> folder does <em>not</em> contain{" "}
          <code>public/</code> or <code>.next/static/</code>, so both are copied
          explicitly in the Dockerfile — skip either and you get a running app
          with no images, CSS or JS. And you start it with{" "}
          <code>node server.js</code>, not <code>next start</code>;{" "}
          <code>next start</code> isn&apos;t available in a standalone image.
        </li>
      </ul>

      <h2>Where to go next</h2>
      <ul>
        <li>
          <strong>Monitoring.</strong> <code>docker compose logs</code> and{" "}
          <code>docker stats</code> cover the basics; a small self-hosted
          Uptime-Kuma or a hosted uptime check will tell you when the box falls
          over.
        </li>
        <li>
          <strong>CI/CD.</strong> A GitHub Actions job that builds the image,
          pushes it to a registry, then SSHes in to run{" "}
          <code>docker compose pull &amp;&amp; docker compose up -d</code> turns
          deploys into a <code>git push</code>.
        </li>
        <li>
          <strong>Backups.</strong> Take Contabo snapshots on a schedule, and if
          you add a database, dump it to object storage separately — a snapshot
          of a running database is not a reliable backup.
        </li>
      </ul>
      <p>
        Each of those is a post in its own right. For now you have a production
        Next.js app on a{" "}
        {/* Plain link — Contabo has no affiliate programme; not tracked */}
        <a href="https://contabo.com/en/vps/" rel="noopener" target="_blank">
          Contabo VPS
        </a>
        , containerised, behind Nginx, on a certificate that renews itself.
      </p>

      <div className="callout" role="note">
        <span className="callout-label">Note</span>
        <p>
          Contabo doesn&apos;t run an affiliate programme, so the Contabo links
          on this page are plain, untracked links and nothing here earns a
          commission. See the <Link href="/disclosure/">disclosure</Link> for
          the full picture.
        </p>
      </div>

      <hr />
      <p className="article-meta">
        Found a command that didn&apos;t work on your setup?{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </article>
  );
}
