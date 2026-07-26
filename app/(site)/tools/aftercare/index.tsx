import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { StoryProgress } from "@/components/aftercare/StoryProgress";
import { StrategyMap } from "@/components/aftercare/StrategyMap";
import { PlanetPoster } from "@/components/aftercare/PlanetPoster";
import { CosmicChartCard } from "@/components/aftercare/CosmicChartCard";
import { Fonts } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/supabase/client";
import { assetUrl } from "@/lib/assets";
import { celestialForSign } from "@/lib/aftercare/planets";
import { sunSignFromDate } from "@/lib/aftercare/calculators";

/** Auth without forcing redirect — Stories home is browsable as a guest preview. */
function useAuthGate() {
  return useAuth();
}

const NAV = [
  { href: "/tools/aftercare", label: "Home" },
  { href: "/tools/aftercare/journal", label: "Journal" },
  { href: "/tools/aftercare/tarot", label: "Tarot" },
  { href: "/tools/aftercare/track", label: "Track" },
  { href: "/tools/aftercare/tools", label: "Birth tools" },
];

type SkyPayload = {
  skyNote?: string;
  moon?: { name?: string; illumination?: number };
  sunSign?: string | null;
  error?: string;
};

type ProfilePayload = {
  profile?: { display_name?: string | null; email?: string | null };
  email?: string | null;
  error?: string;
};

type SlideId = "open" | "poster" | "chart" | "strategies" | "checkin";

const SLIDES: SlideId[] = ["open", "poster", "chart", "strategies", "checkin"];

export default function AftercareHomeScreen() {
  const { width } = useWindowDimensions();
  const { user, loading: authLoading } = useAuthGate();
  const [skyNote, setSkyNote] = useState<string | null>(null);
  const [moonLabel, setMoonLabel] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [sunSign, setSunSign] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const greetingName =
    displayName || user?.email?.split("@")[0] || user?.email || "friend";
  const storyW = Math.min(420, width - 32);
  const storyH = Math.min(740, Math.max(580, width * 1.6));
  const guest = !authLoading && !user;
  const celestial = celestialForSign(sunSign);

  const load = useCallback(async () => {
    if (!user) {
      setSkyNote(
        "A soft check-in day. Notice what wants tending — then pick one small ritual.",
      );
      setMoonLabel("Waxing Crescent");
      setSunSign("Sagittarius");
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const [profileRes, skyRes] = await Promise.all([
        apiFetch("aftercare-profile"),
        apiFetch("aftercare-sky"),
      ]);

      if (profileRes.ok) {
        const data = (await profileRes.json()) as ProfilePayload & {
          profile?: { birth_date?: string | null };
        };
        setDisplayName(
          data.profile?.display_name?.trim() ||
            data.email?.split("@")[0] ||
            data.profile?.email?.split("@")[0] ||
            null,
        );
        if (data.profile?.birth_date) {
          setSunSign(sunSignFromDate(data.profile.birth_date));
        }
      } else {
        const data = (await profileRes.json().catch(() => ({}))) as ProfilePayload;
        setError(data.error || "Could not load profile.");
      }

      if (skyRes.ok) {
        const data = (await skyRes.json()) as SkyPayload;
        setSkyNote(data.skyNote ?? null);
        if (data.sunSign) setSunSign(data.sunSign);
        if (data.moon?.name) {
          const illum =
            typeof data.moon.illumination === "number"
              ? ` · ~${data.moon.illumination}% lit`
              : "";
          setMoonLabel(`${data.moon.name}${illum}`);
        }
      } else {
        const data = (await skyRes.json().catch(() => ({}))) as SkyPayload;
        setError((prev) => prev || data.error || "Could not load sky note.");
      }
    } catch {
      setError("Could not reach Aftercare. Try again shortly.");
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (authLoading) return;
      let active = true;
      (async () => {
        try {
          setLoading(true);
          await load();
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [load, authLoading]),
  );

  function go(delta: number) {
    setIndex((i) => Math.max(0, Math.min(SLIDES.length - 1, i + delta)));
  }

  function goTool(href: string) {
    if (guest) {
      router.push(`/login?next=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href as `/`);
  }

  if (authLoading) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: "#888" }}>Loading…</Text>
      </Wrapper>
    );
  }

  const slide = SLIDES[index];
  const heroBg =
    assetUrl("/images/brand/chomsky-a-white.png") ||
    assetUrl("/images/brand/chomsky-a-black.png");

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Aftercare"
        description="Journal, tarot, mood tracking, and birth tools on Artometrics."
        path="/tools/aftercare"
      />
      <ToolsSubnav links={NAV} />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#D9251B" />
      ) : (
        <View style={[styles.phoneFrame, { width: storyW, height: storyH }]}>
          {/* Atmospheric background */}
          <View style={styles.bgStack}>
            <View
              style={[
                styles.blob,
                { top: "8%", left: "-10%", backgroundColor: "#6B4F3A" },
              ]}
            />
            <View
              style={[
                styles.blob,
                { top: "35%", right: "-16%", backgroundColor: "#3D5A6C", width: 220, height: 220 },
              ]}
            />
            <View
              style={[
                styles.blob,
                { bottom: "5%", left: "10%", backgroundColor: "#2A2A2E", width: 260, height: 260 },
              ]}
            />
            {heroBg ? (
              <Image
                source={{ uri: heroBg }}
                style={styles.watermark}
                resizeMode="contain"
              />
            ) : null}
            <View style={styles.vignette} />
          </View>

          {/* Story chrome */}
          <View style={styles.chrome}>
            <StoryProgress count={SLIDES.length} index={index} />
            <View style={styles.chromeRow}>
              <View style={styles.identity}>
                <View style={styles.avatar}>
                  <View style={styles.avatarInner} />
                </View>
                <View>
                  <Text style={styles.handle}>aftercare</Text>
                  <Text style={styles.metaTiny}>{moonLabel || "Today"}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => router.push("/studio")}
                hitSlop={10}
                accessibilityLabel="Close story"
              >
                <Ionicons name="close" size={22} color="#FFFFFF" style={{ color: "#FFFFFF" }} />
              </Pressable>
            </View>
          </View>

          {/* Tap zones */}
          <View style={styles.tapRow} pointerEvents="box-none">
            <Pressable style={styles.tapHalf} onPress={() => go(-1)} />
            <Pressable style={styles.tapHalf} onPress={() => go(1)} />
          </View>

          {/* Slide content */}
          <View style={styles.slideBody} pointerEvents="box-none">
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {slide === "open" ? (
              <>
                <Text style={styles.lede}>
                  Soft rituals for the creative life — {greetingName}.
                </Text>
                <Text style={styles.display}>CHECK{"\n"}IN</Text>
                <View style={styles.footerRow}>
                  <Text style={styles.footerTitle}>{"Today's sky"}</Text>
                  <Text style={styles.footerBody} numberOfLines={4}>
                    {skyNote ||
                      "Add a birth date in Birth tools for a more personal note."}
                  </Text>
                </View>
              </>
            ) : null}

            {slide === "poster" ? (
              <View style={styles.posterSlide} pointerEvents="none">
                <PlanetPoster
                  seasonTitle={celestial.seasonTitle}
                  seasonLine={celestial.seasonLine}
                  planet={celestial.planet}
                  dateLabel={moonLabel || "Tonight"}
                  compact
                />
              </View>
            ) : null}

            {slide === "chart" ? (
              <View style={styles.chartSlide} pointerEvents="box-none">
                <CosmicChartCard
                  eyebrow={
                    skyNote ||
                    `${celestial.planet.id} frames this check-in — reflective, not predictive.`
                  }
                  planet={celestial.planet}
                  profileLabel={greetingName}
                  onContinue={() => go(1)}
                />
              </View>
            ) : null}

            {slide === "strategies" ? (
              <View
                style={StyleSheet.flatten([
                  styles.glass,
                  Platform.OS === "web"
                    ? ({ backdropFilter: "blur(18px)" } as object)
                    : null,
                ])}
                pointerEvents="auto"
              >
                <View style={styles.glassHead}>
                  <View style={styles.dots}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={[styles.dot, { opacity: 0.5 }]} />
                    <View style={[styles.dot, { opacity: 0.35 }]} />
                  </View>
                  <Text style={styles.glassTitle}>Strategies.</Text>
                </View>
                <StrategyMap />
                <Text style={styles.glassFoot}>
                  Combine strategies to create a comfortable plan.
                </Text>
              </View>
            ) : null}

            {slide === "checkin" ? (
              <>
                <Text style={styles.lede}>
                  {guest
                    ? "Sign in to save rituals. Preview the doors below."
                    : "Pick a door. Stay as long as you need."}
                </Text>
                <Text style={styles.display}>BEGIN</Text>
                <View style={styles.ctaStack} pointerEvents="auto">
                  {[
                    ["/tools/aftercare/journal", "Open journal"],
                    ["/tools/aftercare/tarot", "Pull cards"],
                    ["/tools/aftercare/tools", "Birth tools"],
                  ].map(([href, label]) => (
                    <Pressable
                      key={href}
                      onPress={() => goTool(href)}
                      style={styles.ctaBtn}
                    >
                      <Text style={styles.ctaBtnText}>{label}</Text>
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color="#0A0A0A"
                        style={{ color: "#0A0A0A" }}
                      />
                    </Pressable>
                  ))}
                </View>
              </>
            ) : null}
          </View>

          <View style={styles.hintBar}>
            <Text style={styles.hint}>
              Tap edges to move · {index + 1}/{SLIDES.length}
            </Text>
          </View>
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 24, gap: 12, alignItems: "center" },
  phoneFrame: {
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#0C0C0E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    position: "relative",
    alignSelf: "center",
    ...(Platform.OS === "web"
      ? ({ boxShadow: "0 24px 60px rgba(0,0,0,0.35)" } as object)
      : {
          shadowColor: "#000",
          shadowOpacity: 0.35,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 16 },
          elevation: 12,
        }),
  },
  bgStack: { ...StyleSheet.absoluteFill },
  blob: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 999,
    opacity: 0.55,
    ...(Platform.OS === "web"
      ? ({ filter: "blur(40px)" } as object)
      : null),
  },
  watermark: {
    position: "absolute",
    width: "70%",
    height: "70%",
    top: "18%",
    left: "15%",
    opacity: 0.06,
  },
  vignette: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  chrome: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    paddingTop: 14,
    paddingHorizontal: 12,
    gap: 10,
  },
  chromeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  identity: { flexDirection: "row", alignItems: "center", gap: 8 },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },
  handle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  metaTiny: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
  },
  tapRow: {
    ...StyleSheet.absoluteFill,
    flexDirection: "row",
    zIndex: 2,
  },
  tapHalf: { flex: 1 },
  slideBody: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 88,
    bottom: 48,
    zIndex: 3,
    justifyContent: "space-between",
  },
  lede: {
    color: "rgba(255,255,255,0.88)",
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 220,
  },
  display: {
    fontFamily: "Chomsky",
    color: "#FFFFFF",
    fontSize: 56,
    lineHeight: 58,
    textAlign: "center",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  footerRow: {
    gap: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  footerTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.2,
    flexBasis: "40%",
  },
  footerBody: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 17,
    flexBasis: "52%",
    textAlign: "right",
  },
  glass: {
    marginTop: 24,
    borderRadius: 22,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    gap: 8,
  },
  glassHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dots: { flexDirection: "row", flexWrap: "wrap", width: 22, gap: 3 },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  glassTitle: {
    color: "#FFFFFF",
    fontFamily: "Chomsky",
    fontSize: 28,
  },
  glassFoot: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 4,
  },
  ctaStack: { gap: 10, marginTop: 12 },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 999,
  },
  ctaBtnText: {
    color: "#0A0A0A",
    fontSize: 14,
    fontWeight: "700",
  },
  hintBar: {
    position: "absolute",
    bottom: 14,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 4,
  },
  hint: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    letterSpacing: 0.4,
  },
  error: {
    color: "#FFB3AD",
    fontSize: 13,
    marginBottom: 8,
  },
  posterSlide: {
    flex: 1,
    justifyContent: "center",
  },
  chartSlide: {
    flex: 1,
    justifyContent: "center",
  },
});
