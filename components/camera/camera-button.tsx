// CameraButton.tsx
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/supabase";
import { useLanguage } from "@/text/languaje-context";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export const CameraButton = () => {
  const { session } = useAuth();
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      // Si el usuario no cancela, establecer la URI de la imagen
      setImageUri(result.assets[0].uri);
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(session?.user.id);

      const filePath = `${session?.user.id}/${new Date().getTime()}.png`;

      const storageRes = await supabase.storage
        .from("clothes")
        .upload(filePath, decode(base64), {
          contentType: "image/png",
        });

      console.log(storageRes);
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
