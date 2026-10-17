"use client"

import { useEffect, useId, useRef, useState } from "react"
import { ChevronDown, Pause, Play } from "lucide-react"

import { ProductImage } from "@/components/product/product-image"
import { ScenarioFacts, type Application } from "@/components/product/application-section"
import { cn } from "@/lib/utils"

const INTERVAL_MS = 8000

/**
 * Applications module: one large image (left) that cross-fades with the
 * active item of a single-open accordion (right). Crawlspace opens first.
 *
 * Auto-advance (every 8 s) runs only on fine-pointer desktop screens without
 * prefers-reduced-motion, and stops while the module is hovered, while
 * keyboard focus is inside it, while it is off screen or the tab is hidden, and permanently once
 * the user picks an item — until they press play again.
 */
export function ApplicationShowcase({ apps, label }: { apps: Application[]; label: string }) {
  const uid = useId()
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [autoAllowed, setAutoAllowed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [keyboardFocus, setKeyboardFocus] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)")
    const update = () => {
      const allowed = !reduce.matches && fine.matches
      setAutoAllowed(allowed)
      setPlaying(allowed)
    }
    update()
    reduce.addEventListener("change", update)
    fine.addEventListener("change", update)
    return () => {
      reduce.removeEventListener("change", update)
      fine.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  // only advance while the module is on screen, so visitors arrive at Crawlspace
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const running = playing && autoAllowed && inView && !hovered && !keyboardFocus && !hidden
  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % apps.length), INTERVAL_MS)
    return () => window.clearTimeout(t)
  }, [running, active, apps.length])

  const select = (i: number) => {
    setPlaying(false)
    setActive(i)
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // only keyboard focus pauses; a mouse click on pause/play must not re-pause it
      onFocusCapture={(e) => setKeyboardFocus((e.target as HTMLElement).matches(":focus-visible"))}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setKeyboardFocus(false)
      }}
      // minmax(0,1fr): the truncated one-line summaries must not set the column width
      className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-12 lg:gap-12"
    >
      {/* image stage: all scenario images stacked, the active one fades in */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-studio lg:col-span-7 lg:aspect-auto lg:min-h-[640px]">
        {apps.map((app, i) => (
          <div
            key={app.id}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
              i === active ? "opacity-100" : "opacity-0"
            )}
          >
            <ProductImage
              id={app.image}
              aspect={false}
              sizes="(min-width:1024px) 55vw, 100vw"
              className="absolute inset-0"
              disclosureClassName="top-5 left-5"
            />
          </div>
        ))}
      </div>

      {/* accordion */}
      <div className="flex min-w-0 flex-col lg:col-span-5">
        <div className="flex flex-col gap-2">
          {apps.map((app, i) => {
            const open = i === active
            const btnId = `${uid}-btn-${i}`
            const panelId = `${uid}-panel-${i}`
            return (
              <div
                key={app.id}
                id={app.id}
                className={cn(
                  "rounded-[20px] transition-colors duration-300",
                  open ? "bg-[#f1f4f8]" : "bg-transparent hover:bg-[#f7f9fb]"
                )}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => select(i)}
                    className="flex w-full items-start justify-between gap-6 rounded-[20px] px-6 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span className="min-w-0">
                      <span className="block text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] leading-tight font-semibold tracking-[-0.018em] text-navy">
                        {app.title}
                      </span>
                      {!open && <span className="mt-1.5 block truncate text-[15px] text-slate-text">{app.challenge}</span>}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("mt-1 size-5 shrink-0 text-slate-text transition-transform duration-300", open && "rotate-180 text-navy")}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} hidden={!open} className="px-6 pb-7 sm:px-7 sm:pb-8">
                  <ScenarioFacts app={app} layout="plain" />
                </div>
              </div>
            )
          })}
        </div>

        {/* progress + pause/play */}
        <div className="mt-6 flex items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-2" aria-hidden="true">
            {apps.map((app, i) => (
              <span key={app.id} className="relative h-[3px] w-10 overflow-hidden rounded-full bg-navy/15">
                <span
                  key={`${i}-${active}-${running}`}
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full bg-navy",
                    i < active || (i === active && !running) ? "w-full" : "w-0",
                    i === active && running && "animate-[showcase-progress_8s_linear_forwards]"
                  )}
                />
              </span>
            ))}
          </div>
          {autoAllowed && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause automatic switching" : "Play automatic switching"}
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13.5px] font-medium text-navy transition-colors hover:bg-navy/5"
            >
              {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
              {playing ? "Pause" : "Play"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
