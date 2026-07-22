import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
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
  primaryDesk,
} from "@/lib/content";
import { SECTION_META } from "@/data/sections";

export default function HomeScreen() {
  const { colors } = useTheme();
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
    <View style={{ backgroundColor: colors.bg }}>
      <PageSeo
        title="Artometrics"
        description="Data reports on culture, power, and the creative economy — art for data scientists and data science for artists."
        path="/"
      />
      {featured ? (
        <Wrapper style={styles.lead} variant="wide">
          <Text style={[styles.eyebrow, { color: colors.accent }]}>
            {featuredDesk ? SECTION_META[featuredDesk].title : "Latest report"}
          </Text>
          <Link href={`/${featured.slug}`} asChild>
            <Pressable>
              <Text style={[styles.leadTitle, { color: colors.text }]}>{featured.title}</Text>
            </Pressable>
          </Link>
          <Text style={[styles.leadDek, { color: colors.textMuted }]}>
            {deckLine(featured.description, 28)}
          </Text>
          <Text style={[styles.byline, { color: colors.text }]}>
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

      <Wrapper style={styles.section} variant="wide">
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Most popular</Text>
        <View style={[styles.rule, { backgroundColor: colors.text }]} />
        {rest.map((post) => {
          const thumb = assetUrl(post.heroImage);
          const author = post.author ? formatAuthorName(String(post.author)) : "Artometrics";
          return (
            <Link key={post.slug} href={`/${post.slug}`} asChild>
              <Pressable
                style={StyleSheet.flatten([styles.popRow, { borderBottomColor: colors.border }])}
              >
                <View style={styles.popCopy}>
                  <Text style={[styles.popTitle, { color: colors.text }]}>{post.title}</Text>
                  <Text style={[styles.popAuthor, { color: colors.textMuted }]}>{author}</Text>
                </View>
                {thumb ? (
                  <Image source={{ uri: thumb }} style={styles.popThumb} resizeMode="cover" accessibilityLabel={post.title} />
                ) : null}
              </Pressable>
            </Link>
          );
        })}
      </Wrapper>

      <Wrapper style={styles.section} variant="wide">
        <View style={styles.sectionHead}>
          <Text style={[styles.sectionTitlePlain, { color: colors.text }]}>Latest interviews</Text>
          <Link href="/podcast" asChild>
            <Pressable>
              <Text style={[styles.sectionLink, { color: colors.accent }]}>All episodes</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.podcastRow}>
          {podcasts.map((ep) => (
            <Link key={ep.id} href={`/podcast/interviews/${ep.id}`} asChild>
              <Pressable
                style={StyleSheet.flatten([styles.podcastCard, { borderTopColor: colors.text }])}
              >
                <Text style={[styles.eyebrow, { color: colors.accent }]}>
                  Episode {ep.episodeNumber ?? ep.id}
                </Text>
                <Text style={[styles.podcastTitle, { color: colors.text }]}>{ep.title}</Text>
                <Text style={[styles.leadDek, { color: colors.textMuted }]} numberOfLines={3}>
                  {ep.description}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Wrapper>

      {more.length ? (
        <Wrapper style={styles.section} variant="wide">
          <View style={styles.sectionHead}>
            <Text style={[styles.sectionTitlePlain, { color: colors.text }]}>More reports</Text>
            <Link href="/blog" asChild>
              <Pressable>
                <Text style={[styles.sectionLink, { color: colors.accent }]}>Browse archive</Text>
              </Pressable>
            </Link>
          </View>
          {more.slice(0, 12).map((post) => {
            const desk = primaryDesk(post.tags);
            return (
              <Link key={post.slug} href={`/${post.slug}`} asChild>
                <Pressable
                  style={StyleSheet.flatten([styles.moreRow, { borderBottomColor: colors.border }])}
                >
                  {desk ? (
                    <Text style={[styles.moreDesk, { color: colors.accent }]}>
                      {SECTION_META[desk].title}
                    </Text>
                  ) : null}
                  <Text style={[styles.moreTitle, { color: colors.text }]}>{post.title}</Text>
                  <Text style={[styles.moreMeta, { color: colors.textSubtle }]}>
                    {formatDate(post.pubDate)}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </Wrapper>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  lead: { paddingTop: 36, paddingBottom: 28, gap: 14 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  leadTitle: { fontFamily: Fonts.serif, fontSize: 34, lineHeight: 40, fontWeight: "700", letterSpacing: -0.3 },
  leadDek: { fontFamily: Fonts.serif, fontSize: 18, lineHeight: 28, maxWidth: 720 },
  byline: { fontFamily: Fonts.serif, fontSize: 15 },
  leadMedia: { marginTop: 8, overflow: "hidden" },
  leadImage: { width: "100%", aspectRatio: 16 / 10 },
  section: { paddingVertical: 36 },
  sectionTitle: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 },
  sectionTitlePlain: { fontFamily: Fonts.serif, fontSize: 26, fontWeight: "700" },
  rule: { height: 1, marginBottom: 4 },
  popRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 16, paddingVertical: 18, borderBottomWidth: StyleSheet.hairlineWidth },
  popCopy: { flex: 1, gap: 8, paddingRight: 8 },
  popTitle: { fontFamily: Fonts.serif, fontSize: 20, lineHeight: 26 },
  popAuthor: { fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: "600" },
  popThumb: { width: 88, height: 88 },
  sectionHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 18 },
  sectionLink: { fontSize: 12, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: "700" },
  podcastRow: { gap: 16, flexDirection: "row", flexWrap: "wrap" },
  podcastCard: { flexGrow: 1, flexBasis: 280, borderTopWidth: 2, paddingTop: 16, gap: 8 },
  podcastTitle: { fontFamily: Fonts.serif, fontSize: 22, lineHeight: 28 },
  moreRow: { paddingVertical: 16, borderBottomWidth: StyleSheet.hairlineWidth, gap: 6 },
  moreDesk: { fontSize: 11, letterSpacing: 1.6, textTransform: "uppercase", fontWeight: "700" },
  moreTitle: { fontFamily: Fonts.serif, fontSize: 20, lineHeight: 26 },
  moreMeta: { fontSize: 13 },
});
