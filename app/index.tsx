import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>
          Connect with your friends easily
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          A new way to stay in touch with your community and share moments.
        </ThemedText>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: Colors[colorScheme].tint },
          ]}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <ThemedText style={styles.secondaryButtonText}>Log In</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, justifyContent: "center" },
  imageContainer: { flex: 0.5, alignItems: "center", justifyContent: "center" },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
  },
  contentContainer: { flex: 0.5, alignItems: "center" },
  title: { textAlign: "center", fontSize: 28, marginBottom: 16 },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 40,
  },
  primaryButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  secondaryButton: { width: "100%", paddingVertical: 16, alignItems: "center" },
  secondaryButtonText: { fontSize: 16, fontWeight: "500" },
});
