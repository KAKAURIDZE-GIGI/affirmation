import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <article className="prose">
      <h1>404 — page not found</h1>
      <p>
        That URL doesn&apos;t exist. Try the{" "}
        <Link href="/">homepage</Link> or the{" "}
        <Link href="/about/">methodology</Link>.
      </p>
    </article>
  );
}
