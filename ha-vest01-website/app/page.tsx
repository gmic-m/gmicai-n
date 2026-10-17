import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ReviewBanner } from "@/components/site/review-banner"
import { Container } from "@/components/site/container"
import { GmicLogo } from "@/components/site/gmic-logo"
import { COPY_VERSION } from "@/lib/copy"
import { assets } from "@/lib/assets"
import { PRODUCT_ROUTE } from "@/lib/site"

export const metadata: Metadata = {
  title: "HA-VEST01 review build | GMIC",
  robots: { index: false, follow: false },
}

const ROUTES = [
  {
    href: PRODUCT_ROUTE,
    title: "Product page",
    body: "Full HA-VEST01 page. Route mirrors the proposed gmic.ai URL /vest01-ai-field-documentation-vest/ (proposal only).",
  },
  {
    href: "/preview",
    title: "Responsive preview",
    body: "The product page framed at 1440, 768 and 390px.",
  },
  {
    href: "/catalog-preview",
    title: "Catalog card preview",
    body: "Reusable HA-VEST01 product catalog card in a catalog-style grid.",
  },
]

/** Internal review index. Not part of the gmic.ai page. */
export default function ReviewIndex() {
  const temporary = Object.values(assets).filter((a) => a.status !== "approved").length
  return (
    <>
      <ReviewBanner />
      <main className="flex-1 bg-mist py-14 lg:py-20">
        <Container>
        <div className="max-w-[920px]">
          <GmicLogo tone="dark" />
          <h1 className="mt-10 text-[clamp(1.9rem,1.5rem+1.6vw,2.6rem)] leading-tight font-semibold tracking-[-0.02em] text-navy">
            HA-VEST01 product page — review build
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-text">
            Local review build synchronized to Page Copy {COPY_VERSION}. Not approved for publication; nothing here
            is deployed to gmic.ai.
          </p>

          <ul className="mt-10 grid gap-4">
            {ROUTES.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-hairline bg-white px-6 py-5 transition-colors hover:border-navy/25"
                >
                  <span>
                    <span className="block text-[17px] font-semibold text-navy">{route.title}</span>
                    <span className="mt-1 block text-[14.5px] leading-relaxed text-slate-text">{route.body}</span>
                    <code className="mt-2 block text-[12.5px] text-slate-text/80">{route.href}</code>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-slate-text transition-transform group-hover:translate-x-0.5 group-hover:text-gmic"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3">
            {[
              ["Copy source", `Page Copy ${COPY_VERSION} (content/page-copy-v1.4.csv)`],
              ["Temporary images", `${temporary} of ${Object.keys(assets).length} (third-party review photos) — see docs/ASSET_MANIFEST.md`],
              ["Approval", "Not approved — Trigg (docs/REVIEW-CHECKLIST.md)"],
            ].map(([k, v]) => (
              <div key={k} className="bg-white px-5 py-4">
                <dt className="text-[12px] font-semibold tracking-[0.1em] text-slate-text uppercase">{k}</dt>
                <dd className="mt-1.5 text-[14px] leading-relaxed text-charcoal">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        </Container>
      </main>
    </>
  )
}
