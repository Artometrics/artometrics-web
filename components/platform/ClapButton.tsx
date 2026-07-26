import { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { clapCount, hasClapped, toggleClap } from "@/lib/platform/social";

export function ClapButton({
  targetKind,
  targetId,
}: {
  targetKind: "report" | "member_post";
  targetId: string;
}) {
  const { colors } = useTheme();
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
      style={StyleSheet.flatten([
        styles.btn,
        {
          borderColor: clapped ? colors.accent : colors.border,
          backgroundColor: clapped ? colors.accentSoft : "transparent",
        },
      ])}
      accessibilityLabel="Clap"
    >
      <Text style={{ color: colors.text, fontWeight: "700", fontSize: 13 }}>
        Clap{count ? ` · ${count}` : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 2,
    alignSelf: "flex-start",
  },
});
