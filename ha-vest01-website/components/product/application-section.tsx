import { cn } from "@/lib/utils"
import type { AssetId } from "@/lib/assets"

export type Application = {
  id: string
  title: string
  challenge: string
  outcome: string
  validate: string
  image: AssetId
}

/**
 * The three parts of a scenario. "Intended outcome" is explicitly marked as
 * an unvalidated pilot objective; "What to validate" is set apart as the
 * pilot question. `plain` uses spacing only (no rules); `stack` adds rules.
 */
export function ScenarioFacts({
  app,
  layout,
  className,
}: {
  app: Application
  layout: "stack" | "plain"
  className?: string
}) {
  const items = [
    { label: "Current challenge", note: null, text: app.challenge, accent: false },
    { label: "Intended outcome", note: "Pilot objective — not yet validated", text: app.outcome, accent: false },
    { label: "What to validate", note: null, text: app.validate, accent: true },
  ]
  return (
    <dl className={cn("grid", layout === "plain" ? "gap-6" : "", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(layout === "stack" && cn("border-t pt-5 pb-7 last:pb-0", item.accent ? "border-gmic" : "border-navy/15"))}
        >
          <dt className={cn("text-[14px] font-semibold", item.accent && layout === "plain" ? "text-[#0052cc]" : "text-navy")}>
            {item.label}
            {item.note && <span className="mt-0.5 block text-[12.5px] font-normal text-slate-text">{item.note}</span>}
          </dt>
          <dd className="mt-2 max-w-[54ch] text-[16px] leading-[1.65] text-charcoal/85">{item.text}</dd>
        </div>
      ))}
    </dl>
  )
}
