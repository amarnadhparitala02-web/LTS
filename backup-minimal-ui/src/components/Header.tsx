import { useEffect, useState } from 'react'
import { site } from '../config/site'

export function Brand() {
  return (
    <a href="/#home" aria-label={`${site.name} home`} className="text-[15px] font-semibold tracking-tight">
      {site.name}
    </a>
  )
}

const links = [
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Approach' },
  { id: 'about', label: 'About' },
  { id: 'faq', label: 'FAQ' },
]

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    // Contact is observed too, so no nav link stays underlined while it is on screen.
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
  const active = useActiveSection()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main navigation">
        <Brand />

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`/#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`border-b pb-0.5 text-sm transition ${active === link.id ? 'border-ink text-ink' : 'border-transparent text-ink-soft hover:text-ink'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#contact" className="bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand">Contact</a>
        </div>

        <button
          type="button"
          className="text-sm font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper px-6 pb-6 md:hidden">
          <ul>
            {[...links, { id: 'contact', label: 'Contact' }].map((link) => (
              <li key={link.id}>
                <a href={`/#${link.id}`} onClick={() => setOpen(false)} className="block border-b border-line py-4 text-lg">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
