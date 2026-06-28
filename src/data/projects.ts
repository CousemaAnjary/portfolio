import type { Language } from "@/types/language"

type LocalizedText = Record<Language, string>

export type Project = {
  title: string
  description: LocalizedText
  technologies: string[]
  year: string
  category: string
  liveUrl: string
  sourceUrl: string
}

export const projects: Project[] = [
  {
    title: "Kanto",
    description: {
      fr: "Une plateforme éditoriale qui met en valeur les artistes et les créations contemporaines de Madagascar.",
      en: "An editorial platform that highlights artists and contemporary creations from Madagascar.",
    },
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    year: "2026",
    category: "Plateforme culturelle",
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Mora",
    description: {
      fr: "Une application de gestion simple pour aider les indépendants à suivre leurs clients, projets et paiements.",
      en: "A simple management app that helps freelancers track clients, projects, and payments.",
    },
    technologies: ["Next.js", "PostgreSQL", "Shadcn/ui"],
    year: "2025",
    category: "Application web",
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Tany",
    description: {
      fr: "Un site de réservation conçu pour une maison d’hôtes, avec une expérience fluide sur mobile.",
      en: "A booking website designed for a guesthouse, with a smooth mobile experience.",
    },
    technologies: ["React", "Vite", "Supabase"],
    year: "2025",
    category: "Site vitrine",
    liveUrl: "#",
    sourceUrl: "#",
  },
]
