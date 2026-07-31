import { useEffect, useState } from "react";
import { Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Link, usePathname, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useChrome } from "@/lib/chrome";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { Wrapper } from "@/components/Wrapper";
import { SECTION_META, SECTION_SLUGS } from "@/data/sections";

const overlayPosition =
  Platform.OS === "web" ? ({ position: "fixed" as const }) : ({ position: "absolute" as const });

export function SiteNavOverlay() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useChrome();
  const { user } = useAuth();
  const { colors, toggle, mode, brandStyle, toggleBrandStyle } = useTheme();
  const [q, setQ] = useState("");

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

  function goSearch() {
    const query = q.trim();
    setMenuOpen(false);
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`);
    else router.push("/search");
  }

  return (
    <View
      className="inset-0 z-[2000] bg-overlay"
      style={overlayPosition}
      accessibilityViewIsModal
    >
      <Wrapper className="max-w-[960px] flex-1 pt-2 pb-6">
        <View className="flex-row items-center justify-start py-1">
          <Pressable
            onPress={() => setMenuOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
            className="h-11 w-11 items-center justify-center"
            hitSlop={12}
          >
            <Ionicons name="close" size={28} color={colors.text} />
          </Pressable>
        </View>

        <View className="mt-2 flex-row items-center gap-2.5 border-b border-border pb-2.5">
          <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search"
            placeholderTextColor={colors.textSubtle}
            className="flex-1 py-1.5 text-base font-sans text-fg outline-none"
            onSubmitEditing={goSearch}
            returnKeyType="search"
          />
          <Pressable
            onPress={goSearch}
            className="bg-fg px-3 py-2"
            hitSlop={8}
          >
            <Text className="text-xs font-bold tracking-wide text-inverse">GO</Text>
          </Pressable>
        </View>

        <View className="gap-3.5 py-4.5">
          <Link href="/pricing" asChild>
            <Pressable onPress={() => setMenuOpen(false)} className="flex-row items-center gap-3">
              <Ionicons name="newspaper-outline" size={18} color={colors.text} />
              <Text className="text-[15px] font-medium text-fg">Subscribe</Text>
            </Pressable>
          </Link>
          <Link href="/newsletter" asChild>
            <Pressable onPress={() => setMenuOpen(false)} className="flex-row items-center gap-3">
              <Ionicons name="mail-outline" size={18} color={colors.text} />
              <Text className="text-[15px] font-medium text-fg">Newsletters</Text>
            </Pressable>
          </Link>
          <Link href={user ? "/me" : "/login"} asChild>
            <Pressable onPress={() => setMenuOpen(false)} className="flex-row items-center gap-3">
              <Ionicons name="person-outline" size={18} color={colors.text} />
              <Text className="text-[15px] font-medium text-fg">
                {user ? "Profile" : "Sign in"}
              </Text>
            </Pressable>
          </Link>
          <Link href={user ? "/studio" : "/login?next=%2Fstudio"} asChild>
            <Pressable onPress={() => setMenuOpen(false)} className="flex-row items-center gap-3">
              <Ionicons name="create-outline" size={18} color={colors.text} />
              <Text className="text-[15px] font-medium text-fg">Studio</Text>
            </Pressable>
          </Link>
          <Pressable onPress={toggle} className="flex-row items-center gap-3">
            <Ionicons
              name={mode === "dark" ? "sunny-outline" : "moon-outline"}
              size={18}
              color={colors.text}
            />
            <Text className="text-[15px] font-medium text-fg">
              {mode === "dark" ? "Light mode" : "Dark mode"}
            </Text>
          </Pressable>
          <Pressable onPress={toggleBrandStyle} className="flex-row items-center gap-3">
            <Ionicons name="color-palette-outline" size={18} color={colors.text} />
            <Text className="text-[15px] font-medium text-fg">
              {brandStyle === "swiss" ? "Magazine style" : "Swiss style"}
            </Text>
          </Pressable>
        </View>

        <ScrollView className="flex-1" contentContainerClassName="pb-12" showsVerticalScrollIndicator={false}>
          <Text className="mt-2 mb-2 text-[11px] font-bold uppercase tracking-[1.6px] text-subtle">
            Sections
          </Text>
          <Link href="/" asChild>
            <Pressable
              onPress={() => setMenuOpen(false)}
              className="border-b border-border py-3.5"
            >
              <Text className="text-[22px] leading-7 font-serif text-fg">Home</Text>
            </Pressable>
          </Link>
          {SECTION_SLUGS.map((slug) => (
            <Link key={slug} href={`/topics/${slug}` as `/topics/${string}`} asChild>
              <Pressable
                onPress={() => setMenuOpen(false)}
                className="border-b border-border py-3.5"
              >
                <Text className="text-[22px] leading-7 font-serif text-fg">
                  {SECTION_META[slug].title}
                </Text>
              </Pressable>
            </Link>
          ))}

          <Text className="mt-7 mb-2 text-[11px] font-bold uppercase tracking-[1.6px] text-subtle">
            More
          </Text>
          {[
            { href: "/blog", label: "Latest" },
            { href: "/editions", label: "Editions" },
            { href: "/podcast", label: "Podcasts" },
            { href: "/library", label: "Library" },
            { href: "/library/reference", label: "Reference" },
            { href: "/studio", label: "Studio" },
            { href: "/following", label: "Following" },
            { href: "/about", label: "About" },
            { href: "/authors", label: "Authors" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link key={link.href} href={link.href as `/blog`} asChild>
              <Pressable
                onPress={() => setMenuOpen(false)}
                className="border-b border-border py-3.5"
              >
                <Text className="text-lg leading-6 font-serif text-fg">{link.label}</Text>
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </Wrapper>
    </View>
  );
}
