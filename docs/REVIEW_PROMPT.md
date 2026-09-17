# Hearthlands — Prompt for an AI Reviewer

**How to use:** open a new chat with another AI (ChatGPT, Gemini, etc.). Attach these files from the
`Hearthlands/docs` and `Hearthlands/lib` folders:

1. `docs/RULEBOOK-SAMPLER.txt`: setup and all pieces in full, then every 12th card
2. `lib/lore.js` and `lib/turn.js`: the Stages, word lists, and phrases the Steps get built from
3. `lib/handwritten.js`: the hand-written cards
4. *(optional)* `docs/RULEBOOK.txt`: all 3,000 pages, if the AI can handle a large file

Then paste everything in the box below. Save the reply as a document (Word, Google Doc, or text
file) and share it with Claude.

---

```
You are reviewing the written content for a joke website. Please read the whole brief before
you start.

THE PROJECT
Common Good Cocktail House (a craft cocktail bar in Glen Ellyn, Illinois) is serving a cocktail
inspired by Settlers of Catan and similar strategy board games. As a "digital garnish," guests
get a QR code. It opens a website for a fake board game called "Hearthlands: Age of Tillage."
Guests type in their name (plus up to 4 friends' names) and tap "Begin the Game." They then get
a Rules Tutorial, one short screen at a time, with a "Next" button and no skip button.

THE JOKE
The tutorial is up to 3,000 pages long (the bar can shorten it; shorter games skip evenly through the same deck, so the escalation still happens, just faster). It starts out sounding like a completely real, normal board
game rulebook, then gradually gets more complicated, then fussy, then absurd, and finally
completely unhinged. If anyone actually taps through all 3,000 pages, the game admits the ruse
and awards them a free shot of Malört (a famously bitter Chicago liqueur) with their name on the
screen, checked against their ID.

HOW THE CONTENT WORKS (important for your suggestions)
- The game is framed as a pass-and-play PHONE game, not a physical board game. Nothing should
  mention boxes, tables, cardboard, or shuffling physical cards.
- Cards 1–4 (lib/handwritten.js, SETUP) welcome the players. Part One (PIECES) has one card
  per game piece, written straight.
- Part Two explains a single Turn in the style of The Campaign for North Africa:
  Turn → Stage → Phase → Segment → Step. The 18 Stages and their Phases are in lib/turn.js.
  Steps are generated from phrase lists (procedures, continuations, concepts, patch notes in
  lib/turn.js; actions, triggers, exceptions, FAQs, designer notes in lib/lore.js). A Step can
  run across up to 3 cards: the Step, "(cont.)", and "Example".
- Every list is split into 5 "absurdity tiers." Tier 0–1 = sounds real, just painfully
  detailed (~cards 1–510). Tier 2 = odd (~510–1,200). Tier 3 = the rules notice the reader
  (~1,200–1,980). Tier 4 = the tutorial is self-aware (~1,980–3,000).
- Hand-written interludes (lib/handwritten.js, INTERLUDES) appear every 61 cards.
- {P1} is the guest's real name; {P2}–{P5} are their friends' names.
- Small icons appear on each card (the "[icons: …]" lines).
So when a generated card reads badly, the fix almost always belongs in a phrase list, not a
single card. Please point to the phrase, not just the card number.

AUDIENCE AND TONE
- Adults at a cocktail bar, reading on their phones, probably a drink or two in.
- Humor: dry, deadpan, absurdist. Think Monty Python, Douglas Adams, the Goose from
  "Untitled Goose Game." The rulebook never winks. It's always completely serious about itself.
- Each screen should take 3–10 seconds to read. Short is better.
- Must be appropriate for a public bar: nothing mean-spirited, sexual, political, religious in
  an offensive way, or about real people. No references to drinking games or encouraging
  over-drinking.
- The game should not use the names "Catan" or "Settlers," or copy real game rules word for word.

WHAT I NEED FROM YOU
Review the content and write a document of suggested changes with these sections:

1. OVERALL IMPRESSIONS (5–10 bullet points)
   Does the escalation work? Does page 1 feel believable? Where does it start to feel
   repetitive? Is the ending worth it?

2. PROBLEMS TO FIX
   A table or list. For each: page number(s) where you saw it, the exact current text, what's
   wrong (grammar, doesn't make sense, not funny, too long, inappropriate, breaks tone,
   contradicts the "sounds real" early phase, repetitive), and your replacement text. If it
   comes from a phrase list, name the list (e.g. "actions, tier 2") and quote the phrase.

3. ESCALATION PACING
   Should any phrase move to an earlier or later tier? Are the tier start points right?
   Does anything funny appear too early and spoil the surprise?

4. NEW CONTENT TO ADD
   Write new material in the same formats, grouped by list and tier, ready to paste in:
   - 10+ new "actions" (each completes "…must ___"), spread across tiers 1–4
   - 10+ new "triggers" (each completes "When ___,"), spread across tiers 1–4
   - 8+ new "exceptions" (each completes "…unless ___"), spread across tiers 1–4
   - 6+ new designer's notes, 6+ new FAQ question/answer pairs, 6+ new example-of-play
     outcomes, across tiers
   - 6+ new hand-written interludes (heading + 1–2 short paragraphs + which tier)
   - Up to 10 better chapter titles, if you have them (they must escalate in order)
   Use {res}, {piece}, {terrain}, {neutral}, {tok}, {phase}, {season}, {player}, {P1}
   placeholders the same way the existing phrases do. Keep every entry short.

5. THE ENDING AND THE LANDING PAGE
   The final screen says: "Okay. You got us. There is no game. There never was a game.
   Hearthlands is a 3,000-page rulebook for a board game that does not exist, and you read
   every single page of it. We are genuinely impressed, a little worried, and very grateful."
   Then: "Show this screen to your server for A Free Shot of Malört, awarded to [NAME]." Suggest
   improvements to that copy, and to the landing page tagline ("A Game of Soil, Strategy &
   Spite", "2–5 Tillers · Ages 21+ · 20 min* · *not including Rules Tutorial").

6. TOP 10 CHANGES
   If we only make ten changes, which ones, in priority order?

Be specific and quote exact text. Don't rewrite the whole thing. Suggest changes a developer
can apply one by one.
```
