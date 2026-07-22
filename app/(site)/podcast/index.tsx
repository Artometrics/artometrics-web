import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import { formatDate, getPodcastEpisodes } from "@/lib/content";

export default function PodcastIndex() {
  const episodes = getPodcastEpisodes();

  return (
    <Wrapper style={styles.wrap}>
      <Text style={styles.eyebrow}>Podcast</Text>
      <Text style={styles.title}>Interviews</Text>
      <Text style={styles.deck}>
        Conversations with analysts, founders, and historians extending Artometrics reporting.
      </Text>
      <View style={styles.list}>
        {episodes.map((ep) => {
          const image = assetUrl(ep.image?.url);
          return (
            <Link key={ep.id} href={`/podcast/interviews/${ep.id}`} asChild>
              <Pressable style={styles.card}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                ) : null}
                <View style={styles.body}>
                  <Text style={styles.eyebrow}>
                    Episode {ep.episodeNumber ?? ep.id}
                    {ep.isLocked ? " · Members" : ""}
                  </Text>
                  <Text style={styles.cardTitle}>{ep.title}</Text>
                  <Text style={styles.cardDeck} numberOfLines={3}>
                    {ep.description}
                  </Text>
                  <Text style={styles.meta}>
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
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 40, fontWeight: "300", color: Colors.base900 },
  deck: { fontSize: 16, color: Colors.base600, marginBottom: 16, maxWidth: 560 },
  list: { gap: 20, flexDirection: "row", flexWrap: "wrap" },
  card: {
    flexBasis: 300,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: Colors.base200,
    backgroundColor: Colors.white,
    overflow: "hidden",
  },
  image: { width: "100%", aspectRatio: 16 / 9, backgroundColor: Colors.base100 },
  body: { padding: 16, gap: 8 },
  cardTitle: { fontSize: 20, color: Colors.base900, lineHeight: 26 },
  cardDeck: { fontSize: 14, lineHeight: 22, color: Colors.base600 },
  meta: { fontSize: 12, color: Colors.base500 },
});
