import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"

import { Container } from "@/components/layout/Container"
import type { Language } from "@/types/language"

const footerLinks = [
  { label: "Email", href: "mailto:hello@example.com", icon: FiMail, external: false },
  { label: "GitHub", href: "https://github.com/CousemaAnjary/", icon: FiGithub, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: FiLinkedin, external: true },
]

type FooterProps = {
  language: Language
}

export function Footer({ language }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer lang={language}>
      <Container className="pb-7 sm:pb-8">
        <div className="flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-64 font-mono text-[11px] leading-5 tracking-[-0.02em] text-foreground/60 sm:max-w-none">
            © {year} Cousema Anjary.{" "}
            {language === "fr" ? "Tous droits réservés" : "All rights reserved"}
          </p>

          <nav
            className="flex items-center gap-4 text-muted-foreground sm:justify-end"
            aria-label={language === "fr" ? "Liens du pied de page" : "Footer links"}
          >
            {footerLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="transition-colors duration-200 hover:text-accent-strong focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                aria-label={label}
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
