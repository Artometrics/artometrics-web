import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Link, useFocusEffect } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { getLocalSaves } from "@/lib/storage";
import type { SavedArticle } from "@/lib/types";

export default function SavedScreen() {
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];
  const [items, setItems] = useState<SavedArticle[]>([]);

  const load = useCallback(async () => {
    setItems(await getLocalSaves());
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Saved reports</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>
        Stored on this device. Sign in on the web to sync when membership is enabled.
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={items.length ? styles.list : styles.emptyList}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
            Save reports from the reader to build your list.
          </Text>
        }
        renderItem={({ item }) => (
          <Link href={`/report/${item.slug}`} asChild>
            <Pressable
              style={({ pressed }) => [
                styles.row,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
            >
              <Text style={[styles.rowTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.rowMeta, { color: colors.muted }]}>
                {new Date(item.savedAt).toLocaleDateString()}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Georgia",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 40,
    gap: 10,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 40,
  },
  empty: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
  },
  row: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  rowTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Georgia",
  },
  rowMeta: {
    marginTop: 6,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
