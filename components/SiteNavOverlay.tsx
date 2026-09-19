import { useEffect } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { useChrome } from "@/lib/chrome";
import { SITE_PRIMARY_NAV } from "@/lib/site-nav";

const overlayPosition =
  Platform.OS === "web"
    ? ({ position: "fixed" as const })
    : ({ position: "absolute" as const });

export function SiteNavOverlay() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useChrome();

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

  return (
    <View
      className="inset-0 z-[2000] bg-bg"
      style={overlayPosition}
      accessibilityViewIsModal
    >
      <Wrapper className="gap-0 pt-14" variant="narrow">
        <Pressable
          onPress={() => setMenuOpen(false)}
          className="mb-4 self-end py-2"
          accessibilityLabel="Close menu"
        >
          <Text className="font-sans text-[10px] font-semibold uppercase tracking-[2px] text-fg">
            Close
          </Text>
        </Pressable>
        {SITE_PRIMARY_NAV.map((item) => (
          <Link key={item.href} href={item.href as `/`} asChild>
            <Pressable
              onPress={() => setMenuOpen(false)}
              className="border-b border-border py-3"
            >
              <Text className="font-sans text-[11px] font-semibold uppercase tracking-[2.5px] text-fg">
                {item.label}
              </Text>
            </Pressable>
          </Link>
        ))}
      </Wrapper>
    </View>
  );
}
