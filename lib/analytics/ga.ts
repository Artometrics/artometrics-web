import { Platform } from "react-native";
import Constants from "expo-constants";

const COOKIE_KEY = "artometrics-cookie-pref";

export function getGaId(): string | null {
  const fromExtra = (Constants.expoConfig?.extra as Record<string, string> | undefined)
    ?.EXPO_PUBLIC_GA_ID;
  const fromEnv = process.env.EXPO_PUBLIC_GA_ID;
  const id = (fromEnv || fromExtra || "").trim();
  return id.startsWith("G-") ? id : null;
}

export function hasAnalyticsConsent(): boolean {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") return false;
  try {
    return localStorage.getItem(COOKIE_KEY) === "accepted";
  } catch {
    return false;
  }
}

/** Load gtag only on web after cookie consent when GA ID is configured. */
export function loadGoogleAnalytics(): void {
  if (Platform.OS !== "web" || typeof document === "undefined") return;
  const id = getGaId();
  if (!id || !hasAnalyticsConsent()) return;
  if ((window as unknown as { __artometricsGaLoaded?: boolean }).__artometricsGaLoaded) return;

  (window as unknown as { __artometricsGaLoaded?: boolean }).__artometricsGaLoaded = true;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer?.push(args);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}
