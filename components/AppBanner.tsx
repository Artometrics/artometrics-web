import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "@/lib/theme";
import { Fonts } from "@/constants/Colors";

export function AppBanner() {
  const { colors } = useTheme();
  return (
    <View style={[styles.bar, { backgroundColor: colors.bgElevated, borderBottomColor: colors.border }]}>
      <Text style={[styles.copy, { color: colors.textMuted }]}>Your Artometrics pass</Text>
      <Link href="/get-app" asChild>
        <Pressable hitSlop={8}>
          <Text style={[styles.cta, { color: colors.text }]}>GET THE APP</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  copy: { fontSize: 11, letterSpacing: 0.3, fontFamily: Fonts.sans },
  cta: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    fontFamily: Fonts.sans,
  },
});
