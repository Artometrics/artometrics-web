import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
  requestRecordingPermissionsAsync,
} from "expo-audio";
import * as Clipboard from "expo-clipboard";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { paramString } from "@/lib/params";
import {
  getSamplePack,
  packToExportJson,
  saveSamplePack,
} from "@/lib/samples/storage";
import {
  DEFAULT_SYNTH,
  applyPreset,
  newClipId,
  type SampleClip,
  type SamplePack,
  type SynthSettings,
} from "@/lib/samples/types";

const NAV = [
  { href: "/tools/samples", label: "Packs" },
  { href: "/tools/samples/record", label: "Record" },
];

export default function SamplePackScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = paramString(params.id);
  const { colors, fonts } = useTheme();
  const { user, ready } = useRequireAuth();
  const [pack, setPack] = useState<SamplePack | null>(null);
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder, 200);
  const player = useAudioPlayer(pack?.sourceUri ?? null);

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    });
  }, []);

  const load = useCallback(async () => {
    if (!user || !id) return;
    const existing = await getSamplePack(user.id, id);
    if (existing) {
      setPack(existing);
      return;
    }
    // Soft-create if opened via stale link
    const now = new Date().toISOString();
    const created: SamplePack = {
      id,
      userId: user.id,
      title: "Untitled pack",
      sourceUri: null,
      durationSec: 0,
      synth: { ...DEFAULT_SYNTH },
      clips: [],
      createdAt: now,
      updatedAt: now,
    };
    await saveSamplePack(created);
    setPack(created);
  }, [user, id]);

  useEffect(() => {
    if (ready && user) void load();
  }, [ready, user, load]);

  const synth = pack?.synth ?? DEFAULT_SYNTH;

  async function persist(next: SamplePack) {
    setPack(next);
    await saveSamplePack(next);
  }

  async function startRec() {
    setStatusMsg(null);
    const perm = await requestRecordingPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Microphone needed", "Allow microphone access to record samples.");
      return;
    }
    try {
      setBusy(true);
      await recorder.prepareToRecordAsync();
      recorder.record();
      setStatusMsg("Recording…");
    } catch (e) {
      Alert.alert("Record error", e instanceof Error ? e.message : "Failed to start");
    } finally {
      setBusy(false);
    }
  }

  async function stopRec() {
    if (!pack || !user) return;
    try {
      setBusy(true);
      await recorder.stop();
      const uri = recorder.uri;
      const duration = recorderState.durationMillis
        ? recorderState.durationMillis / 1000
        : 0;
      if (!uri) {
        setStatusMsg("No recording captured.");
        return;
      }
      await persist({
        ...pack,
        sourceUri: uri,
        durationSec: duration,
      });
      try {
        player.replace(uri);
      } catch {
        /* soft */
      }
      setStatusMsg("Recording saved. Adjust synth, then mark favorite clips.");
    } catch (e) {
      Alert.alert("Stop error", e instanceof Error ? e.message : "Failed to stop");
    } finally {
      setBusy(false);
    }
  }

  function setSynth(patch: Partial<SynthSettings>) {
    if (!pack) return;
    void persist({ ...pack, synth: { ...pack.synth, ...patch } });
  }

  function usePreset(preset: SynthSettings["preset"]) {
    if (!pack) return;
    void persist({ ...pack, synth: applyPreset(preset) });
  }

  function addClipFromSource(favorite = true) {
    if (!pack?.sourceUri) {
      Alert.alert("Record first", "Capture audio before creating a clip.");
      return;
    }
    const end = Math.max(0.5, pack.durationSec || 3);
    const clip: SampleClip = {
      id: newClipId(),
      label: `Clip ${pack.clips.length + 1}`,
      uri: pack.sourceUri,
      startSec: 0,
      endSec: end,
      favorite,
      createdAt: new Date().toISOString(),
    };
    void persist({ ...pack, clips: [...pack.clips, clip] });
  }

  function toggleFavorite(clipId: string) {
    if (!pack) return;
    void persist({
      ...pack,
      clips: pack.clips.map((c) =>
        c.id === clipId ? { ...c, favorite: !c.favorite } : c,
      ),
    });
  }

  async function exportPack() {
    if (!pack) return;
    const json = packToExportJson(pack);
    await Clipboard.setStringAsync(json);
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pack.title.replace(/\s+/g, "-").toLowerCase()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    setStatusMsg("Exported favorites JSON.");
  }

  const recording = recorderState.isRecording;
  const presets = useMemo(
    () => ["clean", "lofi", "bright", "warm"] as SynthSettings["preset"][],
    [],
  );

  if (!ready || !user || !pack) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading pack…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title={pack.title}
        description="Shape your recording with synth settings and save favorite clips."
        path={`/tools/samples/${pack.id}`}
      />
      <ToolsSubnav links={NAV} />
      <TextInput
        value={pack.title}
        onChangeText={(title) => void persist({ ...pack, title })}
        style={[
          styles.titleInput,
          { color: colors.text, borderColor: colors.border, fontFamily: fonts.serif },
        ]}
      />
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Record → synth → favorite clips → export.
      </Text>

      <View style={[styles.panel, { borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Transport</Text>
        <View style={styles.row}>
          <PrimaryButton
            label={recording ? "Recording…" : "Record"}
            onPress={() => void startRec()}
            disabled={busy || recording}
            style={{ backgroundColor: recording ? colors.accent : colors.text }}
          />
          <PrimaryButton
            label="Stop"
            onPress={() => void stopRec()}
            disabled={!recording}
            style={{ backgroundColor: colors.textMuted }}
          />
          <PrimaryButton
            label={player.playing ? "Pause" : "Play"}
            onPress={() => {
              if (!pack.sourceUri) return;
              if (player.playing) player.pause();
              else {
                try {
                  player.playbackRate = synth.pitch;
                  player.volume = synth.gain;
                } catch {
                  /* soft */
                }
                player.play();
              }
            }}
            disabled={!pack.sourceUri}
          />
        </View>
        {statusMsg ? (
          <Text style={[styles.meta, { color: colors.accent }]}>{statusMsg}</Text>
        ) : null}
        {pack.sourceUri ? (
          <Text style={[styles.meta, { color: colors.textSubtle }]} numberOfLines={1}>
            Source ready · ~{pack.durationSec.toFixed(1)}s
          </Text>
        ) : null}
      </View>

      <View style={[styles.panel, { borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Synth</Text>
        <View style={styles.presetRow}>
          {presets.map((p) => (
            <Pressable
              key={p}
              onPress={() => usePreset(p)}
              style={[
                styles.chip,
                {
                  backgroundColor: synth.preset === p ? colors.text : colors.bgElevated,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: synth.preset === p ? colors.inverse : colors.text,
                  fontSize: 13,
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {p}
              </Text>
            </Pressable>
          ))}
        </View>
        <SliderRow
          label={`Pitch ${synth.pitch.toFixed(2)}`}
          value={synth.pitch}
          min={0.5}
          max={2}
          onChange={(pitch) => setSynth({ pitch, preset: "clean" })}
          colors={colors}
        />
        <SliderRow
          label={`Gain ${synth.gain.toFixed(2)}`}
          value={synth.gain}
          min={0}
          max={1}
          onChange={(gain) => setSynth({ gain })}
          colors={colors}
        />
        <SliderRow
          label={`Filter ${Math.round(synth.filterHz)} Hz`}
          value={synth.filterHz}
          min={200}
          max={12000}
          onChange={(filterHz) => setSynth({ filterHz })}
          colors={colors}
        />
        <SliderRow
          label={`Drive ${synth.drive.toFixed(2)}`}
          value={synth.drive}
          min={0}
          max={1}
          onChange={(drive) => setSynth({ drive })}
          colors={colors}
        />
      </View>

      <View style={[styles.panel, { borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textMuted }]}>Clips</Text>
        <PrimaryButton label="Add clip from recording" onPress={() => addClipFromSource(true)} />
        {pack.clips.length === 0 ? (
          <Text style={[styles.meta, { color: colors.textSubtle }]}>
            No clips yet. Add favorites to build your sample pack.
          </Text>
        ) : (
          pack.clips.map((clip) => (
            <Pressable
              key={clip.id}
              onPress={() => toggleFavorite(clip.id)}
              style={[styles.clipRow, { borderColor: colors.border }]}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontWeight: "600" }}>{clip.label}</Text>
                <Text style={[styles.meta, { color: colors.textSubtle }]}>
                  {clip.startSec.toFixed(1)}s – {clip.endSec.toFixed(1)}s
                </Text>
              </View>
              <Text style={{ color: clip.favorite ? colors.accent : colors.textMuted }}>
                {clip.favorite ? "★ Favorite" : "☆"}
              </Text>
            </Pressable>
          ))
        )}
      </View>

      <View style={styles.row}>
        <PrimaryButton label="Export favorites" onPress={() => void exportPack()} />
        <Pressable onPress={() => router.push("/tools/samples")}>
          <Text style={{ color: colors.accent, fontWeight: "700" }}>All packs →</Text>
        </Pressable>
      </View>
    </Wrapper>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  onChange,
  colors,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  colors: { text: string; textMuted: string; border: string; accent: string };
}) {
  // Simple stepper buttons — no extra slider dependency
  const step = (max - min) / 20;
  return (
    <View style={styles.sliderRow}>
      <Text style={{ color: colors.textMuted, fontSize: 13, flex: 1 }}>{label}</Text>
      <Pressable
        onPress={() => onChange(Math.max(min, value - step))}
        style={[styles.stepBtn, { borderColor: colors.border }]}
      >
        <Text style={{ color: colors.text }}>−</Text>
      </Pressable>
      <Pressable
        onPress={() => onChange(Math.min(max, value + step))}
        style={[styles.stepBtn, { borderColor: colors.border }]}
      >
        <Text style={{ color: colors.text }}>+</Text>
      </Pressable>
    </View>
  );
}

export async function generateStaticParams() {
  return [{ id: "demo" }];
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 14 },
  titleInput: {
    fontSize: 28,
    fontWeight: "700",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 6,
  },
  deck: { fontSize: 15, lineHeight: 24 },
  panel: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 12,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center" },
  meta: { fontSize: 13 },
  presetRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
  },
  sliderRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
});
