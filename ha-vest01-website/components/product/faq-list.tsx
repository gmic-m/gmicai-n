"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export type Faq = { question: string; answer: string }

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <Accordion multiple className="border-t border-navy/15">
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question} className="border-b border-navy/15 not-last:border-b">
          <AccordionTrigger className="gap-8 rounded-none py-6 text-[clamp(1.0625rem,0.98rem+0.3vw,1.25rem)] leading-snug font-normal tracking-[-0.01em] text-navy hover:no-underline sm:py-7 [&_[data-slot=accordion-trigger-icon]]:mt-1 [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-slate-text [&_[data-slot=accordion-trigger-icon]]:stroke-[1.5]">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-7 text-[16.5px] leading-[1.7] text-slate-text">
            <p className="max-w-[62ch]">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
