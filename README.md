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

## Connect a real registration backend

`POST /api/registrations` and `POST /api/partnership-inquiries` currently validate the payload with Zod and return a mock confirmation reference. They do not persist data.

To connect a real service:

1. Keep the Zod schemas in `lib/schemas.ts`.
2. Replace the mock success path in `lib/mock-submission.ts` with a trusted backend call.
3. Store only what the event team needs, and keep confirmation emails off this app until that service exists.
