import { Text, View } from "react-native";

export function TldrBox({
  tldr,
  keyPoints,
}: {
  tldr?: string | null;
  keyPoints?: string[] | null;
}) {
  const points = (keyPoints ?? []).filter(Boolean);
  if (!tldr && !points.length) return null;

  return (
    <View className="border-l-4 border-l-accent border border-border bg-accent-soft px-4 py-3.5 gap-2 mt-2 mb-2">
      <Text className="text-[11px] font-extrabold tracking-[1.8px] uppercase font-sans text-accent">
        TL;DR
      </Text>
      {tldr ? <Text className="font-sans text-[15px] leading-[22px] text-fg">{tldr}</Text> : null}
      {points.length ? (
        <View className="gap-2 mt-1">
          {points.map((point) => (
            <View key={point} className="flex-row items-start gap-2.5">
              <View className="w-1.5 h-1.5 rounded-full mt-[7px] bg-accent" />
              <Text className="flex-1 font-mono text-[13px] leading-5 text-fg">{point}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
