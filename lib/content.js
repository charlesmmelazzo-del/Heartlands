// Builds tutorial screen N on demand. Everything is deterministic per page
// number, so every guest sees the same rulebook and reloads are stable.
//
// Absurdity escalates with page number — see TIER_STARTS and lib/lore.js.
import * as L from "./lore.js";
import { INTRO, INTERLUDES } from "./handwritten.js";

export const TOTAL_SCREENS = Number(process.env.TOTAL_SCREENS) || 3000;
export const CHAPTER_SIZE = 72;
const INTERLUDE_EVERY = 61;
export const TOTAL_CHAPTERS = Math.ceil(TOTAL_SCREENS / CHAPTER_SIZE);

// Where each tier begins, as a fraction of the whole rulebook.
// With 3,000 pages: tier 1 at ~page 26 (right after the intro), tier 2 ~p.180,
// tier 3 ~p.660, tier 4 ~p.1,500.
const TIER_STARTS = [0, 0, 0.06, 0.22, 0.5];

export function tierAt(step) {
  if (step < INTRO.length) return 0;
  const frac = step / TOTAL_SCREENS;
  let tier = 1;
  for (let t = 2; t < TIER_STARTS.length; t++) if (frac >= TIER_STARTS[t]) tier = t;
  return tier;
}

function rng(seed) {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function chapterOf(step) {
  const n = Math.floor(step / CHAPTER_SIZE) + 1;
  const base = L.chapterTitles[(n - 1) % L.chapterTitles.length];
  const title = n > L.chapterTitles.length ? `${base} (Revisited)` : base;
  return { n, title };
}

// Picks and fills placeholders for one page at one tier.
function writer(r, tier) {
  const pick = (arr) => arr[Math.floor(r() * arr.length)];
  const sprites = new Set();

  // Tiered phrase list: 65% current tier, 25% the tier below, 10% anything older.
  const phrase = (tiers) => {
    const open = tiers.slice(0, tier + 1).filter((list) => list.length);
    const roll = r();
    const t = roll < 0.65 || open.length < 2 ? open.length - 1 : roll < 0.9 ? open.length - 2 : Math.floor(r() * open.length);
    return pick(open[t]);
  };
  // Tiered nouns: newest unlocks show up a bit more often.
  const noun = (list) => {
    const open = list.filter((x) => x.tier <= tier);
    const fresh = open.filter((x) => x.tier === tier);
    const item = fresh.length && r() < 0.4 ? pick(fresh) : pick(open);
    sprites.add(item.id);
    return item;
  };

  let lastRes = null;
  const table = {
    res: () => (lastRes = noun(L.resources)).name,
    res2: () => {
      let item = noun(L.resources);
      for (let i = 0; i < 4 && item === lastRes; i++) item = noun(L.resources);
      return item.name;
    },
    sameres: () => lastRes?.name || "Barley",
    piece: () => noun(L.pieces).name,
    pieces: () => noun(L.pieces).plural,
    terrain: () => noun(L.terrain).name,
    neutral: () => noun(L.neutrals).name,
    neutral2: () => noun(L.neutrals).name,
    tok: () => noun(L.tokens).name,
    toks: () => noun(L.tokens).plural,
    phase: () => phrase(L.phases),
    season: () => phrase(L.seasons),
    player: () => `{P${1 + Math.floor(r() * 5)}}`,
    action: () => phrase(L.actions),
    trigger: () => phrase(L.triggers),
    exception: () => phrase(L.exceptions),
  };

  const fill = (text) => {
    for (let i = 0; i < 6; i++) {
      const next = text.replace(/\{([a-z0-9]+)\}/g, (m, key) => (table[key] ? table[key]() : m));
      if (next === text) break;
      text = next;
    }
    return text;
  };
  return { r, tier, pick, phrase, noun, fill, sprites };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const n = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));

function ruleRef(w, step) {
  if (w.tier >= 4 && w.r() < 0.3) return w.pick(["∞", "0.0", "−3.1", "π", "7.7.7.7", "the one you're thinking of"]);
  return `${n(w.r, 1, chapterOf(step).n)}.${n(w.r, 1, CHAPTER_SIZE)}`;
}

// Each generator: [minTier, weight, fn(w, step, chapter)].
const GENERATORS = [
  [
    1,
    30,
    (w, step, ch) => {
      const who = w.phrase([
        ["the active player", "each player", "that player"],
        ["the player with the fewest {pieces}", "{player}", "the player to the left of the active player"],
        ["the player seated nearest the Goose", "whoever last touched the Harvest Die", "every player except {player}"],
        ["the player who most recently had a thought", "the emotionally tallest player", "{player} and their descendants"],
        ["you, specifically", "everyone who has ever played Hearthlands", "the rulebook itself"],
      ]);
      const body = [w.fill(`${cap(w.pick(["when", "whenever", "if"]))} {trigger}, ${who} must {action}${w.tier >= 1 && w.r() < 0.7 ? ", unless {exception}" : ""}.`)];
      if (w.tier >= 2 && w.r() < 0.45) body.push(w.fill(`This rule is suspended during {phase}.`));
      if (w.tier >= 3 && w.r() < 0.35) body.push(w.fill(`This rule is not suspended during {phase}, no matter what the previous sentence says.`));
      return { kind: "rule", heading: `Rule ${ch.n}.${(step % CHAPTER_SIZE) + 1}`, body };
    },
  ],
  [
    1,
    10,
    (w, step) => ({
      kind: "errata",
      heading: `Exception to Rule ${ruleRef(w, step)}`,
      body: [w.fill(`The preceding rule does not apply if {exception}. In that case, {player} must instead {action}.`)],
    }),
  ],
  [
    1,
    9,
    (w) => ({
      kind: "clarification",
      heading: "Clarification",
      body: [
        w.fill(
          w.phrase([
            [],
            [
              "\"Adjacent\" means sharing an edge, not a corner.",
              "A Granary replaces the Cottage it upgrades. Return the Cottage to your supply.",
              "Resources gained during {phase} may be spent in the same turn.",
              "The Tax Assessor does not collect from Mills.",
            ],
            [
              "For the avoidance of doubt, a {piece} is not a {piece}, even when {trigger}.",
              "{neutral} is not a player, but is entitled to all of a player's Grudges.",
              "\"Adjacent\" means sharing an edge. \"Near\" means sharing an edge or an opinion.",
              "{res} and {res2} are different resources, though they taste similar.",
            ],
            [
              "A {tok} placed during {phase} remains in play until {phase}, or until {player} forgets about it.",
              "The {terrain} counts as two hexes during {season} and as zero hexes whenever {neutral} is watching.",
              "Cart Roads may not cross. They may, however, have a falling-out.",
              "{neutral} has no hands. {neutral} will find a way.",
            ],
            [
              "The word \"turn\" in these rules refers to your turn, the Goose's turn, and the turning of the Earth.",
              "Page numbers in this rulebook are suggestions.",
              "There is no Rule 404. There has never been a Rule 404. Stop looking for Rule 404.",
              "You are allowed to stop reading. You won't, but you are allowed.",
            ],
          ])
        ),
      ],
    }),
  ],
  [
    1,
    10,
    (w) => ({
      kind: "example",
      heading: "Example of Play",
      body: [
        w.fill(
          `{player} has ${n(w.r, 2, 9)} {res} and a {tok}. During {phase}, ${
            w.tier >= 2 ? "{neutral}" : "the Tax Assessor"
          } moves onto their {terrain}. Because {trigger}, {player} must {action}.`
        ),
        w.fill(w.phrase(L.exampleOutcomes)),
      ],
    }),
  ],
  [
    1,
    8,
    (w) => {
      const [q, a] = w.phrase(L.faqs);
      return { kind: "faq", heading: "Frequently Asked Question", body: [w.fill(`Q: ${q}`), w.fill(`A: ${a}`)] };
    },
  ],
  [1, 6, (w) => ({ kind: "note", heading: "Designer's Note", body: [w.fill(w.phrase(L.designerNotes))] })],
  [
    1,
    7,
    (w) => {
      const tok = w.noun(L.tokens);
      return {
        kind: "component",
        heading: `Component Spotlight: ${tok.name}`,
        body: [
          w.fill(
            `Each copy of Hearthlands includes ${w.tier >= 4 ? w.pick(["infinitely many", "one fewer than you need", "exactly as many as you deserve"]) : n(w.r, 3, 40)} ${tok.plural}. ${w.phrase([
              [],
              ["Store them separately from Resource cards.", "Spares are available from the publisher."],
              ["If you lose one, {neutral} will know.", "They are not edible. We have been asked."],
              ["They must be returned to the box in the order they were removed.", "Do not stack more than three. They get ideas."],
              ["One of them is watching you right now.", "They were in the box before the box was."],
            ])}`
          ),
        ],
      };
    },
  ],
  [
    1,
    6,
    (w) => ({
      kind: "table",
      heading: `Scoring Table ${String.fromCharCode(65 + Math.floor(w.r() * 26))}-${n(w.r, 1, 12)}`,
      body: Array.from({ length: 4 }, () =>
        w.fill(
          `${w.phrase([
            [],
            ["Each {piece}", "Every 3 {res}", "Each {tok}", "Control of the {terrain}"],
            ["Each Grudge against {neutral}", "Every {res} traded to {player}", "Each unused {tok}"],
            ["Each apology accepted by a {piece}", "Every time {player} said \"sheep\"", "Having never seen the Unmapped Hex"],
            ["Each page of this rulebook", "Believing in the Goose", "Your eventual forgiveness"],
          ])}: ${w.r() < 0.2 ? "−" : ""}${w.tier >= 4 && w.r() < 0.3 ? w.pick(["∞", "½", "?", "HONK"]) : n(w.r, 1, 7)} Respect`
        )
      ),
    }),
  ],
  [
    2,
    5,
    (w, step) => ({
      kind: "errata",
      heading: `Errata: Rule ${ruleRef(w, step)}`,
      body: [w.fill(`Replace every instance of "{res}" with "{res2}". Where this creates a contradiction, see Rule ${ruleRef(w, step)}.`)],
    }),
  ],
  [
    1,
    5,
    (w) => ({
      kind: "rule",
      heading: `Seasonal Rule: ${cap(w.phrase(L.seasons))}`,
      body: [w.fill(`During this season, the {terrain} produces {res} instead of its usual resource, and {neutral} moves twice during {phase}.`)],
    }),
  ],
  [
    3,
    4,
    (w, step) => ({
      kind: "errata",
      heading: `Errata to the Errata for Rule ${ruleRef(w, step)}`,
      body: [
        w.fill(`The previous errata should have read "{res2}," not "{res}." The errata before that was correct. The rule itself was never correct.`),
      ],
    }),
  ],
  [
    4,
    5,
    (w) => ({
      kind: "rule",
      heading: w.pick(["A Rule About This Page", "A Rule About You", "A Rule About Rules"]),
      body: [
        w.fill(
          w.pick([
            "While reading this page, {P1} is considered to be in {phase}. Any {res} in their possession is now Gossip.",
            "This page is worth 1 Respect. The previous page is now worth −1 Respect. Plan accordingly.",
            "If {P1} has read every page up to this one, {P1} is the Reeve now. Congratulations. The Reeve has no powers.",
            "Rules on odd-numbered pages apply only to {P2}. Rules on even-numbered pages apply only to {P2} as well.",
            "Tapping \"Next\" counts as your turn. You have taken many turns. You are winning, in a sense, and losing, in another.",
          ])
        ),
      ],
    }),
  ],
];

function generated(step) {
  const r = rng(step + 1);
  const tier = tierAt(step);
  const w = writer(r, tier);
  const ch = chapterOf(step);
  const options = GENERATORS.filter(([min]) => min <= tier);
  let roll = r() * options.reduce((s, [, wt]) => s + wt, 0);
  const gen = options.find(([, wt]) => (roll -= wt) < 0)[2];
  const screen = gen(w, step, ch);
  return { ...screen, sprites: [...w.sprites].slice(0, 4) };
}

const CLOSING = [
  {
    kind: "clarification",
    heading: "Final Clarification",
    body: ["There are no further clarifications.", "(See Chapter 32, Clarifications on Clarifications, for exceptions.)"],
    sprites: ["ledger"],
  },
  {
    kind: "welcome",
    heading: "The Tutorial Is Complete",
    body: ["{PLAYERS}: you now know everything there is to know about Hearthlands: Age of Tillage.", "Tap Next to begin Setup."],
    sprites: ["reeve", "goose", "cottage"],
  },
];

// Raw screen for page `step` (0-based), placeholders still in.
export function screenAt(step) {
  if (step < INTRO.length) return INTRO[step];
  const fromEnd = TOTAL_SCREENS - step;
  if (fromEnd <= CLOSING.length) return CLOSING[CLOSING.length - fromEnd];
  if (step % INTERLUDE_EVERY === 0) {
    const pool = INTERLUDES.filter((s) => s.tier <= tierAt(step));
    if (pool.length) return pool[Math.floor(step / INTERLUDE_EVERY) % pool.length];
  }
  return generated(step);
}

// {P1}..{P5}. With a real table, extra slots cycle through the real players;
// a solo guest gets Automa opponents instead.
export function playerNames(players) {
  return [0, 1, 2, 3, 4].map((i) =>
    players[i] || (players.length > 1 ? players[i % players.length] : L.automa[(i - 1) % L.automa.length])
  );
}

function listNames(players) {
  if (players.length === 1) return players[0];
  return `${players.slice(0, -1).join(", ")} and ${players[players.length - 1]}`;
}

// Screen ready to send: names filled in, page metadata attached.
export function renderScreen(step, players) {
  const raw = screenAt(step);
  const names = playerNames(players);
  const sub = (s) => s.replace(/\{P([1-5])\}/g, (_, d) => names[d - 1]).replace(/\{PLAYERS\}/g, listNames(players));
  const ch = chapterOf(step);
  return {
    page: step + 1,
    totalPages: TOTAL_SCREENS,
    chapter: ch.n,
    chapterTitle: ch.title,
    totalChapters: TOTAL_CHAPTERS,
    kind: raw.kind,
    heading: cap(sub(raw.heading)),
    body: raw.body.map((p) => cap(sub(p))),
    sprites: raw.sprites || [],
  };
}
