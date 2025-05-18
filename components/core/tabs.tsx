import { Link, usePathname } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export const Tabs = () => {
  const pathname = usePathname();

  return (
    <View className="flex flex-row items-center justify-center gap-5 pt-4 ">
      <Link href={"/"}>
        <Text
          className={`font-semibold text-base ${
            pathname === "/" ? "text-white" : "text-gray-500"
          }`}
        >
          Today&apos;s Outfit
        </Text>
      </Link>

      <Link href={"/closet"}>
        <Text
          className={`font-semibold text-base ${
            pathname === "/closet" ? "text-white" : "text-gray-500"
          }`}
        >
          Closet
        </Text>
      </Link>
    </View>
  );
};
