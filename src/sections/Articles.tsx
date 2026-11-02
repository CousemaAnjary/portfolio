import { Container } from "@/components/layout/Container"
import { featuredArticle } from "@/data/articles"
import type { Language } from "@/types/language"

const articlesContent = {
  fr: {
    title: "Articles",
    intro: "Des notes courtes sur le développement web,",
    highlight: "le design d’interface et les choix techniques",
    readLabel: "Bientôt",
  },
  en: {
    title: "Articles",
    intro: "Short notes about web development,",
    highlight: "interface design and technical decisions",
    readLabel: "Coming soon",
  },
} satisfies Record<
  Language,
  {
    title: string
    intro: string
    highlight: string
    readLabel: string
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

            <p className="max-w-lg text-[15px] leading-7 text-muted-foreground sm:pt-0.5">
              {content.intro}{" "}
              <span className="font-heading text-accent-strong">
                {content.highlight}
              </span>
              .
            </p>
          </div>

          <article className="group mt-8 pb-8 sm:mt-12 sm:pb-10">
            <h3 className="mt-2 font-heading text-[1.55rem] leading-tight font-semibold tracking-[-0.035em] transition-colors duration-200 group-hover:text-accent-strong sm:text-2xl">
              {article.title}
            </h3>

            <p className="text-justify-soft mt-4 max-w-none text-[15px] leading-7 text-muted-foreground">
              {article.excerpt}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
              <span className="font-sans text-[11px] leading-5 text-foreground/70">
                {article.date}
              </span>

              <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-3">
                <span className="font-sans text-[11px] leading-5 text-foreground/70">
                  {article.readTime}
                </span>

                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {content.readLabel}
                </span>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
