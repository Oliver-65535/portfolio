"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import ruTranslations from "@/data/locales/ru.json"
import enTranslations from "@/data/locales/en.json"

type Language = "ru" | "en"
type Translations = typeof ruTranslations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const translations = {
  ru: ruTranslations,
  en: enTranslations,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ru" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    } else {
      // Определяем язык браузера
      const browserLanguage = navigator.language.toLowerCase()
      const detectedLanguage = browserLanguage.startsWith("ru") ? "ru" : "en"
      setLanguage(detectedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
