export interface LeadForm {
  name: string
  email: string
  phone: string
  service: string
  budget: string
  message: string
  consent: boolean
  /** Honeypot — must stay empty. */
  website: string
}

export type FieldErrors = Partial<Record<keyof LeadForm, string>>

export const emptyForm: LeadForm = {
  name: '',
  email: '',
  phone: '',
  service: 'Website development',
  budget: 'Not sure yet',
  message: '',
  consent: false,
  website: '',
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateLead(form: LeadForm): FieldErrors {
  const errors: FieldErrors = {}
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
  if (form.phone && !/^[+\d\s()-]{7,30}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number or leave it blank.'
  if (form.message.trim().length < 10) errors.message = 'Please tell us a little more (at least 10 characters).'
  if (!form.consent) errors.consent = 'Please accept the privacy notice to continue.'
  return errors
}
