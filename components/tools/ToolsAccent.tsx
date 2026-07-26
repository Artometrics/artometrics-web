import { View, StyleSheet } from "react-native";
import { useTheme } from "@/lib/theme";

/** Native fallback — static accent rule. */
export function ToolsAccent() {
  const { colors } = useTheme();
  return <View style={[styles.beam, { backgroundColor: colors.accent }]} />;
}

const styles = StyleSheet.create({
  beam: { height: 3, width: 120, marginTop: 4, marginBottom: 8 },
});
