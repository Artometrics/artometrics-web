import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

/** Slim subscribe strip — Art Newspaper / NYT style. */
export function AppBanner() {
  return (
    <View className="flex-row items-center justify-between gap-3 px-4 py-2 bg-fg">
      <Text className="flex-1 text-xs font-sans text-inverse" numberOfLines={1}>
        Unlimited access to Artometrics reporting.
      </Text>
      <Link href="/pricing" asChild>
        <Pressable hitSlop={8}>
          <Text className="text-xs font-bold underline font-sans text-inverse">Subscribe</Text>
        </Pressable>
      </Link>
    </View>
  );
}
