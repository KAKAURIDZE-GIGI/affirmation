"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LOCALES,
  LOCALE_LABELS,
  splitLocale,
  withLocale,
  type Locale,
} from "@/lib/i18n";

export default function LangSwitcher({ label }: { label: string }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { locale, rest } = splitLocale(pathname);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Locale;
    if (next === locale) return;
    try {
      localStorage.setItem("hod-lang", next);
    } catch {
      /* private mode / blocked storage — ignore */
    }
    router.push(withLocale(next, rest));
  }

  return (
    <span className="lang-switcher">
      <select
        value={locale}
        onChange={onChange}
        aria-label={label}
        suppressHydrationWarning
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
    </span>
  );
}
