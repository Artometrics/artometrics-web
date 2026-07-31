import { kv } from "@/lib/storage/kv";
import type { SamplePack } from "@/lib/samples/types";

const KEY = "artometrics-sample-packs";

export async function listSamplePacks(userId: string): Promise<SamplePack[]> {
  const raw = await kv.getItem(KEY);
  if (!raw) return [];
  try {
    const all = JSON.parse(raw) as SamplePack[];
    return all
      .filter((p) => p.userId === userId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch {
    return [];
  }
}

export async function getSamplePack(
  userId: string,
  id: string,
): Promise<SamplePack | null> {
  const packs = await listSamplePacks(userId);
  return packs.find((p) => p.id === id) ?? null;
}

export async function saveSamplePack(pack: SamplePack): Promise<void> {
  const raw = await kv.getItem(KEY);
  let all: SamplePack[] = [];
  try {
    all = raw ? (JSON.parse(raw) as SamplePack[]) : [];
  } catch {
    all = [];
  }
  const idx = all.findIndex((p) => p.id === pack.id);
  const next = { ...pack, updatedAt: new Date().toISOString() };
  if (idx >= 0) all[idx] = next;
  else all.push(next);
  await kv.setItem(KEY, JSON.stringify(all));
}

export async function deleteSamplePack(userId: string, id: string): Promise<void> {
  const raw = await kv.getItem(KEY);
  if (!raw) return;
  try {
    const all = JSON.parse(raw) as SamplePack[];
    const next = all.filter((p) => !(p.userId === userId && p.id === id));
    await kv.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

/** Export pack metadata + favorite clip URIs as JSON (easy download / share). */
export function packToExportJson(pack: SamplePack): string {
  const favorites = pack.clips.filter((c) => c.favorite);
  return JSON.stringify(
    {
      title: pack.title,
      synth: pack.synth,
      clips: favorites.map((c) => ({
        label: c.label,
        uri: c.uri,
        startSec: c.startSec,
        endSec: c.endSec,
      })),
      exportedAt: new Date().toISOString(),
      source: "artometrics-sample-maker",
    },
    null,
    2,
  );
}
