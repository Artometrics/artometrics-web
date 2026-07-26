import { Text, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { useTheme } from "@/lib/theme";

export default function NotFoundScreen() {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: "Not found", headerShown: false }} />
      <Wrapper style={styles.wrap}>
        <Text style={[styles.code, { color: colors.accent }]}>404</Text>
        <Text style={[styles.title, { color: colors.text }]}>Page not found</Text>
        <Link href="/">
          <Text style={[styles.link, { color: colors.accent }]}>Return home</Text>
        </Link>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 80, gap: 12, alignItems: "flex-start" },
  code: { fontSize: 14, letterSpacing: 2 },
  title: { fontSize: 32, fontWeight: "300" },
  link: { fontWeight: "600", marginTop: 8 },
});
