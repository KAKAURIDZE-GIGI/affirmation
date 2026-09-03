import { rich } from "@/lib/rich";
import { getDict } from "@/content";
import type { Locale } from "@/lib/i18n";

/**
 * FTC-style affiliate disclosure shown at the TOP of every content page.
 * Keep this visible above the fold — do not move it below the article.
 */
export default function AffiliateNotice({ lang }: { lang: Locale }) {
  const ui = getDict(lang).ui;
  return (
    <aside className="callout" role="note">
      <span className="callout-label">{ui.nav.disclosure}</span>
      <p dangerouslySetInnerHTML={{ __html: rich(ui.affiliateNotice, lang) }} />
    </aside>
  );
}
