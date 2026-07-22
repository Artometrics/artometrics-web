import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Link, router, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";
import { useState } from "react";

export function SiteHeader() {
  const { user } = useAuth();
  const { setMenuOpen } = useChrome();
  const { colors, toggle, mode } = useTheme();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  function submitSearch() {
    const query = q.trim();
    if (!query) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  }

  return (
    <View style={[styles.shell, { backgroundColor: colors.headerBg, borderBottomColor: colors.border }]}>
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
            <Ionicons name="menu-outline" size={26} color={colors.text} />
          </Pressable>

          <Link href="/" asChild>
            <Pressable style={styles.logoWrap} accessibilityLabel="Artometrics home">
              <Logo size={30} align="center" style={{ color: colors.text }} />
            </Pressable>
          </Link>

          <View style={styles.actions}>
            {searchOpen ? (
              <View
                style={[
                  styles.searchBox,
                  { borderColor: colors.border, backgroundColor: colors.bgElevated },
                ]}
              >
                <TextInput
                  value={q}
                  onChangeText={setQ}
                  placeholder="Search"
                  placeholderTextColor={colors.textSubtle}
                  style={[styles.searchInput, { color: colors.text }]}
                  onSubmitEditing={submitSearch}
                  autoFocus
                  returnKeyType="search"
                  accessibilityLabel="Search"
                />
              </View>
            ) : (
              <Pressable
                onPress={() => setSearchOpen(true)}
                accessibilityLabel="Open search"
                hitSlop={10}
                style={styles.iconBtn}
              >
                <Ionicons name="search-outline" size={22} color={colors.text} />
              </Pressable>
            )}

            <Pressable
              onPress={toggle}
              accessibilityLabel={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              hitSlop={10}
              style={styles.iconBtn}
            >
              <Ionicons
                name={mode === "dark" ? "sunny-outline" : "moon-outline"}
                size={20}
                color={colors.text}
              />
            </Pressable>

            <Link href={user ? "/account" : "/login"} asChild>
              <Pressable hitSlop={8} accessibilityLabel={user ? "Account" : "Sign in"} style={styles.iconBtn}>
                <Ionicons name="person-outline" size={20} color={colors.text} />
              </Pressable>
            </Link>
          </View>
        </View>
      </Wrapper>

      <View style={[styles.sectionBar, { borderTopColor: colors.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sectionTrack}
        >
          {SECTION_SLUGS.map((slug) => {
            const active =
              pathname === `/topics/${slug}` || pathname?.startsWith(`/topics/${slug}/`);
            return (
              <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
                <Pressable style={styles.sectionItem} hitSlop={6}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: active ? colors.text : colors.textMuted },
                      active ? styles.sectionActive : null,
                    ]}
                  >
                    {SECTION_META[slug].title}
                  </Text>
                  {active ? (
                    <View style={[styles.sectionUnderline, { backgroundColor: colors.text }]} />
                  ) : null}
                </Pressable>
              </Link>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 40,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    minHeight: 56,
    gap: 8,
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
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 2,
    zIndex: 2,
    marginLeft: "auto",
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    paddingHorizontal: 10,
    minWidth: Platform.OS === "web" ? 140 : 110,
    maxWidth: 200,
    height: 34,
    justifyContent: "center",
  },
  searchInput: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
  sectionBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  sectionTrack: {
    paddingHorizontal: 16,
    gap: 4,
    alignItems: "center",
    minHeight: 40,
  },
  sectionItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    fontFamily: Fonts.sans,
  },
  sectionActive: {
    fontWeight: "800",
  },
  sectionUnderline: {
    marginTop: 4,
    height: 2,
    alignSelf: "stretch",
  },
});
