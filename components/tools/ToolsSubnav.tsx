import { Pressable, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";

type LinkItem = { href: string; label: string };

export function ToolsSubnav({ links }: { links: LinkItem[] }) {
  const pathname = usePathname();

  return (
    <View className="mb-3 flex-row flex-wrap gap-3.5 border-b border-border pb-2.5">
      <Link href="/studio" asChild>
        <Pressable className="py-1">
          <Text className="text-xs uppercase tracking-[0.6px] text-muted">Studio</Text>
        </Pressable>
      </Link>
      {links.map((l) => {
        const active = pathname === l.href || pathname?.startsWith(`${l.href}/`);
        return (
          <Link key={l.href} href={l.href as `/tools`} asChild>
            <Pressable className="py-1">
              <Text
                className={[
                  "font-serif text-base",
                  active ? "font-bold text-accent" : "text-fg",
                ].join(" ")}
              >
                {l.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
