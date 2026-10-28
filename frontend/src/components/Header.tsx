import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { site } from '../config/site'

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="/#home" aria-label={`${site.name} home`} className="group flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-indigo-500 font-display text-lg font-extrabold text-white shadow-md shadow-brand/30 transition group-hover:rotate-[-6deg]">
        L<span className="text-accent">.</span>
      </span>
      <span className={`font-display text-[15px] font-extrabold leading-tight ${light ? 'text-white' : 'text-ink'}`}>
        {site.name}
        <small className={`block text-[11px] font-semibold tracking-wide ${light ? 'text-white/60' : 'text-ink-soft'}`}>{site.tagline}</small>
      </span>
    </a>
  )
}

const links = [
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Approach' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'faq', label: 'FAQ' },
]

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    // Contact is observed too, so no nav link stays highlighted while it is on screen.
    const sections = [...links.map((link) => link.id), 'contact'].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!sections.length || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return active
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-xl transition-all duration-300 sm:px-5 ${
          scrolled ? 'border-line bg-white/85 shadow-lg shadow-ink/10' : 'border-white bg-white/95 shadow-lg shadow-black/20'
        }`}
      >
        <Brand />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === link.id ? 'bg-ink text-white' : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/40 sm:inline-flex"
          >
            Discuss a project <ArrowUpRight size={16} />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 top-[4.75rem] z-30 bg-ink/95 px-6 pb-10 pt-6 backdrop-blur-xl lg:hidden">
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={link.id}>
                <a
                  href={`/#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-bold text-white"
                >
                  <span><span className="mr-3 text-sm text-accent">0{index + 1}</span>{link.label}</span>
                  <ArrowUpRight size={20} className="text-white/40" />
                </a>
              </li>
            ))}
          </ul>
          <a href="/#contact" onClick={() => setOpen(false)} className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-indigo-500 py-4 font-semibold text-white">
            Discuss a project <ArrowUpRight size={18} />
          </a>
        </div>
      )}
    </header>
  )
}
