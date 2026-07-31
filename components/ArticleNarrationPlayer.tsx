import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { Fonts } from "@/constants/Colors";
import { useTheme } from "@/lib/theme";
import { assetUrl } from "@/lib/assets";

const RATES = [0.75, 1, 1.25, 1.5, 2] as const;

type Props = {
  audioSrc: string | null | undefined;
  title?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ArticleNarrationPlayer({ audioSrc, title }: Props) {
  const { colors } = useTheme();
  const uri = assetUrl(audioSrc);
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);
  const [rate, setRate] = useState<(typeof RATES)[number]>(1);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (!uri) return;
    try {
      player.shouldCorrectPitch = true;
      player.setPlaybackRate(rate);
    } catch {
      try {
        player.playbackRate = rate;
      } catch {
        /* soft */
      }
    }
  }, [rate, uri, player]);

  if (!uri) return null;

  const duration = status.duration || 0;
  const current = status.currentTime || 0;
  const progress = duration > 0 ? Math.min(1, current / duration) : 0;

  async function toggle() {
    if (status.playing) {
      try {
        player.pause();
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: false,
      });
    } catch {
      /* best-effort */
    }
    try {
      player.shouldCorrectPitch = true;
      player.setPlaybackRate(rate);
    } catch {
      try {
        player.playbackRate = rate;
      } catch {
        /* soft */
      }
    }
    try {
      player.play();
    } catch {
      /* not loaded yet */
    }
  }

  function seekToRatio(ratio: number) {
    if (!duration) return;
    const next = Math.max(0, Math.min(duration, ratio * duration));
    void player.seekTo(next);
  }

  return (
    <View
      style={[
        styles.wrap,
        { borderColor: colors.border, backgroundColor: colors.bgElevated },
      ]}
      accessibilityLabel={title ? `Listen to ${title}` : "Listen to narration"}
    >
      <View style={styles.topRow}>
        <Pressable
          onPress={() => void toggle()}
          style={[styles.playBtn, { backgroundColor: colors.text }]}
          accessibilityRole="button"
          accessibilityLabel={status.playing ? "Pause narration" : "Play narration"}
        >
          <Text style={[styles.playLabel, { color: colors.inverse }]}>
            {status.playing ? "Pause" : "Listen"}
          </Text>
        </Pressable>
        <View style={styles.metaCol}>
          <Text style={[styles.kicker, { color: colors.accent }]}>Narration</Text>
          <Text style={[styles.time, { color: colors.textMuted }]}>
            {formatTime(current)} / {formatTime(duration)}
          </Text>
        </View>
        <View style={styles.rates}>
          {RATES.map((r) => {
            const active = rate === r;
            return (
              <Pressable
                key={r}
                onPress={() => setRate(r)}
                style={[
                  styles.rateBtn,
                  {
                    borderColor: colors.border,
                    backgroundColor: active ? colors.text : "transparent",
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel={`${r} times speed`}
                accessibilityState={{ selected: active }}
              >
                <Text
                  style={[
                    styles.rateLabel,
                    { color: active ? colors.inverse : colors.text },
                  ]}
                >
                  {r === 1 ? "1×" : `${r}×`}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable
        style={[styles.track, { backgroundColor: colors.border }]}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
        onPress={(e) => {
          if (!trackWidth) return;
          seekToRatio(e.nativeEvent.locationX / trackWidth);
        }}
        accessibilityRole="adjustable"
        accessibilityLabel="Seek narration"
      >
        <View
          style={[
            styles.fill,
            { width: `${progress * 100}%`, backgroundColor: colors.accent },
          ]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    padding: 14,
    gap: 12,
    marginTop: 4,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  playBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 88,
    alignItems: "center",
  },
  playLabel: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  metaCol: { flexGrow: 1, gap: 2, minWidth: 100 },
  kicker: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  time: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    lineHeight: 16,
  },
  rates: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  rateBtn: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 40,
    alignItems: "center",
  },
  rateLabel: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    fontWeight: "700",
  },
  track: {
    height: 6,
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
