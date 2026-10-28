import nodemailer from 'nodemailer'

/** Sends best-effort notifications. Failures are logged, never thrown: the lead is already saved. */
export function createNotifier(config, log = console) {
  const transport = config.smtp
    ? nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.port === 465,
        auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
      })
    : null

  return async function notify(lead) {
    const jobs = []

    if (transport && config.smtp.to.length) {
      jobs.push(
        transport.sendMail({
          from: config.smtp.from,
          to: config.smtp.to,
          replyTo: lead.email,
          subject: `New enquiry: ${lead.service} — ${lead.name}`,
          text: [
            `Name: ${lead.name}`,
            `Email: ${lead.email}`,
            `Phone: ${lead.phone || '-'}`,
            `Service: ${lead.service}`,
            `Budget: ${lead.budget}`,
            '',
            lead.message,
          ].join('\n'),
        }),
      )
    }

    if (config.webhookUrl) {
      jobs.push(
        fetch(config.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(8000),
        }),
      )
    }

    const results = await Promise.allSettled(jobs)
    for (const result of results) {
      if (result.status === 'rejected') log.error('Notification failed:', result.reason?.message ?? result.reason)
    }
  }
}
