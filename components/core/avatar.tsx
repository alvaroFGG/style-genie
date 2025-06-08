import { supabase } from "@/supabase";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export const Avatar = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <View className="w-[28px] h-[28px] bg-gray-500 rounded-full" />
    </TouchableOpacity>
  );
};
