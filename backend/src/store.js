import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

/** Append-only NDJSON lead store. Swap for a database when volume grows. */
export function createStore(file) {
  let queue = Promise.resolve()

  async function add(lead) {
    const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...lead }
    queue = queue.then(async () => {
      await fs.mkdir(path.dirname(file), { recursive: true })
      await fs.appendFile(file, JSON.stringify(record) + '\n', 'utf8')
    })
    await queue
    return record
  }

  async function list() {
    try {
      const raw = await fs.readFile(file, 'utf8')
      return raw.split('\n').filter(Boolean).map((line) => JSON.parse(line)).reverse()
    } catch (error) {
      if (error.code === 'ENOENT') return []
      throw error
    }
  }

  return { add, list }
}
