import { site } from '../config/site'
import type { FieldErrors, LeadForm } from './validation'

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string; fields?: FieldErrors }

export async function submitLead(form: LeadForm): Promise<SubmitResult> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(`${site.apiUrl}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      signal: controller.signal,
    })

    if (response.ok) return { ok: true }

    const body = (await response.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors }
    if (response.status === 422) return { ok: false, message: body.error ?? 'Please check the form.', fields: body.fields }
    if (response.status === 429) return { ok: false, message: body.error ?? 'Too many attempts. Please try again in a few minutes.' }
    return { ok: false, message: `Something went wrong on our side. Please try again${site.email ? `, or email us at ${site.email}` : ' shortly'}.` }
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === 'AbortError'
    return {
      ok: false,
      message: timedOut
        ? 'The request timed out. Please check your connection and try again.'
        : 'We could not reach the server. Please check your connection and try again.',
    }
  } finally {
    clearTimeout(timer)
  }
}
