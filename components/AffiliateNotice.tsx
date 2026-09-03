import Link from "next/link";

/**
 * FTC-style affiliate disclosure shown at the TOP of every content page.
 * Keep this visible above the fold — do not move it below the article.
 */
export default function AffiliateNotice() {
  return (
    <aside className="callout" role="note">
      <span className="callout-label">Disclosure</span>
      <p>
        This article contains affiliate links. If you sign up through one, this
        site may earn a commission at no extra cost to you. Recommendations are
        based on hands-on testing, not commission size — see the{" "}
        <Link href="/disclosure/">full disclosure</Link>.
      </p>
    </aside>
  );
}
