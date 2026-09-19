import { DOMAIN_META, DOMAIN_SLUGS } from "@/data/sections";

export type SiteNavItem = {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
};

function norm(path: string) {
  return path.replace(/\/$/, "") || "/";
}

/** Minimal public nav — categories only (+ home). */
export const SITE_PRIMARY_NAV: SiteNavItem[] = [
  {
    href: "/",
    label: "Home",
    isActive: (pathname) => norm(pathname) === "/",
  },
  ...DOMAIN_SLUGS.map((slug) => ({
    href: `/topics/${slug}`,
    label: DOMAIN_META[slug].title.toUpperCase(),
    isActive: (pathname: string) => norm(pathname).startsWith(`/topics/${slug}`),
  })),
  {
    href: "/blog",
    label: "Index",
    isActive: (pathname) => norm(pathname) === "/blog",
  },
];

export const SITE_OVERLAY_EXTRA: { href: string; label: string }[] = [];
