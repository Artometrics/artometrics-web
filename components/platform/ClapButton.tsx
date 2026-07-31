import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { useAuth } from "@/lib/auth";
import { clapCount, hasClapped, toggleClap } from "@/lib/platform/social";

export function ClapButton({
  targetKind,
  targetId,
}: {
  targetKind: "report" | "member_post";
  targetId: string;
}) {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [clapped, setClapped] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        setCount(await clapCount(targetKind, targetId));
        if (user) setClapped(await hasClapped(user.id, targetKind, targetId));
      } catch {
        /* soft */
      }
    })();
  }, [targetKind, targetId, user]);

  return (
    <Pressable
      onPress={async () => {
        if (!user) return;
        try {
          const res = await toggleClap(user.id, targetKind, targetId);
          setClapped(res.clapped);
          setCount(res.count);
        } catch {
          /* soft */
        }
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
