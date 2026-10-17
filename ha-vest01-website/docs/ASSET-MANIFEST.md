# HA-VEST01 asset manifest

Source of truth for every image on the HA-VEST01 review build. Keep in sync with `lib/assets.ts`.
Release conditions follow the v1.4 sheet (`Images & Public Scope` tab).

**Every image on the page is temporary. None is publishable. None shows HA-VEST01.**

All photographs were downloaded on 2026-10-16 from Wikimedia Commons at 1920px (Commons standard
thumbnail width) and stored locally — nothing is hotlinked. Each is labelled on the image while its
`status` is not `approved`, and credited in the page's **Image credits** section (required by the
CC BY-SA licences; kept for all for traceability).

| File (`public/images/ha-vest01/`) | Used in | Subject | Author / owner | Licence | Source page | Status |
|---|---|---|---|---|---|---|
| `vest-reference-third-party.jpg` (1920×2560) | Hero (full-bleed right); gallery (large); catalog card | Third-party dark quilted down vest (Adidas Helionic) on a model, grey studio background. **Not HA-VEST01.** Cropped below the face. Adidas logo left intact. | Adenosine Triphosphate | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Adidas_Helionic_Down_vest.jpg) | Third-party product reference — internal review only |
| `scene-crawlspace.jpg` (1920×1440) | Applications showcase — Crawlspace Work | Concrete crawlspace with joists, cables, traffic cone | Alboychenko08 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Crawlspace.jpg) | Third-party scene — review only |
| `scene-hvac.jpg` (1920×1280) | Applications showcase — HVAC Service | Hands connecting refrigerant manifold gauges to an AC unit | U.S. Air Force photo, A1C Derrick Bole | Public domain (U.S. federal work) | [Commons](https://commons.wikimedia.org/wiki/File:379th_ECES_HVAC_technicians_combat_rising_temperatures_(8502255).jpg) | Third-party scene — review only |
| `scene-plumbing.jpg` (1920×1280) | Applications showcase — Plumbing Repairs | Close-up of hands fitting a pipe with running water (fish-hatchery maintenance) | USFWS Mountain-Prairie | Public domain (U.S. federal work) | [Commons](https://commons.wikimedia.org/wiki/File:Hatchery_Plumbing_Maintenance_(50976243386).jpg) | Third-party scene — review only |
| `detail-hvac-gauge.jpg` (1920×1430) | Why Wearable — column 02 | Finger pointing at a pressure gauge | U.S. Air Force photo, SrA Thomas Karol | Public domain (U.S. federal work) | [Commons](https://commons.wikimedia.org/wiki/File:HVAC-_Bringing_the_Heat_(8198793).jpg) | Third-party scene — review only |
| `detail-hvac-panel.jpg` (1920×1280) | Gallery | Over-the-shoulder view of a technician working inside an equipment control panel | U.S. Air Force photo, A1C Derrick Bole | Public domain (U.S. federal work) | [Commons](https://commons.wikimedia.org/wiki/File:379th_ECES_HVAC_technicians_combat_rising_temperatures_(8502258).jpg) | Third-party scene — review only |
| `context-condenser.jpg` (1920×1280) | Gallery (wide) | Residential outdoor AC condenser beside a wall and gas meter | Raysonho @ Open Grid Scheduler / Grid Engine | [CC0](https://creativecommons.org/publicdomain/zero/1.0) | [Commons](https://commons.wikimedia.org/wiki/File:AirConditioner.jpg) | Third-party scene — review only |
| `context-crawlspace.jpg` (1920×1440) | Why Wearable — column 01 (zoomed 1.32× to hide skewed corners); Intended record thumbnail | Low dirt crawlspace under a house, plastic drain pipes along the joists | TradeCrawlspaces | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Crawlspace_under_house.jpg) | Third-party scene — review only |
| `scene-plumbing-kitchen.jpg` (1920×1487) | Gallery — "Working at an open sink cabinet" | Plumber kneeling at an open kitchen sink cabinet, seen from behind (no face) | Flickr user rick | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Plumber_at_work_(retouched).jpg) | Third-party scene — review only |
| `detail-checklists.jpg` (1920×1280) | Why Wearable — column 03 | Two clipboards with completed checklists and red pens on asphalt | U.S. Marine Corps photo | Public domain (U.S. federal work) | [Commons](https://commons.wikimedia.org/wiki/File:USMC-100914-M-0646Q-45.jpg) | Third-party scene — review only |

## Notes and conditions

- **Third-party vest.** Used only as a layout reference for scale and presence, under the brief's allowance for
  review-only workwear photography. It is labelled "Third-party vest reference — Not HA-VEST01" wherever it appears,
  its brand logo is untouched, and it must never be presented as HA-VEST01. It is a down vest with a high collar —
  not the low-collar technical work vest described in the art direction; no openly licensed photo of that garment at
  usable resolution was found.
- **CC BY / CC BY-SA images** (vest, both crawlspaces, kitchen) are cropped on the page and marked "cropped" in the credits; attribution and licence are shown in the image credits.
  If these images were ever published (they will not be), adaptations would have to carry the same licence.
- **U.S. military photos** are public domain but show personnel partly in uniform clothing; cropping keeps faces out
  of frame. They depict generic HVAC work, not GMIC customers or deployments.
- **Sources tried and not used:** Unsplash blocked automated access (bot protection), so it was not used. Openverse
  surfaced a "CC0" Columbia vest that is a manufacturer catalogue image re-uploaded by a shop account — rejected as an
  unreliable licence and too small (476px).
- **Release condition (all):** replace with approved GMIC imagery (formal vest images requested from Huang engineer),
  set `status: "approved"` in `lib/assets.ts`, remove the credits entries for retired images, and re-review with Trigg.
  Never imply real customers or field deployment.

## Removed

The v1/v2 vector placeholders (`hero-vest-placeholder.svg`, `scene-*-placeholder.svg`, `detail-vest-placeholder.svg`)
were deleted in favour of the photographs above.

## Non-product assets

| File | Use | Source | Status |
|---|---|---|---|
| `public/images/brand/gmic-logo-dark.svg` | Header (light), review index | Official GMIC logo from the gmic.ai site source (`img/logo.svg`), wordmark #1D232D | Brand asset |
| `public/images/brand/gmic-logo-white.svg` | Header (dark hero), footer | Same logo, wordmark white | Brand asset |
| `app/icon.svg` | Favicon | GMIC favicon from the gmic.ai site source | Brand asset |
| `public/images/insights/hvac-field-service-voice-ai-hardware.png` | Related insights card | Featured image of the published gmic.ai post, fetched via the gmic.ai WordPress REST API and stored locally | GMIC's own blog image |
| `public/images/insights/offline-voice-ai-hardware.webp` | Related insights card | Same | GMIC's own blog image |
| `public/images/insights/custom-ai-wearable-odm.png` | Related insights card | Same | GMIC's own blog image |

## Illustrative UI

The **Intended Record** document (`components/product/intended-record.tsx`) is code, not an image: v1.4 field names
with **fictional, non-sensitive sample values** (record "SAMPLE-014", technician meter readings, Confirmed / To review
chips, "Pending professional review"). No AI confidence scores, diagnoses or automatic capture are shown. Labelled
"Illustrative" and "Fictional data", captioned with the v1.4 caption.

## Restrictions (v1.4)

No image may show HA-VEST01 internal layout, cables, processor location, price, or unverified endurance or battery
details. The HVAC panel photo shows a third-party equipment panel, not HA-VEST01 internals.
