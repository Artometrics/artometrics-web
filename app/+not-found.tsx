import { Text, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found", headerShown: false }} />
      <Wrapper style={styles.wrap}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Page not found</Text>
        <Link href="/">
          <Text style={styles.link}>Return home</Text>
        </Link>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 80, gap: 12, alignItems: "flex-start" },
  code: { fontSize: 14, letterSpacing: 2, color: Colors.accent700 },
  title: { fontSize: 32, fontWeight: "300", color: Colors.base900 },
  link: { color: Colors.accent700, fontWeight: "600", marginTop: 8 },
});
