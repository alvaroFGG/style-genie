import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import en from "./en";
import es from "./es";

type Language = "en" | "es";

type Translations = typeof en;

type LanguageContextType = {
  t: (key: keyof Translations) => string;
  language: Language;
  switchLanguage: (lang: Language) => void;
};

const translations: Record<Language, Translations> = {
  en,
  es,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: keyof Translations) => {
    return translations[language][key] || key;
  };

  const switchLanguage = (lang: Language) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ t, language, switchLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
