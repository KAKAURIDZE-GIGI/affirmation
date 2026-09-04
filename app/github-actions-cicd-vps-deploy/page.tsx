import Link from "next/link";
import AffiliateNotice from "@/components/AffiliateNotice";
import JsonLd from "@/components/JsonLd";
import { siteConfig, posts } from "@/lib/site";
import { pageMeta, articleSchema, breadcrumbSchema } from "@/lib/seo";

const post = posts.find((p) => p.slug === "github-actions-cicd-vps-deploy")!;

export const metadata = pageMeta({
  title: "GitHub Actions CI/CD: Auto-Deploy Docker to a VPS",
  description:
    "A GitHub Actions pipeline that builds a Docker image and deploys it to any VPS over SSH on every push to main — provider-agnostic, works anywhere.",
  path: "/github-actions-cicd-vps-deploy/",
  type: "article",
  published: post.date,
  modified: post.updated,
});

const schema = [
  articleSchema({
    headline:
      "GitHub Actions CI/CD: auto-deploy a Dockerized app to any VPS",
    description: post.description,
    path: "/github-actions-cicd-vps-deploy/",
    published: post.date,
    modified: post.updated,
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
    {
      name: "GitHub Actions CI/CD for a VPS",
      path: "/github-actions-cicd-vps-deploy/",
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

      <h1>Automate Docker deploys to a VPS with GitHub Actions</h1>
      <p className="article-meta">
        Tutorial · published 4 September 2026 · provider-agnostic — tested
        against the deployment shape used across this site&apos;s other
        tutorials
      </p>

      <AffiliateNotice />

      <p>
        If you followed{" "}
        <Link href="/deploy-node-app-hetzner/">the Hetzner</Link>,{" "}
        <Link href="/deploy-nextjs-contabo/">Contabo</Link> or{" "}
        <Link href="/deploy-fastapi-linode/">Linode</Link> tutorial on this
        site, you already have a Dockerized app running in production — and
        you&apos;re probably SSHing in and running{" "}
        <code>git pull &amp;&amp; docker compose up -d --build</code> by hand
        every time something changes. That&apos;s fine for the first few
        deploys and tedious forever after. This guide wires up a GitHub
        Actions pipeline that does exactly those commands for you,
        automatically, on every push to <code>main</code>.
      </p>
      <p>
        Everything here is provider-agnostic — it works identically whether
        the server is on{" "}
        {/* TODO: replace with real AWIN deep link — affiliate application pending approval */}
        <a
          href="https://www.digitalocean.com/"
          rel="sponsored nofollow noopener"
          target="_blank"
        >
          DigitalOcean
        </a>
        ,{" "}
        {/* Vultr referral link (ref=9921215-9J) */}
        <a
          href="https://www.vultr.com/?ref=9921215-9J"
          rel="sponsored nofollow noopener"
          target="_blank"
        >
          Vultr
        </a>
        ,{" "}
        {/* Plain link — Hetzner's referral programme ended in 2026; not tracked */}
        <a href="https://www.hetzner.com/cloud" rel="noopener" target="_blank">
          Hetzner
        </a>
        ,{" "}
        {/* Plain link — Contabo has no affiliate programme; not tracked */}
        <a href="https://contabo.com/en/vps/" rel="noopener" target="_blank">
          Contabo
        </a>{" "}
        or{" "}
        {/* Plain link — Linode/Akamai has no affiliate programme yet; not tracked */}
        <a href="https://www.linode.com/" rel="noopener" target="_blank">
          Linode
        </a>
        , because the pipeline only cares that it can reach the box over SSH
        and run <code>docker compose</code> there. Nothing below is specific
        to any one provider&apos;s tooling or console.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>
          A Dockerized app already running on a VPS via{" "}
          <code>docker compose</code>. If you don&apos;t have this yet, start
          with the{" "}
          <Link href="/deploy-node-app-hetzner/">
            Node.js on Hetzner walkthrough
          </Link>{" "}
          — the same pattern applies whether you followed that one or the{" "}
          <Link href="/deploy-nextjs-contabo/">Contabo</Link> or{" "}
          <Link href="/deploy-fastapi-linode/">Linode</Link> version.
        </li>
        <li>That project&apos;s code in a GitHub repository.</li>
        <li>
          SSH access to the server as a non-root sudo user (the{" "}
          <code>deploy</code> user those tutorials create).
        </li>
      </ul>

      <h2>1. Set up a dedicated deploy key</h2>
      <p>
        Don&apos;t reuse your personal SSH key for this. A key that lives in
        a GitHub Actions secret should be able to do exactly one thing —
        connect to this server as this user — so that if it ever leaks, the
        damage is contained and the key is trivial to revoke without
        touching anything else you access with your own key. Generate one on
        your own machine, not the server:
      </p>
      <pre>
        <code>{`ssh-keygen -t ed25519 -f ~/.ssh/deploy_hostordie -C "github-actions-deploy" -N ""`}</code>
      </pre>
      <p>
        That creates <code>deploy_hostordie</code> (private) and{" "}
        <code>deploy_hostordie.pub</code> (public), with no passphrase — a
        passphrase would just block CI from using it non-interactively. Copy
        the public half to the server&apos;s <code>authorized_keys</code>:
      </p>
      <pre>
        <code>{`ssh-copy-id -i ~/.ssh/deploy_hostordie.pub deploy@YOUR_SERVER_IP

# no ssh-copy-id available? do it manually:
cat ~/.ssh/deploy_hostordie.pub | ssh deploy@YOUR_SERVER_IP \\
  "cat >> ~/.ssh/authorized_keys"`}</code>
      </pre>
      <p>
        Confirm it works before moving on:{" "}
        <code>ssh -i ~/.ssh/deploy_hostordie deploy@YOUR_SERVER_IP</code>{" "}
        should log you in without a password prompt.
      </p>

      <h2>2. Store the secrets in GitHub</h2>
      <p>
        In the repo: <strong>Settings → Secrets and variables → Actions →
        New repository secret</strong>. Add three:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Secret name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>DEPLOY_SSH_KEY</code></td>
              <td>
                The full contents of the <em>private</em> key —{" "}
                <code>cat ~/.ssh/deploy_hostordie</code>, including the{" "}
                <code>-----BEGIN OPENSSH PRIVATE KEY-----</code> and{" "}
                <code>-----END…</code> lines.
              </td>
            </tr>
            <tr>
              <td><code>DEPLOY_HOST</code></td>
              <td>The server&apos;s IP address or domain.</td>
            </tr>
            <tr>
              <td><code>DEPLOY_USER</code></td>
              <td>
                The SSH user — <code>deploy</code>, if you followed one of
                this site&apos;s tutorials.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If you go with the registry-based variant in the next step,
        you&apos;ll also need a <code>REGISTRY_TOKEN</code> — but if
        that registry is GitHub Container Registry, the workflow&apos;s
        built-in <code>GITHUB_TOKEN</code> already has permission and no
        extra secret is needed.
      </p>

      <h2>3. Write the workflow</h2>
      <p>
        Create <code>.github/workflows/deploy.yml</code>. This version
        mirrors exactly the manual update steps from this site&apos;s
        tutorials — SSH in, pull, rebuild, prune — just triggered
        automatically instead of typed by hand:
      </p>
      <pre>
        <code>{`name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy over SSH
        # check the action's repo for the current release tag before pinning
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: \${{ secrets.DEPLOY_HOST }}
          username: \${{ secrets.DEPLOY_USER }}
          key: \${{ secrets.DEPLOY_SSH_KEY }}
          script: |
            cd ~/hello-hetzner
            git pull origin main
            docker compose up -d --build
            docker image prune -f`}</code>
      </pre>
      <p>
        Swap <code>~/hello-hetzner</code> for whatever your project directory
        on the server is actually called. That&apos;s the entire pipeline —
        four commands, run over SSH, exactly the ones you&apos;d type by
        hand.
      </p>

      <h3>Option B: build once, push to a registry, pull on the server</h3>
      <p>
        The version above rebuilds the image <em>on the server</em>, same as
        the tutorials it&apos;s automating. On a smaller VPS tier that can be
        slow or memory-heavy (the same <code>next build</code>-under-pressure
        problem covered in the{" "}
        <Link href="/deploy-nextjs-contabo/">Contabo tutorial&apos;s gotchas</Link>
        {" "}applies to any build step, not just Next.js). The alternative:
        build the image in CI, push it to a registry, and have the server
        only pull the finished image.
      </p>
      <pre>
        <code>{`jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: \${{ secrets.DEPLOY_HOST }}
          username: \${{ secrets.DEPLOY_USER }}
          key: \${{ secrets.DEPLOY_SSH_KEY }}
          script: |
            cd ~/hello-hetzner
            docker compose pull
            docker compose up -d`}</code>
      </pre>
      <p>
        This needs one change on the server side too: <code>compose.yaml</code>{" "}
        has to reference <code>image: ghcr.io/you/your-repo:latest</code>{" "}
        instead of <code>build: .</code>, since the server is no longer
        building anything itself.
      </p>

      <h2>4. Test the pipeline</h2>
      <p>Commit the workflow file, push it, then push a trivial change to confirm the whole loop works end to end:</p>
      <pre>
        <code>{`git add .github/workflows/deploy.yml
git commit -m "Add deploy workflow"
git push origin main`}</code>
      </pre>
      <p>
        In the repo, open the <strong>Actions</strong> tab — you should see
        the <code>Deploy</code> workflow running, then a green check. Load
        your app in the browser (or <code>curl</code> its health endpoint) to
        confirm the change is actually live, not just that the workflow
        finished. If it fails, the step-by-step log in the Actions tab
        usually points straight at the problem — most first-run failures are
        one of the three gotchas below.
      </p>

      <h2>Common gotchas</h2>
      <ul>
        <li>
          <strong>SSH host key verification on the first connection.</strong>{" "}
          The GitHub Actions runner has never talked to your server before,
          so it has no entry for it in <code>known_hosts</code>.{" "}
          <code>appleboy/ssh-action</code> skips strict host-key checking by
          default, which is why the workflow above works without extra
          setup — convenient, but it means you&apos;re not pinning the
          server&apos;s identity. For higher assurance, capture the
          key once with <code>ssh-keyscan -H YOUR_SERVER_IP</code>, store the
          output as a secret, and write it to{" "}
          <code>known_hosts</code> in an explicit step before connecting with
          plain <code>ssh</code> instead of the action.
        </li>
        <li>
          <strong>A brief blip, not zero-downtime.</strong>{" "}
          <code>docker compose up -d --build</code> stops the old container
          before the new one is ready to accept connections — a real,
          user-facing gap of a few hundred milliseconds to a couple of
          seconds depending on your app&apos;s startup time. Fine for a low-traffic
          side project; if that gap matters, that&apos;s the point where you
          need a second container running behind a proxy while the new one
          starts (blue-green) rather than a single-container swap — worth
          knowing this workflow doesn&apos;t give you that, not something to
          solve here.
        </li>
        <li>
          <strong>Secrets never pass through GitHub Actions at all.</strong>{" "}
          This is a genuine advantage of the git-pull-and-rebuild-on-server
          approach: your <code>.env</code> file lives only on the server and
          is gitignored, so <code>git pull</code> never touches it and it
          never needs to be a GitHub secret in the first place. The container
          picks it up fresh on every <code>docker compose up -d --build</code>{" "}
          the same way it did when you ran that command by hand. If you move
          to the registry variant, this is still true — nothing about
          swapping <code>build: .</code> for <code>image: ...</code> changes
          how <code>env_file</code> works.
        </li>
      </ul>

      <h2>Next steps</h2>
      <p>
        This pipeline gets you from &quot;push to main&quot; to &quot;live on
        the server&quot; with no manual step in between — genuinely useful on
        its own, and also the foundation for a few things worth knowing about
        without needing to build today:
      </p>
      <ul>
        <li>
          <strong>A staging environment.</strong> A second job triggered on a{" "}
          <code>develop</code> branch, deploying to a second{" "}
          <code>compose.yaml</code> stack (a different port or subdomain) on
          the same or a separate box, gets you a place to check a change
          before it hits <code>main</code>.
        </li>
        <li>
          <strong>Rollback.</strong> The simplest version is just{" "}
          <code>git revert</code> the bad commit and let the pipeline
          redeploy the reverted state; the registry variant can go one step
          further and re-deploy a specific previous image tag directly,
          without touching git history at all.
        </li>
        <li>
          <strong>Monitoring.</strong> Knowing a deploy succeeded isn&apos;t
          the same as knowing the app stayed healthy afterward — that&apos;s
          a big enough topic to deserve its own guide rather than a bullet
          point here.
        </li>
      </ul>

      <hr />
      <p className="article-meta">
        Pipeline doing something unexpected on your setup?{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </article>
  );
}
