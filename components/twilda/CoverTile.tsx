import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CoverKind } from "@/lib/twilda/novelcrafter/data";
import { Colors, Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

const COVER_LABEL: Record<CoverKind, string> = {
  gatsby: "Gatsby",
  trinity: "Trinity",
  cardinal: "Cardinal",
  apocrypha: "Apocrypha",
  artometrics: "Artometrics",
  psychonomics: "Psychonomics",
  plain: "Novel",
};

const COVER_BG: Record<CoverKind, string> = {
  gatsby: Colors.accent800,
  trinity: "#1e3a5f",
  cardinal: "#3d2b1f",
  apocrypha: "#2c1810",
  artometrics: "#C0392B",
  psychonomics: "#1a1a1a",
  plain: "#2a2a2a",
};

export function CoverTile({
  title,
  author,
  coverKind,
  updated,
  onPress,
}: {
  title: string;
  author?: string;
  coverKind: CoverKind;
  updated?: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        StyleSheet.flatten([styles.wrap, pressed ? { opacity: 0.9 } : null])
      }
    >
      <View
        style={StyleSheet.flatten([
          styles.cover,
          { backgroundColor: COVER_BG[coverKind] ?? COVER_BG.plain },
        ])}
      >
        <Text style={styles.coverEyebrow}>{COVER_LABEL[coverKind] ?? "Novel"}</Text>
        <Text style={styles.coverTitle} numberOfLines={3}>
          {title}
        </Text>
      </View>
      <View style={styles.meta}>
        <Text style={[styles.metaTitle, { color: colors.text }]} numberOfLines={2}>
          {title}
        </Text>
        {author ? (
          <Text style={[styles.metaSub, { color: colors.textMuted }]} numberOfLines={1}>
            {author}
          </Text>
        ) : null}
        {updated ? (
          <Text style={[styles.metaSub, { color: colors.textSubtle }]}>{updated}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "47%", marginBottom: 20 },
  cover: {
    aspectRatio: 2 / 3,
    padding: 14,
    justifyContent: "flex-end",
  },
  coverEyebrow: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  coverTitle: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    lineHeight: 22,
    color: "#fff",
    fontWeight: "700",
  },
  meta: { marginTop: 10, gap: 2 },
  metaTitle: { fontFamily: Fonts.serif, fontSize: 15 },
  metaSub: { fontSize: 13 },
});
