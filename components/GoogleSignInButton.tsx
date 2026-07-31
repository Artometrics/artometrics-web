import { Pressable, Text, View } from "react-native";

type Props = {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
};

/** Outline CTA for Google OAuth — keeps primary email button as the filled action. */
export function GoogleSignInButton({
  label = "Continue with Google",
  onPress,
  disabled,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={[
        "self-stretch rounded-btn border border-border bg-bg-elevated px-5 py-3",
        disabled ? "opacity-60" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View className="flex-row items-center justify-center gap-2.5">
        <Text className="w-5 text-center text-base font-bold text-fg">G</Text>
        <Text className="text-sm font-semibold tracking-wide text-fg">{label}</Text>
      </View>
    </Pressable>
  );
}
