# Hearthlands: Age of Tillage

A digital garnish for Common Good Cocktail House. Guests scan a QR code, enter their names,
and start the "Rules Tutorial" for a strategy board game that doesn't exist. It's 3,000 pages
long, starts believable, and gets steadily more absurd. Anyone who finishes gets a free shot of
Malört, with their name on the screen so staff can check ID.

## How it works

- **No database server.** Each guest's progress is a signed token in their browser, so closing
  the tab and coming back resumes where they left off. Settings, games and winners go in one
  small JSON file (`data/hearthlands.json` locally, a Railway volume in production).
- **Cheat-resistant.** The rulebook and the ending live only on the server. Each "Next" is checked
  server-side: the token can't be edited, pages can't be skipped, and each page has to stay on
  screen for at least `MIN_DWELL_MS`. The victory screen shows the guest's name, a live clock
  (so a screenshot is obviously stale), the finish time, and a claim code.
- **Admin page at `/admin`.** Shows games started, winners (with a "Mark shot poured" button),
  everyone's progress and measured tapping pace, and sets the game length.
- **Adjustable length, same escalation.** Admin picks "minutes to finish" × "pages per minute".
  A game deals evenly spaced cards from the full 3,000-card deck, so a short game still goes from
  believable to absurd, just faster. A game keeps the length it started with.
  Measured top speed: an auto-clicker gets 60 pages/min (Next unlocks after ~1 sec), and a
  human mashing Next gets roughly 40–45.
- **Escalating content.** `lib/handwritten.js` has the straight-faced intro and the interludes.
  `lib/lore.js` has tiered phrase lists that `lib/content.js` combines into pages.

## Run locally

```bash
npm start
```

Open http://localhost:3000, and http://localhost:3000/admin for the admin page:

```bash
ADMIN_PASSWORD=pick-one npm start
```

To test the ending quickly, sign in to the admin page and set 1 minute × 60 pages/min (60 pages).

## Scripts

- `npm run check` renders all pages, fails on broken placeholders, and prints samples per tier.
  `node scripts/check.js 3 300` checks a 300-page game.
- `npm run export` writes `docs/RULEBOOK.txt` (everything) and `docs/RULEBOOK-SAMPLER.txt`.

## Deploy on Railway

1. Push this repo to GitHub.
2. Railway → New Project → Deploy from GitHub repo → pick it. It detects Node and runs `npm start`.
3. Variables → add:
   - `TOKEN_SECRET` = a long random string. **Required:** without it, every guest's progress
     resets whenever Railway restarts the app. Never change it after launch.
   - `ADMIN_PASSWORD` = the password for `/admin`.
4. Right-click the service → **Attach Volume**, mount path `/data`. **Required:** without it, the
   winners list and settings are wiped on every deploy. (Railway tells the app where the volume is.)
5. Settings → Networking → Generate Domain. That URL goes in the QR code.

Optional variables:

| Variable | Default | What it does |
|---|---|---|
| `DATA_DIR` | volume path | Where the data file lives, if not using a Railway volume |
| `MIN_DWELL_MS` | `900` | Minimum time on each page before Next counts |
| `TZ_DISPLAY` | `America/Chicago` | Time zone for the clock on the victory screen |

## Art

All art came from ChatGPT as magenta/green sprite sheets (spec: `docs/SPRITE_REQUEST.md`).
`scripts/slice_sprites.py` cuts them into transparent WebP files in `public/art/`: 216 px sprites,
enough for sharp icons on 3x phone screens, plus a 1080 px logo, about 1.3 MB total.
To redo the art, replace the sheets and run:

```bash
python3 -m venv /tmp/venv && /tmp/venv/bin/pip install pillow numpy
/tmp/venv/bin/python scripts/slice_sprites.py ~/Desktop/"Hearthlands Sprites" public/art
```
