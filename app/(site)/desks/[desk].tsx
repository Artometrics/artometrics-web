import { Text, View, StyleSheet } from "react-native";
import { Link, Redirect, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
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
    ...SECTION_SLUGS.map((desk) => ({ desk })),
    ...Object.keys(LEGACY_DESK_TO_SECTION).map((desk) => ({ desk })),
  ];
}

export default function DeskPage() {
  const { desk: raw } = useLocalSearchParams<{ desk: string }>();
  const { colors } = useTheme();
  const section =
    (raw as SectionSlug) in SECTION_META
      ? (raw as SectionSlug)
      : LEGACY_DESK_TO_SECTION[raw ?? ""];

  if (!section) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.text }}>Section not found</Text>
        <Link href="/topics">
          <Text style={{ color: colors.accent }}>Sections</Text>
        </Link>
      </Wrapper>
    );
  }

  // Prefer canonical /topics/:section URLs
  if (raw !== section) {
    return <Redirect href={`/topics/${section}` as `/topics/${string}`} />;
  }

  const meta = SECTION_META[section];
  const posts = getBlogPosts().filter((p) => primarySection(p.tags) === section);

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title={meta.title} description={meta.description} path={`/desks/${section}`} />
      <Text style={[styles.title, { color: colors.text }]}>{meta.title}</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>{meta.description}</Text>
      <View style={[styles.rule, { backgroundColor: colors.border }]} />
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} variant="row" />
      ))}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  title: { fontFamily: Fonts.serif, fontSize: 40, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 560 },
  rule: { height: StyleSheet.hairlineWidth, marginVertical: 8 },
});
