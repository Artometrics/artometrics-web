import { kv } from "@/lib/storage/kv";
import type { SavedPalette } from "@/lib/palette/types";

const KEY = "artometrics-color-palettes";

export async function listPalettes(userId: string): Promise<SavedPalette[]> {
  const raw = await kv.getItem(KEY);
  if (!raw) return [];
  try {
    const all = JSON.parse(raw) as SavedPalette[];
    return all
      .filter((p) => p.userId === userId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch {
    return [];
  }
}

export async function savePalette(palette: SavedPalette): Promise<void> {
  const raw = await kv.getItem(KEY);
  let all: SavedPalette[] = [];
  try {
    all = raw ? (JSON.parse(raw) as SavedPalette[]) : [];
  } catch {
    all = [];
  }
  const next = { ...palette, updatedAt: new Date().toISOString() };
  const idx = all.findIndex((p) => p.id === next.id);
  if (idx >= 0) all[idx] = next;
  else all.push(next);
  await kv.setItem(KEY, JSON.stringify(all));
}

export async function deletePalette(userId: string, id: string): Promise<void> {
  const raw = await kv.getItem(KEY);
  if (!raw) return;
  try {
    const all = JSON.parse(raw) as SavedPalette[];
    await kv.setItem(
      KEY,
      JSON.stringify(all.filter((p) => !(p.userId === userId && p.id === id))),
    );
  } catch {
    /* ignore */
  }
}

export function paletteToExportJson(palette: SavedPalette): string {
  return JSON.stringify(
    {
      title: palette.title,
      seasonId: palette.seasonId,
      colors: palette.colors,
      undertone: palette.undertone,
      depth: palette.depth,
      clarity: palette.clarity,
      notes: palette.notes,
      exportedAt: new Date().toISOString(),
      source: "artometrics-palette",
    },
    null,
    2,
  );
}
