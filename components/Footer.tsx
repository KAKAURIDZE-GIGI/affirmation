import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Reader-supported —
          some links are affiliate links.
        </p>
        <nav aria-label="Footer">
          <Link href="/about/">About</Link>
          <Link href="/disclosure/">Affiliate disclosure</Link>
          <a href={`mailto:${siteConfig.contactEmail}`}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}
