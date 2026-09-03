import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand">
          <span className="prompt">$&nbsp;</span>
          {siteConfig.name}
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/about/">About</Link>
          <Link href="/disclosure/">Disclosure</Link>
        </nav>
      </div>
    </header>
  );
}
