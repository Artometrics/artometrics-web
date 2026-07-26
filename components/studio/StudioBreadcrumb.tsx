import { Pressable, Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

export type Crumb = { label: string; href?: string };

export function StudioBreadcrumb({ items }: { items: Crumb[] }) {
  const { colors } = useTheme();
  return (
    <View style={styles.row} accessibilityRole="header">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <View key={`${item.label}-${i}`} style={styles.item}>
            {i > 0 ? (
              <Text style={[styles.sep, { color: colors.textSubtle }]}>/</Text>
            ) : null}
            {item.href && !last ? (
              <Pressable onPress={() => router.push(item.href as `/`)} hitSlop={6}>
                <Text style={[styles.link, { color: colors.accent }]} numberOfLines={1}>
                  {item.label}
                </Text>
              </Pressable>
            ) : (
              <Text
                style={[styles.current, { color: last ? colors.text : colors.textMuted }]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  item: { flexDirection: "row", alignItems: "center", gap: 4, maxWidth: "100%" },
  sep: { fontSize: 12, fontFamily: Fonts.sans },
  link: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    fontWeight: "700",
    fontFamily: Fonts.sans,
  },
  current: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    fontWeight: "700",
    fontFamily: Fonts.sans,
    maxWidth: 220,
  },
});
