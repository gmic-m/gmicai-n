import Image from "next/image"

import { assets } from "@/lib/assets"

/**
 * Illustrative field record — an editorial report layout with fictional,
 * non-sensitive sample data. Field labels are the v1.4 list (passed in); the
 * sample values are written by a technician in this story: measurements are
 * technician readings, items are split into confirmed / to review, and the
 * professional review is still pending. Nothing here implies automatic
 * capture, diagnosis, confidence scores or released software.
 */
export function IntendedRecord({ fields, caption }: { fields: string[]; caption: string }) {
  // v1.4 order: Job / location · Equipment · Observation and permitted image ·
  // Measurements where available · Confirmed / uncertain · Next step · Reviewer sign-off
  const [jobLabel, equipmentLabel, observationLabel, measurementsLabel, statusLabel, nextLabel, reviewLabel] = fields
  const photo = assets.crawlContext

  return (
    <figure className="w-full">
      <div className="mx-auto w-full max-w-[820px] overflow-hidden rounded-[14px] bg-white shadow-[0_1px_2px_rgba(18,35,61,0.05),0_32px_64px_-32px_rgba(18,35,61,0.28)]">
        {/* report header */}
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-hairline px-6 py-6 sm:px-10 sm:py-8">
          <div>
            <p className="text-[12px] font-medium tracking-[0.08em] text-slate-text uppercase">Field record · Sample</p>
            <p className="mt-2 text-[clamp(1.375rem,1.15rem+0.7vw,1.75rem)] leading-tight font-semibold tracking-[-0.02em] text-navy">
              Crawlspace inspection
            </p>
            <p className="mt-1.5 text-[14px] text-slate-text">Record SAMPLE-014 · 12 March 2026 · Fictional data</p>
          </div>
          <span className="rounded-full border border-navy/20 px-3 py-1 text-[12px] font-medium text-navy">Illustrative</span>
        </header>

        <div className="divide-y divide-hairline">
          <Row label={jobLabel}>
            <p className="text-[15.5px] text-charcoal">Single-family residence · north access hatch</p>
            <p className="mt-0.5 text-[13.5px] text-slate-text">Job category: Crawlspace inspection</p>
          </Row>

          <Row label={equipmentLabel}>
            <p className="text-[15.5px] text-charcoal">Sump pump (ref. SP-1) · vapor barrier, north wall</p>
          </Row>

          <Row label={observationLabel}>
            <div className="grid gap-4 sm:grid-cols-[1fr_9.5rem] sm:items-start">
              <p className="text-[15.5px] leading-[1.6] text-charcoal">
                Standing water around the sump pit. Vapor barrier lifted along the north wall for roughly two metres.
              </p>
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-studio">
                  <Image src={photo.src} alt="" fill sizes="200px" className="scale-[1.32] object-cover object-[50%_30%]" />
                </div>
                <p className="mt-1.5 text-[11.5px] leading-snug text-slate-text">Permitted image · third-party sample photo</p>
              </div>
            </div>
          </Row>

          <Row label={measurementsLabel}>
            <p className="text-[15.5px] text-charcoal">Joist moisture, technician meter: 19% · 22% · 18%</p>
            <p className="mt-0.5 text-[13.5px] text-slate-text">Recorded manually at three points</p>
          </Row>

          <Row label={statusLabel}>
            <ul className="space-y-2.5">
              <StatusItem state="confirmed" text="Standing water at sump pit" />
              <StatusItem state="review" text="Source of moisture" />
              <StatusItem state="review" text="Condition of barrier seams" />
            </ul>
          </Row>

          <Row label={nextLabel}>
            <p className="text-[15.5px] text-charcoal">Inspect sump pump operation; quote barrier re-seal. Revisit after repair.</p>
          </Row>

          <Row label={reviewLabel}>
            <p className="flex items-center gap-2.5 text-[15.5px] text-charcoal">
              <span aria-hidden="true" className="size-2 rounded-full bg-[#f59e0b]" />
              Pending professional review
            </p>
            <p className="mt-0.5 text-[13.5px] text-slate-text">Assigned to: field supervisor (sample)</p>
          </Row>
        </div>
      </div>
      <figcaption className="mx-auto mt-5 max-w-[820px] text-[14px] leading-relaxed text-slate-text">{caption}</figcaption>
    </figure>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 px-6 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:px-10 sm:py-6">
      <p className="pt-0.5 text-[13px] font-medium text-slate-text">{label}</p>
      <div>{children}</div>
    </div>
  )
}

function StatusItem({ state, text }: { state: "confirmed" | "review"; text: string }) {
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span
        className={
          state === "confirmed"
            ? "rounded-full bg-[#eaf2ff] px-2.5 py-0.5 text-[12px] font-medium text-[#0052cc]"
            : "rounded-full border border-dashed border-slate-text/50 px-2.5 py-0.5 text-[12px] font-medium text-slate-text"
        }
      >
        {state === "confirmed" ? "Confirmed" : "To review"}
      </span>
      <span className="text-[15px] text-charcoal">{text}</span>
    </li>
  )
}
