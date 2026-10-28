import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/** Shared layout: a quiet label and heading on the left, content on the right, separated by a hairline. */
export function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <Reveal className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <p className="text-sm text-ink-soft">{label}</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
        </Reveal>
        <Reveal className="lg:col-span-8">{children}</Reveal>
      </div>
    </section>
  )
}
