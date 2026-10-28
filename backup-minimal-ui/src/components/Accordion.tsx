import { useId, useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'

export interface AccordionItem {
  id: string
  index?: string
  title: string
  subtitle?: string
  content: ReactNode
}

/** Plain hairline accordion. One item open at a time. */
export function Accordion({ items, defaultOpen = null }: { items: AccordionItem[]; defaultOpen?: string | null }) {
  const [open, setOpen] = useState<string | null>(defaultOpen)
  const baseId = useId()

  return (
    <div className="border-t border-line">
      {items.map((item, position) => {
        const isOpen = open === item.id
        const panelId = `${baseId}-panel-${position}`
        const buttonId = `${baseId}-button-${position}`
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-start gap-4 py-5 text-left"
              >
                {item.index && <span className="w-8 shrink-0 pt-1 text-sm text-ink-soft">{item.index}</span>}
                <span className="flex-1">
                  <span className="block text-lg font-medium leading-snug">{item.title}</span>
                  {item.subtitle && <span className="mt-1 block text-sm text-ink-soft">{item.subtitle}</span>}
                </span>
                <Plus size={18} aria-hidden="true" className={`mt-1.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} inert={!isOpen} className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className={`pb-7 ${item.index ? 'sm:pl-12' : ''}`}>{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
