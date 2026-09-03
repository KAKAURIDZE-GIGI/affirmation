/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this folder. Without it, Next may pick up an
  // unrelated lockfile elsewhere on the machine (e.g. ~/package-lock.json).
  outputFileTracingRoot: import.meta.dirname,

  // Static HTML export — outputs a plain ./out folder that any static host serves.
  // If you later add server features (route handlers with runtime logic, ISR,
  // middleware, image optimization), delete this line and deploy normally on Vercel.
  output: "export",

  // Emit /about/index.html instead of /about.html so clean URLs work on any host.
  trailingSlash: true,

  // next/image optimization needs a server; disable it for static export.
  // (This project ships no bitmap images, but this keeps next/image usable.)
  images: { unoptimized: true },
};

export default nextConfig;
