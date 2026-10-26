import { createServerFn } from '@tanstack/react-start'
import {
  getCookie,
  getRequestHeader,
  setCookie,
} from '@tanstack/react-start/server'

import { defaultLang, isLang, type Lang } from './messages.ts'

const LANG_COOKIE = 'lang'

// Picks the language from the cookie, then the browser's Accept-Language header.
export const getLang = createServerFn({ method: 'GET' }).handler(
  (): Lang => {
    const fromCookie = getCookie(LANG_COOKIE)
    if (isLang(fromCookie)) return fromCookie

    const accepted = getRequestHeader('accept-language') ?? ''
    for (const part of accepted.split(',')) {
      const code = part.trim().slice(0, 2).toLowerCase()
      if (isLang(code)) return code
    }
    return defaultLang
  },
)

export const setLang = createServerFn({ method: 'POST' })
  .validator((lang: unknown): Lang => {
    if (!isLang(lang)) throw new Error('Unsupported language')
    return lang
  })
  .handler(({ data }) => {
    setCookie(LANG_COOKIE, data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  })
