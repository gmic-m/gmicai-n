# HA-VEST01 page — review checklist

Version under review: **HA-VEST01 Product Page v1.4 — Review Draft** (copy v1.4, 2026-10-16, "NOT APPROVED").
Open items marked ☐. Items verified in this build marked ☑.
Owners and states are from the v1.4 sheet, `Open Issues & Approvals` tab.

## 0a. V2.1 refinement (2026-10-16)

- ☐ Approve the V2.1 copy changes in `docs/COPY-EDITS.md`: Applications shared-caution sentence removed (kept in FAQ Q2), fictional sample record values, new gallery caption.
- ☐ Confirm the fictional record sample (SAMPLE-014, technician meter readings) reads as illustrative and not as a real job or released software.
- ☐ Three new temporary photos (second crawlspace, kitchen plumber, checklists) are listed in `docs/ASSET_MANIFEST.md`; they need replacing with approved GMIC imagery like every other photo.
- ☑ Adaptive header: dark over hero, statement, contact and footer; light over light sections; mobile menu always white with dark text (browser-tested).
- ☑ Hero: no breadcrumb, single H1 at 600 weight within 40–72px, image full-bleed to the right edge, dark text on the white CTA (browser-tested).
- ☑ Applications accordion: Crawlspace opens first; auto-advance every 8 s only on fine-pointer desktop while the module is on screen; pauses on hover, keyboard focus, hidden tab and after manual selection; Pause/Play control; off for reduced motion and touch/mobile; image above accordion on mobile (browser-tested).
- ☑ Gallery captions inside the images; statement centred; pilot CTA centred; insights show covers; dark centred contact with readable labels and errors; footer Privacy and Terms links (browser-tested, 35/35 checks).

## 0. V2 redesign + photography (2026-10-16)

- ☐ **All imagery is temporary third-party photography** (Wikimedia Commons; licences and authors in `docs/ASSET_MANIFEST.md`, credits on the Image credits page linked from the footer, which replaced the on-page credits section). Replace every image with approved GMIC imagery before publication.
- ☐ **The vest photo is a third-party garment (Adidas down vest), not HA-VEST01.** Labelled as such on every use; must never be presented as HA-VEST01. It is a high-collar down vest, not the low-collar work vest in the art direction.
- ☐ Approve or reject the V2 copy edits in `docs/COPY-EDITS.md` (hero eyebrow, "Built for real field work.", design statement, captions, contact first step).
- ☐ Decide on the V2 brief's shorter evaluation-step wording (not applied; v1.4 wording kept — see COPY-EDITS.md).
- ☐ Related Insights links three real gmic.ai posts (verified live 2026-10-16); re-verify before publication.
- ☐ Footer mirrors gmic.ai but omits its certification pills and three links that 404 on the live site (/custom-devices/odm-oem/, /proof/, /process/).
- ☑ *(V2; replaced by the V2.1 accordion)* Carousel: auto-advance every 6.5 s on desktop only; pauses on hover, keyboard focus, hidden tab and after any manual interaction; visible pause/play; disabled for reduced motion and on touch/mobile (browser-tested).
- ☑ Contact: compact work-email step expands to the unchanged ten-field form; CTAs open it preset; no false success state (browser-tested).
- ☑ No broken images; every photo labelled; no horizontal overflow at 2560 / 1920 / 1440 / 768 / 390px (browser-tested).

## 1. Approval — blocks publication

- ☐ **Trigg's explicit approval of this exact version** (copy, images, FAQ, form, SEO). Sheet state: *Not approved*.
- ☐ Any substantive change to text, images, FAQ, form or SEO after approval requires new explicit approval.
- ☐ After approval: set `REVIEW_BUILD = false` in `lib/review.ts`, remove `robots: noindex`, rebuild, re-run every check below.

## 2. Technical claims (R&D)

- ☐ Stage wording and capability — R&D, *Pending*. Status line "In development · Pilot preparation" needs R&D recheck.
- ☐ Camera / location / record-workflow phrasing — R&D, *Pending*. Confirm each claim or revert to conservative copy.
- ☐ Hero body: intent, not current performance — R&D review.
- ☐ "Keep task context together" (Why Wearable) — R&D validation required.
- ☐ Three "Intended outcome" lines — R&D confirmation required.
- ☐ FAQ Q5 (record ownership/access) and external legal/privacy claims — R&D / Trigg, *Pending*.
- ☑ No specifications, weight, battery life, pricing, availability dates, certifications, benchmarks, statistics or testimonials appear anywhere. FAQ Q3 defers weight and battery to prototype tests, as worded in v1.4.
- ☑ All page copy is read from the v1.4 CSV export; nothing is retyped. Missing rows fail the build.

## 3. Copy decisions made in the build (confirm)

- ☐ FAQ has no H2 in v1.4. The build uses "Common questions" (the eyebrow's wording) as the H2. Confirm, or supply a heading.
- ☐ v1.4 has no per-scenario introduction for the three applications; none was added. Confirm, or supply copy.
- ☐ "Exploring another wearable application?" (v1.4 element "H2") is rendered as an H3 inside the Contact section to keep the heading order. Confirm.
- ☐ Hero eyebrow shows "HA-VEST01" plus the v1.4 status label "In development · Pilot preparation" (the brief suggested "HA-VEST01 / IN DEVELOPMENT"; the sheet takes precedence).
- ☐ Team-size options read "1–5 technicians", "6–20 technicians" and so on (sheet: "1–5 / 6–20 / 21–100 / 100+ technicians").
- ☐ Final product naming — Trigg, *Pending*.
- ☐ Hearit sync — suggested as a separate scope, awaiting Trigg.

## 4. Placeholder replacement

- ☐ Approved exterior (hero) image — Huang engineer / R&D / Trigg, *Pending*. Re-review content version after replacement.
- ☐ Crawlspace, HVAC and plumbing scenes — replace or re-license with provenance.
- ☐ Optional detail image — replace or remove the slot.
- ☐ Catalog card image — crop from the same approved hero version.
- ☑ Every placeholder shows its disclosure on the image (verified in the browser: 5/5 images on the product page).
- ☐ After replacement: no image shows internal layout, cables, processor location, price or battery details.

See `docs/ASSET_MANIFEST.md`.

## 5. Navigation and catalog

- ☐ Proposed URL `/vest01-ai-field-documentation-vest/` — verify the route and approve with the site owner and Trigg.
- ☐ Catalog category (Wearable Recorders or Smart Devices) and navigation placement — Trigg / website owner.
- ☐ Products dropdown entry "HA-VEST01 · In development" — pending Trigg.
- ☐ Field Service page: link the existing vest reference to this page — pending implementation on gmic.ai.
- ☐ AI Wearable Devices: add a link in related solutions/body-worn devices — pending implementation.
- ☑ Nav targets `https://gmic.ai/industries/field-service/` and `https://gmic.ai/solutions/ai-scribe-hardware/` verified live (HTTP 200, 2026-10-16). "Products" still points to the internal `/catalog-preview` route.
- ☐ Blog may link to this page; the page must never be enrolled in automated blog publishing.
- ☑ Card CTA is "Learn More" (no "Get a Quote" for a development product).

## 6. Inquiry routing

- ☐ Connect a verified delivery endpoint (`INQUIRY_ENDPOINT` in `lib/inquiry.ts`). Recipient Fanyao (fanyao@gmic.ai), no CRM.
- ☐ Send a test lead and capture evidence before publication — website owner / Fanyao, *Not tested*.
- ☐ Lead source `source=ha-vest01`; `type=custom` for custom requests (hidden fields present in the form).
- ☐ Add the privacy notice and Privacy Policy link next to the form.
- ☐ One-business-day reply commitment: confirmed by Fanyao; test routing before stating it publicly.
- ☑ The form validates required fields and email format and moves focus to the first error (browser-tested).
- ☑ A valid entry shows "Preview only — your request was not sent"; no success state exists (browser-tested).
- ☑ "Discuss a Custom Project" preselects *Custom wearable project* and "Plan a Pilot Evaluation" preselects *Field service evaluation* (browser-tested). "Discuss Your Use Case" uses the same mechanism (not separately tested).

## 7. Visual redesign v2.0 (2026-10-16)

- ☑ Fluid frame: content up to 1720px with 48 / 32 / 20px gutters; full-bleed image sections; reading measures capped at ~44–72ch.
- ☑ No horizontal overflow at 2560×1440, 1920×1080, 1440×900 or 390×844 (measured in Chrome).
- ☑ Every placeholder still shows its disclosure; no new capabilities, specifications or outcomes added.
- ☐ Placeholder art is schematic; the composition is designed for real photography and will only read as intended once approved images replace it.
- ☐ Review notes moved from inline blocks to a single "Review notes" drawer (bottom-right, review builds only). Confirm this works for reviewers.

## 8. Build and QA (verified 2026-10-16)

- ☑ `npm run build` — compiles, TypeScript clean, all 5 routes prerender static.
- ☑ `npm run lint` — clean.
- ☑ Every route returns 200; unknown paths 404.
- ☑ All in-page anchors resolve; every section's `aria-labelledby` resolves; one H1.
- ☑ No horizontal overflow at 768px or 390px; mobile Sheet navigation opens with all 4 items.
- ☑ SEO title and description match v1.4 exactly.
- ☐ Desktop/mobile previews synchronized to v1.4 for the approval package — owner Meng (available at `/preview`).
- ☐ After approval: check the live URL, directory links, FAQ/title/meta, form routing and responsive views; archive the source, approval and publishing record.
