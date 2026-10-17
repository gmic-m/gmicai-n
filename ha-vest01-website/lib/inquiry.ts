/**
 * Consultation form spec, from the v1.4 sheet's `Consultation Form` tab
 * (8 original fields + 2 optional fields added from Fanyao).
 *
 * Delivery is NOT configured. Intended routing once a verified endpoint
 * exists: recipient fanyao@gmic.ai, reply target one business day, no CRM,
 * lead source `source=ha-vest01` (plus `type=custom` for custom requests).
 * The sheet requires a test lead with captured evidence before publication.
 */
export const INQUIRY_RECIPIENT = "fanyao@gmic.ai"
export const INQUIRY_SOURCE = "ha-vest01"
/** Set to a verified endpoint URL to enable submission. Leave null until tested. */
export const INQUIRY_ENDPOINT: string | null = null

export const REQUEST_TYPES = {
  evaluation: "Field service evaluation",
  custom: "Custom wearable project",
} as const
export type RequestTypeKey = keyof typeof REQUEST_TYPES

type BaseField = { name: string; label: string; required: boolean }
export type InquiryField =
  | (BaseField & { kind: "text" | "email"; autoComplete?: string })
  | (BaseField & { kind: "textarea"; hint?: string })
  | (BaseField & { kind: "select"; options: readonly string[] })

export const INQUIRY_FIELDS: readonly InquiryField[] = [
  { name: "name", label: "Name", required: true, kind: "text", autoComplete: "name" },
  { name: "email", label: "Work email", required: true, kind: "email", autoComplete: "email" },
  { name: "company", label: "Company", required: true, kind: "text", autoComplete: "organization" },
  {
    name: "requestType",
    label: "Request type",
    required: true,
    kind: "select",
    options: [REQUEST_TYPES.evaluation, REQUEST_TYPES.custom],
  },
  { name: "trade", label: "Trade", required: false, kind: "select", options: ["Crawlspace", "HVAC", "Plumbing", "Other"] },
  {
    name: "teamSize",
    label: "Team size",
    required: false,
    kind: "select",
    options: ["1–5 technicians", "6–20 technicians", "21–100 technicians", "100+ technicians"],
  },
  { name: "reportTemplate", label: "Do you have a report template?", required: false, kind: "select", options: ["Yes", "Not yet"] },
  {
    name: "job",
    label: "The job you want to document better",
    required: true,
    kind: "textarea",
    // Sheet note: "One recurring job and what gets lost today"
    hint: "One recurring job and what gets lost today",
  },
  {
    name: "role",
    label: "Your role",
    required: false,
    kind: "select",
    options: ["Owner", "Manager or supervisor", "Field technician", "Other"],
  },
  {
    name: "startTime",
    label: "Desired start time",
    required: false,
    kind: "select",
    options: ["Within 1 month", "1–3 months", "More than 3 months", "Exploring options"],
  },
]
