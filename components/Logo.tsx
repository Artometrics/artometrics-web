import { Text, type TextProps, type StyleProp, type TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";

type Props = {
  style?: StyleProp<TextStyle>;
  size?: number;
} & Omit<TextProps, "style">;

export function Logo({ style, size = 36, ...rest }: Props) {
  return (
    <Text
      accessibilityRole="header"
      style={[
        {
          fontFamily: "Chomsky",
          fontSize: size,
          color: Colors.base900,
          letterSpacing: 0.5,
        },
        style,
      ]}
      {...rest}
    >
      Artometrics
    </Text>
  );
}
