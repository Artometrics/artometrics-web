export interface SavedArticle {
  slug: string;
  title: string;
  savedAt: string;
}

export interface ReadingProgress {
  slug: string;
  title: string;
  path: string;
  scrollY: number;
  progress: number;
  updatedAt: string;
}

const SAVES_KEY = "artometrics:saved-articles";
const READING_KEY = "artometrics:reading-progress";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalSaves(): SavedArticle[] {
  return readJson<SavedArticle[]>(SAVES_KEY, []);
}

export function isLocallySaved(slug: string): boolean {
  return getLocalSaves().some((item) => item.slug === slug);
}

export function addLocalSave(slug: string, title: string) {
  const items = getLocalSaves().filter((item) => item.slug !== slug);
  items.unshift({ slug, title, savedAt: new Date().toISOString() });
  writeJson(SAVES_KEY, items.slice(0, 200));
}

export function removeLocalSave(slug: string) {
  writeJson(
    SAVES_KEY,
    getLocalSaves().filter((item) => item.slug !== slug)
  );
}

export function getReadingMap(): Record<string, ReadingProgress> {
  return readJson<Record<string, ReadingProgress>>(READING_KEY, {});
}

export function setReadingProgress(progress: ReadingProgress) {
  const map = getReadingMap();
  map[progress.slug] = progress;
  writeJson(READING_KEY, map);
}

export function getReadingProgress(slug: string): ReadingProgress | null {
  return getReadingMap()[slug] ?? null;
}

export function getLatestReading(): ReadingProgress | null {
  const items = Object.values(getReadingMap());
  if (!items.length) return null;
  return items.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];
}

export function clearReadingProgress(slug: string) {
  const map = getReadingMap();
  delete map[slug];
  writeJson(READING_KEY, map);
}
