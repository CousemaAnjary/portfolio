import type { ReactNode } from "react"

type SectionHeaderProps = {
  id: string
  title: string
  children?: ReactNode
}

export function SectionHeader({ id, title, children }: SectionHeaderProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
      <h2
        id={id}
        className="font-heading text-2xl leading-[1.15] font-semibold tracking-[-0.035em] sm:text-[1.75rem]"
      >
        {title}
      </h2>

      {children && (
        <p className="max-w-lg text-[15px] leading-7 text-pretty text-muted-foreground sm:pt-1">
          {children}
        </p>
      )}
    </div>
  )
}
