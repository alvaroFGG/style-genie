import { useLanguage } from "@/text/languaje-context";
import React from "react";
import { Text, View } from "react-native";
import { CameraButton } from "../camera";

export const NoItemsWithButton = () => {
  const { t } = useLanguage();

  return (
    <View className="flex w-full h-full justify-center items-center mx-auto">
      <Text className="text-white text-center text-sm mb-2.5 max-w-[300px]">
        {t("CLOSET_EMPTY")}
      </Text>

      <CameraButton />
    </View>
  );
};
