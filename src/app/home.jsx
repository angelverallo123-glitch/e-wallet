import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import BalanceCard from "../components/BalanceCard.jsx";
import BottomNav from "../components/BottomNav.jsx";
import QuickActions from "../components/QuickActions.jsx";
import TransactionItem from "../components/TransactionItem.jsx";
import WelcomeHeader from "../components/WelcomeHeader.jsx";
import { colors } from "../constants/theme";

const transactions = [
  {
    key: "1",
    title: "Coffee Shop",
    date: "Today, 10:30 AM",
    amount: "₱150.00",
    type: "expense",
  },
  {
    key: "2",
    title: "Money Received",
    date: "Yesterday",
    amount: "₱1,000.00",
    type: "income",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  // E-Wallet quick actions
  const quickActions = [
    {
      key: "add",
      icon: "＋",
      label: "Add Money",
      onPress: () => router.push("/add-money"),
    },
    {
      key: "send",
      icon: "↗",
      label: "Send",
      onPress: () => {},
    },
    {
      key: "pay",
      icon: "▣",
      label: "Pay",
      onPress: () => {},
    },
    {
      key: "receive",
      icon: "↻",
      label: "Receive",
      onPress: () => {},
    },
  ];

  // Bottom navigation
  const navItems = [
    {
      key: "home",
      label: "Home",
      active: true,
      onPress: () => {},
    },
    {
      key: "transactions",
      label: "Transactions",
      onPress: () => router.push("/transactions"),
    },
    {
      key: "logout",
      label: "Log Out",
      onPress: () => router.replace("/"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <WelcomeHeader
          name="John Doe"
          initials="JD"
          onProfilePress={() => {}}
        />

        {/* Wallet Balance */}
        <BalanceCard balance="₱12,500.00" account="•••• 4582" />

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <QuickActions actions={quickActions} />

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.key}
            title={transaction.title}
            date={transaction.date}
            amount={transaction.amount}
            type={transaction.type}
          />
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav items={navItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 55,
    paddingBottom: 110,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: colors.darkText,
    marginBottom: 15,
  },
});
