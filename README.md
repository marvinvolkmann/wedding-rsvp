# Wedding RSVP

Personal RSVP page for our wedding. Each invitation's NFC sticker opens
`/?invite=<token>`. See [SPEC.md](SPEC.md) for the full specification.

## Local development

```bash
cp .env.example .env      # then adjust the values
npm install
npm run db:up             # start Postgres in Docker
npm run db:migrate        # create the tables
npm run import -- guests.example.csv
npm run dev               # http://localhost:3000
```

- Guest page: `http://localhost:3000/?invite=<token>`. The admin page lists every invite link.
- Admin page: `http://localhost:3000/admin`, using `ADMIN_PASSWORD` from `.env`.

## Dev mode in Docker

Runs the Vite dev server inside the app container with the source mounted, so
edits on your machine hot-reload. Postgres runs alongside it:

```bash
npm run docker:dev
```

This is `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build`.
Stop it with Ctrl+C. Before going back to production mode, run
`docker compose up -d --build`. After changing dependencies, add `-V` so the
container's `node_modules` are reinstalled.

## Running the whole app in Docker (VPS)

```bash
cp .env.example .env      # set real passwords and the deadline
docker compose up -d --build
```

The app container applies pending migrations on start and listens on
`APP_PORT` (default 3000). Put your own reverse proxy with HTTPS in front of it.

Import the guest list into the running stack:

```bash
docker compose run --rm -v ./guests.csv:/app/guests.csv app node scripts/import-guests.ts guests.csv
```

The import refuses to run when households already exist. Pass `--append` to
add more anyway.

## Guest list CSV

The format isn't final yet. For now there is one row per household: names
separated by `;` in a `names` column, and in a `genders` column one value per
name in the same order (`f` or `m`; `w`, `female` and `male` work too). The
gender sets the German salutation ("Liebe Lena, lieber Max"). See
`guests.example.csv`. The parsing lives only in
`scripts/guest-csv.ts`. Real guest lists (`*.csv`) are git-ignored.

## Changing things

- **Texts and wedding details (DE/EN):** `src/i18n/messages.ts`
- **Database schema:** `src/server/db/schema.ts`, then `npm run db:generate`
- **RSVP deadline:** `RSVP_DEADLINE` in `.env` (ISO date with time zone offset)
