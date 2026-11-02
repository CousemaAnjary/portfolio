import { ArrowDown, ArrowUpRight } from "lucide-react"
import { FiGithub, FiLinkedin } from "react-icons/fi"

import avatarSrc from "@/assets/avatar-hero.webp"
import { Container } from "@/components/layout/Container"
import { cn, focusRing } from "@/lib/utils"
import type { Language } from "@/types/language"

const heroContent = {
  fr: {
    role: "Développeur full-stack",
    headline: "Je conçois des applications web et mobiles",
    highlight: "claires, rapides et pensées pour durer.",
    description:
      "J’interviens sur tout le produit, de l’interface au backend. Peu de complexité, beaucoup de soin : des solutions accessibles, simples à faire évoluer.",
    imageAlt: "Portrait de Cousema Anjary",
    primaryCta: "Me contacter",
    secondaryCta: "Voir les projets",
    location: "Antananarivo, Madagascar",
  },
  en: {
    role: "Full-stack developer",
    headline: "I design and build web and mobile apps that are",
    highlight: "clear, fast and built to last.",
    description:
      "I work across the whole product, from interface to backend. Little complexity, a lot of care: accessible solutions that are easy to evolve.",
    imageAlt: "Portrait of Cousema Anjary",
    primaryCta: "Get in touch",
    secondaryCta: "See projects",
    location: "Antananarivo, Madagascar",
  },
} satisfies Record<
  Language,
  {
    role: string
    headline: string
    highlight: string
    description: string
    imageAlt: string
    primaryCta: string
    secondaryCta: string
    location: string
  }
>

const socialLinks = [
  { label: "GitHub", href: "https://github.com/CousemaAnjary/", icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/cousemaanjary/", icon: FiLinkedin },
]

type HeroProps = {
  language: Language
}

export function Hero({ language }: HeroProps) {
  const content = heroContent[language]

  return (
    <section aria-labelledby="hero-title" lang={language}>
      <Container className="pt-10 pb-20 sm:pt-16 sm:pb-28">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex items-center gap-4">
            <img
              src={avatarSrc}
              alt={content.imageAlt}
              width={320}
              height={320}
              decoding="async"
              fetchPriority="high"
              className="size-14 shrink-0 rounded-full object-cover ring-1 ring-border sm:size-16"
            />

            <div>
              <h1
                id="hero-title"
                className="font-heading text-xl leading-tight font-semibold tracking-[-0.03em] sm:text-[1.35rem]"
              >
                ABDILLAH Cousema Anjary
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">{content.role}</p>
            </div>
          </div>

          <p className="mt-10 font-heading text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-balance sm:text-[2.75rem]">
            {content.headline}{" "}
            <span className="text-accent-strong">{content.highlight}</span>
          </p>

          <p className="mt-6 max-w-xl text-[15px] leading-7 text-pretty text-muted-foreground sm:text-base">
            {content.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="mailto:anjary.pro@gmail.com"
              className={cn(
                "group inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-85",
                focusRing,
              )}
            >
              {content.primaryCta}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#projects"
              className={cn(
                "group inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-5 text-sm font-medium transition-colors duration-200 hover:border-foreground/40",
                focusRing,
              )}
            >
              {content.secondaryCta}
              <ArrowDown
                className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <div className="ml-1 flex items-center gap-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground",
                    focusRing,
                  )}
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <p className="mt-10 font-mono text-[11px] tracking-tight text-muted-foreground/80">
            {content.location} · UTC+3
          </p>
        </div>
      </Container>
    </section>
  )
}
