import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

export default function BalanceCard({
  label = "Available Balance",
  balance,
  account,
}) {
  return (
    <LinearGradient
      colors={["#A8CF22", "#4CAF32", "#079B62"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.balance}>{balance}</Text>
      <Text style={styles.account}>{account}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 28,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  account: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
