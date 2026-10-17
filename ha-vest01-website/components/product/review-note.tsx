import { REVIEW_BUILD } from "@/lib/review"
import { cn } from "@/lib/utils"

/**
 * Internal note for reviewers (open items, sheet annotations). Rendered only
 * in review builds, styled as a dashed annotation so it never reads as page copy.
 */
export function ReviewNote({ children, className }: { children: React.ReactNode; className?: string }) {
  if (!REVIEW_BUILD) return null
  return (
    <aside
      aria-label="Internal review note"
      className={cn(
        "rounded-lg border border-dashed border-slate-text/40 bg-white/60 px-4 py-3 text-[12.5px] leading-relaxed text-slate-text",
        className
      )}
    >
      <span className="mr-1.5 font-semibold text-charcoal">Review note:</span>
      {children}
    </aside>
  )
}
