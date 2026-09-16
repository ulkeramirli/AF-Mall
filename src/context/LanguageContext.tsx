'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'AZ' | 'EN' | 'RU'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'AZ',
  setLang: () => {}
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('AZ')

  useEffect(() => {
    const savedLang = localStorage.getItem('site_lang') as Language
    if (savedLang && ['AZ', 'EN', 'RU'].includes(savedLang)) {
      setLangState(savedLang)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('site_lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
