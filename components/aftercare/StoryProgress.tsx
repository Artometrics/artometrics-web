import { View, StyleSheet } from "react-native";

export function StoryProgress({
  count,
  index,
}: {
  count: number;
  index: number;
}) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: i < index ? "100%" : i === index ? "55%" : "0%" },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 4,
  },
  track: {
    flex: 1,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.28)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 2,
  },
});
