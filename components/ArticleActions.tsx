import { useEffect, useMemo, useState } from "react";
import { Pressable, Share, Text, View, Platform } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";
import { assetUrl } from "@/lib/assets";
import { openExternalUrl } from "@/lib/openExternal";
import { trackEvent } from "@/lib/analytics/ga";
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
  const absolute = assetUrl(url) ?? url;
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.open(absolute, "_blank", "noopener,noreferrer");
    return;
  }
  void openExternalUrl(absolute);
}

async function downloadAll(items: DownloadItem[]) {
  if (!items.length) return;
  // iOS often ignores/fails rapid successive openURL calls — share a list instead.
  if (Platform.OS !== "web") {
    const lines = items.map((i) => {
      const href = assetUrl(i.href) ?? i.href;
      return `${i.label}\n${href}`;
    });
    try {
      await Share.share({
        message: lines.join("\n\n"),
        title: "Artometrics downloads",
      });
    } catch {
      openUrl(items[0].href);
    }
    return;
  }
  for (const item of items) {
    openUrl(item.href);
    await new Promise((r) => setTimeout(r, 350));
  }
}

export function ArticleActions({ slug, title, placement = "all" }: Props) {
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

  async function share() {
    const url = `https://artometrics.com/${slug}`;
    trackEvent("report_share", { slug, method: Platform.OS });
    if (Platform.OS !== "web") {
      try {
        await Share.share({ message: `${title}\n${url}`, url, title });
      } catch {
        openUrl(url);
      }
      return;
    }
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
    // Prefer site-hosted exports; GitHub is demoted to last resort.
    if (pack.pdf) items.push({ key: "pdf", label: "PDF", href: pack.pdf });
    if (pack.epub) items.push({ key: "epub", label: "Ebook (EPUB)", href: pack.epub });
    if (pack.html) items.push({ key: "html", label: "Article HTML", href: pack.html });
    if (pack.dataset) items.push({ key: "data", label: "Dataset (CSV)", href: pack.dataset });
    if (pack.audio) items.push({ key: "audio", label: "Narration (MP3)", href: pack.audio });
    if (pack.quarto) {
      items.push({ key: "code", label: "Quarto / source", href: pack.quarto });
    } else if (pack.github && items.length === 0) {
      items.push({ key: "code", label: "Source (GitHub)", href: pack.github });
    }
    return items;
  }, [pack]);

  const primaryDownloads = downloads.filter(
    (d) => d.key === "pdf" || d.key === "data" || d.key === "epub",
  ).slice(0, 2);
  const showTop = placement === "top" || placement === "all";
  const showBottom = placement === "bottom" || placement === "all";

  return (
    <View
      className={[
        "border-t border-b border-border py-[18px] gap-3.5 my-3",
        placement === "top" ? "border-b-0 mb-0 pb-3" : "",
        placement === "bottom" ? "mt-2 pt-5" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showTop ? (
        <View className="flex-row flex-wrap gap-2.5 items-center">
          <Pressable
            onPress={share}
            accessibilityRole="button"
            accessibilityLabel="Share this report"
            className="border border-fg bg-fg px-4 py-2.5"
          >
            <Text className="text-xs font-bold tracking-[0.6px] uppercase text-bg">Share</Text>
          </Pressable>
          {user ? (
            <Pressable
              onPress={toggleSave}
              disabled={busy}
              accessibilityRole="button"
              className="border border-border px-3.5 py-2.5"
            >
              <Text className="text-xs font-bold tracking-[0.6px] uppercase text-fg">
                {saved ? "Saved" : "Save"}
              </Text>
            </Pressable>
          ) : (
            <Link href="/login" asChild>
              <Pressable className="border border-border px-3.5 py-2.5">
                <Text className="text-xs font-bold tracking-[0.6px] uppercase text-muted">
                  Sign in to save
                </Text>
              </Pressable>
            </Link>
          )}
        </View>
      ) : null}

      {showBottom && downloads.length ? (
        <View className="gap-3">
          <Text className="text-[11px] tracking-[1.6px] uppercase font-bold text-accent">
            Downloads
          </Text>
          <View className="flex-row flex-wrap gap-2.5 items-center">
            <Pressable
              onPress={() => setMenuOpen((v) => !v)}
              accessibilityRole="button"
              accessibilityState={{ expanded: menuOpen }}
              className="border border-accent bg-accent px-4 py-2.5"
            >
              <Text className="text-xs font-bold tracking-[0.6px] uppercase text-paper">
                {menuOpen ? "Close" : "Download"}
              </Text>
            </Pressable>
            {primaryDownloads.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => {
                  trackEvent("report_download", { slug, format: item.key });
                  openUrl(item.href);
                }}
                className="border border-border px-3.5 py-2.5"
              >
                <Text className="text-xs font-bold tracking-[0.6px] uppercase text-fg">
                  {item.key === "pdf"
                    ? "PDF"
                    : item.key === "epub"
                      ? "EPUB"
                      : item.key === "data"
                        ? "Data"
                        : item.label}
                </Text>
              </Pressable>
            ))}
            {downloads.length > 1 ? (
              <Pressable
                onPress={() => void downloadAll(downloads)}
                className="border border-fg px-3.5 py-2.5"
              >
                <Text className="text-xs font-bold tracking-[0.6px] uppercase text-fg">
                  {Platform.OS === "web" ? "Download all" : "Share all links"}
                </Text>
              </Pressable>
            ) : null}
          </View>

          {menuOpen ? (
            <View className="border border-border bg-bg py-1">
              {downloads.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => {
                    openUrl(item.href);
                    setMenuOpen(false);
                  }}
                  className="px-3.5 py-3"
                >
                  <Text className="font-serif text-base leading-[22px] text-fg">{item.label}</Text>
                </Pressable>
              ))}
              {downloads.length > 1 ? (
                <Pressable
                  onPress={() => {
                    void downloadAll(downloads);
                    setMenuOpen(false);
                  }}
                  className="px-3.5 py-3"
                >
                  <Text className="font-serif text-base leading-[22px] text-accent">
                    {Platform.OS === "web"
                      ? `Download all (${downloads.length} files)`
                      : `Share all links (${downloads.length})`}
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
