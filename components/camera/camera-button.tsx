import { useCloset } from "@/providers/ClosetProvider";
import { useLanguage } from "@/text/languaje-context";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";

export const CameraButton = () => {
  const { uploadImageAndUpdateCloset } = useCloset();
  const { t } = useLanguage();

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
    <View>
      <Pressable
        onPress={takePhoto}
        className="px-4 py-2 rounded-xl bg-white w-[140px]"
      >
        <Text className="text-black text-center text-xs font-semibold ">
          {t("ADD_ITEMS_NOW")}
        </Text>
      </Pressable>
    </View>
  );
};
