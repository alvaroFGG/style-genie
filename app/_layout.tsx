import { LanguageProvider } from "@/text/languaje-context";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Slot />
    </LanguageProvider>
  );
}
