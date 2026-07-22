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
import { Fonts } from "@/constants/Colors";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { Wrapper } from "@/components/Wrapper";
import {
  CHANNEL_META,
  CHANNEL_SLUGS,
  SECTION_META,
  SECTION_SLUGS,
} from "@/data/sections";

export function SiteNavOverlay() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useChrome();
  const { user } = useAuth();
  const { colors, toggle, mode } = useTheme();
  const [q, setQ] = useState("");
  const [openPillar, setOpenPillar] = useState(true);
  const [openChannel, setOpenChannel] = useState(true);

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
        <View style={[styles.top, { borderBottomColor: colors.border }]}>
          <Pressable
            onPress={() => setMenuOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
            style={styles.closeBtn}
            hitSlop={12}
          >
            <Text style={[styles.closeGlyph, { color: colors.accent }]}>✕</Text>
          </Pressable>
          <View style={styles.auth}>
            <Pressable onPress={toggle} hitSlop={8}>
              <Text style={{ color: colors.accent, fontSize: 14, fontWeight: "600" }}>
                {mode === "dark" ? "Light" : "Dark"}
              </Text>
            </Pressable>
            {user ? (
              <Link href="/account" asChild>
                <Pressable onPress={() => setMenuOpen(false)}>
                  <Text style={[styles.signIn, { color: colors.text }]}>Account</Text>
                </Pressable>
              </Link>
            ) : (
              <>
                <Link href="/login" asChild>
                  <Pressable onPress={() => setMenuOpen(false)}>
                    <Text style={[styles.signIn, { color: colors.text }]}>Sign In</Text>
                  </Pressable>
                </Link>
                <Link href="/pricing" asChild>
                  <Pressable onPress={() => setMenuOpen(false)}>
                    <Text style={[styles.subscribe, { color: colors.accent }]}>Subscribe</Text>
                  </Pressable>
                </Link>
              </>
            )}
          </View>
        </View>

        <View style={[styles.searchRow, { borderColor: colors.border }]}>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search"
            placeholderTextColor={colors.textSubtle}
            style={[styles.searchInput, { color: colors.text }]}
            onSubmitEditing={goSearch}
            returnKeyType="search"
          />
          <Pressable onPress={goSearch} hitSlop={8}>
            <Text style={{ color: colors.accent, fontWeight: "700" }}>Go</Text>
          </Pressable>
        </View>

        <View style={styles.quickRow}>
          {[
            { href: "/blog", label: "Latest" },
            { href: "/podcast", label: "Podcast" },
            { href: "/library", label: "Library" },
            { href: "/get-app", label: "Get the App" },
            { href: "/pricing", label: "Subscribe" },
          ].map((link) => (
            <Link key={link.href} href={link.href as `/blog`} asChild>
              <Pressable onPress={() => setMenuOpen(false)} style={styles.quickItem}>
                <Text style={[styles.quickLink, { color: colors.text }]}>{link.label}</Text>
              </Pressable>
            </Link>
          ))}
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => setOpenPillar((v) => !v)} style={styles.sectionHead}>
            <Text style={[styles.sectionsLabel, { color: colors.accent }]}>Desks</Text>
            <Text style={{ color: colors.textMuted }}>{openPillar ? "−" : "+"}</Text>
          </Pressable>
          {openPillar
            ? SECTION_SLUGS.map((slug) => (
                <Link key={slug} href={`/desks/${slug}` as `/desks/${string}`} asChild>
                  <Pressable onPress={() => setMenuOpen(false)} style={styles.sectionItem}>
                    <Text style={[styles.sectionLink, { color: colors.text }]}>
                      {SECTION_META[slug].title}
                    </Text>
                  </Pressable>
                </Link>
              ))
            : null}

          <Pressable
            onPress={() => setOpenChannel((v) => !v)}
            style={[styles.sectionHead, { marginTop: 24 }]}
          >
            <Text style={[styles.sectionsLabel, { color: colors.accent }]}>Topics</Text>
            <Text style={{ color: colors.textMuted }}>{openChannel ? "−" : "+"}</Text>
          </Pressable>
          {openChannel ? (
            <View style={styles.sectionGrid}>
              {CHANNEL_SLUGS.map((slug) => (
                <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
                  <Pressable onPress={() => setMenuOpen(false)} style={styles.channelItem}>
                    <Text style={[styles.channelLink, { color: colors.text }]}>
                      {CHANNEL_META[slug].title}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          ) : null}

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {[
            { href: "/about", label: "About" },
            { href: "/authors", label: "Authors" },
            { href: "/resources", label: "Resources" },
            { href: "/datasets", label: "Datasets" },
            { href: "/press", label: "Press" },
            { href: "/newsletter", label: "Newsletter" },
            { href: "/contact", label: "Contact" },
            { href: "/security", label: "Security" },
          ].map((link) => (
            <Link key={link.href} href={link.href as `/about`} asChild>
              <Pressable onPress={() => setMenuOpen(false)} style={styles.moreItem}>
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
  inner: { flex: 1, paddingTop: 12, paddingBottom: 24, maxWidth: 720 },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  closeGlyph: { fontSize: 22, lineHeight: 24 },
  auth: { flexDirection: "row", alignItems: "center", gap: 16 },
  signIn: { fontSize: 14, fontWeight: "500" },
  subscribe: { fontSize: 14, fontWeight: "700" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 16, fontFamily: Fonts.sans },
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    paddingVertical: 16,
  },
  quickItem: { paddingVertical: 4 },
  quickLink: { fontSize: 14, fontWeight: "600" },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 8, paddingBottom: 48 },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionsLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  sectionItem: { paddingVertical: 8 },
  sectionLink: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    lineHeight: 28,
  },
  sectionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  channelItem: { width: "46%", paddingVertical: 8 },
  channelLink: { fontFamily: Fonts.serif, fontSize: 18 },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: 24 },
  moreItem: { paddingVertical: 12 },
  moreLink: { fontFamily: Fonts.serif, fontSize: 18 },
});
