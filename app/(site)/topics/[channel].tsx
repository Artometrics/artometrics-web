import { Text, View, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { MagazineCard } from "@/components/MagazineCard";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import {
  SECTION_META,
  SECTION_SLUGS,
  LEGACY_DESK_TO_SECTION,
  type SectionSlug,
} from "@/data/sections";
import { getBlogPosts, primarySection } from "@/lib/content";

export async function generateStaticParams() {
  return [
    ...SECTION_SLUGS.map((channel) => ({ channel })),
    ...Object.keys(LEGACY_DESK_TO_SECTION).map((channel) => ({ channel })),
  ];
}

export default function TopicChannelPage() {
  const { channel: raw } = useLocalSearchParams<{ channel: string }>();
  const { colors } = useTheme();
  const mapped =
    (raw as SectionSlug) in SECTION_META
      ? (raw as SectionSlug)
      : LEGACY_DESK_TO_SECTION[raw ?? ""];
  const meta = mapped ? SECTION_META[mapped] : null;

  if (!meta || !mapped) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.text }}>Section not found</Text>
        <Link href="/topics">
          <Text style={{ color: colors.accent }}>All sections</Text>
        </Link>
      </Wrapper>
    );
  }

  const posts = getBlogPosts().filter((p) => primarySection(p.tags) === mapped);

  return (
    <Wrapper variant="magazine" style={styles.wrap}>
      <PageSeo title={meta.title} description={meta.description} path={`/topics/${mapped}`} />
      <Text style={[styles.kicker, { color: colors.textSubtle }]}>View all</Text>
      <Text style={[styles.title, { color: colors.text }]}>{meta.title}</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>{meta.description}</Text>
      <View style={[styles.rule, { backgroundColor: colors.border }]} />
      {posts.length === 0 ? (
        <Text style={{ color: colors.textMuted, fontFamily: Fonts.serif, fontSize: 16 }}>
          More stories coming soon.
        </Text>
      ) : (
        <View style={styles.grid}>
          {posts.map((post) => (
            <View key={post.slug} style={styles.item}>
              <MagazineCard post={post} variant="portrait" />
            </View>
          ))}
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: { fontFamily: Fonts.sans, fontSize: 40, fontWeight: "800", letterSpacing: -0.6 },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 640 },
  rule: { height: StyleSheet.hairlineWidth, marginVertical: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 20, marginTop: 8 },
  item: { flexBasis: 220, flexGrow: 1, maxWidth: 320 },
});
