/** Sample maker types — record → synth settings → favorite clips → pack. */

export type SynthSettings = {
  /** Playback rate / pitch (0.5–2). */
  pitch: number;
  /** Gain 0–1. */
  gain: number;
  /** Low-pass filter cutoff Hz (200–12000). */
  filterHz: number;
  /** Soft drive amount 0–1. */
  drive: number;
  preset: "clean" | "lofi" | "bright" | "warm";
};

export type SampleClip = {
  id: string;
  label: string;
  /** Data URI or file URI for the clip audio. */
  uri: string;
  /** Start/end within source recording (seconds). */
  startSec: number;
  endSec: number;
  favorite: boolean;
  createdAt: string;
};

export type SamplePack = {
  id: string;
  userId: string;
  title: string;
  sourceUri: string | null;
  durationSec: number;
  synth: SynthSettings;
  clips: SampleClip[];
  createdAt: string;
  updatedAt: string;
};

export const DEFAULT_SYNTH: SynthSettings = {
  pitch: 1,
  gain: 0.85,
  filterHz: 8000,
  drive: 0.1,
  preset: "clean",
};

export const SYNTH_PRESETS: Record<
  SynthSettings["preset"],
  Omit<SynthSettings, "preset">
> = {
  clean: { pitch: 1, gain: 0.85, filterHz: 10000, drive: 0.05 },
  lofi: { pitch: 0.92, gain: 0.75, filterHz: 2800, drive: 0.35 },
  bright: { pitch: 1.05, gain: 0.9, filterHz: 12000, drive: 0.08 },
  warm: { pitch: 0.98, gain: 0.8, filterHz: 4500, drive: 0.22 },
};

export function applyPreset(preset: SynthSettings["preset"]): SynthSettings {
  return { preset, ...SYNTH_PRESETS[preset] };
}

export function newPackId(): string {
  return `pack_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function newClipId(): string {
  return `clip_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
