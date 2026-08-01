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

export function setAnalyticsConsent(accepted: boolean): void {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(COOKIE_KEY, accepted ? "accepted" : "declined");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("artometrics-consent"));
    }
  } catch {
    /* ignore */
  }
}

export function getAnalyticsConsent(): "accepted" | "declined" | null {
  if (Platform.OS !== "web" || typeof localStorage === "undefined") return null;
  try {
    const v = localStorage.getItem(COOKIE_KEY);
    if (v === "accepted" || v === "declined") return v;
  } catch {
    /* ignore */
  }
  return null;
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
  w.gtag("config", id, { anonymize_ip: true, send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function gtagSafe(...args: unknown[]): void {
  if (Platform.OS !== "web" || typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof w.gtag === "function") w.gtag(...args);
}

/** SPA page view after consent. */
export function trackPageView(path: string, title?: string): void {
  loadGoogleAnalytics();
  gtagSafe("event", "page_view", {
    page_path: path,
    page_title: title || path,
  });
}

/** Custom event helper. */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  loadGoogleAnalytics();
  gtagSafe("event", name, params ?? {});
}
