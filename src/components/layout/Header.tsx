import { Moon, Sun } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import type { Language } from "@/types/language"

type HeaderProps = {
  isDark: boolean
  language: Language
  onLanguageChange: (language: Language) => void
  onThemeToggle: () => void
}

export function Header({
  isDark,
  language,
  onLanguageChange,
  onThemeToggle,
}: HeaderProps) {
  return (
    <header>
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a
          href="/"
          className="group inline-flex items-baseline text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label={language === "fr" ? "Accueil" : "Home"}
        >
          <span className="font-signature text-[1.55rem] leading-none tracking-[-0.06em] transition-colors group-hover:text-accent-strong sm:text-[1.7rem]">
            Anjary
          </span>
          <span className="ml-1 font-sans text-[8px] font-medium tracking-[-0.03em] text-muted-foreground transition-colors group-hover:text-foreground">
            .dev
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onLanguageChange(language === "fr" ? "en" : "fr")}
            className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/35 bg-background/35 px-2.5 text-[10px] leading-none font-semibold tracking-[-0.02em] text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:h-8 sm:px-3 sm:text-[11px] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
            aria-label={
              language === "fr" ? "Changer la langue en anglais" : "Switch language to French"
            }
          >
            <span className="text-[11px] leading-none opacity-75 sm:text-[12px]" aria-hidden="true">
              {language === "fr" ? "🇫🇷" : "🇬🇧"}
            </span>
            <span>{language.toUpperCase()}</span>
          </button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onThemeToggle}
            aria-label={
              isDark
                ? language === "fr"
                  ? "Activer le thème clair"
                  : "Enable light theme"
                : language === "fr"
                  ? "Activer le thème sombre"
                  : "Enable dark theme"
            }
            className="rounded-md text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>
        </div>
      </Container>
    </header>
  )
}
