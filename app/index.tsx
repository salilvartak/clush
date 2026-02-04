import { ThemedView } from "@/components/themed-view";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Firebase & Auth Imports
import * as Google from "expo-auth-session/providers/google";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
    GoogleAuthProvider,
    PhoneAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import { auth } from "../constants/firebase-config";

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);

  // 1. Google Auth Configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => router.replace("/success")) // Send to success screen
        .catch((error) => Alert.alert("Google Login Error", error.message));
    }
  }, [response]);

  // 2. Phone Auth: Send OTP
  const handleSendOTP = async () => {
    if (!phoneNumber.startsWith("+")) {
      return Alert.alert(
        "Format Error",
        "Please include country code (e.g., +1)",
      );
    }
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const vid = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current!,
      );

      // Navigate to the OTP screen and pass necessary data
      router.push({
        pathname: "/otp",
        params: { verificationId: vid, phone: phoneNumber },
      });
    } catch (err: any) {
      Alert.alert("Phone Auth Error", err.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Required for Phone OTP */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <View style={styles.centerContent}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.heartImage}
          resizeMode="contain"
        />
        <Text style={styles.welcomeTitle}>Welcome to Clush</Text>
        <Text style={styles.description}>Where Trust Meets Chemistry.</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* Phone Input Field */}
        <TextInput
          style={styles.input}
          placeholder="+1 123 456 7890"
          placeholderTextColor="#999"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.phoneButton} onPress={handleSendOTP}>
          <Ionicons
            name="phone-portrait-outline"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.phoneButtonText}>Continue with Phone</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Google Login Button */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
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
    alignItems: "center",
  },
  centerContent: { alignItems: "center", marginBottom: 40 },
  heartImage: { width: 300, height: 160, marginBottom: 20 },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    color: "#000",
    fontFamily: "serif",
  },
  description: { fontSize: 16, textAlign: "center", color: "#666" },
  buttonContainer: { width: "100%", gap: 15 },
  input: {
    backgroundColor: "#FFF",
    height: 55,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 16,
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
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  line: { flex: 1, height: 1, backgroundColor: "#DDD" },
  dividerText: { marginHorizontal: 10, color: "#999", fontWeight: "bold" },
  footer: { marginTop: "auto", paddingBottom: 20 },
  footerText: { fontSize: 16, color: "#8C7A5B" },
  linkText: { textDecorationLine: "underline", fontWeight: "bold" },
});
