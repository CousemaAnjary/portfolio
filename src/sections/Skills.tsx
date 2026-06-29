import { Container } from "@/components/layout/Container"
import { skillGroups } from "@/data/skills"
import type { Language } from "@/types/language"

const skillsContent = {
  fr: {
    title: "Stack technique",
    firstStart: "Une stack courte et maîtrisée, pensée pour construire des interfaces",
    firstHighlight: "sobres, rapides et fiables",
    firstEnd: "sans complexité inutile.",
    secondStart: "Je travaille avec",
    secondHighlight: "React, TypeScript et Tailwind CSS",
    secondEnd:
      "puis Node.js, PostgreSQL et Supabase quand le produit demande une base plus complète.",
  },
  en: {
    title: "Tech stack",
    firstStart: "A short, focused stack designed to build interfaces that are",
    firstHighlight: "clean, fast and reliable",
    firstEnd: "without unnecessary complexity.",
    secondStart: "I work with",
    secondHighlight: "React, TypeScript and Tailwind CSS",
    secondEnd:
      "then Node.js, PostgreSQL and Supabase when the product needs a more complete foundation.",
  },
} satisfies Record<
  Language,
  {
    title: string
    firstStart: string
    firstHighlight: string
    firstEnd: string
    secondStart: string
    secondHighlight: string
    secondEnd: string
  }
>

type SkillsProps = {
  language: Language
}

export function Skills({ language }: SkillsProps) {
  const content = skillsContent[language]

  return (
    <section id="stack" aria-labelledby="stack-title" lang={language}>
      <Container className="pb-14 sm:pb-20">
        <div className="max-w-2xl">
          <div className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
            <h2
              id="stack-title"
              className="font-heading text-2xl leading-none font-semibold tracking-[-0.035em] sm:text-[1.75rem]"
            >
              {content.title}
            </h2>

            <div className="max-w-lg space-y-5 sm:pt-0.5">
              <p className="text-justify-soft font-paragraph text-[15px] leading-7 text-muted-foreground">
                {content.firstStart}{" "}
                <span className="font-heading text-accent-strong italic">
                  {content.firstHighlight}
                </span>{" "}
                {content.firstEnd}
              </p>

              <p className="text-justify-soft font-paragraph text-[15px] leading-7 text-muted-foreground">
                {content.secondStart}{" "}
                <span className="font-heading text-accent-strong italic">
                  {content.secondHighlight}
                </span>, {content.secondEnd}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:mt-11 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
            <div className="hidden sm:block" aria-hidden="true" />

            <dl className="max-w-lg space-y-4">
              {skillGroups[language].map((group) => (
                <div
                  key={group.area}
                  className="grid gap-1.5 sm:grid-cols-[5.75rem_minmax(0,1fr)] sm:gap-5"
                >
                  <dt className="font-mono text-[11px] leading-6 tracking-[-0.02em] text-accent-strong">
                    {group.area}
                  </dt>

                  <dd className="text-sm leading-6 text-foreground/80">
                    {group.items.map((item, index) => (
                      <span key={item}>
                        <span>{item}</span>
                        {index < group.items.length - 1 && (
                          <span className="text-muted-foreground/55"> · </span>
                        )}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}
