import { cn } from "@/lib/utils"

/**
 * Development-status label. Always reads as a status, never as an
 * availability claim. `tone="inverse"` is for the navy section.
 */
export function StatusLabel({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode
  tone?: "default" | "inverse"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12.5px] font-medium",
        tone === "inverse" ? "border-white/20 text-white/85" : "border-gmic/20 bg-ice text-navy",
        className
      )}
    >
      <span aria-hidden="true" className="relative flex size-2">
        <span className={cn("absolute inset-0 rounded-full", tone === "inverse" ? "bg-[#6fa6ff]" : "bg-gmic")} />
      </span>
      {children}
    </span>
  )
}
