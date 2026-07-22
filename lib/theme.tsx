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
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<Preference>("system");
  const [system, setSystem] = useState<ThemeMode>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSystem(systemMode());
    try {
      const saved =
        Platform.OS === "web" && typeof localStorage !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      if (saved === "light" || saved === "dark" || saved === "system") {
        setPreferenceState(saved);
      }
    } catch {
      /* ignore */
    }
    setReady(true);

    if (Platform.OS !== "web" || typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystem(mq.matches ? "dark" : "light");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const setPreference = useCallback((p: Preference) => {
    setPreferenceState(p);
    try {
      if (Platform.OS === "web" && typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, p);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const mode: ThemeMode =
    preference === "system" ? system : preference;

  const toggle = useCallback(() => {
    setPreference(mode === "dark" ? "light" : "dark");
  }, [mode, setPreference]);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined" || !ready) return;
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
    document.body.style.backgroundColor = Themes[mode].bg;
    document.body.style.color = Themes[mode].text;
  }, [mode, ready]);

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
