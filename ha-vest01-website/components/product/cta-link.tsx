"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import type { RequestTypeKey } from "@/lib/inquiry"

export const REQUEST_TYPE_EVENT = "havest:request-type"

// Explicit text + hover colours for every variant (nothing inherited); contrast checked for each surface.
const variants = {
  // GMIC blue: the one primary action per view (white on #0066FF, about 5:1)
  primary: "bg-[#0066ff] text-white hover:bg-[#0052cc] hover:text-white",
  // matches the dark pill in the gmic.ai navigation
  dark: "bg-[#1d232d] text-white hover:bg-[#12233d] hover:text-white",
  outline: "border border-[#1d232d]/25 bg-white text-[#1d232d] hover:border-[#1d232d]/55 hover:text-[#1d232d]",
  // white pill for dark surfaces: near-black text, light-grey hover
  light: "bg-white text-[#10151c] hover:bg-[#e6ebf1] hover:text-[#10151c]",
  // outlined pill for dark surfaces
  inverse: "border border-white/40 text-white hover:border-white/80 hover:bg-white/10 hover:text-white",
  text: "px-0 text-[#0066ff] hover:text-[#0052cc]",
  // text link for dark surfaces (light blue, about 7:1 on navy)
  "text-inverse": "px-0 text-[#9cc1ff] hover:text-white",
} as const

const sizes = {
  sm: "h-10 px-[18px] text-[13.5px]",
  md: "h-12 px-6 text-[14.5px]",
} as const

/**
 * Pill CTA modelled on gmic.ai buttons. Pass `requestType` to preselect the
 * inquiry form's request type (the v1.4 sheet routes every CTA to one form).
 */
export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  requestType,
  onNavigate,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  arrow?: boolean
  requestType?: RequestTypeKey
  onNavigate?: () => void
  className?: string
}) {
  const isText = variant.startsWith("text")
  return (
    <Link
      href={href}
      onClick={() => {
        if (requestType) window.dispatchEvent(new CustomEvent(REQUEST_TYPE_EVENT, { detail: requestType }))
        onNavigate?.()
      }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200",
        isText ? "text-[14.5px]" : sizes[size],
        variants[variant],
        className
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  )
}
