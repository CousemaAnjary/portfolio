import { SectionHeader } from "@/components/common/SectionHeader"
import { Container } from "@/components/layout/Container"
import type { Language } from "@/types/language"

type Principle = {
  title: string
  description: string
  focus: string[]
}

const approachContent = {
  fr: {
    title: "Approche",
    intro: "Trois principes qui guident chaque projet, du premier écran à la mise en production.",
    principles: [
      {
        title: "La clarté d’abord",
        description:
          "Une interface doit se comprendre sans mode d’emploi. Je retire tout ce qui ne sert pas l’usage, pour laisser le contenu respirer.",
        focus: ["Hiérarchie", "Lisibilité", "UX"],
      },
      {
        title: "Rapide par défaut",
        description:
          "Chargement léger, rendu fluide, accessibilité soignée : la performance n’est pas une option, elle fait partie du design.",
        focus: ["Performance", "Accessibilité", "Responsive"],
      },
      {
        title: "Pensé pour durer",
        description:
          "Un code lisible et structuré, qu’un autre développeur peut reprendre et faire évoluer sereinement.",
        focus: ["Architecture", "TypeScript", "Maintenance"],
      },
    ],
  },
  en: {
    title: "Approach",
    intro: "Three principles that guide every project, from the first screen to production.",
    principles: [
      {
        title: "Clarity first",
        description:
          "An interface should make sense without a manual. I remove anything that doesn’t serve the user, so the content can breathe.",
        focus: ["Hierarchy", "Readability", "UX"],
      },
      {
        title: "Fast by default",
        description:
          "Light loading, smooth rendering, careful accessibility: performance isn’t optional, it’s part of the design.",
        focus: ["Performance", "Accessibility", "Responsive"],
      },
      {
        title: "Built to last",
        description:
          "Readable, structured code that another developer can pick up and evolve with confidence.",
        focus: ["Architecture", "TypeScript", "Maintenance"],
      },
    ],
  },
} satisfies Record<Language, { title: string; intro: string; principles: Principle[] }>

type ApproachProps = {
  language: Language
}

export function Approach({ language }: ApproachProps) {
  const content = approachContent[language]

  return (
    <section id="approach" aria-labelledby="approach-title" lang={language} className="scroll-mt-20">
      <Container className="pb-20 sm:pb-28">
        <div className="max-w-2xl">
          <SectionHeader id="approach-title" title={content.title}>
            {content.intro}
          </SectionHeader>

          <ol className="mt-10 border-t border-border sm:mt-14">
            {content.principles.map((principle, index) => (
              <li
                key={principle.title}
                className="group grid gap-3 border-b border-border py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6 sm:py-10"
              >
                <span
                  className="font-heading text-[2.5rem] leading-none font-medium tracking-[-0.06em] text-foreground/15 transition-colors duration-300 group-hover:text-accent-strong sm:text-[3.25rem]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="sm:pt-1">
                  <h3 className="font-heading text-[1.6rem] leading-tight font-semibold tracking-[-0.035em]">
                    {principle.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-[15px] leading-7 text-pretty text-muted-foreground">
                    {principle.description}
                  </p>

                  <p className="mt-5 font-mono text-xs leading-5 tracking-tight text-muted-foreground/80">
                    {principle.focus.join("  /  ")}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
