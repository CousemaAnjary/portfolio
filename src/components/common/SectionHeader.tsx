import type { ReactNode } from "react"

type SectionHeaderProps = {
  id: string
  index: string
  title: string
  children?: ReactNode
}

export function SectionHeader({ id, index, title, children }: SectionHeaderProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
      <div>
        <span className="font-mono text-[11px] tracking-tight text-accent-strong">
          {index}
        </span>
        <h2
          id={id}
          className="mt-1 font-heading text-2xl leading-none font-semibold tracking-[-0.035em] sm:text-[1.75rem]"
        >
          {title}
        </h2>
      </div>

      {children && (
        <p className="max-w-lg text-[15px] leading-7 text-pretty text-muted-foreground sm:pt-5">
          {children}
        </p>
      )}
    </div>
  )
}
