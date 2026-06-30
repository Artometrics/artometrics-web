import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { deckLine, formatDate } from "@/lib/api";
import type { FeedEpisode } from "@/lib/types";

interface Props {
  episode: FeedEpisode;
}

export default function EpisodeCard({ episode }: Props) {
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];

  return (
    <Link href={`/episode/${episode.id}`} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            opacity: pressed ? 0.92 : 1,
          },
        ]}
      >
        <Text style={[styles.meta, { color: colors.muted }]}>{formatDate(episode.pubDate)}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{episode.title}</Text>
        <Text style={[styles.deck, { color: colors.muted }]} numberOfLines={2}>
          {deckLine(episode.description)}
        </Text>
        <View style={styles.row}>
          <Text style={[styles.tag, { color: colors.tint }]}>
            {episode.isLocked ? "Member episode" : episode.audioSrc ? "Audio ready" : "Transcript"}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    gap: 6,
  },
  meta: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "Georgia",
  },
  deck: {
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    marginTop: 4,
  },
  tag: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
