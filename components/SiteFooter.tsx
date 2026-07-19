import { Linking, Pressable, Text, View, StyleSheet } from "react-native";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <View style={styles.shell}>
      <Wrapper style={styles.inner}>
        <Logo size={28} />
        <Text style={styles.tagline}>The Artometrics editorial desk</Text>
        <View style={styles.links}>
          <Pressable onPress={() => Linking.openURL("https://github.com/Artometrics")}>
            <Text style={styles.link}>GitHub</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL("https://twitter.com/artometrics")}>
            <Text style={styles.link}>X</Text>
          </Pressable>
        </View>
        <Text style={styles.copy}>© {year} Artometrics</Text>
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    marginTop: "auto" as unknown as number,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.base200,
    backgroundColor: Colors.base50,
    paddingVertical: 40,
  },
  inner: { alignItems: "center", gap: 10 },
  tagline: { color: Colors.base600, fontSize: 14 },
  links: { flexDirection: "row", gap: 20, marginTop: 8 },
  link: {
    color: Colors.base900,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  copy: { marginTop: 12, color: Colors.base500, fontSize: 12 },
});
