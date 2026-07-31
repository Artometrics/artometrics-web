import { Platform, Text, View } from "react-native";
import { Image } from "expo-image";
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
    <View
      className={[
        "items-center gap-2.5 overflow-hidden rounded border border-[rgba(245,240,230,0.12)] bg-[#121214]",
        compact ? "px-3.5 py-[18px]" : "px-5 py-7",
      ].join(" ")}
    >
      {dateLabel ? (
        <Text className="self-start text-[10px] font-semibold uppercase tracking-[2px] text-[rgba(245,240,230,0.45)]">
          {dateLabel}
        </Text>
      ) : null}
      <View className="my-3 items-center justify-center" style={{ width: size, height: size }}>
        <View
          className="absolute border border-[rgba(245,240,230,0.35)]"
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
        <View
          className={[
            "absolute border border-[rgba(245,240,230,0.18)]",
            Platform.OS === "web" ? "border-dashed" : "border-solid",
          ].join(" ")}
          style={{
            width: size * 0.86,
            height: size * 0.86,
            borderRadius: (size * 0.86) / 2,
          }}
        />
        <View
          className="absolute border border-[rgba(245,240,230,0.2)]"
          style={{
            width: size * 0.72,
            height: size * 0.72,
            transform: [{ rotate: "18deg" }],
          }}
        />
        <Image
          source={{ uri: planet.imageUrl }}
          style={{
            width: size * 0.62,
            height: size * 0.62,
            borderRadius: (size * 0.62) / 2,
          }}
          contentFit="cover"
          transition={200}
          accessibilityLabel={planet.id}
        />
        <View
          className="absolute opacity-25"
          style={[
            {
              shadowColor: planet.glow,
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: size * 0.25,
            },
            Platform.OS === "web"
              ? ({ boxShadow: "0 0 40px rgba(232,165,75,0.35)" } as object)
              : { shadowOpacity: 0.4, shadowRadius: 24 },
          ]}
        />
      </View>
      <Text className="font-wordmark mt-2 text-center text-[28px] tracking-[4px] text-inverse">
        {seasonTitle}
      </Text>
      <Text className="text-[11px] font-bold uppercase tracking-[3px] text-[rgba(245,240,230,0.55)]">
        {planet.id.toUpperCase()}
      </Text>
      <Text className="mt-1 text-center text-xs font-semibold uppercase tracking-[1.6px] text-inverse">
        {seasonLine}
      </Text>
      <Text className="mt-1 max-w-[280px] text-center text-[13px] leading-5 text-[rgba(245,240,230,0.62)]">
        {planet.prompt}
      </Text>
    </View>
  );
}
