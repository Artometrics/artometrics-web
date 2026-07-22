import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { assetUrl } from "@/lib/assets";
import { formatDate, getPodcastEpisodes } from "@/lib/content";

export default function PodcastIndex() {
  const { colors } = useTheme();
  const episodes = getPodcastEpisodes();

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Podcast"
        description="Conversations extending Artometrics reporting."
        path="/podcast"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Podcast</Text>
      <Text style={[styles.title, { color: colors.text }]}>Interviews</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Conversations with analysts, founders, and historians extending Artometrics reporting.
      </Text>
      <View style={styles.list}>
        {episodes.map((ep) => {
          const image = assetUrl(ep.image?.url);
          return (
            <Link key={ep.id} href={`/podcast/interviews/${ep.id}`} asChild>
              <Pressable
                style={StyleSheet.flatten([
                  styles.card,
                  { borderColor: colors.border, backgroundColor: colors.bgElevated },
                ])}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                ) : null}
                <View style={styles.body}>
                  <Text style={[styles.eyebrow, { color: colors.accent }]}>
                    Episode {ep.episodeNumber ?? ep.id}
                    {ep.isLocked ? " · Members" : ""}
                  </Text>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{ep.title}</Text>
                  <Text style={[styles.cardDeck, { color: colors.textMuted }]} numberOfLines={3}>
                    {ep.description}
                  </Text>
                  <Text style={[styles.meta, { color: colors.textSubtle }]}>
                    {formatDate(ep.pubDate)}
                    {ep.duration ? ` · ${ep.duration}` : ""}
                  </Text>
                </View>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 12 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: { fontSize: 40, fontWeight: "300", fontFamily: Fonts.serif },
  deck: { fontSize: 16, marginBottom: 16, maxWidth: 560, lineHeight: 24 },
  list: { gap: 20, flexDirection: "row", flexWrap: "wrap" },
  card: {
    flexBasis: 300,
    flexGrow: 1,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  image: { width: "100%", aspectRatio: 16 / 9 },
  body: { padding: 16, gap: 8 },
  cardTitle: { fontSize: 20, lineHeight: 26 },
  cardDeck: { fontSize: 14, lineHeight: 22 },
  meta: { fontSize: 12 },
});
