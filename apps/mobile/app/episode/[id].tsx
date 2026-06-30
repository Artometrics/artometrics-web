import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Audio } from "expo-av";
import { Stack, useLocalSearchParams } from "expo-router";

import ErrorState from "@/components/ErrorState";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { absoluteUrl, deckLine, fetchFeed, findEpisode, formatDate } from "@/lib/api";
import type { FeedEpisode } from "@/lib/types";

export default function EpisodeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];
  const [episode, setEpisode] = useState<FeedEpisode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setError(null);
      const feed = await fetchFeed();
      const match = findEpisode(feed.episodes, id);
      if (!match) throw new Error("Episode not found in feed.");
      setEpisode(match);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load episode");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
    return () => {
      void soundRef.current?.unloadAsync();
    };
  }, [load]);

  const togglePlayback = async () => {
    if (!episode?.audioSrc) return;

    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await sound.pauseAsync();
        setPlaying(false);
        return;
      }
      await sound.playAsync();
      setPlaying(true);
      return;
    }

    const { sound: nextSound } = await Audio.Sound.createAsync(
      { uri: absoluteUrl(episode.audioSrc) },
      { shouldPlay: true }
    );
    soundRef.current = nextSound;
    setSound(nextSound);
    setPlaying(true);
  };

  if (!id) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Missing episode id.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.tint} />
      </View>
    );
  }

  if (error || !episode) {
    return <ErrorState title="Episode unavailable" message={error ?? undefined} onRetry={load} />;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Episode" }} />
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.meta, { color: colors.muted }]}>{formatDate(episode.pubDate)}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{episode.title}</Text>
        <Text style={[styles.deck, { color: colors.muted }]}>{deckLine(episode.description)}</Text>

        {episode.audioSrc ? (
          <Pressable
            onPress={() => void togglePlayback()}
            style={[styles.primaryBtn, { backgroundColor: colors.text }]}
          >
            <Text style={styles.primaryBtnText}>{playing ? "Pause" : "Play episode"}</Text>
          </Pressable>
        ) : (
          <Text style={[styles.note, { color: colors.muted }]}>
            Audio is not published yet. Open the full episode page on the website.
          </Text>
        )}

        <Pressable
          onPress={() => void Linking.openURL(absoluteUrl(episode.url))}
          style={[styles.secondaryBtn, { borderColor: colors.border }]}
        >
          <Text style={[styles.secondaryBtnText, { color: colors.text }]}>
            Open on website
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 12,
  },
  meta: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: "Georgia",
  },
  deck: {
    fontSize: 16,
    lineHeight: 24,
  },
  note: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  secondaryBtn: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryBtnText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
