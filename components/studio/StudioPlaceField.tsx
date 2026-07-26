import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  type View as RNView,
} from "react-native";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { suggestTimezone } from "@/lib/studio/timezones";

export type PlaceHit = {
  label: string;
  lat: number;
  lon: number;
  countryCode?: string;
};

export function StudioPlaceField({
  label,
  value,
  onChange,
  onTimezoneSuggest,
  placeholder = "City, region, country",
}: {
  label: string;
  value: string;
  onChange: (place: string) => void;
  onTimezoneSuggest?: (tz: string) => void;
  placeholder?: string;
}) {
  const { colors } = useTheme();
  const [q, setQ] = useState(value);
  const [hits, setHits] = useState<PlaceHit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const rootRef = useRef<RNView | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQ(value);
  }, [value]);

  useEffect(() => {
    if (!open || Platform.OS !== "web" || typeof document === "undefined") return;
    const onPointer = (e: MouseEvent) => {
      const node = rootRef.current as unknown as HTMLElement | null;
      if (node && e.target instanceof Node && !node.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer, true);
    return () => document.removeEventListener("mousedown", onPointer, true);
  }, [open]);

  function search(next: string) {
    setQ(next);
    onChange(next);
    if (timer.current) clearTimeout(timer.current);
    if (next.trim().length < 2) {
      setHits([]);
      setOpen(false);
      return;
    }
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/places-search?q=${encodeURIComponent(next.trim())}`);
        const data = (await res.json().catch(() => ({}))) as {
          results?: PlaceHit[];
          error?: string;
        };
        if (res.ok && data.results) {
          setHits(data.results);
          setOpen(data.results.length > 0);
        } else {
          setHits([]);
        }
      } catch {
        setHits([]);
      } finally {
        setLoading(false);
      }
    }, 450);
  }

  function pick(hit: PlaceHit) {
    setQ(hit.label);
    onChange(hit.label);
    setOpen(false);
    setHits([]);
    const tz = suggestTimezone(hit.lat, hit.lon, hit.countryCode);
    onTimezoneSuggest?.(tz);
  }

  return (
    <View ref={rootRef} style={styles.root} collapsable={false}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <View
        style={StyleSheet.flatten([
          styles.inputRow,
          { borderColor: colors.border, backgroundColor: colors.bgElevated },
        ])}
      >
        <TextInput
          value={q}
          onChangeText={search}
          onFocus={() => hits.length > 0 && setOpen(true)}
          placeholder={placeholder}
          placeholderTextColor={colors.textSubtle}
          style={StyleSheet.flatten([styles.input, { color: colors.text }])}
        />
        {loading ? <ActivityIndicator size="small" color={colors.accent} /> : null}
      </View>
      {open && hits.length > 0 ? (
        <View
          style={StyleSheet.flatten([
            styles.menu,
            { borderColor: colors.border, backgroundColor: colors.headerBg },
          ])}
        >
          {hits.map((hit) => (
            <Pressable
              key={`${hit.label}-${hit.lat}-${hit.lon}`}
              onPress={() => pick(hit)}
              style={({ pressed }) =>
                StyleSheet.flatten([
                  styles.option,
                  { backgroundColor: pressed ? colors.accentSoft : "transparent" },
                ])
              }
            >
              <Text style={[styles.optionText, { color: colors.text }]}>{hit.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { position: "relative", zIndex: 12, gap: 6 },
  label: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  inputRow: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    minHeight: 44,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.serif,
    fontSize: 16,
    paddingVertical: 10,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
  menu: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "100%",
    marginTop: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    zIndex: 50,
    ...(Platform.OS === "web"
      ? ({ boxShadow: "0 12px 28px rgba(23,23,23,0.12)" } as object)
      : {
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.14,
          shadowRadius: 14,
          elevation: 8,
        }),
  },
  option: { paddingHorizontal: 12, paddingVertical: 12 },
  optionText: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 22 },
});
