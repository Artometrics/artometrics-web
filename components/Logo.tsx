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

type Props = {
  style?: StyleProp<TextStyle>;
  size?: number;
  /** Force compact mark (0–1). Defaults to chrome scroll progress. */
  compact?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

const MARK = assetUrl("/images/brand/chomsky-a-mark.png");

export function Logo({ style, size = 36, compact, containerStyle }: Props) {
  const { logoCompact } = useChrome();
  const progress = Math.max(0, Math.min(1, compact ?? logoCompact));
  const markSize = Math.round(size * (0.95 + progress * 0.35));
  const wordOpacity = 1 - progress;
  const markOpacity = progress;

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
            color: Colors.base900,
            letterSpacing: 0.5,
            opacity: wordOpacity,
          },
          style,
        ]}
      >
        Artometrics
      </Text>
      {MARK && markOpacity > 0.01 ? (
        <Image
          source={{ uri: MARK }}
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
      {!MARK && markOpacity > 0.01 ? (
        <Text
          style={[
            styles.fallbackA,
            {
              fontSize: markSize,
              opacity: markOpacity,
              lineHeight: markSize * 1.05,
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
  mark: {
    position: "absolute",
  },
  fallbackA: {
    position: "absolute",
    fontFamily: "Chomsky",
    color: Colors.accent600,
  },
});
