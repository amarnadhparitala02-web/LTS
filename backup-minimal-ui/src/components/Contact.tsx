import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { site } from '../config/site'
import { budgetOptions, serviceOptions } from '../data/content'
import { submitLead } from '../lib/api'
import { emptyForm, validateLead, type FieldErrors, type LeadForm } from '../lib/validation'
import { Reveal } from './Reveal'

const input = 'mt-2 w-full border border-line bg-white px-4 py-3 text-[15px] outline-none transition focus:border-ink aria-[invalid=true]:border-red-600'

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  )
}

export function Contact() {
  const [form, setForm] = useState<LeadForm>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)

  // The Services rows pre-select the matching option when "Start with this" is clicked.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const service = (event as CustomEvent<string>).detail
      if (serviceOptions.includes(service)) setForm((previous) => ({ ...previous, service }))
    }
    window.addEventListener('select-service', onSelect)
    return () => window.removeEventListener('select-service', onSelect)
  }, [])

  const direct = [
    site.email && { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    site.phone && { label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, '')}` },
    site.whatsapp && { label: 'WhatsApp', value: 'Message us', href: `https://wa.me/${site.whatsapp}` },
    site.location && { label: 'Location', value: site.location, href: '' },
  ].filter(Boolean) as { label: string; value: string; href: string }[]

  const update = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target
    const next = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    setForm((previous) => ({ ...previous, [name]: next }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    setResult(null)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const found = validateLead(form)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setSending(true)
    const response = await submitLead(form)
    setSending(false)
    if (response.ok) {
      setForm(emptyForm)
      setResult({ ok: true, message: 'Thank you. We have received your enquiry and will respond within one working day.' })
    } else {
      if (response.fields) setErrors(response.fields)
      setResult({ ok: false, message: response.message })
    }
  }

  const aria = (name: keyof LeadForm) => ({
    id: `f-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `f-${name}-error` : undefined,
    onChange: update,
  })

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <Reveal className="lg:col-span-4">
          <p className="text-sm text-ink-soft">05 — Contact</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">What are you looking to build?</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Tell us about your idea, what you want to improve or what you would like to explore. A few lines is enough; we will ask for anything else. We respond within one working day.
          </p>
          {direct.length > 0 && (
            <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
              {direct.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <dt className="w-20 shrink-0 text-ink-soft">{item.label}</dt>
                  <dd>{item.href ? <a href={item.href} className="border-b border-ink pb-0.5 hover:border-brand hover:text-brand">{item.value}</a> : item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        <Reveal className="lg:col-span-8">
          <form onSubmit={submit} noValidate className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="f-name" label="Name *" error={errors.name}>
                <input {...aria('name')} value={form.name} className={input} autoComplete="name" required />
              </Field>
              <Field id="f-email" label="Email *" error={errors.email}>
                <input {...aria('email')} type="email" value={form.email} className={input} autoComplete="email" required />
              </Field>
              <Field id="f-phone" label="Phone (optional)" error={errors.phone}>
                <input {...aria('phone')} type="tel" value={form.phone} className={input} autoComplete="tel" />
              </Field>
              <Field id="f-service" label="Service">
                <select {...aria('service')} value={form.service} className={input}>
                  {serviceOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </Field>
            </div>
            <Field id="f-budget" label="Approximate budget">
              <select {...aria('budget')} value={form.budget} className={input}>
                {budgetOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </Field>
            <Field id="f-message" label="Your project *" error={errors.message}>
              <textarea {...aria('message')} value={form.message} rows={5} className={input} placeholder="Goals, timeline, anything that helps" required />
            </Field>

            {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} /></label>
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm text-ink-soft">
                <input {...aria('consent')} type="checkbox" checked={form.consent} className="mt-0.5 h-4 w-4 accent-ink" />
                <span>I agree to LTS Digital Solutions using my details to respond to this enquiry, as described in the <a href="/#/privacy" className="border-b border-ink pb-0.5 text-ink">privacy notice</a>.</span>
              </label>
              {errors.consent && <p id="f-consent-error" className="mt-1.5 text-sm text-red-700">{errors.consent}</p>}
            </div>

            <button type="submit" disabled={sending} className="bg-ink px-8 py-4 text-sm font-medium text-white transition hover:bg-brand disabled:opacity-60">
              {sending ? 'Sending…' : 'Send my enquiry'}
            </button>

            <div aria-live="polite">
              {result && (
                <p role={result.ok ? 'status' : 'alert'} className={`border-l-2 py-1 pl-4 text-sm ${result.ok ? 'border-ink text-ink' : 'border-red-600 text-red-700'}`}>
                  {result.message}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
