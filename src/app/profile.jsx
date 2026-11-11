import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const menuItems = [
  {
    label: "Personal information",
    icon: "person",
    route: "personal-information",
  },
  { label: "Limits", icon: "speedometer", route: "limits" },
  { label: "Settings", icon: "settings", route: "settings" },
  { label: "Get help", icon: "headset", route: "help" },
  { label: "Terms and conditions", icon: "document-text", route: "terms" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const logout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {                                                                                                   7
        text: "Log out",
        style: "destructive",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 15 },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#30313F" />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.name}>Angel Verallo</Text>
        </View>

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.route}
              style={[
                styles.menuRow,
                index < menuItems.length - 1 && styles.border,
              ]}
              onPress={() => router.push(`/profile-details/${item.route}`)}
            >
              <Ionicons name={item.icon} size={25} color="#30313F" />
              <Text style={styles.menuText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={23} color="#30313F" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { paddingHorizontal: 16, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 55,
    paddingHorizontal: 5,
  },
  title: { fontSize: 21, fontWeight: "bold", color: "#30313F" },
  welcome: { marginBottom: 32 },
  welcomeText: { fontSize: 20, color: "#30313F", marginBottom: 6 },
  name: { fontSize: 25, fontWeight: "bold", color: "#30313F" },
  menuCard: {
    backgroundColor: "#EBF1F2",
    borderRadius: 20,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  menuRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#C5DEE3",
  },
  menuText: { flex: 1, fontSize: 17, color: "#30313F" },
  logout: {
    height: 72,
    backgroundColor: "#EBF1F2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { fontSize: 19, color: "#E90053" },
  version: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 14,
    color: "#666779",
  },
});
