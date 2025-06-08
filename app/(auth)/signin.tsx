import { Header } from "@/components/core";
import { DefaultInput } from "@/components/inputs";
import { supabase } from "@/supabase";
import { useLanguage } from "@/text/languaje-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { t } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);

    if (session) {
      router.push("/");
    }
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 h-full w-full px-5 mb-20 justify-center items-center space-y-5">
          <Text className="text-white text-center font-bold text-2xl">
            {t("WELCOME_BACK")}
          </Text>

          <DefaultInput
            placeholder={t("EMAIL")}
            autoCapitalize="none"
            onChangeText={(value) => {
              setEmail(value);
            }}
          />

          <DefaultInput
            placeholder={t("PASSWORD")}
            secureTextEntry
            onChangeText={(value) => {
              setPassword(value);
            }}
          />

          <Pressable
            onPress={signInWithEmail}
            className="px-4 py-3 rounded-full w-full bg-white"
          >
            {!loading && (
              <Text className="text-black text-center text-md font-semibold">
                {t("SIGN_IN")}
              </Text>
            )}

            {loading && (
              <ActivityIndicator
                size="small"
                color="black"
                className="justify-center items-center"
              />
            )}
          </Pressable>

          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="text-gray-500 text-center text-md font-semibold">
              {t("DONT_HAVE_ACCOUNT")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
