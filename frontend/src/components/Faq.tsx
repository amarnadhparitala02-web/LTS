import { useId, useMemo, useState } from 'react'
import { ArrowUpRight, Mail, Plus, Search } from 'lucide-react'
import { site } from '../config/site'
import { faqCategories, faqs, type FaqCategory } from '../data/content'
import { Reveal } from './Reveal'

export function Faq() {
  const [category, setCategory] = useState<FaqCategory | 'All'>('All')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(faqs[0].q)
  const baseId = useId()

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return faqs.filter(
      (item) => (category === 'All' || item.category === category) && (!needle || `${item.q} ${item.a}`.toLowerCase().includes(needle)),
    )
  }, [category, query])

  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 pb-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand">Questions</p>
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">Before you get in touch.</h2>
          <p className="mt-4 text-lg text-ink-soft">The things people usually ask first. If yours is not here, just ask.</p>

          <div className="mt-8 rounded-3xl bg-ink p-6 text-white">
            <p className="font-display text-xl font-bold">Still have a question?</p>
            <p className="mt-1.5 text-sm text-white/70">Tell us what you are thinking. We reply within one working day.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/#contact" className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-amber-100">
                Ask us <ArrowUpRight size={16} />
              </a>
              {site.email && (
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10">
                  <Mail size={16} /> {site.email}
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions…"
              aria-label="Search questions"
              className="w-full rounded-full border border-line bg-card py-3.5 pl-11 pr-4 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {(['All', ...faqCategories] as const).map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === name ? 'bg-ink text-white' : 'border border-line bg-card text-ink-soft hover:text-ink'}`}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-3" aria-live="polite">
            {visible.map((item, index) => {
              const isOpen = open === item.q
              const id = `${baseId}-${index}`
              return (
                <div key={item.q} className={`overflow-hidden rounded-2xl border bg-card transition ${isOpen ? 'border-brand/40 shadow-lg shadow-brand/10' : 'border-line'}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={id}
                      id={`${id}-q`}
                      onClick={() => setOpen(isOpen ? null : item.q)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold"
                    >
                      <span>
                        <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-brand">{item.category}</span>
                        {item.q}
                      </span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? 'rotate-45 bg-brand text-white' : 'bg-ink/5'}`}>
                        <Plus size={16} aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <div id={id} role="region" aria-labelledby={`${id}-q`} inert={!isOpen} className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 leading-relaxed text-ink-soft">{item.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}

            {visible.length === 0 && (
              <p className="rounded-2xl border border-dashed border-line bg-card px-6 py-8 text-center text-ink-soft">
                No matching questions. <a href="/#contact" className="font-semibold text-brand underline">Ask us directly</a>.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
