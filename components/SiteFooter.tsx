import { Linking, Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Colors, Fonts } from "@/constants/Colors";

const footerGroups = [
  {
    title: "About",
    links: [
      { href: "/about", label: "About Artometrics" },
      { href: "/authors", label: "Authors" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Reports",
    links: [
      { href: "/blog", label: "Archive" },
      { href: "/datasets", label: "Datasets" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    title: "Listen",
    links: [{ href: "/podcast", label: "Podcast" }],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <View style={styles.shell}>
      <Wrapper style={styles.ctaBand}>
        <Text style={styles.ctaTitle}>Ideas that measure culture</Text>
        <Text style={styles.ctaDek}>
          Data reports, public datasets, and desk interviews from Artometrics.
        </Text>
        <Link href="/pricing" asChild>
          <Pressable style={styles.subscribe}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </Pressable>
        </Link>
      </Wrapper>

      <View style={styles.dark}>
        <Wrapper style={styles.inner}>
          {footerGroups.map((group) => (
            <View key={group.title} style={styles.group}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} asChild>
                  <Pressable style={styles.groupLinkWrap}>
                    <Text style={styles.groupLink}>{link.label}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          ))}

          <View style={styles.brandBlock}>
            <Logo size={42} compact={1} />
            <Text style={styles.wordmark}>Artometrics</Text>
          </View>

          <View style={styles.legalRow}>
            <Link href="/legal/privacy" asChild>
              <Pressable>
                <Text style={styles.legalLink}>Privacy Policy</Text>
              </Pressable>
            </Link>
            <Text style={styles.legalSep}>|</Text>
            <Link href="/legal/terms" asChild>
              <Pressable>
                <Text style={styles.legalLink}>Terms</Text>
              </Pressable>
            </Link>
            <Text style={styles.legalSep}>|</Text>
            <Pressable onPress={() => Linking.openURL("https://github.com/Artometrics")}>
              <Text style={styles.legalLink}>GitHub</Text>
            </Pressable>
          </View>
          <Text style={styles.copy}>© {year} Artometrics</Text>
        </Wrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    marginTop: 24,
  },
  ctaBand: {
    paddingVertical: 40,
    gap: 12,
    borderTopWidth: 2,
    borderTopColor: Colors.base900,
  },
  ctaTitle: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    fontWeight: "700",
    color: Colors.base900,
  },
  ctaDek: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    lineHeight: 26,
    color: Colors.base700,
    maxWidth: 480,
  },
  subscribe: {
    alignSelf: "flex-start",
    backgroundColor: Colors.base900,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 8,
  },
  subscribeText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  dark: {
    backgroundColor: Colors.base950,
    paddingVertical: 36,
  },
  inner: { gap: 22 },
  group: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.25)",
    paddingBottom: 14,
    gap: 8,
  },
  groupTitle: {
    fontFamily: "Courier New, Courier, monospace",
    fontSize: 16,
    color: Colors.white,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  groupLinkWrap: { paddingVertical: 2 },
  groupLink: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
  },
  brandBlock: {
    alignItems: "center",
    gap: 10,
    paddingTop: 12,
  },
  wordmark: {
    fontFamily: "Chomsky",
    fontSize: 28,
    color: Colors.white,
  },
  legalRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  legalLink: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },
  legalSep: { color: "rgba(255,255,255,0.35)", fontSize: 12 },
  copy: {
    textAlign: "center",
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
  },
});
