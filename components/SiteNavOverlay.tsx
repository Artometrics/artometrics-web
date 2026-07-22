import { useEffect } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Link, usePathname } from "expo-router";
import { Colors, Fonts } from "@/constants/Colors";
import { useChrome } from "@/lib/chrome";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";
import { useAuth } from "@/lib/auth";
import { Wrapper } from "@/components/Wrapper";

const primaryLinks = [
  { href: "/blog", label: "Reports" },
  { href: "/podcast", label: "Podcast" },
  { href: "/resources", label: "Resources" },
  { href: "/datasets", label: "Datasets" },
  { href: "/authors", label: "Authors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
] as const;

const quickLinks = [
  { href: "/blog", label: "Latest" },
  { href: "/podcast", label: "Podcast" },
  { href: "/pricing", label: "Subscribe" },
] as const;

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function isActive(pathname: string, href: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export function SiteNavOverlay() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useChrome();
  const { user } = useAuth();

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

  const sectionCols = [
    SECTION_SLUGS.slice(0, Math.ceil(SECTION_SLUGS.length / 2)),
    SECTION_SLUGS.slice(Math.ceil(SECTION_SLUGS.length / 2)),
  ];

  return (
    <View style={styles.overlay} accessibilityViewIsModal>
      <Wrapper style={styles.inner}>
        <View style={styles.top}>
          <Pressable
            onPress={() => setMenuOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
            style={styles.closeBtn}
            hitSlop={12}
          >
            <Text style={styles.closeGlyph}>✕</Text>
          </Pressable>
          <View style={styles.auth}>
            {user ? (
              <Link href="/account" asChild>
                <Pressable onPress={() => setMenuOpen(false)}>
                  <Text style={styles.signIn}>Account</Text>
                </Pressable>
              </Link>
            ) : (
              <>
                <Link href="/login" asChild>
                  <Pressable onPress={() => setMenuOpen(false)}>
                    <Text style={styles.signIn}>Sign In</Text>
                  </Pressable>
                </Link>
                <Link href="/pricing" asChild>
                  <Pressable onPress={() => setMenuOpen(false)}>
                    <Text style={styles.subscribe}>Subscribe</Text>
                  </Pressable>
                </Link>
              </>
            )}
          </View>
        </View>

        <View style={styles.quickRow}>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} asChild>
              <Pressable onPress={() => setMenuOpen(false)} style={styles.quickItem}>
                <Text
                  style={[
                    styles.quickLink,
                    isActive(pathname, link.href) && styles.quickActive,
                  ]}
                >
                  {link.label}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionsLabel}>Sections</Text>
          <View style={styles.sectionGrid}>
            {sectionCols.map((col, i) => (
              <View key={i} style={styles.sectionCol}>
                {col.map((slug) => (
                  <Link
                    key={slug}
                    href={`/blog?desk=${slug}` as `/blog?desk=${string}`}
                    asChild
                  >
                    <Pressable
                      onPress={() => setMenuOpen(false)}
                      style={styles.sectionItem}
                    >
                      <Text style={styles.sectionLink}>
                        {SECTION_META[slug].title}
                      </Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} asChild>
              <Pressable
                onPress={() => setMenuOpen(false)}
                style={styles.moreItem}
              >
                <Text
                  style={[
                    styles.moreLink,
                    isActive(pathname, link.href) && styles.quickActive,
                  ]}
                >
                  {link.label}
                </Text>
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
    backgroundColor: Colors.white,
    zIndex: 2000,
  },
  inner: { flex: 1, paddingTop: 12, paddingBottom: 24, maxWidth: 720 },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
  },
  closeBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  closeGlyph: { fontSize: 22, color: Colors.accent600, lineHeight: 24 },
  auth: { flexDirection: "row", alignItems: "center", gap: 18 },
  signIn: { fontSize: 14, color: Colors.base900, fontWeight: "500" },
  subscribe: { fontSize: 14, color: Colors.accent600, fontWeight: "700" },
  quickRow: {
    flexDirection: "row",
    gap: 22,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
  },
  quickItem: { paddingVertical: 4 },
  quickLink: { fontSize: 14, color: Colors.base800, fontWeight: "500" },
  quickActive: { color: Colors.accent700 },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 28, paddingBottom: 48 },
  sectionsLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: Colors.accent600,
    marginBottom: 18,
  },
  sectionGrid: { flexDirection: "row", gap: 24 },
  sectionCol: { flex: 1, gap: 14 },
  sectionItem: { paddingVertical: 2 },
  sectionLink: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    lineHeight: 28,
    color: Colors.base900,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.base200,
    marginVertical: 28,
  },
  moreItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base100,
  },
  moreLink: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    color: Colors.base900,
  },
});
