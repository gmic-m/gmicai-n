import Image from "next/image"

import { assets, type AssetId } from "@/lib/assets"
import { cn } from "@/lib/utils"

/** On-image label for any asset that is not yet approved. */
export function PlaceholderDisclosure({ text, className }: { text: string; className?: string }) {
  return (
    <figcaption className={cn("pointer-events-none absolute z-10", className)}>
      <span className="inline-block max-w-[min(100%,38rem)] bg-charcoal/88 px-3 py-1.5 text-[11.5px] leading-snug font-medium tracking-[0.005em] text-white">
        {text}
      </span>
    </figcaption>
  )
}

/**
 * Renders a registered HA-VEST01 image. Layouts only depend on the slot
 * (aspect ratio or explicit size), so swapping a placeholder for an approved
 * photograph needs no layout change — see lib/assets.ts. Until an asset is
 * approved, its label is printed on the image whatever the build mode.
 */
export function ProductImage({
  id,
  aspect,
  sizes,
  priority,
  fit = "cover",
  position = "50% 50%",
  className,
  disclosureClassName = "top-4 left-4 sm:top-5 sm:left-5",
}: {
  id: AssetId
  /** CSS aspect-ratio for the slot ("21/9"). Pass false when className sizes the slot. */
  aspect?: string | false
  sizes: string
  priority?: boolean
  fit?: "cover" | "contain"
  /** object-position, for art-directed crops of the same asset. */
  position?: string
  className?: string
  disclosureClassName?: string
}) {
  const asset = assets[id]
  const ratio = aspect === false ? undefined : (aspect ?? `${asset.width}/${asset.height}`)
  return (
    <figure className={cn("relative overflow-hidden bg-studio", className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "cover" ? "object-cover" : "object-contain"}
        style={{ objectPosition: position }}
      />
      {asset.status !== "approved" && (
        <PlaceholderDisclosure text={asset.disclosure} className={disclosureClassName} />
      )}
    </figure>
  )
}
