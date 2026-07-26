import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";
import { ToolsSubnav } from "@/components/tools/ToolsSubnav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { apiFetch } from "@/lib/supabase/client";

const NAV = [
  { href: "/tools/aftercare", label: "Home" },
  { href: "/tools/aftercare/journal", label: "Journal" },
  { href: "/tools/aftercare/tarot", label: "Tarot" },
  { href: "/tools/aftercare/track", label: "Track" },
  { href: "/tools/aftercare/tools", label: "Birth tools" },
];

type SpreadType = "single" | "three";

type TarotCard = {
  cardId?: string;
  name: string;
  reversed?: boolean;
  position?: string;
  imageUrl?: string | null;
};

type TarotPull = {
  id: string;
  spread_type?: SpreadType | string;
  question?: string | null;
  interpretation?: string | null;
  cards?: TarotCard[];
  created_at?: string;
};

function resolveMediaUrl(url?: string | null) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
  }
  return url;
}

export default function AftercareTarotScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [spreadType, setSpreadType] = useState<SpreadType>("single");
  const [question, setQuestion] = useState("");
  const [pull, setPull] = useState<TarotPull | null>(null);
  const [history, setHistory] = useState<TarotPull[]>([]);
  const [loading, setLoading] = useState(true);
  const [pulling, setPulling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    if (!user) return;
    try {
      const res = await apiFetch("aftercare-tarot");
      const data = (await res.json().catch(() => ({}))) as {
        pulls?: TarotPull[];
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not load pull history.");
        return;
      }
      setHistory(data.pulls ?? []);
      setError(null);
    } catch {
      setError("Could not load pull history.");
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!ready || !user) return;
      let active = true;
      (async () => {
        try {
          setLoading(true);
          await loadHistory();
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [loadHistory, ready, user]),
  );

  async function onPull() {
    setPulling(true);
    setError(null);
    try {
      const res = await apiFetch("aftercare-tarot", {
        method: "POST",
        body: JSON.stringify({
          spreadType,
          question: question.trim() || undefined,
          withArt: true,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        pull?: TarotPull;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not complete this pull.");
        return;
      }
      setPull(data.pull ?? null);
      await loadHistory();
    } catch {
      setError("Could not complete this pull.");
    } finally {
      setPulling(false);
    }
  }

  if (!ready) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Tarot · Aftercare"
        description="Gentle tarot pulls on Artometrics Aftercare."
        path="/tools/aftercare/tarot"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Aftercare</Text>
      <Text style={[styles.title, { color: colors.text }]}>Tarot</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Ask softly. Sit with what arrives.
      </Text>

      <View style={styles.spreadRow}>
        {(["single", "three"] as const).map((s) => {
          const active = spreadType === s;
          return (
            <Pressable
              key={s}
              onPress={() => setSpreadType(s)}
              style={[
                styles.chip,
                {
                  borderColor: colors.border,
                  backgroundColor: active ? colors.text : "transparent",
                },
              ]}
            >
              <Text style={{ color: active ? colors.inverse : colors.text, fontSize: 13 }}>
                {s === "single" ? "Single card" : "Three-card"}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Optional question"
        placeholderTextColor={colors.textSubtle}
        style={[
          styles.input,
          {
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.bgElevated,
          },
        ]}
      />

      {error ? (
        <Text style={[styles.error, { color: colors.accent }]}>{error}</Text>
      ) : null}

      <PrimaryButton
        label={pulling ? "Pulling…" : "Pull cards"}
        onPress={onPull}
        disabled={pulling}
      />

      {pull ? (
        <View style={[styles.result, { borderColor: colors.border }]}>
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            This pull
          </Text>
          {pull.question ? (
            <Text style={[styles.question, { color: colors.text }]}>
              “{pull.question}”
            </Text>
          ) : null}
          <View style={styles.cards}>
            {(pull.cards ?? []).map((card, i) => {
              const art = resolveMediaUrl(card.imageUrl);
              return (
              <View
                key={`${card.cardId ?? card.name}-${i}`}
                style={[styles.card, { borderColor: colors.border }]}
              >
                {art ? (
                  <Image
                    source={{ uri: art }}
                    style={styles.cardArt}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={[
                      styles.cardArtFallback,
                      { backgroundColor: colors.bgElevated, borderColor: colors.border },
                    ]}
                  >
                    <Text style={{ color: colors.textSubtle, fontSize: 12 }}>No art</Text>
                  </View>
                )}
                {card.position ? (
                  <Text style={[styles.position, { color: colors.accent }]}>
                    {card.position}
                  </Text>
                ) : null}
                <Text style={[styles.cardName, { color: colors.text }]}>
                  {card.name}
                  {card.reversed ? " (rev.)" : ""}
                </Text>
              </View>
              );
            })}
          </View>
          {pull.interpretation ? (
            <Text style={[styles.interp, { color: colors.textMuted }]}>
              {pull.interpretation}
            </Text>
          ) : null}
        </View>
      ) : null}

      <Text style={[styles.sectionLabel, { color: colors.textMuted, marginTop: 12 }]}>
        History
      </Text>
      {loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : history.length === 0 ? (
        <Text style={[styles.deck, { color: colors.textMuted }]}>
          No pulls yet. Start with a single card.
        </Text>
      ) : (
        <View style={styles.history}>
          {history.map((h) => (
            <Pressable
              key={h.id}
              onPress={() => setPull(h)}
              style={[styles.historyItem, { borderColor: colors.border }]}
            >
              <Text style={[styles.meta, { color: colors.accent }]}>
                {h.spread_type === "three" ? "Three-card" : "Single"}
                {h.created_at
                  ? ` · ${new Date(h.created_at).toLocaleDateString()}`
                  : ""}
              </Text>
              <Text style={[styles.historyQ, { color: colors.text }]} numberOfLines={2}>
                {h.question ||
                  (h.cards ?? []).map((c) => c.name).join(", ") ||
                  "Untitled pull"}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 10 },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 560 },
  spreadRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  chip: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.serif,
    fontSize: 16,
  },
  error: { fontFamily: Fonts.serif, fontSize: 15 },
  result: {
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  question: { fontFamily: Fonts.serif, fontSize: 17, lineHeight: 26 },
  cards: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    width: 140,
    gap: 6,
  },
  cardArt: { width: "100%", aspectRatio: 2 / 3, backgroundColor: "#eee" },
  cardArtFallback: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  position: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  cardName: { fontFamily: Fonts.serif, fontSize: 15, fontWeight: "700" },
  interp: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
  history: { gap: 10 },
  historyItem: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    gap: 4,
  },
  meta: { fontSize: 12, fontWeight: "600" },
  historyQ: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 22 },
});
