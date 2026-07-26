import { Image, Pressable, Text, View, StyleSheet, Linking } from "react-native";
import { Fonts } from "@/constants/Colors";
import type { ReferenceItem, ReferenceSource } from "@/lib/reference/catalog";

export type SpecimenStat = {
  label: string;
  value: string;
  /** 0–1 position on the scale bar (optional) */
  scale?: number;
};

function hashHue(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h % 360;
}

function headerColor(item: ReferenceItem & { source: ReferenceSource }) {
  const key = item.style || item.subjects?.[0] || item.source || item.id;
  const hue = hashHue(key);
  return `hsl(${hue} 42% 42%)`;
}

function buildStats(item: ReferenceItem & { source: ReferenceSource }): SpecimenStat[] {
  const subjectCount = item.subjects?.length ?? 0;
  const descLen = (item.description || "").length;
  return [
    { label: "SOURCE", value: item.source.toUpperCase() },
    {
      label: "YEAR",
      value: item.year != null ? String(item.year) : "—",
    },
    {
      label: "FIELD",
      value: (item.style || item.subjects?.[0] || item.source).slice(0, 22),
    },
    {
      label: "AUTHOR",
      value: (item.artist || item.authors?.[0] || "Anon").slice(0, 22),
    },
    {
      label: "DEPTH",
      value: descLen > 120 ? "HIGH" : descLen > 40 ? "MED" : "LIGHT",
      scale: Math.min(1, descLen / 200),
    },
    {
      label: "TAGS",
      value: String(Math.max(subjectCount, item.style ? 1 : 0)),
      scale: Math.min(1, subjectCount / 8),
    },
    {
      label: "OPEN",
      value: item.url || item.downloadUrl ? "YES" : "NO",
      scale: item.url || item.downloadUrl ? 0.85 : 0.15,
    },
  ];
}

/** Encyclopedia specimen card — color header + stats table (genre/reference). */
export function SpecimenCard({
  item,
  width,
}: {
  item: ReferenceItem & { source: ReferenceSource };
  width?: number;
}) {
  const stats = buildStats(item);
  const bg = headerColor(item);
  const title = (item.title || item.label || "Untitled").toUpperCase();
  const idTag = `${item.source.slice(0, 3)}.${item.id.slice(0, 6)}`;
  const year = item.year != null ? String(item.year).replace(/[^\d].*$/, "") || "—" : "—";
  const img = item.imageUrl || item.thumbnail;

  return (
    <Pressable
      onPress={() => {
        const href = item.url || item.downloadUrl || item.imageUrl;
        if (href) void Linking.openURL(href);
      }}
      style={StyleSheet.flatten([styles.card, width ? { width } : styles.cardFlex])}
    >
      <View style={[styles.header, { backgroundColor: bg }]}>
        <Text style={styles.year}>{year}</Text>
        {img ? (
          <Image source={{ uri: img }} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.orbMark}>
            <Text style={styles.orbLetter}>{title.slice(0, 1)}</Text>
          </View>
        )}
        <Text style={styles.idTag}>{idTag}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {stats.map((s) => (
          <View key={s.label} style={styles.statRow}>
            <Text style={styles.statLabel}>{s.label}</Text>
            <Text style={styles.statValue} numberOfLines={1}>
              {s.value}
            </Text>
            {typeof s.scale === "number" ? (
              <View style={styles.scaleTrack}>
                <View style={[styles.scaleThumb, { left: `${Math.round(s.scale * 100)}%` }]} />
              </View>
            ) : (
              <View style={styles.scaleSpacer} />
            )}
          </View>
        ))}
      </View>
    </Pressable>
  );
}

/** Section / genre specimen using desk metadata. */
export function GenreSpecimenCard({
  title,
  subtitle,
  href,
  index,
  onPress,
}: {
  title: string;
  subtitle: string;
  href?: string;
  index: number;
  onPress?: () => void;
}) {
  const hue = (index * 47) % 360;
  const bg = `hsl(${hue} 38% 40%)`;
  const stats: SpecimenStat[] = [
    { label: "DESK", value: "ARTOMETRICS" },
    { label: "TYPE", value: "SECTION" },
    { label: "ROUTE", value: href || "—" },
    { label: "FOCUS", value: subtitle.slice(0, 28) || "—" },
    { label: "WEIGHT", value: "EDITORIAL", scale: 0.7 },
    { label: "OPEN", value: "YES", scale: 0.9 },
  ];

  return (
    <Pressable
      onPress={onPress}
      style={StyleSheet.flatten([styles.card, styles.cardFlex])}
    >
      <View style={[styles.header, { backgroundColor: bg }]}>
        <Text style={styles.year}>DESK</Text>
        <View style={styles.orbMark}>
          <Text style={styles.orbLetter}>{title.slice(0, 1).toUpperCase()}</Text>
        </View>
        <Text style={styles.idTag}>{String(index + 1).padStart(2, "0")}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title.toUpperCase()}
        </Text>
        {stats.map((s) => (
          <View key={s.label} style={styles.statRow}>
            <Text style={styles.statLabel}>{s.label}</Text>
            <Text style={styles.statValue} numberOfLines={1}>
              {s.value}
            </Text>
            {typeof s.scale === "number" ? (
              <View style={styles.scaleTrack}>
                <View style={[styles.scaleThumb, { left: `${Math.round(s.scale * 100)}%` }]} />
              </View>
            ) : (
              <View style={styles.scaleSpacer} />
            )}
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0A0A0A",
  },
  cardFlex: { flexBasis: 260, flexGrow: 1, maxWidth: 340 },
  header: {
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  year: {
    position: "absolute",
    top: 10,
    left: 12,
    color: "rgba(255,255,255,0.85)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  idTag: {
    position: "absolute",
    bottom: 10,
    right: 12,
    color: "rgba(255,255,255,0.85)",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
  },
  orbMark: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  orbLetter: {
    color: "#FFFFFF",
    fontFamily: Fonts.display,
    fontSize: 42,
  },
  body: { padding: 14, gap: 6, backgroundColor: "#FFFFFF" },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#0A0A0A",
    marginBottom: 6,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5E5",
  },
  statLabel: {
    width: 72,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#737373",
  },
  statValue: {
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
    color: "#0A0A0A",
  },
  scaleTrack: {
    width: 48,
    height: 2,
    backgroundColor: "#0A0A0A",
    position: "relative",
  },
  scaleThumb: {
    position: "absolute",
    top: -3,
    marginLeft: -3,
    width: 8,
    height: 8,
    backgroundColor: "#0A0A0A",
  },
  scaleSpacer: { width: 48 },
});
