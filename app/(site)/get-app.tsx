import { Linking, Pressable, Text, View, StyleSheet } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

export default function GetAppScreen() {
  const { colors } = useTheme();
  return (
    <Wrapper variant="narrow" style={styles.wrap}>
      <PageSeo
        title="Get the App"
        description="Artometrics on iOS and Android — reports, podcasts, and saved reading."
        path="/get-app"
      />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Mobile</Text>
      <Text style={[styles.title, { color: colors.text }]}>Get the App</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        The Artometrics Expo app brings the magazine to your pocket. App Store and Play listings
        ship after Apple Developer + EAS setup — TestFlight links land here first.
      </Text>
      <View style={styles.actions}>
        <Pressable
          style={[styles.btn, { backgroundColor: colors.text }]}
          onPress={() => Linking.openURL("https://artometrics.com")}
        >
          <Text style={[styles.btnText, { color: colors.inverse }]}>App Store — coming soon</Text>
        </Pressable>
        <Pressable
          style={[styles.btnOutline, { borderColor: colors.border }]}
          onPress={() => Linking.openURL("https://artometrics.com")}
        >
          <Text style={[styles.btnOutlineText, { color: colors.text }]}>
            Google Play — coming soon
          </Text>
        </Pressable>
      </View>
      <Text style={[styles.note, { color: colors.textSubtle }]}>
        Prefer the web magazine? You’re already here — same reports, charts, and membership.
      </Text>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 48, gap: 14 },
  eyebrow: { fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase", fontWeight: "700" },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 28 },
  actions: { gap: 12, marginTop: 8 },
  btn: { paddingVertical: 14, paddingHorizontal: 18, alignItems: "center" },
  btnText: { fontWeight: "700", letterSpacing: 0.5 },
  btnOutline: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  btnOutlineText: { fontWeight: "700" },
  note: { fontSize: 13, lineHeight: 20, marginTop: 8 },
});
