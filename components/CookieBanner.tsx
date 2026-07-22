import { useEffect, useState } from "react";
import { Platform, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "@/lib/theme";
import { Fonts } from "@/constants/Colors";

const KEY = "artometrics-cookie-pref";

export function CookieBanner() {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof localStorage === "undefined") return;
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  function accept() {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <View style={[styles.banner, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
      <Text style={[styles.copy, { color: colors.text }]}>
        We use essential cookies for membership and optional analytics when configured.{" "}
        <Link href="/legal/cookies">
          <Text style={{ color: colors.accent, textDecorationLine: "underline" }}>Cookie policy</Text>
        </Link>
      </Text>
      <Pressable onPress={accept} style={[styles.btn, { backgroundColor: colors.text }]}>
        <Text style={[styles.btnText, { color: colors.inverse }]}>OK</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    ...Platform.select({
      web: { position: "fixed" as const },
      default: { position: "absolute" as const },
    }),
    left: 12,
    right: 12,
    bottom: 12,
    zIndex: 1500,
    borderWidth: 1,
    padding: 14,
    gap: 12,
    maxWidth: 480,
    alignSelf: "center",
  },
  copy: { fontSize: 13, lineHeight: 20, fontFamily: Fonts.serif },
  btn: { alignSelf: "flex-start", paddingHorizontal: 16, paddingVertical: 8 },
  btnText: { fontSize: 12, fontWeight: "700", letterSpacing: 1 },
});
