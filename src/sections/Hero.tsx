import avatarSrc from "@/assets/avatar.png"
import { Container } from "@/components/layout/Container"
import { ArrowUpRight } from "lucide-react"
import type { Language } from "@/types/language"

const heroContent = {
  fr: {
    role: "Développeur full-stack",
    headline: "Je transforme des idées en produits web",
    highlight: "utiles, performants et bien construits",
    description:
      "J’interviens sur l’ensemble du produit, de la conception de l’interface à la mise en place du backend. Je privilégie des solutions claires, accessibles et faciles à faire évoluer.",
    imageAlt: "Portrait de Cousema Anjary",
    navLabel: "Liens principaux",
    contactLabel: "Me contacter",
  },
  en: {
    role: "Full-stack developer",
    headline: "I turn ideas into web products",
    highlight: "useful, performant and well-built",
    description:
      "I work across the whole product, from interface design to backend implementation. I focus on clear, accessible solutions that are easy to evolve.",
    imageAlt: "Portrait of Cousema Anjary",
    navLabel: "Main links",
    contactLabel: "Contact me",
  },
} satisfies Record<
  Language,
  {
    role: string
    headline: string
    highlight: string
    description: string
    imageAlt: string
    navLabel: string
    contactLabel: string
  }
>

type HeroProps = {
  language: Language
}

export function Hero({ language }: HeroProps) {
  const content = heroContent[language]
  const links = [
    { label: "GitHub", href: "https://github.com/CousemaAnjary/", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
    { label: content.contactLabel, href: "mailto:hello@example.com", external: false },
  ]

  return (
    <section aria-labelledby="hero-title" lang={language}>
      <Container className="pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full shadow-sm min-[360px]:size-16 sm:size-20">
              <img
                src={avatarSrc}
                alt={content.imageAlt}
                className="size-full rounded-full object-cover"
              />
            </div>

            <div>
              <h1
                id="hero-title"
                className="font-heading text-[1.95rem] leading-none font-semibold tracking-[-0.045em] text-foreground min-[360px]:text-[2.12rem] sm:text-[2.35rem]"
              >
                Cousema Anjary
              </h1>

              <p className="mt-1.5 text-sm leading-none text-muted-foreground min-[360px]:text-[15px] sm:mt-2 sm:text-base">
                {content.role}
              </p>
            </div>
          </div>

          <p className="mt-9 text-[1.18rem] leading-8 tracking-tight min-[360px]:text-xl sm:mt-10 sm:text-[1.45rem]">
            {content.headline}{" "}
            <span className="font-heading text-accent-strong italic">
              {content.highlight}
            </span>
          </p>

          <p className="text-justify-soft mt-5 text-[15px] leading-7 text-muted-foreground sm:mt-6 sm:text-base">
            {content.description}
          </p>

          <nav
            className="mt-7 flex flex-wrap gap-x-5 gap-y-3 sm:mt-8 sm:gap-x-6"
            aria-label={content.navLabel}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="group inline-flex items-center gap-1 text-sm font-medium underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {link.label}

                {link.external && (
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                )}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </section>
  )
}
