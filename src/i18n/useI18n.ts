import { useRouteContext } from '@tanstack/react-router'

import { messages } from './messages.ts'

export function useI18n() {
  const lang = useRouteContext({ from: '__root__', select: (c) => c.lang })
  return { lang, t: messages[lang] }
}
