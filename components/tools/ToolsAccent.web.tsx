import { useEffect, useRef } from "react";
import { View } from "react-native";

/** Subtle animated accent beam under Tools titles (web-only motion polish). */
export function ToolsAccent() {
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
      className="mt-1 mb-2 h-[3px] w-[120px] bg-accent"
      style={{ transformOrigin: "left center" }}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}
