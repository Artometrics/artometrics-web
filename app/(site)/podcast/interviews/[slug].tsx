import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Link, useLocalSearchParams } from "expo-router";
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
import { apiFetch } from "@/lib/supabase/client";

export async function generateStaticParams() {
  return getPodcastEpisodes().map((ep) => ({ slug: ep.id }));
}

export default function PodcastEpisodeScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const episode = getPodcastEpisode(slug);
  const { user, loading: authLoading } = useAuth();
  const [subActive, setSubActive] = useState(false);
  const [memberHtml, setMemberHtml] = useState<string | null>(null);
  const [gateLoading, setGateLoading] = useState(Boolean(episode?.isLocked));

  useEffect(() => {
    let cancelled = false;
    async function loadMemberAccess() {
      if (!episode?.isLocked) {
        setGateLoading(false);
        return;
      }
      if (authLoading) return;
      if (!user) {
        if (!cancelled) {
          setSubActive(false);
          setMemberHtml(null);
          setGateLoading(false);
        }
        return;
      }
      setGateLoading(true);
      try {
        const statusRes = await apiFetch("subscription-status");
        if (!statusRes.ok) {
          if (!cancelled) setSubActive(false);
          return;
        }
        const status = (await statusRes.json()) as { active?: boolean };
        if (!status.active) {
          if (!cancelled) setSubActive(false);
          return;
        }
        if (!cancelled) setSubActive(true);
        const epRes = await apiFetch(
          `member-episode?slug=${encodeURIComponent(episode.id)}`,
        );
        if (epRes.ok) {
          const data = (await epRes.json()) as { html?: string };
          if (!cancelled) setMemberHtml(data.html ?? "");
        }
      } catch {
        if (!cancelled) setSubActive(false);
      } finally {
        if (!cancelled) setGateLoading(false);
      }
    }
    void loadMemberAccess();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user, episode?.id, episode?.isLocked]);

  const locked = Boolean(episode?.isLocked && !subActive);
  const bodyHtml = episode?.isLocked ? memberHtml : episode?.body;
  const audioUri = !locked ? assetUrl(episode?.audioSrc) : undefined;
  const player = useAudioPlayer(audioUri);
  const status = useAudioPlayerStatus(player);

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

  function toggleAudio() {
    if (!audioUri) return;
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  }

  return (
    <>
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

        {gateLoading ? (
          <Text style={styles.gateCopy}>Checking membership…</Text>
        ) : locked ? (
          <View style={styles.gate}>
            <Text style={styles.gateTitle}>Members episode</Text>
            <Text style={styles.gateCopy}>
              Subscribe to unlock the full interview audio and transcript.
            </Text>
            <Link href="/pricing">
              <Text style={styles.link}>View membership plans</Text>
            </Link>
          </View>
        ) : audioUri ? (
          <Pressable style={styles.playBtn} onPress={toggleAudio}>
            <Text style={styles.playLabel}>
              {status.playing ? "Pause" : "Play episode"}
            </Text>
          </Pressable>
        ) : null}

        {!locked && bodyHtml ? <ArticleBody html={bodyHtml} /> : null}
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
