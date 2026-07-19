import { View, type StyleProp, type ViewStyle } from "react-native";

type Variant = "standard" | "narrow" | "prose";

const maxWidths: Record<Variant, number> = {
  standard: 1120,
  narrow: 720,
  prose: 680,
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
  return (
    <View
      style={[
        {
          width: "100%",
          maxWidth: maxWidths[variant],
          alignSelf: "center",
          paddingHorizontal: 20,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
