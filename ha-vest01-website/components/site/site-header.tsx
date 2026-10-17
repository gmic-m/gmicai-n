"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { GmicLogo } from "@/components/site/gmic-logo"
import { CtaLink } from "@/components/product/cta-link"
import { GMIC_HOME, NAV_ITEMS, PRODUCT_ROUTE, type NavItem } from "@/lib/site"
import { cn } from "@/lib/utils"

type Surface = "dark" | "light"

function NavLink({ item, className, onNavigate }: { item: NavItem; className?: string; onNavigate?: () => void }) {
  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  )
}

/**
 * Adaptive sticky header. Sections declare their tone with `data-surface`
 * ("dark" | "light"); an IntersectionObserver watches a 1px probe line at
 * the header's vertical centre (rebuilt from the header's real height on
 * resize) and switches the logo, links and icons to match whichever section
 * is behind the header. Dark mode adds a subtle scrim so text stays readable
 * over photography.
 *
 * `overlay` lets the first section (the hero) slide underneath the header.
 */
export function SiteHeader({
  contactLabel,
  initialSurface = "light",
  overlay = false,
}: {
  contactLabel: string
  initialSurface?: Surface
  overlay?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const [surface, setSurface] = useState<Surface>(initialSurface)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const header = ref.current
    if (!header) return
    let io: IntersectionObserver | null = null
    const build = () => {
      io?.disconnect()
      const probe = Math.round(header.getBoundingClientRect().height / 2)
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) setSurface((e.target as HTMLElement).dataset.surface === "dark" ? "dark" : "light")
          }
        },
        // a 1px band at the header's centre line, measured from the viewport top (where the header sticks)
        { rootMargin: `-${probe}px 0px -${Math.max(0, window.innerHeight - probe - 1)}px 0px`, threshold: 0 }
      )
      document.querySelectorAll<HTMLElement>("[data-surface]").forEach((el) => io!.observe(el))
    }
    build()
    window.addEventListener("resize", build)
    return () => {
      io?.disconnect()
      window.removeEventListener("resize", build)
    }
  }, [])

  const dark = surface === "dark"

  return (
    <header
      ref={ref}
      data-header-surface={surface}
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md backdrop-saturate-150 transition-[background-color,border-color,color] duration-300",
        overlay && "-mb-16 lg:-mb-[72px]",
        dark ? "border-white/10 bg-[#10151c]/55" : "border-hairline bg-white/88"
      )}
    >
      <div className="frame flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        <Link href={GMIC_HOME} aria-label="GMIC AI home" className="relative shrink-0 rounded-md">
          {/* both logos are rendered and cross-faded, so the swap never flashes */}
          <GmicLogo tone="dark" className={cn("h-6 transition-opacity duration-300 sm:h-7", dark && "opacity-0")} />
          <GmicLogo
            tone="light"
            className={cn("absolute inset-0 h-6 transition-opacity duration-300 sm:h-7", !dark && "opacity-0")}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              className={cn(
                "rounded-sm text-[14px] font-medium transition-colors duration-300",
                dark ? "text-white/80 hover:text-white" : "text-[#1d232d]/80 hover:text-[#1d232d]"
              )}
            />
          ))}
        </nav>

        <div className="hidden md:block">
          <CtaLink href={`${PRODUCT_ROUTE}#contact`} variant={dark ? "light" : "dark"} size="sm">
            {contactLabel}
          </CtaLink>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              "-mr-2 inline-flex size-11 items-center justify-center rounded-full transition-colors duration-300 md:hidden",
              dark ? "text-white hover:bg-white/10" : "text-[#1d232d] hover:bg-mist"
            )}
            aria-label="Open navigation"
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          {/* the open menu is always a solid white panel with dark text, whatever is behind the header */}
          <SheetContent side="right" className="w-[86%] max-w-sm gap-0 bg-white p-0 text-[#1d232d]">
            <div className="flex h-16 items-center border-b border-hairline px-6">
              <GmicLogo tone="dark" className="h-6" />
            </div>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">GMIC site navigation</SheetDescription>
            <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  onNavigate={() => setOpen(false)}
                  className="border-b border-hairline py-4 text-[17px] font-medium text-[#1d232d]"
                />
              ))}
            </nav>
            <div className="mt-auto p-6">
              <CtaLink href={`${PRODUCT_ROUTE}#contact`} variant="dark" className="w-full" onNavigate={() => setOpen(false)}>
                {contactLabel}
              </CtaLink>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
