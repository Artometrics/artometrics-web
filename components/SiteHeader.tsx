import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  type View as RNView,
} from "react-native";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
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

  // Click / tap away + Escape close the expanded search.
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
    // Capture phase so Escape still wins while the input is focused.
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("mousedown", onPointer, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("mousedown", onPointer, true);
    };
  }, [searchOpen]);

  const panelWidth = expand.interpolate({
    inputRange: [0, 1],
    outputRange: [40, Platform.OS === "web" ? 320 : 220],
  });
  const panelOpacity = expand.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0.6, 1],
  });
  const showSuggestions = searchOpen && q.trim().length >= 2 && suggestions.length > 0;

  return (
    <View
      style={[
        styles.shell,
        { backgroundColor: colors.headerBg, borderBottomColor: colors.border },
      ]}
    >
      {searchOpen ? (
        <Pressable
          accessibilityLabel="Dismiss search"
          onPress={closeSearch}
          style={styles.dismissScrim}
        />
      ) : null}

      <Wrapper variant="magazine">
        <View style={styles.topRow}>
          <Pressable
            onPress={() => setMenuOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            style={styles.sideBtn}
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
            <Pressable style={styles.logoWrap} accessibilityLabel="Artometrics home">
              <Logo
                size={32}
                align="center"
                compact={0}
                style={{ color: colors.text }}
                markVariant="auto"
              />
            </Pressable>
          </Link>

          <View style={styles.actions}>
            <View ref={searchRootRef} style={styles.searchRoot} collapsable={false}>
              {!searchOpen ? (
                <Pressable
                  onPress={openSearch}
                  accessibilityLabel="Open search"
                  accessibilityRole="button"
                  hitSlop={10}
                  style={StyleSheet.flatten([
                    styles.iconBtn,
                    styles.searchTrigger,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.bgElevated,
                    },
                  ])}
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
                  style={StyleSheet.flatten([
                    styles.searchPanel,
                    {
                      width: panelWidth,
                      opacity: panelOpacity,
                      borderColor: focused ? colors.accent : colors.border,
                      backgroundColor: colors.bgElevated,
                      shadowColor: colors.text,
                    },
                  ])}
                >
                  <View style={styles.searchFieldRow}>
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
                      style={StyleSheet.flatten([styles.searchInput, { color: colors.text }])}
                      onSubmitEditing={submitSearch}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      onKeyPress={(e) => {
                        if (e.nativeEvent.key === "Escape") closeSearch();
                      }}
                      // RN Web: Escape often arrives as DOM keydown, not onKeyPress.
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
                        style={styles.clearBtn}
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
                      style={StyleSheet.flatten([
                        styles.goBtn,
                        { backgroundColor: colors.text },
                      ])}
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
                    <View
                      style={StyleSheet.flatten([
                        styles.suggestPanel,
                        {
                          borderTopColor: colors.border,
                          backgroundColor: colors.headerBg,
                        },
                      ])}
                    >
                      {suggestions.map((hit) => (
                        <Pressable
                          key={`${hit.type}-${hit.id}`}
                          onPress={() => goHit(hit)}
                          style={({ pressed }) =>
                            StyleSheet.flatten([
                              styles.suggestRow,
                              {
                                backgroundColor: pressed ? colors.accentSoft : "transparent",
                              },
                            ])
                          }
                        >
                          <Text style={[styles.suggestMeta, { color: colors.accent }]}>
                            {hit.meta ?? hit.type}
                          </Text>
                          <Text
                            style={[styles.suggestTitle, { color: colors.text }]}
                            numberOfLines={1}
                          >
                            {hit.title}
                          </Text>
                        </Pressable>
                      ))}
                      <Pressable
                        onPress={submitSearch}
                        style={StyleSheet.flatten([
                          styles.suggestAll,
                          { borderTopColor: colors.border },
                        ])}
                      >
                        <Text style={[styles.suggestAllText, { color: colors.textMuted }]}>
                          View all results for “{q.trim()}”
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}
                </Animated.View>
              )}
            </View>

            <Link href={user ? "/account" : "/login"} asChild>
              <Pressable
                hitSlop={8}
                accessibilityLabel={user ? "Account" : "Sign in"}
                style={StyleSheet.flatten([
                  styles.iconBtn,
                  styles.iconBtnBordered,
                  { borderColor: colors.text, backgroundColor: colors.bgElevated },
                ])}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={colors.text}
                  style={{ color: colors.text }}
                />
              </Pressable>
            </Link>
          </View>
        </View>
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 40,
    position: "relative",
  },
  dismissScrim: {
    ...StyleSheet.absoluteFill,
    // Tall enough to catch taps below the header on the page.
    top: 0,
    bottom: -4000,
    zIndex: 1,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    minHeight: 56,
    gap: 8,
    zIndex: 2,
  },
  sideBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  logoWrap: {
    position: "absolute",
    left: 56,
    right: 100,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    zIndex: 4,
    marginLeft: "auto",
  },
  searchRoot: {
    position: "relative",
    zIndex: 5,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchTrigger: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
  },
  iconBtnBordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
  },
  searchPanel: {
    borderWidth: 1.5,
    borderRadius: 2,
    overflow: "hidden",
    minHeight: 40,
    // Soft lift when open — magazine, not glassy/glow.
    ...(Platform.OS === "web"
      ? ({
          boxShadow: "0 10px 28px rgba(23, 23, 23, 0.08)",
        } as object)
      : {
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 6,
        }),
  },
  searchFieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 10,
    paddingRight: 6,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.sans,
    minWidth: 0,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
  clearBtn: {
    padding: 2,
  },
  goBtn: {
    width: 28,
    height: 28,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestPanel: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  suggestRow: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  suggestMeta: {
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  suggestTitle: {
    fontFamily: Fonts.serif,
    fontSize: 15,
    lineHeight: 20,
  },
  suggestAll: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  suggestAllText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
  },
});
