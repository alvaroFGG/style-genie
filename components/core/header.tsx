import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "./avatar";

export const Header = () => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View />

      <Text className="text-white font-bold text-2xl pl-[28px]">
        StyleGenie
      </Text>

      <Avatar />
    </View>
  );
};
