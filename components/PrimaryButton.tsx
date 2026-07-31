import { forwardRef } from "react";
import { Pressable, Text, type ViewStyle } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  className?: string;
  disabled?: boolean;
};

export const PrimaryButton = forwardRef<
  React.ElementRef<typeof Pressable>,
  Props
>(function PrimaryButton({ label, onPress, style, className, disabled }, ref) {
  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      className={[
        "self-start rounded-btn bg-accent px-5 py-3",
        disabled ? "opacity-50" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <Text className="text-xs font-bold uppercase tracking-[1.5px] text-white">
        {label}
      </Text>
    </Pressable>
  );
});
