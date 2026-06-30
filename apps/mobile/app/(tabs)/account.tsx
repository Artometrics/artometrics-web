import { useCallback, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { SITE_URL } from "@/lib/config";
import { clearReadingProgress, getLatestReading } from "@/lib/storage";
import type { ReadingProgress } from "@/lib/types";

export default function AccountScreen() {
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];
  const [reading, setReading] = useState<ReadingProgress | null>(null);

  const load = useCallback(async () => {
    setReading(await getLatestReading());
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const open = (path: string) => {
    void Linking.openURL(`${SITE_URL}${path}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Account</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>
        Membership and billing stay on the website for now. This app is your pocket reader.
      </Text>

      {reading && reading.progress > 8 && reading.progress < 92 ? (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.tint }]}>Continue reading</Text>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{reading.title}</Text>
          <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.progressFill,
                { backgroundColor: colors.tint, width: `${Math.round(reading.progress)}%` },
              ]}
            />
          </View>
          <View style={styles.row}>
            <Pressable
              onPress={() => open(`${reading.path}?resume=1`)}
              style={[styles.primaryBtn, { backgroundColor: colors.text }]}
            >
              <Text style={styles.primaryBtnText}>Open on web</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                void clearReadingProgress(reading.slug).then(load);
              }}
            >
              <Text style={[styles.link, { color: colors.muted }]}>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.muted }]}>Website</Text>
        <Pressable onPress={() => open("/account/")} style={styles.action}>
          <Text style={[styles.actionText, { color: colors.text }]}>Your account</Text>
        </Pressable>
        <Pressable onPress={() => open("/pricing/")} style={styles.action}>
          <Text style={[styles.actionText, { color: colors.text }]}>Membership plans</Text>
        </Pressable>
        <Pressable onPress={() => open("/login/")} style={styles.action}>
          <Text style={[styles.actionText, { color: colors.text }]}>Sign in</Text>
        </Pressable>
      </View>

      <Text style={[styles.footnote, { color: colors.muted }]}>
        Connected to {SITE_URL}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Georgia",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    marginTop: 20,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "Georgia",
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 4,
  },
  primaryBtn: {
    borderRadius: 2,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  link: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  action: {
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 16,
  },
  footnote: {
    marginTop: 24,
    fontSize: 12,
  },
});
