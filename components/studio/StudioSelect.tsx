import { useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  type View as RNView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";

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
    <View ref={rootRef} style={styles.root} collapsable={false}>
      {label ? (
        <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      ) : null}
      <Pressable
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        style={StyleSheet.flatten([
          styles.trigger,
          {
            borderColor: open ? colors.accent : colors.border,
            backgroundColor: colors.bgElevated,
          },
        ])}
      >
        <Text
          style={[styles.triggerText, { color: selected ? colors.text : colors.textSubtle }]}
          numberOfLines={1}
        >
          {selected?.label || placeholder}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.textMuted}
          style={{ color: colors.textMuted }}
        />
      </Pressable>

      {open ? (
        <View
          style={StyleSheet.flatten([
            styles.menu,
            {
              borderColor: colors.border,
              backgroundColor: colors.headerBg,
              shadowColor: colors.text,
            },
          ])}
        >
          {searchable ? (
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Filter…"
              placeholderTextColor={colors.textSubtle}
              style={StyleSheet.flatten([
                styles.search,
                { borderBottomColor: colors.border, color: colors.text },
              ])}
              autoCapitalize="none"
              autoCorrect={false}
            />
          ) : null}
          <ScrollView style={styles.list} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
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
                  style={({ pressed }) =>
                    StyleSheet.flatten([
                      styles.option,
                      {
                        backgroundColor: active
                          ? colors.accentSoft
                          : pressed
                            ? colors.bgElevated
                            : "transparent",
                      },
                    ])
                  }
                >
                  <Text style={[styles.optionText, { color: colors.text }]} numberOfLines={2}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
            {filtered.length === 0 ? (
              <Text style={[styles.empty, { color: colors.textSubtle }]}>No matches</Text>
            ) : null}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { position: "relative", zIndex: 10, gap: 6 },
  label: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  trigger: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    minHeight: 44,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  triggerText: { flex: 1, fontFamily: Fonts.serif, fontSize: 16 },
  menu: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "100%",
    marginTop: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    zIndex: 40,
    maxHeight: 240,
    ...(Platform.OS === "web"
      ? ({ boxShadow: "0 12px 28px rgba(23,23,23,0.12)" } as object)
      : {
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.14,
          shadowRadius: 14,
          elevation: 8,
        }),
  },
  search: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: Fonts.sans,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
  list: { maxHeight: 200 },
  option: { paddingHorizontal: 12, paddingVertical: 11 },
  optionText: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 22 },
  empty: { padding: 14, fontSize: 13 },
});
