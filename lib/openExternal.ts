import { Linking, Platform } from "react-native";

/** Open Stripe Checkout / Customer Portal (or any https URL) on web and native. */
export async function openExternalUrl(url: string): Promise<boolean> {
  if (!url) return false;
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.location.href = url;
    return true;
  }
  const can = await Linking.canOpenURL(url);
  if (!can) return false;
  await Linking.openURL(url);
  return true;
}
