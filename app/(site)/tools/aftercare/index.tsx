import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, router, useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { apiFetch } from "@/lib/supabase/client";

const NAV = [
  { href: "/tools/aftercare", label: "Home" },
  { href: "/tools/aftercare/journal", label: "Journal" },
  { href: "/tools/aftercare/tarot", label: "Tarot" },
  { href: "/tools/aftercare/track", label: "Track" },
  { href: "/tools/aftercare/tools", label: "Birth tools" },
];

const SHORTCUTS = [
  { href: "/tools/aftercare/journal", label: "Journal", body: "Mood-tagged notes" },
  { href: "/tools/aftercare/tarot", label: "Tarot", body: "Single or three-card pulls" },
  { href: "/tools/aftercare/track", label: "Track", body: "Daily mood log" },
  { href: "/tools/aftercare/tools", label: "Birth tools", body: "Sign, life path, birthday" },
] as const;

type SkyPayload = {
  skyNote?: string;
  moon?: { name?: string; illumination?: number };
  sunSign?: string | null;
  error?: string;
};

type ProfilePayload = {
  profile?: { display_name?: string | null; email?: string | null };
  email?: string | null;
  error?: string;
};

export default function AftercareHomeScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [skyNote, setSkyNote] = useState<string | null>(null);
  const [moonLabel, setMoonLabel] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshingSky, setRefreshingSky] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const greetingName =
    displayName ||
    user?.email?.split("@")[0] ||
    user?.email ||
    "friend";

  const load = useCallback(async () => {
    if (!user) return;
    setError(null);
    try {
      const [profileRes, skyRes] = await Promise.all([
        apiFetch("aftercare-profile"),
        apiFetch("aftercare-sky"),
      ]);

      if (profileRes.ok) {
        const data = (await profileRes.json()) as ProfilePayload;
        setDisplayName(
          data.profile?.display_name?.trim() ||
            data.email?.split("@")[0] ||
            data.profile?.email?.split("@")[0] ||
            null,
        );
      } else {
        const data = (await profileRes.json().catch(() => ({}))) as ProfilePayload;
        setError(data.error || "Could not load profile.");
      }

      if (skyRes.ok) {
        const data = (await skyRes.json()) as SkyPayload;
        setSkyNote(data.skyNote ?? null);
        if (data.moon?.name) {
          const illum =
            typeof data.moon.illumination === "number"
              ? ` · ~${data.moon.illumination}% lit`
              : "";
          setMoonLabel(`${data.moon.name}${illum}`);
        }
      } else {
        const data = (await skyRes.json().catch(() => ({}))) as SkyPayload;
        setError((prev) => prev || data.error || "Could not load sky note.");
      }
    } catch {
      setError("Could not reach Aftercare. Try again shortly.");
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!ready || !user) return;
      let active = true;
      (async () => {
        try {
          setLoading(true);
          await load();
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [load, ready, user]),
  );

  async function refreshSky() {
    setRefreshingSky(true);
    setError(null);
    try {
      const res = await apiFetch("aftercare-sky", {
        method: "POST",
        body: "{}",
      });
      const data = (await res.json().catch(() => ({}))) as SkyPayload;
      if (!res.ok) {
        setError(data.error || "Could not refresh sky note.");
        return;
      }
      setSkyNote(data.skyNote ?? null);
      if (data.moon?.name) {
        const illum =
          typeof data.moon.illumination === "number"
            ? ` · ~${data.moon.illumination}% lit`
            : "";
        setMoonLabel(`${data.moon.name}${illum}`);
      }
    } catch {
      setError("Could not refresh sky note.");
    } finally {
      setRefreshingSky(false);
    }
  }

  if (!ready) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Aftercare"
        description="Journal, tarot, mood tracking, and birth tools on Artometrics."
        path="/tools/aftercare"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Aftercare</Text>
      <Text style={[styles.title, { color: colors.text }]}>
        Hello, {greetingName}
      </Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Soft rituals for the creative life — journal, pull cards, track mood, and tend your birth chart notes.
      </Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} color={colors.accent} />
      ) : (
        <>
          {error ? (
            <Text style={[styles.error, { color: colors.accent }]}>{error}</Text>
          ) : null}

          <View style={[styles.skyBlock, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              Today's sky
            </Text>
            {moonLabel ? (
              <Text style={[styles.meta, { color: colors.accent }]}>{moonLabel}</Text>
            ) : null}
            <Text style={[styles.skyNote, { color: colors.text }]}>
              {skyNote || "Add a birth date in Birth tools for a more personal note."}
            </Text>
            <Pressable
              onPress={refreshSky}
              disabled={refreshingSky}
              style={[
                styles.outlineBtn,
                { borderColor: colors.border },
                refreshingSky && styles.disabled,
              ]}
            >
              <Text style={[styles.outlineLabel, { color: colors.text }]}>
                {refreshingSky ? "Refreshing…" : "Refresh sky note"}
              </Text>
            </Pressable>
          </View>

          <Text style={[styles.sectionLabel, { color: colors.textMuted, marginTop: 8 }]}>
            Shortcuts
          </Text>
          <View style={styles.shortcuts}>
            {SHORTCUTS.map((item) => (
              <Link key={item.href} href={item.href} asChild>
                <Pressable
                  style={StyleSheet.flatten([
                    styles.shortcut,
                    { borderColor: colors.border },
                  ])}
                >
                  <Text style={[styles.shortcutTitle, { color: colors.text }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.shortcutBody, { color: colors.textMuted }]}>
                    {item.body}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>

          <PrimaryButton
            label="Open journal"
            onPress={() => router.push("/tools/aftercare/journal")}
            style={{ marginTop: 8 }}
          />
        </>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 10 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 560 },
  error: { fontFamily: Fonts.serif, fontSize: 15, marginTop: 4 },
  skyBlock: {
    marginTop: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  meta: { fontSize: 13, fontWeight: "600" },
  skyNote: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 28 },
  outlineBtn: {
    alignSelf: "flex-start",
    marginTop: 6,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  outlineLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  disabled: { opacity: 0.5 },
  shortcuts: { gap: 10, marginTop: 4 },
  shortcut: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 4,
  },
  shortcutTitle: { fontFamily: Fonts.serif, fontSize: 20, fontWeight: "700" },
  shortcutBody: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 22 },
});
