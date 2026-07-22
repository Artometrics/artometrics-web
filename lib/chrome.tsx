import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ChromeContextValue = {
  scrollY: number;
  setScrollY: (y: number) => void;
  /** 0 = full wordmark, 1 = solid Chomsky A */
  logoCompact: number;
  isArticle: boolean;
  setIsArticle: (value: boolean) => void;
};

const ChromeContext = createContext<ChromeContextValue | null>(null);

const ARTICLE_COMPACT_START = 48;
const ARTICLE_COMPACT_END = 220;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollYState] = useState(0);
  const [isArticle, setIsArticle] = useState(false);

  const setScrollY = useCallback((y: number) => {
    setScrollYState((prev) => (Math.abs(prev - y) < 1 ? prev : y));
  }, []);

  const logoCompact = useMemo(() => {
    if (!isArticle) return 0;
    return clamp01(
      (scrollY - ARTICLE_COMPACT_START) /
        (ARTICLE_COMPACT_END - ARTICLE_COMPACT_START),
    );
  }, [isArticle, scrollY]);

  const value = useMemo(
    () => ({
      scrollY,
      setScrollY,
      logoCompact,
      isArticle,
      setIsArticle,
    }),
    [scrollY, setScrollY, logoCompact, isArticle],
  );

  return (
    <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
  );
}

export function useChrome() {
  const ctx = useContext(ChromeContext);
  if (!ctx) {
    throw new Error("useChrome must be used within ChromeProvider");
  }
  return ctx;
}
