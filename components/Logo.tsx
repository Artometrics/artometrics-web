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
import { useTheme } from "@/lib/theme";

type Props = {
  style?: StyleProp<TextStyle>;
  size?: number;
  /** Force compact Chomsky A (0–1). Omit to always show full wordmark. */
  compact?: number;
  containerStyle?: StyleProp<ViewStyle>;
  align?: "left" | "center";
  /** Override mark color for dark footers while site is in light mode. */
  markVariant?: "auto" | "light" | "dark";
  /** Show wordmark text. Default true when not fully compact. */
  showWordmark?: boolean;
};

/**
 * Artometrics brand mark. Scroll morph is opt-in via `compact`;
 * Complex chrome uses the full wordmark (no morph) to avoid layout jumps.
 */
export function Logo({
  style,
  size = 36,
  compact = 0,
  containerStyle,
  align = "left",
  markVariant = "auto",
  showWordmark = true,
}: Props) {
  const { mode, colors } = useTheme();
  const progress = Math.max(0, Math.min(1, compact));
  const markSize = Math.round(size * (0.95 + progress * 0.15));
  const useMark = progress > 0.5;
  const markMode =
    markVariant === "auto" ? mode : markVariant === "light" ? "dark" : "light";
  // markVariant "light" → white A (for dark surfaces); "dark" → black A
  const mark =
    markMode === "dark"
      ? assetUrl("/images/brand/chomsky-a-white.png")
      : assetUrl("/images/brand/chomsky-a-black.png");
  const isLeft = align === "left";

  if (useMark) {
    return (
      <View
        style={[
          styles.wrap,
          isLeft ? styles.wrapLeft : styles.wrapCenter,
          { height: markSize + 2, width: markSize + 4 },
          containerStyle,
        ]}
        accessibilityLabel="Artometrics"
      >
        {mark ? (
          <Image
            source={{ uri: mark }}
            style={{ width: markSize, height: markSize }}
            resizeMode="contain"
          />
        ) : (
          <Text
            style={{
              fontFamily: "Chomsky",
              fontSize: markSize,
              lineHeight: markSize * 1.05,
              color: Colors.accent600,
            }}
          >
            A
          </Text>
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrap,
        isLeft ? styles.wrapLeft : styles.wrapCenter,
        { height: size + 2 },
        containerStyle,
      ]}
      accessibilityLabel="Artometrics"
    >
      {showWordmark ? (
        <Text
          style={[
            {
              fontFamily: "Chomsky",
              fontSize: size,
              color: colors.text,
              letterSpacing: 0.5,
              textAlign: isLeft ? "left" : "center",
            },
            style,
          ]}
          numberOfLines={1}
        >
          Artometrics
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minWidth: 40,
    justifyContent: "center",
  },
  wrapLeft: {
    alignItems: "flex-start",
  },
  wrapCenter: {
    alignItems: "center",
  },
});
