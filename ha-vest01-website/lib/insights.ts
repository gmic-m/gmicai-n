/**
 * Related Insights — real GMIC blog posts, found via the gmic.ai WordPress
 * REST API and checked live (HTTP 200) on 2026-10-16. Titles, dates,
 * categories and cover images are as published on gmic.ai; the covers were
 * downloaded from each post's featured media into public/images/insights/.
 * Re-verify before publication.
 */
export type Insight = {
  title: string
  date: string
  href: string
  category: string
  image: { src: string; alt: string; width: number; height: number }
}

export const INSIGHTS: Insight[] = [
  {
    title: "HVAC Field Service Voice AI Hardware: Capture, Workflow & Device Design",
    date: "2026-10-14",
    href: "https://gmic.ai/hvac-field-service-voice-ai-hardware/",
    category: "AI Hardware & ODM",
    image: {
      src: "/images/insights/hvac-field-service-voice-ai-hardware.png",
      alt: "Commercial HVAC systems illustrating field service voice AI hardware workflows",
      width: 1680,
      height: 940,
    },
  },
  {
    title: "Offline Voice AI Hardware: Recording, Storage & Integration",
    date: "2026-10-08",
    href: "https://gmic.ai/offline-voice-ai-hardware/",
    category: "AI Hardware & ODM",
    image: {
      src: "/images/insights/offline-voice-ai-hardware.webp",
      alt: "Offline voice AI hardware for local recording, storage, and platform integration",
      width: 1672,
      height: 940,
    },
  },
  {
    title: "Custom AI Wearable ODM: The B2B Hardware Builder’s Guide",
    date: "2026-05-06",
    href: "https://gmic.ai/custom-ai-wearable-odm-the-b2b-hardware-builders-guide/",
    category: "AI Hardware & ODM",
    image: {
      src: "/images/insights/custom-ai-wearable-odm.png",
      alt: "GMIC AI custom AI wearable voice device with LED indicator and microphone array",
      width: 2232,
      height: 1257,
    },
  },
]
