const env = import.meta.env

const clean = (value: string | undefined) => (value ?? '').trim()

/** Contact details come from env vars; anything unset is simply not rendered. */
export const site = {
  name: 'LTS Digital Solutions',
  tagline: 'Software · Web · Digital',
  email: clean(env.VITE_CONTACT_EMAIL),
  phone: clean(env.VITE_CONTACT_PHONE),
  whatsapp: clean(env.VITE_WHATSAPP).replace(/\D/g, ''),
  location: clean(env.VITE_LOCATION),
  social: [
    { label: 'LinkedIn', href: clean(env.VITE_LINKEDIN_URL) },
    { label: 'Instagram', href: clean(env.VITE_INSTAGRAM_URL) },
    { label: 'GitHub', href: clean(env.VITE_GITHUB_URL) },
  ].filter((item) => item.href),
  apiUrl: clean(env.VITE_API_URL).replace(/\/$/, ''),
}
