import { Text, View, StyleSheet } from "react-native";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

export function TldrBox({
  tldr,
  keyPoints,
}: {
  tldr?: string | null;
  keyPoints?: string[] | null;
}) {
  const { colors } = useTheme();
  const points = (keyPoints ?? []).filter(Boolean);
  if (!tldr && !points.length) return null;

  return (
    <View
      style={[
        styles.box,
        { borderLeftColor: colors.accent, backgroundColor: colors.accentSoft, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.label, { color: colors.accent }]}>TL;DR</Text>
      {tldr ? (
        <Text style={[styles.tldr, { color: colors.text }]}>{tldr}</Text>
      ) : null}
      {points.length ? (
        <View style={styles.list}>
          {points.map((point) => (
            <View key={point} style={styles.row}>
              <View style={[styles.dot, { backgroundColor: colors.accent }]} />
              <Text style={[styles.point, { color: colors.text }]}>{point}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderLeftWidth: 4,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontFamily: Fonts.sans,
  },
  tldr: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 22,
  },
  list: { gap: 8, marginTop: 4 },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  point: {
    flex: 1,
    fontFamily: Fonts.mono,
    fontSize: 13,
    lineHeight: 20,
  },
});
