import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { getSupabase } from "@/lib/supabase/client";
import { paramString } from "@/lib/params";
import {
  createChapter,
  createCodexEntry,
  createScene,
  deleteNovel,
  getNovelFull,
  updateNovelMetadata,
  updateSceneContent,
  type DbNovelFull,
} from "@/lib/twilda/service";
import {
  createStoryboardPanel,
  listStoryboardPanels,
  type StoryboardPanel,
} from "@/lib/twilda/storyboard";

/** Client-only workspace — no pre-rendered novel IDs at export time. */
export function generateStaticParams() {
  return [];
}

type Mode = "plan" | "write" | "board" | "codex" | "settings";

const MODES: { id: Mode; label: string }[] = [
  { id: "plan", label: "Plan" },
  { id: "write", label: "Write" },
  { id: "board", label: "Board" },
  { id: "codex", label: "Codex" },
  { id: "settings", label: "Settings" },
];

const NAV = [
  { href: "/tools/twilda", label: "Library" },
  { href: "/tools/twilda/journal", label: "Journal" },
  { href: "/tools/twilda/reference", label: "Reference" },
];

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

function toHtml(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

function sb() {
  const client = getSupabase();
  if (!client) throw new Error("Supabase is not configured");
  return client as never;
}

export default function TwildaNovelWorkspace() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = paramString(params.id);
  const [novel, setNovel] = useState<DbNovelFull | null>(null);
  const [mode, setMode] = useState<Mode>("write");
  const [loading, setLoading] = useState(true);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [sceneText, setSceneText] = useState("");
  const [panels, setPanels] = useState<StoryboardPanel[]>([]);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [series, setSeries] = useState("");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    if (!user || !id) return;
    const data = await getNovelFull(sb(), user.id, id);
    setNovel(data);
    if (data) {
      setTitle(data.title);
      setAuthor(data.author);
      setSynopsis(data.synopsis);
      setSeries(data.series_name ?? "");
      const firstScene = data.chapters[0]?.scenes[0];
      if (firstScene && !activeSceneId) {
        setActiveSceneId(firstScene.id);
        setSceneText(stripHtml(firstScene.content || ""));
      }
      const board = await listStoryboardPanels(sb(), user.id, id, data.active_draft_id);
      setPanels(board);
    }
  }, [user, id, activeSceneId]);

  useEffect(() => {
    if (!ready || !user || !id) return;
    let active = true;
    (async () => {
      try {
        setLoading(true);
        await load();
      } catch (e) {
        if (active) Alert.alert("Workspace error", e instanceof Error ? e.message : "Failed");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user, id]);

  const activeScene = useMemo(() => {
    if (!novel || !activeSceneId) return null;
    for (const ch of novel.chapters) {
      const scene = ch.scenes.find((s) => s.id === activeSceneId);
      if (scene) return { chapter: ch, scene };
    }
    return null;
  }, [novel, activeSceneId]);

  function onSceneChange(text: string) {
    setSceneText(text);
    setSaveState("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      if (!user || !activeSceneId) return;
      try {
        await updateSceneContent(sb(), user.id, activeSceneId, toHtml(text));
        setSaveState("saved");
      } catch {
        setSaveState("idle");
      }
    }, 700);
  }

  if (!ready || loading) {
    return (
      <Wrapper style={styles.wrap}>
        <ActivityIndicator color={colors.accent} />
      </Wrapper>
    );
  }

  if (!novel) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.text }}>Novel not found.</Text>
        <PrimaryButton label="Back to library" onPress={() => router.push("/tools/twilda")} />
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title={novel.title} description="Twilda workspace" path={`/tools/twilda/novels/${id}`} />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Twilda workspace</Text>
      <Text style={[styles.title, { color: colors.text }]}>{novel.title}</Text>
      <Text style={[styles.save, { color: colors.textMuted }]}>
        {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : " "}
      </Text>

      <View style={styles.modes}>
        {MODES.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => setMode(m.id)}
            style={[
              styles.modeChip,
              {
                borderColor: colors.border,
                backgroundColor: mode === m.id ? colors.text : "transparent",
              },
            ]}
          >
            <Text style={{ color: mode === m.id ? colors.inverse : colors.text, fontSize: 13 }}>
              {m.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 48 }}>
        {mode === "plan" ? (
          <View style={{ gap: 12 }}>
            {novel.chapters.map((ch) => (
              <View key={ch.id} style={[styles.block, { borderColor: colors.border }]}>
                <Text style={[styles.h, { color: colors.text }]}>{ch.title}</Text>
                {ch.scenes.map((sc) => (
                  <Pressable
                    key={sc.id}
                    onPress={() => {
                      setActiveSceneId(sc.id);
                      setSceneText(stripHtml(sc.content || ""));
                      setMode("write");
                    }}
                  >
                    <Text style={{ color: colors.accent, paddingVertical: 6 }}>
                      {sc.title || "Scene"} →
                    </Text>
                  </Pressable>
                ))}
                <Pressable onPress={() => createScene(sb(), user!.id, ch.id).then(load)}>
                  <Text style={{ color: colors.textMuted }}>+ Scene</Text>
                </Pressable>
              </View>
            ))}
            <PrimaryButton
              label="Add chapter"
              onPress={() => createChapter(sb(), user!.id, id!).then(load)}
            />
          </View>
        ) : null}

        {mode === "write" ? (
          <View style={{ gap: 10 }}>
            <Text style={[styles.meta, { color: colors.textMuted }]}>
              {activeScene
                ? `${activeScene.chapter.title} · ${activeScene.scene.title}`
                : "Select a scene from Plan"}
            </Text>
            <TextInput
              multiline
              value={sceneText}
              onChangeText={onSceneChange}
              placeholder="Write this scene…"
              placeholderTextColor={colors.textSubtle}
              style={[
                styles.editor,
                { borderColor: colors.border, color: colors.text, backgroundColor: colors.bgElevated },
              ]}
            />
          </View>
        ) : null}

        {mode === "board" ? (
          <View style={{ gap: 12 }}>
            {panels.map((p) => (
              <View key={p.id} style={[styles.block, { borderColor: colors.border }]}>
                <Text style={[styles.h, { color: colors.text }]}>
                  Panel {p.sort_order + 1}
                </Text>
                <Text style={{ color: colors.textMuted }}>{p.caption || "No caption"}</Text>
                <Text style={{ color: colors.textSubtle }}>{p.prompt || "No prompt"}</Text>
              </View>
            ))}
            <PrimaryButton
              label="Add panel"
              onPress={async () => {
                await createStoryboardPanel(sb(), user!.id, id!, novel.active_draft_id);
                setPanels(await listStoryboardPanels(sb(), user!.id, id!, novel.active_draft_id));
              }}
            />
          </View>
        ) : null}

        {mode === "codex" ? (
          <View style={{ gap: 12 }}>
            {novel.codex.map((entry) => (
              <View key={entry.id} style={[styles.block, { borderColor: colors.border }]}>
                <Text style={[styles.source, { color: colors.accent }]}>{entry.type}</Text>
                <Text style={[styles.h, { color: colors.text }]}>{entry.name}</Text>
                <Text style={{ color: colors.textMuted }}>{entry.summary}</Text>
              </View>
            ))}
            <PrimaryButton
              label="Add character"
              onPress={() =>
                createCodexEntry(sb(), user!.id, id!, {
                  type: "character",
                  name: "New character",
                  summary: "",
                  description: "",
                }).then(load)
              }
            />
          </View>
        ) : null}

        {mode === "settings" ? (
          <View style={{ gap: 10 }}>
            {(
              [
                ["Title", title, setTitle],
                ["Author", author, setAuthor],
                ["Series", series, setSeries],
              ] as const
            ).map(([label, value, set]) => (
              <View key={label} style={{ gap: 4 }}>
                <Text style={[styles.meta, { color: colors.textMuted }]}>{label}</Text>
                <TextInput
                  value={value}
                  onChangeText={set}
                  style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                />
              </View>
            ))}
            <Text style={[styles.meta, { color: colors.textMuted }]}>Synopsis</Text>
            <TextInput
              multiline
              value={synopsis}
              onChangeText={setSynopsis}
              style={[styles.editor, { borderColor: colors.border, color: colors.text, minHeight: 120 }]}
            />
            <PrimaryButton
              label="Save settings"
              onPress={async () => {
                await updateNovelMetadata(sb(), user!.id, id!, {
                  title,
                  author,
                  synopsis,
                  series_name: series.trim() || null,
                });
                await load();
                Alert.alert("Saved", "Novel settings updated.");
              }}
            />
            <PrimaryButton
              label="Delete novel"
              style={{ backgroundColor: colors.textMuted }}
              onPress={() =>
                Alert.alert("Delete novel?", "This cannot be undone.", [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      await deleteNovel(sb(), user!.id, id!);
                      router.replace("/tools/twilda");
                    },
                  },
                ])
              }
            />
          </View>
        ) : null}
      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 28, gap: 8, flex: 1 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 32, fontWeight: "700" },
  save: { fontSize: 12, minHeight: 16 },
  modes: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 8 },
  modeChip: { borderWidth: StyleSheet.hairlineWidth, paddingHorizontal: 12, paddingVertical: 8 },
  block: { borderWidth: StyleSheet.hairlineWidth, padding: 14, gap: 6 },
  h: { fontFamily: Fonts.serif, fontSize: 18, fontWeight: "700" },
  meta: { fontSize: 13 },
  source: { fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: "700" },
  input: { borderWidth: StyleSheet.hairlineWidth, paddingHorizontal: 12, paddingVertical: 10 },
  editor: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    minHeight: 280,
    textAlignVertical: "top",
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 28,
  },
});
