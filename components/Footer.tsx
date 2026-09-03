import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { withLocale, type Locale } from "@/lib/i18n";
import type { UiDict } from "@/content/schema";

export default function Footer({ lang, ui }: { lang: Locale; ui: UiDict }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {ui.footerTagline}
        </p>
        <nav aria-label="Footer">
          <Link href={withLocale(lang, "/about/")}>{ui.footerAbout}</Link>
          <Link href={withLocale(lang, "/disclosure/")}>
            {ui.footerDisclosure}
          </Link>
          <a href={`mailto:${siteConfig.contactEmail}`}>{ui.footerContact}</a>
        </nav>
      </div>
    </footer>
  );
}
