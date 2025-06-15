import { useCloset } from "@/providers/ClosetProvider";
import { ClosetItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, FlatList, Image, TouchableOpacity, View } from "react-native";

interface Props {
  closetItems: ClosetItem[];
}

export const ClosetItemsList = ({ closetItems }: Props) => {
  const { uploadImageAndUpdateCloset } = useCloset();

  const takePhoto = async () => {
    // Solicitar permisos
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permiso denegado",
        "Se necesita permiso para acceder a la cámara"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      await uploadImageAndUpdateCloset(result.assets[0]);
    }
  };

  return (
    <View className="flex-1 mt-5">
      <FlatList
        data={closetItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image_url }}
            className="w-[48%] h-[270px] rounded-lg m-1"
          />
        )}
      />

      <TouchableOpacity
        className="absolute bottom-10 right-5 w-[70px] h-[70px] bg-white rounded-full border border-gray-300 items-center justify-center"
        onPress={async () => {
          await takePhoto();
        }}
      >
        <Ionicons name="camera" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};
