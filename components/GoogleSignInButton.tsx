import { Pressable, Text, StyleSheet, View } from "react-native";
import { useTheme } from "@/lib/theme";

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
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.btn,
        {
          borderColor: colors.border,
          backgroundColor: colors.bgElevated,
          opacity: disabled ? 0.6 : 1,
        },
      ])}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.row}>
        <Text style={[styles.g, { color: colors.text }]}>G</Text>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: "stretch",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 2,
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  g: {
    fontSize: 16,
    fontWeight: "700",
    width: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
