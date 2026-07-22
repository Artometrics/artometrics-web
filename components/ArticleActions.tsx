import { useEffect, useState } from "react";
import { Linking, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";
import downloadsManifest from "@/src/generated/downloads.json";

type Pack = {
  slug: string;
  dataset?: string | null;
  quarto?: string | null;
  html?: string | null;
  pdf?: string | null;
  github?: string | null;
};

type Props = { slug: string; title: string };

export function ArticleActions({ slug, title }: Props) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const pack = (downloadsManifest as Record<string, Pack>)[slug] ?? { slug };

  useEffect(() => {
    if (!user) {
      setSaved(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch("saved-articles");
        if (!res.ok) return;
        const data = (await res.json()) as { items?: { article_slug: string }[] };
        if (!cancelled) {
          setSaved(Boolean(data.items?.some((i) => i.article_slug === slug)));
        }
      } catch {
        /* soft fail */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, slug]);

  async function toggleSave() {
    if (!user) return;
    setBusy(true);
    try {
      if (saved) {
        await apiFetch(`saved-articles?slug=${encodeURIComponent(slug)}`, {
          method: "DELETE",
        });
        setSaved(false);
      } else {
        await apiFetch("saved-articles", {
          method: "POST",
          body: JSON.stringify({ slug }),
        });
        setSaved(true);
      }
    } catch {
      /* soft fail */
    } finally {
      setBusy(false);
    }
  }

  const files: { label: string; href?: string | null }[] = [
    { label: "Dataset (CSV)", href: pack.dataset },
    { label: "Quarto / source", href: pack.quarto ?? pack.github },
    { label: "Article HTML", href: pack.html },
    { label: "PDF", href: pack.pdf },
  ];

  return (
    <View style={[styles.wrap, { borderColor: colors.border }]}>
      <View style={styles.row}>
        {user ? (
          <Pressable
            onPress={toggleSave}
            disabled={busy}
            style={[styles.btn, { borderColor: colors.text }]}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>
              {saved ? "Saved" : "Save this report"}
            </Text>
          </Pressable>
        ) : (
          <Link href="/login" asChild>
            <Pressable style={[styles.btn, { borderColor: colors.text }]}>
              <Text style={[styles.btnText, { color: colors.text }]}>Sign in to save</Text>
            </Pressable>
          </Link>
        )}
        <Pressable
          onPress={() => {
            const url = `https://artometrics.com/${slug}`;
            if (typeof navigator !== "undefined" && navigator.share) {
              navigator.share({ title, url }).catch(() => Linking.openURL(url));
            } else {
              Linking.openURL(url);
            }
          }}
          style={[styles.btn, { borderColor: colors.border }]}
        >
          <Text style={[styles.btnText, { color: colors.textMuted }]}>Share</Text>
        </Pressable>
      </View>

      <Text style={[styles.head, { color: colors.accent }]}>Reuse this report</Text>
      <View style={styles.files}>
        {files.map((f) =>
          f.href ? (
            <Pressable key={f.label} onPress={() => Linking.openURL(f.href!)}>
              <Text style={[styles.fileLink, { color: colors.text }]}>{f.label}</Text>
            </Pressable>
          ) : (
            <Text key={f.label} style={[styles.fileSoon, { color: colors.textSubtle }]}>
              {f.label} — coming soon
            </Text>
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
    gap: 14,
    marginVertical: 16,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  btn: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  btnText: { fontSize: 12, fontWeight: "700", letterSpacing: 0.6 },
  head: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  files: { gap: 8 },
  fileLink: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  fileSoon: { fontFamily: Fonts.serif, fontSize: 15 },
});
