import { useEffect } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { useChrome } from "@/lib/chrome";
import { useAuth } from "@/lib/auth";

const LINKS = [
  { href: "/blog", label: "Reports" },
  { href: "/editions", label: "Editions" },
  { href: "/podcast", label: "Podcast" },
  { href: "/datasets", label: "Data" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Membership" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

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

  return (
    <View
      className="inset-0 z-[2000] bg-black"
      style={overlayPosition}
      accessibilityViewIsModal
    >
      <Wrapper className="gap-0 pt-20">
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href as `/`}
            asChild
          >
            <Pressable
              onPress={() => setMenuOpen(false)}
              className="border-b border-white/20 py-5"
            >
              <Text className="font-display text-4xl uppercase tracking-[2px] text-white">
                {item.label}
              </Text>
            </Pressable>
          </Link>
        ))}
        <Link href={user ? "/me" : "/login"} asChild>
          <Pressable
            onPress={() => setMenuOpen(false)}
            className="border-b border-white/20 py-5"
          >
            <Text className="font-display text-4xl uppercase tracking-[2px] text-white">
              {user ? "Profile" : "Log in"}
            </Text>
          </Pressable>
        </Link>
        <Text
          className="mt-8 text-3xl text-accent"
          style={{ fontFamily: "Chomsky" }}
        >
          Artometrics
        </Text>
      </Wrapper>
    </View>
  );
}
