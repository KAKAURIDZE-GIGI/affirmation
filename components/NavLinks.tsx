"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { splitLocale, withLocale, type Locale } from "@/lib/i18n";

export default function NavLinks({
  lang,
  labels,
}: {
  lang: Locale;
  labels: { home: string; about: string; disclosure: string };
}) {
  const { rest } = splitLocale(usePathname() || "/");
  const here = rest || "/";

  const items = [
    { path: "/", label: labels.home },
    { path: "/about/", label: labels.about },
    { path: "/disclosure/", label: labels.disclosure },
  ];

  return (
    <nav className="site-nav" aria-label="Primary">
      {items.map(({ path, label }) => {
        const active = path === "/" ? here === "/" : here === path;
        return (
          <Link
            key={path}
            href={withLocale(lang, path)}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
