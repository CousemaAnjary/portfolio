import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { projects } from "@/data/projects"
import type { Language } from "@/types/language"

const projectsContent = {
  fr: {
    title: "Projets",
    intro: "Une sélection de produits web,",
    highlight: "du concept à la mise en ligne",
    suffix: "avec une attention portée à la clarté, au rythme et aux détails d’usage.",
    liveLabel: "Voir le projet",
    sourceLabel: "Code source",
  },
  en: {
    title: "Projects",
    intro: "A selection of web products,",
    highlight: "from concept to launch",
    suffix: "with attention to clarity, rhythm and details.",
    liveLabel: "View project",
    sourceLabel: "Source code",
  },
} satisfies Record<
  Language,
  {
    title: string
    intro: string
    highlight: string
    suffix: string
    liveLabel: string
    sourceLabel: string
  }
>

type ProjectsProps = {
  language: Language
}

export function Projects({ language }: ProjectsProps) {
  const content = projectsContent[language]

  return (
    <section id="projects" aria-labelledby="projects-title" lang={language}>
      <Container className="pb-14 sm:pb-20">
        <div className="max-w-2xl">
          <div className="grid gap-2.5 sm:grid-cols-[8rem_1fr] sm:gap-6">
            <h2
              id="projects-title"
              className="font-heading text-2xl font-semibold tracking-[-0.035em] sm:text-[1.75rem]"
            >
              {content.title}
            </h2>

            <p className="text-justify-soft max-w-lg font-paragraph text-[15px] leading-7 text-muted-foreground sm:pt-0.5">
              {content.intro}{" "}
              <span className="font-heading text-accent-strong italic">
                {content.highlight}
              </span>
              , {content.suffix}
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2.5 border-b border-border py-8 first:pt-0 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6 sm:py-10"
              >
                <span
                  className="self-center font-heading text-[1.85rem] font-semibold tracking-tighter text-accent-strong/45 italic sm:translate-x-4 sm:justify-self-start sm:text-[2.1rem]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-heading text-[1.55rem] leading-tight font-semibold tracking-[-0.035em] transition-colors duration-200 group-hover:text-accent-strong sm:text-2xl">
                    {project.title}
                  </h3>

                  <p className="text-justify-soft mt-3.5 font-paragraph text-[15px] leading-7 text-muted-foreground sm:mt-4">
                    {project.description[language]}
                  </p>

                  <p className="mt-4 font-mono text-[11px] leading-5 text-foreground/70">
                    {project.technologies.join(" · ")}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
                    <a
                      href={project.liveUrl}
                      className="group/link inline-flex items-center gap-1 text-sm font-medium underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {content.liveLabel}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>

                    <a
                      href={project.sourceUrl}
                      className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {content.sourceLabel}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
