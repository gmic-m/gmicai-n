import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export type Crumb = { label: string; href?: string }

/** Home / Products / HA-VEST01 — last crumb is the current page. */
export function Breadcrumb({ items, tone = "default" }: { items: Crumb[]; tone?: "default" | "inverse" }) {
  const inverse = tone === "inverse"
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-[13px]", inverse ? "text-white/55" : "text-slate-text")}>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn("rounded-sm transition-colors", inverse ? "hover:text-white" : "hover:text-charcoal")}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={last ? cn("font-medium", inverse ? "text-white/90" : "text-charcoal") : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight aria-hidden="true" className={cn("size-3.5", inverse ? "text-white/35" : "text-slate-text/60")} />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
