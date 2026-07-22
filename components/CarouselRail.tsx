import { ReactNode } from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { Wrapper } from "@/components/Wrapper";

export function CarouselRail({
  title,
  href,
  children,
  itemGap = 16,
}: {
  title: string;
  href?: string;
  children: ReactNode;
  itemGap?: number;
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <Wrapper variant="magazine" style={styles.head}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {href ? (
          <Link href={href as `/topics/${string}`} asChild>
            <Pressable hitSlop={8}>
              <Text style={[styles.more, { color: colors.textMuted }]}>View all</Text>
            </Pressable>
          </Link>
        ) : null}
      </Wrapper>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        decelerationRate="fast"
        contentContainerStyle={[styles.track, { gap: itemGap, paddingHorizontal: 20 }]}
        style={styles.scroll}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 36 },
  head: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 12,
  },
  title: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  more: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  scroll: { width: "100%" },
  track: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingBottom: 4,
    ...(Platform.OS === "web" ? ({ scrollSnapType: "x mandatory" } as object) : null),
  },
});
