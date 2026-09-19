import { useEffect } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { useChrome } from "@/lib/chrome";
import { useAuth } from "@/lib/auth";
import { SITE_OVERLAY_EXTRA, SITE_PRIMARY_NAV } from "@/lib/site-nav";

const overlayPosition =
  Platform.OS === "web"
    ? ({ position: "fixed" as const })
    : ({ position: "absolute" as const });

export function SiteNavOverlay() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useChrome();
  const { user } = useAuth();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  if (!menuOpen) return null;

  const links = [
    ...SITE_PRIMARY_NAV.map((item) => ({ href: item.href, label: item.label })),
    ...SITE_OVERLAY_EXTRA,
  ];

  return (
    <View
      className="inset-0 z-[2000] bg-bg"
      style={overlayPosition}
      accessibilityViewIsModal
    >
      <Wrapper className="gap-0 pt-16">
        <Pressable
          onPress={() => setMenuOpen(false)}
          className="mb-6 self-end py-2"
          accessibilityLabel="Close menu"
        >
          <Text className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-fg">
            Close
          </Text>
        </Pressable>
        {links.map((item) => (
          <Link key={item.href} href={item.href as `/`} asChild>
            <Pressable
              onPress={() => setMenuOpen(false)}
              className="border-b border-border py-4"
            >
              <Text className="font-sans text-[13px] font-bold uppercase tracking-[2.5px] text-fg">
                {item.label}
              </Text>
            </Pressable>
          </Link>
        ))}
        <Link href={user ? "/me" : "/login"} asChild>
          <Pressable
            onPress={() => setMenuOpen(false)}
            className="border-b border-border py-4"
          >
            <Text className="font-sans text-[13px] font-bold uppercase tracking-[2.5px] text-fg">
              {user ? "Profile" : "Log in"}
            </Text>
          </Pressable>
        </Link>
      </Wrapper>
    </View>
  );
}
