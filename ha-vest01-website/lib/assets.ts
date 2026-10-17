/**
 * Image registry for HA-VEST01. Layouts reference assets by id only, so an
 * approved photograph replaces a temporary one by editing one entry here:
 *   1. add the approved file to public/images/ha-vest01/
 *   2. point `src` at it, update `alt`, `width`/`height` and `credit`
 *   3. set `status` to "approved" — this removes the on-image label
 * Keep docs/ASSET_MANIFEST.md in sync with every change.
 *
 * Every image currently on the page is temporary:
 *   - "third-party": licensed photography by others, used for internal layout
 *     review only. The vest photo is NOT HA-VEST01 and must never be presented
 *     as it. Attribution is shown on the image credits page (footer link).
 */
export type AssetStatus = "placeholder" | "third-party" | "approved"

export type Credit = {
  title: string
  author: string
  license: string
  licenseUrl: string
  sourceUrl: string
}

export type ImageAsset = {
  id: string
  src: string
  alt: string
  /** Intrinsic size of the file; drives aspect ratio and next/image sizing. */
  width: number
  height: number
  status: AssetStatus
  /** Visible on-image label while the asset is not approved. */
  disclosure: string
  credit: Credit
}

const REVIEW_PHOTO = "Third-party photo — Internal review only"

const registry = {
  vest: {
    id: "vest",
    src: "/images/ha-vest01/vest-reference-third-party.jpg",
    alt: "Third-party dark quilted vest on a model against a grey studio background — layout reference only, not HA-VEST01",
    width: 1920,
    height: 2560,
    status: "third-party",
    disclosure: "Third-party vest reference — Not HA-VEST01 · Internal review only",
    credit: {
      title: "Adidas Helionic Down vest",
      author: "Adenosine Triphosphate",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Adidas_Helionic_Down_vest.jpg",
    },
  },
  crawlspace: {
    id: "crawlspace",
    src: "/images/ha-vest01/scene-crawlspace.jpg",
    alt: "Low concrete crawlspace beneath a building, with exposed joists, cables and a traffic cone",
    width: 1920,
    height: 1440,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "Crawlspace",
      author: "Alboychenko08",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Crawlspace.jpg",
    },
  },
  hvac: {
    id: "hvac",
    src: "/images/ha-vest01/scene-hvac.jpg",
    alt: "Technicians' hands connecting refrigerant manifold gauges to an air-conditioning unit",
    width: 1920,
    height: 1280,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "379th ECES HVAC technicians combat rising temperatures",
      author: "U.S. Air Force photo by Airman 1st Class Derrick Bole",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-USGov-Military-Air_Force",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:379th_ECES_HVAC_technicians_combat_rising_temperatures_(8502255).jpg",
    },
  },
  plumbing: {
    id: "plumbing",
    src: "/images/ha-vest01/scene-plumbing.jpg",
    alt: "Close-up of hands fitting a pipe while water runs from the joint",
    width: 1920,
    height: 1280,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "Hatchery Plumbing Maintenance",
      author: "USFWS Mountain-Prairie",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-USGov-FWS",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hatchery_Plumbing_Maintenance_(50976243386).jpg",
    },
  },
  gauge: {
    id: "gauge",
    src: "/images/ha-vest01/detail-hvac-gauge.jpg",
    alt: "A technician's finger pointing at a pressure gauge during service",
    width: 1920,
    height: 1430,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "HVAC- Bringing the Heat",
      author: "U.S. Air Force photo by Senior Airman Thomas Karol",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-USGov-Military-Air_Force",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:HVAC-_Bringing_the_Heat_(8198793).jpg",
    },
  },
  panel: {
    id: "panel",
    src: "/images/ha-vest01/detail-hvac-panel.jpg",
    alt: "Over-the-shoulder view of a technician working with a screwdriver inside an equipment control panel",
    width: 1920,
    height: 1280,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "379th ECES HVAC technicians combat rising temperatures",
      author: "U.S. Air Force photo by Airman 1st Class Derrick Bole",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-USGov-Military-Air_Force",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:379th_ECES_HVAC_technicians_combat_rising_temperatures_(8502258).jpg",
    },
  },
  condenser: {
    id: "condenser",
    src: "/images/ha-vest01/context-condenser.jpg",
    alt: "Residential outdoor air-conditioning condenser beside a brick wall and gas meter",
    width: 1920,
    height: 1280,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "AirConditioner",
      author: "Raysonho @ Open Grid Scheduler / Grid Engine",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:AirConditioner.jpg",
    },
  },
  crawlContext: {
    id: "crawlContext",
    src: "/images/ha-vest01/context-crawlspace.jpg",
    alt: "Low dirt crawlspace under a house, with plastic drain pipes running along the joists",
    width: 1920,
    height: 1440,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "Crawlspace under house",
      author: "TradeCrawlspaces",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Crawlspace_under_house.jpg",
    },
  },
  kitchen: {
    id: "kitchen",
    src: "/images/ha-vest01/scene-plumbing-kitchen.jpg",
    alt: "A plumber kneeling at an open kitchen sink cabinet, seen from behind",
    width: 1920,
    height: 1487,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "Plumber at work (retouched)",
      author: "Photo by Flickr user rick",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Plumber_at_work_(retouched).jpg",
    },
  },
  checklists: {
    id: "checklists",
    src: "/images/ha-vest01/detail-checklists.jpg",
    alt: "Two clipboards with completed checklists and red pens laid on asphalt",
    width: 1920,
    height: 1280,
    status: "third-party",
    disclosure: REVIEW_PHOTO,
    credit: {
      title: "USMC-100914-M-0646Q-45",
      author: "U.S. Marine Corps photo",
      license: "Public domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-USGov-Military-Marines",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:USMC-100914-M-0646Q-45.jpg",
    },
  },
} satisfies Record<string, ImageAsset>

export type AssetId = keyof typeof registry

// widened so status checks ("approved" vs temporary) stay meaningful to the type checker
export const assets: Record<AssetId, ImageAsset> = registry
