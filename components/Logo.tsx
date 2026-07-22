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
};

export function Logo({ style, size = 36, compact, containerStyle }: Props) {
  const { logoCompact } = useChrome();
  const { mode, colors } = useTheme();
  const progress = Math.max(0, Math.min(1, compact ?? logoCompact));
  const markSize = Math.round(size * (0.95 + progress * 0.35));
  const wordOpacity = 1 - progress;
  const markOpacity = progress;
  const mark =
    mode === "dark"
      ? assetUrl("/images/brand/chomsky-a-white.png")
      : assetUrl("/images/brand/chomsky-a-black.png");

  return (
    <View
      style={[
        styles.wrap,
        {
          height: Math.max(size, markSize) + 2,
          minWidth: progress > 0.85 ? markSize : undefined,
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
          },
          style,
        ]}
      >
        Artometrics
      </Text>
      {mark && markOpacity > 0.01 ? (
        <Image
          source={{ uri: mark }}
          style={[
            styles.mark,
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
            styles.fallbackA,
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
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
  },
  mark: { position: "absolute" },
  fallbackA: { position: "absolute", fontFamily: "Chomsky" },
});
