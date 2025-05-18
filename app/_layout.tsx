import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      className="bg-black"
    >
      <Text className="text-white">Root Layout</Text>
    </View>
  );
}
