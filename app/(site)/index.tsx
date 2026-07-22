import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { BlogCard } from "@/components/BlogCard";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { assetUrl } from "@/lib/assets";
import {
  deckLine,
  formatAuthorName,
  formatDate,
  getBlogPosts,
  getPodcastEpisodes,
  primarySection,
} from "@/lib/content";
import { SECTION_META } from "@/data/sections";

export default function HomeScreen() {
  const { colors } = useTheme();
  const posts = getBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 10);
  const more = posts.slice(10, 22);
  const podcasts = getPodcastEpisodes().slice(0, 2);
  const heroUri = assetUrl(featured?.heroImage);
  const featuredSection = featured ? primarySection(featured.tags) : null;
  const featuredAuthor = featured?.author
    ? formatAuthorName(String(featured.author))
    : "Artometrics";

  return (
    <View style={{ backgroundColor: colors.bg }}>
      <PageSeo
        title="Artometrics"
        description="Data reporting on culture, sports, film, music, and cities — clear, citable, easy to read."
        path="/"
      />

      {featured ? (
        <Wrapper style={styles.lead} variant="wide">
          {featuredSection ? (
            <Text style={[styles.eyebrow, { color: colors.accent }]}>
              {SECTION_META[featuredSection].title}
            </Text>
          ) : null}
          <Link href={`/${featured.slug}`} asChild>
            <Pressable>
              <Text style={[styles.leadTitle, { color: colors.text }]}>{featured.title}</Text>
            </Pressable>
          </Link>
          <Text style={[styles.leadDek, { color: colors.textMuted }]}>
            {deckLine(featured.description, 32)}
          </Text>
          <Text style={[styles.byline, { color: colors.textSubtle }]}>
            {featuredAuthor}
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

      <Wrapper style={styles.section} variant="wide">
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest</Text>
        <View style={[styles.rule, { backgroundColor: colors.border }]} />
        {rest.map((post) => (
          <BlogCard key={post.slug} post={post} variant="row" />
        ))}
      </Wrapper>

      {podcasts.length ? (
        <Wrapper style={styles.section} variant="wide">
          <View style={styles.sectionHead}>
            <Text style={[styles.sectionTitlePlain, { color: colors.text }]}>Podcasts</Text>
            <Link href="/podcast" asChild>
              <Pressable>
                <Text style={[styles.sectionLink, { color: colors.accent }]}>All episodes</Text>
              </Pressable>
            </Link>
          </View>
          {podcasts.map((ep) => (
            <Link key={ep.id} href={`/podcast/interviews/${ep.id}`} asChild>
              <Pressable
                style={StyleSheet.flatten([styles.podRow, { borderBottomColor: colors.border }])}
              >
                <Text style={[styles.eyebrow, { color: colors.accent }]}>
                  Episode {ep.episodeNumber ?? ep.id}
                </Text>
                <Text style={[styles.podTitle, { color: colors.text }]}>{ep.title}</Text>
                <Text style={[styles.leadDek, { color: colors.textMuted }]} numberOfLines={2}>
                  {ep.description}
                </Text>
              </Pressable>
            </Link>
          ))}
        </Wrapper>
      ) : null}

      {more.length ? (
        <Wrapper style={styles.section} variant="wide">
          <View style={styles.sectionHead}>
            <Text style={[styles.sectionTitlePlain, { color: colors.text }]}>More</Text>
            <Link href="/blog" asChild>
              <Pressable>
                <Text style={[styles.sectionLink, { color: colors.accent }]}>Archive</Text>
              </Pressable>
            </Link>
          </View>
          {more.map((post) => (
            <BlogCard key={post.slug} post={post} variant="row" />
          ))}
        </Wrapper>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  lead: { paddingTop: 28, paddingBottom: 24, gap: 12 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  leadTitle: {
    fontFamily: Fonts.serif,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  leadDek: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26, maxWidth: 720 },
  byline: { fontSize: 13 },
  leadMedia: { marginTop: 8, overflow: "hidden" },
  leadImage: { width: "100%", aspectRatio: 16 / 10 },
  section: { paddingVertical: 28 },
  sectionTitle: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  sectionTitlePlain: { fontFamily: Fonts.serif, fontSize: 24, fontWeight: "700" },
  rule: { height: StyleSheet.hairlineWidth, marginBottom: 4 },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  sectionLink: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  podRow: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  podTitle: { fontFamily: Fonts.serif, fontSize: 22, lineHeight: 28, fontWeight: "700" },
});
