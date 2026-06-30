import { FEED_URL, SITE_URL } from "@/lib/config";
import type { FeedEpisode, FeedReport, SiteFeed } from "@/lib/types";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function heroImageUrl(heroImage: string | null): string | null {
  if (!heroImage) return null;
  return absoluteUrl(heroImage);
}

export async function fetchFeed(): Promise<SiteFeed> {
  const response = await fetch(FEED_URL, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Feed unavailable (${response.status}). Deploy the site or set EXPO_PUBLIC_SITE_URL.`);
  }
  return (await response.json()) as SiteFeed;
}

export function weekReports(reports: FeedReport[]): FeedReport[] {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = reports.filter((report) => new Date(report.pubDate).getTime() >= weekAgo);
  return recent.length > 0 ? recent.slice(0, 4) : reports.slice(0, 4);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function deckLine(description: string): string {
  const trimmed = description.trim();
  const match = trimmed.match(/^(.+?[.!?])(?:\s|$)/);
  const line = match ? match[1] : trimmed.split(/\s+/).slice(0, 22).join(" ");
  return /[.!?]$/.test(line) ? line : `${line.replace(/[.!?]+$/, "")}.`;
}

export function findEpisode(episodes: FeedEpisode[], id: string): FeedEpisode | undefined {
  return episodes.find((episode) => episode.id === id);
}

export function findReport(reports: FeedReport[], slug: string): FeedReport | undefined {
  return reports.find((report) => report.slug === slug);
}
