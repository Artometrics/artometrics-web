import { DOMAIN_META, DOMAIN_SLUGS } from "@/data/sections";

export type SiteNavItem = {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
};

function norm(path: string) {
  const p = path.replace(/\/$/, "") || "/";
  return p;
}

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
    label: "Reports",
    isActive: (pathname) => norm(pathname) === "/blog",
  },
  {
    href: "/podcast",
    label: "Podcast",
    isActive: (pathname) => norm(pathname).startsWith("/podcast"),
  },
  {
    href: "/studio",
    label: "Studio",
    isActive: (pathname) =>
      norm(pathname).startsWith("/studio") || norm(pathname).startsWith("/tools"),
  },
];

export const SITE_OVERLAY_EXTRA: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/editions", label: "Editions" },
  { href: "/pricing", label: "Membership" },
  { href: "/settings", label: "Settings" },
  { href: "/contact", label: "Contact" },
];
