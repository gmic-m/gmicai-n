import type { Metadata } from "next"

import { DevicePreview } from "@/components/review/device-preview"
import { ReviewBanner } from "@/components/site/review-banner"
import { PRODUCT_ROUTE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Responsive preview — HA-VEST01 review | GMIC",
  robots: { index: false, follow: false },
}

/** Side-by-side desktop / tablet / mobile frames of the product page. */
export default function PreviewPage() {
  return (
    <>
      <ReviewBanner />
      <main className="flex-1 bg-mist">
        <DevicePreview src={PRODUCT_ROUTE} />
      </main>
    </>
  )
}
