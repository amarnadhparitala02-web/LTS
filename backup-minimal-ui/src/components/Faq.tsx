import { site } from '../config/site'
import { faqs } from '../data/content'
import { Accordion, type AccordionItem } from './Accordion'
import { Section } from './Section'

const items: AccordionItem[] = faqs.map((item) => ({
  id: item.q,
  title: item.q,
  content: <p className="max-w-2xl leading-relaxed text-ink-soft">{item.a}</p>,
}))

export function Faq() {
  return (
    <Section id="faq" label="04 — FAQ" title="Before you get in touch.">
      <Accordion items={items} />
      <p className="mt-8 text-ink-soft">
        Another question?{' '}
        <a href="/#contact" className="border-b border-ink pb-0.5 font-medium text-ink transition hover:border-brand hover:text-brand">Ask us</a>
        {site.email && <> or email <a href={`mailto:${site.email}`} className="border-b border-ink pb-0.5 font-medium text-ink">{site.email}</a></>}. We respond within one working day.
      </p>
    </Section>
  )
}
