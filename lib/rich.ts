import { AFFILIATE } from "@/content/affiliate";
import { withLocale, type Locale } from "@/lib/i18n";

// Renders a `Rich` string (see content/schema.ts) to a trusted HTML string.
// All content is first-party, so dangerouslySetInnerHTML of the result is safe.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
// Private-use sentinels — never occur in prose, survive escapeHtml untouched.
const OPEN = String.fromCharCode(0xe000);
const CLOSE = String.fromCharCode(0xe001);
const RESTORE = new RegExp(OPEN + "(\\d+)" + CLOSE, "g");

function anchor(label: string, target: string, lang: Locale): string {
  if (target.startsWith("~")) {
    return `<a href="${withLocale(lang, target.slice(1) || "/")}">${label}</a>`;
  }
  if (target.startsWith("aff:")) {
    const t = AFFILIATE[target.slice(4)];
    return t
      ? `<a href="${t.href}" rel="${t.rel}" target="_blank">${label}</a>`
      : label;
  }
  if (target.startsWith("mailto:")) {
    return `<a href="${target}">${label}</a>`;
  }
  if (/^https?:\/\//.test(target)) {
    return `<a href="${target}" target="_blank" rel="noopener">${label}</a>`;
  }
  return label;
}

export function rich(input: string, lang: Locale): string {
  const links: Array<[string, string]> = [];
  let s = input.replace(LINK_RE, (_m, label: string, target: string) => {
    links.push([label, target]);
    return OPEN + (links.length - 1) + CLOSE;
  });

  s = escapeHtml(s)
    .replace(/&lt;b&gt;([\s\S]*?)&lt;\/b&gt;/g, "<strong>$1</strong>")
    .replace(/&lt;i&gt;([\s\S]*?)&lt;\/i&gt;/g, "<em>$1</em>")
    .replace(/&lt;c&gt;([\s\S]*?)&lt;\/c&gt;/g, "<code>$1</code>");

  return s.replace(RESTORE, (_m, i: string) => {
    const [label, target] = links[Number(i)];
    return anchor(escapeHtml(label), target, lang);
  });
}
