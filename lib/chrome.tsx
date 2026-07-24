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
  isArticle: boolean;
  setIsArticle: (value: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

const defaultChrome: ChromeContextValue = {
  scrollY: 0,
  setScrollY: () => {},
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

  const value = useMemo(
    () => ({
      scrollY,
      setScrollY,
      isArticle,
      setIsArticle,
      menuOpen,
      setMenuOpen,
    }),
    [scrollY, setScrollY, isArticle, menuOpen],
  );

  return (
    <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
  );
}

export function useChrome() {
  return useContext(ChromeContext);
}
