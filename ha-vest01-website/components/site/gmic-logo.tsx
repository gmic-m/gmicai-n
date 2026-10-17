import Image from "next/image"

import { cn } from "@/lib/utils"

/** Official GMIC logo (copied from the gmic.ai site source). */
export function GmicLogo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Image
      src={tone === "dark" ? "/images/brand/gmic-logo-dark.svg" : "/images/brand/gmic-logo-white.svg"}
      alt="GMIC AI"
      width={287}
      height={64}
      priority
      className={cn("h-7 w-auto", className)}
    />
  )
}
