export function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-32">
      <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
        Websites and software that bring you more customers.
      </h1>

      <div className="mt-14 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
        <p className="max-w-md text-lg leading-relaxed text-ink-soft md:col-span-5">
          We build websites, apps and AI tools for growing businesses, from the first call to launch. Clear scope, weekly previews, and you own the code.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-7 md:justify-end">
          <a href="/#contact" className="bg-ink px-7 py-4 text-sm font-medium text-white transition hover:bg-brand">
            Tell us about your project
          </a>
          <a href="/#services" className="border-b border-ink pb-0.5 text-sm font-medium transition hover:border-brand hover:text-brand">
            See what we build
          </a>
        </div>
      </div>

      <p className="mt-16 text-sm text-ink-soft">Fixed-scope estimates&ensp;·&ensp;Weekly previews&ensp;·&ensp;You own the code&ensp;·&ensp;Support after launch</p>
    </section>
  )
}
