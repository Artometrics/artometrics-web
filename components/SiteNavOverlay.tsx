import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Link, usePathname, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fonts } from "@/constants/Colors";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { Wrapper } from "@/components/Wrapper";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export function SiteNavOverlay() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useChrome();
  const { user } = useAuth();
  const { colors, toggle, mode } = useTheme();
  const [q, setQ] = useState("");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  if (!menuOpen) return null;

  function goSearch() {
    const query = q.trim();
    setMenuOpen(false);
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`);
    else router.push("/search");
  }

  return (
    <View
      style={[styles.overlay, { backgroundColor: colors.overlayBg }]}
      accessibilityViewIsModal
    >
      <Wrapper style={styles.inner}>
        <View style={styles.top}>
          <Pressable
            onPress={() => setMenuOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
            style={styles.closeBtn}
            hitSlop={12}
          >
            <Ionicons name="close" size={28} color={colors.text} />
          </Pressable>
        </View>

        <View style={[styles.searchRow, { borderBottomColor: colors.border }]}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search"
            placeholderTextColor={colors.textSubtle}
            style={[styles.searchInput, { color: colors.text }]}
            onSubmitEditing={goSearch}
            returnKeyType="search"
          />
          <Pressable
            onPress={goSearch}
            style={[styles.goBtn, { backgroundColor: colors.text }]}
            hitSlop={8}
          >
            <Text style={[styles.goText, { color: colors.inverse }]}>GO</Text>
          </Pressable>
        </View>

        <View style={styles.utility}>
          <Link href="/pricing" asChild>
            <Pressable onPress={() => setMenuOpen(false)} style={styles.utilItem}>
              <Ionicons name="newspaper-outline" size={18} color={colors.text} />
              <Text style={[styles.utilText, { color: colors.text }]}>Subscribe</Text>
            </Pressable>
          </Link>
          <Link href="/newsletter" asChild>
            <Pressable onPress={() => setMenuOpen(false)} style={styles.utilItem}>
              <Ionicons name="mail-outline" size={18} color={colors.text} />
              <Text style={[styles.utilText, { color: colors.text }]}>Newsletters</Text>
            </Pressable>
          </Link>
          <Link href={user ? "/account" : "/login"} asChild>
            <Pressable onPress={() => setMenuOpen(false)} style={styles.utilItem}>
              <Ionicons name="person-outline" size={18} color={colors.text} />
              <Text style={[styles.utilText, { color: colors.text }]}>
                {user ? "Account" : "Sign in"}
              </Text>
            </Pressable>
          </Link>
          <Pressable onPress={toggle} style={styles.utilItem}>
            <Ionicons
              name={mode === "dark" ? "sunny-outline" : "moon-outline"}
              size={18}
              color={colors.text}
            />
            <Text style={[styles.utilText, { color: colors.text }]}>
              {mode === "dark" ? "Light mode" : "Dark mode"}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.groupLabel, { color: colors.textSubtle }]}>Sections</Text>
          <Link href="/" asChild>
            <Pressable
              onPress={() => setMenuOpen(false)}
              style={[styles.sectionItem, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.sectionLink, { color: colors.text }]}>Home</Text>
            </Pressable>
          </Link>
          {SECTION_SLUGS.map((slug) => (
            <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
              <Pressable
                onPress={() => setMenuOpen(false)}
                style={[styles.sectionItem, { borderBottomColor: colors.border }]}
              >
                <Text style={[styles.sectionLink, { color: colors.text }]}>
                  {SECTION_META[slug].title}
                </Text>
              </Pressable>
            </Link>
          ))}

          <Text style={[styles.groupLabel, { color: colors.textSubtle, marginTop: 28 }]}>
            More
          </Text>
          {[
            { href: "/blog", label: "Latest" },
            { href: "/podcast", label: "Podcasts" },
            { href: "/about", label: "About" },
            { href: "/authors", label: "Authors" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link key={link.href} href={link.href as `/blog`} asChild>
              <Pressable
                onPress={() => setMenuOpen(false)}
                style={[styles.sectionItem, { borderBottomColor: colors.border }]}
              >
                <Text style={[styles.moreLink, { color: colors.text }]}>{link.label}</Text>
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...Platform.select({
      web: { position: "fixed" as const },
      default: { position: "absolute" as const },
    }),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
  },
  inner: { flex: 1, paddingTop: 8, paddingBottom: 24, maxWidth: 720 },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 4,
  },
  closeBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
  },
  searchInput: { flex: 1, fontSize: 16, fontFamily: Fonts.sans, paddingVertical: 6 },
  goBtn: { paddingHorizontal: 12, paddingVertical: 8 },
  goText: { fontSize: 12, fontWeight: "700", letterSpacing: 0.6 },
  utility: { gap: 14, paddingVertical: 18 },
  utilItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  utilText: { fontSize: 15, fontWeight: "500" },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 48 },
  groupLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 8,
  },
  sectionItem: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionLink: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    lineHeight: 28,
  },
  moreLink: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    lineHeight: 24,
  },
});
