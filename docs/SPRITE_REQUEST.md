# Hearthlands: Age of Tillage — Art Request for ChatGPT

**What this is:** everything needed to generate the fake board game's art: 7 sprite sheets and 1 logo.
The icons appear next to the rules as decoration, so the game looks like it has real components.

**How to use it:** start a new ChatGPT chat. Paste **Part 1** (the design rules) first. Then paste
one sheet prompt from **Part 2** at a time. Check each image before moving on (see the checklist at the bottom).

---

## Where to save the files

Make this folder on your Desktop:

```
Hearthlands Sprites
```

Save each image into it **with exactly these filenames** (lowercase, with hyphens):

| # | Filename | Grid | Image size | Cells |
|---|---|---|---|---|
| 1 | `hearthlands-01-resources.png` | 4 columns × 3 rows | 1536 × 1024 (landscape) | 12 |
| 2 | `hearthlands-02-buildings.png` | 4 columns × 3 rows | 1536 × 1024 (landscape) | 12 |
| 3 | `hearthlands-03-characters.png` | 4 columns × 3 rows | 1536 × 1024 (landscape) | 12 |
| 4 | `hearthlands-04-tokens.png` | 4 columns × 3 rows | 1536 × 1024 (landscape) | 12 |
| 5 | `hearthlands-05-terrain.png` | 3 columns × 3 rows | 1024 × 1024 (square) | 9 |
| 6 | `hearthlands-06-pawns.png` | 3 columns × 2 rows | 1536 × 1024 (landscape) | 6 |
| 7 | `hearthlands-07-extras.png` | 3 columns × 2 rows | 1536 × 1024 (landscape) | 6 |
| 8 | `hearthlands-logo.png` | no grid | 1536 × 1024 (landscape) | — |

If ChatGPT gives you a different filename when you download, rename it to match the table.
If a sheet has to be redone, save the new one with the same name (replace the old one). Don't add "-v2".

When all 8 are in the folder, tell Claude: **"The Hearthlands sprites are in the folder on my Desktop."**

---

## Part 1 — Paste this first (design rules)

```
I'm going to ask you for a series of sprite sheets for a fictional tabletop board game called
"Hearthlands: Age of Tillage", a medieval farming strategy game in the style of classic European
board games like Catan, Agricola, and Carcassonne. The icons will appear in the game's digital
rulebook. Please follow these rules for EVERY image in this conversation:

SHEET FORMAT (very important, the images will be cut up by a script)
1. Background: solid flat magenta, exactly #FF00FF, everywhere that isn't artwork. No gradient,
   no texture, no shadow on the background, no vignette.
2. Grid lines: solid bright green, exactly #00FF00, about 8 pixels thick, separating every cell,
   plus a green border around the outside edge. All cells are exactly the same size.
3. One object per cell, centered, filling about 80% of the cell, with magenta space around it.
   Nothing may touch or cross a green line.
4. Cells are filled left to right, top to bottom, in the exact order I list.
5. NEVER use magenta, pink, hot pink, purple, or neon/lime green inside the artwork. Those colors
   get erased. Use forest green, olive, or sage for greens.
6. No text, letters, numbers, labels, or captions anywhere in the sprite sheets (except the logo,
   which I will ask for separately). Dice may show pips/dots instead of numerals.
7. No drop shadows falling onto the magenta background. Crisp, clean silhouette edges.

ART STYLE (keep identical across all sheets)
- Looks like official component art from a premium European board game: hand-painted digital
  illustration with a slight woodcut / storybook feel.
- Warm, earthy, autumnal palette: wheat gold, barn red, oak brown, moss green, slate blue,
  cream, charcoal.
- Every object has a consistent dark brown outline (about 3–4 px) so it reads at small sizes.
- Soft lighting from the upper left. Gentle shading, not photorealistic.
- Buildings, characters, and pieces are drawn in a slight 3/4 top-down view, like a wooden or
  painted miniature sitting on a table. Flat items (cards, tokens, coins) are straight-on.
- Friendly and slightly whimsical, but played straight: it should look like a real, serious
  product, not a joke or a cartoon.
- Every object must still be recognizable when shrunk to 48 × 48 pixels: simple, bold shapes,
  not a lot of tiny detail.

Reply "Ready" and I'll send the first sheet.
```

---

## Part 2 — Sheet prompts (paste one at a time)

### Sheet 1 — Resources → `hearthlands-01-resources.png`

```
Sheet 1 of 7: RESOURCES. Landscape image, 1536 × 1024. Grid of 4 columns × 3 rows = 12 cells.
Follow all the sheet format and art style rules. Each resource is shown as a small pile or bundle
of that material, the kind of icon printed on a resource card.

Row 1:
 1. Barley — a tied sheaf of golden barley stalks
 2. Flax — a bundle of pale blue-flowered flax stems tied with twine
 3. Mutton — a leg of mutton with a white bone end, on a small cloth
 4. Peat — a neat stack of dark brown cut peat bricks
Row 2:
 5. Wicker — a woven wicker bundle / small coil of willow rods
 6. Loam — a mound of rich dark soil with a small trowel stuck in it
 7. Tallow — a lumpy block of creamy white tallow with a few candle stubs
 8. Brine — a small wooden bucket of salty water with salt crust on the rim
Row 3:
 9. Turnip — a single chunky purple-and-white turnip with leafy greens (use a muted
    violet-gray for the turnip, NOT magenta or pink)
10. Gossip — two small overlapping parchment speech-scrolls, blank, no writing
11. Respect — a round bronze medallion with a laurel wreath embossed on it
12. Resource card back — the back of a playing card: oak-brown with a cream border and a
    simple wheat-sheaf emblem in the center, no text
```

### Sheet 2 — Buildings & Pieces → `hearthlands-02-buildings.png`

```
Sheet 2 of 7: BUILDINGS AND PIECES. Landscape image, 1536 × 1024. Grid of 4 columns × 3 rows.
Follow all the sheet format and art style rules. Draw each one as a painted miniature game piece
in 3/4 top-down view, with a small patch of grass or dirt under it as a base.

Row 1:
 1. Cottage — small whitewashed cottage with a thatched roof and a chimney
 2. Granary — taller stone-and-timber storehouse with a steep roof, sacks by the door
 3. Cart Road — a short straight segment of dirt road with wheel ruts and grass edges
 4. Mill — a windmill with four canvas sails
Row 2:
 5. Well — a round stone well with a little roof and a bucket
 6. Drover — a farmhand figure in a brown hood holding a long herding staff
 7. Tithe Barn — a long, big barn with huge double doors
 8. Wattle Fence — a short section of woven stick fence
Row 3:
 9. Hay Cart — a wooden two-wheeled cart piled with hay
10. Scarecrow — a scarecrow on a post with a floppy hat and straw sticking out
11. Hedgerow — a short, dense, rounded row of hedge bushes
12. Chapel of Mild Concern — a tiny stone chapel with a small bell tower, looking slightly worried
    (a subtly tilted bell tower is enough, no face)
```

### Sheet 3 — Characters → `hearthlands-03-characters.png`

```
Sheet 3 of 7: CHARACTERS. Landscape image, 1536 × 1024. Grid of 4 columns × 3 rows.
Follow all the sheet format and art style rules. Each one is a painted miniature figure standing
on a small round wooden base, full body, 3/4 view.

Row 1:
 1. The Reeve — a stern village official in a dark green robe holding a tall staff and a key ring
 2. The Tax Assessor — a thin, fussy man in beige robes holding a ledger and a quill
 3. The Tinker — a traveling tinker with pots and pans strapped to his back
 4. The Goose — a large white farm goose, chest out, extremely confident, mid-step
Row 2:
 5. Gerald the Communal Ox — a big, gentle brown ox with a wooden yoke, looking patient
 6. The Unwelcome Bard — a bard in a feathered cap playing a lute, mid-song, eyes closed
 7. The Village Idiot — a cheerful peasant in a patched tunic with a bucket on his head
 8. The Magistrate of Hedges — a judge in a black robe and white wig, holding garden shears
Row 3:
 9. The Hedge Witch — an old woman in a mossy green shawl holding a bundle of herbs
10. The Lost Pilgrim — a traveler with a walking stick and a map held upside down
11. The Weather Prophet — a bearded man in a slate-blue cloak holding up a small raincloud
12. The Rat King — a regal rat wearing a tiny gold crown and a red cape, sitting on a thimble throne
```

### Sheet 4 — Tokens & Cards → `hearthlands-04-tokens.png`

```
Sheet 4 of 7: TOKENS AND CARDS. Landscape image, 1536 × 1024. Grid of 4 columns × 3 rows.
Follow all the sheet format and art style rules. These are small game components: cardboard
tokens, wooden bits, cards, and dice, straight-on or slightly angled.

Row 1:
 1. Harvest Die — an odd many-sided wooden die (like a 13-sided die) with carved dots, no numerals
 2. Favor of the Reeve — a round cardboard token with a gold key symbol
 3. Weather Cube — a wooden cube; visible faces show a sun, a raincloud, and fog swirls
 4. Almanac Card — a tall card with a crescent moon and wheat illustration, no text
Row 2:
 5. Ledger Page — a single torn parchment page with neat lines (lines only, no readable text)
 6. Grudge Token — a round dark red cardboard token showing an angry frowning eyebrow symbol
 7. Debt Pebble — a smooth gray stone with a small chalk scratch mark
 8. Blight Cube — a small wooden cube stained sickly brown-green with a wilted leaf symbol
Row 3:
 9. Reeve's Seal — a red wax seal with a stamped wheat symbol and a short ribbon
10. Rumor Chit — a small folded scrap of paper with a wax dot
11. Plague Marker — a round black token with a simple white skull symbol
12. Dawdling Hourglass — a wooden hourglass with sand running very slowly
```

### Sheet 5 — Terrain Hexes → `hearthlands-05-terrain.png`

```
Sheet 5 of 7: TERRAIN HEXES. Square image, 1024 × 1024. Grid of 3 columns × 3 rows = 9 cells.
Follow all the sheet format and art style rules. Each cell has one pointy-top HEXAGON board tile,
seen straight from above, like a Catan terrain tile. Each hexagon has a thin cream border.
The magenta background shows around the hexagon's corners.

Row 1:
 1. Barley Rise — golden barley field on gentle hills
 2. Flax Fields — rows of pale blue flowering flax
 3. Mutton Downs — green pasture with a few small white sheep
Row 2:
 4. Peat Bog — dark brown boggy ground with cut peat stacks and puddles
 5. Wicker Marsh — sage-green marsh with willow trees and reeds
 6. Loamfields — freshly plowed dark brown furrows
Row 3:
 7. Brine Flats — pale salt flats with shallow blue-gray pools
 8. Tallow Mines — rocky gray hillside with a small timber mine entrance
 9. The Unmapped Hex — completely blank, off-white parchment hexagon with only a faint dotted
    outline. Eerie in its emptiness.
```

### Sheet 6 — Player Pawns → `hearthlands-06-pawns.png`

```
Sheet 6 of 7: PLAYER PAWNS. Landscape image, 1536 × 1024. Grid of 3 columns × 2 rows = 6 cells.
Follow all the sheet format and art style rules. Each cell is the same classic wooden "meeple"
style farmer pawn (a rounded person shape wearing a little wide-brimmed straw hat), painted wood,
3/4 view, identical shape in every cell. Only the color changes.

Row 1:
 1. Barn red
 2. Slate blue
 3. Cream / off-white
Row 2:
 4. Burnt orange
 5. Forest green (dark, NOT neon)
 6. Beige (this one belongs to the Tax Assessor, so give it a tiny pair of spectacles)
```

### Sheet 7 — Extras → `hearthlands-07-extras.png`

```
Sheet 7 of 7: EXTRAS. Landscape image, 1536 × 1024. Grid of 3 columns × 2 rows = 6 cells.
Follow all the sheet format and art style rules.

Row 1:
 1. Rulebook — a thick, open leather-bound rulebook with a ribbon bookmark (lines, no readable text)
 2. Quill — a feather quill in a small ink pot
 3. Scroll — a rolled parchment scroll, partly unrolled, blank
Row 2:
 4. Shot Glass — a small, heavy rustic shot glass filled with amber-yellow liquor, a few drops
    on the side (plain glass, no label or brand)
 5. Laurel — a golden laurel wreath
 6. Compass Rose — an old brass compass
```

### Logo → `hearthlands-logo.png`

```
Now the game's LOGO. Landscape image, 1536 × 1024. No grid for this one, but keep the same solid
magenta #FF00FF background (no green lines), and no magenta, pink, or neon green inside the logo.

The logo reads exactly:
  "HEARTHLANDS" (large, main title)
  "AGE OF TILLAGE" (smaller, underneath)

Style: the box-cover title of a premium European strategy board game. Carved, embossed gold
lettering with a dark brown outline and slight bevel, in a classic serif / Roman-inscription
style (similar in feeling to the font Cinzel). "AGE OF TILLAGE" sits on a small cream parchment
ribbon banner. Decorate the title with a few golden barley stalks and a small hexagon emblem
containing a cottage. Everything centered, filling about 80% of the width, with magenta space
all around. Spell every letter exactly as written. Double-check the spelling before finishing.
```

---

## Checklist for each image

Before saving, look for these. If something's wrong, ask ChatGPT to redo that sheet.

- [ ] Background is flat magenta and lines are bright green
- [ ] Correct number of rows and columns, all cells the same size
- [ ] Nothing crosses into a neighboring cell
- [ ] Items are in the listed order (this one matters most, the icons get named by position)
- [ ] No text or numbers in sprite sheets
- [ ] No pink, magenta, or neon green inside the art
- [ ] Style matches the earlier sheets (if it drifts, say: *"Match the style of Sheet 1 exactly."*)
- [ ] Logo: **HEARTHLANDS** and **AGE OF TILLAGE** spelled correctly

Useful fix-it phrases:
- *"Redo this sheet. The items in row 2 are in the wrong order. It should be: …"*
- *"Redo this sheet. The background must be flat #FF00FF with no texture or shadows."*
- *"Redo this sheet. Cell 7 touches the grid line; shrink it so there is magenta space around it."*
