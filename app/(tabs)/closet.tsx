import { NoItemsWithButton } from "@/components/blank-pages/no-items-closet";
import { ClosetItemsList } from "@/components/closet";
import { useCloset } from "@/providers/ClosetProvider";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const ClosetScreen = () => {
  const { closet, loading } = useCloset();

  return (
    <View className="flex-1">
      {loading && (
        <ActivityIndicator
          size="small"
          color="white"
          className="justify-center items-center"
        />
      )}

      {closet && closet.closet_items?.length === 0 && <NoItemsWithButton />}

      {closet && closet.closet_items && closet.closet_items.length > 0 && (
        <ClosetItemsList closetItems={closet.closet_items} />
      )}
    </View>
  );
};

export default ClosetScreen;
