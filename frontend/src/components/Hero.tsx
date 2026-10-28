import { ArrowDownRight, ArrowRight, Bot, CheckCircle2, Code2, Sparkles, TrendingUp } from 'lucide-react'

const stats = [
  { value: 'Fixed', label: 'Scope and estimate' },
  { value: 'Weekly', label: 'Working previews' },
  { value: '100%', label: 'Code ownership' },
  { value: '1 day', label: 'Enquiry response' },
]

export function Hero() {
  return (
    <section id="home" className="px-3 pb-6 pt-3 sm:px-5">
      <div className="relative mx-auto -mt-[4.75rem] max-w-[88rem] overflow-hidden rounded-[2rem] bg-ink px-5 pb-14 pt-32 text-white sm:px-10 lg:px-16 lg:pb-20 lg:pt-40">
        {/* Background: glow orbs + fine grid */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-brand/50 blur-[110px]" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Websites, apps and software for growing businesses
            </p>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] sm:text-6xl xl:text-7xl">
              Websites and software that bring you{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">more customers.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              We build websites, apps and AI tools for growing businesses, from the first call to launch. Clear scope, weekly previews, and you own the code.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-amber-100">
                Tell us about your project <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a href="/#services" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-4 font-semibold text-white transition hover:bg-white/10">
                See what we build <ArrowDownRight size={18} />
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/70">
              {['No hidden extras', 'Support after launch'].map((item) => (
                <li key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> {item}</li>
              ))}
            </ul>
          </div>

          {/* Visual: browser mock with floating chips */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
            <div className="animate-float-slow rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-1.5 px-1">
                <i className="h-2.5 w-2.5 rounded-full bg-red-400" /><i className="h-2.5 w-2.5 rounded-full bg-amber-400" /><i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 flex-1 rounded-md bg-white/10 px-3 py-1 text-[11px] text-white/50">yourbusiness.com</span>
              </div>
              <div className="rounded-xl bg-paper p-6 text-ink">
                <div className="flex items-center justify-between text-[11px] font-bold"><span>YOUR<span className="text-accent">.</span>BRAND</span><span className="text-ink-soft">Home · Services · Contact</span></div>
                <p className="mt-8 font-display text-3xl font-extrabold leading-tight">Make your next idea <span className="text-brand">real.</span></p>
                <i className="mt-4 block h-2 w-3/4 rounded bg-ink/10" /><i className="mt-2 block h-2 w-1/2 rounded bg-ink/10" />
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <i className="h-16 rounded-lg bg-gradient-to-br from-brand to-indigo-400" /><i className="h-16 rounded-lg bg-accent" /><i className="h-16 rounded-lg bg-ink/10" />
                </div>
              </div>
            </div>

            <div className="animate-float absolute -left-4 top-16 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink shadow-xl sm:-left-10">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><Code2 size={20} /></span>
              <span className="text-sm font-bold leading-tight">Clean code<small className="block text-xs font-medium text-ink-soft">You own it</small></span>
            </div>
            <div className="animate-float-delayed absolute -right-3 top-1/2 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink shadow-xl sm:-right-8">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-600"><Bot size={20} /></span>
              <span className="text-sm font-bold leading-tight">AI support<small className="block text-xs font-medium text-ink-soft">Responds instantly</small></span>
            </div>
            <div className="animate-float absolute -bottom-5 left-8 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink shadow-xl">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600"><TrendingUp size={20} /></span>
              <span className="text-sm font-bold leading-tight">Built to convert<small className="block text-xs font-medium text-ink-soft">Clear next steps</small></span>
            </div>
            <Sparkles size={26} className="absolute -top-6 right-10 text-accent" />
          </div>
        </div>

        <dl className="relative mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink/60 px-5 py-5 backdrop-blur">
              <dt className="order-2 text-sm text-white/60">{stat.label}</dt>
              <dd className="font-display text-2xl font-extrabold sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
