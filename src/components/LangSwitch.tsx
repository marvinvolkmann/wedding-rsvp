import { useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

import { setLang } from '#/i18n/lang.ts'
import { languages } from '#/i18n/messages.ts'
import { useI18n } from '#/i18n/useI18n.ts'

export function LangSwitch() {
  const { lang, t } = useI18n()
  const router = useRouter()
  const saveLang = useServerFn(setLang)

  return (
    <nav className="lang-switch" aria-label={t.langSwitch}>
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={code === lang}
          onClick={async () => {
            if (code === lang) return
            await saveLang({ data: code })
            await router.invalidate()
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </nav>
  )
}
