import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "./avatar";

interface Props {
  showAvatar?: boolean;
}

export const Header = ({ showAvatar }: Props) => {
  return (
    <View className="flex flex-row items-center justify-between px-2.5">
      <View />

      <Text className="text-white font-bold text-2xl pl-[28px]">
        StyleGenie
      </Text>

      {showAvatar ? <Avatar /> : <View />}
    </View>
  );
};
