import { goodFit, principles } from '../data/content'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" label="03 — About" title="Good work comes from good collaboration.">
      <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
        <p>
          LTS Digital Solutions turns business needs into practical digital products. We start by understanding the problem, agree on the right solution, build it carefully and keep improving it after launch.
        </p>
        <p>
          We would rather tell you a feature is not worth building than sell you something you do not need. The aim is software and websites that genuinely make your work easier.
        </p>
      </div>

      <ol className="mt-12 border-t border-line">
        {principles.map((item, index) => (
          <li key={item.title} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[3rem_14rem_1fr] sm:gap-4">
            <span className="text-sm text-ink-soft">0{index + 1}</span>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-ink-soft">{item.text}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-sm text-ink-soft">Well suited to {goodFit.join(', ')}.</p>
      <a href="/#contact" className="mt-6 inline-block border-b border-ink pb-0.5 text-sm font-medium transition hover:border-brand hover:text-brand">Let's talk about your idea</a>
    </Section>
  )
}
