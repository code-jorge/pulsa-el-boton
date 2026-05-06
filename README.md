# Pulsa El Botón

A small Spanish-language web app where the user is presented with a dilemma and must decide whether to press the button or not. Vote stats are aggregated across all visitors.

## Stack

- **Frontend**: React 18, Vite, MUI 6, TanStack React Query 5, React Router 6
- **Backend**: Netlify Functions
- **Storage**: [Netlify Blobs](https://docs.netlify.com/blobs/overview/) — no external database required

## Getting started

```bash
npm install
```

To run locally with the Netlify Functions and Blobs emulated:

```bash
npx netlify dev
```

To run only the Vite dev server (no API):

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Environment variables

- `SUBMIT_CODE` — passcode required by `dilemmas-add` to publish a new dilemma.

Netlify Blobs is configured automatically when running on Netlify or under `netlify dev`; no extra credentials are needed.

## Data model

### Dilemma

| Field    | Type             | Meaning              |
|----------|------------------|----------------------|
| slug     | string           | Unique key & URL     |
| title    | string           | Title                |
| type     | string           | Type (e.g. classic)  |
| category | string           | Category             |
| tags     | Array<string>    | Tags                 |
| positive | string           | Positive outcome     |
| negative | string           | Negative outcome     |
| date     | string (ISO)     | Publication date     |

Stored in the `dilemmas` blob store, keyed by `slug`.

### Votes

Vote tallies are stored as a single document per dilemma in the `votes` blob store, keyed by the dilemma's `slug`:

```json
{ "YES": 42, "NO": 17 }
```

Each call to `votes-add` reads, increments, and writes the tally back.

## API

| Endpoint                    | Method | Purpose                              |
|-----------------------------|--------|--------------------------------------|
| `/api/dilemmas-list?page=N` | GET    | Paginated list of published dilemmas |
| `/api/dilemmas-count`       | GET    | Total number of published dilemmas   |
| `/api/dilemmas-get?slug=`   | GET    | Fetch a single dilemma by slug       |
| `/api/dilemmas-latest`      | GET    | Most recently published dilemma      |
| `/api/dilemmas-get-random`  | GET    | Random published dilemma             |
| `/api/dilemmas-next?slug=`  | GET    | Next (older) dilemma in the sequence |
| `/api/dilemmas-add`         | POST   | Create a new dilemma (gated by code) |
| `/api/votes-get?slug=`      | GET    | Vote totals for a dilemma            |
| `/api/votes-add`            | POST   | Increment a vote for a dilemma       |
