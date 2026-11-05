---
name: Anjary.dev
description: Portfolio technique bilingue, net, premium et professionnel
colors:
  light-background: "#f7f7f4"
  light-foreground: "#171816"
  light-surface: "#efefeb"
  light-border: "#dadcd5"
  light-muted-foreground: "#686b64"
  light-accent: "#385a72"
  light-accent-soft: "#e5ebef"
  dark-background: "#0a0a0a"
  dark-foreground: "#f0f1ec"
  dark-surface: "#1d1f1c"
  dark-border: "#30332e"
  dark-muted-foreground: "#a8aca3"
  dark-accent: "#89a9be"
  dark-accent-soft: "#25323a"
  available-light: "#3c7a57"
  available-dark: "#65a77d"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(2rem, 5vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Onest Variable, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Onest Variable, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
  metadata:
    fontFamily: "ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  signature:
    fontFamily: "Nothing You Could Do, cursive"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.06em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  pill: "9999px"
spacing:
  xs: "0.375rem"
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.light-foreground}"
    textColor: "{colors.light-background}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "2.5rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.light-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "2.5rem"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.light-foreground}"
    rounded: "{rounded.pill}"
    padding: "0.125rem 0.625rem"
---

# Design System: Anjary.dev

## Overview

**Creative North Star: "La vitrine technique raffinée"**

L’interface présente le travail comme une vitrine calme et précise : nette, premium et professionnelle, mais jamais froide. La sobriété sert la lecture et la crédibilité technique. L’expression personnelle apparaît dans la signature manuscrite, le portrait, la teinte bleu ardoise et quelques détails de mouvement discrets.

Le système est compact sans être dense. Les grands espaces verticaux donnent du rythme à la page tandis qu’une colonne de lecture étroite maintient l’attention. Les composants sont raffinés et retenus : leur qualité vient des proportions, des états et de la typographie plutôt que d’ornements visibles.

**Key Characteristics:**

- Palette minérale presque neutre, relevée par un bleu ardoise rare.
- Hiérarchie typographique construite avec Bricolage Grotesque, Onest et une signature manuscrite ponctuelle.
- Structure éditoriale étroite, métadonnées monospace et séparateurs fins.
- Profondeur légère réservée aux surfaces flottantes ou interactives.
- Mouvement court, fonctionnel et respectueux de la préférence de réduction des animations.

## Colors

La palette associe des noirs et blancs légèrement chauds à un bleu ardoise mesuré ; les thèmes clair et sombre conservent les mêmes rôles et le même niveau de retenue.

### Primary

- **Bleu ardoise précis** (`light-accent`, `dark-accent`) : accent principal pour les mots clés, indices, liens actifs et états de focus. Il ne devient jamais une surface dominante.

### Neutral

- **Papier minéral** (`light-background`) : fond principal du thème clair.
- **Encre profonde** (`light-foreground`) : texte principal et bouton primaire du thème clair.
- **Noir atelier** (`dark-background`) : fond principal du thème sombre, enrichi d’un grain très discret.
- **Craie douce** (`dark-foreground`) : texte principal du thème sombre.
- **Brume technique** (`light-surface`, `dark-surface`) : surfaces secondaires et composants flottants.
- **Ligne calme** (`light-border`, `dark-border`) : séparateurs, contours et anneaux fins.
- **Texte secondaire** (`light-muted-foreground`, `dark-muted-foreground`) : descriptions et métadonnées non prioritaires.

### Named Rules

**The Rare Accent Rule.** Le bleu ardoise indique une priorité ou une interaction ; sa rareté préserve son autorité.

**The Semantic Green Rule.** Les verts `available-light` et `available-dark` sont réservés aux états de disponibilité confirmés.

## Typography

**Display Font:** Bricolage Grotesque Variable (sans-serif)
**Body Font:** Onest Variable (sans-serif)
**Label/Mono Font:** pile monospace système

**Character:** Bricolage Grotesque donne aux titres une personnalité singulière et premium sans perdre leur netteté ; Onest garde le texte courant précis, ouvert et lisible. Nothing You Could Do n’apparaît que dans la signature Anjary, comme marque humaine concise.

### Hierarchy

- **Display** (500, `clamp(2rem, 5vw, 2.75rem)`, 1.15) : proposition principale du hero, avec un contraste de couleur interne.
- **Headline** (600, `clamp(1.5rem, 3vw, 1.75rem)`, 1) : titres de sections.
- **Title** (600, `1.6rem`, 1.25) : titres de projets et de principes.
- **Body** (400, `0.9375rem`, 1.75) : descriptions sur une largeur de lecture maximale d’environ 40rem.
- **Label** (500, `0.875rem`, 1.25) : appels à l’action et navigation.
- **Metadata** (400, `0.75rem`, suivi serré) : dates, catégories et informations techniques.

### Named Rules

**The Three Voices Rule.** Bricolage Grotesque structure, Onest explique, le monospace annote. La signature manuscrite ne remplace jamais une voix fonctionnelle.

## Layout

La page utilise un conteneur centré d’environ 47.5rem avec 1rem de marge latérale, portée à 1.5rem dès 640px. Le contenu principal reste volontairement limité à environ 42rem afin de produire une lecture éditoriale et une silhouette reconnaissable.

Les sections suivent un rythme vertical généreux : environ 5rem sur mobile et 7rem aux écrans plus larges. À partir de 640px, les en-têtes et les lignes de données utilisent une grille à deux colonnes : un rail de 8rem pour l’indice ou les métadonnées, puis la matière principale. Sur mobile, cette structure se replie en pile sans perdre l’ordre sémantique.

**The Narrow Showcase Rule.** La largeur contenue est une décision d’identité, pas un manque de contenu ; les exceptions doivent servir un artefact visuel concret.

## Elevation & Depth

Le système est légèrement stratifié. La majorité des surfaces restent plates et se distinguent par le ton ou une bordure. Une ombre ambiante douce, associée à un fond translucide et un flou, est réservée au header lorsqu’il devient une pilule flottante. Les micro-interactions peuvent employer de faibles translations, jamais des ombres spectaculaires.

### Shadow Vocabulary

- **Navigation flottante** (`0 16px 40px -20px rgb(0 0 0 / 0.22)` en clair, jusqu’à `0.6` en sombre) : uniquement pour détacher le header après le défilement.
- **Liseré interne** (`inset 0 1px 0 rgb(255 255 255 / 0.05)`) : relief subtil sur les surfaces sombres translucides.

### Named Rules

**The Earned Elevation Rule.** Une surface ne gagne de profondeur que lorsqu’elle flotte réellement au-dessus du contenu ou répond à une interaction.

## Shapes

La géométrie oppose des sections et séparateurs rectilignes à des contrôles entièrement arrondis. Les boutons, tags, portraits et outils compacts utilisent une silhouette pilule ou circulaire ; les composants génériques peuvent employer les rayons de 0.375rem à 1rem. Les bordures restent fines et peu contrastées.

## Components

### Buttons

- **Shape:** pilule complète, hauteur de 2.5rem et padding horizontal de 1.25rem pour les CTA du portfolio.
- **Primary:** inversion premier plan/fond, sans ombre permanente.
- **Secondary:** fond transparent et contour `border`, même gabarit que le primaire.
- **Hover / Focus:** légère baisse d’opacité ou renforcement du contour ; anneau de focus net, sans halo décoratif.

### Chips

- **Style:** petites pilules transparentes avec bordure calme et texte de 11 à 13px.
- **State:** information statique ; ne pas leur donner l’apparence d’un filtre si elles ne sont pas interactives.

### Cards / Containers

- **Corner Style:** les listes de projets ne sont pas enfermées dans des cartes ; elles sont structurées par des séparateurs horizontaux.
- **Background:** fond de page continu.
- **Shadow Strategy:** aucune ombre au repos.
- **Border:** une ligne supérieure et une ligne inférieure par entrée.
- **Internal Padding:** environ 2rem vertical sur mobile et 2.5rem aux écrans plus larges.

### Navigation

Le header est transparent en haut de page puis devient une pilule flottante translucide après le défilement. La navigation utilise des libellés de 13px, un état actif plus contrasté, un sélecteur de langue monospace et des contrôles circulaires. Sur mobile, les ancres de section sont masquées afin de préserver l’espace pour l’identité et les réglages essentiels.

### Section Header

Chaque section associe un titre Bricolage Grotesque dans le rail de 8rem et une introduction secondaire dans la colonne principale. Les métadonnées monospace restent réservées aux informations techniques utiles.

## Do's and Don'ts

### Do:

- **Do** préserver la colonne de lecture étroite, les grands respirations verticales et la grille éditoriale à rail de 8rem.
- **Do** utiliser le bleu ardoise avec parcimonie pour guider la lecture et signaler les interactions.
- **Do** conserver des états de focus visibles et une version sans mouvement via `prefers-reduced-motion`.
- **Do** privilégier les séparateurs, les variations tonales et la typographie avant d’ajouter de nouvelles surfaces.
- **Do** maintenir la parité visuelle et fonctionnelle entre les contenus français et anglais.

### Don't:

- **Don't** transformer les listes en grille uniforme de cartes arrondies de style produit SaaS.
- **Don't** multiplier les dégradés, halos, effets de verre ou grosses animations dans une même section.
- **Don't** employer le bleu ardoise comme remplissage massif sans raison hiérarchique.
- **Don't** ajouter une nouvelle famille typographique sans remplacer explicitement un rôle existant.
- **Don't** présenter les concepts de projets comme des études de cas ou des produits déjà livrés.
