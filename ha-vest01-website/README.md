# HA-VEST01 product page — review build

Local review build of the GMIC AI **HA-VEST01 AI Vest** product page, synchronized to
**HA-VEST01 Product Page Copy v1.4 — B2B Conversion Review**.

> **HA-VEST01 Product Page v1.4 — Review Draft (V2 design).** Not approved for publication. Nothing in
> this project is deployed to, or changes, gmic.ai. All imagery is temporary third-party photography; the
> vest shown is a third-party garment, **not HA-VEST01**.

## Run locally

Requires Node.js 22 or newer.

```bash
cd ~/Desktop/gmicai/ha-vest01-website
npm install
npm run dev
```

Open <http://localhost:3000>. Production check:

```bash
npm run build
npm run start
```

## Routes

| Route | What it is |
|---|---|
| `/` | Review index: links to every route, copy version, placeholder count, approval state |
| `/vest01-ai-field-documentation-vest` | The product page. Mirrors the **proposed** gmic.ai URL `/vest01-ai-field-documentation-vest/` (proposal only — verify with site owner and Trigg) |
| `/preview` | Desktop / tablet / mobile frames (1440 / 768 / 390px) of the product page |
| `/catalog-preview` | Reusable HA-VEST01 product catalog card in a catalog-style grid |

Every route is `noindex` in this review build.

## Stack

Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · shadcn/ui (Base UI primitives) · Lucide icons ·
Inter via `next/font`. All pages prerender as static HTML. No analytics, tracking or animation libraries.

## Project structure

```text
app/
  layout.tsx                                root layout, Inter font, base metadata
  page.tsx                                  review index
  vest01-ai-field-documentation-vest/page.tsx   product page (SEO title/description from v1.4)
  catalog-preview/page.tsx                  catalog card preview
  preview/page.tsx                          responsive preview
components/
  site/       adaptive header (+ mobile Sheet nav), footer, logo, breadcrumb, review banner, container
  product/    section heading, CTA link, product image, gallery tile, status label, application facts,
              application showcase (image + accordion), intended record, FAQ, contact section (two-step) +
              inquiry form, image credits, catalog card, review note
  review/     device preview frame, review-notes drawer
  ui/         shadcn/ui components
content/page-copy-v1.4.csv                 exact export of the sheet's "Page Copy v1.4" tab
lib/
  copy.ts       reads copy by (Section, Element); a missing row fails the build
  assets.ts     image registry (paths, alt text, status, on-image label, credit/licence)
  insights.ts   Related Insights — real gmic.ai posts, verified live
  inquiry.ts    consultation form spec + routing constants (endpoint unset)
  review.ts     REVIEW_BUILD switch and review labels
  site.ts       navigation targets and product route
public/images/ha-vest01/   temporary third-party review photographs (see manifest)
public/images/brand/       GMIC logo (from the gmic.ai site source)
docs/
  ASSET_MANIFEST.md     every image: source URL, author, licence, usage, status
  COPY-EDITS.md         every wording change against v1.4, for approval
  REVIEW-CHECKLIST.md   open items before publication
```

## Content source

All page copy comes from `content/page-copy-v1.4.csv`, an unmodified CSV export of the `Page Copy v1.4`
tab. Components look rows up by their Section and Element names, so wording is never retyped. To resync
after a sheet change, re-export the tab over that file and rebuild; renamed or removed rows fail the build.

Not in that tab, and therefore hard-coded with a source comment:

- Consultation form fields and options — `Consultation Form` tab → `lib/inquiry.ts`
- Catalog card copy ("In development", "Learn More") — `Navigation & Catalog` tab
- Placeholder disclosure wording for scenes — `Images & Public Scope` tab → `lib/assets.ts`

## Replacing temporary images

Layouts reference images by id only. To swap in an approved GMIC asset:

1. Add the file to `public/images/ha-vest01/`.
2. In `lib/assets.ts`, update that entry's `src`, `alt`, `width`, `height` and `credit`.
3. Set its `status` to `"approved"` — this removes the on-image label and drops it from the image credits.
4. Delete the retired third-party file and update `docs/ASSET_MANIFEST.md`.

## Inquiry form

The form validates on the client and is a **non-submitting preview**: with `INQUIRY_ENDPOINT` unset in
`lib/inquiry.ts`, a valid entry shows "Preview only — your request was not sent" and never a success
state. Intended routing: `fanyao@gmic.ai`, reply target one business day, lead source
`source=ha-vest01` (`type=custom` for custom requests). Connecting delivery requires a verified endpoint
and a captured test lead before publication.

## Review build switch

`REVIEW_BUILD` in `lib/review.ts` shows the review banner and the dashed internal review notes. Turn it
off only after the checklist is cleared and Trigg approves the exact version. Placeholder disclosures
stay visible for any image still marked `placeholder`, whatever the flag.
