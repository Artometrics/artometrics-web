import { Text, View, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import {
  CHANNEL_META,
  CHANNEL_SLUGS,
  type ChannelSlug,
} from "@/data/sections";
import { getBlogPosts } from "@/lib/content";

export async function generateStaticParams() {
  return CHANNEL_SLUGS.map((channel) => ({ channel }));
}

export default function TopicChannelPage() {
  const { channel: raw } = useLocalSearchParams<{ channel: string }>();
  const { colors } = useTheme();
  const channel = raw as ChannelSlug;
  const meta = CHANNEL_META[channel];

  if (!meta) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.text }}>Topic not found</Text>
        <Link href="/topics">
          <Text style={{ color: colors.accent }}>All topics</Text>
        </Link>
      </Wrapper>
    );
  }

  const posts = getBlogPosts().filter((p) =>
    ((p as { channels?: string[] }).channels ?? []).includes(channel),
  );

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title={meta.title} description={meta.description} path={`/topics/${channel}`} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Topic</Text>
      <Text style={[styles.title, { color: colors.text }]}>{meta.title}</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>{meta.description}</Text>
      <View style={[styles.rule, { backgroundColor: colors.text }]} />
      {posts.length === 0 ? (
        <Text style={{ color: colors.textMuted, fontFamily: Fonts.serif, fontSize: 16 }}>
          Reports for this topic are on the way. Browse the archive.
        </Text>
      ) : (
        posts.map((post) => <BlogCard key={post.slug} post={post} variant="row" />)
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 40, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 560 },
  rule: { height: 1, marginVertical: 8 },
});
