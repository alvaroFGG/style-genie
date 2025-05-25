import { useLanguage } from "@/text/languaje-context";
import React from "react";
import { Text, View } from "react-native";
import { CameraButton } from "../camera";

export const NoItemsWithButton = () => {
  const { t } = useLanguage();

  return (
    <View className="w-full max-w-[340px] items-center">
      <Text className="text-white text-center text-xs mb-2.5">
        {t("CLOSET_EMPTY")}
      </Text>

      <CameraButton />
    </View>
  );
};
