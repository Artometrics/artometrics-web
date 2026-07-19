import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatDate,
  getBlogPosts,
  getPodcastEpisodes,
} from "@/lib/content";

export default function HomeScreen() {
  const posts = getBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1);
  const podcasts = getPodcastEpisodes().slice(0, 2);
  const heroUri = assetUrl(featured?.heroImage);

  return (
    <View>
      {featured ? (
        <View style={styles.heroBand}>
          <Wrapper style={styles.heroInner}>
            <View style={styles.heroGrid}>
              <View style={styles.heroCopy}>
                <Text style={styles.eyebrow}>Latest report</Text>
                <Link href={`/${featured.slug}`} asChild>
                  <Pressable>
                    <Text style={styles.heroTitle}>{featured.title}</Text>
                  </Pressable>
                </Link>
                <Text style={styles.heroDeck}>{deckLine(featured.description)}</Text>
                <View style={styles.heroCtaRow}>
                  <Link href={`/${featured.slug}`} asChild>
                    <Pressable style={styles.readBtn}>
                      <Text style={styles.readBtnText}>Read report</Text>
                    </Pressable>
                  </Link>
                  <Text style={styles.meta}>{formatDate(featured.pubDate)}</Text>
                </View>
              </View>
              {heroUri ? (
                <Link href={`/${featured.slug}`} asChild>
                  <Pressable style={styles.heroMedia}>
                    <Image
                      source={{ uri: heroUri }}
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
        <View style={styles.podcastRow}>
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
        <View style={styles.grid}>
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
  heroCopy: { gap: 14 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "300",
    color: Colors.base900,
  },
  heroDeck: { fontSize: 16, lineHeight: 26, color: Colors.base600, maxWidth: 520 },
  heroCtaRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 14, marginTop: 8 },
  readBtn: {
    backgroundColor: Colors.base900,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 2,
  },
  readBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
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
    flexWrap: "wrap",
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
  podcastRow: { gap: 16, flexDirection: "row", flexWrap: "wrap" },
  podcastCard: {
    flexGrow: 1,
    flexBasis: 280,
    borderTopWidth: 2,
    borderTopColor: Colors.base900,
    paddingTop: 16,
    gap: 8,
  },
  podcastTitle: { fontSize: 20, color: Colors.base900, lineHeight: 26 },
  grid: { gap: 20, flexDirection: "row", flexWrap: "wrap" },
  gridItem: { flexBasis: 300, flexGrow: 1, maxWidth: 540 },
});
