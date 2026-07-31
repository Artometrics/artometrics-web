import {
  Image,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { Colors } from "@/constants/Colors";
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
  className?: string;
  containerClassName?: string;
};

/**
 * Artometrics wordmark — Swiss (Anton) or Magazine (Chomsky) via brand style.
 */
export function Logo({
  style,
  size = 36,
  compact = 0,
  containerStyle,
  align = "left",
  markVariant = "auto",
  showWordmark = true,
  className,
  containerClassName,
}: Props) {
  const { mode, brandStyle } = useTheme();
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
  const isLeft = align === "left";
  const isMagazine = brandStyle === "magazine";
  const alignClass = isLeft ? "items-start" : "items-center";
  const forcedWordColor = markVariant !== "auto" ? markColor : undefined;

  if (useMark) {
    return (
      <View
        className={[
          "min-w-10 justify-center",
          alignClass,
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={[{ height: markSize + 2, width: markSize + 4 }, containerStyle]}
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
            className="font-wordmark text-accent"
            style={{ fontSize: markSize, lineHeight: markSize * 1.05 }}
          >
            A.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View
      className={[
        "min-w-10 flex-row items-center justify-center gap-2",
        alignClass,
        containerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
      style={[{ height: Math.max(size + 2, markSize + 2) }, containerStyle]}
      accessibilityLabel="Artometrics"
    >
      {showWordmark ? (
        <Text
          className={[
            "font-wordmark",
            markVariant === "auto" ? "text-fg" : "",
            isMagazine ? "tracking-wide" : "uppercase tracking-wider",
            isLeft ? "text-left" : "text-center",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={[
            {
              fontSize: size * (isMagazine ? 0.88 : 0.92),
              color: forcedWordColor,
            },
            style,
          ]}
          numberOfLines={1}
        >
          Artometrics
          {!isMagazine ? <Text className="text-accent">.</Text> : null}
        </Text>
      ) : null}
    </View>
  );
}
