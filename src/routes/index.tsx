import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useId, useRef, useState } from 'react'

import { LangSwitch } from '#/components/LangSwitch.tsx'
import { ArchMark, Arrow } from '#/components/motifs.tsx'
import {
  firstName,
  formatDate,
  formatDateTime,
  joinNames,
} from '#/i18n/format.ts'
import type { Venue } from '#/i18n/messages.ts'
import { useI18n } from '#/i18n/useI18n.ts'
import {
  MAX_MESSAGE_LENGTH,
  getInvite,
  submitRsvp,
  type Invite,
} from '#/server/rsvp.ts'

type Search = { invite?: string }

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search.invite === 'string' ? { invite: search.invite } : {},
  loaderDeps: ({ search }) => ({ invite: search.invite }),
  loader: ({ deps }) => getInvite({ data: deps.invite ?? '' }),
  component: Home,
})

type ValidInvite = Extract<Invite, { status: 'ok' }>
type Answer = NonNullable<ValidInvite['rsvp']>

function Home() {
  const invite = Route.useLoaderData()
  const { t } = useI18n()

  if (invite.status === 'ok') return <InvitePage invite={invite} />

  const copy = invite.status === 'none' ? t.landing : t.invalid
  return (
    <>
      <header className="field field--notice">
        <FieldTop />
        <FieldDate />
        <div className="window">
          <p className="window-couple">{t.couple}</p>
          <h1 className="notice-title">{copy.title}</h1>
          <p className="lede">{copy.body}</p>
        </div>
      </header>
      <Footer />
    </>
  )
}

function FieldTop() {
  const { t } = useI18n()

  return (
    <div className="field-top">
      <p className="couple">{t.couple}</p>
      <LangSwitch />
    </div>
  )
}

function FieldDate() {
  const { t } = useI18n()

  return (
    <p className="field-date">
      <b>{t.date}</b>
      <small>{t.weekday}</small>
    </p>
  )
}

function Footer() {
  const { t } = useI18n()

  return (
    <footer className="foot">
      <ArchMark className="foot-arch" />
      <p className="foot-couple">{t.couple}</p>
      <p className="foot-date">
        {t.weekday}, {t.date}
      </p>
    </footer>
  )
}

function InvitePage({ invite }: { invite: ValidInvite }) {
  const { lang, t } = useI18n()
  const [choice, setChoice] = useState<boolean | undefined>(
    invite.rsvp?.attending,
  )
  const [editing, setEditing] = useState(!invite.rsvp)
  const replyRef = useRef<HTMLElement>(null)

  function choose(attending: boolean) {
    setChoice(attending)
    setEditing(true)
    replyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    replyRef.current
      ?.querySelector<HTMLTextAreaElement>('textarea')
      ?.focus({ preventScroll: true })
  }

  return (
    <>
      <header className="field">
        <FieldTop />
        <FieldDate />
        <div className="window">
          <Greeting guests={invite.guests} />
          <p className="lede">{t.intro}</p>
        </div>
      </header>

      <div className="below">
        <dl className="facts">
          <div>
            <dt>
              {t.ceremony.label}
              <span className="facts-time">
                <span className="facts-sep"> · </span>
                {t.ceremony.time}
              </span>
            </dt>
            <dd>{t.ceremony.place}</dd>
          </div>
          <div>
            <dt>
              {t.celebration.label}
              <span className="facts-time">
                <span className="facts-sep"> · </span>
                {t.celebration.time}
              </span>
            </dt>
            <dd>{t.celebration.place}</dd>
          </div>
        </dl>
        <div className="ask">
          <InviteAction invite={invite} onChoose={choose} />
        </div>
      </div>

      <main className="wrap">
        <section className="section" aria-labelledby="day-heading">
          <h2 id="day-heading" className="section-title">
            {t.dayHeading}
          </h2>
          <div className="venues">
            <VenueBlock venue={t.ceremony} />
            <VenueBlock venue={t.celebration} />
          </div>
        </section>

        <section className="section schedule" aria-labelledby="schedule-heading">
          <h2 id="schedule-heading" className="section-title">
            {t.schedule.heading}
          </h2>
          <ol>
            {t.schedule.items.map((entry) => (
              <li key={entry.time + entry.item}>
                <span className="schedule-time">{entry.time}</span>
                <span className="schedule-item">{entry.item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="section info">
          {t.more.map((block) => (
            <div key={block.title}>
              <h2 className="label">{block.title}</h2>
              <p>{block.body}</p>
            </div>
          ))}
        </section>

        <section
          id="antwort"
          ref={replyRef}
          className="reply"
          aria-labelledby="reply-heading"
        >
          <h2 id="reply-heading" className="section-title">
            {t.rsvp.heading}
          </h2>
          {invite.open && (
            <p className="deadline">
              {t.rsvp.deadline(formatDate(invite.deadline, lang))}
            </p>
          )}

          {!invite.open ? (
            invite.rsvp ? (
              <>
                <p className="reply-note">{t.rsvp.closed}</p>
                <LockedAnswer answer={invite.rsvp} />
              </>
            ) : (
              <p className="reply-note">{t.rsvp.closedNoAnswer}</p>
            )
          ) : invite.rsvp && !editing ? (
            <LockedAnswer
              answer={invite.rsvp}
              deadline={invite.deadline}
              onChange={() => setEditing(true)}
            />
          ) : (
            <ReplyForm
              invite={invite}
              choice={choice}
              onChoice={setChoice}
              onSaved={() => setEditing(false)}
            />
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}

// German addresses each guest with their own salutation ("Liebe Lena,
// lieber Max,"); English keeps one greeting line ("Dear Lena and Max,").
function Greeting({ guests }: { guests: ValidInvite['guests'] }) {
  const { lang, t } = useI18n()

  if (!t.salutations) {
    return (
      <>
        <p className="greet">{t.greeting}</p>
        <h1 className="names">
          {joinNames(
            guests.map((guest) => guest.name),
            lang,
          )}
          ,
        </h1>
      </>
    )
  }

  const salutations = t.salutations
  return (
    <h1 className="names">
      {guests.map((guest, i) => {
        const salutation = salutations[guest.gender]
        return (
          <span key={guest.name} className="person">
            <span className="salutation">
              {i === 0
                ? salutation.charAt(0).toUpperCase() + salutation.slice(1)
                : salutation}
            </span>{' '}
            {firstName(guest.name)},
          </span>
        )
      })}
    </h1>
  )
}

function InviteAction({
  invite,
  onChoose,
}: {
  invite: ValidInvite
  onChoose: (attending: boolean) => void
}) {
  const { t } = useI18n()

  if (invite.rsvp) {
    return (
      <a className="ask-status" href="#antwort">
        <span>{invite.rsvp.attending ? t.rsvp.lockedYes : t.rsvp.lockedNo}</span>
        <span className="link">
          {t.rsvp.heading}
          <Arrow direction="down" />
        </span>
      </a>
    )
  }

  if (!invite.open) {
    return <p className="ask-status">{t.rsvp.closedNoAnswer}</p>
  }

  return (
    <>
      <p className="ask-question">{t.rsvp.question}</p>
      <div className="pills">
        <button
          type="button"
          className="pill pill--solid"
          onClick={() => onChoose(true)}
        >
          {t.rsvp.yes}
        </button>
        <button type="button" className="pill" onClick={() => onChoose(false)}>
          {t.rsvp.no}
        </button>
      </div>
    </>
  )
}

function VenueBlock({ venue }: { venue: Venue }) {
  const { t } = useI18n()
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.place}, ${venue.address}`,
  )}`

  return (
    <div className="venue">
      <h3 className="venue-name">{venue.label}</h3>
      <p className="venue-time">{venue.time}</p>
      <p className="venue-place">{venue.place}</p>
      <p className="venue-address">
        {venue.address.split(', ').map((line) => (
          // Keep "25436 Uetersen" together when the line wraps.
          <span key={line}>{line.replace(/^(\d{4,5}) /, '$1 ')}</span>
        ))}
      </p>
      <a className="link" href={mapUrl} target="_blank" rel="noreferrer">
        {t.mapLink}
        <Arrow />
      </a>
    </div>
  )
}

function LockedAnswer({
  answer,
  deadline,
  onChange,
}: {
  answer: Answer
  deadline?: string
  onChange?: () => void
}) {
  const { lang, t } = useI18n()

  return (
    <div className="locked" role="status">
      <div className={`locked-arch ${answer.attending ? 'is-yes' : 'is-no'}`}>
        <p className="locked-title">
          {answer.attending ? t.rsvp.lockedYes : t.rsvp.lockedNo}
        </p>
        <p className="locked-meta">
          {t.rsvp.lockedOn(formatDateTime(answer.respondedAt, lang))}
        </p>
      </div>
      {answer.message && <blockquote>{answer.message}</blockquote>}
      {onChange && deadline && (
        <div className="locked-change">
          <p>{t.rsvp.canChange(formatDate(deadline, lang))}</p>
          <button type="button" className="pill" onClick={onChange}>
            {t.rsvp.change}
          </button>
        </div>
      )}
    </div>
  )
}

function ReplyForm({
  invite,
  choice,
  onChoice,
  onSaved,
}: {
  invite: ValidInvite
  choice: boolean | undefined
  onChoice: (attending: boolean) => void
  onSaved: () => void
}) {
  const { t } = useI18n()
  const { invite: token } = Route.useSearch()
  const router = useRouter()
  const save = useServerFn(submitRsvp)
  const messageId = useId()

  const [message, setMessage] = useState(invite.rsvp?.message ?? '')
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (choice === undefined || !token) return
    setStatus('saving')
    try {
      await save({ data: { token, attending: choice, message } })
      await router.invalidate()
      setStatus('idle')
      onSaved()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <fieldset className="answers">
        <legend className="visually-hidden">{t.rsvp.question}</legend>
        <div className="arches">
          <AnswerOption
            checked={choice === true}
            onSelect={() => onChoice(true)}
            short={t.rsvp.yes}
            long={t.rsvp.yesLong}
          />
          <AnswerOption
            checked={choice === false}
            onSelect={() => onChoice(false)}
            short={t.rsvp.no}
            long={t.rsvp.noLong}
          />
        </div>
      </fieldset>

      <div className="message">
        <label className="label" htmlFor={messageId}>
          {t.rsvp.message}
          <i className="label-optional">{t.rsvp.optional}</i>
        </label>
        <textarea
          id={messageId}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder={t.rsvp.messageHint}
          rows={4}
        />
      </div>

      <div className="send">
        <button
          type="submit"
          className="pill pill--solid"
          disabled={choice === undefined || status === 'saving'}
        >
          {status === 'saving'
            ? t.rsvp.saving
            : invite.rsvp
              ? t.rsvp.update
              : t.rsvp.send}
        </button>
        {choice === undefined && (
          <p className="form-hint">{t.rsvp.chooseFirst}</p>
        )}
        {status === 'error' && (
          <p className="form-error" role="alert">
            {t.rsvp.error}
          </p>
        )}
      </div>
    </form>
  )
}

function AnswerOption({
  checked,
  onSelect,
  short,
  long,
}: {
  checked: boolean
  onSelect: () => void
  short: string
  long: string
}) {
  return (
    <label className="arch-option" data-checked={checked || undefined}>
      <input
        type="radio"
        name="attending"
        checked={checked}
        onChange={onSelect}
        required
      />
      <span className="arch-option-short">{short}</span>
      <span className="arch-option-long">{long}</span>
    </label>
  )
}
