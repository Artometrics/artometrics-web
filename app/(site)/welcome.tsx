import { useMemo, useState } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import Svg, { Path, Rect } from "react-native-svg";
import { PageSeo } from "@/components/PageSeo";
import { Logo } from "@/components/Logo";
import { Colors, Fonts } from "@/constants/Colors";
import { assetUrl } from "@/lib/assets";
import { getBlogPosts, getPodcastEpisodes } from "@/lib/content";
import { openExternalUrl } from "@/lib/openExternal";
import { trackEvent } from "@/lib/analytics/ga";

type FeedTab = "reports" | "podcast";

type BioLink = {
  label: string;
  href: string;
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
  { label: "@Arts", href: "/topics/arts" },
  { label: "@Sports", href: "/topics/sports" },
  { label: "@Science", href: "/topics/science" },
  { label: "@Humanities", href: "/topics/humanities" },
  { label: "@Civics", href: "/topics/civics" },
  { label: "@Culture", href: "/topics/culture" },
  { label: "@Studio", href: "/studio" },
  { label: "@Podcast", href: "/podcast" },
];

/**
 * Social row mirrors a Complex-style bio hub.
 * X + GitHub are always on; set EXPO_PUBLIC_*_URL for the rest.
 */
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
  { label: "Browse the latest reports", href: "/blog" },
  {
    label: "Read Beyoncé and the Cost of Controlling the House",
    href: "/beyonce-the-psychonomics-of-control",
  },
  {
    label: "Read the Padres ownership blueprint",
    href: "/padres-world-series-ownership-blueprint",
  },
  { label: "Listen to the podcast", href: "/podcast" },
];

function SocialGlyph({ id, size = 22 }: { id: string; size?: number }) {
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
  const gap = 4;
  const col = Math.max(96, Math.floor((maxW - pad * 2 - gap * 2) / 3));

  const reports = useMemo(
    () =>
      getBlogPosts()
        .filter((p) => Boolean(p.heroImage))
        .slice(0, 9),
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
        }))
      : episodes.map((e) => ({
          key: e.id,
          href: `/podcast/interviews/${e.id}`,
          image: e.image?.url ?? "",
          title: e.title,
        }));

  return (
    <View
      className="w-full items-center self-center"
      style={{ backgroundColor: Colors.black, minHeight: "100%", paddingBottom: 48 }}
    >
      <PageSeo
        title="Welcome"
        description="Artometrics link hub — reports, podcast, Studio, and desks."
        path="/welcome"
      />

      <View style={{ width: "100%", maxWidth: maxW, paddingHorizontal: pad, paddingTop: 36 }}>
        <View className="items-center gap-3">
          <Logo size={72} compact={1} align="center" markVariant="light" showWordmark={false} />
          <Text
            style={{
              color: Colors.white,
              fontFamily: Fonts.display,
              fontSize: 18,
              letterSpacing: 3.2,
              textTransform: "uppercase",
            }}
          >
            Artometrics
          </Text>

          <View className="mt-2 w-full gap-1.5">
            {[DESKS.slice(0, 4), DESKS.slice(4)].map((row, i) => (
              <View
                key={i}
                className="flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1"
              >
                {row.map((d) => (
                  <Pressable
                    key={d.href}
                    onPress={() => go(d.href)}
                    accessibilityRole="link"
                    accessibilityLabel={d.label}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: Fonts.sans,
                        fontSize: 12,
                        letterSpacing: 0.2,
                      }}
                    >
                      {d.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>

          {SOCIAL.length > 0 ? (
            <View className="mt-4 flex-row items-center justify-center gap-5">
              {SOCIAL.map((s) => (
                <Pressable
                  key={s.id}
                  onPress={() => go(s.href)}
                  accessibilityRole="link"
                  accessibilityLabel={s.label}
                  className="h-10 w-10 items-center justify-center"
                >
                  <SocialGlyph id={s.id} />
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        <View className="mt-8 gap-3.5">
          {LINKS.map((link) => (
            <Pressable
              key={link.href}
              onPress={() => go(link.href)}
              accessibilityRole="link"
              accessibilityLabel={link.label}
              className="items-center justify-center px-4 py-4"
              style={{
                borderWidth: 1,
                borderColor: Colors.white,
                backgroundColor: Colors.black,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: Fonts.sans,
                  fontSize: 14,
                  fontWeight: "700",
                  textAlign: "center",
                  letterSpacing: 0.3,
                }}
              >
                {link.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View
          className="mt-10"
          style={{ borderTopWidth: 1, borderTopColor: Colors.white, paddingTop: 18 }}
        >
          <View className="mb-4 flex-row">
            {(
              [
                { id: "reports" as const, label: "REPORTS" },
                { id: "podcast" as const, label: "PODCAST" },
              ] as const
            ).map((t) => {
              const active = tab === t.id;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => setTab(t.id)}
                  className="mr-6 pb-2"
                  accessibilityRole="tab"
                  accessibilityState={{ selected: active }}
                  style={{
                    borderBottomWidth: active ? 3 : 1,
                    borderBottomColor: active ? Colors.white : "rgba(255,255,255,0.35)",
                  }}
                >
                  <Text
                    style={{
                      color: active ? Colors.white : "rgba(255,255,255,0.55)",
                      fontFamily: Fonts.sans,
                      fontSize: 12,
                      fontWeight: "700",
                      letterSpacing: 1.4,
                    }}
                  >
                    {t.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View className="flex-row flex-wrap" style={{ gap }}>
            {feedItems.map((item) => {
              const uri = assetUrl(item.image);
              return (
                <Pressable
                  key={item.key}
                  onPress={() => go(item.href)}
                  accessibilityRole="link"
                  accessibilityLabel={item.title}
                  style={{ width: col, height: col, backgroundColor: Colors.base900 }}
                >
                  {uri ? (
                    <Image
                      source={{ uri }}
                      style={{ width: col, height: col }}
                      contentFit="cover"
                    />
                  ) : (
                    <View className="h-full w-full items-center justify-center px-1">
                      <Text
                        numberOfLines={3}
                        style={{
                          color: Colors.white,
                          fontFamily: Fonts.sans,
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  )}
                  <View pointerEvents="none" style={{ position: "absolute", top: 6, right: 6 }}>
                    <Logo size={14} compact={1} markVariant="light" showWordmark={false} />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
