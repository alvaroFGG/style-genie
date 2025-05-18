import { Header, Tabs } from "@/components/core";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar barStyle="light-content" />
      <Header />
      <Tabs />
    </SafeAreaView>
  );
}
