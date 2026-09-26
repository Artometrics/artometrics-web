import { DOMAIN_META, DOMAIN_SLUGS } from "@/data/sections";

export type SiteNavItem = {
  href: string;
  label: string;
  /** Right-aligned hint in mobile nav overlay. */
  descriptor?: string;
  isActive: (pathname: string) => boolean;
};

function norm(path: string) {
  return path.replace(/\/$/, "") || "/";
}

/** Logo → home. No separate Home link. */
export const SITE_PRIMARY_NAV: SiteNavItem[] = [
  ...DOMAIN_SLUGS.map((slug) => ({
    href: `/topics/${slug}`,
    label: DOMAIN_META[slug].title.toUpperCase(),
    descriptor: DOMAIN_META[slug].navDescriptor,
    isActive: (pathname: string) => norm(pathname).startsWith(`/topics/${slug}`),
  })),
  {
    href: "/blog",
    label: "Index",
    descriptor: "All reports · desks",
    isActive: (pathname) => norm(pathname) === "/blog",
  },
];

export const SITE_OVERLAY_EXTRA: { href: string; label: string }[] = [];
