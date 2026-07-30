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
import { StudioBreadcrumb } from "@/components/studio/StudioBreadcrumb";
import { StudioSelect } from "@/components/studio/StudioSelect";
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
import type { CoverKind } from "@/lib/twilda/novelcrafter/data";

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

const COVER_OPTIONS: { value: CoverKind; label: string }[] = [
  { value: "gatsby", label: "Gatsby" },
  { value: "trinity", label: "Trinity" },
  { value: "cardinal", label: "Cardinal" },
  { value: "apocrypha", label: "Apocrypha" },
  { value: "plain", label: "Plain" },
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
  const [coverKind, setCoverKind] = useState<CoverKind>("plain");
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
      setCoverKind(data.cover_kind);
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

  const chapterOptions = useMemo(() => {
    if (!novel) return [];
    return novel.chapters.map((ch, i) => ({
      value: ch.id,
      label: ch.title || `Chapter ${i + 1}`,
    }));
  }, [novel]);

  const activeChapterId = activeScene?.chapter.id ?? chapterOptions[0]?.value ?? "";

  const sceneOptions = useMemo(() => {
    if (!novel || !activeChapterId) return [];
    const ch = novel.chapters.find((c) => c.id === activeChapterId);
    if (!ch) return [];
    return ch.scenes.map((sc, i) => ({
      value: sc.id,
      label: sc.title || `Scene ${i + 1}`,
    }));
  }, [novel, activeChapterId]);

  const chapterIndex = useMemo(() => {
    if (!novel || !activeScene) return 0;
    return novel.chapters.findIndex((c) => c.id === activeScene.chapter.id) + 1;
  }, [novel, activeScene]);

  const sceneIndex = useMemo(() => {
    if (!activeScene) return 0;
    return activeScene.chapter.scenes.findIndex((s) => s.id === activeScene.scene.id) + 1;
  }, [activeScene]);

  function selectChapter(chapterId: string) {
    if (!novel) return;
    const ch = novel.chapters.find((c) => c.id === chapterId);
    const first = ch?.scenes[0];
    if (first) {
      setActiveSceneId(first.id);
      setSceneText(stripHtml(first.content || ""));
    }
  }

  function selectScene(sceneId: string) {
    if (!novel) return;
    for (const ch of novel.chapters) {
      const scene = ch.scenes.find((s) => s.id === sceneId);
      if (scene) {
        setActiveSceneId(scene.id);
        setSceneText(stripHtml(scene.content || ""));
        return;
      }
    }
  }

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

  const modeLabel = MODES.find((m) => m.id === mode)?.label ?? "Write";

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

  const panelStyle = StyleSheet.flatten([
    styles.panel,
    { borderColor: colors.border, backgroundColor: colors.bgElevated },
  ]);

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo title={novel.title} description="Twilda workspace" path={`/tools/twilda/novels/${id}`} />
      <ToolsSubnav links={NAV} />
      <StudioBreadcrumb
        items={[
          { label: "Studio", href: "/studio" },
          { label: "Twilda", href: "/tools/twilda" },
          { label: novel.title, href: `/tools/twilda/novels/${id}` },
          { label: modeLabel },
          ...(mode === "write" && activeScene
            ? [{ label: `Chapter ${chapterIndex} · Scene ${sceneIndex}` }]
            : []),
        ]}
      />
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: colors.text }]}>{novel.title}</Text>
        <Text style={[styles.save, { color: colors.textMuted }]}>
          {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : " "}
        </Text>
      </View>

      <View
        style={StyleSheet.flatten([
          styles.segment,
          { borderColor: colors.border, backgroundColor: colors.bg },
        ])}
      >
        {MODES.map((m) => {
          const active = mode === m.id;
          return (
            <Pressable
              key={m.id}
              onPress={() => setMode(m.id)}
              style={StyleSheet.flatten([
                styles.segmentItem,
                active
                  ? { backgroundColor: colors.text }
                  : { backgroundColor: "transparent" },
              ])}
            >
              <Text
                style={{
                  color: active ? colors.inverse : colors.textMuted,
                  fontSize: 13,
                  fontWeight: active ? "700" : "500",
                  letterSpacing: 0.2,
                }}
              >
                {m.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 48 }}>
        {mode === "plan" ? (
          <View style={[panelStyle, { gap: 12 }]}>
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
          <View style={[panelStyle, { gap: 12, zIndex: 8 }]}>
            <View style={styles.selectors}>
              <View style={{ flex: 1, minWidth: 140, zIndex: 12 }}>
                <StudioSelect
                  label="Chapter"
                  value={activeChapterId}
                  options={chapterOptions}
                  onChange={selectChapter}
                  placeholder="Chapter…"
                />
              </View>
              <View style={{ flex: 1, minWidth: 140, zIndex: 11 }}>
                <StudioSelect
                  label="Scene"
                  value={activeSceneId ?? ""}
                  options={sceneOptions}
                  onChange={selectScene}
                  placeholder="Scene…"
                />
              </View>
            </View>
            <TextInput
              multiline
              value={sceneText}
              onChangeText={onSceneChange}
              placeholder="Write this scene…"
              placeholderTextColor={colors.textSubtle}
              style={StyleSheet.flatten([
                styles.editor,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.bg,
                },
              ])}
            />
          </View>
        ) : null}

        {mode === "board" ? (
          <View style={[panelStyle, { gap: 12 }]}>
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
          <View style={[panelStyle, { gap: 12 }]}>
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
          <View style={[panelStyle, { gap: 12, zIndex: 8 }]}>
            {(
              [
                ["Title", title, setTitle],
                ["Author", author, setAuthor],
                ["Series", series, setSeries],
              ] as const
            ).map(([label, value, set]) => (
              <View key={label} style={{ gap: 6 }}>
                <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>{label}</Text>
                <TextInput
                  value={value}
                  onChangeText={set}
                  style={StyleSheet.flatten([
                    styles.input,
                    {
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: colors.bg,
                    },
                  ])}
                />
              </View>
            ))}
            <StudioSelect
              label="Cover"
              value={coverKind}
              options={COVER_OPTIONS}
              onChange={(v) => setCoverKind(v as CoverKind)}
            />
            <View style={{ gap: 6 }}>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Synopsis</Text>
              <TextInput
                multiline
                value={synopsis}
                onChangeText={setSynopsis}
                style={StyleSheet.flatten([
                  styles.editor,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.bg,
                    minHeight: 120,
                  },
                ])}
              />
            </View>
            <PrimaryButton
              label="Save settings"
              onPress={async () => {
                await updateNovelMetadata(sb(), user!.id, id!, {
                  title,
                  author,
                  synopsis,
                  series_name: series.trim() || null,
                  cover_kind: coverKind,
                });
                await load();
                Alert.alert("Saved", "Novel settings updated.");
              }}
            />
            <View
              style={StyleSheet.flatten([
                styles.dangerZone,
                { borderColor: colors.border },
              ])}
            >
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>Danger zone</Text>
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
          </View>
        ) : null}
      </ScrollView>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 28, gap: 8, flex: 1 },
  titleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
  },
  title: { fontFamily: Fonts.serif, fontSize: 32, fontWeight: "700", flexShrink: 1 },
  save: { fontSize: 12, minHeight: 16 },
  segment: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    padding: 3,
    gap: 2,
    marginVertical: 6,
    alignSelf: "flex-start",
  },
  segmentItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 1,
  },
  panel: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    padding: 16,
  },
  selectors: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  block: { borderWidth: StyleSheet.hairlineWidth, padding: 14, gap: 6 },
  h: { fontFamily: Fonts.serif, fontSize: 18, fontWeight: "700" },
  fieldLabel: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  source: { fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: "700" },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
    fontFamily: Fonts.serif,
    fontSize: 16,
  },
  editor: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    padding: 14,
    minHeight: 280,
    textAlignVertical: "top",
    fontFamily: Fonts.serif,
    fontSize: 17,
    lineHeight: 28,
  },
  dangerZone: {
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
});
