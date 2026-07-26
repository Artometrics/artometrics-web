import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
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
import {
  birthdayInsight,
  lifePathNumber,
  nextBirthday,
  sunSignFromDate,
} from "@/lib/aftercare/calculators";
import { celestialForSign } from "@/lib/aftercare/planets";
import { PlanetPoster } from "@/components/aftercare/PlanetPoster";
import { CosmicChartCard } from "@/components/aftercare/CosmicChartCard";

const NAV = [
  { href: "/tools/aftercare", label: "Home" },
  { href: "/tools/aftercare/journal", label: "Journal" },
  { href: "/tools/aftercare/tarot", label: "Tarot" },
  { href: "/tools/aftercare/track", label: "Track" },
  { href: "/tools/aftercare/tools", label: "Birth tools" },
];

type Profile = {
  display_name?: string | null;
  birth_date?: string | null;
  birth_time?: string | null;
  birth_place?: string | null;
  timezone?: string | null;
};

export default function AftercareBirthToolsScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [displayName, setDisplayName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [timezone, setTimezone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const insight = useMemo(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate.trim())) return null;
    return birthdayInsight(birthDate.trim());
  }, [birthDate]);

  const sunSign = useMemo(
    () => (birthDate.trim() ? sunSignFromDate(birthDate.trim()) : null),
    [birthDate],
  );
  const lifePath = useMemo(
    () => (birthDate.trim() ? lifePathNumber(birthDate.trim()) : null),
    [birthDate],
  );
  const nextBday = useMemo(
    () => (birthDate.trim() ? nextBirthday(birthDate.trim()) : null),
    [birthDate],
  );

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const res = await apiFetch("aftercare-profile");
      const data = (await res.json().catch(() => ({}))) as {
        profile?: Profile;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not load birth profile.");
        return;
      }
      const p = data.profile;
      setDisplayName(p?.display_name ?? "");
      setBirthDate(p?.birth_date ?? "");
      setBirthTime(p?.birth_time ?? "");
      setBirthPlace(p?.birth_place ?? "");
      setTimezone(p?.timezone ?? "");
      setError(null);
    } catch {
      setError("Could not load birth profile.");
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!ready || !user) return;
      let active = true;
      (async () => {
        try {
          setLoading(true);
          await load();
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }, [load, ready, user]),
  );

  async function onSave() {
    setSaving(true);
    setError(null);
    setSavedMsg(null);
    try {
      const res = await apiFetch("aftercare-profile", {
        method: "PUT",
        body: JSON.stringify({
          displayName: displayName.trim() || undefined,
          birthDate: birthDate.trim() || undefined,
          birthTime: birthTime.trim() || undefined,
          birthPlace: birthPlace.trim() || undefined,
          timezone: timezone.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        profile?: Profile;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error || "Could not save profile.");
        return;
      }
      if (data.profile) {
        setDisplayName(data.profile.display_name ?? "");
        setBirthDate(data.profile.birth_date ?? "");
        setBirthTime(data.profile.birth_time ?? "");
        setBirthPlace(data.profile.birth_place ?? "");
        setTimezone(data.profile.timezone ?? "");
      }
      setSavedMsg("Profile saved.");
    } catch {
      setError("Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return (
      <Wrapper style={styles.wrap}>
        <Text style={{ color: colors.textMuted }}>Loading…</Text>
      </Wrapper>
    );
  }

  const inputStyle = [
    styles.input,
    {
      borderColor: colors.border,
      color: colors.text,
      backgroundColor: colors.bgElevated,
    },
  ];

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Birth tools · Aftercare"
        description="Birth profile and reflective calculators on Artometrics Aftercare."
        path="/tools/aftercare/tools"
      />
      <ToolsSubnav links={NAV} />
      <Text style={[styles.eyebrow, { color: colors.accent }]}>Aftercare</Text>
      <Text style={[styles.title, { color: colors.text }]}>Birth tools</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Reflective sign and life-path notes — not science. Save your birth details under your Artometrics account.
      </Text>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 16 }} />
      ) : (
        <>
          <View style={[styles.form, { borderColor: colors.border }]}>
            <FieldLabel colors={colors} label="Display name" />
            <TextInput
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Name"
              placeholderTextColor={colors.textSubtle}
              style={inputStyle}
            />
            <FieldLabel colors={colors} label="Birth date (YYYY-MM-DD)" />
            <TextInput
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="1990-06-15"
              autoCapitalize="none"
              placeholderTextColor={colors.textSubtle}
              style={inputStyle}
            />
            <FieldLabel colors={colors} label="Birth time (optional)" />
            <TextInput
              value={birthTime}
              onChangeText={setBirthTime}
              placeholder="14:30"
              autoCapitalize="none"
              placeholderTextColor={colors.textSubtle}
              style={inputStyle}
            />
            <FieldLabel colors={colors} label="Birth place (optional)" />
            <TextInput
              value={birthPlace}
              onChangeText={setBirthPlace}
              placeholder="City, country"
              placeholderTextColor={colors.textSubtle}
              style={inputStyle}
            />
            <FieldLabel colors={colors} label="Timezone (optional)" />
            <TextInput
              value={timezone}
              onChangeText={setTimezone}
              placeholder="America/New_York"
              autoCapitalize="none"
              placeholderTextColor={colors.textSubtle}
              style={inputStyle}
            />
            {error ? (
              <Text style={[styles.error, { color: colors.accent }]}>{error}</Text>
            ) : null}
            {savedMsg ? (
              <Text style={[styles.saved, { color: colors.textMuted }]}>{savedMsg}</Text>
            ) : null}
            <PrimaryButton
              label={saving ? "Saving…" : "Save profile"}
              onPress={onSave}
              disabled={saving}
            />
          </View>

          <View style={[styles.insight, { borderColor: colors.border }]}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              Celestial deck
            </Text>
            {sunSign || lifePath || nextBday ? (
              <>
                {(() => {
                  const c = celestialForSign(sunSign);
                  return (
                    <View style={{ gap: 14 }}>
                      <PlanetPoster
                        seasonTitle={c.seasonTitle}
                        seasonLine={c.seasonLine}
                        planet={c.planet}
                        dateLabel={
                          nextBday
                            ? `Next birthday · ${nextBday.daysUntil}d`
                            : undefined
                        }
                      />
                      <CosmicChartCard
                        eyebrow={
                          insight?.note ||
                          `Life path ${lifePath ?? "—"} · reflective chart card`
                        }
                        planet={c.planet}
                        profileLabel={displayName || "You"}
                      />
                    </View>
                  );
                })()}
                <InsightRow
                  colors={colors}
                  label="Life path"
                  value={lifePath != null ? String(lifePath) : "—"}
                />
                {insight?.moonToday?.name ? (
                  <Text style={[styles.meta, { color: colors.textSubtle }]}>
                    Moon today: {insight.moonToday.name}
                    {typeof insight.moonToday.illumination === "number"
                      ? ` · ~${insight.moonToday.illumination}% lit`
                      : ""}
                  </Text>
                ) : null}
                <Text style={[styles.meta, { color: colors.textSubtle }]}>
                  Reflective tools — not science, medical, or financial advice.
                </Text>
              </>
            ) : (
              <Text style={[styles.note, { color: colors.textMuted }]}>
                Enter a birth date (YYYY-MM-DD) to unlock your planet poster and chart card.
              </Text>
            )}
          </View>
        </>
      )}
    </Wrapper>
  );
}

function FieldLabel({
  colors,
  label,
}: {
  colors: { textMuted: string };
  label: string;
}) {
  return (
    <Text
      style={{
        fontSize: 12,
        letterSpacing: 0.8,
        textTransform: "uppercase",
        fontWeight: "700",
        color: colors.textMuted,
      }}
    >
      {label}
    </Text>
  );
}

function InsightRow({
  colors,
  label,
  value,
}: {
  colors: { text: string; textMuted: string };
  label: string;
  value: string;
}) {
  return (
    <View style={{ gap: 2 }}>
      <Text
        style={{
          fontSize: 12,
          letterSpacing: 0.8,
          textTransform: "uppercase",
          fontWeight: "700",
          color: colors.textMuted,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.serif,
          fontSize: 22,
          fontWeight: "700",
          color: colors.text,
        }}
      >
        {value}
      </Text>
    </View>
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
  form: {
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 10,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.serif,
    fontSize: 16,
  },
  error: { fontFamily: Fonts.serif, fontSize: 15 },
  saved: { fontFamily: Fonts.serif, fontSize: 15 },
  insight: {
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 14,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  note: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
  meta: { fontSize: 13 },
});
