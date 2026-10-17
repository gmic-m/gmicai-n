"use client"

import { useEffect, useId, useState } from "react"
import { Info } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { REQUEST_TYPE_EVENT } from "@/components/product/cta-link"
import {
  INQUIRY_ENDPOINT,
  INQUIRY_FIELDS,
  INQUIRY_RECIPIENT,
  INQUIRY_SOURCE,
  REQUEST_TYPES,
  type InquiryField,
  type RequestTypeKey,
} from "@/lib/inquiry"
import { cn } from "@/lib/utils"

type Values = Record<string, string>
type Errors = Record<string, string>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: Values): Errors {
  const errors: Errors = {}
  for (const field of INQUIRY_FIELDS) {
    const value = (values[field.name] ?? "").trim()
    if (field.required && !value) errors[field.name] = `${field.label} is required.`
    else if (field.kind === "email" && value && !EMAIL.test(value)) errors[field.name] = "Enter a valid work email address."
  }
  return errors
}

const controlClass =
  "h-11 w-full rounded-md border-input bg-white px-3.5 text-[15px] text-charcoal shadow-none md:text-[15px]"

// Text colours per surface. Inputs stay white on both, so one input style is used throughout.
const TONES = {
  light: {
    label: "text-charcoal",
    muted: "text-slate-text",
    required: "text-gmic",
    error: "text-destructive",
    status: "border-hairline bg-white text-slate-text",
    statusStrong: "text-charcoal",
    statusIcon: "text-navy",
    notice: "border-navy/15 border-l-navy bg-white text-navy",
  },
  // on the navy contact section: light text, about 4.5:1 or better
  dark: {
    label: "text-white",
    muted: "text-white/70",
    required: "text-[#9cc1ff]",
    error: "text-[#fca5a5]",
    status: "border-white/15 bg-white/[0.06] text-white/75",
    statusStrong: "text-white",
    statusIcon: "text-[#9cc1ff]",
    notice: "border-white/20 border-l-[#9cc1ff] bg-white/[0.08] text-white",
  },
} as const
type Tone = keyof typeof TONES

/**
 * Consultation form (v1.4 `Consultation Form` tab). Validates on the client.
 * No delivery is configured: with INQUIRY_ENDPOINT unset, a valid submission
 * shows a "preview only — nothing was sent" notice and never a success state.
 */
export function InquiryForm({
  submitLabel,
  privacyNote,
  showReviewDetails,
  initialEmail = "",
  initialRequestType = "evaluation",
  autoFocus = false,
  tone = "light",
}: {
  submitLabel: string
  privacyNote: string
  showReviewDetails: boolean
  tone?: Tone
  /** Prefilled from the compact first step of the contact section. */
  initialEmail?: string
  initialRequestType?: RequestTypeKey
  /** Move focus to the first empty required field on mount. */
  autoFocus?: boolean
}) {
  const uid = useId()
  const [values, setValues] = useState<Values>({
    requestType: REQUEST_TYPES[initialRequestType],
    ...(initialEmail ? { email: initialEmail } : {}),
  })

  useEffect(() => {
    if (autoFocus) document.getElementById(`${uid}-name`)?.focus({ preventScroll: true })
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [previewNotice, setPreviewNotice] = useState(false)

  // CTAs elsewhere on the page preselect the request type.
  useEffect(() => {
    const onType = (e: Event) => {
      const key = (e as CustomEvent<RequestTypeKey>).detail
      if (key in REQUEST_TYPES) setValues((v) => ({ ...v, requestType: REQUEST_TYPES[key] }))
    }
    window.addEventListener(REQUEST_TYPE_EVENT, onType)
    return () => window.removeEventListener(REQUEST_TYPE_EVENT, onType)
  }, [])

  const set = (name: string, value: string) => {
    const next = { ...values, [name]: value }
    setValues(next)
    setPreviewNotice(false)
    if (attempted) setErrors(validate(next))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAttempted(true)
    const found = validate(values)
    setErrors(found)
    const first = INQUIRY_FIELDS.find((f) => found[f.name])
    if (first) {
      document.getElementById(`${uid}-${first.name}`)?.focus()
      setPreviewNotice(false)
      return
    }
    // No verified endpoint: never simulate delivery.
    if (!INQUIRY_ENDPOINT) setPreviewNotice(true)
  }

  const isCustom = values.requestType === REQUEST_TYPES.custom
  const t = TONES[tone]

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-status`} className="space-y-7">
      <div
        id={`${uid}-status`}
        className={cn("flex gap-3 rounded-[10px] border px-4 py-3.5 text-[13px] leading-relaxed", t.status)}
      >
        <Info aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", t.statusIcon)} />
        <p>
          <span className={cn("font-semibold", t.statusStrong)}>Non-submitting preview.</span> This form validates entries
          but does not send them until a verified delivery endpoint is connected.
          {showReviewDetails && (
            <>
              {" "}
              Intended recipient: {INQUIRY_RECIPIENT}; lead source <code className="text-[12px]">source={INQUIRY_SOURCE}</code>.
            </>
          )}
        </p>
      </div>

      <input type="hidden" name="source" value={INQUIRY_SOURCE} />
      {isCustom && <input type="hidden" name="type" value="custom" />}

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {INQUIRY_FIELDS.map((field) => (
          <FormField
            key={field.name}
            tone={tone}
            field={field}
            id={`${uid}-${field.name}`}
            value={values[field.name] ?? ""}
            error={errors[field.name]}
            onChange={(v) => set(field.name, v)}
          />
        ))}
      </div>

      <p className={cn("text-[13px] leading-relaxed", t.muted)}>{privacyNote}</p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#0066ff] px-7 text-[14.5px] font-medium text-white transition-colors hover:bg-[#0052cc] hover:text-white"
        >
          {submitLabel}
        </button>
        <p className={cn("text-[12.5px]", t.muted)}>
          <span aria-hidden="true">*</span> Required
        </p>
      </div>

      <div role="status" aria-live="polite">
        {previewNotice && (
          <div className={cn("rounded-[10px] border border-l-2 px-4 py-3.5 text-[13.5px] leading-relaxed", t.notice)}>
            <p className="font-semibold">Preview only — your request was not sent.</p>
            <p className="mt-1">
              All entries passed validation, but this review build has no delivery endpoint. Nothing has been
              submitted or stored.
            </p>
          </div>
        )}
      </div>
    </form>
  )
}

function FormField({
  tone,
  field,
  id,
  value,
  error,
  onChange,
}: {
  tone: Tone
  field: InquiryField
  id: string
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const wide = field.kind === "textarea"
  const described = [field.kind === "textarea" && field.hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(" ") || undefined

  const t = TONES[tone]
  return (
    <div className={cn("flex flex-col gap-2", wide && "sm:col-span-2")}>
      <Label htmlFor={id} id={`${id}-label`} className={cn("text-[13.5px] font-medium", t.label)}>
        {field.label}
        {field.required ? (
          <span aria-hidden="true" className={t.required}>
            *
          </span>
        ) : (
          <span className={cn("font-normal", t.muted)}>(optional)</span>
        )}
      </Label>

      {field.kind === "select" ? (
        <Select name={field.name} value={value || null} onValueChange={(v) => onChange((v as string | null) ?? "")}>
          <SelectTrigger
            id={id}
            aria-labelledby={`${id}-label`}
            aria-invalid={error ? true : undefined}
            aria-describedby={described}
            aria-required={field.required || undefined}
            className={cn(controlClass, "w-full pr-3 data-[size=default]:h-11")}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option} value={option} className="py-2 text-[14.5px]">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.kind === "textarea" ? (
        <>
          {field.hint && (
            <p id={hintId} className={cn("-mt-1 text-[12.5px]", t.muted)}>
              {field.hint}
            </p>
          )}
          <Textarea
            id={id}
            name={field.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={5}
            aria-invalid={error ? true : undefined}
            aria-describedby={described}
            aria-required={field.required || undefined}
            className={cn(controlClass, "h-auto min-h-32 py-3 leading-relaxed")}
          />
        </>
      ) : (
        <Input
          id={id}
          name={field.name}
          type={field.kind}
          value={value}
          autoComplete={field.autoComplete}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={described}
          aria-required={field.required || undefined}
          className={controlClass}
        />
      )}

      {error && (
        <p id={errorId} className={cn("text-[12.5px] font-medium", t.error)}>
          {error}
        </p>
      )}
    </div>
  )
}
