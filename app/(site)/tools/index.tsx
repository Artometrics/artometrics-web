import { useEffect } from "react";
import { Pressable, Text, View, StyleSheet, Platform } from "react-native";
import { Link, router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ToolsAccent } from "@/components/tools/ToolsAccent";

const TOOLS = [
  {
    href: "/tools/twilda",
    title: "Twilda",
    eyebrow: "Story workspace",
    body: "Plan, write, storyboard, and keep a Codex — plus a public-domain reference library.",
  },
  {
    href: "/tools/aftercare",
    title: "Aftercare",
    eyebrow: "Identity & ritual",
    body: "Journal, tarot, mood tracking, and birth-profile tools under your Artometrics account.",
  },
] as const;

export default function ToolsHubScreen() {
  const { colors } = useTheme();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?next=%2Ftools");
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <Wrapper variant="narrow" style={styles.wrap}>
        <Text style={[styles.p, { color: colors.textMuted }]}>Loading tools…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Tools"
        description="Twilda and Aftercare — creative tools on your Artometrics profile."
        path="/tools"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Member tools</Text>
      <Text style={[styles.title, { color: colors.text }]}>Tools</Text>
      <ToolsAccent />
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        One Artometrics account. Research, write, and reflect without a second login.
      </Text>

      <View style={styles.list}>
        {TOOLS.map((tool, i) => {
          // Link asChild must wrap Pressable only — never Animated.View.
          // Reanimated + Slot passes style arrays into CSSStyleDeclaration and crashes web.
          const card = (
            <Link href={tool.href} asChild>
              <Pressable
                style={StyleSheet.flatten([
                  styles.card,
                  { borderColor: colors.border, backgroundColor: colors.bgElevated },
                ])}
              >
                <Text style={[styles.cardEyebrow, { color: colors.accent }]}>{tool.eyebrow}</Text>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{tool.title}</Text>
                <Text style={[styles.cardBody, { color: colors.textMuted }]}>{tool.body}</Text>
                <Text style={[styles.cta, { color: colors.accent }]}>Open →</Text>
              </Pressable>
            </Link>
          );
          if (Platform.OS === "web") {
            return (
              <Animated.View key={tool.href} entering={FadeInDown.delay(i * 80).duration(420)}>
                {card}
              </Animated.View>
            );
          }
          return <View key={tool.href}>{card}</View>;
        })}
      </View>

      <View style={styles.foot}>
        <Link href="/library/reference" asChild>
          <PrimaryButton label="Browse reference library" style={{ backgroundColor: colors.text }} />
        </Link>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 40, gap: 12 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 42, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 28, maxWidth: 560 },
  p: { fontFamily: Fonts.serif, fontSize: 16 },
  list: { marginTop: 20, gap: 16 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 22,
    gap: 8,
  },
  cardEyebrow: {
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  cardTitle: { fontFamily: Fonts.serif, fontSize: 28, fontWeight: "700" },
  cardBody: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
  cta: { marginTop: 8, fontWeight: "700", fontSize: 14 },
  foot: { marginTop: 28 },
});
