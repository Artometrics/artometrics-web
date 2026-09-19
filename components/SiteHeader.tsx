import { Pressable, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";
import { Menu } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { Wrapper } from "@/components/Wrapper";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { SITE_PRIMARY_NAV } from "@/lib/site-nav";

export function SiteHeader() {
  const { setMenuOpen } = useChrome();
  const { colors } = useTheme();
  const pathname = usePathname();

  return (
    <View className="z-40 border-b border-border bg-header">
      <Wrapper className="py-4">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => setMenuOpen(true)}
            accessibilityLabel="Open menu"
            className="h-10 w-10 items-center justify-center lg:hidden"
            testID="site-menu-button"
          >
            <Menu size={22} color={colors.text} />
          </Pressable>
          <View className="hidden w-10 lg:block" />

          <Link href="/" asChild>
            <Pressable accessibilityLabel="Artometrics home">
              <Logo size={32} align="center" markVariant="dark" />
            </Pressable>
          </Link>

          <View className="w-10" />
        </View>
      </Wrapper>

      <View className="hidden border-t border-border lg:block">
        <Wrapper className="py-2.5">
          <View className="flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {SITE_PRIMARY_NAV.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Link key={item.href} href={item.href as `/`} asChild>
                  <Pressable className="px-0.5">
                    <Text
                      className={[
                        "font-sans text-[10px] font-semibold uppercase tracking-[2.2px]",
                        active ? "text-fg" : "text-muted",
                      ].join(" ")}
                    >
                      {item.label}
                    </Text>
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
