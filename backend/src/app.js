import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import { leadSchema } from './validation.js'

function safeEqual(a, b) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && crypto.timingSafeEqual(left, right)
}

export function createApp({ config, store, notify }) {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1)

  app.use(helmet())
  app.use(
    cors({
      origin(origin, callback) {
        // Same-origin / server-to-server requests have no Origin header.
        if (!origin || config.allowedOrigins.includes(origin)) return callback(null, true)
        callback(null, false)
      },
      methods: ['GET', 'POST'],
    }),
  )
  app.use(express.json({ limit: '16kb' }))

  app.get('/api/health', (_req, res) => res.json({ ok: true }))

  const leadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: config.rateLimitMax,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many enquiries from this address. Please try again later.' },
  })

  app.post('/api/leads', leadLimiter, async (req, res, next) => {
    try {
      const parsed = leadSchema.safeParse(req.body)
      if (!parsed.success) {
        const fields = {}
        for (const issue of parsed.error.issues) fields[issue.path.join('.') || 'form'] ??= issue.message
        return res.status(422).json({ error: 'Please check the highlighted fields.', fields })
      }

      const { website, consent, ...data } = parsed.data
      // Bots filling the honeypot get a fake success and nothing is stored.
      if (website) return res.status(201).json({ ok: true })

      const lead = await store.add({ ...data, consentAt: new Date().toISOString() })
      // Fire and forget so a slow mail server never delays the visitor.
      notify(lead).catch((error) => console.error('Notify error:', error))
      res.status(201).json({ ok: true, id: lead.id })
    } catch (error) {
      next(error)
    }
  })

  app.get('/api/leads', async (req, res, next) => {
    try {
      const header = req.get('authorization') ?? ''
      const token = header.startsWith('Bearer ') ? header.slice(7) : ''
      if (!config.adminToken || !safeEqual(token, config.adminToken)) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      res.json({ leads: await store.list() })
    } catch (error) {
      next(error)
    }
  })

  app.use((_req, res) => res.status(404).json({ error: 'Not found' }))

  // eslint-disable-next-line no-unused-vars
  app.use((error, _req, res, _next) => {
    if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' })
    if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Request too large' })
    console.error(error)
    res.status(500).json({ error: 'Something went wrong. Please try again later.' })
  })

  return app
}
