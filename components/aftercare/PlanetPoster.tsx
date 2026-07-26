import { Image, Platform, Text, View, StyleSheet } from "react-native";
import type { PlanetMeta } from "@/lib/aftercare/planets";

/** Celestial “planet poster” card — dark academia, geometry ring, cream type. */
export function PlanetPoster({
  seasonTitle,
  seasonLine,
  planet,
  dateLabel,
  compact = false,
}: {
  seasonTitle: string;
  seasonLine: string;
  planet: PlanetMeta;
  dateLabel?: string;
  compact?: boolean;
}) {
  const size = compact ? 160 : 220;
  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      {dateLabel ? <Text style={styles.date}>{dateLabel}</Text> : null}
      <View style={[styles.orbWrap, { width: size, height: size }]}>
        <View style={[styles.ring, { width: size, height: size, borderRadius: size / 2 }]} />
        <View
          style={[
            styles.ringInner,
            {
              width: size * 0.86,
              height: size * 0.86,
              borderRadius: (size * 0.86) / 2,
            },
          ]}
        />
        {/* Sacred-geometry accents */}
        <View style={[styles.geoBox, { width: size * 0.72, height: size * 0.72 }]} />
        <Image
          source={{ uri: planet.imageUrl }}
          style={{
            width: size * 0.62,
            height: size * 0.62,
            borderRadius: (size * 0.62) / 2,
          }}
          resizeMode="cover"
          accessibilityLabel={planet.id}
        />
        <View
          style={[
            styles.glow,
            {
              shadowColor: planet.glow,
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size * 0.25,
            },
          ]}
        />
      </View>
      <Text style={styles.title}>{seasonTitle}</Text>
      <Text style={styles.planet}>{planet.id.toUpperCase()}</Text>
      <Text style={styles.line}>{seasonLine}</Text>
      <Text style={styles.prompt}>{planet.prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121214",
    borderRadius: 4,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(245,240,230,0.12)",
    overflow: "hidden",
  },
  cardCompact: { paddingVertical: 18, paddingHorizontal: 14 },
  date: {
    alignSelf: "flex-start",
    color: "rgba(245,240,230,0.45)",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  orbWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  ring: {
    position: "absolute",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(245,240,230,0.35)",
  },
  ringInner: {
    position: "absolute",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(245,240,230,0.18)",
    borderStyle: Platform.OS === "web" ? ("dashed" as never) : "solid",
  },
  geoBox: {
    position: "absolute",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(245,240,230,0.2)",
    transform: [{ rotate: "18deg" }],
  },
  glow: {
    position: "absolute",
    opacity: 0.25,
    ...(Platform.OS === "web"
      ? ({ boxShadow: "0 0 40px rgba(232,165,75,0.35)" } as object)
      : { shadowOpacity: 0.4, shadowRadius: 24 }),
  },
  title: {
    color: "#F5F0E6",
    fontFamily: "Chomsky",
    fontSize: 28,
    letterSpacing: 4,
    textAlign: "center",
    marginTop: 8,
  },
  planet: {
    color: "rgba(245,240,230,0.55)",
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: "700",
  },
  line: {
    color: "#F5F0E6",
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 4,
  },
  prompt: {
    color: "rgba(245,240,230,0.62)",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: 280,
    marginTop: 4,
  },
});
