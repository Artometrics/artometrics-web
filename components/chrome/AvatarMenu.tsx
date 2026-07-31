import { useEffect, useRef, useState } from "react";
import { Platform, Pressable, Text, View, type View as RNView } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { getProfile } from "@/lib/profile/service";

const menuShadow =
  Platform.OS === "web"
    ? ({ boxShadow: "0 12px 32px rgba(23,23,23,0.12)" } as object)
    : {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
      };

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
        className="h-10 w-10 items-center justify-center rounded-btn border border-fg bg-bg-elevated"
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
    <View ref={rootRef} className="relative z-20" collapsable={false}>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        hitSlop={8}
        accessibilityLabel="Account menu"
        accessibilityRole="button"
        className={[
          "h-10 w-10 items-center justify-center rounded-btn border bg-bg-elevated",
          open ? "border-accent" : "border-fg",
        ].join(" ")}
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
          className="absolute top-[46px] right-0 z-50 min-w-[200px] rounded-btn border border-border bg-header py-1.5"
          style={[{ shadowColor: colors.text }, menuShadow]}
        >
          <Text
            className="px-3 py-2 text-[11px] font-sans text-subtle"
            numberOfLines={1}
          >
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
              className="px-3 py-2.5 active:bg-accent-soft"
            >
              <Text className="text-base font-serif text-fg">{item.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}
