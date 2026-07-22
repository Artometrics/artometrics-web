import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { CHANNEL_META, CHANNEL_SLUGS } from "@/data/sections";

export default function TopicsIndex() {
  const { colors } = useTheme();
  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Topics"
        description="Browse Artometrics by topic — sports, travel, fashion, games, and more."
        path="/topics"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Channels</Text>
      <Text style={[styles.title, { color: colors.text }]}>Topics</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Utilitarian discovery layers on top of our editorial desks.
      </Text>
      <View style={styles.list}>
        {CHANNEL_SLUGS.map((slug) => (
          <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
            <Pressable
              style={StyleSheet.flatten([styles.row, { borderBottomColor: colors.border }])}
            >
              <Text style={[styles.rowTitle, { color: colors.text }]}>
                {CHANNEL_META[slug].title}
              </Text>
              <Text style={[styles.rowDek, { color: colors.textMuted }]}>
                {CHANNEL_META[slug].description}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 40, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 560 },
  list: { marginTop: 8 },
  row: { paddingVertical: 18, borderBottomWidth: StyleSheet.hairlineWidth, gap: 6 },
  rowTitle: { fontFamily: Fonts.serif, fontSize: 24, fontWeight: "700" },
  rowDek: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 22 },
});
