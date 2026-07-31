import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  type View as RNView,
} from "react-native";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { AvatarMenu } from "@/components/chrome/AvatarMenu";
import { useAuth } from "@/lib/auth";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { searchSite, type SearchHit } from "@/lib/search";

const PLACEHOLDERS = [
  "Search reports…",
  "Try a desk or topic…",
  "Find a podcast…",
  "Look up an author…",
];

const searchPanelShadow =
  Platform.OS === "web"
    ? ({ boxShadow: "0 10px 28px rgba(23, 23, 23, 0.08)" } as object)
    : {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 6,
      };

export function SiteHeader() {
  const { user } = useAuth();
  const { setMenuOpen } = useChrome();
  const { colors } = useTheme();
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [focused, setFocused] = useState(false);
  const searchRootRef = useRef<RNView | null>(null);
  const inputRef = useRef<TextInput | null>(null);
  const expand = useRef(new Animated.Value(0)).current;
  const closeSearchRef = useRef(() => {});

  const suggestions = useMemo(() => searchSite(q, 6), [q]);

  function closeSearch() {
    setSearchOpen(false);
    setFocused(false);
    setQ("");
    inputRef.current?.blur();
  }
  closeSearchRef.current = closeSearch;

  function openSearch() {
    setSearchOpen(true);
  }

  function submitSearch() {
    const query = q.trim();
    if (!query) {
      router.push("/search");
      closeSearch();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
    closeSearch();
  }

  function goHit(hit: SearchHit) {
    router.push(hit.href as `/`);
    closeSearch();
  }

  useEffect(() => {
    Animated.spring(expand, {
      toValue: searchOpen ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 80,
    }).start();
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [searchOpen, expand]);

  useEffect(() => {
    if (!searchOpen || q.trim().length > 0) return;
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [searchOpen, q]);

  useEffect(() => {
    if (!searchOpen) return;
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        closeSearchRef.current();
      }
    };
    const onPointer = (e: MouseEvent) => {
      const node = searchRootRef.current as unknown as HTMLElement | null;
      if (node && e.target instanceof Node && !node.contains(e.target)) {
        closeSearchRef.current();
      }
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("mousedown", onPointer, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("mousedown", onPointer, true);
    };
  }, [searchOpen]);

  const panelWidth = expand.interpolate({
    inputRange: [0, 1],
    outputRange: [40, Platform.OS === "web" ? 300 : 210],
  });
  const panelOpacity = expand.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0.6, 1],
  });
  const showSuggestions = searchOpen && q.trim().length >= 2 && suggestions.length > 0;
  const studioHref = user ? "/studio" : "/login?next=%2Fstudio";

  return (
    <View className="relative z-40 border-b-2 border-border bg-header">
      {searchOpen ? (
        <Pressable
          accessibilityLabel="Dismiss search"
          onPress={closeSearch}
          className="absolute inset-x-0 top-0 z-[1]"
          style={{ bottom: -4000 }}
        />
      ) : null}

      <Wrapper variant="magazine">
        <View className="z-[2] min-h-14 flex-row items-center justify-between gap-2 py-2.5">
          <Pressable
            onPress={() => setMenuOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            className="z-[2] h-11 w-11 items-center justify-center"
            hitSlop={12}
            testID="site-menu-button"
          >
            <Ionicons
              name="menu-outline"
              size={26}
              color={colors.text}
              style={{ color: colors.text }}
            />
          </Pressable>

          <Link href="/" asChild>
            <Pressable
              className="absolute left-14 right-[200px] z-[3] items-center justify-center"
              accessibilityLabel="Artometrics home"
            >
              <Logo size={32} align="center" compact={0} markVariant="auto" />
            </Pressable>
          </Link>

          <View className="z-[4] ml-auto flex-row items-center justify-end gap-2">
            <View ref={searchRootRef} className="relative z-[5]" collapsable={false}>
              {!searchOpen ? (
                <Pressable
                  onPress={openSearch}
                  accessibilityLabel="Open search"
                  accessibilityRole="button"
                  hitSlop={10}
                  className="h-10 w-10 items-center justify-center rounded-btn border border-border bg-bg-elevated"
                >
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color={colors.text}
                    style={{ color: colors.text }}
                  />
                </Pressable>
              ) : (
                <Animated.View
                  className={[
                    "overflow-hidden min-h-10 rounded-btn border-[1.5px] bg-bg-elevated",
                    focused ? "border-accent" : "border-border",
                  ].join(" ")}
                  style={[
                    {
                      width: panelWidth,
                      opacity: panelOpacity,
                      shadowColor: colors.text,
                    },
                    searchPanelShadow,
                  ]}
                >
                  <View className="h-10 flex-row items-center gap-2 pl-2.5 pr-1.5">
                    <Ionicons
                      name="search"
                      size={18}
                      color={focused ? colors.accent : colors.textMuted}
                      style={{ color: focused ? colors.accent : colors.textMuted }}
                    />
                    <TextInput
                      ref={inputRef}
                      value={q}
                      onChangeText={setQ}
                      placeholder={PLACEHOLDERS[placeholderIdx]}
                      placeholderTextColor={colors.textSubtle}
                      className="min-w-0 flex-1 text-sm font-sans text-fg outline-none"
                      onSubmitEditing={submitSearch}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onKeyPress={(e) => {
                        if (e.nativeEvent.key === "Escape") closeSearch();
                      }}
                      {...(Platform.OS === "web"
                        ? ({
                            onKeyDown: (e: { key?: string; nativeEvent?: { key?: string } }) => {
                              const key = e.key ?? e.nativeEvent?.key;
                              if (key === "Escape" || key === "Esc") closeSearch();
                            },
                          } as object)
                        : null)}
                      returnKeyType="search"
                      accessibilityLabel="Search Artometrics"
                      autoCorrect={false}
                      autoCapitalize="none"
                    />
                    {q.length > 0 ? (
                      <Pressable
                        onPress={() => setQ("")}
                        hitSlop={8}
                        accessibilityLabel="Clear search"
                        className="p-0.5"
                      >
                        <Ionicons
                          name="close-circle"
                          size={18}
                          color={colors.textSubtle}
                          style={{ color: colors.textSubtle }}
                        />
                      </Pressable>
                    ) : null}
                    <Pressable
                      onPress={submitSearch}
                      hitSlop={8}
                      accessibilityLabel="Submit search"
                      className="h-7 w-7 items-center justify-center rounded-btn bg-fg"
                    >
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color={colors.inverse}
                        style={{ color: colors.inverse }}
                      />
                    </Pressable>
                  </View>

                  {showSuggestions ? (
                    <View className="border-t border-border bg-header">
                      {suggestions.map((hit) => (
                        <Pressable
                          key={`${hit.type}-${hit.id}`}
                          onPress={() => goHit(hit)}
                          className="gap-0.5 px-3 py-2.5 active:bg-accent-soft"
                        >
                          <Text className="text-[10px] font-bold uppercase tracking-[1.2px] text-accent">
                            {hit.meta ?? hit.type}
                          </Text>
                          <Text className="text-[15px] leading-5 font-serif text-fg" numberOfLines={1}>
                            {hit.title}
                          </Text>
                        </Pressable>
                      ))}
                      <Pressable
                        onPress={submitSearch}
                        className="border-t border-border px-3 py-2.5"
                      >
                        <Text className="text-[13px] font-sans text-muted">
                          View all results for “{q.trim()}”
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}
                </Animated.View>
              )}
            </View>

            <Pressable
              onPress={() => router.push(studioHref as `/`)}
              accessibilityLabel="Studio"
              accessibilityRole="button"
              hitSlop={8}
              className="min-h-10 flex-row items-center gap-1.5 bg-accent px-3 py-2.5"
            >
              <Text className="text-[11px] font-extrabold uppercase tracking-[1.4px] text-white">
                Studio
              </Text>
              <Ionicons
                name="arrow-forward"
                size={14}
                color="#FFFFFF"
                style={{ color: "#FFFFFF" }}
              />
            </Pressable>

            <AvatarMenu />
          </View>
        </View>
      </Wrapper>
    </View>
  );
}
