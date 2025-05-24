import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  index: number;
  setIndex: (i: number) => void;
}

export const Tabs = ({ index, setIndex }: Props) => {
  return (
    <View className="flex flex-row items-center justify-center gap-5 pt-4">
      <TouchableOpacity onPress={() => setIndex(0)}>
        <Text
          className={`font-semibold text-base ${
            index === 0 ? "text-white" : "text-gray-500"
          }`}
        >
          Today&apos;s Outfit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIndex(1)}>
        <Text
          className={`font-semibold text-base ${
            index === 1 ? "text-white" : "text-gray-500"
          }`}
        >
          Closet
        </Text>
      </TouchableOpacity>
    </View>
  );
};
