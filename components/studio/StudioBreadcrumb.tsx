import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export type Crumb = { label: string; href?: string };

export function StudioBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <View className="mb-1 flex-row flex-wrap items-center gap-1" accessibilityRole="header">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <View key={`${item.label}-${i}`} className="max-w-full flex-row items-center gap-1">
            {i > 0 ? (
              <Text className="font-sans text-xs text-subtle">/</Text>
            ) : null}
            {item.href && !last ? (
              <Pressable onPress={() => router.push(item.href as `/`)} hitSlop={6}>
                <Text
                  className="font-sans text-xs font-bold uppercase tracking-[0.6px] text-accent"
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </Pressable>
            ) : (
              <Text
                className={[
                  "max-w-[220px] font-sans text-xs font-bold uppercase tracking-[0.6px]",
                  last ? "text-fg" : "text-muted",
                ].join(" ")}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}
