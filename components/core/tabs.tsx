import React from "react";
import { Text, View } from "react-native";

export const Tabs = () => {
  return (
    <View className="flex flex-row items-center justify-center gap-5 pt-4 ">
      <Text className="text-white font-semibold">Home</Text>

      <Text className="text-white font-semibold ">Search</Text>
    </View>
  );
};
