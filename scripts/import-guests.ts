// Imports the guest list CSV and creates one household per row.
//
//   node scripts/import-guests.ts <file.csv> [--append]
//
// Refuses to run when households already exist, unless --append is passed,
// so an accidental second run doesn't duplicate every invitation.
import { randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'

import { count } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { guests, households } from '../src/server/db/schema.ts'
import { parseGuestCsv } from './guest-csv.ts'

const args = process.argv.slice(2)
const file = args.find((arg) => !arg.startsWith('--'))
const append = args.includes('--append')

if (!file) {
  console.error('Usage: node scripts/import-guests.ts <file.csv> [--append]')
  process.exit(1)
}

const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not set')

const imported = parseGuestCsv(readFileSync(file, 'utf8'))
const client = postgres(url, { max: 1 })
const db = drizzle(client)

try {
  const [{ value: existing }] = await db
    .select({ value: count() })
    .from(households)
  if (existing > 0 && !append) {
    console.error(
      `${existing} households already exist. Pass --append to add more anyway.`,
    )
    process.exitCode = 1
  } else {
    await db.transaction(async (tx) => {
      for (const household of imported) {
        // 12 base64url characters = 72 random bits.
        const id = randomBytes(9).toString('base64url')
        await tx.insert(households).values({ id })
        await tx.insert(guests).values(
          household.guests.map((guest, sortOrder) => ({
            householdId: id,
            name: guest.name,
            gender: guest.gender,
            sortOrder,
          })),
        )
      }
    })
    const guestCount = imported.reduce((sum, h) => sum + h.guests.length, 0)
    console.log(
      `Imported ${imported.length} households with ${guestCount} guests.`,
    )
  }
} finally {
  await client.end()
}
