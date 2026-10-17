"use client"

import { useEffect, useId, useState } from "react"
import { ArrowRight } from "lucide-react"

import { InquiryForm } from "@/components/product/inquiry-form"
import { REQUEST_TYPE_EVENT } from "@/components/product/cta-link"
import { REQUEST_TYPES, type RequestTypeKey } from "@/lib/inquiry"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Two-step inquiry: a compact work-email field first, which expands into the
 * full ten-field consultation form (email carried over). Page CTAs that
 * preselect a request type open the full form directly. Nothing is sent —
 * see InquiryForm for the non-submitting preview behaviour.
 */
export function ContactSection({
  submitLabel,
  privacyNote,
  showReviewDetails,
  tone = "light",
}: {
  submitLabel: string
  privacyNote: string
  showReviewDetails: boolean
  tone?: "light" | "dark"
}) {
  const dark = tone === "dark"
  const uid = useId()
  const [expanded, setExpanded] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [requestType, setRequestType] = useState<RequestTypeKey>("evaluation")
  const [focusForm, setFocusForm] = useState(false)

  useEffect(() => {
    const open = (e: Event) => {
      const key = (e as CustomEvent<RequestTypeKey>).detail
      if (key in REQUEST_TYPES) setRequestType(key)
      setExpanded(true)
    }
    window.addEventListener(REQUEST_TYPE_EVENT, open)
    return () => window.removeEventListener(REQUEST_TYPE_EVENT, open)
  }, [])

  if (expanded) {
    return (
      <InquiryForm
        key={requestType}
        submitLabel={submitLabel}
        privacyNote={privacyNote}
        showReviewDetails={showReviewDetails}
        initialEmail={email.trim()}
        initialRequestType={requestType}
        autoFocus={focusForm}
        tone={tone}
      />
    )
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (!EMAIL.test(email.trim())) {
          setError("Enter a valid work email address.")
          document.getElementById(`${uid}-email`)?.focus()
          return
        }
        setError("")
        setFocusForm(true)
        setExpanded(true)
      }}
      className="space-y-4"
    >
      <label htmlFor={`${uid}-email`} className={dark ? "block text-[14px] font-medium text-white" : "block text-[14px] font-medium text-charcoal"}>
        Work email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${uid}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${uid}-email-error` : `${uid}-email-hint`}
          className="h-13 min-w-0 flex-1 rounded-full border border-input bg-white px-5 text-[15.5px] text-charcoal outline-none placeholder:text-slate-text/70 focus-visible:border-gmic focus-visible:ring-3 focus-visible:ring-gmic/20 aria-invalid:border-[#f87171]"
          placeholder="name@company.com"
        />
        <button
          type="submit"
          className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#0066ff] px-7 text-[14.5px] font-medium text-white transition-colors hover:bg-[#0052cc] hover:text-white"
        >
          Continue
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      {error ? (
        <p id={`${uid}-email-error`} className={dark ? "text-[13px] font-medium text-[#fca5a5]" : "text-[13px] font-medium text-destructive"}>
          {error}
        </p>
      ) : (
        <p id={`${uid}-email-hint`} className={dark ? "text-[13px] text-white/70" : "text-[13px] text-slate-text"}>
          Next, a short form about the job you want to document.
        </p>
      )}
    </form>
  )
}
