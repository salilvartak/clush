import { ThemedView } from "@/components/themed-view";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
} from "firebase/auth";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { auth } from "../firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // Configure Google Sign-In
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // Client IDs from google-services.json
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com", // Add iOS Client ID if testing on iOS
    androidClientId: "885455459982-ltgro6j2c98l3hoilqsi3l3470f3muam.apps.googleusercontent.com",
    webClientId: "885455459982-p3numcgf7ve0b5mobvaobr74fgou11pv.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      setLoading(true);
      signInWithCredential(auth, credential).catch((error) => {
        setLoading(false);
        alert("Login failed: " + error.message);
      });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/success");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.centerContent}>
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

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()} // <--- Make sure this is here!
          disabled={!request}
        >
          {loading ? (
            <ActivityIndicator color="#EA4335" style={styles.buttonIcon} />
          ) : (
            <FontAwesome
              name="google"
              size={24}
              color="#EA4335"
              style={styles.buttonIcon}
            />
          )}
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      {/* ... Footer code ... */}
    </ThemedView>
  );
}

// ... styles ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2E8",
    paddingHorizontal: 40,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
  },
  centerContent: { alignItems: "center", marginBottom: 50 },
  heartImage: { width: 250, height: 250, marginBottom: 30 },
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
  buttonContainer: { width: "100%", gap: 15 },
  phoneButton: {
    flexDirection: "row",
    backgroundColor: "#B58373",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  phoneButtonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
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
  googleButtonText: { color: "#000", fontSize: 18, fontWeight: "600" },
  buttonIcon: { marginRight: 10 },
});
