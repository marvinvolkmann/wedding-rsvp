import { createHmac, timingSafeEqual } from 'node:crypto'

import { createServerFn } from '@tanstack/react-start'
import {
  deleteCookie,
  getCookie,
  getRequestUrl,
  setCookie,
} from '@tanstack/react-start/server'
import { asc, desc } from 'drizzle-orm'

import { getDb } from './db/index.ts'
import { guests, households, rsvps } from './db/schema.ts'

const SESSION_COOKIE = 'admin_session'

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD
  if (!password) throw new Error('ADMIN_PASSWORD is not set')
  return password
}

// The session value is derived from the password, so changing the
// password logs out every existing session.
function sessionValue() {
  return createHmac('sha256', getAdminPassword())
    .update('wedding-admin-session')
    .digest('base64url')
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

function isLoggedIn() {
  const cookie = getCookie(SESSION_COOKIE)
  return !!cookie && safeEqual(cookie, sessionValue())
}

export const login = createServerFn({ method: 'POST' })
  .validator((password: unknown) =>
    typeof password === 'string' ? password : '',
  )
  .handler(({ data }) => {
    if (!safeEqual(data, getAdminPassword())) return { ok: false }
    setCookie(SESSION_COOKIE, sessionValue(), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    })
    return { ok: true }
  })

export const logout = createServerFn({ method: 'POST' }).handler(() => {
  deleteCookie(SESSION_COOKIE, { path: '/' })
})

export type AdminHousehold = {
  id: string
  names: string[]
  link: string
  attending: boolean | null
  message: string | null
  respondedAt: string | null
}

export type AdminOverview =
  | { authorized: false }
  | { authorized: true; households: AdminHousehold[] }

export const getAdminOverview = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AdminOverview> => {
    if (!isLoggedIn()) return { authorized: false }

    const db = getDb()
    const [allHouseholds, allGuests, allRsvps] = await Promise.all([
      db.select().from(households).orderBy(desc(households.createdAt)),
      db
        .select()
        .from(guests)
        .orderBy(asc(guests.sortOrder), asc(guests.id)),
      db.select().from(rsvps),
    ])

    const origin = getRequestUrl().origin
    const rsvpByHousehold = new Map(allRsvps.map((r) => [r.householdId, r]))

    return {
      authorized: true,
      households: allHouseholds.map((h) => {
        const rsvp = rsvpByHousehold.get(h.id)
        return {
          id: h.id,
          names: allGuests
            .filter((g) => g.householdId === h.id)
            .map((g) => g.name),
          link: `${origin}/?invite=${h.id}`,
          attending: rsvp?.attending ?? null,
          message: rsvp?.message ?? null,
          respondedAt: rsvp?.respondedAt.toISOString() ?? null,
        }
      }),
    }
  },
)
