import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { PageSeo } from "@/components/PageSeo";
import { GenreSpecimenCard } from "@/components/library/SpecimenCard";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

const HUB = [
  {
    href: "/editions",
    title: "Editions",
    body: "Special issues — Music, Movies, Games, Power, and more.",
  },
  {
    href: "/datasets",
    title: "Datasets",
    body: "CSV packs from published stories.",
  },
  {
    href: "/library/reference",
    title: "Reference",
    body: "Gutenberg, WikiArt, Wikipedia specimen cards.",
  },
  { href: "/blog", title: "Archive", body: "Every published article." },
  { href: "/podcast", title: "Podcasts", body: "Interviews and conversations." },
] as const;

export default function LibraryScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Library"
        description="Datasets and archives from Artometrics reporting."
        path="/library"
      />
      <Text style={[styles.title, { color: colors.text }]}>Library</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Genres, desks, and open-reference specimens for research and remix.
      </Text>

      <Text style={[styles.sub, { color: colors.text }]}>Collections</Text>
      <View style={styles.grid}>
        {HUB.map((card, i) => (
          <GenreSpecimenCard
            key={card.href}
            title={card.title}
            subtitle={card.body}
            href={card.href}
            index={i}
            onPress={() => router.push(card.href as `/`)}
          />
        ))}
      </View>

      <Text style={[styles.sub, { color: colors.text }]}>Browse by desk</Text>
      <View style={styles.grid}>
        {SECTION_SLUGS.map((s, i) => (
          <GenreSpecimenCard
            key={s}
            title={SECTION_META[s].title}
            subtitle={SECTION_META[s].description || "Editorial desk"}
            href={`/topics/${s}`}
            index={i + 4}
            onPress={() => router.push(`/topics/${s}` as `/`)}
          />
        ))}
      </View>

      <Link href="/tools" asChild>
        <Pressable style={StyleSheet.flatten([styles.toolsLink, { borderColor: colors.border }])}>
          <Text style={[styles.toolsText, { color: colors.text }]}>Studio tools →</Text>
        </Pressable>
      </Link>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 14 },
  title: {
    fontFamily: Fonts.display,
    fontSize: 44,
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  deck: { fontFamily: Fonts.sans, fontSize: 16, lineHeight: 24, maxWidth: 560 },
  sub: {
    fontFamily: Fonts.display,
    fontSize: 26,
    fontWeight: "400",
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 4,
  },
  toolsLink: {
    marginTop: 12,
    borderWidth: 2,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignSelf: "flex-start",
  },
  toolsText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
