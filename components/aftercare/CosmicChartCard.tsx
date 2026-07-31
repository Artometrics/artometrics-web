import { Platform, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import type { PlanetMeta } from "@/lib/aftercare/planets";

const chipBackdrop =
  Platform.OS === "web" ? ({ backdropFilter: "blur(12px)" } as object) : null;
const cardBackdrop =
  Platform.OS === "web" ? ({ backdropFilter: "blur(16px)" } as object) : null;

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
    <View className="w-full gap-3">
      <View className="flex-row flex-wrap justify-between gap-2">
        <View
          className="flex-row items-center gap-2 rounded-2xl border border-white/10 bg-[rgba(20,20,24,0.72)] px-3 py-2"
          style={chipBackdrop}
        >
          <View className="h-[7px] w-[7px] rounded-full bg-[#D4FF44]" />
          <Text className="text-[10px] font-extrabold tracking-[1px] text-inverse">
            DISCOVER YOUR SEASON
          </Text>
        </View>
        {profileLabel ? (
          <View className="max-w-[48%] rounded-2xl border border-white/10 bg-[rgba(20,20,24,0.72)] px-3 py-2">
            <Text className="text-[11px] text-[rgba(245,240,230,0.8)]" numberOfLines={1}>
              {profileLabel}
            </Text>
          </View>
        ) : null}
      </View>

      <View
        className="min-h-[280px] gap-2.5 rounded-[28px] border border-white/10 bg-[rgba(18,18,22,0.78)] p-5"
        style={cardBackdrop}
      >
        <Text className="text-xs leading-[18px] text-[rgba(245,240,230,0.55)]">{eyebrow}</Text>
        <View className="my-2 h-[200px] w-[200px] items-center justify-center self-center">
          <View
            className="absolute h-[100px] w-[180px] rounded-[90px] border border-white/45"
            style={{ transform: [{ rotate: "-18deg" }] }}
          />
          <View className="absolute h-[140px] w-[140px] rounded-[70px] border border-white/15" />
          <Image
            source={{ uri: planet.imageUrl }}
            className="h-[72px] w-[72px] rounded-full"
            contentFit="cover"
            transition={200}
          />
          <View
            className="absolute top-7 right-[42px] h-2 w-2 rounded-full"
            style={{ backgroundColor: planet.glow }}
          />
        </View>
        <View className="flex-row flex-wrap items-baseline gap-2.5">
          <Text className="text-[40px] font-extrabold tracking-[-0.5px]" style={{ color: planet.glow }}>
            {planet.id}
          </Text>
          <Text className="text-[13px] text-[rgba(245,240,230,0.5)]">{planet.houseHint}</Text>
        </View>
        <Text className="text-[13px] leading-5 text-[rgba(245,240,230,0.7)]">{planet.vibe}</Text>
      </View>

      {onContinue ? (
        <Pressable
          onPress={onContinue}
          className="items-center self-stretch rounded-full bg-inverse py-3.5"
          accessibilityLabel="Continue"
        >
          <Text className="text-lg font-bold text-[#0A0A0A]">→</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
