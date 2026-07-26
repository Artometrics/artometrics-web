import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link, usePathname } from "expo-router";
import { useTheme } from "@/lib/theme";
import { Fonts } from "@/constants/Colors";

type LinkItem = { href: string; label: string };

export function ToolsSubnav({ links }: { links: LinkItem[] }) {
  const { colors } = useTheme();
  const pathname = usePathname();

  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <Link href="/studio" asChild>
        <Pressable style={StyleSheet.flatten([styles.link])}>
          <Text style={StyleSheet.flatten([styles.meta, { color: colors.textMuted }])}>
            Studio
          </Text>
        </Pressable>
      </Link>
      {links.map((l) => {
        const active = pathname === l.href || pathname?.startsWith(`${l.href}/`);
        return (
          <Link key={l.href} href={l.href as `/tools`} asChild>
            <Pressable style={StyleSheet.flatten([styles.link])}>
              <Text
                style={StyleSheet.flatten([
                  styles.label,
                  { color: active ? colors.accent : colors.text },
                  active ? styles.active : null,
                ])}
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    paddingBottom: 10,
    marginBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  link: { paddingVertical: 4 },
  meta: { fontSize: 12, letterSpacing: 0.6, textTransform: "uppercase" },
  label: { fontFamily: Fonts.serif, fontSize: 16 },
  active: { fontWeight: "700" },
});
