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
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

const defaultChrome: ChromeContextValue = {
  scrollY: 0,
  setScrollY: () => {},
  logoCompact: 0,
  isArticle: false,
  setIsArticle: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
};

const ChromeContext = createContext<ChromeContextValue>(defaultChrome);

const ARTICLE_COMPACT_START = 48;
const ARTICLE_COMPACT_END = 220;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollYState] = useState(0);
  const [isArticle, setIsArticle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const setScrollY = useCallback((y: number) => {
    setScrollYState((prev) => (Math.abs(prev - y) < 8 ? prev : y));
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
      menuOpen,
      setMenuOpen,
    }),
    [scrollY, setScrollY, logoCompact, isArticle, menuOpen],
  );

  return (
    <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
  );
}

export function useChrome() {
  return useContext(ChromeContext);
}
