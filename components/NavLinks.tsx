"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/disclosure/", label: "Disclosure" },
];

const trim = (s: string) => (s !== "/" && s.endsWith("/") ? s.slice(0, -1) : s);

export default function NavLinks() {
  const here = trim(usePathname() || "/");

  return (
    <nav className="site-nav" aria-label="Primary">
      {links.map(({ href, label }) => {
        const target = trim(href);
        const active =
          target === "/" ? here === "/" : here === target || here.startsWith(target + "/");
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
