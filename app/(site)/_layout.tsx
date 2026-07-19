import { Slot } from "expo-router";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Colors } from "@/constants/Colors";

export default function SiteLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.root}>
          <SiteHeader />
          <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
            <Slot />
            <SiteFooter />
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  root: { flex: 1, backgroundColor: Colors.white },
  scroll: { flex: 1 },
  content: { flexGrow: 1, paddingBottom: 24 },
});
