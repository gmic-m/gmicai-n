import Link from "next/link"

import { GmicLogo } from "@/components/site/gmic-logo"
import { creditedAssets } from "@/components/product/image-credits"
import { FOOTER_COLUMNS, GMIC_CONTACT, GMIC_HOME, LEGAL_LINKS, PRODUCT_ROUTE } from "@/lib/site"
import { REVIEW_BUILD, REVIEW_LABEL } from "@/lib/review"

/** Footer modelled on the gmic.ai footer: brand + contact block and four link columns. */
export function SiteFooter() {
  return (
    <footer data-surface="dark" className="mt-auto bg-ink text-white">
      <div className="frame grid gap-14 py-16 lg:grid-cols-12 lg:gap-x-12 lg:py-20">
        <div className="lg:col-span-4">
          <Link href={GMIC_HOME} aria-label="GMIC AI home" className="inline-block rounded-md">
            <GmicLogo tone="light" className="h-7" />
          </Link>
          <p className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-white/60">{GMIC_CONTACT.tagline}</p>
          <address className="mt-8 space-y-1.5 text-[14px] leading-relaxed text-white/60 not-italic">
            <a href={`mailto:${GMIC_CONTACT.email}`} className="block transition-colors hover:text-white">
              {GMIC_CONTACT.email}
            </a>
            <a href={GMIC_CONTACT.phoneHref} className="block transition-colors hover:text-white">
              {GMIC_CONTACT.phone}
            </a>
            <span className="block">{GMIC_CONTACT.locations}</span>
          </address>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[13px] font-medium text-white">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="frame flex flex-col gap-3 py-6 text-[12.5px] text-white/45 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© 2026 GMIC.AI · All rights reserved.</p>
            {LEGAL_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
            {/* licence-required attribution for temporary photos; disappears once all images are approved */}
            {creditedAssets.length > 0 && (
              <Link href={`${PRODUCT_ROUTE}/image-credits`} className="transition-colors hover:text-white">
                Image credits
              </Link>
            )}
          </div>
          {REVIEW_BUILD && <p>{REVIEW_LABEL} — not for publication</p>}
        </div>
      </div>
    </footer>
  )
}
