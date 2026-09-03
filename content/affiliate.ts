// -----------------------------------------------------------------------------
// Outbound link targets referenced from content as [label](aff:<key>).
// Update the href here once real tracking links are approved — one place.
// -----------------------------------------------------------------------------

export type LinkTarget = { href: string; rel: string };

export const AFFILIATE: Record<string, LinkTarget> = {
  // TODO: replace with the real AWIN deep link once generated.
  do: {
    href: "https://www.digitalocean.com/",
    rel: "sponsored nofollow noopener",
  },
  // Vultr referral link (ref=9921215-9J).
  vultr: {
    href: "https://www.vultr.com/?ref=9921215-9J",
    rel: "sponsored nofollow noopener",
  },
  // Plain link — Hetzner's referral programme ended in 2026; not tracked.
  hetzner: {
    href: "https://www.hetzner.com/cloud",
    rel: "noopener",
  },
};
