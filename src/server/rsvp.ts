import { createServerFn } from '@tanstack/react-start'
import { asc, eq } from 'drizzle-orm'

import { getDeadline, isRsvpOpen } from './config.ts'
import { getDb } from './db/index.ts'
import { guests, households, rsvps, type Gender } from './db/schema.ts'

export const MAX_MESSAGE_LENGTH = 2000

export type Invite =
  | { status: 'none' }
  | { status: 'invalid' }
  | {
      status: 'ok'
      guests: { name: string; gender: Gender }[]
      deadline: string
      open: boolean
      rsvp: {
        attending: boolean
        message: string | null
        respondedAt: string
      } | null
    }

function parseToken(token: unknown) {
  return typeof token === 'string' && /^[\w-]{1,64}$/.test(token)
    ? token
    : undefined
}

export const getInvite = createServerFn({ method: 'GET' })
  .validator((token: unknown) => (typeof token === 'string' ? token : ''))
  .handler(async ({ data }): Promise<Invite> => {
    if (!data) return { status: 'none' }
    const token = parseToken(data)
    if (!token) return { status: 'invalid' }

    const db = getDb()
    const [household] = await db
      .select({ id: households.id })
      .from(households)
      .where(eq(households.id, token))
    if (!household) return { status: 'invalid' }

    const [members, [answer]] = await Promise.all([
      db
        .select({ name: guests.name, gender: guests.gender })
        .from(guests)
        .where(eq(guests.householdId, token))
        .orderBy(asc(guests.sortOrder), asc(guests.id)),
      db.select().from(rsvps).where(eq(rsvps.householdId, token)),
    ])

    return {
      status: 'ok',
      guests: members,
      deadline: getDeadline().toISOString(),
      open: isRsvpOpen(),
      rsvp: answer
        ? {
            attending: answer.attending,
            message: answer.message,
            respondedAt: answer.respondedAt.toISOString(),
          }
        : null,
    }
  })

type RsvpInput = { token: string; attending: boolean; message: string }

export const submitRsvp = createServerFn({ method: 'POST' })
  .validator((input: unknown): RsvpInput => {
    const { token, attending, message } = (input ?? {}) as Record<
      string,
      unknown
    >
    const parsedToken = parseToken(token)
    if (!parsedToken) throw new Error('Invalid invite')
    if (typeof attending !== 'boolean') throw new Error('Invalid answer')
    if (typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH) {
      throw new Error('Invalid message')
    }
    return { token: parsedToken, attending, message: message.trim() }
  })
  .handler(async ({ data }) => {
    if (!isRsvpOpen()) throw new Error('The RSVP deadline has passed')

    const db = getDb()
    const [household] = await db
      .select({ id: households.id })
      .from(households)
      .where(eq(households.id, data.token))
    if (!household) throw new Error('Invalid invite')

    const now = new Date()
    const values = {
      attending: data.attending,
      message: data.message || null,
      respondedAt: now,
    }
    await db
      .insert(rsvps)
      .values({ householdId: data.token, ...values })
      .onConflictDoUpdate({ target: rsvps.householdId, set: values })
  })
