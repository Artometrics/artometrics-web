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

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollYState] = useState(0);
  const [isArticle, setIsArticle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const setScrollY = useCallback((y: number) => {
    setScrollYState((prev) => (Math.abs(prev - y) < 8 ? prev : y));
  }, []);

  // Complex chrome keeps a stable centered wordmark — no scroll morph.
  const logoCompact = 0;

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
