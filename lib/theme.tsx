import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Appearance, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Themes, type ThemeColors, type ThemeMode } from "@/constants/Colors";

type Preference = ThemeMode | "system";

type ThemeContextValue = {
  preference: Preference;
  mode: ThemeMode;
  colors: ThemeColors;
  setPreference: (p: Preference) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "artometrics-theme";

function systemMode(): ThemeMode {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
}

function readStoredPreferenceSync(): Preference | null {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark" || saved === "system") return saved;
    }
  } catch {
    /* ignore */
  }
  return null;
}

async function readStoredPreference(): Promise<Preference | null> {
  const sync = readStoredPreferenceSync();
  if (sync) return sync;
  try {
    if (Platform.OS === "web") return null;
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {
    /* ignore */
  }
  return null;
}

async function writeStoredPreference(p: Preference): Promise<void> {
  try {
    if (Platform.OS === "web" && typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, p);
      return;
    }
    await AsyncStorage.setItem(STORAGE_KEY, p);
  } catch {
    /* ignore */
  }
}

/** Keep html/body/#root + RN Appearance in lockstep (fixes light text on white). */
function applyDomTheme(mode: ThemeMode) {
  // RN Web inherits OS dark styling for icons/text unless Appearance matches site theme.
  try {
    Appearance.setColorScheme?.(mode);
  } catch {
    /* older runtimes */
  }

  if (Platform.OS !== "web" || typeof document === "undefined") return;
  const bg = Themes[mode].bg;
  const fg = Themes[mode].text;
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.style.setProperty("color-scheme", mode);
  root.style.colorScheme = mode;
  root.style.backgroundColor = bg;
  document.body.style.backgroundColor = bg;
  document.body.style.color = fg;
  const appRoot = document.getElementById("root");
  if (appRoot) {
    appRoot.style.backgroundColor = bg;
    appRoot.style.color = fg;
  }
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.setAttribute("content", mode);
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", bg);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to explicit light (magazine) so OS dark mode cannot wash out text
  // before the user opts into dark / system.
  const [preference, setPreferenceState] = useState<Preference>(
    () => readStoredPreferenceSync() ?? "light",
  );
  const [system, setSystem] = useState<ThemeMode>(() => systemMode());

  useEffect(() => {
    setSystem(systemMode());
    let cancelled = false;
    // Native: hydrate from AsyncStorage. Web already read sync from localStorage.
    if (Platform.OS !== "web") {
      void readStoredPreference().then((saved) => {
        if (!cancelled && saved) setPreferenceState(saved);
      });
    }

    if (Platform.OS === "web" && typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => setSystem(mq.matches ? "dark" : "light");
      mq.addEventListener?.("change", onChange);
      return () => {
        cancelled = true;
        mq.removeEventListener?.("change", onChange);
      };
    }

    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystem(colorScheme === "dark" ? "dark" : "light");
    });
    return () => {
      cancelled = true;
      sub.remove();
    };
  }, []);

  const setPreference = useCallback((p: Preference) => {
    setPreferenceState(p);
    void writeStoredPreference(p);
  }, []);

  const mode: ThemeMode = preference === "system" ? system : preference;

  const toggle = useCallback(() => {
    // Explicit light/dark — never leave "system" after a manual toggle.
    setPreference(mode === "dark" ? "light" : "dark");
  }, [mode, setPreference]);

  useEffect(() => {
    applyDomTheme(mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      preference,
      mode,
      colors: Themes[mode],
      setPreference,
      toggle,
    }),
    [preference, mode, setPreference, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      preference: "system" as Preference,
      mode: "light" as ThemeMode,
      colors: Themes.light,
      setPreference: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}
