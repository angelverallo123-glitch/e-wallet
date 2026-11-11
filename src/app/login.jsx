import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { loginUser } from "../services/authStorage";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;

    if (!username.trim() || !password) {
      Alert.alert("Missing information", "Enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const user = await loginUser(username, password);

      if (!user) {
        Alert.alert("Login Failed", "Incorrect username or password.");
        return;
      }

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Log in to MY E-WALLET</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging In..." : "Log In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F8F3",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#147F4C",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#667",
    textAlign: "center",
    marginBottom: 35,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D5E5DA",
    borderRadius: 12,
    padding: 15,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#15965D",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  link: {
    color: "#148C50",
    textAlign: "center",
    marginTop: 22,
  },
});
