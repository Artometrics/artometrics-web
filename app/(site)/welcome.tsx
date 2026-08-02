import { useMemo, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import Svg, { Path, Rect } from "react-native-svg";
import { PageSeo } from "@/components/PageSeo";
import { AtmMark } from "@/components/AtmMark";
import { Colors } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import {
  getBlogPosts,
  getPodcastEpisodes,
  sectionLabel,
} from "@/lib/content";
import { openExternalUrl } from "@/lib/openExternal";
import { trackEvent } from "@/lib/analytics/ga";

type FeedTab = "reports" | "podcast";

type BioLink = {
  label: string;
  href: string;
  primary?: boolean;
};

type DeskChip = {
  label: string;
  href: string;
};

type SocialIcon = {
  id: string;
  label: string;
  href: string;
};

const DESKS: DeskChip[] = [
  { label: "Arts", href: "/topics/arts" },
  { label: "Sports", href: "/topics/sports" },
  { label: "Science", href: "/topics/science" },
  { label: "Humanities", href: "/topics/humanities" },
  { label: "Civics", href: "/topics/civics" },
  { label: "Culture", href: "/topics/culture" },
  { label: "Studio", href: "/studio" },
  { label: "Podcast", href: "/podcast" },
];

const SOCIAL: SocialIcon[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: process.env.EXPO_PUBLIC_INSTAGRAM_URL?.trim() || "",
  },
  {
    id: "x",
    label: "X",
    href: "https://twitter.com/artometrics",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: process.env.EXPO_PUBLIC_TIKTOK_URL?.trim() || "",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Artometrics",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: process.env.EXPO_PUBLIC_YOUTUBE_URL?.trim() || "",
  },
].filter((s) => Boolean(s.href));

const LINKS: BioLink[] = [
  { label: "Read the latest reports →", href: "/blog", primary: true },
  {
    label: "Beyoncé and the Cost of Controlling the House",
    href: "/beyonce-the-psychonomics-of-control",
  },
  {
    label: "Padres ownership blueprint",
    href: "/padres-world-series-ownership-blueprint",
  },
  { label: "Listen to the podcast", href: "/podcast" },
];

function SocialGlyph({ id, size = 20 }: { id: string; size?: number }) {
  const stroke = Colors.white;
  if (id === "instagram") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
        <Rect x="3" y="3" width="18" height="18" rx="5" stroke={stroke} strokeWidth={1.5} fill="none" />
        <Path
          d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z"
          stroke={stroke}
          strokeWidth={1.5}
          fill="none"
        />
        <Path d="M17.2 6.8h.01" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
      </Svg>
    );
  }
  if (id === "x") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
        <Path
          d="M4.5 4.5l15 15M19.5 4.5l-15 15"
          stroke={stroke}
          strokeWidth={1.7}
          strokeLinecap="round"
        />
      </Svg>
    );
  }
  if (id === "tiktok") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
        <Path
          d="M14 4v9.2a3.8 3.8 0 1 1-3.2-3.75V12a1.9 1.9 0 1 0 1.9 1.9V4h1.3c.5 2.2 2.1 3.7 4.3 4.1V9.5c-1.5-.2-2.8-.9-3.7-2V4H14z"
          fill={stroke}
        />
      </Svg>
    );
  }
  if (id === "github") {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
        <Path
          d="M9 19c-4 1.5-4-2-6-2m12 4v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.6 4.6 0 0 0 18 5.8 4.3 4.3 0 0 0 17.9 3s-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C6.3 2.7 5.3 3 5.3 3a4.3 4.3 0 0 0-.1 2.8A4.6 4.6 0 0 0 4 9.3c0 4.7 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.2V21"
          stroke={stroke}
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Rect x="2.5" y="6" width="19" height="12" rx="2.5" stroke={stroke} strokeWidth={1.5} fill="none" />
      <Path d="M10.5 9.5v5l5-2.5z" fill={stroke} />
    </Svg>
  );
}

function go(href: string) {
  trackEvent("welcome_link_click", { href });
  if (/^https?:\/\//i.test(href) || href.startsWith("mailto:")) {
    void openExternalUrl(href);
    return;
  }
  router.push(href as `/`);
}

export default function WelcomeScreen() {
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState<FeedTab>("reports");
  const maxW = Math.min(width, 440);
  const pad = 20;
  const coverW = Math.min(220, maxW - pad * 2 - 24);
  const coverH = Math.round(coverW * 1.25);
  const fade = useRef(new Animated.Value(1)).current;

  const reports = useMemo(
    () =>
      getBlogPosts()
        .filter((p) => Boolean(p.heroImage))
        .slice(0, 12),
    [],
  );
  const episodes = useMemo(() => getPodcastEpisodes().slice(0, 9), []);

  const feedItems =
    tab === "reports"
      ? reports.map((p) => ({
          key: p.slug,
          href: `/${p.slug}`,
          image: p.heroImage as string,
          title: p.title,
          desk: sectionLabel(p.tags) || "Report",
        }))
      : episodes.map((e) => ({
          key: e.id,
          href: `/podcast/interviews/${e.id}`,
          image: e.image?.url ?? "",
          title: e.title,
          desk: e.episodeNumber ? `Episode ${e.episodeNumber}` : "Podcast",
        }));

  function switchTab(next: FeedTab) {
    if (next === tab) return;
    Animated.sequence([
      Animated.timing(fade, { toValue: 0.35, duration: 120, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
    setTab(next);
  }

  return (
    <View
      className="w-full items-center self-center"
      style={{ backgroundColor: Colors.black, minHeight: "100%", paddingBottom: 56 }}
    >
      <PageSeo
        title="Welcome"
        description="Artometrics link hub — reports, podcast, Studio, and desks."
        path="/welcome"
      />

      <View style={{ width: "100%", maxWidth: maxW, paddingHorizontal: pad, paddingTop: 40 }}>
        {/* Brand — Chomsky first, like the site CTA band */}
        <View className="items-start gap-3">
          <AtmMark size="md" />
          <Text
            className="text-[40px] leading-[42px] text-white"
            style={{ fontFamily: "Chomsky" }}
            accessibilityRole="header"
          >
            Artometrics
          </Text>
          <View style={{ height: 3, width: 72, backgroundColor: Colors.magazineAccent }} />
          <Text className="font-mono text-[15px] font-medium uppercase leading-5 tracking-[0.04em] text-white">
            Data reports on culture, power, and the creative economy.
          </Text>

          <View className="mt-1 w-full flex-row flex-wrap gap-x-4 gap-y-2">
            {DESKS.map((d) => (
              <Pressable
                key={d.href}
                onPress={() => go(d.href)}
                accessibilityRole="link"
                accessibilityLabel={d.label}
              >
                <Text className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-white/70">
                  {d.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {SOCIAL.length > 0 ? (
            <View className="mt-3 flex-row items-center gap-4">
              {SOCIAL.map((s) => (
                <Pressable
                  key={s.id}
                  onPress={() => go(s.href)}
                  accessibilityRole="link"
                  accessibilityLabel={s.label}
                  className="h-9 w-9 items-center justify-center border border-white/40"
                >
                  <SocialGlyph id={s.id} />
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        {/* CTA stack — primary red, secondary outline */}
        <View className="mt-8 gap-3">
          {LINKS.map((link) => (
            <Pressable
              key={link.href}
              onPress={() => go(link.href)}
              accessibilityRole="link"
              accessibilityLabel={link.label}
              className="items-center justify-center px-4 py-4"
              style={
                link.primary
                  ? { backgroundColor: Colors.accent500 }
                  : {
                      borderWidth: 2,
                      borderColor: Colors.white,
                      backgroundColor: Colors.black,
                    }
              }
            >
              <Text
                className={`text-center font-mono text-[13px] font-medium uppercase tracking-[0.04em] ${
                  link.primary ? "text-white" : "text-white"
                }`}
              >
                {link.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Cover carousel */}
        <View className="mt-10 border-t-2 border-white pt-6">
          <View className="mb-4 flex-row items-end justify-between">
            <View className="flex-row">
              {(
                [
                  { id: "reports" as const, label: "Reports" },
                  { id: "podcast" as const, label: "Podcast" },
                ] as const
              ).map((t) => {
                const active = tab === t.id;
                return (
                  <Pressable
                    key={t.id}
                    onPress={() => switchTab(t.id)}
                    className="mr-5 pb-2"
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                    style={{
                      borderBottomWidth: active ? 3 : 0,
                      borderBottomColor: Colors.magazineAccent,
                    }}
                  >
                    <Text
                      className={`font-mono text-[12px] font-medium uppercase tracking-[0.1em] ${
                        active ? "text-white" : "text-white/45"
                      }`}
                    >
                      {t.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Text className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">
              Swipe →
            </Text>
          </View>

          <Animated.View style={{ opacity: fade }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate="fast"
              snapToInterval={coverW + 12}
              contentContainerStyle={{ gap: 12, paddingRight: 8 }}
            >
              {feedItems.map((item) => {
                const uri = assetUrl(item.image);
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => go(item.href)}
                    accessibilityRole="link"
                    accessibilityLabel={item.title}
                    style={{ width: coverW }}
                  >
                    <View
                      style={{
                        width: coverW,
                        height: coverH,
                        backgroundColor: Colors.base900,
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.2)",
                        overflow: "hidden",
                      }}
                    >
                      {uri ? (
                        <Image
                          source={{ uri }}
                          style={{ width: coverW, height: coverH }}
                          contentFit="cover"
                        />
                      ) : null}
                      <View
                        pointerEvents="none"
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          padding: 12,
                          backgroundColor: "rgba(0,0,0,0.72)",
                        }}
                      >
                        <Text
                          className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em]"
                          style={{ color: Colors.accent400 }}
                          numberOfLines={1}
                        >
                          {item.desk}
                        </Text>
                        <Text
                          className="font-mono text-[13px] font-medium uppercase leading-4 tracking-[0.02em] text-white"
                          numberOfLines={3}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Animated.View>
        </View>

        <View className="mt-10 items-start gap-2 border-t border-white/25 pt-6">
          <Text
            className="text-[22px] text-white"
            style={{ fontFamily: "Chomsky" }}
          >
            Artometrics
          </Text>
          <Text className="font-sans text-[13px] leading-5 text-white/55">
            Independent data-science magazine. Evidence without hype.
          </Text>
          <Pressable onPress={() => go("/")} accessibilityRole="link">
            <Text className="mt-1 font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-accent">
              artometrics.com →
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
