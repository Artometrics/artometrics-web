import { useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type View as RNView,
} from "react-native";
import { ChevronDown, ChevronUp } from "@/components/icons";
import { useTheme } from "@/lib/theme";

const menuShadow =
  Platform.OS === "web"
    ? ({ boxShadow: "0 12px 28px rgba(23,23,23,0.12)" } as object)
    : {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 14,
        elevation: 8,
      };

export type StudioSelectOption = { value: string; label: string };

export function StudioSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select…",
  searchable = false,
}: {
  label?: string;
  value: string;
  options: StudioSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
}) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const rootRef = useRef<RNView | null>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return options.slice(0, 80);
    return options.filter((o) => o.label.toLowerCase().includes(needle)).slice(0, 80);
  }, [options, q]);

  useEffect(() => {
    if (!open || Platform.OS !== "web" || typeof document === "undefined") return;
    const onPointer = (e: MouseEvent) => {
      const node = rootRef.current as unknown as HTMLElement | null;
      if (node && e.target instanceof Node && !node.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer, true);
    return () => document.removeEventListener("mousedown", onPointer, true);
  }, [open]);

  return (
    <View ref={rootRef} className="relative z-10 gap-1.5" collapsable={false}>
      {label ? (
        <Text className="text-xs font-bold uppercase tracking-[0.8px] text-muted">{label}</Text>
      ) : null}
      <Pressable
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        className={[
          "min-h-[44px] flex-row items-center justify-between gap-2 rounded-[2px] border bg-bg-elevated px-3",
          open ? "border-accent" : "border-border",
        ].join(" ")}
      >
        <Text
          className={[
            "flex-1 font-serif text-base",
            selected ? "text-fg" : "text-subtle",
          ].join(" ")}
          numberOfLines={1}
        >
          {selected?.label || placeholder}
        </Text>
        {open ? (
          <ChevronUp size={16} color={colors.textMuted} />
        ) : (
          <ChevronDown size={16} color={colors.textMuted} />
        )}
      </Pressable>

      {open ? (
        <View
          className="absolute top-full right-0 left-0 z-40 mt-1 max-h-60 rounded-[2px] border border-border bg-header"
          style={[{ shadowColor: colors.text }, menuShadow]}
        >
          {searchable ? (
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Filter…"
              placeholderTextColorClassName="text-subtle"
              className="border-b border-border px-3 py-2.5 font-sans text-sm text-fg outline-none"
              autoCapitalize="none"
              autoCorrect={false}
            />
          ) : null}
          <ScrollView className="max-h-[200px]" keyboardShouldPersistTaps="handled" nestedScrollEnabled>
            {filtered.map((opt) => {
              const active = opt.value === value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => {
                    onChange(opt.value);
                    setOpen(false);
                    setQ("");
                  }}
                  className={[
                    "px-3 py-[11px]",
                    active ? "bg-accent-soft" : "active:bg-bg-elevated",
                  ].join(" ")}
                >
                  <Text className="font-serif text-[15px] leading-[22px] text-fg" numberOfLines={2}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
            {filtered.length === 0 ? (
              <Text className="p-3.5 text-[13px] text-subtle">No matches</Text>
            ) : null}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
