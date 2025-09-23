
import React, { createContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationKeys } from '../utils/translations';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

export const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  // Detect browser language or use saved preference
  const getBrowserLanguage = (): Language => {
    const saved = localStorage.getItem('preferred-language') as Language;
    if (saved && (saved === 'it' || saved === 'en')) return saved;
    
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === 'en' ? 'en' : 'it';
  };

  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
