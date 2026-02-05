import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <View style={styles.centerContent}>
        {/* Heart Image - Ensure heart.png exists in your assets/images folder */}
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.heartImage}
          resizeMode="contain"
        />

        <Text style={styles.welcomeTitle}>Welcome back</Text>
        <Text style={styles.description}>
          We've missed you. Let's see{"\n"}what's new in your circle.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.phoneButton}>
          <Ionicons
            name="phone-portrait-outline"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.phoneButtonText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <FontAwesome
            name="google"
            size={24}
            color="#EA4335"
            style={styles.buttonIcon}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          New here? <Text style={styles.linkText}>Create account</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Trouble logging in?</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2E8",
    paddingHorizontal: 40,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
  },
  header: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    letterSpacing: 4,
    fontFamily: "serif",
    color: "#000",
  },
  centerContent: {
    alignItems: "center",
    marginBottom: 50,
  },
  heartImage: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: "800",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  phoneButton: {
    flexDirection: "row",
    backgroundColor: "#B58373",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  phoneButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    elevation: 3,
  },
  googleButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 10,
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
    gap: 10,
  },
  footerText: {
    fontSize: 16,
    color: "#8C7A5B",
  },
  linkText: {
    fontSize: 16,
    color: "#8C7A5B",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
