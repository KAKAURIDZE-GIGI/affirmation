"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * One delegated listener for the engagement signals that matter on this site:
 *  - clicks on affiliate links  (rel="sponsored")  -> "affiliate_click"
 *  - newsletter form submits     (form.signup)      -> "newsletter_submit"
 *
 * Events are visible only in the Vercel Analytics dashboard, never on the page.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    function providerFromHref(href: string): string {
      try {
        const host = new URL(href).hostname.replace(/^www\./, "");
        return host.split(".")[0] || host;
      } catch {
        return "unknown";
      }
    }

    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      const rel = link.getAttribute("rel") ?? "";
      if (!rel.split(/\s+/).includes("sponsored")) return;
      track("affiliate_click", {
        provider: providerFromHref(link.href),
        href: link.href,
      });
    }

    function onSubmit(e: Event) {
      const form = e.target;
      if (form instanceof HTMLFormElement && form.classList.contains("signup")) {
        track("newsletter_submit");
      }
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
