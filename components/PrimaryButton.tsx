import { forwardRef } from "react";
import { Pressable, Text, StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "@/lib/theme";

type Props = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export const PrimaryButton = forwardRef<React.ElementRef<typeof Pressable>, Props>(
  function PrimaryButton({ label, onPress, style, disabled }, ref) {
    const { colors } = useTheme();
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        // Flatten: Link asChild + array styles crash RN Web (Safari).
        style={StyleSheet.flatten([
          styles.btn,
          { backgroundColor: colors.text },
          disabled && styles.disabled,
          style,
        ])}
      >
        <Text style={[styles.label, { color: colors.inverse }]}>{label}</Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 2,
  },
  disabled: { opacity: 0.5 },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
