import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { deckLine, formatDate, heroImageUrl } from "@/lib/api";
import type { FeedReport } from "@/lib/types";

interface Props {
  report: FeedReport;
  badge?: string;
}

export default function ReportCard({ report, badge }: Props) {
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];
  const image = heroImageUrl(report.heroImage);

  return (
    <Link href={`/report/${report.slug}`} asChild>
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
        {image ? <Image source={{ uri: image }} style={styles.image} resizeMode="cover" /> : null}
        <View style={styles.body}>
          <Text style={[styles.meta, { color: colors.muted }]}>
            {formatDate(report.pubDate)}
            {report.tags[0] ? ` · ${report.tags[0]}` : ""}
          </Text>
          {badge ? (
            <Text style={[styles.badge, { color: colors.tint }]}>{badge}</Text>
          ) : null}
          <Text style={[styles.title, { color: colors.text }]}>{report.title}</Text>
          <Text style={[styles.deck, { color: colors.muted }]} numberOfLines={3}>
            {deckLine(report.description)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 160,
  },
  body: {
    padding: 16,
    gap: 6,
  },
  meta: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  badge: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "Georgia",
  },
  deck: {
    fontSize: 14,
    lineHeight: 20,
  },
});
