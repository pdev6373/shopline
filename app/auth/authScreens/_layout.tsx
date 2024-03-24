import { Slot } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function AuthScreensLayout() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.wrapper}
    >
      <Slot />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    gap: 32,
  },
});
