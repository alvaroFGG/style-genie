import React from "react";
import { TextInput } from "react-native";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export const DefaultInput = (props: Props) => {
  return (
    <TextInput
      className="bg-[#3D3C3C] w-full rounded-2xl p-4 text-white"
      placeholderTextColor="gray"
      {...props}
    />
  );
};
