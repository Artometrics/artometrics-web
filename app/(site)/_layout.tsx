import { useEffect } from "react";
import { Slot, usePathname } from "expo-router";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavOverlay } from "@/components/SiteNavOverlay";
import { Colors } from "@/constants/Colors";
import { ChromeProvider, useChrome } from "@/lib/chrome";
import { getBlogPost } from "@/lib/content";

function SiteChrome() {
  const pathname = usePathname();
  const { setScrollY, setIsArticle } = useChrome();

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
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.root}>
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
      </View>
    </SafeAreaView>
  );
}

export default function SiteLayout() {
  return (
    <SafeAreaProvider>
      <ChromeProvider>
        <SiteChrome />
      </ChromeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  root: { flex: 1, backgroundColor: Colors.white, position: "relative" },
  scroll: { flex: 1 },
  content: { flexGrow: 1, paddingBottom: 24 },
});
