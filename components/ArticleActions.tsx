import { useEffect, useMemo, useState } from "react";
import { Linking, Pressable, Text, View, StyleSheet, Platform } from "react-native";
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
  epub?: string | null;
  audio?: string | null;
  github?: string | null;
};

type Props = {
  slug: string;
  title: string;
  /** Top: share + save. Bottom: download menu (data / code / all). */
  placement?: "top" | "bottom" | "all";
};

type DownloadItem = { key: string; label: string; href: string };

function openUrl(url: string) {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  void Linking.openURL(url);
}

async function downloadAll(items: DownloadItem[]) {
  for (const item of items) {
    openUrl(item.href);
    await new Promise((r) => setTimeout(r, 350));
  }
}

export function ArticleActions({ slug, title, placement = "all" }: Props) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  function share() {
    const url = `https://artometrics.com/${slug}`;
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      navigator.share({ title, url }).catch(() => openUrl(url));
      return;
    }
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      void navigator.clipboard.writeText(url).catch(() => openUrl(url));
      return;
    }
    openUrl(url);
  }

  const downloads = useMemo(() => {
    const items: DownloadItem[] = [];
    if (pack.dataset) items.push({ key: "data", label: "Dataset (CSV)", href: pack.dataset });
    const code = pack.quarto ?? pack.github;
    if (code) {
      items.push({
        key: "code",
        label: pack.quarto ? "Quarto / source" : "Code (GitHub)",
        href: code,
      });
    }
    if (pack.html) items.push({ key: "html", label: "Article HTML", href: pack.html });
    if (pack.pdf) items.push({ key: "pdf", label: "PDF", href: pack.pdf });
    if (pack.epub) items.push({ key: "epub", label: "Ebook (EPUB)", href: pack.epub });
    if (pack.audio) items.push({ key: "audio", label: "Narration (MP3)", href: pack.audio });
    return items;
  }, [pack]);

  const primaryDownloads = downloads.filter((d) => d.key === "data" || d.key === "code");
  const showTop = placement === "top" || placement === "all";
  const showBottom = placement === "bottom" || placement === "all";

  return (
    <View
      style={[
        styles.wrap,
        placement === "top" && styles.wrapTop,
        placement === "bottom" && styles.wrapBottom,
        { borderColor: colors.border },
      ]}
    >
      {showTop ? (
        <View style={styles.row}>
          <Pressable
            onPress={share}
            accessibilityRole="button"
            accessibilityLabel="Share this report"
            style={[styles.btnPrimary, { backgroundColor: colors.text, borderColor: colors.text }]}
          >
            <Text style={[styles.btnText, { color: colors.bg }]}>Share</Text>
          </Pressable>
          {user ? (
            <Pressable
              onPress={toggleSave}
              disabled={busy}
              accessibilityRole="button"
              style={[styles.btn, { borderColor: colors.border }]}
            >
              <Text style={[styles.btnText, { color: colors.text }]}>
                {saved ? "Saved" : "Save"}
              </Text>
            </Pressable>
          ) : (
            <Link href="/login" asChild>
              <Pressable style={StyleSheet.flatten([styles.btn, { borderColor: colors.border }])}>
                <Text style={[styles.btnText, { color: colors.textMuted }]}>Sign in to save</Text>
              </Pressable>
            </Link>
          )}
        </View>
      ) : null}

      {showBottom && downloads.length ? (
        <View style={styles.downloadBlock}>
          <Text style={[styles.head, { color: colors.accent }]}>Downloads</Text>
          <View style={styles.row}>
            <Pressable
              onPress={() => setMenuOpen((v) => !v)}
              accessibilityRole="button"
              accessibilityState={{ expanded: menuOpen }}
              style={[styles.btnPrimary, { backgroundColor: colors.accent, borderColor: colors.accent }]}
            >
              <Text style={[styles.btnText, { color: "#FAFAF8" }]}>
                {menuOpen ? "Close" : "Download"}
              </Text>
            </Pressable>
            {primaryDownloads.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => openUrl(item.href)}
                style={[styles.btn, { borderColor: colors.border }]}
              >
                <Text style={[styles.btnText, { color: colors.text }]}>
                  {item.key === "data" ? "Data" : "Code"}
                </Text>
              </Pressable>
            ))}
            {downloads.length > 1 ? (
              <Pressable
                onPress={() => void downloadAll(downloads)}
                style={[styles.btn, { borderColor: colors.text }]}
              >
                <Text style={[styles.btnText, { color: colors.text }]}>Download all</Text>
              </Pressable>
            ) : null}
          </View>

          {menuOpen ? (
            <View style={[styles.menu, { borderColor: colors.border, backgroundColor: colors.bg }]}>
              {downloads.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => {
                    openUrl(item.href);
                    setMenuOpen(false);
                  }}
                  style={styles.menuItem}
                >
                  <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                </Pressable>
              ))}
              {downloads.length > 1 ? (
                <Pressable
                  onPress={() => {
                    void downloadAll(downloads);
                    setMenuOpen(false);
                  }}
                  style={styles.menuItem}
                >
                  <Text style={[styles.menuLabel, { color: colors.accent }]}>
                    Download all ({downloads.length} files)
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 18,
    gap: 14,
    marginVertical: 12,
  },
  wrapTop: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 12,
  },
  wrapBottom: {
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 20,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center" },
  btnPrimary: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  btn: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  downloadBlock: { gap: 12 },
  head: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  menu: {
    borderWidth: 1,
    paddingVertical: 4,
    gap: 0,
  },
  menuItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuLabel: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 22,
  },
});
