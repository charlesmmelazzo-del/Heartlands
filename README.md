# Hearthlands: Age of Tillage

A digital garnish for Common Good Cocktail House. Guests scan a QR code, enter their names,
and start the "Rules Tutorial" for a strategy board game that doesn't exist. It's 3,000 pages
long, starts believable, and gets steadily more absurd. Anyone who finishes gets a free shot of
Malört, with their name on the screen so staff can check ID.

## How it works

- **No database.** Progress is a signed token kept in the guest's browser. Closing the tab and
  coming back resumes where they left off.
- **Cheat-resistant.** The rulebook and the ending live only on the server. Each "Next" is checked
  server-side: the token can't be edited, pages can't be skipped, and each page has to stay on
  screen for at least `MIN_DWELL_MS`. The victory screen shows the guest's name, a live clock
  (so a screenshot is obviously stale), the finish time, and a claim code.
- **Escalating content.** `lib/handwritten.js` has the straight-faced intro and the interludes.
  `lib/lore.js` has tiered phrase lists that `lib/content.js` combines into pages.

## Run locally

```bash
npm start
```

Open http://localhost:3000. To test the ending quickly:

```bash
TOTAL_SCREENS=30 MIN_DWELL_MS=300 npm start
```

## Scripts

- `npm run check` renders all pages, fails on broken placeholders, and prints samples per tier.
- `npm run export` writes `docs/RULEBOOK.txt` (everything) and `docs/RULEBOOK-SAMPLER.txt`.

## Deploy on Railway

1. Push this repo to GitHub.
2. Railway → New Project → Deploy from GitHub repo → pick it. It detects Node and runs `npm start`.
3. Variables → add `TOKEN_SECRET` = a long random string. **Required:** without it, every guest's
   progress resets whenever Railway restarts the app. Never change it after launch.
4. Settings → Networking → Generate Domain. That URL goes in the QR code.

Optional variables:

| Variable | Default | What it does |
|---|---|---|
| `TOTAL_SCREENS` | `3000` | Length of the tutorial |
| `MIN_DWELL_MS` | `900` | Minimum time on each page before Next counts |
| `TZ_DISPLAY` | `America/Chicago` | Time zone for the clock on the victory screen |

## Art

See `docs/SPRITE_REQUEST.md`. Sheets get sliced into `public/art/<id>.png`, and ids get added to
`ART` in `public/sprites.js`. Until then, emoji stand in.
