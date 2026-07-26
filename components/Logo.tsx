import {
  Image,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  StyleSheet,
} from "react-native";
import { Colors, Fonts } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import { useTheme } from "@/lib/theme";

type Props = {
  style?: StyleProp<TextStyle>;
  size?: number;
  /** Force compact A mark (0–1). Omit to always show full wordmark. */
  compact?: number;
  containerStyle?: StyleProp<ViewStyle>;
  align?: "left" | "center";
  /** Override mark color for dark footers while site is in light mode. */
  markVariant?: "auto" | "light" | "dark";
  /** Show wordmark text. Default true when not fully compact. */
  showWordmark?: boolean;
};

/**
 * Artometrics Swiss wordmark — condensed display + signal-red period.
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
  const mark =
    markMode === "dark"
      ? assetUrl("/images/brand/chomsky-a-white.png")
      : assetUrl("/images/brand/chomsky-a-black.png");
  const markColor = markMode === "dark" ? Colors.white : Colors.black;
  const wordColor = markVariant === "auto" ? colors.text : markColor;
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
              fontFamily: Fonts.display,
              fontSize: markSize,
              lineHeight: markSize * 1.05,
              color: Colors.accent500,
            }}
          >
            A.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.wrap,
        styles.wordmarkRow,
        isLeft ? styles.wrapLeft : styles.wrapCenter,
        { height: Math.max(size + 2, markSize + 2) },
        containerStyle,
      ]}
      accessibilityLabel="Artometrics"
    >
      {showWordmark ? (
        <Text
          style={[
            {
              fontFamily: Fonts.display,
              fontSize: size * 0.92,
              color: wordColor,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              textAlign: isLeft ? "left" : "center",
            },
            style,
          ]}
          numberOfLines={1}
        >
          Artometrics
          <Text style={{ color: Colors.accent500 }}>.</Text>
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
  wordmarkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wrapLeft: {
    alignItems: "flex-start",
  },
  wrapCenter: {
    alignItems: "center",
  },
});
