import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// Root layout is a pass-through, so this renders its own <html>/<body>.
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          maxWidth: "38rem",
          margin: "0 auto",
          padding: "4rem 1.5rem",
        }}
      >
        <h1>404 — page not found</h1>
        <p>
          That URL doesn&apos;t exist. Try the{" "}
          <a href="/en/">homepage</a> or the{" "}
          <a href="/en/about/">methodology</a>.
        </p>
      </body>
    </html>
  );
}
