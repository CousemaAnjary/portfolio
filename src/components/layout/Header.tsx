import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { HeaderBot } from "@/components/layout/HeaderBot"
import { cn, focusRing } from "@/lib/utils"
import type { Language } from "@/types/language"

const navLinks: Record<Language, { label: string; href: string }[]> = {
  fr: [
    { label: "Projets", href: "#projects" },
    { label: "Stack", href: "#stack" },
  ],
  en: [
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
  ],
}

const languages: Language[] = ["fr", "en"]

function useScrolled(threshold = 8) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > threshold)

    update()
    window.addEventListener("scroll", update, { passive: true })

    return () => window.removeEventListener("scroll", update)
  }, [threshold])

  return isScrolled
}

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = ids.join(",")

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    // Section active : la dernière dont le haut a dépassé la ligne de lecture (sous le header)
    let frame = 0

    const update = () => {
      frame = 0
      const readingLine = window.innerHeight * 0.3
      const current = sections.filter((section) => section.getBoundingClientRect().top <= readingLine).at(-1)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      setActiveId(isAtBottom ? (sections.at(-1)?.id ?? null) : (current?.id ?? null))
    }

    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [key])

  return activeId
}

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
  const links = navLinks[language]
  const isScrolled = useScrolled()
  const activeId = useActiveSection(links.map(({ href }) => href.slice(1)))

  return (
    <header className="sticky top-0 z-40 h-16">
      {/* En haut de page : aucun effet. Au scroll : la barre se resserre en pilule flottante. */}
      <div
        className={cn(
          "mx-auto flex items-center justify-between border transition-[translate,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
          isScrolled
            ? "translate-y-4 h-14 max-w-[min(40rem,calc(100%_-_2rem))] rounded-[28px] border-border/80 bg-background/80 pr-1.5 pl-5 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.05),0_16px_40px_-20px_rgb(0_0_0/0.22)] backdrop-blur-xl dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.05),0_16px_40px_-20px_rgb(0_0_0/0.6)] backdrop-saturate-150"
            : "translate-y-0 h-16 max-w-190 rounded-none border-transparent bg-transparent px-4 shadow-none sm:px-6",
        )}
      >
        <a
          href="/"
          className={cn("group inline-flex items-baseline text-foreground", focusRing)}
          aria-label={language === "fr" ? "Accueil" : "Home"}
        >
          <span className="font-signature text-[1.6rem] leading-none tracking-[-0.06em] transition-colors duration-200 group-hover:text-accent-strong">
            Anjary
          </span>
          <span className="ml-1 font-mono text-xs tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
            .dev
          </span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav
            className="hidden items-center sm:flex"
            aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}
          >
            {links.map(({ label, href }) => {
              const isActive = activeId === href.slice(1)

              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "px-3 py-1.5 text-sm transition-colors duration-300",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    focusRing,
                  )}
                >
                  {label}
                </a>
              )
            })}
          </nav>

          <span className="mx-1 hidden h-4 w-px bg-border sm:block" aria-hidden="true" />

          <div
            className="flex items-center font-mono text-xs tracking-tight"
            role="group"
            aria-label={language === "fr" ? "Langue" : "Language"}
          >
            {languages.map((option, index) => (
              <span key={option} className="flex items-center">
                {index > 0 && <span className="text-border" aria-hidden="true">/</span>}
                <button
                  type="button"
                  onClick={() => onLanguageChange(option)}
                  aria-pressed={language === option}
                  lang={option}
                  className={cn(
                    "px-1.5 py-1 uppercase transition-colors duration-200",
                    language === option
                      ? "text-foreground"
                      : "text-muted-foreground/70 hover:text-foreground",
                    focusRing,
                  )}
                >
                  {option}
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
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
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground",
              focusRing,
            )}
          >
            <span className="relative size-4">
              <Sun
                className={cn(
                  "absolute inset-0 size-4 transition-all duration-500 ease-out",
                  isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
                )}
                aria-hidden="true"
              />
              <Moon
                className={cn(
                  "absolute inset-0 size-4 transition-all duration-500 ease-out",
                  isDark ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
                )}
                aria-hidden="true"
              />
            </span>
          </button>

          <HeaderBot language={language} />
        </div>
      </div>
    </header>
  )
}
