import { Image, type ImageProps } from "expo-image";
import { View, type StyleProp, type ViewStyle } from "react-native";

export type SiteCoverImageProps = Omit<ImageProps, "contentFit"> & {
  wrapperClassName?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
};

const wrapperBase =
  "site-cover-image relative overflow-hidden [&_img]:!m-0 [&_.cross-dissolve-container]:h-full [&_.cross-dissolve-container]:w-full";

/** Hero/thumb clip box — edge-to-edge cover on web and native. */
export function SiteCoverImage({
  wrapperClassName = "",
  wrapperStyle,
  className = "",
  transition = 200,
  ...props
}: SiteCoverImageProps) {
  return (
    <View
      className={[wrapperBase, wrapperClassName].filter(Boolean).join(" ")}
      style={wrapperStyle}
    >
      <Image
        {...props}
        className={["absolute inset-0 h-full w-full", className].filter(Boolean).join(" ")}
        contentFit="cover"
        transition={transition}
      />
    </View>
  );
}
