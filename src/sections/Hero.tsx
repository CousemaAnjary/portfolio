import avatarSrc from "@/assets/avatar-hero.webp"
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
    contactPrefix: "Retrouvez-moi sur",
    contactOr: "ou",
    contactLabel: "contactez-moi",
  },
  en: {
    role: "Full-stack developer",
    headline: "I turn ideas into web products",
    highlight: "useful, performant and well-built",
    description:
      "I work across the whole product, from interface design to backend implementation. I focus on clear, accessible solutions that are easy to evolve.",
    imageAlt: "Portrait of Cousema Anjary",
    navLabel: "Main links",
    contactPrefix: "Find me on",
    contactOr: "or",
    contactLabel: "contact me",
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
    contactPrefix: string
    contactOr: string
    contactLabel: string
  }
>

type HeroProps = {
  language: Language
}

export function Hero({ language }: HeroProps) {
  const content = heroContent[language]

  return (
    <section aria-labelledby="hero-title" lang={language}>
      <Container className="pt-8 pb-14 sm:pt-12 sm:pb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full shadow-sm min-[360px]:size-16 sm:size-20">
              <img
                src={avatarSrc}
                alt={content.imageAlt}
                width={320}
                height={320}
                decoding="async"
                fetchPriority="high"
                className="size-full rounded-full object-cover"
              />
            </div>

            <div>
              <h1
                id="hero-title"
                className="font-heading text-[1.95rem] leading-none font-semibold tracking-[-0.045em] text-foreground min-[360px]:text-[2.12rem] sm:text-[2.35rem]"
              >
                Cousema <span className="ml-2">Anjary</span>
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
            className="mt-7 text-sm leading-6 text-muted-foreground sm:mt-8"
            aria-label={content.navLabel}
          >
            <p>
              {content.contactPrefix}{" "}
              <a
                href="https://github.com/CousemaAnjary/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                GitHub
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/cousemaanjary/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                LinkedIn
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>{" "}
              {content.contactOr}{" "}
              <a
                href="mailto:anjary.pro@gmail.com"
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {content.contactLabel}
              </a>
            </p>
          </nav>
        </div>
      </Container>
    </section>
  )
}
