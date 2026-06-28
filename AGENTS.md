# AGENTS.md — Portfolio

## Projet
Portfolio personnel avec React, Vite et Tailwind CSS.

## Objectif
Construire un portfolio personnel minimaliste, moderne et professionnel.
- Le projet ne doit pas être généré entièrement d’un coup.
- Chaque section doit être proposée, validée, codée, puis améliorée avant de passer à la suivante.

## UI et design system
Ce projet utilise Tailwind CSS.
- Shadcn/ui est la base principale pour les composants UI simples et propres
- Aceternity UI peut être utilisé uniquement pour les composants plus visuels ou plus complexes

Règles :
- Ne pas transformer tout le site en template Aceternity.
- Ne pas utiliser plusieurs gros effets animés dans la même section.
- Avant d’utiliser un composant Aceternity, proposer l’idée et expliquer pourquoi il est adapté.
- Ajouter seulement les composants nécessaires à la section en cours.
- Garder le design personnel, élégant, lisible et professionnel.
- Si une animation nuit à la lisibilité ou au responsive, préférer une version plus simple.

## Références design
Quand une tâche concerne le design, l’UI, une section visuelle ou l’inspiration graphique, lire d’abord :
- docs/design-references.md

Utiliser ces références pour proposer une direction visuelle professionnelle avant de coder.

Règles :

- Ne pas copier un design complet.
- Utiliser les références pour s’inspirer de la structure, du rythme visuel, des espacements et de l’ambiance.
- Adapter les idées à mon profil et au contenu du portfolio.
- Proposer 2 ou 3 directions avant toute décision visuelle forte.

## Structure préférée
src/
  assets/
  components/
    ui/
    layout/
    common/
  data/
  hooks/
  services/
  sections/
  pages/
  contexts/
  store/
  types/
  lib/
  App.tsx
  main.tsx
  index.css

## Règles de structure
- Ne pas créer toute la structure d’un coup.
- Créer seulement les fichiers nécessaires à la section en cours.
- assets/ contient les images, icônes, polices et ressources statiques.
- components/ui/ contient les petits composants UI réutilisables.
- components/layout/ contient les composants de structure : Header, Footer, Container, Navbar.
- components/common/ contient les composants réutilisables non liés à une section précise.
- sections/ contient les grandes sections de la page : Hero, About, Projects, Skills, Contact.
- data/ contient les données statiques séparées du JSX.
- types/ contient les types TypeScript partagés.
- lib/ contient les fonctions utilitaires.
- hooks/, services/, contexts/ et store/ ne doivent être créés que s’ils deviennent vraiment nécessaires.