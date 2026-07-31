import { Platform } from "react-native";
import * as Haptics from "expo-haptics";

/** Fire-and-forget haptics; no-op on web / unsupported devices. */
export async function hapticLight() {
  if (Platform.OS === "web") return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    /* ignore */
  }
}

export async function hapticMedium() {
  if (Platform.OS === "web") return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch {
    /* ignore */
  }
}

export async function hapticSuccess() {
  if (Platform.OS === "web") return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    /* ignore */
  }
}

export async function hapticSelection() {
  if (Platform.OS === "web") return;
  try {
    await Haptics.selectionAsync();
  } catch {
    /* ignore */
  }
}
