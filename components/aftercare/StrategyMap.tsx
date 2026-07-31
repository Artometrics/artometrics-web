import { Pressable, Text, View, Platform } from "react-native";
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

const LINES = [
  { top: "28%", left: "40%", width: "28%", rotate: "-18deg" },
  { top: "38%", left: "30%", width: "32%", rotate: "22deg" },
  { top: "58%", left: "28%", width: "36%", rotate: "-8deg" },
  { top: "62%", left: "48%", width: "24%", rotate: "30deg" },
] as const;

/** Soft “mind map” of Aftercare strategies — pressable nodes. */
export function StrategyMap() {
  const { user } = useAuth();
  return (
    <View className="relative my-2 min-h-[220px] w-full">
      {LINES.map((line, i) => (
        <View
          key={i}
          className="absolute h-px bg-white/35"
          style={{
            top: line.top,
            left: line.left,
            width: line.width,
            transform: [{ rotate: line.rotate }],
          }}
        />
      ))}

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
          className="absolute rounded-full border border-white/20 bg-[rgba(12,12,14,0.82)] px-3 py-2"
          style={[
            { top: n.top, left: n.left },
            Platform.OS === "web" ? ({ backdropFilter: "blur(8px)" } as object) : null,
          ]}
        >
          <Text className="text-xs font-semibold tracking-[0.2px] text-inverse">{n.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
