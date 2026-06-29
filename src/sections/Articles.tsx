import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { featuredArticle } from "@/data/articles"
import type { Language } from "@/types/language"

const articlesContent = {
  fr: {
    title: "Articles",
    intro: "Des notes courtes sur le développement web,",
    highlight: "le design d’interface et les choix techniques",
    readLabel: "Lire bientôt",
    readAriaLabel: "Lire l’article bientôt disponible",
  },
  en: {
    title: "Articles",
    intro: "Short notes about web development,",
    highlight: "interface design and technical decisions",
    readLabel: "Read soon",
    readAriaLabel: "Read the article soon",
  },
} satisfies Record<
  Language,
  {
    title: string
    intro: string
    highlight: string
    readLabel: string
    readAriaLabel: string
  }
>

type ArticlesProps = {
  language: Language
}

export function Articles({ language }: ArticlesProps) {
  const content = articlesContent[language]
  const article = featuredArticle[language]

  return (
    <section id="articles" aria-labelledby="articles-title" lang={language}>
      <Container className="pb-14 sm:pb-20">
        <div className="max-w-2xl">
          <div className="grid gap-2.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
            <h2
              id="articles-title"
              className="font-heading text-2xl leading-none font-semibold tracking-[-0.035em] sm:text-[1.75rem]"
            >
              {content.title}
            </h2>

            <p className="max-w-lg font-paragraph text-[15px] leading-7 text-muted-foreground sm:pt-0.5">
              {content.intro}{" "}
              <span className="font-heading text-accent-strong italic">
                {content.highlight}
              </span>
              .
            </p>
          </div>

          <article className="group mt-8 pb-8 sm:mt-12 sm:pb-10">
            <h3 className="mt-2 max-w-lg font-heading text-[1.55rem] leading-tight font-semibold tracking-[-0.035em] transition-colors duration-200 group-hover:text-accent-strong sm:text-2xl">
              {article.title}
            </h3>

            <p className="text-justify-soft mt-4 max-w-none font-paragraph text-[15px] leading-7 text-muted-foreground">
              {article.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
              <span className="font-mono text-[11px] leading-5 text-foreground/70">
                {article.date}
              </span>

              <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-3">
                <span className="font-mono text-[11px] leading-5 text-foreground/70">
                  {article.readTime}
                </span>

                <a
                  href="#articles"
                  className="group/link inline-flex items-center gap-1 text-sm font-medium underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  aria-label={content.readAriaLabel}
                >
                  {content.readLabel}
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
