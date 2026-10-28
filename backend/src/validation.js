import { z } from 'zod'

export const SERVICES = [
  'Website development',
  'Web & mobile apps',
  'AI customer support',
  'Custom CRM systems',
  'E-commerce websites',
  'Business software',
  'Not sure yet',
]

export const BUDGETS = ['Under ₹50k', '₹50k – ₹2L', '₹2L – ₹5L', '₹5L+', 'Not sure yet']

const clean = (max) => z.string().trim().max(max)

export const leadSchema = z.object({
  name: clean(100).min(2, 'Please enter your name'),
  email: clean(254).pipe(z.email('Please enter a valid email address')),
  phone: clean(30).regex(/^[+\d\s()-]*$/, 'Phone may only contain digits, spaces, + ( ) -').optional().default(''),
  service: z.enum(SERVICES),
  budget: z.enum(BUDGETS).optional().default('Not sure yet'),
  message: clean(3000).min(10, 'Please tell us a little more (at least 10 characters)'),
  consent: z.literal(true, { error: 'Please accept the privacy notice' }),
  // Honeypot: real users never fill this in.
  website: z.string().max(500).optional().default(''),
})
