import { loadConfig } from './config.js'
import { createStore } from './store.js'
import { createNotifier } from './notify.js'
import { createApp } from './app.js'

const config = loadConfig()
const app = createApp({ config, store: createStore(config.dataFile), notify: createNotifier(config) })

const server = app.listen(config.port, () => {
  console.log(`LTS API listening on :${config.port}`)
  if (!config.adminToken) console.warn('ADMIN_TOKEN not set: GET /api/leads is disabled.')
  if (!config.smtp && !config.webhookUrl) console.warn('No SMTP/webhook configured: leads are stored but nobody is notified.')
})

for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)))
