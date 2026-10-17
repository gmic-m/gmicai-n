/**
 * Site navigation. Top-level items mirror gmic.ai (Products, Industries,
 * Solutions, Contact). External targets come from the local gmic.ai site
 * source and must be re-verified against the live site before launch
 * (see docs/REVIEW-CHECKLIST.md). Nothing here changes the live website.
 */
export const GMIC_HOME = "https://gmic.ai/"

export const PRODUCT_ROUTE = "/vest01-ai-field-documentation-vest"

export type NavItem = { label: string; href: string; external?: boolean }

/**
 * Footer columns, mirroring the gmic.ai footer (Solutions / Industries /
 * Resources / Company). Every URL was checked live on gmic.ai (HTTP 200,
 * 2026-10-16). Links that 404 on the live site (/custom-devices/odm-oem/,
 * /proof/, /process/) are omitted. The gmic.ai certification pills are
 * deliberately not repeated here: on an in-development product page they
 * could read as HA-VEST01 certifications.
 */
export const FOOTER_COLUMNS: { title: string; links: NavItem[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Edge AI Hardware", href: "https://gmic.ai/solutions/edge-ai-hardware/", external: true },
      { label: "Voice AI Hardware", href: "https://gmic.ai/solutions/voice-ai-hardware/", external: true },
      { label: "AI Wearable Devices", href: "https://gmic.ai/solutions/ai-wearable-devices/", external: true },
      { label: "Embedded AI Hardware", href: "https://gmic.ai/solutions/embedded-ai-hardware/", external: true },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Physical AI Hardware", href: "https://gmic.ai/industries/physical-ai-hardware/", external: true },
      { label: "Healthcare AI", href: "https://gmic.ai/industries/healthcare/", external: true },
      { label: "Enterprise AI", href: "https://gmic.ai/industries/enterprise/", external: true },
      { label: "Field Service AI", href: "https://gmic.ai/industries/field-service/", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "https://gmic.ai/blog/", external: true },
      { label: "Contact", href: "https://gmic.ai/contact/", external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About GMIC", href: "https://gmic.ai/about/", external: true },
      { label: "Book a Demo", href: "https://gmic.ai/book-a-meeting/", external: true },
    ],
  },
]

// Legal pages linked from the gmic.ai footer (verified live, HTTP 200, 2026-10-16).
export const LEGAL_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: "https://gmic.ai/privacy-policy/", external: true },
  { label: "Terms of Service", href: "https://gmic.ai/terms-of-service/", external: true },
]

// Company contact block, as shown in the gmic.ai footer.
export const GMIC_CONTACT = {
  tagline: "Designing and manufacturing the embedded hardware behind the voice-first era.",
  email: "trigg@gmic.ai",
  phone: "+1 (669) 900-0008",
  phoneHref: "tel:+16699000008",
  locations: "Anaheim, CA · Shenzhen, CN",
}

export const NAV_ITEMS: NavItem[] = [
  // Internal review route standing in for the gmic.ai product catalog entry.
  { label: "Products", href: "/catalog-preview" },
  { label: "Industries", href: "https://gmic.ai/industries/field-service/", external: true },
  { label: "Solutions", href: "https://gmic.ai/solutions/ai-scribe-hardware/", external: true },
  { label: "Contact", href: `${PRODUCT_ROUTE}#contact` },
]
