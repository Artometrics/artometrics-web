import { Pressable, Text, View, StyleSheet, Platform } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/lib/auth";

type Node = {
  id: string;
  label: string;
  href: string;
  top: `${number}%`;
  left: `${number}%`;
};

const NODES: Node[] = [
  { id: "journal", label: "Journal", href: "/tools/aftercare/journal", top: "8%", left: "28%" },
  { id: "tarot", label: "Tarot", href: "/tools/aftercare/tarot", top: "22%", left: "62%" },
  { id: "track", label: "Track", href: "/tools/aftercare/track", top: "48%", left: "12%" },
  { id: "birth", label: "Birth tools", href: "/tools/aftercare/tools", top: "42%", left: "55%" },
  { id: "sky", label: "Sky note", href: "/tools/aftercare", top: "72%", left: "34%" },
  { id: "studio", label: "Studio", href: "/studio", top: "68%", left: "68%" },
];

/** Soft “mind map” of Aftercare strategies — pressable nodes. */
export function StrategyMap() {
  const { user } = useAuth();
  return (
    <View style={styles.wrap}>
      {/* Decorative connectors */}
      <View style={[styles.line, { top: "28%", left: "40%", width: "28%", transform: [{ rotate: "-18deg" }] }]} />
      <View style={[styles.line, { top: "38%", left: "30%", width: "32%", transform: [{ rotate: "22deg" }] }]} />
      <View style={[styles.line, { top: "58%", left: "28%", width: "36%", transform: [{ rotate: "-8deg" }] }]} />
      <View style={[styles.line, { top: "62%", left: "48%", width: "24%", transform: [{ rotate: "30deg" }] }]} />

      {NODES.map((n) => (
        <Pressable
          key={n.id}
          onPress={() => {
            if (!user && n.href !== "/tools/aftercare" && n.href !== "/studio") {
              router.push(`/login?next=${encodeURIComponent(n.href)}`);
              return;
            }
            router.push(n.href as `/`);
          }}
          style={StyleSheet.flatten([
            styles.node,
            { top: n.top, left: n.left },
          ])}
        >
          <Text style={styles.nodeText}>{n.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
    width: "100%",
    minHeight: 220,
    marginVertical: 8,
  },
  line: {
    position: "absolute",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  node: {
    position: "absolute",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(12,12,14,0.82)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.22)",
    ...(Platform.OS === "web"
      ? ({ backdropFilter: "blur(8px)" } as object)
      : null),
  },
  nodeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
