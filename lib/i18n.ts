// -----------------------------------------------------------------------------
// Locale registry. Add a locale here + a matching file in content/<code>.ts.
// -----------------------------------------------------------------------------

export const LOCALES = ["en", "es", "fr", "de", "pt", "ru", "ka"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Native names shown in the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  ka: "ქართული",
};

/** BCP-47 tags for <html lang> / hreflang / og:locale. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  pt: "pt-BR",
  ru: "ru",
  ka: "ka",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  pt: "pt_BR",
  ru: "ru_RU",
  ka: "ka_GE",
};

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (LOCALES as readonly string[]).includes(v);
}

/** "/es/about/" -> { locale: "es", rest: "/about/" }. Unknown/absent -> default, rest unchanged. */
export function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const seg = pathname.split("/")[1];
  if (isLocale(seg)) {
    const rest = pathname.slice(("/" + seg).length) || "/";
    return { locale: seg, rest };
  }
  return { locale: DEFAULT_LOCALE, rest: pathname || "/" };
}

/** ("es", "/about/") -> "/es/about/" ; ("es", "/") -> "/es/" */
export function withLocale(locale: Locale, rest: string): string {
  if (rest === "/" || rest === "") return `/${locale}/`;
  const r = rest.startsWith("/") ? rest : `/${rest}`;
  return `/${locale}${r}`;
}
