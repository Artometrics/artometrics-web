import { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { Link, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { ArticleBody } from "@/components/ArticleBody";
import { assetUrl } from "@/lib/assets";
import {
  formatAuthorName,
  formatDate,
  getPodcastEpisode,
  getPodcastEpisodes,
} from "@/lib/content";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";
import { paramString } from "@/lib/params";

export async function generateStaticParams() {
  return getPodcastEpisodes().map((ep) => ({ slug: ep.id }));
}

export default function PodcastEpisodeScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = paramString(params.slug);
  const episode = getPodcastEpisode(slug);
  const { user, loading: authLoading } = useAuth();
  const [subActive, setSubActive] = useState(false);
  const [memberHtml, setMemberHtml] = useState<string | null>(null);
  const [memberError, setMemberError] = useState<string | null>(null);
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
          setMemberError(null);
          setGateLoading(false);
        }
        return;
      }
      setGateLoading(true);
      setMemberError(null);
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
        } else if (!cancelled) {
          setMemberHtml(null);
          setMemberError("Could not load the member transcript. Pull to refresh or try again.");
        }
      } catch {
        if (!cancelled) {
          setSubActive(false);
          setMemberError(null);
        }
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
      <Wrapper className="gap-3 py-10">
        <Text className="text-[34px] leading-10 font-light text-fg">Episode not found</Text>
        <Link href="/podcast">
          <Text className="font-semibold text-accent">Back to podcast</Text>
        </Link>
      </Wrapper>
    );
  }

  async function toggleAudio() {
    if (!audioUri) return;
    if (status.playing) {
      try {
        player.pause();
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: false,
      });
    } catch {
      /* mode setup is best-effort */
    }
    try {
      player.play();
    } catch {
      /* invalid URI / not loaded yet */
    }
  }

  return (
    <Wrapper variant="narrow" className="gap-3 py-10">
      <Text className="text-[11px] tracking-[2.5px] uppercase font-semibold text-accent">
        Episode {episode.episodeNumber ?? episode.id}
      </Text>
      <Text className="text-[34px] leading-10 font-light text-fg">{episode.title}</Text>
      <Text className="text-[13px] text-subtle">
        {formatDate(episode.pubDate)}
        {episode.duration ? ` · ${episode.duration}` : ""}
        {" · "}
        {formatAuthorName(episode.author)}
      </Text>
      <Text className="text-[17px] leading-7 text-muted">{episode.description}</Text>
      {assetUrl(episode.image?.url) ? (
        <Image
          source={{ uri: assetUrl(episode.image?.url)! }}
          className="w-full aspect-video border border-border my-2"
          contentFit="cover"
          transition={200}
          accessibilityLabel={episode.image?.alt || episode.title}
        />
      ) : null}

      {gateLoading ? (
        <Text className="text-sm leading-[22px] text-muted">Checking membership…</Text>
      ) : locked ? (
        <View className="border border-border p-5 gap-2 my-3 bg-bg-elevated">
          <Text className="text-lg text-fg">Members episode</Text>
          <Text className="text-sm leading-[22px] text-muted">
            Subscribe to unlock the full interview audio and transcript.
          </Text>
          <Link href="/pricing">
            <Text className="font-semibold text-accent">View membership plans</Text>
          </Link>
        </View>
      ) : audioUri ? (
        <Pressable
          className="self-start px-[18px] py-3 rounded-btn my-2 bg-fg"
          onPress={toggleAudio}
        >
          <Text className="text-xs font-bold tracking-[1.5px] uppercase text-bg">
            {status.playing ? "Pause" : "Play episode"}
          </Text>
        </Pressable>
      ) : null}

      {!locked && memberError ? (
        <Text className="text-sm leading-[22px] text-accent">{memberError}</Text>
      ) : null}

      {!locked && bodyHtml ? <ArticleBody html={bodyHtml} /> : null}
    </Wrapper>
  );
}
