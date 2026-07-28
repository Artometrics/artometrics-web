import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ToolsAccent } from "@/components/tools/ToolsAccent";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { loadStudioContinue, type StudioContinue } from "@/lib/platform/studio";
import { formatUpdated } from "@/lib/twilda/service";

export default function StudioHomeScreen() {
  const { colors } = useTheme();
  const { user, loading: authLoading } = useAuth();
  const [cont, setCont] = useState<StudioContinue | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (authLoading) return;
      if (!user) {
        router.replace("/login?next=%2Fstudio");
        return;
      }
      let active = true;
      (async () => {
        try {
          setLoading(true);
          const data = await loadStudioContinue(user.id);
          if (active) setCont(data);
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
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={[styles.deck, { color: colors.textMuted }]}>Opening Studio…</Text>
      </Wrapper>
    );
  }

  const empty = !cont?.novel && !cont?.journal && !cont?.aftercareNote;

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Studio"
        description="Write, plan, record samples, and build color kits — your Artometrics workspace."
        path="/studio"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Your workspace</Text>
      <Text style={[styles.title, { color: colors.text }]}>Studio</Text>
      <ToolsAccent />
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        One place to continue writing, check in, and publish when you are ready.
      </Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} color={colors.accent} />
      ) : empty ? (
        <View style={[styles.empty, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Start with a blank page</Text>
          <Text style={[styles.deck, { color: colors.textMuted }]}>
            Create a novel in Twilda, or open Aftercare for today’s check-in. Your work stays private until
            you publish.
          </Text>
          <PrimaryButton
            label="New novel"
            onPress={() => router.push("/tools/twilda")}
            style={{ marginTop: 8 }}
          />
          <Pressable onPress={() => router.push("/tools/aftercare")} style={{ marginTop: 12 }}>
            <Text style={{ color: colors.accent, fontWeight: "700" }}>Open Aftercare →</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Continue</Text>
          {cont?.novel ? (
            <Pressable
              onPress={() => router.push(`/tools/twilda/novels/${cont.novel!.id}`)}
              style={StyleSheet.flatten([
                styles.continueRow,
                { borderColor: colors.border, backgroundColor: colors.bgElevated },
              ])}
            >
              <Text style={[styles.meta, { color: colors.accent }]}>Twilda · Novel</Text>
              <Text style={[styles.continueTitle, { color: colors.text }]}>{cont.novel.title}</Text>
              <Text style={[styles.meta, { color: colors.textSubtle }]}>
                {formatUpdated(cont.novel.last_opened_at ?? cont.novel.updated_at)}
              </Text>
            </Pressable>
          ) : null}
          {cont?.journal ? (
            <Pressable
              onPress={() => router.push(`/tools/twilda/journal/${cont.journal!.id}`)}
              style={StyleSheet.flatten([
                styles.continueRow,
                { borderColor: colors.border, backgroundColor: colors.bgElevated },
              ])}
            >
              <Text style={[styles.meta, { color: colors.accent }]}>Twilda · Journal</Text>
              <Text style={[styles.continueTitle, { color: colors.text }]}>{cont.journal.title}</Text>
            </Pressable>
          ) : null}
          {cont?.aftercareNote ? (
            <Pressable
              onPress={() => router.push("/tools/aftercare/journal")}
              style={StyleSheet.flatten([
                styles.continueRow,
                { borderColor: colors.border, backgroundColor: colors.bgElevated },
              ])}
            >
              <Text style={[styles.meta, { color: colors.accent }]}>Aftercare</Text>
              <Text style={[styles.continueTitle, { color: colors.text }]}>{cont.aftercareNote}</Text>
            </Pressable>
          ) : null}
        </View>
      )}

      <View style={styles.ctaRow}>
        <PrimaryButton label="Continue writing" onPress={() => router.push("/tools/twilda")} />
        <PrimaryButton
          label="Today's check-in"
          onPress={() => router.push("/tools/aftercare")}
          style={{ backgroundColor: colors.textMuted }}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Spaces</Text>
        <View style={styles.spaces}>
          {[
            {
              href: "/tools/twilda",
              title: "Twilda",
              body: "Novels, journal, storyboard, Codex.",
            },
            {
              href: "/tools/aftercare",
              title: "Aftercare",
              body: "Journal, tarot, mood, birth tools.",
            },
            {
              href: "/tools/samples",
              title: "Sample Maker",
              body: "Record, synth settings, favorite clips, export.",
            },
            {
              href: "/tools/palette",
              title: "Color Kit",
              body: "Save palettes or get season picks from a photo.",
            },
            {
              href: "/library/reference",
              title: "Reference",
              body: "Public-domain books, art, encyclopedia.",
            },
            {
              href: "/studio/publish",
              title: "Publish",
              body: "Share to your profile or submit to the magazine.",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href as `/tools`} asChild>
              <Pressable
                style={StyleSheet.flatten([
                  styles.spaceCard,
                  { borderColor: colors.border },
                ])}
              >
                <Text style={[styles.spaceTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.spaceBody, { color: colors.textMuted }]}>{item.body}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 42, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 28, maxWidth: 560 },
  empty: {
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 24,
    gap: 10,
  },
  emptyTitle: { fontFamily: Fonts.serif, fontSize: 26, fontWeight: "700" },
  section: { marginTop: 20, gap: 10 },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  continueRow: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 4,
  },
  continueTitle: { fontFamily: Fonts.serif, fontSize: 20, fontWeight: "700" },
  meta: { fontSize: 12, letterSpacing: 0.4 },
  ctaRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  spaces: { gap: 12 },
  spaceCard: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    gap: 6,
  },
  spaceTitle: { fontFamily: Fonts.serif, fontSize: 22, fontWeight: "700" },
  spaceBody: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 24 },
});
