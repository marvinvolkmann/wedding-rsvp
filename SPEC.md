# Wedding RSVP – Specification

An online RSVP page for our wedding. Each invitation card carries an NFC sticker that opens a personal URL for the household.

## Stack

- **TanStack Start** (React, full-stack, server functions)
- **PostgreSQL** via Docker
- **Drizzle ORM** for schema and migrations
- **Docker Compose** runs the whole app (app + db), ready to deploy to a VPS
- Domain / HTTPS / reverse proxy are handled outside this project

## Guest flow

1. **No invite ID** (`/`): landing page asking guests to tap/scan their invitation card with their phone. Wedding details are not shown without an invite.
2. **Valid invite ID** (`/?invite=<token>`):
   - Greeting with the household's names joined automatically, e.g. "Anna, Tom & Mia".
   - Wedding details (see below).
   - RSVP form: **one yes/no per household** plus an optional **message**.
   - If they've already answered, the form is pre-filled and they can change it.
3. **After the RSVP deadline**: the form is locked. Households that answered see their answer read-only; households that didn't see a "deadline has passed" notice. Wedding details stay visible.
4. **Unknown / invalid ID**: polite error pointing back to the invitation card.

## Wedding details sections

Content will be provided later; plan for these sections:

- Date
- Ceremony venue
- Party venue
- Times / schedule
- Dress code
- Directions / map link
- Hotels / accommodation

## Data model (draft)

- `households`
  - `id`: random, non-guessable token (used in the URL)
  - `created_at`
- `guests`
  - `id`
  - `household_id` → `households.id`
  - `name`
  - `sort_order` (controls the order names appear in the greeting)
- `rsvps` (one row per household; updated when the answer changes)
  - `household_id` (PK, FK → `households.id`)
  - `attending`: boolean
  - `message`: text, nullable
  - `responded_at`: timestamp of the latest answer
  - `created_at`: timestamp of the first answer

## Guest list import

- Imported from a **CSV** via a CLI script that creates households and guests and generates random IDs.
- **CSV format is still to be defined**; keep the import isolated so the parser is easy to adapt.
- The project does **not** generate QR codes or NFC export files.

## Admin view

- Route `/admin`, protected by a single password from an env variable.
- Totals: attending / declined / no answer yet (households and guest headcount).
- Table per household: names, answer, message, date answered.
- Nothing fancy.

## Internationalization

- German (default) and English.
- Automatic detection from the browser language, plus a manual DE/EN toggle.
- English texts are drafted by Claude and reviewed by us.

## Configuration (env)

- `DATABASE_URL`
- `RSVP_DEADLINE` (ISO date/time)
- `ADMIN_PASSWORD`

## Design

- Functional placeholder UI for now.
- Visual design is done later with the `/impeccable` skill.
