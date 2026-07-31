import { useState } from "react";
import { LayoutChangeEvent, Platform, View } from "react-native";

type Props = {
  colors: string[];
  height?: number;
  className?: string;
};

/**
 * Palette strip — Skia Canvas on native, View fallback on web / if Skia fails.
 */
export function PaletteSkiaStrip({ colors, height = 48, className }: Props) {
  const [width, setWidth] = useState(0);

  if (!colors.length) return null;

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  if (Platform.OS !== "web" && width > 0) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Skia = require("@shopify/react-native-skia") as typeof import("@shopify/react-native-skia");
      const { Canvas, Rect } = Skia;
      const slice = width / colors.length;
      return (
        <View
          className={className}
          style={{ height, width: "100%" }}
          onLayout={onLayout}
        >
          <Canvas style={{ width, height }}>
            {colors.map((c, i) => (
              <Rect
                key={`${c}-${i}`}
                x={i * slice}
                y={0}
                width={slice}
                height={height}
                color={c}
              />
            ))}
          </Canvas>
        </View>
      );
    } catch {
      /* fall through */
    }
  }

  return (
    <View
      className={["flex-row overflow-hidden", className].filter(Boolean).join(" ")}
      style={{ height }}
      onLayout={onLayout}
    >
      {colors.map((c, i) => (
        <View key={`${c}-${i}`} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </View>
  );
}
