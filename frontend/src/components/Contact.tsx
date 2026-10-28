import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { site } from '../config/site'
import { budgetOptions, serviceOptions } from '../data/content'
import { submitLead } from '../lib/api'
import { emptyForm, validateLead, type FieldErrors, type LeadForm } from '../lib/validation'
import { Reveal } from './Reveal'

const input = 'mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 aria-[invalid=true]:border-red-500'

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}

function ContactItem({ icon, label, href }: { icon: ReactNode; label: string; href?: string }) {
  const content = <><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">{icon}</span><span>{label}</span></>
  const cls = 'flex items-center gap-3 font-medium'
  return href ? <a href={href} className={`${cls} hover:text-brand`}>{content}</a> : <div className={cls}>{content}</div>
}

export function Contact() {
  const [form, setForm] = useState<LeadForm>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null)

  // The Services cards pre-select the matching option when "Start with this" is clicked.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const service = (event as CustomEvent<string>).detail
      if (serviceOptions.includes(service)) setForm((previous) => ({ ...previous, service }))
    }
    window.addEventListener('select-service', onSelect)
    return () => window.removeEventListener('select-service', onSelect)
  }, [])

  const hasDirectContact = site.email || site.phone || site.whatsapp || site.location

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
    <section id="contact" className="bg-ink py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">Start a conversation</p>
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">What are you looking to build?</h2>
          <p className="mt-5 text-lg text-white/70">Tell us about your idea, what you want to improve or what you would like to explore. A few lines is enough; we will ask for anything else. We respond within one working day.</p>
          {hasDirectContact && (
            <div className="mt-8 space-y-4 text-white">
              {site.email && <ContactItem icon={<Mail size={18} />} label={site.email} href={`mailto:${site.email}`} />}
              {site.phone && <ContactItem icon={<Phone size={18} />} label={site.phone} href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} />}
              {site.whatsapp && <ContactItem icon={<MessageCircle size={18} />} label="Chat on WhatsApp" href={`https://wa.me/${site.whatsapp}`} />}
              {site.location && <ContactItem icon={<MapPin size={18} />} label={site.location} />}
            </div>
          )}
        </Reveal>

        <Reveal>
          <form onSubmit={submit} noValidate className="space-y-5 rounded-3xl bg-paper p-6 text-ink sm:p-8">
            <h3 className="text-2xl font-bold">Tell us about your project</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="f-name" label="Your name *" error={errors.name}>
                <input {...aria('name')} value={form.name} className={input} autoComplete="name" required />
              </Field>
              <Field id="f-email" label="Email address *" error={errors.email}>
                <input {...aria('email')} type="email" value={form.email} className={input} autoComplete="email" required />
              </Field>
              <Field id="f-phone" label="Phone (optional)" error={errors.phone}>
                <input {...aria('phone')} type="tel" value={form.phone} className={input} autoComplete="tel" />
              </Field>
              <Field id="f-service" label="What do you need? *">
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
            <Field id="f-message" label="Tell us about your idea *" error={errors.message}>
              <textarea {...aria('message')} value={form.message} rows={5} className={input} placeholder="Goals, timeline, anything that helps…" required />
            </Field>

            {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} /></label>
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm">
                <input {...aria('consent')} type="checkbox" checked={form.consent} className="mt-1 h-4 w-4 accent-brand" />
                <span>I agree to LTS Digital Solutions using my details to respond to this enquiry, as described in the <a href="/#/privacy" className="font-semibold text-brand underline">privacy notice</a>.</span>
              </label>
              {errors.consent && <p id="f-consent-error" className="mt-1.5 text-sm text-red-600">{errors.consent}</p>}
            </div>

            <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-white transition hover:bg-brand disabled:opacity-60">
              {sending ? 'Sending…' : <>Send my enquiry <ArrowRight size={18} /></>}
            </button>

            <div aria-live="polite">
              {result && (
                <p role={result.ok ? 'status' : 'alert'} className={`flex items-start gap-2 rounded-xl p-4 text-sm font-medium ${result.ok ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                  {result.ok ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
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
