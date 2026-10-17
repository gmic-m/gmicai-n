import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { ReviewBanner } from "@/components/site/review-banner"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Eyebrow, SectionHeading, keepCompounds } from "@/components/product/section-heading"
import { StatusLabel } from "@/components/product/status-label"
import { CtaLink } from "@/components/product/cta-link"
import { ProductImage } from "@/components/product/product-image"
import { type Application } from "@/components/product/application-section"
import { ApplicationShowcase } from "@/components/product/application-showcase"
import { GalleryTile } from "@/components/product/gallery-tile"
import { IntendedRecord } from "@/components/product/intended-record"
import { FaqList } from "@/components/product/faq-list"
import { ContactSection } from "@/components/product/contact-section"
import { ReviewNotesPanel, type ReviewNoteItem } from "@/components/review/review-notes-panel"
import { copy, splitLead, splitList } from "@/lib/copy"
import { INSIGHTS } from "@/lib/insights"
import { REVIEW_BUILD } from "@/lib/review"
import type { AssetId } from "@/lib/assets"

export const metadata: Metadata = {
  title: copy("SEO", "Title"),
  description: copy("SEO", "Meta description"),
  openGraph: {
    title: copy("SEO", "Title"),
    description: copy("SEO", "Meta description"),
    type: "website",
  },
  // Not approved for publication — keep out of search indexes.
  robots: { index: false, follow: false },
}

/*
 * Copy outside the v1.4 sheet, requested in the V2 / V2.1 design briefs.
 * Each is recorded in docs/COPY-EDITS.md and needs approval before publication.
 */
const V2_COPY = {
  heroEyebrow: "HA-VEST01 / In development",
  applicationsTitle: "Built for real field work.",
  statement: "A clearer field record starts at the moment of work.",
  statementLabel: "GMIC design principle",
  insightsTitle: "Related insights",
}

// One purposeful photograph per value point (order matches Value 1–3 in v1.4).
const WEARABLE_IMAGES: AssetId[] = ["crawlContext", "gauge", "checklists"]

// Gallery captions describe what each review photograph shows; they make no product claims.
const GALLERY: { id: AssetId; caption: string; className: string; position?: string; sizes: string }[] = [
  {
    id: "vest",
    caption: "Exterior reference — third-party vest, not HA-VEST01",
    className: "aspect-square sm:aspect-[4/5] lg:col-span-7 lg:row-span-2 lg:aspect-auto",
    position: "50% 46%",
    sizes: "(min-width:1024px) 58vw, 100vw",
  },
  { id: "panel", caption: "Hands occupied inside an equipment panel", className: "aspect-[4/3] lg:col-span-5", sizes: "(min-width:1024px) 40vw, 100vw" },
  { id: "kitchen", caption: "Working at an open sink cabinet", className: "aspect-[4/3] lg:col-span-5", position: "50% 55%", sizes: "(min-width:1024px) 40vw, 100vw" },
  {
    id: "condenser",
    caption: "Outdoor equipment on a residential site",
    className: "aspect-[4/3] sm:aspect-[21/9] lg:col-span-12",
    position: "50% 60%",
    sizes: "100vw",
  },
]

const REVIEW_NOTES: ReviewNoteItem[] = [
  { section: "Imagery", note: "Every photograph is third-party review imagery (licensed; credits on the Image credits page linked in the footer). The vest is a third-party garment, not HA-VEST01 — replace with approved Huang engineer images before publication." },
  { section: "Hero", note: "Body states intent, not current performance — pending R&D review. Eyebrow “HA-VEST01 / In development” is V2-brief wording; the v1.4 status line appears in the Development status section. Breadcrumb removed (V2.1)." },
  { section: "The challenge / Why wearable", note: "v1.4 Challenge and Why Wearable copy kept in full, now as two sections. Value hypothesis; no proven hands-free claim. “Keep task context together” requires R&D validation." },
  { section: "Applications", note: "Heading “Built for real field work.” replaces v1.4 “Start with a specific field-service job.” The shared caution sentence was removed from this section (V2.1); professional responsibility for diagnosis and final review remains stated in FAQ 2. v1.4 has no per-scenario introduction, so none was added." },
  { section: "Design statement", note: "New line from the V2 brief, presented as a GMIC design principle — not a customer quote or a proven outcome. Needs Trigg approval." },
  { section: "Intended record", note: "Sample values are fictional and clearly labelled; field labels are the v1.4 list. The v1.4 caption is kept (“…Not a representation of released software.”)." },
  { section: "Pilot evaluation", note: "Steps keep the v1.4 wording (step 3 was deliberately corrected in v1.4); shorter V2 step labels were not applied." },
  { section: "Common questions", note: "v1.4 has no FAQ heading; the H2 repeats the eyebrow wording. The records-ownership answer needs R&D/legal approval." },
  { section: "Contact", note: "Two-step form: work email first, then the ten v1.4 fields. Routing to Fanyao untested; privacy notice and Privacy Policy link next to the form still needed." },
]

function application(id: string, key: string, image: Application["image"]): Application {
  return {
    id,
    image,
    title: copy("Applications", `${key} / Title`),
    challenge: copy("Applications", `${key} / Challenge`),
    outcome: copy("Applications", `${key} / Intended outcome`),
    validate: copy("Applications", `${key} / What to validate`),
  }
}

export default function HaVest01Page() {
  const status = copy("Hero", "Status")
  const apps = [
    application("crawlspace", "Crawlspace", "crawlspace"),
    application("hvac", "HVAC", "hvac"),
    application("plumbing", "Plumbing", "plumbing"),
  ]
  const challengeCards = ["Card 1", "Card 2", "Card 3"].map((k) => splitLead(copy("Challenge", k), ". "))
  const wearableValues = ["Value 1", "Value 2", "Value 3"].map((k) => splitLead(copy("Wearable", k), " — "))
  const steps = ["Step 1", "Step 2", "Step 3"].map((k) => splitLead(copy("Evaluation", k), ". "))
  const faqs = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"].map((k) => {
    const { lead, rest } = splitLead(copy("FAQ", k), " — ")
    return { question: lead, answer: rest }
  })
  const roles = splitList(copy("Audience", "Roles"))
  const recordFields = splitList(copy("Record", "Illustrative fields"))
  const audienceLabel = copy("Audience", "Eyebrow")

  return (
    <>
      <ReviewBanner />
      <SiteHeader contactLabel={copy("Contact", "Primary CTA")} initialSurface="dark" overlay />

      <main id="main" className="flex-1">
        {/* ─── Hero: deep navy, text 45% / full-bleed image 55% ─── */}
        <section
          data-surface="dark"
          aria-labelledby="hero-title"
          className="relative flex flex-col overflow-hidden bg-ink bg-[radial-gradient(60%_75%_at_18%_45%,#1a2537_0%,#131b28_45%,#10151c_75%)] text-white lg:block"
        >
          {/* image: anchored to the right edge, full hero height on desktop */}
          <div className="relative order-last aspect-square w-full sm:aspect-[5/4] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[55%]">
            <ProductImage
              id="vest"
              aspect={false}
              priority
              position="50% 36%"
              sizes="(min-width:1024px) 55vw, 100vw"
              className="absolute inset-0 bg-[#20262e] [&_img]:brightness-[.9] [&_img]:contrast-[1.06] [&_img]:saturate-[.8]"
              disclosureClassName="bottom-5 left-5 sm:left-8 lg:bottom-8 lg:left-10"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(16,21,28,0.5)_0%,rgba(16,21,28,0)_30%)] lg:bg-[linear-gradient(90deg,rgba(16,21,28,1)_0%,rgba(16,21,28,0.55)_14%,rgba(16,21,28,0)_38%),linear-gradient(0deg,rgba(16,21,28,0.45)_0%,rgba(16,21,28,0)_26%)]"
            />
          </div>

          <div className="frame relative grid lg:min-h-[max(720px,calc(100svh-34px))] lg:grid-cols-12 lg:items-center">
            <div className="pt-28 pb-14 lg:col-span-5 lg:py-32">
              <p className="text-[12.5px] font-medium tracking-[0.16em] text-white/65 uppercase">{V2_COPY.heroEyebrow}</p>
              <h1
                id="hero-title"
                className="mt-6 max-w-[13ch] text-[clamp(40px,4.5vw,72px)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-white"
              >
                {copy("Hero", "H1")}
              </h1>
              <p className="mt-7 max-w-[28ch] text-[clamp(1.1875rem,1rem+0.55vw,1.5rem)] leading-[1.35] tracking-[-0.012em] text-white/90">
                {copy("Hero", "Tagline")}
              </p>
              <p className="mt-5 max-w-[50ch] type-lede text-pretty text-white/70">{copy("Hero", "Body")}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <CtaLink href="#contact" variant="light" requestType="evaluation" arrow>
                  {copy("Hero", "Primary CTA")}
                </CtaLink>
                <CtaLink href="#applications" variant="inverse">
                  {copy("Hero", "Secondary CTA")}
                </CtaLink>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The challenge ─── */}
        <section data-surface="light" aria-labelledby="challenge-title" className="section-y bg-white">
          <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-x-12">
            <SectionHeading
              id="challenge-title"
              className="lg:col-span-6"
              eyebrow={copy("Challenge", "Eyebrow")}
              title={copy("Challenge", "H2")}
              titleClassName="max-w-[17ch]"
            />
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-14">
              <p className="max-w-[60ch] type-lede text-slate-text">{copy("Challenge", "Body")}</p>
              <p className="mt-10 text-[14px] font-medium text-navy">{copy("Challenge", "Introduction to cards")}</p>
              <ul className="mt-4 space-y-3">
                {challengeCards.map((c) => (
                  <li key={c.lead} className="text-[16px] leading-[1.6] text-slate-text">
                    <span className="font-semibold text-navy">{c.lead}</span> {c.rest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── Why wearable: three image-led points ─── */}
        <section data-surface="light" aria-labelledby="wearable-title" className="section-y bg-cloud">
          <div className="frame">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-12">
              <SectionHeading
                id="wearable-title"
                className="lg:col-span-6"
                eyebrow={copy("Wearable", "Eyebrow")}
                title={copy("Wearable", "H2")}
                titleClassName="max-w-[16ch]"
              />
              <p className="max-w-[60ch] type-lede text-charcoal/85 lg:col-span-5 lg:col-start-8">{copy("Wearable", "Body")}</p>
            </div>
            <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-20 lg:gap-10">
              {wearableValues.map((v, i) => (
                <article key={v.lead}>
                  <ProductImage
                    id={WEARABLE_IMAGES[i]}
                    aspect="4/3"
                    position={i === 0 ? "50% 30%" : undefined}
                    sizes="(min-width:768px) 32vw, 100vw"
                    // the crawlspace source has skewed white corners; a slight zoom keeps them out of frame
                    className={i === 0 ? "rounded-[12px] [&_img]:scale-[1.32]" : "rounded-[12px]"}
                  />
                  <p className="mt-7 text-[clamp(1.75rem,1.45rem+0.9vw,2.375rem)] leading-none font-bold tracking-[-0.03em] text-navy tabular-nums">
                    0{i + 1}
                  </p>
                  <h3 className="mt-4 text-[clamp(1.25rem,1.08rem+0.5vw,1.5rem)] leading-snug font-semibold tracking-[-0.015em] text-navy">
                    {v.lead}
                  </h3>
                  <p className="mt-2.5 max-w-[42ch] text-[16px] leading-[1.65] text-slate-text">{v.rest}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Applications: one image + three-item accordion ─── */}
        <section data-surface="light" id="applications" aria-labelledby="applications-title" className="section-y bg-white">
          <div className="frame">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-12">
              <SectionHeading
                id="applications-title"
                className="lg:col-span-7"
                eyebrow={copy("Applications", "Eyebrow")}
                title={V2_COPY.applicationsTitle}
                titleClassName="max-w-[14ch]"
              />
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="max-w-[52ch] type-lede text-slate-text">{copy("Applications", "Intro")}</p>
                <p className="mt-6 text-[14.5px] leading-relaxed text-slate-text">
                  <span className="font-semibold text-navy">{audienceLabel.charAt(0) + audienceLabel.slice(1).toLowerCase()}</span>
                  <span aria-hidden="true"> — </span>
                  <span className="sr-only">: </span>
                  {roles.join(" · ")}
                </p>
              </div>
            </div>
            <div className="mt-14 lg:mt-20">
              <ApplicationShowcase apps={apps} label="Field-service applications" />
            </div>
          </div>
        </section>

        {/* ─── Photography: captions inside the frames ─── */}
        <section data-surface="light" aria-labelledby="gallery-title" className="section-y bg-offwhite">
          <div className="frame">
            <h2 id="gallery-title" className="max-w-[20ch] type-section text-balance text-navy">
              {copy("Hero", "Tagline")}
            </h2>
            <div className="mt-14 grid gap-4 sm:gap-6 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(300px,1fr))]">
              {GALLERY.map((g) => (
                <GalleryTile key={g.id} id={g.id} caption={g.caption} sizes={g.sizes} position={g.position} className={g.className} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Design statement: navy with soft edges ─── */}
        <section
          data-surface="dark"
          aria-labelledby="statement-title"
          className="bg-[linear-gradient(180deg,#fafafa_0%,#f3f5f8_2.5%,#e2e7ee_5%,#c4ccd8_7.5%,#97a3b4_10%,#64728a_12.5%,#3a4a63_15%,#1f304a_17.5%,#12233d_20%,#12233d_80%,#1f304a_82.5%,#3a4a63_85%,#64728a_87.5%,#97a3b4_90%,#c4ccd8_92.5%,#e2e7ee_95%,#eff2f6_97.5%,#f4f6f8_100%)] py-[clamp(13rem,8rem+10vw,21rem)] text-white"
        >
          <div className="frame text-center">
            <h2
              id="statement-title"
              className="mx-auto max-w-[1050px] text-[clamp(34px,3.8vw,60px)] leading-[1.12] font-semibold tracking-[-0.03em] text-balance text-white"
            >
              {V2_COPY.statement}
            </h2>
            <p className="mt-8 text-[14px] text-white/55">{V2_COPY.statementLabel}</p>
          </div>
        </section>

        {/* ─── Intended record ─── */}
        <section data-surface="light" aria-labelledby="record-title" className="section-y bg-cloud">
          <div className="frame grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-12">
            <div className="lg:sticky lg:top-32 lg:col-span-4">
              <SectionHeading id="record-title" eyebrow={copy("Record", "Eyebrow")} title={copy("Record", "H2")} titleClassName="max-w-[14ch]" />
              <p className="mt-8 max-w-[44ch] type-lede text-slate-text">{copy("Record", "Intro")}</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <IntendedRecord fields={recordFields} caption={copy("Record", "Caption")} />
            </div>
          </div>
        </section>

        {/* ─── Development status → pilot evaluation (one narrative) ─── */}
        <section data-surface="light" aria-labelledby="status-title" className="section-y bg-white">
          <div className="frame">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-12">
              <SectionHeading
                id="status-title"
                className="lg:col-span-6"
                eyebrow={copy("Stage", "Eyebrow")}
                title={copy("Stage", "H2")}
                titleClassName="max-w-[16ch]"
              />
              <div className="lg:col-span-5 lg:col-start-8">
                <StatusLabel>{status}</StatusLabel>
                <p className="mt-6 max-w-[56ch] type-lede text-slate-text">{copy("Stage", "Body")}</p>
              </div>
            </div>

            <div className="mt-24 lg:mt-32">
              <Eyebrow>{copy("Evaluation", "Eyebrow")}</Eyebrow>
              <h3 className="mt-6 max-w-[22ch] type-subhead text-balance text-navy">{keepCompounds(copy("Evaluation", "H2"))}</h3>
              <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
                {steps.map((s, i) => (
                  <li key={s.lead} className="rounded-[16px] bg-cloud p-7 sm:p-8">
                    <p className="text-[clamp(1.5rem,1.3rem+0.6vw,2rem)] leading-none font-bold tracking-[-0.03em] text-navy tabular-nums">
                      0{i + 1}
                    </p>
                    <p className="mt-6 text-[19px] leading-snug font-semibold tracking-[-0.012em] text-navy">{s.lead}</p>
                    <p className="mt-2.5 text-[16px] leading-[1.65] text-slate-text">{s.rest}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-14 flex justify-center">
                <CtaLink href="#contact" requestType="evaluation" arrow>
                  {copy("Evaluation", "CTA")}
                </CtaLink>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section data-surface="light" aria-labelledby="faq-title" className="section-y bg-white pt-0">
          <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-x-12">
            <SectionHeading id="faq-title" className="lg:col-span-4" eyebrow={copy("FAQ", "Eyebrow")} title="Common questions" />
            <div className="max-w-[880px] lg:col-span-7 lg:col-start-6">
              <FaqList items={faqs} />
            </div>
          </div>
        </section>

        {/* ─── Related insights: image-first cards (real gmic.ai posts) ─── */}
        <section data-surface="light" aria-labelledby="insights-title" className="section-y bg-cloud">
          <div className="frame">
            <h2 id="insights-title" className="type-subhead text-navy">
              {V2_COPY.insightsTitle}
            </h2>
            <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
              {INSIGHTS.map((post) => (
                <li key={post.href}>
                  <a href={post.href} target="_blank" rel="noopener" className="group block">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-studio">
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        fill
                        sizes="(min-width:768px) 32vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    </div>
                    <p className="mt-5 text-[13px] font-medium text-[#0052cc]">{post.category}</p>
                    <h3 className="mt-2 flex items-start justify-between gap-4 text-[clamp(1.0625rem,0.98rem+0.3vw,1.25rem)] leading-snug font-semibold tracking-[-0.012em] text-navy">
                      <span className="group-hover:underline group-hover:underline-offset-4">{post.title}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 text-slate-text transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy"
                      />
                    </h3>
                    <span className="sr-only">(opens gmic.ai in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─── Contact: dark, centred ─── */}
        <section
          data-surface="dark"
          id="contact"
          aria-labelledby="contact-title"
          className="section-y bg-ink bg-[radial-gradient(80%_70%_at_50%_0%,#1b2638_0%,#131c2a_50%,#10151c_100%)] text-white"
        >
          <div className="frame">
            <div className="mx-auto max-w-[760px] text-center">
              <Eyebrow tone="inverse" className="justify-center">
                {copy("Contact", "Eyebrow")}
              </Eyebrow>
              <h2 id="contact-title" className="mt-6 type-section text-balance text-white">
                {keepCompounds(copy("Contact", "H2"))}
              </h2>
              <p className="mx-auto mt-6 max-w-[52ch] type-lede text-white/70">{copy("Contact", "Body")}</p>
            </div>
            <div id="inquiry-form" className="mx-auto mt-14 max-w-[800px]">
              <ContactSection
                submitLabel={copy("Contact", "Submission")}
                privacyNote={copy("Contact", "Privacy note")}
                showReviewDetails={REVIEW_BUILD}
                tone="dark"
              />
            </div>
            <div className="mx-auto mt-16 max-w-[640px] border-t border-white/15 pt-10 text-center">
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-white">{copy("Custom projects", "H2")}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.65] text-white/70">{copy("Custom projects", "Body")}</p>
              <CtaLink href="#inquiry-form" variant="text-inverse" requestType="custom" arrow className="mt-5">
                {copy("Custom projects", "CTA")}
              </CtaLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      {REVIEW_BUILD && <ReviewNotesPanel notes={REVIEW_NOTES} />}
    </>
  )
}
