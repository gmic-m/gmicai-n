// Server-only: reads the copy file from disk at build time.
import fs from "node:fs"
import path from "node:path"

/**
 * Single source of truth for page copy: the `Page Copy v1.4` tab of
 * "HA-VEST01 Product Page Copy v1.4 — B2B Conversion Review", exported as CSV
 * to content/page-copy-v1.4.csv. To resync, re-export the tab over that file.
 *
 * Lookups are by (Section, Element) exactly as written in the sheet. A missing
 * key throws, so a renamed or deleted row fails the build instead of rendering
 * stale or invented copy.
 */
export const COPY_VERSION = "v1.4"
const COPY_FILE = path.join(process.cwd(), "content", "page-copy-v1.4.csv")

type Row = { section: string; element: string; copy: string; note: string }

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') {
        quoted = false
      } else {
        field += c
      }
    } else if (c === '"') {
      quoted = true
    } else if (c === ",") {
      row.push(field)
      field = ""
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else {
      field += c
    }
  }
  if (field !== "" || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

let cache: Map<string, Row> | null = null

function load(): Map<string, Row> {
  if (cache) return cache
  const [, ...body] = parseCsv(fs.readFileSync(COPY_FILE, "utf8"))
  cache = new Map()
  for (const [section = "", element = "", copy = "", note = ""] of body) {
    if (!section) continue
    cache.set(`${section}::${element}`, { section, element, copy: copy.trim(), note })
  }
  return cache
}

/** Exact English copy for a sheet row. Throws if the row is missing or empty. */
export function copy(section: string, element: string): string {
  const row = load().get(`${section}::${element}`)
  if (!row || !row.copy) {
    throw new Error(`Missing v1.4 copy: ${section} / ${element}`)
  }
  return row.copy
}

/**
 * Splits rows written as "Lead. Rest of sentence." or "Lead — Rest" into a
 * short lead and its explanation, without changing any words.
 */
export function splitLead(text: string, separator: ". " | " — "): { lead: string; rest: string } {
  const at = text.indexOf(separator)
  if (at < 0) return { lead: text, rest: "" }
  const lead = separator === ". " ? text.slice(0, at + 1) : text.slice(0, at)
  return { lead, rest: text.slice(at + separator.length) }
}

/** Splits a "·"-separated list row into its items. */
export function splitList(text: string): string[] {
  return text.split("·").map((s) => s.trim()).filter(Boolean)
}
