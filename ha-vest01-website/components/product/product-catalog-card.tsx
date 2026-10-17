import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ProductImage } from "@/components/product/product-image"
import { StatusLabel } from "@/components/product/status-label"
import { PRODUCT_ROUTE } from "@/lib/site"

/**
 * Reusable HA-VEST01 catalog card (v1.4 "Navigation & Catalog": HA-VEST01
 * card, In development, AI Vest for Field Service Teams; CTA "Learn More").
 * Not published on gmic.ai; category (Wearable Recorders / Smart Devices) TBD.
 */
export function ProductCatalogCard({
  name,
  title,
  status,
  ctaLabel,
  href = PRODUCT_ROUTE,
}: {
  name: string
  title: string
  status: string
  ctaLabel: string
  href?: string
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-hairline bg-white transition-[border-color,box-shadow] duration-300 hover:border-navy/20 hover:shadow-[0_18px_44px_-24px_rgba(18,35,61,0.3)] focus-within:border-navy/30">
      <ProductImage
        id="vest"
        aspect="4/3"
        sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw"
        position="50% 40%"
      />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <StatusLabel className="self-start">{status}</StatusLabel>
        <div>
          <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-navy">{name}</h3>
          <p className="mt-1 text-[15px] leading-relaxed text-slate-text">{title}</p>
        </div>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1.5 self-start rounded-sm text-[14.5px] font-medium text-gmic transition-colors after:absolute after:inset-0 hover:text-gmic-dark"
        >
          {ctaLabel}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
