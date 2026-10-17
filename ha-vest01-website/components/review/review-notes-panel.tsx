"use client"

import { useState } from "react"

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export type ReviewNoteItem = { section: string; note: string }

/**
 * Internal review notes for the page, collected in one drawer instead of
 * interrupting the layout. Rendered only in review builds (the page passes
 * notes only when REVIEW_BUILD is on).
 */
export function ReviewNotesPanel({ notes }: { notes: ReviewNoteItem[] }) {
  const [open, setOpen] = useState(false)
  if (!notes.length) return null
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="fixed right-5 bottom-5 z-40 inline-flex h-10 items-center gap-2 rounded-full border border-charcoal/15 bg-white/95 px-4 text-[13px] font-medium text-charcoal shadow-[0_8px_24px_-12px_rgba(18,35,61,0.35)] backdrop-blur transition-colors hover:border-charcoal/35">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-gmic" />
        Review notes · {notes.length}
      </SheetTrigger>
      <SheetContent side="right" className="w-[92%] max-w-md gap-0 overflow-y-auto bg-white p-0">
        <div className="border-b border-hairline px-6 py-5">
          <SheetTitle className="text-[17px] font-semibold text-navy">Review notes</SheetTitle>
          <SheetDescription className="mt-1 text-[13px] text-slate-text">
            Internal annotations from the v1.4 sheet. Not page copy; hidden in publication builds.
          </SheetDescription>
        </div>
        <ol className="divide-y divide-hairline">
          {notes.map((n) => (
            <li key={n.section + n.note} className="px-6 py-4">
              <p className="text-[12.5px] font-medium text-slate-text">{n.section}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-charcoal">{n.note}</p>
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  )
}
