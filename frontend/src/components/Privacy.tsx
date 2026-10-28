import { site } from '../config/site'

/** Starter privacy notice. Have it reviewed against the laws that apply to you (e.g. India's DPDP Act, GDPR). */
export function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <a href="/#home" className="text-sm font-semibold text-brand">← Back to site</a>
      <h1 className="mt-4 text-4xl font-extrabold">Privacy notice</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>

      <div className="mt-8 space-y-6 leading-relaxed text-ink-soft [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
        <section><h2>What we collect</h2><p>When you send an enquiry we collect your name, email address, optional phone number, the service and budget range you select, and your message.</p></section>
        <section><h2>Why we collect it</h2><p>We use these details only to reply to your enquiry and to discuss a possible project. We do not sell your data or use it for unrelated marketing.</p></section>
        <section><h2>Who can see it</h2><p>Your enquiry is stored on our server and sent to our team by email. We may use trusted service providers (such as hosting and email delivery) to operate this, and they may only process data on our behalf.</p></section>
        <section><h2>How long we keep it</h2><p>We keep enquiries only as long as needed to respond and for a reasonable period afterwards, then delete them.</p></section>
        <section><h2>Your rights</h2><p>You can ask us to access, correct or delete your data at any time{site.email ? <> by emailing <a className="font-semibold text-brand" href={`mailto:${site.email}`}>{site.email}</a></> : ' by contacting us through the enquiry form'}.</p></section>
      </div>
    </article>
  )
}
