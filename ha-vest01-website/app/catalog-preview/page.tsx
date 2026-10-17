import type { Metadata } from "next"

import { ReviewBanner } from "@/components/site/review-banner"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Container } from "@/components/site/container"
import { Breadcrumb } from "@/components/site/breadcrumb"
import { ProductCatalogCard } from "@/components/product/product-catalog-card"
import { ReviewNote } from "@/components/product/review-note"
import { copy } from "@/lib/copy"
import { GMIC_HOME } from "@/lib/site"

export const metadata: Metadata = {
  title: "Catalog card preview — HA-VEST01 review | GMIC",
  robots: { index: false, follow: false },
}

/**
 * Internal preview of the HA-VEST01 catalog card in a catalog-style grid.
 * The card is NOT published on gmic.ai; the surrounding slots stand in for
 * existing catalog entries and deliberately show no invented products.
 */
export default function CatalogPreviewPage() {
  return (
    <>
      <ReviewBanner />
      <SiteHeader contactLabel={copy("Contact", "Primary CTA")} />
      <main id="main" className="flex-1 bg-mist py-12 lg:py-16">
        <Container>
          <Breadcrumb items={[{ label: "Home", href: GMIC_HOME }, { label: "Products" }]} />
          <h1 className="mt-10 type-section text-navy">Product catalog card — preview</h1>
          <p className="mt-6 max-w-[60ch] type-lede text-slate-text">
            Proposed HA-VEST01 entry for the gmic.ai product catalog. Shown here for review only; it is not published
            on gmic.ai.
          </p>
          <ReviewNote className="mt-6 max-w-2xl">
            v1.4 &ldquo;Navigation &amp; Catalog&rdquo;: card copy &ldquo;HA-VEST01 · In development · AI Vest for Field
            Service Teams&rdquo;; CTA &ldquo;Learn More&rdquo; (avoid &ldquo;Get a Quote&rdquo; for a development
            product). Category — Wearable Recorders or Smart Devices — is TBD with Trigg and the website owner.
            Products-dropdown entry &ldquo;HA-VEST01 · In development&rdquo; pending Trigg.
          </ReviewNote>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCatalogCard
              name="HA-VEST01"
              title={copy("Hero", "H1")}
              status="In development"
              ctaLabel="Learn More"
            />
            {[1, 2].map((n) => (
              <div
                key={n}
                aria-hidden="true"
                className="hidden min-h-[420px] rounded-2xl border border-dashed border-navy/15 sm:flex sm:items-center sm:justify-center"
              >
                <span className="text-[13px] text-slate-text">Existing catalog entry</span>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
