import { ArrowUpRight, Check } from 'lucide-react'
import { concepts, services, type ConceptType } from '../data/content'
import { Reveal } from './Reveal'

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mb-12 grid gap-4 md:grid-cols-[1fr_0.8fr] md:items-end">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
        <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
      </div>
      {text && <p className="text-lg leading-relaxed text-ink-soft">{text}</p>}
    </Reveal>
  )
}

function ServiceVisual({ type }: { type: 'website' | 'dashboard' }) {
  return (
    <div aria-hidden="true" className="relative hidden w-full max-w-sm self-center rounded-2xl border border-line bg-paper p-3 shadow-inner lg:block lg:w-[38%] lg:max-w-none">
      <div className="mb-2 flex items-center gap-1">
        <i className="h-2 w-2 rounded-full bg-red-300" /><i className="h-2 w-2 rounded-full bg-amber-300" /><i className="h-2 w-2 rounded-full bg-emerald-300" />
        <span className="ml-2 h-3 flex-1 rounded bg-ink/5" />
      </div>
      {type === 'website' ? (
        <div className="rounded-lg bg-white p-4">
          <i className="block h-2.5 w-3/4 rounded bg-ink/80" />
          <i className="mt-2 block h-2 w-1/2 rounded bg-ink/15" />
          <i className="mt-4 block h-7 w-24 rounded-full bg-gradient-to-r from-brand to-indigo-400" />
          <div className="mt-4 grid grid-cols-3 gap-2"><i className="h-10 rounded bg-indigo-100" /><i className="h-10 rounded bg-amber-100" /><i className="h-10 rounded bg-ink/5" /></div>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-3">
          <div className="grid grid-cols-3 gap-2"><i className="h-9 rounded bg-violet-100" /><i className="h-9 rounded bg-fuchsia-100" /><i className="h-9 rounded bg-indigo-100" /></div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {[40, 62, 48, 80, 58, 92, 70].map((height, index) => <i key={index} className="flex-1 rounded-t bg-gradient-to-t from-violet-500 to-fuchsia-400" style={{ height: `${height}%` }} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20">
      <Heading eyebrow="What we do" title="What we build for businesses like yours." text="From a business website to a custom application, every service is designed to be genuinely useful to your customers and your team." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, tagline, description, bestFor, outcomes, timeline, badge, span, visual, tone, Icon }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={index * 60}
            className={`group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/10 ${tone.ring} ${span} ${visual ? 'lg:flex-row lg:gap-8' : ''}`}
          >
            <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.glow} to-transparent opacity-0 transition duration-300 group-hover:opacity-100`} />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 right-3 font-display text-[7rem] font-extrabold leading-none text-ink/[0.04]">0{index + 1}</span>

            <div className="relative flex flex-1 flex-col">
            <div className="relative flex items-center gap-3">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${tone.icon} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                <Icon size={26} strokeWidth={1.8} />
              </span>
              {badge && <span className={`rounded-full px-3 py-1 text-xs font-bold ${tone.chip}`}>{badge}</span>}
            </div>

            <h3 className="relative mt-6 text-2xl font-extrabold">{title}</h3>
            <p className="relative mt-1 text-sm font-semibold text-brand">{tagline}</p>
            <p className="relative mt-3 text-ink-soft">{description}</p>

            <ul className={`relative mt-5 grid gap-2 text-sm text-ink ${span ? 'sm:grid-cols-2' : ''}`}>
              {outcomes.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${tone.chip}`}><Check size={12} strokeWidth={3} /></span> {item}
                </li>
              ))}
            </ul>

            <div className="relative mt-6 space-y-1 border-t border-line pt-4 text-sm">
              <p><span className="font-semibold">Best for:</span> <span className="text-ink-soft">{bestFor}</span></p>
              <p><span className="font-semibold">Timeline:</span> <span className="text-ink-soft">{timeline}</span></p>
            </div>

            <a
              href="/#contact"
              onClick={() => window.dispatchEvent(new CustomEvent('select-service', { detail: title }))}
              aria-label={`Start a ${title} project`}
              className="relative mt-5 inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand"
            >
              Start with this <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            </div>
            {visual && <ServiceVisual type={visual} />}
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-brand/40 bg-brand/5 px-6 py-5">
        <p className="font-semibold">Not sure which service fits? <span className="font-normal text-ink-soft">Tell us the problem and we will recommend the simplest solution.</span></p>
        <a href="/#contact" className="inline-flex items-center gap-1.5 font-semibold text-brand">Talk to us <ArrowUpRight size={16} /></a>
      </Reveal>
    </section>
  )
}

function ConceptArt({ type }: { type: ConceptType }) {
  if (type === 'dashboard') {
    return (
      <div className="flex h-full gap-3 p-4">
        <div className="w-1/4 space-y-2 rounded-lg bg-ink p-3"><i className="block h-2 rounded bg-accent" /><i className="block h-2 rounded bg-white/20" /><i className="block h-2 rounded bg-white/20" /></div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="grid grid-cols-2 gap-3"><i className="h-12 rounded-lg bg-brand/20" /><i className="h-12 rounded-lg bg-accent/30" /></div>
          <div className="flex flex-1 items-end gap-1.5 rounded-lg bg-white p-3">
            {[35, 55, 43, 78, 61, 91, 69, 83].map((height, index) => <i key={index} className="flex-1 rounded-t bg-brand" style={{ height: `${height}%` }} />)}
          </div>
        </div>
      </div>
    )
  }
  if (type === 'store') {
    return (
      <div className="flex h-full flex-col p-4">
        <p className="font-display text-2xl font-extrabold leading-tight">Less, but<br />better.</p>
        <div className="mt-auto grid grid-cols-3 gap-2"><i className="h-20 rounded-lg bg-brand/25" /><i className="h-20 rounded-lg bg-accent/40" /><i className="h-20 rounded-lg bg-ink/15" /></div>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex justify-between text-[10px] font-bold"><span>north / studio</span><span className="text-ink-soft">ABOUT · SERVICES · CONTACT</span></div>
      <p className="mt-auto font-display text-2xl font-extrabold leading-tight">Good work<br />starts here.</p>
      <i className="mt-3 block h-2 w-2/3 rounded bg-ink/15" /><i className="mt-2 block h-2 w-1/2 rounded bg-ink/15" />
    </div>
  )
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20">
      <Heading eyebrow="A feel for the work" title="Ideas made tangible." text="These are visual concepts that show the kind of experiences we build. They are not completed client projects. We shape every detail around your goals and audience." />
      <div className="grid gap-5 md:grid-cols-3">
        {concepts.map((item, index) => (
          <Reveal as="article" key={item.title} delay={index * 80}>
            <div role="img" aria-label={`${item.category} concept illustration`} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#ece8da]">
              <ConceptArt type={item.type} />
              <span className="absolute right-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Concept</span>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-brand">{item.category}</p>
            <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
            <p className="mt-1 text-ink-soft">{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
