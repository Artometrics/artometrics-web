import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Colors, Fonts } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatAuthorName,
  formatDate,
  getBlogPosts,
  getPodcastEpisodes,
  primaryDesk,
} from "@/lib/content";
import { SECTION_META } from "@/data/sections";

export default function HomeScreen() {
  const posts = getBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 8);
  const more = posts.slice(8);
  const podcasts = getPodcastEpisodes().slice(0, 2);
  const heroUri = assetUrl(featured?.heroImage);
  const featuredDesk = featured ? primaryDesk(featured.tags) : null;
  const featuredAuthor = featured?.author
    ? formatAuthorName(String(featured.author))
    : "Artometrics";

  return (
    <View>
      {featured ? (
        <Wrapper style={styles.lead}>
          {featuredDesk ? (
            <Text style={styles.eyebrow}>{SECTION_META[featuredDesk].title}</Text>
          ) : (
            <Text style={styles.eyebrow}>Latest report</Text>
          )}
          <Link href={`/${featured.slug}`} asChild>
            <Pressable>
              <Text style={styles.leadTitle}>{featured.title}</Text>
            </Pressable>
          </Link>
          <Text style={styles.leadDek}>{deckLine(featured.description, 28)}</Text>
          <Text style={styles.byline}>
            By {featuredAuthor}
            {featured.pubDate ? ` · ${formatDate(featured.pubDate)}` : ""}
          </Text>
          {heroUri ? (
            <Link href={`/${featured.slug}`} asChild>
              <Pressable style={styles.leadMedia}>
                <Image
                  source={{ uri: heroUri }}
                  style={styles.leadImage}
                  resizeMode="cover"
                  accessibilityLabel={featured.title}
                />
              </Pressable>
            </Link>
          ) : null}
        </Wrapper>
      ) : null}

      <Wrapper style={styles.section}>
        <Text style={styles.sectionTitle}>Most popular</Text>
        <View style={styles.rule} />
        {rest.map((post) => {
          const thumb = assetUrl(post.heroImage);
          const author = post.author
            ? formatAuthorName(String(post.author))
            : "Artometrics";
          return (
            <Link key={post.slug} href={`/${post.slug}`} asChild>
              <Pressable style={styles.popRow}>
                <View style={styles.popCopy}>
                  <Text style={styles.popTitle}>{post.title}</Text>
                  <Text style={styles.popAuthor}>{author}</Text>
                </View>
                {thumb ? (
                  <Image
                    source={{ uri: thumb }}
                    style={styles.popThumb}
                    resizeMode="cover"
                    accessibilityLabel={post.title}
                  />
                ) : null}
              </Pressable>
            </Link>
          );
        })}
      </Wrapper>

      <Wrapper style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitlePlain}>Latest interviews</Text>
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
                <Text style={styles.leadDek} numberOfLines={3}>
                  {ep.description}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Wrapper>

      {more.length ? (
        <Wrapper style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitlePlain}>More reports</Text>
            <Link href="/blog" asChild>
              <Pressable>
                <Text style={styles.sectionLink}>Browse archive</Text>
              </Pressable>
            </Link>
          </View>
          <View style={styles.moreList}>
            {more.map((post) => {
              const desk = primaryDesk(post.tags);
              return (
                <Link key={post.slug} href={`/${post.slug}`} asChild>
                  <Pressable style={styles.moreRow}>
                    {desk ? (
                      <Text style={styles.moreDesk}>{SECTION_META[desk].title}</Text>
                    ) : null}
                    <Text style={styles.moreTitle}>{post.title}</Text>
                    <Text style={styles.moreMeta}>{formatDate(post.pubDate)}</Text>
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </Wrapper>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  lead: {
    paddingTop: 36,
    paddingBottom: 28,
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: Colors.accent600,
    fontWeight: "700",
  },
  leadTitle: {
    fontFamily: Fonts.serif,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "700",
    color: Colors.base900,
    letterSpacing: -0.3,
  },
  leadDek: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    lineHeight: 28,
    color: Colors.base700,
    maxWidth: 640,
  },
  byline: {
    fontFamily: Fonts.serif,
    fontSize: 15,
    color: Colors.base800,
  },
  leadMedia: {
    marginTop: 8,
    overflow: "hidden",
  },
  leadImage: { width: "100%", aspectRatio: 16 / 10, backgroundColor: Colors.base100 },
  section: { paddingVertical: 36, gap: 0 },
  sectionTitle: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: Colors.base900,
    marginBottom: 10,
  },
  sectionTitlePlain: {
    fontFamily: Fonts.serif,
    fontSize: 26,
    fontWeight: "700",
    color: Colors.base900,
  },
  rule: {
    height: 1,
    backgroundColor: Colors.base900,
    marginBottom: 4,
  },
  popRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
  },
  popCopy: { flex: 1, gap: 8, paddingRight: 8 },
  popTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    lineHeight: 26,
    color: Colors.base900,
  },
  popAuthor: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: Colors.base600,
    fontWeight: "600",
  },
  popThumb: {
    width: 88,
    height: 88,
    backgroundColor: Colors.base100,
  },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 18,
  },
  sectionLink: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "700",
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
  podcastTitle: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    color: Colors.base900,
    lineHeight: 28,
  },
  moreList: { gap: 0 },
  moreRow: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
    gap: 6,
  },
  moreDesk: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: Colors.accent600,
    fontWeight: "700",
  },
  moreTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    lineHeight: 26,
    color: Colors.base900,
  },
  moreMeta: { fontSize: 13, color: Colors.base500 },
});
