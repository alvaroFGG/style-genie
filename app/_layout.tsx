import { Header, Tabs } from "@/components/core";
import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="bg-black flex-1">
      <StatusBar barStyle="light-content" />
      <Header />
      <Tabs />

      <View className="flex-1 justify-center items-center">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
