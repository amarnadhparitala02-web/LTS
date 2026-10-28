import { services } from '../data/content'
import { Accordion, type AccordionItem } from './Accordion'
import { Section } from './Section'

const items: AccordionItem[] = services.map((service, index) => ({
  id: service.title,
  index: `0${index + 1}`,
  title: service.title,
  subtitle: service.tagline,
  content: (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <p className="leading-relaxed text-ink-soft">{service.description}</p>
        <dl className="mt-5 space-y-1.5 text-sm">
          <div className="flex gap-3"><dt className="w-20 shrink-0 text-ink-soft">Best for</dt><dd>{service.bestFor}</dd></div>
          <div className="flex gap-3"><dt className="w-20 shrink-0 text-ink-soft">Timeline</dt><dd>{service.timeline}</dd></div>
        </dl>
      </div>
      <div>
        <ul className="space-y-1.5 text-[15px]">
          {service.outcomes.map((outcome) => <li key={outcome} className="flex gap-3"><span className="text-ink-soft">—</span>{outcome}</li>)}
        </ul>
        <a
          href="/#contact"
          onClick={() => window.dispatchEvent(new CustomEvent('select-service', { detail: service.title }))}
          aria-label={`Start a ${service.title} project`}
          className="mt-6 inline-block border-b border-ink pb-0.5 text-sm font-medium transition hover:border-brand hover:text-brand"
        >
          Start with this
        </a>
      </div>
    </div>
  ),
}))

export function Services() {
  return (
    <Section id="services" label="01 — Services" title="What we build for businesses like yours.">
      <p className="mb-10 max-w-xl text-lg leading-relaxed text-ink-soft">
        From a business website to a custom application, every service is designed to be genuinely useful to your customers and your team.
      </p>
      <Accordion items={items} defaultOpen={services[0].title} />
    </Section>
  )
}
