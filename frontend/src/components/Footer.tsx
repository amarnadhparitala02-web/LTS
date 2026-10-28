import { site } from '../config/site'
import { Brand } from './Header'

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 border-t border-white/10 px-5 py-10">
        <Brand light />
        <p className="max-w-xs text-sm text-white/60">Thoughtful digital solutions for growing businesses.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-5 text-sm text-white/70">
          {site.social.map((item) => <a key={item.label} href={item.href} rel="noopener noreferrer" target="_blank" className="hover:text-white">{item.label}</a>)}
          <a href="/#/privacy" className="hover:text-white">Privacy</a>
          <a href="/#home" className="hover:text-white">Back to top ↑</a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-8 text-xs text-white/40">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  )
}
