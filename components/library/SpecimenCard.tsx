import { Pressable, Text, View, Linking } from "react-native";
import { Image } from "expo-image";
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
      className={[
        "bg-white rounded-md overflow-hidden border border-base-900",
        width ? "" : "basis-[260px] grow max-w-[340px]",
      ]
        .filter(Boolean)
        .join(" ")}
      style={width ? { width } : undefined}
    >
      <View className="h-[180px] items-center justify-center p-3" style={{ backgroundColor: bg }}>
          <Text className="absolute top-2.5 left-3 text-[10px] font-bold tracking-wide text-white/85">
            {year}
          </Text>
          {img ? (
            <Image
              source={{ uri: img }}
              className="w-[120px] h-[120px] rounded-lg border-2 border-white/35"
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View className="w-24 h-24 rounded-full bg-black/25 items-center justify-center border border-white/35">
              <Text className="text-white font-display text-[42px]">{title.slice(0, 1)}</Text>
            </View>
          )}
          <Text className="absolute bottom-2.5 right-3 text-[10px] font-semibold tracking-[0.6px] text-white/85">
            {idTag}
          </Text>
        </View>
        <View className="p-3.5 gap-1.5 bg-white">
          <Text
            className="font-sans text-[22px] font-extrabold tracking-[0.5px] text-base-900 mb-1.5"
            numberOfLines={2}
          >
            {title}
          </Text>
          {stats.map((s) => (
            <View key={s.label} className="flex-row items-center gap-2 py-[3px] border-b border-base-200">
              <Text className="w-[72px] text-[9px] font-extrabold tracking-[0.8px] text-base-500">
                {s.label}
              </Text>
              <Text className="flex-1 text-[11px] font-bold text-base-900" numberOfLines={1}>
                {s.value}
              </Text>
              {typeof s.scale === "number" ? (
                <View className="w-12 h-0.5 bg-base-900 relative">
                  <View
                    className="absolute -top-[3px] -ml-[3px] w-2 h-2 bg-base-900"
                    style={{ left: `${Math.round(s.scale * 100)}%` }}
                  />
                </View>
              ) : (
                <View className="w-12" />
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
      className="max-w-[340px] grow basis-[260px] overflow-hidden border-2 border-white bg-white"
    >
      <View className="h-[180px] items-center justify-center p-3" style={{ backgroundColor: bg }}>
          <Text className="absolute top-2.5 left-3 text-[10px] font-bold tracking-wide text-white/85">
            DESK
          </Text>
          <View className="h-24 w-24 items-center justify-center border-2 border-white/35 bg-black/25">
            <Text className="font-display text-[42px] text-white">
              {title.slice(0, 1).toUpperCase()}
            </Text>
          </View>
          <Text className="absolute bottom-2.5 right-3 text-[10px] font-semibold tracking-[0.6px] text-white/85">
            {String(index + 1).padStart(2, "0")}
          </Text>
        </View>
        <View className="p-3.5 gap-1.5 bg-white">
          <Text
            className="font-sans text-[22px] font-extrabold tracking-[0.5px] text-base-900 mb-1.5"
            numberOfLines={2}
          >
            {title.toUpperCase()}
          </Text>
          {stats.map((s) => (
            <View key={s.label} className="flex-row items-center gap-2 py-[3px] border-b border-base-200">
              <Text className="w-[72px] text-[9px] font-extrabold tracking-[0.8px] text-base-500">
                {s.label}
              </Text>
              <Text className="flex-1 text-[11px] font-bold text-base-900" numberOfLines={1}>
                {s.value}
              </Text>
              {typeof s.scale === "number" ? (
                <View className="w-12 h-0.5 bg-base-900 relative">
                  <View
                    className="absolute -top-[3px] -ml-[3px] w-2 h-2 bg-base-900"
                    style={{ left: `${Math.round(s.scale * 100)}%` }}
                  />
                </View>
              ) : (
                <View className="w-12" />
              )}
            </View>
          ))}
        </View>
    </Pressable>
  );
}
