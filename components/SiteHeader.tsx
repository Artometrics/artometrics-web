import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { useChrome } from "@/lib/chrome";

function MenuIcon() {
  return (
    <View style={styles.burger} accessibilityElementsHidden>
      <View style={styles.burgerLine} />
      <View style={styles.burgerLine} />
      <View style={styles.burgerLine} />
    </View>
  );
}

export function SiteHeader() {
  const { user } = useAuth();
  const { setMenuOpen } = useChrome();

  return (
    <View style={styles.shell}>
      <Wrapper>
        <View style={styles.topRow}>
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
              onPress={() => setMenuOpen(true)}
              accessibilityRole="button"
              accessibilityLabel="Open menu"
              style={styles.menuBtn}
              hitSlop={12}
              testID="site-menu-button"
            >
              <MenuIcon />
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
    borderBottomColor: Colors.base200,
    backgroundColor: Colors.white,
    zIndex: 40,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    gap: 12,
  },
  logoWrap: {
    flexShrink: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
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
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  burger: { gap: 5, width: 20 },
  burgerLine: {
    height: 1.5,
    backgroundColor: Colors.base900,
    width: "100%",
  },
});
