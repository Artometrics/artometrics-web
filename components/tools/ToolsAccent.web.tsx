import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/lib/theme";

/** Subtle animated accent beam under Tools titles (web-only motion polish). */
export function ToolsAccent() {
  const { colors } = useTheme();
  const ref = useRef<View>(null);

  useEffect(() => {
    const node = ref.current as unknown as HTMLElement | null;
    if (!node?.animate) return;
    const anim = node.animate(
      [
        { transform: "scaleX(0.2)", opacity: 0.4 },
        { transform: "scaleX(1)", opacity: 1 },
        { transform: "scaleX(0.55)", opacity: 0.7 },
      ],
      { duration: 2400, iterations: Infinity, direction: "alternate", easing: "ease-in-out" },
    );
    return () => anim.cancel();
  }, []);

  return (
    <View
      ref={ref}
      style={StyleSheet.flatten([styles.beam, { backgroundColor: colors.accent }])}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}

const styles = StyleSheet.create({
  beam: {
    height: 3,
    width: 120,
    marginTop: 4,
    marginBottom: 8,
    transformOrigin: "left center",
  },
});
