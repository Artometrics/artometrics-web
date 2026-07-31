import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { router } from "expo-router";
import { Wrapper } from "@/components/Wrapper";
import { useTheme } from "@/lib/theme";
import { useRequireAuth } from "@/lib/tools/requireAuth";
import { DEFAULT_SYNTH, newPackId, type SamplePack } from "@/lib/samples/types";
import { saveSamplePack } from "@/lib/samples/storage";

/** Creates a pack and routes into the recorder editor. */
export default function SampleQuickRecordScreen() {
  const { colors } = useTheme();
  const { user, ready } = useRequireAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !user) return;
    let cancelled = false;
    (async () => {
      try {
        const now = new Date().toISOString();
        const pack: SamplePack = {
          id: newPackId(),
          userId: user.id,
          title: `Recording ${new Date().toLocaleString()}`,
          sourceUri: null,
          durationSec: 0,
          synth: { ...DEFAULT_SYNTH },
          clips: [],
          createdAt: now,
          updatedAt: now,
        };
        await saveSamplePack(pack);
        if (!cancelled) router.replace(`/tools/samples/${pack.id}`);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not start recording");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, user]);

  return (
    <Wrapper variant="narrow" className="py-12 items-center">
      {error ? (
        <Text className="text-accent">{error}</Text>
      ) : (
        <>
          <ActivityIndicator color={colors.accent} />
          <Text className="text-muted mt-3">Starting recorder…</Text>
        </>
      )}
    </Wrapper>
  );
}
