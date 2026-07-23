import { Linking, Pressable, Text, View, StyleSheet } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

const IOS_URL =
  process.env.EXPO_PUBLIC_IOS_STORE_URL?.trim() ||
  process.env.EXPO_PUBLIC_APP_STORE_URL?.trim() ||
  "";
const ANDROID_URL =
  process.env.EXPO_PUBLIC_ANDROID_STORE_URL?.trim() ||
  process.env.EXPO_PUBLIC_PLAY_STORE_URL?.trim() ||
  "";
const TESTFLIGHT_URL = process.env.EXPO_PUBLIC_TESTFLIGHT_URL?.trim() || "";

export default function GetAppScreen() {
  const { colors } = useTheme();
  const iosReady = Boolean(IOS_URL);
  const androidReady = Boolean(ANDROID_URL);

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
        The Artometrics Expo app brings the magazine to your pocket — same reports, charts, and
        membership as the web. Publisher setup guide: docs/APP_STORE_LAUNCH.md in the repo.
      </Text>
      <View style={styles.actions}>
        <Pressable
          style={[styles.btn, { backgroundColor: colors.text, opacity: iosReady ? 1 : 0.55 }]}
          onPress={() => Linking.openURL(iosReady ? IOS_URL : "https://artometrics.com/contact")}
        >
          <Text style={[styles.btnText, { color: colors.inverse }]}>
            {iosReady ? "Download on the App Store" : "App Store — launching soon"}
          </Text>
        </Pressable>
        {TESTFLIGHT_URL ? (
          <Pressable
            style={[styles.btnOutline, { borderColor: colors.border }]}
            onPress={() => Linking.openURL(TESTFLIGHT_URL)}
          >
            <Text style={[styles.btnOutlineText, { color: colors.text }]}>Join TestFlight</Text>
          </Pressable>
        ) : null}
        <Pressable
          style={[styles.btnOutline, { borderColor: colors.border, opacity: androidReady ? 1 : 0.55 }]}
          onPress={() =>
            Linking.openURL(androidReady ? ANDROID_URL : "https://artometrics.com/contact")
          }
        >
          <Text style={[styles.btnOutlineText, { color: colors.text }]}>
            {androidReady ? "Get it on Google Play" : "Google Play — after iOS"}
          </Text>
        </Pressable>
      </View>
      <Text style={[styles.note, { color: colors.textSubtle }]}>
        Prefer the web magazine? You’re already here — same reports, charts, and membership.
        {iosReady
          ? ""
          : " Owner: enroll at developer.apple.com ($99/yr), then EAS build — see APP_STORE_LAUNCH.md."}
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
