import { useEffect } from "react";
import { Platform } from "react-native";
import { loadGoogleAnalytics } from "@/lib/analytics/ga";

/** Mount once in site chrome — loads GA4 after consent when configured. */
export function Analytics() {
  useEffect(() => {
    if (Platform.OS !== "web") return;
    loadGoogleAnalytics();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "artometrics-cookie-pref" && e.newValue === "accepted") {
        loadGoogleAnalytics();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("artometrics-consent", loadGoogleAnalytics as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("artometrics-consent", loadGoogleAnalytics as EventListener);
    };
  }, []);
  return null;
}
