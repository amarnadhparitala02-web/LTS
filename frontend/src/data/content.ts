import { Bot, Code2, PanelsTopLeft, ShoppingBag, Smartphone, Workflow, type LucideIcon } from 'lucide-react'

export interface Service {
  title: string
  tagline: string
  description: string
  bestFor: string
  outcomes: string[]
  timeline: string
  badge?: string
  /** Grid placement on large screens. */
  span: string
  /** Optional illustration shown beside the content on wide cards. */
  visual?: 'website' | 'dashboard'
  /** Full Tailwind class strings (kept literal so Tailwind can see them). */
  tone: { icon: string; glow: string; chip: string; ring: string }
  Icon: LucideIcon
}

export const services: Service[] = [
  {
    title: 'Website development',
    tagline: 'Turn visitors into enquiries',
    description: 'Fast, responsive websites that explain your business clearly and make the next step obvious.',
    bestFor: 'Clinics, shops, consultants and local businesses',
    outcomes: ['Mobile-first design', 'SEO-ready structure', 'Fast load times', 'Easy to update'],
    timeline: 'Typically 2–4 weeks',
    badge: 'Most requested',
    span: 'lg:col-span-2',
    visual: 'website',
    tone: { icon: 'from-indigo-500 to-violet-500', glow: 'from-indigo-500/15', chip: 'bg-indigo-50 text-indigo-700', ring: 'hover:border-indigo-300' },
    Icon: Code2,
  },
  {
    title: 'Web & mobile apps',
    tagline: 'Put your process in your customers\' hands',
    description: 'Useful digital products built around the way your customers and team actually work.',
    bestFor: 'Startups and teams moving a process online',
    outcomes: ['Web apps and PWAs', 'iOS and Android', 'Secure sign-in and roles'],
    timeline: 'Agreed after discovery',
    span: '',
    tone: { icon: 'from-sky-500 to-cyan-500', glow: 'from-sky-500/15', chip: 'bg-sky-50 text-sky-700', ring: 'hover:border-sky-300' },
    Icon: Smartphone,
  },
  {
    title: 'AI customer support',
    tagline: 'Answer common questions instantly, hand off when it matters',
    description: 'Practical AI assistants that answer common questions and guide customers to the next step.',
    bestFor: 'Businesses with repeat customer questions',
    outcomes: ['Trained on your content', 'Hand-off to a human', 'Website and WhatsApp'],
    timeline: 'Agreed after discovery',
    badge: 'AI',
    span: '',
    tone: { icon: 'from-amber-500 to-orange-500', glow: 'from-amber-500/15', chip: 'bg-amber-50 text-amber-700', ring: 'hover:border-amber-300' },
    Icon: Bot,
  },
  {
    title: 'Custom CRM systems',
    tagline: 'Know who to contact next, every day',
    description: 'Keep leads, follow-ups and customer details organised in a system shaped to your sales process.',
    bestFor: 'Sales teams outgrowing spreadsheets',
    outcomes: ['Lead pipelines', 'Reminders and tasks', 'Reports you can act on'],
    timeline: 'Agreed after discovery',
    span: '',
    tone: { icon: 'from-emerald-500 to-teal-500', glow: 'from-emerald-500/15', chip: 'bg-emerald-50 text-emerald-700', ring: 'hover:border-emerald-300' },
    Icon: PanelsTopLeft,
  },
  {
    title: 'E-commerce websites',
    tagline: 'A store that is easy to buy from',
    description: 'A clear shopping experience with organised products, helpful details and a smooth checkout.',
    bestFor: 'Brands selling products online',
    outcomes: ['Catalogue and inventory', 'Online payments', 'Order management'],
    timeline: 'Agreed after discovery',
    span: '',
    tone: { icon: 'from-rose-500 to-pink-500', glow: 'from-rose-500/15', chip: 'bg-rose-50 text-rose-700', ring: 'hover:border-rose-300' },
    Icon: ShoppingBag,
  },
  {
    title: 'Business software',
    tagline: 'Less repetitive work, more visibility',
    description: 'Custom dashboards and workflow tools that remove repetitive work and give you a clear view of the business.',
    bestFor: 'Teams with manual, repetitive processes',
    outcomes: ['Workflow automation', 'Live dashboards', 'Integrations with your tools', 'Role-based access'],
    timeline: 'Agreed after discovery',
    span: 'lg:col-span-3',
    visual: 'dashboard',
    tone: { icon: 'from-violet-500 to-fuchsia-500', glow: 'from-violet-500/15', chip: 'bg-violet-50 text-violet-700', ring: 'hover:border-violet-300' },
    Icon: Workflow,
  },
]

export const serviceOptions = [...services.map((service) => service.title), 'Not sure yet']

export const budgetOptions = ['Under ₹50k', '₹50k – ₹2L', '₹2L – ₹5L', '₹5L+', 'Not sure yet']

export interface ProcessStep {
  step: string
  title: string
  summary: string
  does: string[]
  gets: string[]
  needs: string[]
}

export const process: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    summary: 'We learn your business before we touch a screen, so we build the right thing.',
    does: ['Talk through your goals, users and constraints', 'Review any existing site, tools and content', 'Agree priorities and what is out of scope'],
    gets: ['A written scope', 'A fixed-scope estimate', 'A proposed plan with milestones'],
    needs: ['A short call to talk through your goals', 'Examples you like (and dislike)', 'Access to existing site or tools, if any'],
  },
  {
    step: '02',
    title: 'Design',
    summary: 'You see and react to the experience before any code is written.',
    does: ['Map pages and user flows', 'Create wireframes', 'Develop a visual direction'],
    gets: ['Wireframes to review', 'A visual direction: colours, type and layout', 'A chance to give feedback before building'],
    needs: ['Brand assets (logo, colours) if you have them', 'Feedback on the designs', 'Your content, or a plan to create it'],
  },
  {
    step: '03',
    title: 'Build',
    summary: 'Development happens in small steps, with working previews so progress is visible.',
    does: ['Build in small, testable increments', 'Share a working preview regularly', 'Connect forms, payments or integrations'],
    gets: ['A live preview link', 'Regular progress updates', 'Software tested as it is built'],
    needs: ['Timely feedback on previews', 'Answers to open questions', 'Final content and images'],
  },
  {
    step: '04',
    title: 'Launch',
    summary: 'We check everything carefully, then manage the move to your live domain.',
    does: ['Test on real devices and browsers', 'Check speed, accessibility and security', 'Manage go-live and handover'],
    gets: ['Your product live on your domain', 'Handover of code, designs and content', 'A walkthrough of how it works'],
    needs: ['Domain and hosting access', 'Final sign-off', 'A go-live date that suits you'],
  },
  {
    step: '05',
    title: 'Support',
    summary: 'Launch is the start, not the end. We keep it healthy and keep improving it.',
    does: ['Monitor and fix issues', 'Make small improvements', 'Plan the next set of features with you'],
    gets: ['Ongoing maintenance options', 'A clear contact for issues', 'Suggestions based on how it is used'],
    needs: ['Tell us what is and is not working', 'Share your goals for the next phase'],
  },
]

export const promises = [
  { title: 'Fixed-scope estimate', text: 'Agreed before work starts' },
  { title: 'Weekly previews', text: 'See real progress' },
  { title: 'You own the code', text: 'Once the project is paid for' },
  { title: 'Support after launch', text: 'Plans to suit you' },
]

export const principles = [
  { title: 'Understand first', text: 'We start by learning what you need and what success should look like.' },
  { title: 'Keep it clear', text: 'Practical choices, honest communication and visible progress.' },
  { title: 'Build for people', text: 'Accessible, useful experiences that work on every screen size.' },
  { title: 'Stay for the long run', text: 'We support what we build, so launch day is the start, not the end.' },
]

export const goodFit = [
  'Local businesses', 'Startups', 'Clinics & healthcare', 'Retail & e-commerce', 'Consultants & agencies', 'Teams with manual processes',
]

export const stack = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'React Native', 'PostgreSQL', 'Shopify', 'WordPress', 'OpenAI / Claude APIs', 'AWS',
]

export type ConceptType = 'website' | 'dashboard' | 'store'

export const concepts: { category: string; title: string; description: string; type: ConceptType }[] = [
  { category: 'Business website', title: 'A clearer first impression', description: 'A service-business site that makes the offer and next steps obvious.', type: 'website' },
  { category: 'Dashboard', title: 'Information at a glance', description: 'Key numbers and everyday actions brought into one place.', type: 'dashboard' },
  { category: 'E-commerce', title: 'A simpler way to sell online', description: 'Product discovery, clear pricing and an easy checkout.', type: 'store' },
]

export const faqCategories = ['Pricing', 'Process', 'Ownership', 'Support'] as const
export type FaqCategory = (typeof faqCategories)[number]

export const faqs: { category: FaqCategory; q: string; a: string }[] = [
  { category: 'Pricing', q: 'How much does a project cost?', a: 'It depends on scope. A focused business website is a very different project from a custom CRM. After a short discovery call we give a fixed-scope estimate with no hidden extras.' },
  { category: 'Pricing', q: 'Can you work with a small budget?', a: 'Often, yes. Tell us your budget and we will recommend what to build first, and what can wait for a later phase.' },
  { category: 'Pricing', q: 'How does payment work?', a: 'We agree payment terms in writing before work starts, tied to milestones, so you always know what you are paying for.' },
  { category: 'Process', q: 'How long does it take?', a: 'Simple websites typically take 2–4 weeks. Apps, CRMs and e-commerce stores take longer, and we agree a timeline with milestones before starting.' },
  { category: 'Process', q: 'What do you need from me to start?', a: 'A short call to talk through your goals, plus any examples, content and brand assets you already have. If you do not have content yet, we will help you plan it.' },
  { category: 'Process', q: 'Can you work with my existing website or tools?', a: 'Usually, yes. We can improve an existing site or connect new software to the tools you already use.' },
  { category: 'Ownership', q: 'Do I own the code and content?', a: 'Yes. Once the project is paid for, the code, designs and content are yours.' },
  { category: 'Ownership', q: 'How is my data handled?', a: 'Enquiry details are used only to respond to you. See our privacy notice for details.' },
  { category: 'Support', q: 'Do you offer support after launch?', a: 'Yes. We offer maintenance and improvement plans, so you are never left alone after go-live.' },
  { category: 'Support', q: 'Will I be able to update the website myself?', a: 'Where it suits the project, yes. We can build the site so you can edit text and images yourself, and we show you how during handover.' },
  { category: 'Support', q: 'What if I need changes later?', a: 'Just ask. Small changes and new features can be handled on a support plan or as a new, scoped piece of work.' },
]
