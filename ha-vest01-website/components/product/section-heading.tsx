import { cn } from "@/lib/utils"

/**
 * Sheet eyebrows are written in capitals ("THE CHALLENGE"). They render as a
 * quiet sentence-case label with a short rule rather than tracked uppercase —
 * a presentation change only; the words are the v1.4 copy.
 */
export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: string
  tone?: "default" | "inverse"
  className?: string
}) {
  const text = children.charAt(0) + children.slice(1).toLowerCase()
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[14px] font-medium",
        tone === "inverse" ? "text-white/60" : "text-slate-text",
        className
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "inverse" ? "bg-white/40" : "bg-slate-text/50")} />
      {text}
    </p>
  )
}

/** Keeps hyphenated compounds ("field-service") on one line in large headings. */
export function keepCompounds(text: string) {
  return text.replace(/(\w)-(\w)/g, "$1‑$2")
}

/** Eyebrow + section heading on the editorial type scale. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  tone = "default",
  className,
  titleClassName,
}: {
  /** Heading id, for the section's aria-labelledby. */
  id?: string
  eyebrow?: string
  title: string
  tone?: "default" | "inverse"
  className?: string
  titleClassName?: string
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "type-section text-balance",
          eyebrow && "mt-6 lg:mt-8",
          tone === "inverse" ? "text-white" : "text-navy",
          titleClassName
        )}
      >
        {keepCompounds(title)}
      </h2>
    </div>
  )
}
