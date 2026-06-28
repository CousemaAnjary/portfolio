import type { Language } from "@/types/language"

export type SkillGroup = {
  area: string
  items: string[]
}

export const skillGroups: Record<Language, SkillGroup[]> = {
  fr: [
    {
      area: "Frontend",
      items: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      area: "Backend",
      items: ["Node.js", "PostgreSQL", "Supabase"],
    },
    {
      area: "Produit",
      items: ["UI claire", "Responsive design", "Architecture maintenable"],
    },
  ],
  en: [
    {
      area: "Frontend",
      items: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      area: "Backend",
      items: ["Node.js", "PostgreSQL", "Supabase"],
    },
    {
      area: "Product",
      items: ["Clear UI", "Responsive design", "Maintainable architecture"],
    },
  ],
}
