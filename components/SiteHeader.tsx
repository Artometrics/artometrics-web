import { Platform, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Fonts } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { useState } from "react";

function MenuIcon({ color }: { color: string }) {
  return (
    <View style={styles.burger} accessibilityElementsHidden>
      <View style={[styles.burgerLine, { backgroundColor: color }]} />
      <View style={[styles.burgerLine, { backgroundColor: color }]} />
      <View style={[styles.burgerLine, { backgroundColor: color }]} />
    </View>
  );
}

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
      <Wrapper>
        <View style={styles.topRow}>
          <Link href="/" asChild>
            <Pressable style={styles.logoWrap} accessibilityLabel="Artometrics home">
              <Logo size={30} style={{ color: colors.text }} />
            </Pressable>
          </Link>

          <View style={styles.actions}>
            {searchOpen ? (
              <View style={[styles.searchBox, { borderColor: colors.border, backgroundColor: colors.bgElevated }]}>
                <TextInput
                  value={q}
                  onChangeText={setQ}
                  placeholder="Search reports…"
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
                <Text style={[styles.iconGlyph, { color: colors.text }]}>⌕</Text>
              </Pressable>
            )}

            <Pressable
              onPress={toggle}
              accessibilityLabel={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              hitSlop={10}
              style={styles.iconBtn}
            >
              <Text style={[styles.iconGlyph, { color: colors.accent }]}>
                {mode === "dark" ? "☀" : "☾"}
              </Text>
            </Pressable>

            {user ? (
              <Link href="/account" asChild>
                <Pressable hitSlop={8} accessibilityLabel="Account">
                  <Text style={[styles.accountLink, { color: colors.textMuted }]}>Account</Text>
                </Pressable>
              </Link>
            ) : (
              <>
                <Link href="/login" asChild>
                  <Pressable hitSlop={8} accessibilityLabel="Sign in">
                    <Text style={[styles.accountLink, { color: colors.textMuted }]}>Sign in</Text>
                  </Pressable>
                </Link>
                <Link href="/pricing" asChild>
                  <Pressable hitSlop={8}>
                    <Text style={[styles.subscribeText, { color: colors.accent }]}>Subscribe</Text>
                  </Pressable>
                </Link>
              </>
            )}
            <Pressable
              onPress={() => setMenuOpen(true)}
              accessibilityRole="button"
              accessibilityLabel="Open menu"
              style={styles.menuBtn}
              hitSlop={12}
              testID="site-menu-button"
            >
              <MenuIcon color={colors.text} />
            </Pressable>
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
    justifyContent: "flex-end",
    paddingVertical: 12,
    minHeight: 56,
    position: "relative",
  },
  logoWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    pointerEvents: "box-none",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    zIndex: 2,
    flexWrap: "wrap",
  },
  subscribeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  accountLink: {
    fontSize: 12,
    fontWeight: "600",
  },
  menuBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  burger: { gap: 5, width: 20 },
  burgerLine: {
    height: 1.5,
    width: "100%",
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  iconGlyph: { fontSize: 18, lineHeight: 22 },
  searchBox: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    minWidth: Platform.OS === "web" ? 180 : 140,
    maxWidth: 240,
    height: 34,
    justifyContent: "center",
  },
  searchInput: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    outlineStyle: "none" as unknown as undefined,
  },
});
