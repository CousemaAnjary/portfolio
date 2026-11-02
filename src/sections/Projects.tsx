import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/common/SectionHeader"
import { Container } from "@/components/layout/Container"
import { projects } from "@/data/projects"
import { cn, focusRing } from "@/lib/utils"
import type { Language } from "@/types/language"

const projectsContent = {
  fr: {
    title: "Projets",
    intro: "Une sélection de produits web, du concept à la mise en ligne, avec une attention portée à la clarté, au rythme et aux détails d’usage.",
    liveLabel: "Voir le projet",
    sourceLabel: "Code source",
  },
  en: {
    title: "Projects",
    intro: "A selection of web products, from concept to launch, with attention to clarity, rhythm and the details of use.",
    liveLabel: "View project",
    sourceLabel: "Source code",
  },
} satisfies Record<
  Language,
  {
    title: string
    intro: string
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
    <section id="projects" aria-labelledby="projects-title" lang={language} className="scroll-mt-20">
      <Container className="pb-20 sm:pb-28">
        <div className="max-w-2xl">
          <SectionHeader id="projects-title" index="01" title={content.title}>
            {content.intro}
          </SectionHeader>

          <ul className="mt-10 border-t border-border sm:mt-14">
            {projects.map((project) => (
              <li key={project.title}>
                <article className="group grid gap-3 border-b border-border py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6 sm:py-10">
                  <div className="flex gap-3 font-mono text-[11px] tracking-tight text-muted-foreground sm:flex-col sm:gap-1 sm:pt-2">
                    <span>{project.year}</span>
                    <span className="text-muted-foreground/60 sm:hidden">·</span>
                    <span>{project.category[language]}</span>
                  </div>

                  <div>
                    <h3 className="font-heading text-[1.6rem] leading-tight font-semibold tracking-[-0.035em] transition-colors duration-200 group-hover:text-accent-strong">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-[15px] leading-7 text-pretty text-muted-foreground">
                      {project.description[language]}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {project.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full border border-border px-2.5 py-0.5 text-[11px] leading-5 text-foreground/75"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>

                    {(project.liveUrl || project.sourceUrl) && (
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                              "group/link inline-flex items-center gap-1 text-sm font-medium underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:decoration-accent-strong",
                              focusRing,
                            )}
                          >
                            {content.liveLabel}
                            <ArrowUpRight
                              className="size-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        )}

                        {project.sourceUrl && (
                          <a
                            href={project.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                              "text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-foreground",
                              focusRing,
                            )}
                          >
                            {content.sourceLabel}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
