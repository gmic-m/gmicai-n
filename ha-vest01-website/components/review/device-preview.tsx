"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"

const DEVICES = [
  { key: "desktop", label: "Desktop", width: 1440, height: 900 },
  { key: "tablet", label: "Tablet", width: 768, height: 1024 },
  { key: "mobile", label: "Mobile", width: 390, height: 844 },
] as const

type DeviceKey = (typeof DEVICES)[number]["key"]

/**
 * Renders the page in an iframe at a true device width (1440 / 768 / 390),
 * scaled down to fit the viewport so layout breakpoints behave exactly as on
 * a real device.
 */
export function DevicePreview({ src }: { src: string }) {
  const [active, setActive] = useState<DeviceKey>("desktop")
  const device = DEVICES.find((d) => d.key === active)!
  const stage = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const fit = () => setScale(Math.min(1, (el.clientWidth - 32) / device.width))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [device.width])

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-navy">Responsive preview</h1>
          <p className="mt-1 text-[14px] text-slate-text">
            {device.label} · {device.width} × {device.height}px
            {scale < 1 && ` · shown at ${Math.round(scale * 100)}%`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div role="radiogroup" aria-label="Device width" className="flex rounded-full border border-hairline bg-white p-1">
            {DEVICES.map((d) => (
              <button
                key={d.key}
                type="button"
                role="radio"
                aria-checked={active === d.key}
                onClick={() => setActive(d.key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-colors",
                  active === d.key ? "bg-charcoal text-white" : "text-slate-text hover:text-charcoal"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
          <a
            href={src}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13.5px] font-medium text-gmic hover:text-gmic-dark"
          >
            Open page <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>

      <div ref={stage} className="flex justify-center rounded-2xl border border-hairline bg-white/60 py-6">
        <div style={{ width: device.width * scale, height: device.height * scale }} className="relative">
          <iframe
            key={device.key}
            src={src}
            title={`HA-VEST01 page at ${device.label} width`}
            width={device.width}
            height={device.height}
            style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
            className="absolute top-0 left-0 rounded-lg border border-hairline bg-white shadow-[0_24px_60px_-30px_rgba(18,35,61,0.35)]"
          />
        </div>
      </div>
    </div>
  )
}
