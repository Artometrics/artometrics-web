import { View } from "react-native";

export function StoryProgress({
  count,
  index,
}: {
  count: number;
  index: number;
}) {
  return (
    <View className="flex-row gap-1 px-1">
      {Array.from({ length: count }, (_, i) => (
        <View key={i} className="h-[2.5px] flex-1 overflow-hidden rounded-[2px] bg-white/30">
          <View
            className="h-full rounded-[2px] bg-white/90"
            style={{ width: i < index ? "100%" : i === index ? "55%" : "0%" }}
          />
        </View>
      ))}
    </View>
  );
}
