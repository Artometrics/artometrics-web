import { Text, View } from "react-native";

/** Red ATM monogram block from the Artometrics design system. */
export function AtmMark({ size = "md" }: { size?: "sm" | "md" }) {
  const pad = size === "sm" ? "px-2 py-1" : "px-2.5 py-1.5";
  const type = size === "sm" ? "text-[11px]" : "text-[14px]";
  return (
    <View className={`self-start bg-accent ${pad}`}>
      <Text
        className={`font-mono font-medium tracking-[0.1em] text-white ${type}`}
      >
        A T M
      </Text>
    </View>
  );
}
