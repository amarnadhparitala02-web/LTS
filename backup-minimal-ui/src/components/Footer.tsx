import { site } from '../config/site'
import { Brand } from './Header'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10">
        <Brand />
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-ink-soft">
          {site.social.map((item) => <a key={item.label} href={item.href} rel="noopener noreferrer" target="_blank" className="hover:text-ink">{item.label}</a>)}
          <a href="/#/privacy" className="hover:text-ink">Privacy</a>
          <a href="/#home" className="hover:text-ink">Back to top</a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-6 pb-8 text-xs text-ink-soft">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  )
}
