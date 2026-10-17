import { ProductImage } from "@/components/product/product-image"
import type { AssetId } from "@/lib/assets"
import { cn } from "@/lib/utils"

/**
 * Gallery image with its descriptive caption inside the frame, over a soft
 * bottom gradient. The review / third-party label stays separate, top-left
 * (rendered by ProductImage); attribution lives on the image credits page.
 */
export function GalleryTile({
  id,
  caption,
  sizes,
  position,
  className,
}: {
  id: AssetId
  caption: string
  sizes: string
  position?: string
  className?: string
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[12px]", className)}>
      <ProductImage id={id} aspect={false} position={position} sizes={sizes} className="absolute inset-0" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(10,14,20,0.72)_0%,rgba(10,14,20,0.32)_45%,rgba(10,14,20,0)_100%)]"
      />
      <p className="absolute inset-x-0 bottom-0 px-5 pb-5 text-[clamp(1rem,0.92rem+0.3vw,1.1875rem)] leading-snug font-medium tracking-[-0.01em] text-white sm:px-7 sm:pb-6">
        {caption}
      </p>
    </div>
  )
}
