'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'BN';

interface ThemeLanguageContextType {
  isDarkMode: boolean;
  lang: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export function ThemeLanguageProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState<Language>('EN');

  // Load saved preferences from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('agrilink_theme');
    const savedLang = localStorage.getItem('agrilink_lang') as Language;

    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      localStorage.setItem('agrilink_theme', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  const toggleLanguage = () => {
    setLang((prev) => {
      const nextLang = prev === 'EN' ? 'BN' : 'EN';
      localStorage.setItem('agrilink_lang', nextLang);
      return nextLang;
    });
  };

  return (
    <ThemeLanguageContext.Provider value={{ isDarkMode, lang, toggleTheme, toggleLanguage }}>
      <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
        {children}
      </div>
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
}