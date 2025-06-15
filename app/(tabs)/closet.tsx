import { NoItemsWithButton } from "@/components/blank-pages/no-items-closet";
import { ClosetItemsList } from "@/components/closet";
import { useCloset } from "@/providers/ClosetProvider";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const ClosetScreen = () => {
  const { closet, loading } = useCloset();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  return (
    <View className="flex-1">
      {closet && closet.closet_items?.length === 0 && <NoItemsWithButton />}

      {closet && closet.closet_items && closet.closet_items.length > 0 && (
        <ClosetItemsList closetItems={closet.closet_items} />
      )}
    </View>
  );
};

export default ClosetScreen;
