import { Image, Platform, Pressable, Text, View, StyleSheet } from "react-native";
import type { PlanetMeta } from "@/lib/aftercare/planets";

/** Discovery-style chart card (ascendant reference) — orbit + planet + house. */
export function CosmicChartCard({
  eyebrow,
  planet,
  onContinue,
  profileLabel,
}: {
  eyebrow: string;
  planet: PlanetMeta;
  onContinue?: () => void;
  profileLabel?: string;
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.luckChip}>
          <View style={styles.luckDot} />
          <Text style={styles.luckText}>DISCOVER YOUR SEASON</Text>
        </View>
        {profileLabel ? (
          <View style={styles.profileChip}>
            <Text style={styles.profileText} numberOfLines={1}>
              {profileLabel}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.cardEyebrow}>{eyebrow}</Text>
        <View style={styles.orbitWrap}>
          <View style={styles.orbit} />
          <View style={styles.orbit2} />
          <Image
            source={{ uri: planet.imageUrl }}
            style={styles.planetImg}
            resizeMode="cover"
          />
          <View style={[styles.star, { backgroundColor: planet.glow }]} />
        </View>
        <View style={styles.nameRow}>
          <Text style={[styles.planetName, { color: planet.glow }]}>{planet.id}</Text>
          <Text style={styles.house}>{planet.houseHint}</Text>
        </View>
        <Text style={styles.vibe}>{planet.vibe}</Text>
      </View>

      {onContinue ? (
        <Pressable onPress={onContinue} style={styles.nextBtn} accessibilityLabel="Continue">
          <Text style={styles.nextArrow}>→</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12, width: "100%" },
  topRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  luckChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(20,20,24,0.72)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    ...(Platform.OS === "web"
      ? ({ backdropFilter: "blur(12px)" } as object)
      : null),
  },
  luckDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#D4FF44",
  },
  luckText: {
    color: "#F5F0E6",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  profileChip: {
    backgroundColor: "rgba(20,20,24,0.72)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    maxWidth: "48%",
  },
  profileText: { color: "rgba(245,240,230,0.8)", fontSize: 11 },
  mainCard: {
    backgroundColor: "rgba(18,18,22,0.78)",
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    gap: 10,
    minHeight: 280,
    ...(Platform.OS === "web"
      ? ({ backdropFilter: "blur(16px)" } as object)
      : null),
  },
  cardEyebrow: {
    color: "rgba(245,240,230,0.55)",
    fontSize: 12,
    lineHeight: 18,
  },
  orbitWrap: {
    alignSelf: "center",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  orbit: {
    position: "absolute",
    width: 180,
    height: 100,
    borderRadius: 90,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.45)",
    transform: [{ rotate: "-18deg" }],
  },
  orbit2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.15)",
  },
  planetImg: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  star: {
    position: "absolute",
    top: 28,
    right: 42,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap",
  },
  planetName: {
    fontSize: 40,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  house: {
    color: "rgba(245,240,230,0.5)",
    fontSize: 13,
  },
  vibe: {
    color: "rgba(245,240,230,0.7)",
    fontSize: 13,
    lineHeight: 20,
  },
  nextBtn: {
    alignSelf: "stretch",
    backgroundColor: "#F5F0E6",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  nextArrow: {
    color: "#0A0A0A",
    fontSize: 18,
    fontWeight: "700",
  },
});
