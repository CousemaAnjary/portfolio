import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { Container } from "@/components/layout/Container"
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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)

        if (visible.length > 0) {
          setActiveId(visible[visible.length - 1].target.id)
        } else if (window.scrollY < 200) {
          setActiveId(null)
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
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
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        isScrolled
          ? "border-border/70 bg-background/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a
          href="/"
          className={cn("group inline-flex items-baseline text-foreground", focusRing)}
          aria-label={language === "fr" ? "Accueil" : "Home"}
        >
          <span className="font-signature text-[1.6rem] leading-none tracking-[-0.06em] transition-colors duration-200 group-hover:text-accent-strong">
            Anjary
          </span>
          <span className="ml-1 font-mono text-[9px] tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
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
                    "relative px-3 py-2 text-[13px] transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    focusRing,
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-center bg-foreground transition-transform duration-300 ease-out",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden="true"
                  />
                </a>
              )
            })}
          </nav>

          <span className="mx-1 hidden h-4 w-px bg-border sm:block" aria-hidden="true" />

          <div
            className="flex items-center font-mono text-[11px] tracking-tight"
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
      </Container>
    </header>
  )
}
