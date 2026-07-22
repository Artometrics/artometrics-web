import {
  Image,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";

type Props = {
  style?: StyleProp<TextStyle>;
  size?: number;
  compact?: number;
  containerStyle?: StyleProp<ViewStyle>;
  /** Left-aligned brand (NYT / Art Newspaper style). */
  align?: "left" | "center";
};

export function Logo({
  style,
  size = 36,
  compact,
  containerStyle,
  align = "left",
}: Props) {
  const { logoCompact } = useChrome();
  const { mode, colors } = useTheme();
  const progress = Math.max(0, Math.min(1, compact ?? logoCompact));
  const markSize = Math.round(size * (0.95 + progress * 0.2));
  const wordOpacity = 1 - progress;
  const markOpacity = progress;
  const mark =
    mode === "dark"
      ? assetUrl("/images/brand/chomsky-a-white.png")
      : assetUrl("/images/brand/chomsky-a-black.png");
  const isLeft = align === "left";

  return (
    <View
      style={[
        styles.wrap,
        isLeft ? styles.wrapLeft : styles.wrapCenter,
        {
          height: Math.max(size, markSize) + 2,
          minWidth: progress > 0.85 ? markSize : isLeft ? undefined : 40,
        },
        containerStyle,
      ]}
      accessibilityLabel="Artometrics"
    >
      <Text
        style={[
          {
            fontFamily: "Chomsky",
            fontSize: size,
            color: colors.text,
            letterSpacing: 0.5,
            opacity: wordOpacity,
            textAlign: isLeft ? "left" : "center",
          },
          // Hide wordmark from layout when fully compact so A sits far left
          progress > 0.92 ? { position: "absolute", width: 1, height: 1, opacity: 0 } : null,
          style,
        ]}
        numberOfLines={1}
      >
        Artometrics
      </Text>
      {mark && markOpacity > 0.01 ? (
        <Image
          source={{ uri: mark }}
          style={[
            isLeft ? styles.markLeft : styles.markCenter,
            {
              width: markSize,
              height: markSize,
              opacity: markOpacity,
            },
          ]}
          resizeMode="contain"
        />
      ) : null}
      {!mark && markOpacity > 0.01 ? (
        <Text
          style={[
            isLeft ? styles.fallbackLeft : styles.fallbackCenter,
            {
              fontSize: markSize,
              opacity: markOpacity,
              lineHeight: markSize * 1.05,
              color: Colors.accent600,
            },
          ]}
        >
          A
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    minWidth: 40,
  },
  wrapLeft: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  wrapCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  markLeft: { position: "absolute", left: 0, top: 0 },
  markCenter: { position: "absolute" },
  fallbackLeft: { position: "absolute", left: 0, fontFamily: "Chomsky" },
  fallbackCenter: { position: "absolute", fontFamily: "Chomsky" },
});
