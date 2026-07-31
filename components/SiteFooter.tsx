import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const mid = Math.ceil(SECTION_SLUGS.length / 2);
  const colA = SECTION_SLUGS.slice(0, mid);
  const colB = SECTION_SLUGS.slice(mid);

  return (
    <View className="mt-6">
      <Wrapper className="mb-0">
        <View className="flex-row flex-wrap items-center justify-between gap-5 bg-accent px-2 py-8">
          <Text className="min-w-[220px] flex-1 text-4xl leading-10 tracking-wide font-display text-white">
            {"LET'S CREATE\nSOMETHING GREAT\nTOGETHER."}
          </Text>
          <Link href="/contact" asChild>
            <Pressable
              className="h-[72px] w-[72px] items-center justify-center rounded-full bg-white"
              accessibilityLabel="Contact Artometrics"
            >
              <Text className="text-[28px] font-bold text-black">↗</Text>
            </Pressable>
          </Link>
        </View>
      </Wrapper>
      <View className="bg-black py-9">
        <Wrapper className="gap-7">
          <View className="flex-row flex-wrap gap-7">
            <View className="min-w-[140px] flex-grow gap-2">
              <Text className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[1.6px] text-accent">
                Sections
              </Text>
              {colA.map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text className="py-0.5 text-[13px] font-semibold uppercase tracking-wide text-white/80">
                      {SECTION_META[s].title}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View className="min-w-[140px] flex-grow gap-2">
              <Text className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[1.6px] text-accent">
                {" "}
              </Text>
              {colB.map((s) => (
                <Link key={s} href={`/topics/${s}` as `/topics/${string}`} asChild>
                  <Pressable>
                    <Text className="py-0.5 text-[13px] font-semibold uppercase tracking-wide text-white/80">
                      {SECTION_META[s].title}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
            <View className="min-w-[140px] flex-grow gap-2">
              <Text className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[1.6px] text-accent">
                More
              </Text>
              {[
                ["/blog", "Latest"],
                ["/editions", "Editions"],
                ["/podcast", "Podcasts"],
                ["/about", "About"],
                ["/authors", "Authors"],
                ["/library", "Library"],
                ["/get-app", "Get the App"],
              ].map(([href, label]) => (
                <Link key={href} href={href as `/blog`} asChild>
                  <Pressable>
                    <Text className="py-0.5 text-[13px] font-semibold uppercase tracking-wide text-white/80">
                      {label}
                    </Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>

          <Link href="/" asChild>
            <Pressable className="items-center gap-2.5 pt-2" accessibilityLabel="Artometrics home">
              <Logo size={44} compact={1} align="center" markVariant="light" showWordmark={false} />
            </Pressable>
          </Link>

          <View className="flex-row flex-wrap justify-center gap-1.5">
            {[
              ["/legal/privacy", "Privacy"],
              ["/legal/terms", "Terms"],
              ["/legal/cookies", "Cookies"],
              ["/legal/ethics-statement", "Ethics"],
              ["/security", "Security"],
              ["/contact", "Contact"],
            ].map(([href, label], i, arr) => (
              <View key={href} className="flex-row items-center gap-1.5">
                <Link href={href as `/legal/privacy`} asChild>
                  <Pressable>
                    <Text className="text-xs text-white/70">{label}</Text>
                  </Pressable>
                </Link>
                {i < arr.length - 1 ? <Text className="text-xs text-white/35">|</Text> : null}
              </View>
            ))}
          </View>
          <Text className="text-center text-xs uppercase tracking-wide text-white/45">
            © {year} Artometrics
          </Text>
        </Wrapper>
      </View>
    </View>
  );
}
