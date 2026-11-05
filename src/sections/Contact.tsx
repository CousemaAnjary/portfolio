import { useEffect, useState } from "react"
import { ArrowUpRight, Check, Copy } from "lucide-react"

import { SectionHeader } from "@/components/common/SectionHeader"
import { Container } from "@/components/layout/Container"
import { cn, focusRing } from "@/lib/utils"
import type { Language } from "@/types/language"

const email = "anjary.pro@gmail.com"

const contactContent = {
  fr: {
    title: "Contact",
    intro: "Une idée, un produit à lancer ou une interface à reprendre ? Écrivez-moi, je réponds personnellement.",
    headline: "Un projet en tête ?",
    highlight: "Construisons-le proprement.",
    emailAriaLabel: "Écrire un email à",
    copyLabel: "Copier",
    copiedLabel: "Copié",
    copyAriaLabel: "Copier l’adresse email",
    statusLabel: "Statut",
    status: "Disponible",
    timeLabel: "Heure locale",
    responseLabel: "Réponse",
    response: "Sous 24 h",
  },
  en: {
    title: "Contact",
    intro: "An idea, a product to launch or an interface to rework? Write to me, I reply personally.",
    headline: "Have a project in mind?",
    highlight: "Let’s build it properly.",
    emailAriaLabel: "Send an email to",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    copyAriaLabel: "Copy email address",
    statusLabel: "Status",
    status: "Available",
    timeLabel: "Local time",
    responseLabel: "Reply",
    response: "Within 24 h",
  },
} satisfies Record<
  Language,
  {
    title: string
    intro: string
    headline: string
    highlight: string
    emailAriaLabel: string
    copyLabel: string
    copiedLabel: string
    copyAriaLabel: string
    statusLabel: string
    status: string
    timeLabel: string
    responseLabel: string
    response: string
  }
>

function formatLocalTime(date: Date, language: Language) {
  return new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Indian/Antananarivo",
  }).format(date)
}

type ContactProps = {
  language: Language
}

export function Contact({ language }: ContactProps) {
  const content = contactContent[language]
  const [now, setNow] = useState(() => new Date())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 30_000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!copied) return

    const timeout = window.setTimeout(() => setCopied(false), 1800)

    return () => window.clearTimeout(timeout)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" lang={language} className="scroll-mt-20">
      <Container className="pb-20 sm:pb-28">
        <div className="max-w-2xl">
          <SectionHeader id="contact-title" title={content.title}>
            {content.intro}
          </SectionHeader>

          <div className="mt-12 sm:mt-16">
            <p className="font-heading text-[2rem] leading-[1.08] font-medium tracking-[-0.045em] text-balance sm:text-[3rem]">
              {content.headline}
              <br />
              <span className="text-muted-foreground">{content.highlight}</span>
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-3 sm:mt-10">
              <a
                href={`mailto:${email}`}
                aria-label={`${content.emailAriaLabel} ${email}`}
                className={cn(
                  "group relative inline-flex items-center gap-2 pb-1 font-heading text-[1.35rem] font-medium tracking-[-0.03em] text-accent-strong min-[400px]:text-2xl sm:text-[2rem]",
                  focusRing,
                )}
              >
                {email}
                <ArrowUpRight
                  className="size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-6"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent-strong/35 transition-transform duration-500 ease-out group-hover:scale-x-100 sm:scale-x-[0.15]"
                  aria-hidden="true"
                />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                aria-label={content.copyAriaLabel}
                className={cn(
                  "mb-1.5 inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-muted-foreground transition-colors duration-200 hover:border-foreground/40 hover:text-foreground",
                  focusRing,
                )}
              >
                {copied ? (
                  <Check className="size-3.5 text-available" aria-hidden="true" />
                ) : (
                  <Copy className="size-3.5" aria-hidden="true" />
                )}
                <span aria-live="polite">{copied ? content.copiedLabel : content.copyLabel}</span>
              </button>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-3 border-t border-border pt-5 sm:mt-16">
            <div>
              <dt className="font-mono text-xs tracking-tight text-muted-foreground">
                {content.statusLabel}
              </dt>
              <dd className="mt-1.5 inline-flex items-center gap-2 text-sm">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-available opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-available" />
                </span>
                {content.status}
              </dd>
            </div>

            <div>
              <dt className="font-mono text-xs tracking-tight text-muted-foreground">
                {content.timeLabel}
              </dt>
              <dd className="mt-1.5 text-sm tabular-nums">
                {formatLocalTime(now, language)}
                <span className="text-muted-foreground"> · UTC+3</span>
              </dd>
            </div>

            <div>
              <dt className="font-mono text-xs tracking-tight text-muted-foreground">
                {content.responseLabel}
              </dt>
              <dd className="mt-1.5 text-sm">{content.response}</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  )
}
