import type { Language } from "@/types/language"

export type ArticlePreview = {
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
}

export const featuredArticle: Record<Language, ArticlePreview> = {
  fr: {
    category: "Design UI",
    title: "Construire une interface sobre sans la rendre fade",
    excerpt:
      "Une note sur les choix qui donnent du rythme à une interface minimale, de la typographie aux espacements, jusqu’aux détails d’interaction qui rendent l’ensemble plus lisible, plus naturel et plus agréable à parcourir.",
    date: "26 juin 2026",
    readTime: "5 min de lecture",
  },
  en: {
    category: "UI Design",
    title: "Building a clean interface without making it feel flat",
    excerpt:
      "A note on the choices that bring rhythm to a minimal interface, from typography and spacing to interaction details that make the whole experience more readable, natural and pleasant to browse.",
    date: "June 26, 2026",
    readTime: "5 min read",
  },
}
