import Link from "next/link";
import { siteConfig } from "@/lib/site";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand">
          <span className="prompt" aria-hidden="true">
            $&nbsp;
          </span>
          {siteConfig.name}
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
