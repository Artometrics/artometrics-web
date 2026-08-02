import { Pressable, Text, View, Platform } from "react-native";
import { Link, router } from "expo-router";
import { Menu, Search } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { AvatarMenu } from "@/components/chrome/AvatarMenu";
import { useAuth } from "@/lib/auth";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { trackEvent } from "@/lib/analytics/ga";

const NAV = [
  { href: "/blog", label: "Reports" },
  { href: "/editions", label: "Editions" },
  { href: "/podcast", label: "Podcast" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const { user } = useAuth();
  const { setMenuOpen } = useChrome();
  const { colors } = useTheme();
  const studioHref = user ? "/studio" : "/login?next=%2Fstudio";

  return (
    <View className="z-40 border-b-2 border-border bg-header">
      <Wrapper className="py-3">
        <View className="flex-row items-center justify-between gap-4">
          <Link href="/" asChild>
            <Pressable accessibilityLabel="Artometrics home">
              <Logo size={28} align="left" markVariant="auto" />
            </Pressable>
          </Link>

          <View
            className="flex-row items-center gap-6"
            style={
              Platform.OS === "web"
                ? ({ display: undefined } as object)
                : undefined
            }
          >
            {/* Desktop nav — hidden on small screens via className */}
            <View className="hidden flex-row items-center gap-6 lg:flex">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} asChild>
                  <Pressable>
                    <Text className="font-display text-[13px] uppercase tracking-[2px] text-fg">
                      {item.label}
                    </Text>
                  </Pressable>
                </Link>
              ))}
              <Pressable
                onPress={() => {
                  trackEvent("studio_open", { source: "header" });
                  router.push(studioHref as `/`);
                }}
                className="bg-accent px-3 py-2"
              >
                <Text className="font-display text-[12px] uppercase tracking-[1.5px] text-white">
                  Studio
                </Text>
              </Pressable>
              <AvatarMenu />
            </View>

            <View className="flex-row items-center gap-2 lg:hidden">
              <Pressable
                onPress={() => router.push("/search")}
                accessibilityLabel="Search"
                className="h-10 w-10 items-center justify-center"
              >
                <Search size={20} color={colors.text} />
              </Pressable>
              <Pressable
                onPress={() => setMenuOpen(true)}
                accessibilityLabel="Open menu"
                className="h-10 w-10 items-center justify-center"
                testID="site-menu-button"
              >
                <Menu size={24} color={colors.text} />
              </Pressable>
            </View>
          </View>
        </View>
      </Wrapper>

      {/* Instrument strip — KSM energy */}
      <View className="border-t border-border bg-bg">
        <Wrapper className="flex-row flex-wrap items-center justify-between gap-2 py-1.5">
          <Text className="text-[10px] font-bold uppercase tracking-[1.4px] text-subtle">
            Issue · Online
          </Text>
          <Text className="text-[10px] font-bold uppercase tracking-[1.4px] text-accent">
            Strong graphic content · No fluff
          </Text>
          <Text className="text-[10px] font-bold uppercase tracking-[1.4px] text-subtle">
            Reports · Editions · Signal
          </Text>
        </Wrapper>
      </View>
    </View>
  );
}
