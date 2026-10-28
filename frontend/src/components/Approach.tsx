import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, Check, Gift, Hammer, LifeBuoy, PenTool, Rocket, Search, UserCheck, Wrench, type LucideIcon } from 'lucide-react'
import { process, promises, stack } from '../data/content'
import { Reveal } from './Reveal'

const stepIcons: LucideIcon[] = [Search, PenTool, Hammer, Rocket, LifeBuoy]

function Column({ icon: Icon, title, items, tone }: { icon: LucideIcon; title: string; items: string[]; tone: string }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
        <span className={`grid h-7 w-7 place-items-center rounded-lg ${tone}`}><Icon size={15} /></span>
        {title}
      </h4>
      <ul className="mt-4 space-y-3 text-[15px] text-white/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5"><Check size={16} className="mt-0.5 shrink-0 text-emerald-400" /> {item}</li>
        ))}
      </ul>
    </div>
  )
}

export function Approach() {
  const [index, setIndex] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const current = process[index]
  const Icon = stepIcons[index]

  const onKeyDown = (event: KeyboardEvent) => {
    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight'
    const back = event.key === 'ArrowUp' || event.key === 'ArrowLeft'
    if (!forward && !back) return
    event.preventDefault()
    const next = (index + (forward ? 1 : -1) + process.length) % process.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="process" className="relative overflow-hidden bg-ink py-20 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-brand/30 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">Our approach</p>
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">A clear process, from first call to launch.</h2>
          <p className="mt-4 text-lg text-white/70">You always know what happens next. Select a step to see what we do, what you receive and what we need from you.</p>
        </Reveal>

        <Reveal className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {promises.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
              <p className="flex items-center gap-2 text-sm font-bold"><Check size={15} className="text-emerald-400" /> {item.title}</p>
              <p className="mt-0.5 pl-[23px] text-xs text-white/60">{item.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <div role="tablist" aria-label="Project steps" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {process.map((item, i) => {
              const active = i === index
              return (
                <button
                  key={item.step}
                  ref={(el) => { tabs.current[i] = el }}
                  role="tab"
                  id={`step-tab-${i}`}
                  aria-selected={active}
                  aria-controls="step-panel"
                  tabIndex={active ? 0 : -1}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition lg:w-full ${
                    active ? 'border-transparent bg-white text-ink shadow-xl' : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span className={`font-display text-sm font-bold ${active ? 'text-brand' : 'text-accent'}`}>{item.step}</span>
                  <span className="font-display text-lg font-bold">{item.title}</span>
                </button>
              )
            })}
          </div>

          <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${index}`} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Step {index + 1} of {process.length}</p>
                <h3 className="mt-2 text-3xl font-extrabold">{current.title}</h3>
                <p className="mt-2 max-w-xl text-white/70">{current.summary}</p>
              </div>
              <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-indigo-500 shadow-lg sm:grid"><Icon size={26} /></span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-500" style={{ width: `${((index + 1) / process.length) * 100}%` }} />
            </div>

            <div key={index} className="mt-8 grid gap-8 md:grid-cols-3">
              <Column icon={Wrench} title="What we do" items={current.does} tone="bg-indigo-500/20 text-indigo-300" />
              <Column icon={Gift} title="What you get" items={current.gets} tone="bg-emerald-500/20 text-emerald-300" />
              <Column icon={UserCheck} title="What we need from you" items={current.needs} tone="bg-amber-500/20 text-amber-300" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex gap-2">
                <button type="button" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-30">Back</button>
                <button type="button" onClick={() => setIndex((i) => Math.min(process.length - 1, i + 1))} disabled={index === process.length - 1} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10 disabled:opacity-30">Next step</button>
              </div>
              <a href="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:bg-amber-100">
                Request a discovery call <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
          <span className="font-semibold text-white">Tools we work with:</span>
          {stack.map((item) => <span key={item} className="rounded-full border border-white/15 px-3 py-1">{item}</span>)}
        </Reveal>
      </div>
    </section>
  )
}
