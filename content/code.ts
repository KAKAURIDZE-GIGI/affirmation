// -----------------------------------------------------------------------------
// Code blocks are identical across every locale — defined once, referenced from
// article content as { k: "code", ref: "<key>" }. Never translated.
// -----------------------------------------------------------------------------

export const CODE: Record<string, string> = {
  firstLogin: `ssh root@YOUR_SERVER_IP

apt update && apt upgrade -y
apt install -y ca-certificates curl ufw rsync
reboot`,

  createUser: `adduser deploy            # set a password, accept the defaults
usermod -aG sudo deploy

# copy your authorised key so you can SSH in directly as 'deploy'
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy`,

  verifyUser: `ssh deploy@YOUR_SERVER_IP
sudo whoami        # should print: root`,

  hardenSsh: `sudo tee /etc/ssh/sshd_config.d/99-hardening.conf >/dev/null <<'EOF'
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
EOF

sudo systemctl restart ssh`,

  firewall: `sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose`,

  installDocker: `sudo install -m 0755 -d /etc/apt/keyrings
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

docker run --rm hello-world`,

  mkProject: `mkdir -p ~/hello-hetzner && cd ~/hello-hetzner`,

  packageJson: `{
  "name": "hello-hetzner",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": { "start": "node app.js" },
  "dependencies": { "express": "^4.21.2" }
}`,

  appJs: `import express from "express";

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

app.listen(port, () => console.log("listening on :" + port));`,

  dockerfile: `# syntax=docker/dockerfile:1
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
CMD ["node", "app.js"]`,

  dockerignore: `node_modules
.git
.gitignore
Dockerfile
.dockerignore
*.md
compose.yaml
Caddyfile`,

  buildRun: `docker build -t hello-hetzner .
docker run -d --name hello --restart unless-stopped -p 80:3000 hello-hetzner

curl -s http://localhost | head
docker logs hello`,

  rmContainer: `docker rm -f hello`,

  composeYaml: `services:
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
  caddy_config:`,

  caddyfile: `app.example.com {
    encode gzip
    reverse_proxy app:3000
}`,

  composeUp: `docker compose up -d --build
docker compose ps
docker compose logs -f caddy      # watch it obtain the certificate, Ctrl-C to exit`,

  deployUpdate: `cd ~/hello-hetzner
git pull                       # or scp the changed files up

docker compose up -d --build   # rebuilds 'app', recreates only what changed
docker image prune -f          # drop the now-dangling old image`,

  dayToDay: `docker compose logs -f app     # tail application logs
docker compose restart app     # restart without rebuilding
docker compose down            # stop everything (data volumes are kept)
docker stats --no-stream       # quick CPU / memory snapshot`,
};
