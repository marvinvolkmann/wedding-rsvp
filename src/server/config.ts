export function getDeadline() {
  const raw = process.env.RSVP_DEADLINE
  if (!raw) throw new Error('RSVP_DEADLINE is not set')
  const deadline = new Date(raw)
  if (Number.isNaN(deadline.getTime())) {
    throw new Error(`RSVP_DEADLINE is not a valid date: ${raw}`)
  }
  return deadline
}

export function isRsvpOpen(now = new Date()) {
  return now <= getDeadline()
}
