import { Platform } from "react-native";
import Constants from "expo-constants";

function siteOrigin(): string {
  const extra = Constants.expoConfig?.extra as Record<string, string> | undefined;
  return (
    process.env.EXPO_PUBLIC_SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    extra?.EXPO_PUBLIC_SITE_URL ||
    "https://artometrics.com"
  );
}

type AssetPath =
  | string
  | { url?: string | null }
  | null
  | undefined;

/** Resolve site-relative asset paths for native (web can use root-relative). */
export function assetUrl(path: AssetPath): string | undefined {
  const raw =
    typeof path === "string"
      ? path
      : path && typeof path === "object"
        ? path.url
        : undefined;
  if (!raw || typeof raw !== "string") return undefined;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (Platform.OS === "web") return raw;
  const origin = siteOrigin().replace(/\/$/, "");
  return `${origin}${raw.startsWith("/") ? raw : `/${raw}`}`;
}
