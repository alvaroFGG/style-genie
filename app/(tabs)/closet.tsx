import { NoItemsWithButton } from "@/components/blank-pages/no-items-closet";
import React from "react";
import { View } from "react-native";

const ClosetScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <NoItemsWithButton />
    </View>
  );
};

export default ClosetScreen;
