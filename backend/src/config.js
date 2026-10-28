import path from 'node:path'

const list = (value) => (value ?? '').split(',').map((item) => item.trim()).filter(Boolean)

export function loadConfig(env = process.env) {
  return {
    port: Number(env.PORT ?? 4000),
    allowedOrigins: list(env.ALLOWED_ORIGINS ?? 'http://localhost:5173'),
    dataFile: path.resolve(env.DATA_FILE ?? './data/leads.ndjson'),
    adminToken: env.ADMIN_TOKEN ?? '',
    rateLimitMax: Number(env.RATE_LIMIT_MAX ?? 5),
    smtp: env.SMTP_HOST
      ? {
          host: env.SMTP_HOST,
          port: Number(env.SMTP_PORT ?? 587),
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
          from: env.MAIL_FROM ?? env.SMTP_USER,
          to: list(env.NOTIFY_TO),
        }
      : null,
    webhookUrl: env.WEBHOOK_URL ?? '',
  }
}
