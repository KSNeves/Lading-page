"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

type Language = {
  code: string
  name: string
  flag: string // Emoji de drapeau
}

export function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  // Liste des langues disponibles avec leurs drapeaux
  const languages: Language[] = [
    { code: "fr", name: "FR", flag: "🇫🇷" },
    { code: "fon", name: "FON", flag: "🇧🇯" }, // Drapeau du Bénin pour le Fon
    { code: "en", name: "EN", flag: "🇬🇧" },
    { code: "es", name: "ES", flag: "🇪🇸" },
  ]

  const handleSelect = (code: string) => {
    setLanguage(code as "fr" | "fon" | "en" | "es")
    setOpen(false)
  }

  return (
    <div className="flex items-center space-x-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-1 px-2 py-1 h-8"
          onClick={() => handleSelect(lang.code)}
        >
          <span className="mr-1">{lang.flag}</span>
          <span className="text-xs font-medium">{lang.name}</span>
        </Button>
      ))}
    </div>
  )
}
