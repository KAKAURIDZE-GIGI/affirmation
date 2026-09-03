import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import { LOCALES, LOCALE_HREFLANG, isLocale } from "@/lib/i18n";
import { getDict } from "@/content";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDict(lang);
  const ui = dict.ui;

  const siteSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: new URL("/icon.svg", siteConfig.url).toString(),
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: LOCALE_HREFLANG[lang],
    },
  ];

  return (
    <html lang={ui.htmlLang}>
      <body>
        <a href="#main" className="skip-link">
          {ui.skipToContent}
        </a>
        <Header lang={lang} ui={ui} />
        <main id="main" className="container">
          {children}
        </main>
        <Footer lang={lang} ui={ui} />
        <JsonLd data={siteSchema} />
        <AnalyticsEvents />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
