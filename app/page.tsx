import type { Metadata } from "next";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

// The site lives under /<lang>/. This bare-domain page bounces visitors to the
// best language match. On Vercel, vercel.json also 307s "/" -> "/en/" before
// this file is ever served; this is the fallback for other static hosts.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: `/${DEFAULT_LOCALE}/` },
};

const redirectScript = `(function () {
  try {
    var known = ${JSON.stringify(LOCALES)};
    var saved = null;
    try { saved = localStorage.getItem("hod-lang"); } catch (e) {}
    var want = (saved || navigator.language || "en").slice(0, 2).toLowerCase();
    var to = known.indexOf(want) > -1 ? want : "${DEFAULT_LOCALE}";
    location.replace("/" + to + "/");
  } catch (e) {
    location.replace("/${DEFAULT_LOCALE}/");
  }
})();`;

export default function RootIndex() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <p>
          Redirecting to <a href={`/${DEFAULT_LOCALE}/`}>Host or Die</a>…
        </p>
        <nav>
          {LOCALES.map((l) => (
            <a key={l} href={`/${l}/`} style={{ marginRight: "0.75rem" }}>
              {l}
            </a>
          ))}
        </nav>
      </body>
    </html>
  );
}
