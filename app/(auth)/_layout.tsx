import { LanguageProvider } from "@/text/languaje-context";
import { Slot } from "expo-router";

export default function AuthLayout() {
  return (
    <LanguageProvider>
      <Slot />
    </LanguageProvider>
  );
}
