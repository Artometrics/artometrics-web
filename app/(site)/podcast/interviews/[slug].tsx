import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import {
  formatAuthorName,
  formatDate,
  getPodcastEpisode,
  getPodcastEpisodes,
} from "@/lib/content";
import { useAuth } from "@/lib/auth";

export async function generateStaticParams() {
  return getPodcastEpisodes().map((ep) => ({ slug: ep.id }));
}

export default function PodcastEpisodeScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const episode = getPodcastEpisode(slug);
  const { user } = useAuth();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      void sound?.unloadAsync();
    };
  }, [sound]);

  if (!episode) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={styles.title}>Episode not found</Text>
        <Link href="/podcast">
          <Text style={styles.link}>Back to podcast</Text>
        </Link>
      </Wrapper>
    );
  }

  const locked = episode.isLocked && !user;

  async function toggleAudio() {
    if (!episode?.audioSrc || locked) return;
    if (sound) {
      if (playing) {
        await sound.pauseAsync();
        setPlaying(false);
      } else {
        await sound.playAsync();
        setPlaying(true);
      }
      return;
    }
    const uri = assetUrl(episode.audioSrc)!;
    const { sound: next } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true },
    );
    setSound(next);
    setPlaying(true);
  }

  return (
    <>
      <Stack.Screen options={{ title: episode.title }} />
      <Wrapper style={styles.wrap} variant="narrow">
        <Text style={styles.eyebrow}>
          Episode {episode.episodeNumber ?? episode.id}
        </Text>
        <Text style={styles.title}>{episode.title}</Text>
        <Text style={styles.meta}>
          {formatDate(episode.pubDate)}
          {episode.duration ? ` · ${episode.duration}` : ""}
          {" · "}
          {formatAuthorName(episode.author)}
        </Text>
        <Text style={styles.description}>{episode.description}</Text>
        {assetUrl(episode.image?.url) ? (
          <Image
            source={{ uri: assetUrl(episode.image?.url)! }}
            style={styles.hero}
            resizeMode="cover"
            accessibilityLabel={episode.image?.alt || episode.title}
          />
        ) : null}

        {locked ? (
          <View style={styles.gate}>
            <Text style={styles.gateTitle}>Members episode</Text>
            <Text style={styles.gateCopy}>
              Subscribe to unlock the full interview audio and transcript.
            </Text>
            <Link href="/pricing">
              <Text style={styles.link}>View membership plans</Text>
            </Link>
          </View>
        ) : episode.audioSrc ? (
          <Pressable style={styles.playBtn} onPress={toggleAudio}>
            <Text style={styles.playLabel}>{playing ? "Pause" : "Play episode"}</Text>
          </Pressable>
        ) : null}

        {!locked ? <ArticleBody html={episode.body} /> : null}
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: Colors.accent700,
    fontWeight: "600",
  },
  title: { fontSize: 34, lineHeight: 40, fontWeight: "300", color: Colors.base900 },
  meta: { fontSize: 13, color: Colors.base500 },
  description: { fontSize: 17, lineHeight: 28, color: Colors.base600 },
  hero: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderWidth: 1,
    borderColor: Colors.base200,
    marginVertical: 8,
  },
  playBtn: {
    alignSelf: "flex-start",
    backgroundColor: Colors.base900,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 2,
    marginVertical: 8,
  },
  playLabel: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  gate: {
    borderWidth: 1,
    borderColor: Colors.base200,
    padding: 20,
    gap: 8,
    backgroundColor: Colors.base50,
    marginVertical: 12,
  },
  gateTitle: { fontSize: 18, color: Colors.base900 },
  gateCopy: { fontSize: 14, color: Colors.base600, lineHeight: 22 },
  link: { color: Colors.accent700, fontWeight: "600" },
});
