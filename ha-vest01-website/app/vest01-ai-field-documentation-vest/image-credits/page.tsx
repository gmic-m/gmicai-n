import type { Metadata } from "next"
import Link from "next/link"

import { ReviewBanner } from "@/components/site/review-banner"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { ImageCredits } from "@/components/product/image-credits"
import { copy } from "@/lib/copy"
import { PRODUCT_ROUTE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Image credits — HA-VEST01 review | GMIC",
  robots: { index: false, follow: false },
}

/**
 * Attribution for the temporary third-party photographs on the HA-VEST01
 * review pages, linked from the footer instead of a section on the page.
 * Full provenance lives in docs/ASSET_MANIFEST.md.
 */
export default function ImageCreditsPage() {
  return (
    <>
      <ReviewBanner />
      <SiteHeader contactLabel={copy("Contact", "Primary CTA")} />
      <main id="main" className="flex-1 bg-white">
        <div className="frame section-y">
          <div className="max-w-[880px]">
            <h1 className="type-section text-navy">Image credits</h1>
            <p className="mt-6 max-w-[68ch] text-[16px] leading-relaxed text-slate-text">
              All photographs on the HA-VEST01 review page are third-party images used for internal layout review only.
              None of them shows HA-VEST01; they will be replaced with approved GMIC imagery before publication.
            </p>
            <div className="mt-10">
              <ImageCredits />
            </div>
            <Link
              href={PRODUCT_ROUTE}
              className="mt-10 inline-block text-[15px] font-medium text-[#0052cc] underline-offset-4 hover:underline"
            >
              Back to HA-VEST01
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
