import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  type View as RNView,
} from "react-native";
import { useTheme } from "@/lib/theme";
import { suggestTimezone } from "@/lib/studio/timezones";

const menuShadow =
  Platform.OS === "web"
    ? ({ boxShadow: "0 12px 28px rgba(23,23,23,0.12)" } as object)
    : {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 14,
        elevation: 8,
      };

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
    <View ref={rootRef} className="relative z-[12] gap-1.5" collapsable={false}>
      <Text className="text-xs font-bold uppercase tracking-[0.8px] text-muted">{label}</Text>
      <View className="min-h-[44px] flex-row items-center gap-2 rounded-[2px] border border-border bg-bg-elevated px-3">
        <TextInput
          value={q}
          onChangeText={search}
          onFocus={() => hits.length > 0 && setOpen(true)}
          placeholder={placeholder}
          placeholderTextColorClassName="text-subtle"
          className="flex-1 py-2.5 font-serif text-base text-fg outline-none"
        />
        {loading ? <ActivityIndicator size="small" color={colors.accent} /> : null}
      </View>
      {open && hits.length > 0 ? (
        <View
          className="absolute top-full right-0 left-0 z-50 mt-1 rounded-[2px] border border-border bg-header"
          style={[{ shadowColor: colors.text }, menuShadow]}
        >
          {hits.map((hit) => (
            <Pressable
              key={`${hit.label}-${hit.lat}-${hit.lon}`}
              onPress={() => pick(hit)}
              className="px-3 py-3 active:bg-accent-soft"
            >
              <Text className="font-serif text-[15px] leading-[22px] text-fg">{hit.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
