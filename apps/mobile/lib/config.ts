export const SITE_URL =
  process.env.EXPO_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://artometrics.com";

export const FEED_URL = `${SITE_URL}/feed.json`;
