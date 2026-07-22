import { useEffect } from "react";
import { Slot, usePathname } from "expo-router";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavOverlay } from "@/components/SiteNavOverlay";
import { AppBanner } from "@/components/AppBanner";
import { CookieBanner } from "@/components/CookieBanner";
import { ChromeProvider, useChrome } from "@/lib/chrome";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { getBlogPost } from "@/lib/content";

function SiteChrome() {
  const pathname = usePathname();
  const { setScrollY, setIsArticle } = useChrome();
  const { colors } = useTheme();

  useEffect(() => {
    const slug = pathname.replace(/^\//, "").replace(/\/$/, "");
    const onArticle = Boolean(slug && !slug.includes("/") && getBlogPost(slug));
    setIsArticle(onArticle);
    setScrollY(0);
  }, [pathname, setIsArticle, setScrollY]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.bg }]} edges={["top"]}>
      <View style={[styles.root, { backgroundColor: colors.bg }]}>
        <AppBanner />
        <SiteHeader />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          onScroll={onScroll}
          scrollEventThrottle={32}
        >
          <Slot />
          <SiteFooter />
        </ScrollView>
        <SiteNavOverlay />
        <CookieBanner />
      </View>
    </SafeAreaView>
  );
}

export default function SiteLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ChromeProvider>
          <SiteChrome />
        </ChromeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  root: { flex: 1, position: "relative" },
  scroll: { flex: 1 },
  content: { flexGrow: 1, paddingBottom: 24 },
});
