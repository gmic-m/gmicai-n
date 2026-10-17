import Link from "next/link"

import { REVIEW_BUILD, REVIEW_LABEL, REVIEW_SUBLABEL } from "@/lib/review"

/** Thin internal-review strip shown above the site header in review builds. */
export function ReviewBanner() {
  if (!REVIEW_BUILD) return null
  return (
    <div className="bg-charcoal text-white">
      <div className="frame flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-[12.5px]">
        <p className="flex flex-wrap items-center gap-x-2">
          <span className="font-semibold tracking-wide">{REVIEW_LABEL}</span>
          <span className="text-white/60">{REVIEW_SUBLABEL}</span>
        </p>
        <Link
          href="/"
          className="text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          Review index
        </Link>
      </div>
    </div>
  )
}
