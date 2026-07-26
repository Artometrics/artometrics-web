import {
  Platform,
  Pressable,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { useState } from "react";

export function SiteHeader() {
  const { user } = useAuth();
  const { setMenuOpen } = useChrome();
  const { colors, toggle, mode } = useTheme();
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
                <Ionicons
                  name="search-outline"
                  size={22}
                  color={colors.text}
                  style={{ color: colors.text }}
                />
              </Pressable>
            )}

            <Pressable
              onPress={toggle}
              accessibilityLabel={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              hitSlop={10}
              style={StyleSheet.flatten([
                styles.iconBtn,
                styles.iconBtnBordered,
                { borderColor: colors.text, backgroundColor: colors.bgElevated },
              ])}
            >
              <Ionicons
                name={mode === "dark" ? "sunny-outline" : "moon-outline"}
                size={20}
                color={colors.text}
                style={{ color: colors.text }}
              />
            </Pressable>

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
    left: 56,
    right: 140,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
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
  iconBtnBordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
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
});
