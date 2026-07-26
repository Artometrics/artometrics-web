import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
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
import { StudioBreadcrumb } from "@/components/studio/StudioBreadcrumb";
import { StudioDateField, StudioTimeField } from "@/components/studio/StudioDateField";
import { StudioPlaceField } from "@/components/studio/StudioPlaceField";
import { StudioSelect } from "@/components/studio/StudioSelect";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { apiFetch } from "@/lib/supabase/client";
import { listTimezones } from "@/lib/studio/timezones";
import {
  ageFromBirthDate,
  birthdayInsight,
  lifePathNumber,
  moonPhaseApprox,
  nameNumbers,
  nextBirthday,
  sunSignFromDate,
} from "@/lib/aftercare/calculators";
import {
  expressionReading,
  lifePathReading,
  personalityReading,
  soulUrgeReading,
  sunSignReading,
  type NumberReading,
  type SunReading,
} from "@/lib/aftercare/readings";

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
  const [openReading, setOpenReading] = useState<string | null>("lifePath");

  const tzOptions = useMemo(
    () => listTimezones().map((tz) => ({ value: tz, label: tz.replace(/_/g, " ") })),
    [],
  );

  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(birthDate.trim());
  const insight = useMemo(
    () => (validDate ? birthdayInsight(birthDate.trim()) : null),
    [birthDate, validDate],
  );
  const sunSign = useMemo(
    () => (validDate ? sunSignFromDate(birthDate.trim()) : null),
    [birthDate, validDate],
  );
  const lifePath = useMemo(
    () => (validDate ? lifePathNumber(birthDate.trim()) : null),
    [birthDate, validDate],
  );
  const nextBday = useMemo(
    () => (validDate ? nextBirthday(birthDate.trim()) : null),
    [birthDate, validDate],
  );
  const age = useMemo(
    () => (validDate ? ageFromBirthDate(birthDate.trim()) : null),
    [birthDate, validDate],
  );
  const moon = useMemo(() => moonPhaseApprox(), []);
  const names = useMemo(() => nameNumbers(displayName), [displayName]);

  const readings = useMemo(() => {
    const cards: {
      id: string;
      badge: string;
      reading: NumberReading | SunReading | null;
      kind: "number" | "sun";
    }[] = [
      {
        id: "lifePath",
        badge: lifePath != null ? `Life Path ${lifePath}` : "Life Path",
        reading: lifePathReading(lifePath),
        kind: "number",
      },
      {
        id: "sun",
        badge: sunSign ? `Sun · ${sunSign}` : "Sun sign",
        reading: sunSignReading(sunSign),
        kind: "sun",
      },
      {
        id: "expression",
        badge:
          names.expression != null ? `Expression ${names.expression}` : "Expression",
        reading: expressionReading(names.expression),
        kind: "number",
      },
      {
        id: "soulUrge",
        badge: names.soulUrge != null ? `Soul Urge ${names.soulUrge}` : "Soul Urge",
        reading: soulUrgeReading(names.soulUrge),
        kind: "number",
      },
      {
        id: "personality",
        badge:
          names.personality != null
            ? `Personality ${names.personality}`
            : "Personality",
        reading: personalityReading(names.personality),
        kind: "number",
      },
    ];
    return cards;
  }, [lifePath, sunSign, names]);

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

  const badgeParts = [
    names.expression != null ? `Expression ${names.expression}` : null,
    names.soulUrge != null ? `Soul Urge ${names.soulUrge}` : null,
    lifePath != null ? `Life Path ${lifePath}` : null,
  ].filter(Boolean);

  return (
    <Wrapper style={styles.wrap}>
      <PageSeo
        title="Birth tools · Aftercare"
        description="Birth profile and reflective calculators on Artometrics Aftercare."
        path="/tools/aftercare/tools"
      />
      <ToolsSubnav links={NAV} />
      <StudioBreadcrumb
        items={[
          { label: "Studio", href: "/studio" },
          { label: "Aftercare", href: "/tools/aftercare" },
          { label: "Birth tools" },
        ]}
      />
      <Text style={[styles.title, { color: colors.text }]}>Birth tools</Text>
      <Text style={[styles.deck, { color: colors.textMuted }]}>
        Name numbers, life path, and sun notes — reflective tools, not science, medical, or
        financial advice.
      </Text>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 16 }} />
      ) : (
        <>
          <View style={styles.split}>
            <View
              style={StyleSheet.flatten([
                styles.panel,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.bgElevated,
                  zIndex: 20,
                },
              ])}
            >
              <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                Profile
              </Text>
              <View style={{ gap: 6 }}>
                <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>
                  Display name
                </Text>
                <TextInput
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Name for numerology"
                  placeholderTextColor={colors.textSubtle}
                  style={StyleSheet.flatten([
                    styles.input,
                    {
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: colors.bg,
                    },
                  ])}
                />
              </View>
              {badgeParts.length ? (
                <Text style={[styles.badges, { color: colors.accent }]}>
                  {badgeParts.join(" · ")}
                </Text>
              ) : null}

              <StudioDateField
                label="Birth date"
                value={birthDate}
                onChange={setBirthDate}
              />
              <StudioTimeField
                label="Birth time"
                value={birthTime}
                onChange={setBirthTime}
              />
              <StudioPlaceField
                label="Birth place"
                value={birthPlace}
                onChange={setBirthPlace}
                onTimezoneSuggest={(tz) => setTimezone(tz)}
              />
              <StudioSelect
                label="Timezone"
                value={timezone}
                options={tzOptions}
                onChange={setTimezone}
                placeholder="Select timezone…"
                searchable
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

            <View style={styles.deckCol}>
              <View
                style={StyleSheet.flatten([
                  styles.todayStrip,
                  { borderColor: colors.border, backgroundColor: colors.bgElevated },
                ])}
              >
                <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Today</Text>
                <Text style={[styles.todayLine, { color: colors.text }]}>
                  {age != null ? `Age ${age}` : "Add a birth date"}
                  {nextBday
                    ? ` · Next birthday in ${nextBday.daysUntil} day${nextBday.daysUntil === 1 ? "" : "s"}`
                    : ""}
                </Text>
                <Text style={[styles.todayMeta, { color: colors.textSubtle }]}>
                  Moon: {moon.name}
                  {typeof moon.illumination === "number" ? ` · ~${moon.illumination}% lit` : ""}
                  {insight?.note ? ` · ${sunSign ?? "—"} season` : ""}
                </Text>
              </View>

              <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
                Reading deck
              </Text>
              {!displayName.trim() && !validDate ? (
                <Text style={[styles.note, { color: colors.textMuted }]}>
                  Enter a display name and birth date to unlock Expression, Soul Urge, Life Path,
                  and sun readings.
                </Text>
              ) : null}

              {readings.map((card) => {
                if (!card.reading) return null;
                const open = openReading === card.id;
                return (
                  <View
                    key={card.id}
                    style={StyleSheet.flatten([
                      styles.readingCard,
                      {
                        borderColor: colors.border,
                        backgroundColor: colors.bgElevated,
                      },
                    ])}
                  >
                    <Pressable
                      onPress={() => setOpenReading(open ? null : card.id)}
                      style={styles.readingHead}
                    >
                      <Text style={[styles.readingBadge, { color: colors.accent }]}>
                        {card.badge}
                      </Text>
                      <Text style={[styles.readingTitle, { color: colors.text }]}>
                        {"title" in card.reading
                          ? card.reading.title
                          : `${(card.reading as SunReading).sign} · ${(card.reading as SunReading).element} / ${(card.reading as SunReading).modality}`}
                      </Text>
                      <Text style={[styles.chev, { color: colors.textSubtle }]}>
                        {open ? "−" : "+"}
                      </Text>
                    </Pressable>
                    {open ? (
                      <View style={styles.readingBody}>
                        {"keywords" in card.reading ? (
                          <Text style={[styles.keywords, { color: colors.textMuted }]}>
                            {(card.reading as NumberReading).keywords.join(" · ")}
                          </Text>
                        ) : null}
                        <Text style={[styles.essay, { color: colors.text }]}>
                          {card.reading.essay}
                        </Text>
                        <Text style={[styles.prompt, { color: colors.textMuted }]}>
                          {"seasonPrompt" in card.reading
                            ? (card.reading as NumberReading).seasonPrompt
                            : (card.reading as SunReading).seasonNote}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              })}

              <Text style={[styles.disclaimer, { color: colors.textSubtle }]}>
                Reflective tools for creative self-inquiry. Not science, astrology-as-fact, medical,
                or financial advice.
              </Text>
            </View>
          </View>
        </>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 32, gap: 10 },
  title: { fontFamily: Fonts.serif, fontSize: 36, fontWeight: "700" },
  deck: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26, maxWidth: 640 },
  split: {
    marginTop: 8,
    gap: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  panel: {
    flexGrow: 1,
    flexBasis: 320,
    maxWidth: 420,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    padding: 18,
    gap: 12,
  },
  deckCol: { flexGrow: 1, flexBasis: 320, gap: 12, minWidth: 280 },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  fieldLabel: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: Fonts.serif,
    fontSize: 16,
  },
  badges: {
    fontFamily: Fonts.serif,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },
  error: { fontFamily: Fonts.serif, fontSize: 15 },
  saved: { fontFamily: Fonts.serif, fontSize: 15 },
  todayStrip: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    padding: 14,
    gap: 4,
  },
  todayLine: { fontFamily: Fonts.serif, fontSize: 18, fontWeight: "700" },
  todayMeta: { fontSize: 13, lineHeight: 20 },
  readingCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    overflow: "hidden",
  },
  readingHead: { padding: 14, gap: 4, paddingRight: 36 },
  readingBadge: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  readingTitle: { fontFamily: Fonts.serif, fontSize: 20, fontWeight: "700", paddingRight: 12 },
  chev: {
    position: "absolute",
    right: 14,
    top: 14,
    fontSize: 20,
    fontWeight: "600",
  },
  readingBody: { paddingHorizontal: 14, paddingBottom: 16, gap: 10 },
  keywords: { fontSize: 13, letterSpacing: 0.3 },
  essay: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
  prompt: { fontFamily: Fonts.serif, fontSize: 15, lineHeight: 24, fontStyle: "italic" },
  note: { fontFamily: Fonts.serif, fontSize: 16, lineHeight: 26 },
  disclaimer: { fontSize: 12, lineHeight: 18, marginTop: 4 },
});
