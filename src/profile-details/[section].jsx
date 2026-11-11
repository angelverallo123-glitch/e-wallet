import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const titles = {
  "personal-information": "Personal information",
  limits: "Limits",
  settings: "Settings",
  help: "Get help",
  terms: "Terms and Conditions",
};

export default function ProfileDetailsScreen() {
  const router = useRouter();
  const { section } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#30313F" />
        </TouchableOpacity>

        <Text style={styles.title}>{titles[section] || "Profile Details"}</Text>

        <View style={{ width: 28 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>{titles[section] || "Unknown section"}</Text>
        <Text style={styles.subtitle}>Navigation is working!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 65,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#30313F",
  },
  card: {
    backgroundColor: "#EBF1F2",
    borderRadius: 20,
    padding: 25,
  },
  text: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#30313F",
  },
  subtitle: {
    marginTop: 10,
    color: "#16A34A",
  },
});
