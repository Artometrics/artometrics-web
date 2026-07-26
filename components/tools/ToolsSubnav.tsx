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
        <Pressable style={styles.link}>
          <Text style={[styles.meta, { color: colors.textMuted }]}>Studio</Text>
        </Pressable>
      </Link>
      {links.map((l) => {
        const active = pathname === l.href || pathname?.startsWith(`${l.href}/`);
        return (
          <Link key={l.href} href={l.href as `/tools`} asChild>
            <Pressable style={styles.link}>
              <Text
                style={[
                  styles.label,
                  { color: active ? colors.accent : colors.text },
                  active && styles.active,
                ]}
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
    gap: 16,
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  link: { paddingVertical: 4 },
  meta: { fontSize: 12, letterSpacing: 0.6, textTransform: "uppercase" },
  label: { fontFamily: Fonts.serif, fontSize: 16 },
  active: { fontWeight: "700" },
});
