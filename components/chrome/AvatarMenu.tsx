import { useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  View,
  StyleSheet,
  type View as RNView,
} from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fonts } from "@/constants/Colors";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { getProfile } from "@/lib/profile/service";

export function AvatarMenu() {
  const { user, signOut } = useAuth();
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState<string | null>(null);
  const rootRef = useRef<RNView | null>(null);

  useEffect(() => {
    if (!user) return;
    void getProfile(user.id)
      .then((p) => setHandle(p?.handle ?? null))
      .catch(() => setHandle(null));
  }, [user]);

  useEffect(() => {
    if (!open || Platform.OS !== "web" || typeof document === "undefined") return;
    const onPointer = (e: MouseEvent) => {
      const node = rootRef.current as unknown as HTMLElement | null;
      if (node && e.target instanceof Node && !node.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer, true);
    return () => document.removeEventListener("mousedown", onPointer, true);
  }, [open]);

  if (!user) {
    return (
      <Pressable
        onPress={() => router.push("/login")}
        hitSlop={8}
        accessibilityLabel="Sign in"
        style={StyleSheet.flatten([
          styles.iconBtn,
          styles.iconBtnBordered,
          { borderColor: colors.text, backgroundColor: colors.bgElevated },
        ])}
      >
        <Ionicons
          name="person-outline"
          size={20}
          color={colors.text}
          style={{ color: colors.text }}
        />
      </Pressable>
    );
  }

  const items: { label: string; href?: string; action?: () => void }[] = [
    {
      label: "Profile",
      href: handle ? `/u/${handle}` : "/me",
    },
    { label: "Studio", href: "/studio" },
    { label: "Saved", href: "/me#saved" },
    { label: "Following", href: "/following" },
    { label: "Notifications", href: "/notifications" },
    { label: "Settings", href: "/settings" },
    {
      label: "Sign out",
      action: async () => {
        setOpen(false);
        await signOut();
        router.replace("/");
      },
    },
  ];

  return (
    <View ref={rootRef} style={styles.root} collapsable={false}>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        hitSlop={8}
        accessibilityLabel="Account menu"
        accessibilityRole="button"
        style={StyleSheet.flatten([
          styles.iconBtn,
          styles.iconBtnBordered,
          {
            borderColor: open ? colors.accent : colors.text,
            backgroundColor: colors.bgElevated,
          },
        ])}
      >
        <Ionicons
          name="person"
          size={20}
          color={colors.text}
          style={{ color: colors.text }}
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
          <Text style={[styles.email, { color: colors.textSubtle }]} numberOfLines={1}>
            {user.email}
          </Text>
          {items.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => {
                setOpen(false);
                if (item.action) {
                  void item.action();
                  return;
                }
                if (item.href) router.push(item.href as `/`);
              }}
              style={({ pressed }) =>
                StyleSheet.flatten([
                  styles.item,
                  { backgroundColor: pressed ? colors.accentSoft : "transparent" },
                ])
              }
            >
              <Text style={[styles.itemText, { color: colors.text }]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { position: "relative", zIndex: 20 },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnBordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
  },
  menu: {
    position: "absolute",
    top: 46,
    right: 0,
    minWidth: 200,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    paddingVertical: 6,
    zIndex: 50,
    ...(Platform.OS === "web"
      ? ({ boxShadow: "0 12px 32px rgba(23,23,23,0.12)" } as object)
      : {
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
        }),
  },
  email: {
    fontSize: 11,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: Fonts.sans,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemText: {
    fontFamily: Fonts.serif,
    fontSize: 16,
  },
});
