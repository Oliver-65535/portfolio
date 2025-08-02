"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "ru" ? "en" : "ru")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage}>
      <span className="text-xs font-medium">{language.toUpperCase()}</span>
    </Button>
  )
}
