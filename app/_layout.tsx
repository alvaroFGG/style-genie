import AuthProvider from "@/providers/AuthProvider";
import { LanguageProvider } from "@/text/languaje-context";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Slot />
      </LanguageProvider>
    </AuthProvider>
  );
}
