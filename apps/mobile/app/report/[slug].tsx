import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { absoluteUrl } from "@/lib/api";
import {
  addLocalSave,
  isLocallySaved,
  removeLocalSave,
  setReadingProgress,
} from "@/lib/storage";

export default function ReportScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];
  const [saved, setSaved] = useState(false);
  const [title, setTitle] = useState(slug ?? "Report");

  const url = absoluteUrl(`/${slug}/`);

  const refreshSaved = useCallback(async () => {
    if (!slug) return;
    setSaved(await isLocallySaved(slug));
  }, [slug]);

  useEffect(() => {
    void refreshSaved();
  }, [refreshSaved]);

  const toggleSave = async () => {
    if (!slug) return;
    if (saved) {
      await removeLocalSave(slug);
      setSaved(false);
      return;
    }
    await addLocalSave(slug, title);
    setSaved(true);
  };

  if (!slug) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Missing report slug.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: title,
          headerRight: () => (
            <Pressable onPress={() => void toggleSave()} style={styles.saveBtn}>
              <Text style={[styles.saveText, { color: colors.tint }]}>
                {saved ? "Saved" : "Save"}
              </Text>
            </Pressable>
          ),
        }}
      />
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => (
          <View style={[styles.center, { backgroundColor: colors.background }]}>
            <ActivityIndicator color={colors.tint} />
          </View>
        )}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data) as {
              type: string;
              title?: string;
              scrollY?: number;
              progress?: number;
            };
            if (data.type === "title" && data.title) {
              setTitle(data.title);
            }
            if (data.type === "progress" && typeof data.progress === "number") {
              void setReadingProgress({
                slug,
                title: data.title ?? title,
                path: `/${slug}/`,
                scrollY: data.scrollY ?? 0,
                progress: data.progress,
                updatedAt: new Date().toISOString(),
              });
            }
          } catch {
            /* ignore malformed messages */
          }
        }}
        injectedJavaScript={`
          (function () {
            function post(payload) {
              window.ReactNativeWebView.postMessage(JSON.stringify(payload));
            }
            post({ type: 'title', title: document.title.replace(/\\s*—\\s*Artometrics$/, '') });
            function track() {
              var scrollTop = window.scrollY || document.documentElement.scrollTop;
              var height = document.documentElement.scrollHeight - window.innerHeight;
              var progress = height > 0 ? (scrollTop / height) * 100 : 0;
              if (progress < 3) return;
              post({
                type: 'progress',
                title: document.title.replace(/\\s*—\\s*Artometrics$/, ''),
                scrollY: scrollTop,
                progress: progress
              });
            }
            window.addEventListener('scroll', function () {
              requestAnimationFrame(track);
            }, { passive: true });
          })();
          true;
        `}
        style={{ flex: 1, backgroundColor: colors.background }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  saveText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
