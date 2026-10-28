import { ArrowUpRight, HeartHandshake, Lightbulb, MessageSquareText, Users, type LucideIcon } from 'lucide-react'
import { goodFit, principles } from '../data/content'
import { Reveal } from './Reveal'

const icons: { Icon: LucideIcon; tone: string }[] = [
  { Icon: Lightbulb, tone: 'from-amber-500 to-orange-500' },
  { Icon: MessageSquareText, tone: 'from-sky-500 to-cyan-500' },
  { Icon: Users, tone: 'from-emerald-500 to-teal-500' },
  { Icon: HeartHandshake, tone: 'from-violet-500 to-fuchsia-500' },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 pb-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand">About LTS</p>
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Good work comes from <span className="text-brand">good collaboration.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            LTS Digital Solutions turns business needs into practical digital products. We start by understanding the problem, agree on the right solution, build it carefully and keep improving it after launch.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            We would rather tell you a feature is not worth building than sell you something you do not need. The aim is software and websites that genuinely make your work easier.
          </p>

          <div className="mt-7">
            <p className="text-sm font-bold">A good fit if you are…</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {goodFit.map((item) => (
                <li key={item} className="rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium text-ink-soft">{item}</li>
              ))}
            </ul>
          </div>

          <a href="/#contact" className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-brand">
            Let's talk about your idea <ArrowUpRight size={17} />
          </a>
        </Reveal>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((item, index) => {
              const { Icon, tone } = icons[index % icons.length]
              return (
                <Reveal key={item.title} delay={index * 70} className="group rounded-3xl border border-line bg-card p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-md transition group-hover:scale-110`}><Icon size={22} /></span>
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-ink-soft">{item.text}</p>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="relative mt-4 overflow-hidden rounded-3xl bg-ink p-7 text-white">
            <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/50 blur-3xl" />
            <p className="relative text-xs font-bold uppercase tracking-widest text-accent">Our promise</p>
            <p className="relative mt-3 font-display text-2xl font-extrabold leading-snug">
              Practical solutions. Clear communication. <span className="text-white/60">Thoughtful execution.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
