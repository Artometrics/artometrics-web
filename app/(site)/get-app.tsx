import { Pressable, Text, View } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { openExternalUrl } from "@/lib/openExternal";

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
  const iosReady = Boolean(IOS_URL);
  const androidReady = Boolean(ANDROID_URL);

  return (
    <Wrapper variant="narrow" className="gap-3.5 py-12">
      <PageSeo
        title="Get the App"
        description="Artometrics on iOS and Android — reports, podcasts, and saved reading."
        path="/get-app"
      />
      <Text className="text-xs tracking-[1.8px] uppercase font-bold text-accent">Mobile</Text>
      <Text className="font-serif text-[36px] font-bold text-fg">Get the App</Text>
      <Text className="font-serif text-[17px] leading-7 text-muted">
        The Artometrics Expo app brings the magazine to your pocket — same reports, charts, and
        membership as the web. Publisher setup guide: docs/APP_STORE_LAUNCH.md in the repo.
      </Text>
      <View className="gap-3 mt-2">
        <Pressable
          className="py-3.5 px-[18px] items-center bg-fg"
          style={{ opacity: iosReady ? 1 : 0.55 }}
          onPress={() =>
            void openExternalUrl(iosReady ? IOS_URL : "https://artometrics.com/contact")
          }
        >
          <Text className="font-bold tracking-wide text-inverse">
            {iosReady ? "Download on the App Store" : "App Store — launching soon"}
          </Text>
        </Pressable>
        {TESTFLIGHT_URL ? (
          <Pressable
            className="border border-border py-3.5 px-[18px] items-center"
            onPress={() => void openExternalUrl(TESTFLIGHT_URL)}
          >
            <Text className="font-bold text-fg">Join TestFlight</Text>
          </Pressable>
        ) : null}
        <Pressable
          className="border border-border py-3.5 px-[18px] items-center"
          style={{ opacity: androidReady ? 1 : 0.55 }}
          onPress={() =>
            void openExternalUrl(
              androidReady ? ANDROID_URL : "https://artometrics.com/contact",
            )
          }
        >
          <Text className="font-bold text-fg">
            {androidReady ? "Get it on Google Play" : "Google Play — after iOS"}
          </Text>
        </Pressable>
      </View>
      <Text className="text-[13px] leading-5 mt-2 text-subtle">
        Prefer the web magazine? You're already here — same reports, charts, and membership.
        {iosReady
          ? ""
          : " Owner: enroll at developer.apple.com ($99/yr), then EAS build — see APP_STORE_LAUNCH.md."}
      </Text>
    </Wrapper>
  );
}
