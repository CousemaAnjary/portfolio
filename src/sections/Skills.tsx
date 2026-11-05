import { SectionHeader } from "@/components/common/SectionHeader"
import { Container } from "@/components/layout/Container"
import { skillGroups } from "@/data/skills"
import type { Language } from "@/types/language"

const skillsContent = {
  fr: {
    title: "Stack",
    intro:
      "Une stack courte et maîtrisée, pour construire des interfaces sobres, rapides et fiables sans complexité inutile.",
  },
  en: {
    title: "Stack",
    intro:
      "A short, focused stack to build clean, fast and reliable interfaces without unnecessary complexity.",
  },
} satisfies Record<Language, { title: string; intro: string }>

type SkillsProps = {
  language: Language
}

export function Skills({ language }: SkillsProps) {
  const content = skillsContent[language]

  return (
    <section id="stack" aria-labelledby="stack-title" lang={language} className="scroll-mt-20">
      <Container className="pb-20 sm:pb-28">
        <div className="max-w-2xl">
          <SectionHeader id="stack-title" title={content.title}>
            {content.intro}
          </SectionHeader>

          <dl className="mt-10 border-t border-border sm:mt-14">
            {skillGroups[language].map((group) => (
              <div
                key={group.area}
                className="grid gap-2 border-b border-border py-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="font-mono text-xs leading-7 tracking-tight text-muted-foreground">
                  {group.area}
                </dt>

                <dd className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-2.5 py-0.5 text-[13px] leading-6 text-foreground/85"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
