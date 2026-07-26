import { Platform, Text, TextInput, View, StyleSheet } from "react-native";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

export function StudioDateField({
  label,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textSubtle}
        autoCapitalize="none"
        autoCorrect={false}
        {...(Platform.OS === "web" ? ({ type: "date" } as object) : null)}
        style={StyleSheet.flatten([
          styles.input,
          {
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.bgElevated,
          },
        ])}
      />
    </View>
  );
}

export function StudioTimeField({
  label,
  value,
  onChange,
  placeholder = "HH:MM",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textSubtle}
        autoCapitalize="none"
        autoCorrect={false}
        {...(Platform.OS === "web" ? ({ type: "time" } as object) : null)}
        style={StyleSheet.flatten([
          styles.input,
          {
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.bgElevated,
          },
        ])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.serif,
    fontSize: 16,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
});
