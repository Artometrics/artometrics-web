import { Pressable, Text, View } from "react-native";
import { Link, router, usePathname } from "expo-router";
import { Menu, Search } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { AvatarMenu } from "@/components/chrome/AvatarMenu";
import { useAuth } from "@/lib/auth";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { SITE_PRIMARY_NAV } from "@/lib/site-nav";

export function SiteHeader() {
  const { user } = useAuth();
  const { setMenuOpen } = useChrome();
  const { colors } = useTheme();
  const pathname = usePathname();

  return (
    <View className="z-40 border-b border-border bg-header">
      {/* Vogue row A — utilities, centered wordmark, account */}
      <Wrapper className="py-4">
        <View className="flex-row items-center">
          <View className="z-10 flex-1 flex-row items-center gap-1">
            <Pressable
              onPress={() => setMenuOpen(true)}
              accessibilityLabel="Open menu"
              className="h-10 w-10 items-center justify-center lg:hidden"
              testID="site-menu-button"
            >
              <Menu size={22} color={colors.text} />
            </Pressable>
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
              className="hidden h-10 w-10 items-center justify-center lg:flex"
            >
              <Menu size={22} color={colors.text} />
            </Pressable>
          </View>

          <View className="shrink-0 items-center px-2">
            <Link href="/" asChild>
              <Pressable accessibilityLabel="Artometrics home">
                <Logo size={34} align="center" markVariant="auto" />
              </Pressable>
            </Link>
          </View>

          <View className="z-10 flex-1 flex-row items-center justify-end gap-4">
            <Link href="/pricing" asChild>
              <Pressable>
                <Text className="font-sans text-[11px] font-semibold uppercase tracking-[1.6px] text-fg">
                  Subscribe
                </Text>
              </Pressable>
            </Link>
            {user ? (
              <AvatarMenu />
            ) : (
              <Link href="/login" asChild>
                <Pressable>
                  <Text className="font-sans text-[11px] font-semibold uppercase tracking-[1.6px] text-fg">
                    Sign In
                  </Text>
                </Pressable>
              </Link>
            )}
          </View>
        </View>
      </Wrapper>

      {/* Vogue row B — category nav (desktop) */}
      <View className="hidden border-t border-border lg:block">
        <Wrapper className="py-3">
          <View className="flex-row flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {SITE_PRIMARY_NAV.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Link key={item.href} href={item.href as `/`} asChild>
                  <Pressable className="px-0.5 pb-0.5">
                    <Text
                      className={[
                        "font-sans text-[11px] font-bold uppercase tracking-[2px]",
                        active ? "text-fg" : "text-muted",
                      ].join(" ")}
                    >
                      {item.label}
                    </Text>
                    {active ? (
                      <View className="mt-1.5 h-0.5 w-full bg-accent" />
                    ) : (
                      <View className="mt-1.5 h-0.5 w-full bg-transparent" />
                    )}
                  </Pressable>
                </Link>
              );
            })}
          </View>
        </Wrapper>
      </View>
    </View>
  );
}
