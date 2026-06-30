import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import EpisodeCard from "@/components/EpisodeCard";
import ErrorState from "@/components/ErrorState";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { fetchFeed } from "@/lib/api";
import type { FeedEpisode } from "@/lib/types";

export default function ListenScreen() {
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];
  const [episodes, setEpisodes] = useState<FeedEpisode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const feed = await fetchFeed();
      setEpisodes(feed.episodes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load episodes");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.tint} />
      </View>
    );
  }

  if (error) {
    return <ErrorState title="Could not load episodes" message={error} onRetry={load} />;
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            void load();
          }}
          tintColor={colors.tint}
        />
      }
    >
      <Text style={[styles.title, { color: colors.text }]}>Listen</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>
        Interview episodes from Artometrics. Audio plays here once files are published on the
        site.
      </Text>
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </ScrollView>
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
  },
  title: {
    fontSize: 28,
    fontFamily: "Georgia",
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 20,
  },
});
