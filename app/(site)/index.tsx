import { Image, Pressable, Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatDate,
  getBlogPosts,
  getPodcastEpisodes,
} from "@/lib/content";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const posts = getBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1);
  const podcasts = getPodcastEpisodes().slice(0, 2);
  const multiCol = width >= 900;

  return (
    <View>
      {featured ? (
        <View style={styles.heroBand}>
          <Wrapper style={styles.heroInner}>
            <View style={[styles.heroGrid, multiCol && styles.heroGridWide]}>
              <View style={[styles.heroCopy, multiCol && { flex: 1 }]}>
                <Text style={styles.eyebrow}>Latest report</Text>
                <Link href={`/${featured.slug}`} asChild>
                  <Pressable>
                    <Text style={styles.heroTitle}>{featured.title}</Text>
                  </Pressable>
                </Link>
                <Text style={styles.heroDeck}>{deckLine(featured.description)}</Text>
                <View style={styles.heroCtaRow}>
                  <Link href={`/${featured.slug}`} asChild>
                    <PrimaryButton label="Read report" />
                  </Link>
                  <Text style={styles.meta}>{formatDate(featured.pubDate)}</Text>
                </View>
              </View>
              {assetUrl(featured.heroImage) ? (
                <Link href={`/${featured.slug}`} asChild>
                  <Pressable style={[styles.heroMedia, multiCol && { flex: 1 }]}>
                    <Image
                      source={{ uri: assetUrl(featured.heroImage)! }}
                      style={styles.heroImage}
                      resizeMode="cover"
                      accessibilityLabel={featured.title}
                    />
                  </Pressable>
                </Link>
              ) : null}
            </View>
          </Wrapper>
        </View>
      ) : null}

      <Wrapper style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Latest interviews</Text>
          <Link href="/podcast" asChild>
            <Pressable>
              <Text style={styles.sectionLink}>All episodes</Text>
            </Pressable>
          </Link>
        </View>
        <View style={[styles.podcastRow, width >= 700 && styles.podcastRowWide]}>
          {podcasts.map((ep) => (
            <Link key={ep.id} href={`/podcast/interviews/${ep.id}`} asChild>
              <Pressable style={styles.podcastCard}>
                <Text style={styles.eyebrow}>
                  Episode {ep.episodeNumber ?? ep.id}
                </Text>
                <Text style={styles.podcastTitle}>{ep.title}</Text>
                <Text style={styles.heroDeck} numberOfLines={3}>
                  {ep.description}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Wrapper>

      <Wrapper style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>All reports</Text>
          <Link href="/blog" asChild>
            <Pressable>
              <Text style={styles.sectionLink}>Browse archive</Text>
            </Pressable>
          </Link>
        </View>
        <View style={[styles.grid, width >= 700 && styles.gridWide]}>
          {rest.map((post) => (
            <View key={post.slug} style={styles.gridItem}>
              <BlogCard post={post} />
            </View>
          ))}
        </View>
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  heroBand: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
    backgroundColor: Colors.base100,
  },
  heroInner: { paddingVertical: 48 },
  heroGrid: { gap: 28 },
  heroGridWide: { flexDirection: "row", alignItems: "center", gap: 40 },
  heroCopy: { gap: 14 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  heroTitle: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "300",
    color: Colors.base900,
  },
  heroDeck: { fontSize: 16, lineHeight: 26, color: Colors.base600, maxWidth: 520 },
  heroCtaRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 8 },
  meta: { fontSize: 12, color: Colors.base500 },
  heroMedia: {
    borderWidth: 1,
    borderColor: Colors.base200,
    backgroundColor: Colors.white,
    overflow: "hidden",
  },
  heroImage: { width: "100%", aspectRatio: 16 / 9 },
  section: { paddingVertical: 40, gap: 20 },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 12,
  },
  sectionTitle: { fontSize: 24, fontWeight: "300", color: Colors.base900 },
  sectionLink: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  podcastRow: { gap: 16 },
  podcastRowWide: { flexDirection: "row" },
  podcastCard: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: Colors.base900,
    paddingTop: 16,
    gap: 8,
  },
  podcastTitle: { fontSize: 20, color: Colors.base900, lineHeight: 26 },
  grid: { gap: 20 },
  gridWide: { flexDirection: "row", flexWrap: "wrap" },
  gridItem: { flexBasis: "47%", flexGrow: 1, maxWidth: 540 },
});
