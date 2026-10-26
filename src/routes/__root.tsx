import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { getLang } from '#/i18n/lang.ts'
import { messages } from '#/i18n/messages.ts'
import { useI18n } from '#/i18n/useI18n.ts'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  beforeLoad: async () => ({ lang: await getLang() }),
  head: ({ match }) => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#5a1f2e' },
      // Personal invite links must not end up in search engines.
      { name: 'robots', content: 'noindex, nofollow' },
      { title: messages[match.context.lang].pageTitle },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { lang } = useI18n()

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
