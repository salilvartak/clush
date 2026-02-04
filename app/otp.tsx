import { useLocalSearchParams, useRouter } from "expo-router";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth } from "../constants/firebase-config";

export default function OTPScreen() {
  const router = useRouter();
  const { verificationId, phone } = useLocalSearchParams();
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId as string,
        code,
      );
      await signInWithCredential(auth, credential);
      router.replace("/success");
    } catch (err: any) {
      Alert.alert("Invalid Code", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Phone</Text>
      <Text style={styles.subtitle}>Enter the code sent to {phone}</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="123456"
        keyboardType="number-pad"
        maxLength={6}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2E8",
    padding: 40,
    justifyContent: "center",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30 },
  input: {
    backgroundColor: "#FFF",
    height: 60,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#B58373",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
});
