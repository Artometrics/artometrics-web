import LottieView from "lottie-react-native";
import type { StyleProp, ViewStyle } from "react-native";

type Props = {
  source?: object | number;
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
};

/**
 * Lottie wrapper for Studio empty states / brand motion.
 * Pass a local `require("./x.json")` when assets are added.
 */
export function MotionMark({
  source,
  style,
  autoPlay = true,
  loop = true,
}: Props) {
  if (!source) return null;
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      style={[{ width: 120, height: 120 }, style]}
    />
  );
}
