import { Text, View, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { MagazineCard } from "@/components/MagazineCard";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import {
  DOMAIN_META,
  LEGACY_DESK_TO_SECTION,
  LEGACY_SECTION_TO_DOMAIN,
  SECTION_META,
  SECTION_SLUGS,
  type SectionSlug,
} from "@/data/sections";
import { getBlogPosts, primarySection } from "@/lib/content";

function resolveDomain(raw: string | undefined): SectionSlug | null {
  if (!raw) return null;
  if ((raw as SectionSlug) in SECTION_META) return raw as SectionSlug;
  return (
    LEGACY_SECTION_TO_DOMAIN[raw] ??
    LEGACY_DESK_TO_SECTION[raw] ??
    null
  );
}

export async function generateStaticParams() {
  const legacy = new Set([
    ...Object.keys(LEGACY_SECTION_TO_DOMAIN),
    ...Object.keys(LEGACY_DESK_TO_SECTION),
  ]);
  return [
    ...SECTION_SLUGS.map((channel) => ({ channel })),
    ...[...legacy].map((channel) => ({ channel })),
  ];
}

export default function TopicChannelPage() {
  const { channel: raw } = useLocalSearchParams<{ channel: string }>();
  const { colors } = useTheme();
  const mapped = resolveDomain(raw);
  const meta = mapped ? DOMAIN_META[mapped] : null;

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
