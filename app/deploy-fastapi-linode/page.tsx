import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { siteConfig, posts } from "@/lib/site";
import { pageMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";

const post = posts.find((p) => p.slug === "deploy-fastapi-linode")!;

export const metadata = pageMeta({
  title: "Deploy FastAPI on Linode with Docker & Caddy",
  description:
    "Copy-paste tutorial: deploy a production FastAPI app on Linode with Docker and Caddy for automatic HTTPS — no manual Certbot steps. Tested on Ubuntu 24.04.",
  path: "/deploy-fastapi-linode/",
  type: "article",
  published: post.date,
  modified: post.updated,
});

const schema = [
  articleSchema({
    headline: "Deploy FastAPI on Linode with Docker and Caddy",
    description: post.description,
    path: "/deploy-fastapi-linode/",
    published: post.date,
    modified: post.updated,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Deploy FastAPI on Linode with Docker", path: "/deploy-fastapi-linode/" },
  ]),
];

export default function Page() {
  return (
    <article className="prose">
      <JsonLd data={schema} />

      <Link href="/" className="back-link">
        ← All posts
      </Link>

      <h1>Deploy FastAPI on Linode with Docker and Caddy</h1>
      <p className="article-meta">
        Tutorial · published 30 August 2026 · tested on Ubuntu 24.04 LTS
      </p>

      <p>
        This walkthrough takes a fresh Linode instance to a running,
        HTTPS-served <strong>Python/FastAPI</strong> app: the app runs as a
        Docker container behind <strong>uvicorn</strong>, and{" "}
        <strong>Caddy</strong> in front of it handles TLS automatically — no
        DNS-validated Certbot install, no <code>certbot --nginx</code>, no
        renewal timer to babysit. (Linode is now Linode, part of{" "}
        <strong>Akamai Cloud Computing</strong> — you&apos;ll see Akamai
        branding here and there in the signup flow and Cloud Manager; the
        product, plans and &quot;Linode&quot; name in the panel haven&apos;t
        changed.)
      </p>
      <p>
        Linode&apos;s draw is a straightforward global network — currently
        around 20 data-centre regions with consistent pricing across all of
        them — and a control panel that hasn&apos;t grown more complicated as
        the company has. A single instance like the one built here comfortably
        runs a small-to-medium API; if you outgrow it,{" "}
        <strong>Linode Kubernetes Engine (LKE)</strong> is the built-in next
        step for running the same containers across a managed cluster instead
        of one box — more on that at the end. If you&apos;re still choosing a
        provider generally, my{" "}
        <Link href="/digitalocean-vs-vultr/">
          DigitalOcean vs Vultr comparison
        </Link>{" "}
        covers the other two mainstream options. And if you&apos;re comparing
        deployment approaches rather than providers, the{" "}
        <Link href="/deploy-node-app-hetzner/">Node.js on Hetzner</Link> and{" "}
        <Link href="/deploy-nextjs-contabo/">Next.js on Contabo</Link>{" "}
        walkthroughs cover the same shape of deployment with Nginx and manual
        Certbot instead of Caddy — worth reading side by side with step&nbsp;4
        below if you want to see the difference directly.
      </p>

      <h2>What you&apos;ll end up with</h2>
      <ul>
        <li>A hardened Ubuntu 24.04 server (non-root sudo user, key-only SSH, firewall).</li>
        <li>Docker Engine + Compose plugin from Docker&apos;s official repo.</li>
        <li>
          A containerised FastAPI app served by <code>uvicorn</code>, restarting
          on reboot.
        </li>
        <li>
          Caddy in front of it, obtaining and renewing a Let&apos;s Encrypt
          certificate automatically — zero manual certificate commands.
        </li>
      </ul>

      <h2>Prerequisites</h2>
      <ul>
        <li>
          A FastAPI app that runs locally (<code>uvicorn app.main:app --reload</code>).
          If you don&apos;t have one yet, the two-file example in step&nbsp;2 is
          enough to follow along.
        </li>
        <li>
          A Linode instance —{" "}
          {/* Plain link — Linode/Akamai has no affiliate programme yet; not tracked */}
          <a href="https://www.linode.com/" rel="noopener" target="_blank">
            Linode
          </a>
          . The cheapest <strong>Nanode 1 GB</strong> plan is enough for this
          tutorial; size up if your app is heavier.
        </li>
        <li>An SSH key pair (<code>ssh-keygen -t ed25519</code> if you don&apos;t have one) and basic terminal familiarity.</li>
        <li>
          A domain name with an <strong>A record</strong> pointing at the
          instance&apos;s IPv4 address, resolving <em>before</em> you start
          Caddy — step&nbsp;4 explains why this one matters more here than with
          Certbot.
        </li>
      </ul>

      <h2>1. Initial server setup</h2>
      <p>
        In the Linode Cloud Manager: <strong>Create → Linode</strong>, pick the{" "}
        <strong>Ubuntu 24.04 LTS</strong> image, a region close to your users,
        and the <strong>Nanode 1 GB</strong> plan. Set a root password and add
        your SSH key under <strong>SSH Keys</strong> in the same form, then
        create it — it&apos;s usually reachable within a minute. Copy the
        instance&apos;s public IPv4 address.
      </p>
      <p>Log in as root and bring the system up to date:</p>
      <pre>
        <code>{`ssh root@YOUR_LINODE_IP

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
        confirm <code>ssh deploy@YOUR_LINODE_IP</code> works and{" "}
        <code>sudo whoami</code> prints <code>root</code>. Then disable root
        login and password auth with a drop-in:
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
      <p>
        Optional but recommended: Linode also has a <strong>Cloud Firewall</strong>{" "}
        product (Cloud Manager → Firewalls) you can attach to the instance as a
        second layer allowing only 22/80/443 inbound, on top of the{" "}
        <code>ufw</code> rules above.
      </p>
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

      <h2>2. Containerise the FastAPI app</h2>
      <p>
        A minimal app is enough to follow along — swap in your real one later.
        Project layout:
      </p>
      <pre>
        <code>{`hello-linode/
├── app/
│   ├── __init__.py
│   └── main.py
├── requirements.txt
├── Dockerfile
└── .dockerignore`}</code>
      </pre>
      <p><code>app/main.py</code></p>
      <pre>
        <code>{`from fastapi import FastAPI

app = FastAPI(title="hello-linode")


@app.get("/")
def read_root():
    return {"status": "ok"}


@app.get("/healthz")
def healthz():
    return {"status": "healthy"}`}</code>
      </pre>
      <p><code>requirements.txt</code> — pin your versions in a real project:</p>
      <pre>
        <code>{`fastapi==0.115.6
uvicorn[standard]==0.34.0`}</code>
      </pre>
      <p>
        <code>Dockerfile</code> — multi-stage: a builder stage with a compiler
        toolchain (some FastAPI dependencies ship as source packages that need
        one) installs into a virtualenv, and the runtime stage copies just that
        venv, so the final image carries no build tools.
      </p>
      <pre>
        <code>{`# syntax=docker/dockerfile:1

# 1. Build dependencies into a venv
FROM python:3.12-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends build-essential \\
  && rm -rf /var/lib/apt/lists/*
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. Runtime image — no compiler, no apt cache, just the venv + app code
FROM python:3.12-slim AS runner
WORKDIR /app
ENV PATH="/opt/venv/bin:$PATH" \\
    PYTHONDONTWRITEBYTECODE=1 \\
    PYTHONUNBUFFERED=1
COPY --from=builder /opt/venv /opt/venv
COPY . .

RUN useradd --system --uid 1001 appuser
USER appuser

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]`}</code>
      </pre>
      <p>
        <code>--host 0.0.0.0</code> is required — uvicorn&apos;s default of{" "}
        <code>127.0.0.1</code> is unreachable from outside the container, the
        same trap as binding to localhost in any containerised server.
      </p>
      <p><code>.dockerignore</code>:</p>
      <pre>
        <code>{`__pycache__
*.pyc
.venv
.git
.gitignore
Dockerfile
.dockerignore
.env
*.md
compose.yaml
Caddyfile`}</code>
      </pre>

      <h2>3. Docker Compose setup</h2>
      <p>
        One service for the app, published only on the internal Docker network
        (<code>expose</code>, not <code>ports</code>) so the only way in from
        outside is through Caddy, added next.
      </p>
      <pre>
        <code>{`services:
  api:
    build: .
    restart: unless-stopped
    environment:
      - ENVIRONMENT=production
    env_file:
      - .env          # secrets and per-deploy config — see the gotchas below
    expose:
      - "8000"`}</code>
      </pre>
      <p>
        Create an empty <code>.env</code> now if you have no secrets yet
        (<code>touch .env</code>) so <code>env_file</code> doesn&apos;t error,
        and lock down its permissions:
      </p>
      <pre>
        <code>{`chmod 600 .env`}</code>
      </pre>

      <h2>4. Caddy reverse proxy with automatic HTTPS</h2>
      <p>
        This is the step that looks different from the Nginx-based tutorials
        on this site. There&apos;s no separate proxy install, no{" "}
        <code>python3-certbot-nginx</code> plugin, no{" "}
        <code>certbot --nginx -d …</code> command, and no renewal timer to
        verify — Caddy is one more service in the same compose file, and it
        requests, installs and renews the certificate itself the first time it
        sees traffic for the domain. Point DNS at the instance first (an{" "}
        <strong>A record</strong> for, say, <code>api.example.com</code> →{" "}
        <code>YOUR_LINODE_IP</code>, confirmed with{" "}
        <code>dig +short api.example.com</code>) — Caddy needs that to resolve
        correctly to pass the Let&apos;s Encrypt HTTP challenge.
      </p>
      <p>Add Caddy to <code>compose.yaml</code>:</p>
      <pre>
        <code>{`services:
  api:
    build: .
    restart: unless-stopped
    environment:
      - ENVIRONMENT=production
    env_file:
      - .env
    expose:
      - "8000"

  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - api

volumes:
  caddy_data:
  caddy_config:`}</code>
      </pre>
      <p><code>Caddyfile</code> — replace the domain:</p>
      <pre>
        <code>{`api.example.com {
    encode gzip
    reverse_proxy api:8000
}`}</code>
      </pre>
      <p>
        That&apos;s the entire TLS configuration. Compare it to the Nginx vhost
        plus separate <code>certbot --nginx</code> run in the{" "}
        <Link href="/deploy-nextjs-contabo/">Contabo tutorial</Link> — same
        outcome, a fraction of the moving parts. What you trade away is
        low-level control: fine-grained Nginx directives (custom rate limiting,
        complex rewrite rules, request buffering tuning) are more awkward or
        impossible in Caddy&apos;s simpler config language. For a
        straightforward API behind TLS, that trade is usually worth it.
      </p>

      <h2>5. Deploy and verify</h2>
      <pre>
        <code>{`docker compose up -d --build
docker compose ps
docker compose logs -f caddy      # watch it obtain the certificate, Ctrl-C to exit`}</code>
      </pre>
      <p>Within a few seconds Caddy fetches and installs the certificate. Check each layer:</p>
      <pre>
        <code>{`docker compose exec api curl -sI http://localhost:8000        # container: expect HTTP/1.1 200
curl -sI https://api.example.com                              # through Caddy + TLS: expect HTTP/2 200`}</code>
      </pre>
      <p>
        Load <code>https://api.example.com</code> — valid padlock, JSON
        response, plain <code>http://</code> redirecting to <code>https://</code>{" "}
        automatically. FastAPI&apos;s interactive docs are worth checking too,
        since they&apos;re a good proxy smoke test — anything wrong with
        headers or the Host being forwarded tends to show up there first:{" "}
        <code>https://api.example.com/docs</code> should render the full
        Swagger UI, and <code>/redoc</code> the ReDoc alternative.
      </p>

      <h2>Common gotchas</h2>
      <ul>
        <li>
          <strong>Caddy won&apos;t issue a certificate until DNS resolves.</strong>{" "}
          If you bring the stack up before the A record has propagated, Caddy
          doesn&apos;t fail loudly — it retries the ACME challenge with
          backoff, and <code>https://</code> just won&apos;t work yet. Run{" "}
          <code>dig +short api.example.com</code> until it returns your
          instance&apos;s IP, then check{" "}
          <code>docker compose logs caddy</code> for lines mentioning{" "}
          <code>certificate obtained successfully</code>. No manual retry is
          needed — it catches up on its own once DNS is correct.
        </li>
        <li>
          <strong>Uvicorn worker count needs to match the plan, not a rule of thumb.</strong>{" "}
          Each <code>--workers</code> process is a full separate Python
          interpreter with its own memory footprint. On a single-core Nanode 1
          GB, 2–4 workers is typically the ceiling before you&apos;re trading
          memory for concurrency you can&apos;t use anyway — start at{" "}
          <code>--workers 2</code> as above, watch <code>docker stats</code>{" "}
          under real load, and drop to <code>1</code> if the instance is
          memory-bound rather than CPU-bound. Sizing up the Linode plan is
          often cheaper than fighting for headroom on the smallest one.
        </li>
        <li>
          <strong>Secrets belong in <code>.env</code>, not the image.</strong>{" "}
          Unlike a frontend build where public config gets baked in at build
          time, everything a FastAPI app reads is server-side — so keep
          API keys and database URLs out of the <code>Dockerfile</code> and{" "}
          <code>compose.yaml</code> entirely and load them via{" "}
          <code>env_file: .env</code> instead. Add <code>.env</code> to{" "}
          <code>.gitignore</code>, keep its permissions at <code>600</code>{" "}
          (set in step&nbsp;3), and a value change only needs{" "}
          <code>docker compose up -d</code> — no rebuild.
        </li>
      </ul>

      <h2>Where to go next</h2>
      <p>
        A single Linode instance comfortably runs this stack well past the
        point most side projects and small production APIs need to worry about
        capacity. When one box genuinely isn&apos;t enough — you need to scale
        the API horizontally, run scheduled jobs alongside it, or roll deploys
        without downtime — <strong>Linode Kubernetes Engine (LKE)</strong> is
        the managed path: the same container image from step&nbsp;2 becomes a
        Deployment instead of a Compose service, and LKE handles the control
        plane. That&apos;s a bigger topic than fits here, but it&apos;s a
        straightforward next step precisely because you&apos;re already
        shipping a container, not a bare script on a server. If one box is
        still the right size but you&apos;re tired of SSHing in for every
        update, the{" "}
        <Link href="/github-actions-cicd-vps-deploy/">
          GitHub Actions CI/CD guide
        </Link>{" "}
        automates exactly that instead.
      </p>
      <p>
        For now, you have a production FastAPI app on a{" "}
        {/* Plain link — Linode/Akamai has no affiliate programme yet; not tracked */}
        <a href="https://www.linode.com/" rel="noopener" target="_blank">
          Linode
        </a>{" "}
        instance, containerised, on a certificate that renews itself with no
        further input from you.
      </p>

      <div className="callout" role="note">
        <span className="callout-label">Note</span>
        <p>
          Linode (Akamai) doesn&apos;t currently run an affiliate programme, so
          the Linode links on this page are plain, untracked links and nothing
          here earns a commission. See the{" "}
          <Link href="/disclosure/">disclosure</Link> for the full picture.
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
