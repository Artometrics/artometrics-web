import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "@/lib/theme";
import { Fonts } from "@/constants/Colors";

/** Slim subscribe strip — Art Newspaper / NYT style. */
export function AppBanner() {
  const { colors } = useTheme();
  return (
    <View style={[styles.bar, { backgroundColor: colors.text }]}>
      <Text style={[styles.copy, { color: colors.inverse }]} numberOfLines={1}>
        Unlimited access to Artometrics reporting.
      </Text>
      <Link href="/pricing" asChild>
        <Pressable hitSlop={8}>
          <Text style={[styles.cta, { color: colors.inverse }]}>Subscribe</Text>
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
    gap: 12,
  },
  copy: { flex: 1, fontSize: 12, fontFamily: Fonts.sans },
  cta: {
    fontSize: 12,
    fontWeight: "700",
    textDecorationLine: "underline",
    fontFamily: Fonts.sans,
  },
});
