import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 22, marginBottom: 15 }}>Screen not found</Text>

      <Button
        title="Return to Profile"
        onPress={() => router.replace("/profile")}
      />
    </View>
  );
}
