import "react-native-gesture-handler";
import "@/global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/lib/auth";
import { AppQueryProvider } from "@/lib/query";
import { useStudioStore } from "@/lib/studio/store";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hydrateStudio = useStudioStore((s) => s.hydrate);
  const [loaded, error] = useFonts({
    Chomsky: require("../assets/fonts/Chomsky.otf"),
    Anton: require("../assets/fonts/Anton-Regular.ttf"),
    "DM Sans": require("../assets/fonts/DMSans.ttf"),
    "DM Sans Italic": require("../assets/fonts/DMSans-Italic.ttf"),
    "DM Mono": require("../assets/fonts/DMMono-Regular.ttf"),
    "DM Mono Medium": require("../assets/fonts/DMMono-Medium.ttf"),
  });

  useEffect(() => {
    hydrateStudio();
  }, [hydrateStudio]);

  useEffect(() => {
    // Soft-fail: missing fonts must not crash the app boot.
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppQueryProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
              animation: "none",
            }}
          >
            <Stack.Screen name="(site)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthProvider>
      </AppQueryProvider>
    </GestureHandlerRootView>
  );
}
