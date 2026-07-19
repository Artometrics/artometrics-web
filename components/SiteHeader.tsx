import { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, usePathname } from "expo-router";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";

const navLinks = [
  { href: "/blog", label: "Reports" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
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

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <View style={styles.shell}>
      <Wrapper>
        <View style={styles.topRow}>
          <Pressable
            onPress={() => setOpen((v) => !v)}
            accessibilityLabel={open ? "Close menu" : "Open menu"}
            style={styles.menuBtn}
          >
            <Text style={styles.menuIcon}>{open ? "✕" : "☰"}</Text>
          </Pressable>

          <Link href="/" asChild>
            <Pressable style={styles.logoWrap} accessibilityLabel="Artometrics home">
              <Logo size={32} />
            </Pressable>
          </Link>

          <View style={styles.actions}>
            {user ? (
              <Link href="/account" asChild>
                <Pressable>
                  <Text style={styles.accountLink}>Account</Text>
                </Pressable>
              </Link>
            ) : (
              <Link href="/pricing" asChild>
                <Pressable style={styles.subscribe}>
                  <Text style={styles.subscribeText}>Subscribe</Text>
                </Pressable>
              </Link>
            )}
          </View>
        </View>

        <View style={styles.navRow}>
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link key={link.href} href={link.href} asChild>
                <Pressable>
                  <Text style={[styles.navLink, active && styles.navLinkActive]}>
                    {link.label}
                  </Text>
                  {active ? <View style={styles.navUnderline} /> : null}
                </Pressable>
              </Link>
            );
          })}
        </View>

        {open ? (
          <View style={styles.mobilePanel}>
            <Link href="/authors" asChild>
              <Pressable style={styles.mobileItem} onPress={() => setOpen(false)}>
                <Text style={styles.navLink}>Authors</Text>
              </Pressable>
            </Link>
            {!user ? (
              <Link href="/login" asChild>
                <Pressable style={styles.mobileItem} onPress={() => setOpen(false)}>
                  <Text style={styles.navLink}>Log in</Text>
                </Pressable>
              </Link>
            ) : null}
          </View>
        ) : null}
      </Wrapper>
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
    paddingVertical: 16,
    gap: 12,
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.base200,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: { fontSize: 16, color: Colors.base900 },
  logoWrap: { flex: 1, alignItems: "center" },
  actions: { minWidth: 88, alignItems: "flex-end" },
  subscribe: {
    backgroundColor: Colors.base900,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  subscribeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  accountLink: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: Colors.base600,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 28,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.base200,
    paddingVertical: 14,
  },
  navLink: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: Colors.base900,
  },
  navLinkActive: { color: Colors.accent700 },
  navUnderline: {
    marginTop: 4,
    height: 2,
    backgroundColor: Colors.accent600,
  },
  mobilePanel: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.base200,
    paddingBottom: 12,
  },
  mobileItem: { paddingVertical: 12 },
});
