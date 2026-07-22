import { View, type StyleProp, type ViewStyle } from "react-native";

type Variant = "standard" | "narrow" | "prose" | "wide" | "bleed";

const maxWidths: Record<Variant, number | "100%"> = {
  wide: 1440,
  standard: 1280,
  narrow: 720,
  prose: 920,
  bleed: "100%",
};

export function Wrapper({
  children,
  variant = "standard",
  style,
}: {
  children: React.ReactNode;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
}) {
  const maxWidth = maxWidths[variant];
  return (
    <View
      style={[
        {
          width: "100%",
          maxWidth: maxWidth === "100%" ? undefined : maxWidth,
          alignSelf: "center",
          paddingHorizontal: variant === "bleed" ? 0 : 20,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
