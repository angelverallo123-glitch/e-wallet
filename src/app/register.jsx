import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { registerUser } from "../services/authStorage";

const initialForm = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
};

const fields = [
  ["firstname", "First name"],
  ["lastname", "Last name"],
  ["username", "Username"],
  ["email", "Email"],
  ["contactNumber", "Contact number"],
  ["password", "Password"],
  ["confirmPassword", "Confirm password"],
];

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  async function handleSignUp() {
    if (loading) return;

    if (Object.values(form).some((value) => !value.trim())) {
      Alert.alert("Missing information", "Please complete all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      Alert.alert("Invalid email", "Enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      Alert.alert("Weak password", "Use at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser(form);

      Alert.alert(
        "Account Created",
        "Registration successful! You can now log in.",
        [
          {
            text: "Go to Login",
            onPress: () => router.replace("/login"),
          },
        ],
      );
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.message || "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up for MY E-WALLET</Text>

      {fields.map(([key, label]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={label}
          value={form[key]}
          onChangeText={(value) => updateField(key, value)}
          autoCapitalize={
            key === "email" || key === "username" ? "none" : "sentences"
          }
          keyboardType={
            key === "email"
              ? "email-address"
              : key === "contactNumber"
                ? "phone-pad"
                : "default"
          }
          secureTextEntry={key.toLowerCase().includes("password")}
          editable={!loading}
        />
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating Account..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: "#F2F8F3",
    padding: 24,
    paddingTop: 65,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#147F4C",
  },
  subtitle: {
    textAlign: "center",
    color: "#667",
    marginBottom: 26,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D5E5DA",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
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
    fontSize: 17,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    color: "#148C50",
    marginTop: 24,
  },
});
