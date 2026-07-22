import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { MagazineCard } from "@/components/MagazineCard";
import { CarouselRail } from "@/components/CarouselRail";
import { TrendingRail } from "@/components/TrendingRail";
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
import { SECTION_META, SECTION_SLUGS, type SectionSlug } from "@/data/sections";

const RAIL_SECTIONS: SectionSlug[] = [
  "movies-tv",
  "sports",
  "music",
  "culture",
  "games",
  "business",
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const posts = getBlogPosts();
  const featured = posts[0];
  const ticker = posts.slice(0, 6);
  const leadSecondary = posts.slice(1, 2)[0];
  const trending = posts.slice(2, 8);
  const podcasts = getPodcastEpisodes().slice(0, 6);
  const heroUri = assetUrl(featured?.heroImage);
  const featuredSection = featured ? primarySection(featured.tags) : null;
  const featuredAuthor = featured?.author
    ? formatAuthorName(String(featured.author))
    : "Artometrics";
  const cardW = Math.min(280, Math.max(200, width * 0.72));
  const portraitW = Math.min(220, Math.max(170, width * 0.55));

  return (
    <View style={{ backgroundColor: colors.bg }}>
      <PageSeo
        title="Artometrics"
        description="Data reporting on culture, sports, film, music, and cities — clear, citable, easy to read."
        path="/"
      />

      {/* Headline ticker */}
      <View style={[styles.ticker, { borderBottomColor: colors.border, backgroundColor: colors.bgElevated }]}>
        <ScrollTicker posts={ticker} colors={colors} />
      </View>

      {/* Hero + Trending */}
      {featured ? (
        <Wrapper variant="magazine" style={styles.heroBlock}>
          <View style={styles.heroRow}>
            <View style={styles.heroMain}>
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
              {featuredSection ? (
                <Text style={[styles.eyebrow, { color: colors.accent }]}>
                  {SECTION_META[featuredSection].title}
                </Text>
              ) : null}
              <Link href={`/${featured.slug}`} asChild>
                <Pressable>
                  <Text style={[styles.heroTitle, { color: colors.text }]}>{featured.title}</Text>
                </Pressable>
              </Link>
              <Text style={[styles.heroDek, { color: colors.textMuted }]}>
                {deckLine(featured.description, 36)}
              </Text>
              <Text style={[styles.byline, { color: colors.textSubtle }]}>
                {featuredAuthor}
                {featured.pubDate ? ` · ${formatDate(featured.pubDate)}` : ""}
              </Text>
              {leadSecondary ? (
                <View style={[styles.secondary, { borderTopColor: colors.border }]}>
                  <Link href={`/${leadSecondary.slug}`} asChild>
                    <Pressable>
                      <Text style={[styles.secondaryTitle, { color: colors.text }]}>
                        {leadSecondary.title}
                      </Text>
                      <Text style={[styles.secondaryDek, { color: colors.textMuted }]} numberOfLines={2}>
                        {deckLine(leadSecondary.description, 22)}
                      </Text>
                    </Pressable>
                  </Link>
                </View>
              ) : null}
            </View>
            <View style={styles.trendingCol}>
              <TrendingRail posts={trending} />
            </View>
          </View>
        </Wrapper>
      ) : null}

      {/* Section carousels */}
      {RAIL_SECTIONS.map((slug) => {
        const sectionPosts = posts.filter((p) => primarySection(p.tags) === slug).slice(0, 8);
        if (sectionPosts.length < 2) return null;
        return (
          <CarouselRail
            key={slug}
            title={SECTION_META[slug].title}
            href={`/topics/${slug}`}
          >
            {sectionPosts.map((post) => (
              <MagazineCard key={post.slug} post={post} variant="portrait" width={portraitW} />
            ))}
          </CarouselRail>
        );
      })}

      {/* Latest grid */}
      <Wrapper variant="magazine" style={styles.gridSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest</Text>
        <View style={styles.grid}>
          {posts.slice(0, 8).map((post) => (
            <View key={post.slug} style={styles.gridItem}>
              <MagazineCard post={post} variant="tile" />
            </View>
          ))}
        </View>
      </Wrapper>

      {/* Podcasts */}
      {podcasts.length ? (
        <CarouselRail title="Podcasts" href="/podcast">
          {podcasts.map((ep) => {
            const img = assetUrl(ep.image?.url);
            return (
              <Link key={ep.id} href={`/podcast/interviews/${ep.id}`} asChild>
                <Pressable style={{ width: cardW, gap: 8 }}>
                  {img ? (
                    <Image
                      source={{ uri: img }}
                      style={{ width: "100%", aspectRatio: 1, backgroundColor: colors.bgElevated }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={{ width: "100%", aspectRatio: 1, backgroundColor: colors.bgElevated }} />
                  )}
                  <Text style={{ color: colors.accent, fontSize: 10, fontWeight: "700", letterSpacing: 1.2 }}>
                    EPISODE {ep.episodeNumber ?? ep.id}
                  </Text>
                  <Text style={{ color: colors.text, fontWeight: "700", fontSize: 15, lineHeight: 20 }} numberOfLines={3}>
                    {ep.title}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </CarouselRail>
      ) : null}

      {/* All sections jump */}
      <Wrapper variant="magazine" style={styles.jump}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Sections</Text>
        <View style={styles.jumpRow}>
          {SECTION_SLUGS.map((slug) => (
            <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
              <Pressable style={[styles.jumpChip, { borderColor: colors.border }]}>
                <Text style={[styles.jumpText, { color: colors.text }]}>
                  {SECTION_META[slug].title}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Wrapper>
    </View>
  );
}

function ScrollTicker({
  posts,
  colors,
}: {
  posts: ReturnType<typeof getBlogPosts>;
  colors: { text: string; textMuted: string; border: string; accent: string };
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tickerTrack}
    >
      {posts.map((post, i) => {
        const section = primarySection(post.tags);
        return (
          <View key={post.slug} style={styles.tickerItem}>
            {i > 0 ? <View style={[styles.tickerRule, { backgroundColor: colors.border }]} /> : null}
            <Link href={`/${post.slug}`} asChild>
              <Pressable style={styles.tickerPress}>
                {section ? (
                  <Text style={[styles.tickerKicker, { color: colors.accent }]}>
                    {SECTION_META[section].title}
                  </Text>
                ) : null}
                <Text style={[styles.tickerTitle, { color: colors.text }]} numberOfLines={2}>
                  {post.title}
                </Text>
              </Pressable>
            </Link>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ticker: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tickerTrack: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "stretch",
  },
  tickerItem: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  tickerRule: {
    width: StyleSheet.hairlineWidth,
    marginHorizontal: 14,
    alignSelf: "stretch",
  },
  tickerPress: {
    width: 220,
    gap: 4,
    paddingVertical: 4,
  },
  tickerKicker: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  tickerTitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },
  heroBlock: { paddingTop: 24, paddingBottom: 40 },
  heroRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 28,
  },
  heroMain: { flex: 2, minWidth: 280, gap: 10 },
  trendingCol: { flex: 1, minWidth: 260, maxWidth: 380 },
  heroMedia: { marginBottom: 8 },
  heroImage: { width: "100%", aspectRatio: 16 / 9 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "700",
    marginTop: 4,
  },
  heroTitle: {
    fontFamily: Fonts.sans,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    letterSpacing: -0.6,
  },
  heroDek: {
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 26,
    maxWidth: 640,
  },
  byline: { fontSize: 12, marginTop: 2 },
  secondary: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 6,
  },
  secondaryTitle: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  secondaryDek: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    lineHeight: 21,
  },
  gridSection: { marginBottom: 40, gap: 16 },
  sectionTitle: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  gridItem: {
    flexBasis: 280,
    flexGrow: 1,
    maxWidth: 400,
  },
  jump: { marginBottom: 48, gap: 14 },
  jumpRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  jumpChip: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  jumpText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});
