import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "@/lib/auth";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Chomsky: require("../assets/fonts/Chomsky.otf"),
  });

  useEffect(() => {
    // Soft-fail: missing Chomsky must not crash the app boot.
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
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
  );
}
