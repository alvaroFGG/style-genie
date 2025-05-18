import React from "react";
import { Pressable, Text, View } from "react-native";

export const NoItemsWithButton = () => {
  return (
    <View className="flex flex-col gap-5">
      <Text className="text-white text-center text-xs">
        No outfit for today
      </Text>

      <Pressable className="px-4 py-2 rounded-xl bg-white">
        <Text className="text-black text-center text-xs font-semibold">
          Create outfit
        </Text>
      </Pressable>
    </View>
  );
};
