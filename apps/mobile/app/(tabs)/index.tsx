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
import ReportCard from "@/components/ReportCard";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { fetchFeed, weekReports } from "@/lib/api";
import type { SiteFeed } from "@/lib/types";

export default function HomeScreen() {
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];
  const [feed, setFeed] = useState<SiteFeed | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchFeed();
      setFeed(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load feed");
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

  if (error || !feed) {
    return <ErrorState title="Could not load Artometrics" message={error ?? undefined} onRetry={load} />;
  }

  const featured = feed.reports[0];
  const picks = weekReports(feed.reports.slice(1));

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
      <Text style={[styles.kicker, { color: colors.tint }]}>Artometrics</Text>
      <Text style={[styles.headline, { color: colors.text }]}>
        Data reports on culture, power, and the creative economy
      </Text>

      {featured ? (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.muted }]}>Latest report</Text>
          <ReportCard report={featured} />
        </View>
      ) : null}

      {picks.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.muted }]}>
            This week in Artometrics
          </Text>
          {picks.map((report) => (
            <ReportCard key={report.slug} report={report} />
          ))}
        </View>
      ) : null}

      {feed.episodes[0] ? (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.muted }]}>Latest episode</Text>
          <EpisodeCard episode={feed.episodes[0]} />
        </View>
      ) : null}
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
  kicker: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  headline: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 34,
    fontFamily: "Georgia",
  },
  section: {
    marginTop: 28,
  },
  sectionLabel: {
    marginBottom: 12,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
});
