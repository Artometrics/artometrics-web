import AsyncStorage from "@react-native-async-storage/async-storage";

import type { ReadingProgress, SavedArticle } from "@/lib/types";

const SAVES_KEY = "artometrics:saved-articles";
const READING_KEY = "artometrics:reading-progress";

export async function getLocalSaves(): Promise<SavedArticle[]> {
  try {
    const raw = await AsyncStorage.getItem(SAVES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedArticle[];
  } catch {
    return [];
  }
}

export async function isLocallySaved(slug: string): Promise<boolean> {
  const saves = await getLocalSaves();
  return saves.some((item) => item.slug === slug);
}

export async function addLocalSave(slug: string, title: string) {
  const items = (await getLocalSaves()).filter((item) => item.slug !== slug);
  items.unshift({ slug, title, savedAt: new Date().toISOString() });
  await AsyncStorage.setItem(SAVES_KEY, JSON.stringify(items.slice(0, 200)));
}

export async function removeLocalSave(slug: string) {
  const items = (await getLocalSaves()).filter((item) => item.slug !== slug);
  await AsyncStorage.setItem(SAVES_KEY, JSON.stringify(items));
}

async function getReadingMap(): Promise<Record<string, ReadingProgress>> {
  try {
    const raw = await AsyncStorage.getItem(READING_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, ReadingProgress>;
  } catch {
    return {};
  }
}

export async function getLatestReading(): Promise<ReadingProgress | null> {
  const items = Object.values(await getReadingMap());
  if (!items.length) return null;
  return items.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];
}

export async function getReadingProgress(slug: string): Promise<ReadingProgress | null> {
  const map = await getReadingMap();
  return map[slug] ?? null;
}

export async function setReadingProgress(progress: ReadingProgress) {
  const map = await getReadingMap();
  map[progress.slug] = progress;
  await AsyncStorage.setItem(READING_KEY, JSON.stringify(map));
}

export async function clearReadingProgress(slug: string) {
  const map = await getReadingMap();
  delete map[slug];
  await AsyncStorage.setItem(READING_KEY, JSON.stringify(map));
}
