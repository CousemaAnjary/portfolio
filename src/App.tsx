import { useEffect, useState } from "react"

import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { Hero } from "@/sections/Hero"
import { Projects } from "@/sections/Projects"
import { Skills } from "@/sections/Skills"
import type { Language } from "@/types/language"

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme")

    return savedTheme ? savedTheme === "dark" : true
  })

  const [language, setLanguage] = useState<Language>(() => {
    return localStorage.getItem("language") === "en" ? "en" : "fr"
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem("language", language)
  }, [language])

  return (
    <div className="min-h-dvh">
      <Header
        isDark={isDark}
        language={language}
        onLanguageChange={setLanguage}
        onThemeToggle={() => setIsDark((theme) => !theme)}
      />
      <main>
        <Hero language={language} />
        <Projects language={language} />
        <Skills language={language} />
        {/* Approche masquée pour l'instant */}
        {/* Articles masqués tant qu'il n'y a pas au moins deux articles publiés */}
        {/* Contact masqué pour l'instant */}
      </main>
      <Footer language={language} />
    </div>
  )
}
