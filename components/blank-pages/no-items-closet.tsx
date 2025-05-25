import { useLanguage } from "@/text/languaje-context";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const NoItemsWithButton = () => {
  const { t } = useLanguage();

  return (
    <View className="flex flex-col gap-5 w-full max-w-[340px] items-center">
      <Text className="text-white text-center text-xs">
        {t("CLOSET_EMPTY")}
      </Text>

      <Pressable className="px-4 py-2 rounded-xl bg-white w-[140px]">
        <Text className="text-black text-center text-xs font-semibold ">
          {t("ADD_ITEMS_NOW")}
        </Text>
      </Pressable>
    </View>
  );
};
