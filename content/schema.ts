// -----------------------------------------------------------------------------
// Content model. Prose lives in `Rich` strings that support a tiny markup set:
//
//   <b>bold</b>  <i>italic</i>  <c>inline code</c>
//   [label](~/about/)          internal link (locale prefix added by renderer)
//   [label](aff:vultr)         outbound link from content/affiliate.ts
//   [label](https://…)         external link
//   [label](mailto:…)          mail link
//
// Everything else is plain text. Code blocks are referenced by key and never
// translated (see content/code.ts).
// -----------------------------------------------------------------------------

export type Rich = string;

export type Block =
  | { k: "p"; t: Rich }
  | { k: "h2"; t: Rich }
  | { k: "h3"; t: Rich }
  | { k: "ul"; items: Rich[] }
  | { k: "ol"; items: Rich[] }
  /** A "<code>filename</code>" caption line above a code block. */
  | { k: "file"; name: string }
  | { k: "code"; ref: string }
  | { k: "callout"; label: Rich; body: Rich }
  | { k: "table"; head: Rich[]; rows: Rich[][] }
  /** Boxed "Quick verdict": heading + table + closing note. */
  | { k: "verdict"; heading: Rich; head: Rich[]; rows: Rich[][]; note: Rich }
  /** Two-column pros/cons grid. */
  | { k: "pros"; groups: { title: Rich; items: Rich[] }[] }
  /** Renders the shared <AffiliateNotice> for the current locale. */
  | { k: "affiliateNotice" };

export type Doc = {
  /** <title> — keep < 60 chars. */
  title: string;
  /** meta description — 150–160 chars. */
  description: string;
  h1: string;
  /** the "· published … · updated …" line under the h1 (optional). */
  metaLine?: Rich;
  blocks: Block[];
};

export type UiDict = {
  htmlLang: string;
  nav: { home: string; about: string; disclosure: string };
  langLabel: string;
  skipToContent: string;
  backToPosts: string;
  latest: string;
  footerTagline: string;
  footerAbout: string;
  footerDisclosure: string;
  footerContact: string;
  affiliateNotice: string;
  /** rendered under the <hr> at the foot of every article */
  articleFooter: string;
  signup: {
    label: string;
    placeholder: string;
    button: string;
    note: string;
  };
  postKind: { Comparison: string; Tutorial: string };
  /** short translated blurb per post slug, for the homepage list */
  postBlurb: Record<string, string>;
  postTitle: Record<string, string>;
};

export type HomeDict = {
  title: string;
  description: string;
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  lead: string;
  intro: Rich;
};

export type Dict = {
  ui: UiDict;
  home: HomeDict;
  about: Doc;
  disclosure: Doc;
  dovv: Doc;
  hetzner: Doc;
};
