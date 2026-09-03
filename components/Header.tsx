import Link from "next/link";
import { siteConfig } from "@/lib/site";
import NavLinks from "./NavLinks";
import LangSwitcher from "./LangSwitcher";
import type { Locale } from "@/lib/i18n";
import type { UiDict } from "@/content/schema";

export default function Header({ lang, ui }: { lang: Locale; ui: UiDict }) {
  return (
    <header className="site-header">
      <div className="container">
        <Link href={`/${lang}/`} className="brand">
          <span className="prompt" aria-hidden="true">
            $&nbsp;
          </span>
          {siteConfig.name}
        </Link>
        <div className="header-right">
          <NavLinks lang={lang} labels={ui.nav} />
          <LangSwitcher label={ui.langLabel} />
        </div>
      </div>
    </header>
  );
}
