import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs/promises'
import { createApp } from '../src/app.js'
import { createStore } from '../src/store.js'

let server
let base
let dir
const notified = []

const valid = {
  name: 'Asha Rao',
  email: 'asha@example.com',
  phone: '+91 98765 43210',
  service: 'Website development',
  budget: '₹50k – ₹2L',
  message: 'We need a new website for our clinic.',
  consent: true,
  website: '',
}

const post = (body) =>
  fetch(`${base}/api/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

before(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'lts-'))
  const config = { allowedOrigins: ['http://localhost:5173'], adminToken: 'secret', rateLimitMax: 100 }
  const app = createApp({
    config,
    store: createStore(path.join(dir, 'leads.ndjson')),
    notify: async (lead) => { notified.push(lead) },
  })
  await new Promise((resolve) => { server = app.listen(0, resolve) })
  base = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  await new Promise((resolve) => server.close(resolve))
  await fs.rm(dir, { recursive: true, force: true })
})

test('stores a valid lead and notifies', async () => {
  const res = await post(valid)
  assert.equal(res.status, 201)
  assert.equal(notified.length, 1)
  assert.equal(notified[0].email, 'asha@example.com')
})

test('rejects invalid input with field errors', async () => {
  const res = await post({ ...valid, email: 'nope', message: 'short', consent: false })
  assert.equal(res.status, 422)
  const body = await res.json()
  assert.ok(body.fields.email)
  assert.ok(body.fields.message)
  assert.ok(body.fields.consent)
})

test('honeypot gets fake success and stores nothing', async () => {
  const before = notified.length
  const res = await post({ ...valid, website: 'http://spam.example' })
  assert.equal(res.status, 201)
  assert.equal(notified.length, before)
})

test('listing leads requires the admin token', async () => {
  assert.equal((await fetch(`${base}/api/leads`)).status, 401)
  const res = await fetch(`${base}/api/leads`, { headers: { Authorization: 'Bearer secret' } })
  assert.equal(res.status, 200)
  const { leads } = await res.json()
  assert.equal(leads.length, 1)
})

test('malformed JSON returns 400', async () => {
  const res = await fetch(`${base}/api/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' })
  assert.equal(res.status, 400)
})
