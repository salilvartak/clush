import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎉</Text>
      <Text style={styles.title}>Success!</Text>
      <Text style={styles.subtitle}>You are now logged in to Clush.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F2E8",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: "bold" },
  subtitle: { fontSize: 18, color: "#666", marginTop: 10, marginBottom: 40 },
  button: {
    backgroundColor: "#B58373",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
});
