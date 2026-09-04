import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { siteConfig, posts } from "@/lib/site";
import { pageMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";

const post = posts.find((p) => p.slug === "deploy-node-app-hetzner")!;

export const metadata = pageMeta({
  title: "Deploy a Node.js App on a Hetzner VPS with Docker",
  description:
    "Copy-paste tutorial: provision a Hetzner VPS, harden it, install Docker, and deploy a Node.js app with automatic HTTPS via Caddy. Tested on Ubuntu 24.04.",
  path: "/deploy-node-app-hetzner/",
  type: "article",
  published: post.date,
  modified: post.updated,
});

const schema = [
  articleSchema({
    headline: "Deploy a Node.js app on a Hetzner VPS with Docker",
    description: post.description,
    path: "/deploy-node-app-hetzner/",
    published: post.date,
    modified: post.updated,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Deploy Node.js on Hetzner with Docker", path: "/deploy-node-app-hetzner/" },
  ]),
];

export default function Page() {
  return (
    <article className="prose">
      <JsonLd data={schema} />

      <Link href="/" className="back-link">
        ← All posts
      </Link>

      <h1>Deploy a Node.js app on a Hetzner VPS with Docker</h1>
      <p className="article-meta">
        Tutorial · published 26 August 2026 · updated 4 September 2026 · tested
        on Ubuntu 24.04 LTS
      </p>

      <p>
        Hetzner Cloud is my default for small-to-medium production boxes: an
        Arm <code>CAX11</code> (2 vCPU, 4&nbsp;GB RAM, 40&nbsp;GB NVMe) is about
        €3.29/month and an x86 <code>CX22</code> with the same specs is about
        €3.79/month, both on fast NVMe. This walkthrough takes a fresh server to
        a running, HTTPS-served Node.js app. Every command here was run on a
        clean Ubuntu&nbsp;24.04 <code>CX22</code>. If you&apos;re still choosing
        a provider, my{" "}
        <Link href="/digitalocean-vs-vultr/">
          DigitalOcean vs Vultr comparison
        </Link>{" "}
        covers how the mainstream options stack up.
      </p>

      <h2>What you&apos;ll end up with</h2>
      <ul>
        <li>A hardened Ubuntu 24.04 server (non-root sudo user, key-only SSH, firewall).</li>
        <li>Docker Engine + Compose plugin from Docker&apos;s official repo.</li>
        <li>A containerised Express app that restarts on reboot.</li>
        <li>Caddy in front of it, terminating TLS with an auto-renewing Let&apos;s Encrypt certificate.</li>
      </ul>

      <h2>Prerequisites</h2>
      <ul>
        <li>An SSH key pair on your machine (<code>ssh-keygen -t ed25519</code> if you don&apos;t have one).</li>
        <li>A domain name you can add a DNS record to (needed for HTTPS in step&nbsp;9).</li>
        <li>Basic terminal familiarity. No prior Docker knowledge required.</li>
      </ul>

      <h2>1. Create the server</h2>
      <p>
        {/* Plain link — Hetzner's referral programme ended in 2026; not tracked */}
        <a
          href="https://www.hetzner.com/cloud"
          rel="noopener"
          target="_blank"
        >
          Sign up for Hetzner Cloud
        </a>{" "}
        and create a new <strong>Project</strong>. In the project:
      </p>
      <ol>
        <li>
          <strong>Security → SSH keys → Add SSH key</strong>. Paste the contents
          of your <code>~/.ssh/id_ed25519.pub</code>.
        </li>
        <li>
          <strong>Servers → Add Server</strong>. Choose:
          <ul>
            <li>Location: whichever is closest to your users (Nuremberg, Falkenstein, Helsinki, Ashburn, Hillsboro, Singapore).</li>
            <li>Image: <strong>Ubuntu 24.04</strong>.</li>
            <li>Type: <code>CX22</code> (x86) or <code>CAX11</code> (Arm). This tutorial builds the image on the server, so either works.</li>
            <li>SSH key: select the one you just added.</li>
            <li>Name: <code>app-01</code>.</li>
          </ul>
        </li>
        <li>Create it, then copy the server&apos;s public IPv4 address.</li>
      </ol>
      <p>
        Optional but recommended: under <strong>Firewalls</strong>, create a
        Hetzner Cloud firewall allowing inbound TCP <code>22</code>,{" "}
        <code>80</code> and <code>443</code> only, and attach it to the server.
        That&apos;s a second layer in front of the host firewall we set up in
        step&nbsp;5.
      </p>

      <h2>2. First login and system update</h2>
      <p>Connect as <code>root</code> using the key Hetzner installed:</p>
      <pre>
        <code>{`ssh root@YOUR_SERVER_IP

apt update && apt upgrade -y
apt install -y ca-certificates curl ufw rsync
reboot`}</code>
      </pre>
      <p>
        The <code>reboot</code> picks up any new kernel. Wait ~20 seconds and
        SSH back in.
      </p>

      <h2>3. Create a non-root user</h2>
      <p>Running containers and everyday work as root is unnecessary risk. Create a user with sudo:</p>
      <pre>
        <code>{`adduser deploy            # set a password, accept the defaults
usermod -aG sudo deploy

# copy your authorised key so you can SSH in directly as 'deploy'
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy`}</code>
      </pre>
      <p>
        Open a <em>new</em> terminal (keep the root session open as a safety
        net) and confirm the new user works:
      </p>
      <pre>
        <code>{`ssh deploy@YOUR_SERVER_IP
sudo whoami        # should print: root`}</code>
      </pre>

      <h2>4. Harden SSH</h2>
      <p>
        Disable root login and password authentication. Put the overrides in a
        drop-in file so a future <code>openssh-server</code> upgrade
        doesn&apos;t clobber them:
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
        On Ubuntu 24.04 SSH is socket-activated; if the restart above has no
        effect, run <code>sudo systemctl restart ssh.socket</code>. Test in a
        new terminal <strong>before</strong> closing your working session:{" "}
        <code>ssh deploy@YOUR_SERVER_IP</code> should still work, and{" "}
        <code>ssh root@YOUR_SERVER_IP</code> should now be refused.
      </p>

      <h2>5. Host firewall</h2>
      <p>Allow SSH, HTTP and HTTPS; deny everything else inbound:</p>
      <pre>
        <code>{`sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose`}</code>
      </pre>

      <h2>6. Install Docker</h2>
      <p>Use Docker&apos;s official APT repository, not the older distro package:</p>
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

# run docker without sudo
sudo usermod -aG docker $USER
newgrp docker      # or log out and back in

docker run --rm hello-world`}</code>
      </pre>
      <p>The <code>hello-world</code> container printing a success message means the engine is up.</p>

      <h2>7. The application</h2>
      <p>
        Create the project on the server (or build it locally and{" "}
        <code>git clone</code> / <code>scp</code> it up). It&apos;s a minimal
        Express API with a health check.
      </p>
      <pre>
        <code>{`mkdir -p ~/hello-hetzner && cd ~/hello-hetzner`}</code>
      </pre>

      <p><code>package.json</code></p>
      <pre>
        <code>{`{
  "name": "hello-hetzner",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "start": "node app.js" },
  "dependencies": { "express": "^4.21.2" }
}`}</code>
      </pre>

      <p><code>app.js</code></p>
      <pre>
        <code>{`import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    host: process.env.HOSTNAME ?? null,
    time: new Date().toISOString(),
  });
});

app.get("/healthz", (_req, res) => res.type("text").send("ok"));

app.listen(port, () => console.log("listening on :" + port));`}</code>
      </pre>

      <p>
        <code>Dockerfile</code> — multi-stage so the final image carries only
        production dependencies, and it runs as the built-in non-root{" "}
        <code>node</code> user.
      </p>
      <pre>
        <code>{`# syntax=docker/dockerfile:1
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000
CMD ["node", "app.js"]`}</code>
      </pre>

      <p>
        <code>npm ci</code> needs a lockfile. Generate one once (locally or on
        the server) with <code>npm install</code>, which creates{" "}
        <code>package-lock.json</code>. Then add <code>.dockerignore</code>:
      </p>
      <pre>
        <code>{`node_modules
.git
.gitignore
Dockerfile
.dockerignore
*.md
compose.yaml
Caddyfile`}</code>
      </pre>

      <h2>8. Build and run (HTTP)</h2>
      <p>Quick check that the container works before adding TLS:</p>
      <pre>
        <code>{`docker build -t hello-hetzner .
docker run -d --name hello --restart unless-stopped -p 80:3000 hello-hetzner

curl -s http://localhost | head
docker logs hello`}</code>
      </pre>
      <p>
        Visit <code>http://YOUR_SERVER_IP</code> in a browser — you should get
        the JSON payload. Then stop it, because step&nbsp;9 needs port 80:
      </p>
      <pre>
        <code>{`docker rm -f hello`}</code>
      </pre>

      <h2>9. HTTPS with Caddy</h2>
      <p>
        Point DNS at the server first: create an <strong>A record</strong> for
        your domain (say <code>app.example.com</code>) to{" "}
        <code>YOUR_SERVER_IP</code> and wait for it to resolve
        (<code>dig +short app.example.com</code>). Caddy needs this to pass the
        Let&apos;s Encrypt challenge.
      </p>

      <p><code>compose.yaml</code></p>
      <pre>
        <code>{`services:
  app:
    build: .
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    expose:
      - "3000"          # visible to caddy only, not published to the host

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
      - app

volumes:
  caddy_data:
  caddy_config:`}</code>
      </pre>

      <p>
        <code>Caddyfile</code> — replace the domain and the email:
      </p>
      <pre>
        <code>{`app.example.com {
    encode gzip
    reverse_proxy app:3000
}`}</code>
      </pre>

      <p>Bring it all up:</p>
      <pre>
        <code>{`docker compose up -d --build
docker compose ps
docker compose logs -f caddy      # watch it obtain the certificate, Ctrl-C to exit`}</code>
      </pre>
      <p>
        Within a few seconds Caddy fetches and installs the certificate.
        Load <code>https://app.example.com</code> — valid padlock, JSON
        response, and plain <code>http://</code> now redirects to{" "}
        <code>https://</code>. Renewal is automatic.
      </p>

      <h2>10. Deploying updates</h2>
      <p>Change your code, then rebuild and roll the containers:</p>
      <pre>
        <code>{`cd ~/hello-hetzner
git pull                       # or scp the changed files up

docker compose up -d --build   # rebuilds 'app', recreates only what changed
docker image prune -f          # drop the now-dangling old image`}</code>
      </pre>
      <p>Useful day-to-day commands:</p>
      <pre>
        <code>{`docker compose logs -f app     # tail application logs
docker compose restart app     # restart without rebuilding
docker compose down            # stop everything (data volumes are kept)
docker stats --no-stream       # quick CPU / memory snapshot`}</code>
      </pre>

      <h2>Where to go next</h2>
      <ul>
        <li>
          Add a <code>deploy</code> step to CI that SSHes in and runs the
          step&nbsp;10 commands, or switch to <code>docker context</code> and
          build locally — the{" "}
          <Link href="/github-actions-cicd-vps-deploy/">
            GitHub Actions CI/CD guide
          </Link>{" "}
          walks through exactly that, automatically, on every push to{" "}
          <code>main</code>.
        </li>
        <li>
          Put a real database in its own service with a named volume, and take
          <code> hetzner</code> volume snapshots on a schedule.
        </li>
        <li>
          Set unattended-upgrades (<code>sudo dpkg-reconfigure -plow
          unattended-upgrades</code>) so security patches land automatically.
        </li>
      </ul>

      <div className="callout" role="note">
        <span className="callout-label">Note</span>
        <p>
          I use Hetzner for my own servers and recommend it here because the
          price-to-NVMe-performance ratio is the best I&apos;ve measured.
          Hetzner discontinued its referral programme in 2026, so the link above
          is a plain, untracked link and nothing on this page earns a
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
