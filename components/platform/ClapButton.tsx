import { Pressable, Text } from "react-native";
import { useAuth } from "@/lib/auth";
import { useClaps } from "@/lib/platform/useClaps";

export function ClapButton({
  targetKind,
  targetId,
}: {
  targetKind: "report" | "member_post";
  targetId: string;
}) {
  const { user } = useAuth();
  const { count, clapped, toggle } = useClaps(targetKind, targetId);

  return (
    <Pressable
      onPress={() => {
        if (!user) return;
        toggle();
      }}
      className={[
        "border px-3 py-2 rounded-btn self-start",
        clapped ? "border-accent bg-accent-soft" : "border-border bg-transparent",
      ].join(" ")}
      accessibilityLabel="Clap"
    >
      <Text className="text-fg font-bold text-[13px]">
        Clap{count ? ` · ${count}` : ""}
      </Text>
    </Pressable>
  );
}
