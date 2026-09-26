import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";
import { kv } from "@/lib/storage/kv";

export type AppLocale = "en" | "zh";

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  toggleLocale: () => void;
  /** Short label for the active locale (visible feedback). */
  label: string;
};

const STORAGE_KEY = "artometrics-locale";

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredSync(): AppLocale | null {
  try {
    const saved = kv.getString(STORAGE_KEY);
    if (saved === "en" || saved === "zh") return saved;
  } catch {
    /* ignore */
  }
  return null;
}

function persistLocale(locale: AppLocale) {
  try {
    kv.set(STORAGE_KEY, locale);
    void kv.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

function applyDomLang(locale: AppLocale) {
  if (Platform.OS === "web" && typeof document !== "undefined") {
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : "en";
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(
    () => readStoredSync() ?? "en",
  );

  useEffect(() => {
    let cancelled = false;
    void kv.getItem(STORAGE_KEY).then((saved) => {
      if (!cancelled && (saved === "en" || saved === "zh")) {
        setLocaleState(saved);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    applyDomLang(locale);
  }, [locale]);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "en" ? "zh" : "en";
      persistLocale(next);
      return next;
    });
  }, []);

  const label = locale === "zh" ? "中文" : "EN";

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, label }),
    [locale, setLocale, toggleLocale, label],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
