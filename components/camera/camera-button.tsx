// CameraButton.tsx
import { useLanguage } from "@/text/languaje-context";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export const CameraButton = () => {
  const { t } = useLanguage();

  const [imageUri, setImageUri] = useState<string | null>(null);

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
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
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
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
