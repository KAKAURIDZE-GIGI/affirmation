import { rich } from "@/lib/rich";
import { CODE } from "@/content/code";
import AffiliateNotice from "@/components/AffiliateNotice";
import type { Block } from "@/content/schema";
import type { Locale } from "@/lib/i18n";

const html = (t: string, lang: Locale) => ({ __html: rich(t, lang) });

/** Renders a content Block[] using the site's existing prose CSS classes. */
export default function Blocks({
  blocks,
  lang,
}: {
  blocks: Block[];
  lang: Locale;
}) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.k) {
          case "p":
            return <p key={i} dangerouslySetInnerHTML={html(b.t, lang)} />;
          case "h2":
            return <h2 key={i} dangerouslySetInnerHTML={html(b.t, lang)} />;
          case "h3":
            return <h3 key={i} dangerouslySetInnerHTML={html(b.t, lang)} />;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={html(it, lang)} />
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={html(it, lang)} />
                ))}
              </ol>
            );
          case "file":
            return (
              <p key={i}>
                <code>{b.name}</code>
              </p>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{CODE[b.ref] ?? ""}</code>
              </pre>
            );
          case "callout":
            return (
              <aside key={i} className="callout" role="note">
                <span
                  className="callout-label"
                  dangerouslySetInnerHTML={html(b.label, lang)}
                />
                <p dangerouslySetInnerHTML={html(b.body, lang)} />
              </aside>
            );
          case "table":
            return (
              <div key={i} className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} dangerouslySetInnerHTML={html(h, lang)} />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((c, j) => (
                          <td key={j} dangerouslySetInnerHTML={html(c, lang)} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "verdict":
            return (
              <div key={i} className="verdict">
                <h2 dangerouslySetInnerHTML={html(b.heading, lang)} />
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        {b.head.map((h, j) => (
                          <th key={j} dangerouslySetInnerHTML={html(h, lang)} />
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((c, j) => (
                            <td
                              key={j}
                              dangerouslySetInnerHTML={html(c, lang)}
                            />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p
                  style={{ marginBottom: 0 }}
                  dangerouslySetInnerHTML={html(b.note, lang)}
                />
              </div>
            );
          case "pros":
            return (
              <div key={i} className="two-col">
                {b.groups.map((g, j) => (
                  <div key={j} className="pros-cons">
                    <h3 dangerouslySetInnerHTML={html(g.title, lang)} />
                    <ul>
                      {g.items.map((it, k) => (
                        <li key={k} dangerouslySetInnerHTML={html(it, lang)} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          case "affiliateNotice":
            return <AffiliateNotice key={i} lang={lang} />;
          default:
            return null;
        }
      })}
    </>
  );
}
