import { forwardRef } from "react";
import { Pressable, Text, StyleSheet, type ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export const PrimaryButton = forwardRef<React.ElementRef<typeof Pressable>, Props>(
  function PrimaryButton({ label, onPress, style, disabled }, ref) {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        // Flatten: Link asChild + array styles crash RN Web (Safari).
        style={StyleSheet.flatten([styles.btn, disabled && styles.disabled, style])}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    alignSelf: "flex-start",
    backgroundColor: Colors.base900,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 2,
  },
  disabled: { opacity: 0.5 },
  label: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
