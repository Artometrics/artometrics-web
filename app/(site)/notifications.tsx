import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import {
  listNotifications,
  markNotificationsRead,
  type NotificationRow,
} from "@/lib/platform/social";

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (authLoading) return;
      if (!user) {
        router.replace("/login?next=%2Fnotifications");
        return;
      }
      let active = true;
      (async () => {
        try {
          setLoading(true);
          const rows = await listNotifications(user.id);
          if (active) setItems(rows);
          await markNotificationsRead(user.id);
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [user, authLoading]),
  );

  if (authLoading || !user) {
    return (
      <Wrapper className="gap-2.5 py-10">
        <Text className="text-muted">Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="gap-2.5 py-10">
      <PageSeo title="Notifications" description="Your Artometrics activity." path="/notifications" />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Activity</Text>
      <Text className="font-serif text-[36px] font-bold text-fg">Notifications</Text>

      {loading ? (
        <ActivityIndicator color={colors.accent} className="mt-6" />
      ) : items.length === 0 ? (
        <Text className="font-serif text-base leading-[26px] text-muted">
          Quiet for now. Follows, comments, and accepted submissions will show up here.
        </Text>
      ) : (
        <View className="mt-3">
          {items.map((n) => (
            <View
              key={n.id}
              className="py-3.5 border-b border-border gap-1"
              style={{ opacity: n.read_at ? 0.7 : 1 }}
            >
              <Text className="text-[11px] tracking-[1.2px] uppercase font-bold text-accent">
                {n.kind}
              </Text>
              <Text className="font-serif text-base leading-6 text-fg">{n.body}</Text>
              <Text className="text-xs text-subtle">
                {new Date(n.created_at).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Pressable onPress={() => router.push("/following")} className="mt-4">
        <Text className="text-accent font-bold">Open Following →</Text>
      </Pressable>
    </Wrapper>
  );
}
