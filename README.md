# Rooting & Rising

Event microsite for Liberia’s UNGA 81 side event, rebuilt from the static prototype in Next.js.

## Setup

```bash
pnpm install
```

`unrs-resolver` is allowed to run its install script in `pnpm-workspace.yaml`. That is required on pnpm 11.

npm still works if you prefer it:

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Replace partner logos

Drop official assets into `public/partners/` using the existing filenames:

- `moys.svg`
- `MOFA.svg`
- `liberia-un-mission.svg`
- `uncoordinator-logo-en.svg`
- `unfpa.svg`
- `undp.svg`

See `public/partners/README.md`. Event copy, dates, agenda, and partner names live in `lib/event-content.ts`.

## Signups (registrations & partnership inquiries)

`POST /api/registrations` and `POST /api/partnership-inquiries` validate the payload with Zod (`lib/schemas.ts`) and persist it to a Neon Postgres database via `lib/db.ts`.

### 1. Create a Neon database

Create a project at [console.neon.tech](https://console.neon.tech) and copy its pooled connection string.

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```
DATABASE_URL=          # Neon pooled connection string
LIST_AUTH_USER=        # username for the /list signups page
LIST_AUTH_PASSWORD=    # password for the /list signups page
LIST_AUTH_SECRET=      # random string used to sign the session cookie, e.g. `openssl rand -hex 32`
```

### 3. Run the migration

```bash
npm run db:migrate
```

This creates the `registrations` and `partnership_inquiries` tables from `db/schema.sql`. Re-run it any time `db/schema.sql` changes.

### 4. View signups

Visit `/list` (not linked from site navigation) to see every registration and partnership inquiry. It redirects to an in-app login screen at `/list/login`, gated by `LIST_AUTH_USER` / `LIST_AUTH_PASSWORD` — set those (and `LIST_AUTH_SECRET`) in production too.

## Concept note download

The register page links to `/api/concept-note`, which redirects to a short-lived presigned URL for a PDF stored in S3 (or an S3-compatible bucket). Add to `.env.local`:

```
S3_BUCKET=              # bucket name
S3_REGION=               # e.g. us-east-1
S3_ENDPOINT=              # only needed for non-AWS S3-compatible storage
S3_FORCE_PATH_STYLE=      # "true" for some S3-compatible providers
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
CONCEPT_NOTE_KEY="MoYS UNGA_YPS Concept Note_Public Final.pdf"
```
