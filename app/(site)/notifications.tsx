import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
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
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title="Notifications" description="Your Artometrics activity." path="/notifications" />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Activity</Text>
      <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 24 }} />
      ) : items.length === 0 ? (
        <Text style={[styles.deck, { color: colors.textMuted }]}>
          Quiet for now. Follows, comments, and accepted submissions will show up here.
        </Text>
      ) : (
        <View style={styles.list}>
          {items.map((n) => (
            <View
              key={n.id}
              style={StyleSheet.flatten([
                styles.row,
                {
                  borderBottomColor: colors.border,
                  opacity: n.read_at ? 0.7 : 1,
                },
              ])}
            >
              <Text style={[styles.kind, { color: colors.accent }]}>{n.kind}</Text>
              <Text style={[styles.body, { color: colors.text }]}>{n.body}</Text>
              <Text style={[styles.time, { color: colors.textSubtle }]}>
                {new Date(n.created_at).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Pressable onPress={() => router.push("/following")} style={{ marginTop: 16 }}>
        <Text style={{ color: colors.accent, fontWeight: "700" }}>Open Following →</Text>
      </Pressable>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 10 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
  list: { marginTop: 12 },
  row: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 4,
  },
  kind: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  body: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 24 },
  time: { fontSize: 12 },
});
