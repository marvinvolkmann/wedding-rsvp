import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema.ts'

function createDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  return drizzle(postgres(url, { max: 5 }), { schema })
}

// Reuse one connection pool across dev hot reloads.
const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof createDb>
}

export function getDb() {
  globalForDb.db ??= createDb()
  return globalForDb.db
}
