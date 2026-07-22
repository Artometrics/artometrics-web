import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Link, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Wrapper } from "@/components/Wrapper";
import { Colors, Fonts } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

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

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return <Text style={styles.closeGlyph}>✕</Text>;
  }
  return (
    <View style={styles.burger} accessibilityElementsHidden>
      <View style={styles.burgerLine} />
      <View style={styles.burgerLine} />
      <View style={styles.burgerLine} />
    </View>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { height } = useWindowDimensions();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const sectionCols = [
    SECTION_SLUGS.slice(0, Math.ceil(SECTION_SLUGS.length / 2)),
    SECTION_SLUGS.slice(Math.ceil(SECTION_SLUGS.length / 2)),
  ];

  return (
    <View style={styles.shell}>
      <Wrapper>
        <View style={styles.topRow}>
          <View style={styles.sideSlot} />

          <Link href="/" asChild>
            <Pressable style={styles.logoWrap} accessibilityLabel="Artometrics home">
              <Logo size={30} />
            </Pressable>
          </Link>

          <View style={styles.actions}>
            {user ? (
              <Link href="/account" asChild>
                <Pressable hitSlop={8}>
                  <Text style={styles.accountLink}>Account</Text>
                </Pressable>
              </Link>
            ) : (
              <Link href="/pricing" asChild>
                <Pressable hitSlop={8}>
                  <Text style={styles.subscribeText}>Subscribe</Text>
                </Pressable>
              </Link>
            )}
            <Pressable
              onPress={() => setOpen(true)}
              accessibilityLabel="Open menu"
              style={styles.menuBtn}
              hitSlop={8}
            >
              <MenuIcon open={false} />
            </Pressable>
          </View>
        </View>
      </Wrapper>

      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <SafeAreaView style={[styles.overlay, { minHeight: height }]} edges={["top", "bottom"]}>
          <Wrapper style={styles.overlayInner}>
            <View style={styles.overlayTop}>
              <Pressable
                onPress={() => setOpen(false)}
                accessibilityLabel="Close menu"
                style={styles.closeBtn}
                hitSlop={12}
              >
                <Text style={styles.closeGlyph}>✕</Text>
              </Pressable>
              <View style={styles.overlayAuth}>
                {user ? (
                  <Link href="/account" asChild>
                    <Pressable onPress={() => setOpen(false)}>
                      <Text style={styles.signInLink}>Account</Text>
                    </Pressable>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" asChild>
                      <Pressable onPress={() => setOpen(false)}>
                        <Text style={styles.signInLink}>Sign In</Text>
                      </Pressable>
                    </Link>
                    <Link href="/pricing" asChild>
                      <Pressable onPress={() => setOpen(false)}>
                        <Text style={styles.subscribeMenu}>Subscribe</Text>
                      </Pressable>
                    </Link>
                  </>
                )}
              </View>
            </View>

            <View style={styles.quickRow}>
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} asChild>
                  <Pressable onPress={() => setOpen(false)} style={styles.quickItem}>
                    <Text
                      style={[
                        styles.quickLink,
                        isActive(pathname, link.href) && styles.quickLinkActive,
                      ]}
                    >
                      {link.label}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>

            <ScrollView
              style={styles.overlayScroll}
              contentContainerStyle={styles.overlayScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sectionsLabel}>Sections</Text>
              <View style={styles.sectionGrid}>
                {sectionCols.map((col, colIndex) => (
                  <View key={colIndex} style={styles.sectionCol}>
                    {col.map((slug) => (
                      <Link key={slug} href={{ pathname: "/blog", params: { desk: slug } }} asChild>
                        <Pressable
                          onPress={() => setOpen(false)}
                          style={styles.sectionItem}
                          accessibilityLabel={SECTION_META[slug].title}
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

              <View style={styles.moreList}>
                {primaryLinks.map((link) => (
                  <Link key={link.href} href={link.href} asChild>
                    <Pressable
                      onPress={() => setOpen(false)}
                      style={styles.moreItem}
                    >
                      <Text
                        style={[
                          styles.moreLink,
                          isActive(pathname, link.href) && styles.moreLinkActive,
                        ]}
                      >
                        {link.label}
                      </Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
            </ScrollView>
          </Wrapper>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
    backgroundColor: Colors.white,
    zIndex: 40,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    gap: 8,
  },
  sideSlot: { width: 108 },
  logoWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    minWidth: 108,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  subscribeText: {
    color: Colors.accent600,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  accountLink: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.base800,
  },
  menuBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  burger: { gap: 5, width: 20 },
  burgerLine: {
    height: 1.5,
    backgroundColor: Colors.base900,
    width: "100%",
  },
  closeGlyph: {
    fontSize: 20,
    color: Colors.accent600,
    fontWeight: "400",
    lineHeight: 22,
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  overlayInner: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 24,
  },
  overlayTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
  },
  closeBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayAuth: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  signInLink: {
    fontSize: 14,
    color: Colors.base900,
    fontWeight: "500",
  },
  subscribeMenu: {
    fontSize: 14,
    color: Colors.accent600,
    fontWeight: "700",
  },
  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.base200,
  },
  quickItem: { paddingVertical: 4 },
  quickLink: {
    fontSize: 14,
    color: Colors.base800,
    fontWeight: "500",
  },
  quickLinkActive: { color: Colors.accent700 },
  overlayScroll: { flex: 1 },
  overlayScrollContent: { paddingTop: 28, paddingBottom: 48 },
  sectionsLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: Colors.accent600,
    marginBottom: 18,
  },
  sectionGrid: {
    flexDirection: "row",
    gap: 24,
  },
  sectionCol: {
    flex: 1,
    gap: 14,
  },
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
  moreList: { gap: 4 },
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
  moreLinkActive: { color: Colors.accent700 },
});
