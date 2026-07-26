import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Platform,
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
  sectionLabel,
} from "@/lib/content";
import { SECTION_META, SECTION_SLUGS, type SectionSlug } from "@/data/sections";
import { useAuth } from "@/lib/auth";

const RAIL_SECTIONS: SectionSlug[] = [...SECTION_SLUGS];

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const posts = getBlogPosts();
  const featured = posts[0];
  const topCarousel = posts.slice(0, 10);
  const leadSecondary = posts.slice(1, 2)[0];
  const trending = posts.slice(2, 8);
  const morePosts = posts.slice(8, 32);
  const podcasts = getPodcastEpisodes().slice(0, 8);
  const heroUri = assetUrl(featured?.heroImage);
  const featuredLabel = featured ? sectionLabel(featured.tags) : null;
  const featuredAuthor = featured?.author
    ? formatAuthorName(String(featured.author))
    : "Artometrics";
  const cardW = Math.min(280, Math.max(200, width * 0.72));
  const portraitW = Math.min(220, Math.max(170, width * 0.55));
  const topCardW = Math.min(300, Math.max(220, width * 0.68));

  return (
    <>
      <PageSeo
        title="Artometrics"
        description="Data reporting on culture, sports, film, music, and cities — clear, citable, easy to read."
        path="/"
      />

      <Wrapper variant="magazine" style={styles.heroSwiss}>
        <View style={styles.heroSwissRow}>
          <View style={styles.heroCopy}>
            <Text style={[styles.megaTitle, { color: colors.text }]}>
              DATA{"\n"}MAGAZINE
              <Text style={{ color: colors.accent }}>*</Text>
            </Text>
            <Text style={[styles.megaSub, { color: colors.accent }]}>
              REPORTS ON CULTURE, POWER, AND THE CREATIVE ECONOMY.
            </Text>
            <Link href="/blog" asChild>
              <Pressable
                style={StyleSheet.flatten([
                  styles.circleCta,
                  { backgroundColor: colors.accent },
                ])}
                accessibilityLabel="Browse reports"
              >
                <Text style={styles.circleCtaText}>→</Text>
              </Pressable>
            </Link>
          </View>
          {featured && heroUri ? (
            <View style={styles.heroPhotoWrap}>
              <View style={[styles.heroRedBlock, { backgroundColor: colors.accent }]}>
                <Text style={styles.heroRedLabel}>BASED IN{"\n"}CULTURE</Text>
              </View>
              <Link href={`/${featured.slug}`} asChild>
                <Pressable style={styles.heroPhoto}>
                  <Image
                    source={{ uri: heroUri }}
                    style={StyleSheet.flatten([
                      styles.heroPhotoImg,
                      Platform.OS === "web"
                        ? ({ filter: "grayscale(1) contrast(1.05)" } as object)
                        : null,
                    ])}
                    resizeMode="cover"
                    accessibilityLabel={featured.title}
                  />
                </Pressable>
              </Link>
            </View>
          ) : null}
        </View>
      </Wrapper>

      <View style={[styles.statsBar, { backgroundColor: colors.text }]}>
        <Wrapper variant="magazine" style={styles.statsInner}>
          {[
            [String(posts.length), "REPORTS"],
            [String(SECTION_SLUGS.length), "DESKS"],
            [String(podcasts.length || "—"), "PODCASTS"],
            ["PD", "OPEN CANON"],
          ].map(([n, label], i, arr) => (
            <View
              key={label}
              style={StyleSheet.flatten([
                styles.statCell,
                i < arr.length - 1
                  ? { borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: "#333" }
                  : null,
              ])}
            >
              <Text style={[styles.statNum, { color: colors.accent }]}>{n}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </Wrapper>
      </View>

      {user ? (
        <Wrapper variant="magazine" style={styles.studioStrip}>
          <Text style={StyleSheet.flatten([styles.studioEyebrow, { color: colors.accent }])}>
            Studio
          </Text>
          <Text style={StyleSheet.flatten([styles.studioLine, { color: colors.textMuted }])}>
            Continue writing, check in, or publish — without leaving Artometrics.
          </Text>
          <Link href="/studio" asChild>
            <Pressable
              style={StyleSheet.flatten([
                styles.studioCta,
                { backgroundColor: colors.accent },
              ])}
            >
              <Text style={styles.studioCtaText}>Open Studio →</Text>
            </Pressable>
          </Link>
        </Wrapper>
      ) : null}

      <CarouselRail title="Top stories" href="/blog">
        {topCarousel.map((post) => (
          <MagazineCard key={post.slug} post={post} variant="tile" width={topCardW} />
        ))}
      </CarouselRail>

      {featured ? (
        <Wrapper variant="magazine" style={styles.heroBlock}>
          <View style={styles.heroRow}>
            <View style={styles.heroMain}>
              {heroUri ? (
                <Link href={`/${featured.slug}`} asChild>
                  <Pressable style={styles.heroMedia}>
                    <Image
                      source={{ uri: heroUri }}
                      style={StyleSheet.flatten([
                        styles.heroImage,
                        { borderColor: colors.border },
                        Platform.OS === "web"
                          ? ({ filter: "grayscale(0.35)" } as object)
                          : null,
                      ])}
                      resizeMode="cover"
                      accessibilityLabel={featured.title}
                    />
                  </Pressable>
                </Link>
              ) : null}
              {featuredLabel ? (
                <Text style={StyleSheet.flatten([styles.eyebrow, { color: colors.accent }])}>
                  {featuredLabel}
                </Text>
              ) : null}
              <Link href={`/${featured.slug}`} asChild>
                <Pressable>
                  <Text style={StyleSheet.flatten([styles.heroTitle, { color: colors.text }])}>
                    {featured.title}
                  </Text>
                </Pressable>
              </Link>
              <Text style={StyleSheet.flatten([styles.heroDek, { color: colors.textMuted }])}>
                {deckLine(featured.description, 36)}
              </Text>
              <Text style={StyleSheet.flatten([styles.byline, { color: colors.textSubtle }])}>
                {featuredAuthor}
                {featured.pubDate ? ` · ${formatDate(featured.pubDate)}` : ""}
              </Text>
              {leadSecondary ? (
                <View
                  style={StyleSheet.flatten([
                    styles.secondary,
                    { borderTopColor: colors.border },
                  ])}
                >
                  <Link href={`/${leadSecondary.slug}`} asChild>
                    <Pressable>
                      <Text
                        style={StyleSheet.flatten([
                          styles.secondaryTitle,
                          { color: colors.text },
                        ])}
                      >
                        {leadSecondary.title}
                      </Text>
                      <Text
                        style={StyleSheet.flatten([
                          styles.secondaryDek,
                          { color: colors.textMuted },
                        ])}
                        numberOfLines={2}
                      >
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

      {RAIL_SECTIONS.map((slug) => {
        const sectionPosts = posts.filter((p) => primarySection(p.tags) === slug).slice(0, 10);
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

      <CarouselRail title="More reports" href="/blog">
        {morePosts.map((post) => (
          <MagazineCard key={post.slug} post={post} variant="tile" width={cardW} />
        ))}
      </CarouselRail>

      <Wrapper variant="magazine" style={styles.gridSection}>
        <Text style={StyleSheet.flatten([styles.sectionTitle, { color: colors.text }])}>
          Latest
        </Text>
        <View style={styles.grid}>
          {posts.slice(0, 12).map((post) => (
            <View key={post.slug} style={styles.gridItem}>
              <MagazineCard post={post} variant="tile" />
            </View>
          ))}
        </View>
      </Wrapper>

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
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        backgroundColor: colors.bgElevated,
                        borderWidth: 1,
                        borderColor: colors.border,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                        backgroundColor: colors.bgElevated,
                        borderWidth: 1,
                        borderColor: colors.border,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      color: colors.accent,
                      fontSize: 10,
                      fontWeight: "700",
                      letterSpacing: 1.2,
                    }}
                  >
                    EPISODE {ep.episodeNumber ?? ep.id}
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                      fontFamily: Fonts.display,
                      fontSize: 18,
                      lineHeight: 22,
                      textTransform: "uppercase",
                    }}
                    numberOfLines={3}
                  >
                    {ep.title}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </CarouselRail>
      ) : null}

      <Wrapper variant="magazine" style={styles.jump}>
        <Text style={StyleSheet.flatten([styles.sectionTitle, { color: colors.text }])}>
          Sections
        </Text>
        <View style={styles.jumpRow}>
          {SECTION_SLUGS.map((slug) => (
            <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
              <Pressable
                style={StyleSheet.flatten([
                  styles.jumpChip,
                  { borderColor: colors.border },
                ])}
              >
                <Text style={StyleSheet.flatten([styles.jumpText, { color: colors.text }])}>
                  {SECTION_META[slug].title}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </Wrapper>

      <Wrapper variant="magazine" style={styles.ctaBandWrap}>
        <View style={[styles.ctaBand, { backgroundColor: colors.accent }]}>
          <Text style={styles.ctaBandTitle}>
            LET&apos;S READ SOMETHING{"\n"}THAT PERFORMS.
          </Text>
          <Link href="/blog" asChild>
            <Pressable style={styles.ctaBandBtn} accessibilityLabel="Browse reports">
              <Text style={styles.ctaBandBtnText}>↗</Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  heroSwiss: { paddingTop: 28, paddingBottom: 8 },
  heroSwissRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    alignItems: "stretch",
  },
  heroCopy: { flex: 1.2, minWidth: 260, gap: 16, justifyContent: "center" },
  megaTitle: {
    fontFamily: Fonts.display,
    fontSize: 64,
    lineHeight: 64,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  megaSub: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    letterSpacing: 0.6,
    maxWidth: 360,
  },
  circleCta: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  circleCtaText: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  heroPhotoWrap: {
    flex: 1,
    minWidth: 240,
    position: "relative",
    paddingTop: 24,
    paddingRight: 16,
  },
  heroRedBlock: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 72,
    paddingVertical: 14,
    paddingHorizontal: 8,
    zIndex: 2,
  },
  heroRedLabel: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
    textAlign: "center",
    lineHeight: 12,
  },
  heroPhoto: { borderWidth: 2, borderColor: "#000" },
  heroPhotoImg: { width: "100%", aspectRatio: 4 / 5 },
  statsBar: { marginTop: 20, marginBottom: 12 },
  statsInner: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 18,
  },
  statCell: {
    flexGrow: 1,
    flexBasis: 120,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  statNum: {
    fontFamily: Fonts.display,
    fontSize: 36,
    lineHeight: 40,
  },
  statLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
  },
  studioStrip: {
    paddingTop: 20,
    paddingBottom: 8,
    gap: 8,
  },
  studioEyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  studioLine: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 520,
  },
  studioCta: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  studioCtaText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  heroBlock: { paddingTop: 16, paddingBottom: 40 },
  heroRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 28,
  },
  heroMain: { flex: 2, minWidth: 280, gap: 10 },
  trendingCol: { flex: 1, minWidth: 260, maxWidth: 380 },
  heroMedia: { marginBottom: 8 },
  heroImage: { width: "100%", aspectRatio: 16 / 9, borderWidth: 2 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "700",
    marginTop: 4,
  },
  heroTitle: {
    fontFamily: Fonts.display,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "400",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  heroDek: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 640,
  },
  byline: {
    fontSize: 11,
    marginTop: 2,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  secondary: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 2,
    gap: 6,
  },
  secondaryTitle: {
    fontFamily: Fonts.display,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "400",
    textTransform: "uppercase",
  },
  secondaryDek: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 21,
  },
  gridSection: { marginBottom: 40, gap: 16 },
  sectionTitle: {
    fontFamily: Fonts.display,
    fontSize: 32,
    fontWeight: "400",
    letterSpacing: 0.5,
    textTransform: "uppercase",
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
  jump: { marginBottom: 32, gap: 14 },
  jumpRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  jumpChip: {
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  jumpText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  ctaBandWrap: { marginBottom: 40 },
  ctaBand: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: 28,
  },
  ctaBandTitle: {
    flex: 1,
    minWidth: 220,
    color: "#FFFFFF",
    fontFamily: Fonts.display,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: 0.5,
  },
  ctaBandBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaBandBtnText: { color: "#000000", fontSize: 26, fontWeight: "700" },
});
