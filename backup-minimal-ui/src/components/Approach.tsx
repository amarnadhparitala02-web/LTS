import { process, stack } from '../data/content'
import { Accordion, type AccordionItem } from './Accordion'
import { Section } from './Section'

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm text-ink-soft">{title}</h4>
      <ul className="mt-3 space-y-1.5 text-[15px]">
        {items.map((item) => <li key={item} className="flex gap-3"><span className="text-ink-soft">—</span>{item}</li>)}
      </ul>
    </div>
  )
}

const items: AccordionItem[] = process.map((step) => ({
  id: step.step,
  index: step.step,
  title: step.title,
  subtitle: step.summary,
  content: (
    <div className="grid gap-8 md:grid-cols-3">
      <List title="What we do" items={step.does} />
      <List title="What you receive" items={step.gets} />
      <List title="What we need from you" items={step.needs} />
    </div>
  ),
}))

export function Approach() {
  return (
    <Section id="process" label="02 — Approach" title="A clear process, from first call to launch.">
      <p className="mb-10 max-w-xl text-lg leading-relaxed text-ink-soft">
        You always know what happens next. Open a step to see what we do, what you receive and what we need from you.
      </p>
      <Accordion items={items} defaultOpen="01" />
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <a href="/#contact" className="bg-ink px-7 py-4 text-sm font-medium text-white transition hover:bg-brand">Request a discovery call</a>
        <p className="max-w-md text-sm text-ink-soft">Tools we work with: {stack.join(', ')}.</p>
      </div>
    </Section>
  )
}
