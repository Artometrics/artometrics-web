import { Linking, Platform } from "react-native";

/** Open Stripe Checkout / Customer Portal (or any https/mailto URL) on web and native. */
export async function openExternalUrl(url: string): Promise<boolean> {
  if (!url) return false;
  try {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.location.href = url;
      return true;
    }
    // canOpenURL is unreliable for mailto/tel without LSApplicationQueriesSchemes.
    const scheme = url.split(":")[0]?.toLowerCase();
    const skipCanCheck = scheme === "mailto" || scheme === "tel";
    if (!skipCanCheck) {
      const can = await Linking.canOpenURL(url).catch(() => true);
      if (!can) return false;
    }
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}
