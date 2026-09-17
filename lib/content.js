// Builds tutorial cards on demand. Everything is deterministic, so every guest
// sees the same tutorial and reloads are stable.
//
// THE DECK (at least MASTER_SIZE cards):
//   SETUP        always dealt in full
//   PIECES       Part One: one card per piece
//   TURN_OPENING Part Two begins
//   STAGES       Turn 1: Stage → Phase → Segment → Step, absurdity rising
//   CLOSING      always dealt in full
// A game of `total` cards deals evenly spaced cards from the deck, always
// including the start of Part Two and the first card of every Stage. A short
// game escalates just as fully, only faster.
import * as L from "./lore.js";
import * as T from "./turn.js";
import { SETUP, PIECES, TURN_OPENING, INTERLUDES, CLOSING } from "./handwritten.js";

export const MASTER_SIZE = 3000;
const INTERLUDE_EVERY = 61;
const SEGMENT_SIZE = 8;
const deckSize = (total) => Math.max(MASTER_SIZE, total);

// Where each absurdity tier begins, as a fraction of the deck. Part One and
// the Dawn/Trade Stages stay straight-faced; the Goose arrives around 40%.
const TIER_STARTS = [0, 0, 0.17, 0.4, 0.66];

const PIECES_START = SETUP.length;
const TURN_OPENING_IDX = PIECES_START + PIECES.length;
const BODY_START = TURN_OPENING_IDX + 1;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
const LOWER_ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii"];
const letter = (i) => String.fromCharCode(65 + i);

function tierOfCard(idx, size) {
  if (idx < BODY_START) return 0;
  const frac = idx / size;
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
const seedOf = (...parts) => parts.reduce((h, p) => Math.imul(h ^ (p + 1), 16777619) >>> 0, 2166136261);

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const between = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
const phaseLabel = (name) => `the ${name.replace(/^The /, "")} Phase`;

// --- deck layout ------------------------------------------------------------
const layoutCache = new Map();

// Card ranges for every Stage in a deck of `size`.
function layout(size) {
  if (layoutCache.has(size)) return layoutCache.get(size);
  const bodyEnd = size - CLOSING.length;
  const units = T.STAGES.reduce((sum, s) => sum + s.weight, 0);
  const perUnit = (bodyEnd - BODY_START) / units;
  let cursor = BODY_START;
  let acc = 0;
  const stages = T.STAGES.map((stage, i) => {
    acc += stage.weight;
    const start = cursor;
    const end = i === T.STAGES.length - 1 ? bodyEnd : BODY_START + Math.round(acc * perUnit);
    cursor = end;
    const phaseLen = Math.max(2, Math.floor((end - start - 1) / stage.phases.length));
    return { ...stage, index: i, start, end, phaseLen };
  });
  const result = { stages, anchors: [TURN_OPENING_IDX, ...stages.map((s) => s.start)] };
  layoutCache.set(size, result);
  return result;
}

// Where a Part Two card sits in the Turn.
function locate(idx, size) {
  const { stages } = layout(size);
  const stage = stages.find((s) => idx >= s.start && idx < s.end);
  const local = idx - stage.start;
  if (local === 0) return { stage, type: "stage" };
  const p = Math.min(stage.phases.length - 1, Math.floor((local - 1) / stage.phaseLen));
  const phase = stage.phases[p];
  const phaseLocal = local - 1 - p * stage.phaseLen;
  if (phaseLocal === 0) return { stage, p, phase, type: "phase" };

  const segIndex = Math.floor((phaseLocal - 1) / SEGMENT_SIZE);
  const pos = (phaseLocal - 1) % SEGMENT_SIZE;
  // Split the Segment into units: multi-card Steps and single-card asides.
  const r = rng(seedOf(stage.index, p, segIndex));
  let covered = 0;
  let stepNo = 0;
  for (;;) {
    const aside = r() < 0.2;
    const len = aside ? 1 : [1, 1, 2, 2, 3][Math.floor(r() * 5)];
    if (!aside) stepNo++;
    if (pos < covered + len) {
      return {
        stage,
        p,
        phase,
        seg: segIndex + 1,
        type: aside ? "aside" : "step",
        stepNo,
        part: pos - covered,
        unitSeed: seedOf(stage.index, p, segIndex, covered),
      };
    }
    covered += len;
  }
}

// --- writer -----------------------------------------------------------------
function writer(r, tier, loc = {}) {
  const pick = (arr) => arr[Math.floor(r() * arr.length)];
  const sprites = new Set();
  const focus = loc.phase?.focus || [];

  // Tiered phrase list: 65% current tier, 25% the tier below, 10% anything older.
  const phrase = (tiers) => {
    const open = tiers.slice(0, tier + 1).filter((list) => list.length);
    const roll = r();
    const t = roll < 0.65 || open.length < 2 ? open.length - 1 : roll < 0.9 ? open.length - 2 : Math.floor(r() * open.length);
    return pick(open[t]);
  };
  // Nouns: prefer the Phase's focus pieces, then newly unlocked ones.
  const noun = (list) => {
    const focused = list.filter((x) => focus.includes(x.id));
    let item;
    if (focused.length && r() < 0.6) item = pick(focused);
    else {
      const open = list.filter((x) => x.tier <= tier);
      const fresh = open.filter((x) => x.tier === tier);
      item = fresh.length && r() < 0.4 ? pick(fresh) : pick(open);
    }
    sprites.add(item.id);
    return item;
  };

  const ref = () => {
    if (tier >= 4 && r() < 0.25) return pick(["∞", "0.0.0.0", "IV.½", "π", "the one you're thinking of"]);
    const s = Math.floor(r() * ((loc.stage?.index ?? 0) + 1));
    const stage = T.STAGES[s];
    return `${ROMAN[s]}.${letter(Math.floor(r() * stage.phases.length))}.${between(r, 1, 6)}.${between(r, 1, 9)}`;
  };
  const phaseName = () => {
    const stage = T.STAGES[Math.floor(r() * ((loc.stage?.index ?? 0) + 1))];
    return phaseLabel(pick(stage.phases).name);
  };

  let lastRes = null;
  let lastNeutral = null;
  let lastN = null;
  let concept = null;
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
    neutral: () => (lastNeutral = noun(L.neutrals)).name,
    sameneutral: () => lastNeutral?.name || "the Reeve",
    neutral2: () => noun(L.neutrals).name,
    tok: () => noun(L.tokens).name,
    toks: () => noun(L.tokens).plural,
    phase: phaseName,
    season: () => phrase(L.seasons),
    player: () => `{P${1 + Math.floor(r() * 5)}}`,
    action: () => phrase(L.actions),
    trigger: () => phrase(L.triggers),
    exception: () => phrase(L.exceptions),
    concept: () => (concept ||= phrase(T.concepts)),
    ref,
    n: () => (lastN = String(between(r, 2, 7))),
    samen: () => lastN || "3",
  };

  const fill = (text) => {
    for (let i = 0; i < 6; i++) {
      const next = text.replace(/\{([a-z0-9]+)\}/g, (m, key) => (table[key] ? table[key]() : m));
      if (next === text) break;
      text = next;
    }
    return text;
  };
  return { r, tier, pick, phrase, fill, sprites, ref };
}

// --- card builders ------------------------------------------------------------
function stageCard(loc, tier) {
  const { stage } = loc;
  const names = stage.phases.map((ph) => ph.name);
  const list = `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
  return {
    kind: "stage",
    ribbon: `Stage ${ROMAN[stage.index]}`,
    heading: stage.name,
    body: [
      stage.summary,
      `This Stage has ${names.length} Phases: ${list}.${tier >= 3 ? " Perform them in order, or in the order they would prefer." : ""}`,
    ],
    sprites: [...new Set(stage.phases.flatMap((ph) => ph.focus))].slice(0, 3),
  };
}

const PHASE_INTROS = [
  [],
  [
    "Perform each Segment of this Phase in order. Every player completes each Step before the next player begins, unless a Step says otherwise.",
    "This Phase is resolved Segment by Segment. Results from earlier Stages may be needed; they can be found in the Ledger.",
    "The active player holds the phone for this Phase. Other players may watch but may not tap.",
  ],
  [
    "This Phase is resolved Segment by Segment, then checked, then resolved again wherever the checks disagree.",
    "Before beginning this Phase, confirm that the previous Phase has ended. If it has not, it ends now.",
  ],
  [
    "This Phase may already have begun. Look around. If it has, continue from wherever you believe you are.",
    "Players should approach this Phase calmly and with an open mind.",
  ],
  ["You have been in this Phase before. You will be in this Phase again.", "This Phase is the most important Phase. So was the last one."],
];

function phaseCard(loc, tier, idx) {
  const w = writer(rng(idx + 7), tier, loc);
  return {
    kind: "phase",
    ribbon: `Stage ${ROMAN[loc.stage.index]} · Phase ${letter(loc.p)}`,
    heading: loc.phase.name,
    body: [w.phrase(PHASE_INTROS)],
    sprites: loc.phase.focus.slice(0, 4),
  };
}

function stepRef(loc, tier, r) {
  let ref = `${ROMAN[loc.stage.index]}.${letter(loc.p)}.${loc.seg}.${loc.stepNo}`;
  if (tier >= 2) ref += `(${String.fromCharCode(97 + Math.floor(r() * 6))})`;
  if (tier >= 3) ref += `(${LOWER_ROMAN[Math.floor(r() * LOWER_ROMAN.length)]})`;
  if (tier >= 4) ref += `(${between(r, 1, 9)})`;
  return ref;
}

const withIcons = (sprites, loc, max) => (sprites.size ? [...sprites] : loc.phase.focus).slice(0, max);

function stepCard(loc, tier, idx) {
  // The Step number and title come from the unit seed, so every card of a Step shares them.
  const unit = rng(loc.unitSeed);
  const ref = stepRef(loc, tier, unit);
  const generic = T.genericSteps.slice(0, tier + 1).flat();
  const title =
    generic.length && unit() < 0.35
      ? generic[Math.floor(unit() * generic.length)]
      : loc.phase.steps[Math.floor(unit() * loc.phase.steps.length)];

  const w = writer(rng(idx + 1), tier, loc);
  if (loc.part === 0) {
    const body = [w.fill(w.phrase(T.procedures))];
    if (tier >= 2 && w.r() < 0.3) {
      body.push(w.fill(w.pick(["Record the result in the Ledger.", "The Reeve's Seal is required before continuing.", "Do not continue until every player's {concept} is recorded."])));
    }
    return { kind: "step", ribbon: `Step ${ref}`, heading: title, body, sprites: withIcons(w.sprites, loc, 4) };
  }
  if (loc.part === 1) {
    return { kind: "step", ribbon: `Step ${ref} (cont.)`, heading: title, body: [w.fill(w.phrase(T.continuations))], sprites: withIcons(w.sprites, loc, 3) };
  }
  return {
    kind: "example",
    ribbon: `Step ${ref}: Example`,
    heading: title,
    body: [
      w.fill("{player} controls {n} {pieces}, and their {concept} is {n}. Following Step {ref}, {player} must {action}."),
      w.fill(w.phrase(L.exampleOutcomes)),
    ],
    sprites: withIcons(w.sprites, loc, 4),
  };
}

const CLARIFICATIONS = [
  [],
  [
    "\"Adjacent\" means sharing an edge, not a corner.",
    "A Granary replaces the Cottage it upgrades. The Cottage returns to your supply.",
    "Resources gained during {phase} may be spent in the same Turn.",
    "The Tax Assessor does not collect from Mills.",
  ],
  [
    "For the avoidance of doubt, a {piece} is not a {piece}, even when {trigger}.",
    "{neutral} is not a player, but is entitled to all of a player's Grudges.",
    "\"Adjacent\" means sharing an edge. \"Near\" means sharing an edge or an opinion.",
    "{res} and {res2} are different resources, though they taste similar.",
  ],
  [
    "A {tok} gained during {phase} remains until {phase}, or until {player} forgets about it.",
    "The {terrain} counts as two tiles during {season} and as zero tiles whenever {neutral} is watching.",
    "Cart Roads may not cross. They may, however, have a falling-out.",
    "{neutral} has no hands. {neutral} will find a way.",
  ],
  [
    "The word \"Turn\" refers to your Turn, the Goose's Turn, and the turning of the Earth.",
    "Step numbers are suggestions.",
    "There is no Step 404. There has never been a Step 404. Stop looking for Step 404.",
    "You are allowed to stop tapping. You won't, but you are allowed.",
  ],
];

const SCORING_LINES = [
  [],
  ["Each {piece}", "Every 3 {res}", "Each {tok}", "Control of the {terrain}"],
  ["Each Grudge against {neutral}", "Every {res} traded to {player}", "Each unused {tok}"],
  ["Each apology accepted by a {piece}", "Every time {player} said \"sheep\"", "Having never tapped the Unmapped Hex"],
  ["Each card of this tutorial", "Believing in the Goose", "Your eventual forgiveness"],
];

// [minTier, weight, builder]
const ASIDES = [
  [1, 10, (w) => ({ kind: "clarification", heading: "Clarification", body: [w.fill(w.phrase(CLARIFICATIONS))] })],
  [
    1,
    8,
    (w) => {
      const [q, a] = w.phrase(L.faqs);
      return { kind: "faq", heading: "Frequently Asked Question", body: [w.fill(`Q: ${q}`), w.fill(`A: ${a}`)] };
    },
  ],
  [1, 7, (w) => ({ kind: "note", heading: "Designer's Note", body: [w.fill(w.phrase(L.designerNotes))] })],
  [1, 6, (w, loc) => ({ kind: "patch", heading: `Update 1.${loc.stage.index + 1}.${between(w.r, 2, 40)}`, body: [w.fill(w.phrase(T.patchNotes))] })],
  [1, 5, (w) => ({ kind: "errata", heading: `Exception to Step ${w.ref()}`, body: [w.fill("That Step does not apply if {exception}. In that case, {player} must instead {action}.")] })],
  [
    1,
    5,
    (w) => {
      const concept = w.fill("{concept}");
      const value = () => (w.tier >= 4 && w.r() < 0.3 ? w.pick(["∞", "½", "?", "HONK"]) : between(w.r, 1, 7));
      return {
        kind: "table",
        heading: `${concept} Table`,
        body: Array.from({ length: 4 }, () => w.fill(`${w.phrase(SCORING_LINES)}: ${w.r() < 0.25 ? "−" : "+"}${value()} ${concept}`)),
      };
    },
  ],
  [2, 4, (w) => ({ kind: "errata", heading: `Errata: Step ${w.ref()}`, body: [w.fill("Replace every instance of \"{res}\" with \"{res2}\". Where this creates a contradiction, see Step {ref}.")] })],
  [
    3,
    3,
    (w) => ({
      kind: "errata",
      heading: `Errata to the Errata for Step ${w.ref()}`,
      body: [w.fill("The previous errata should have read \"{res2},\" not \"{res}.\" The errata before that was correct. The Step itself was never correct.")],
    }),
  ],
  [
    4,
    5,
    (w) => ({
      kind: "rule",
      heading: w.pick(["A Step About This Card", "A Step About You", "A Step About Steps"]),
      body: [
        w.fill(
          w.pick([
            "While reading this card, {P1} is considered to be in {phase}. Any {res} they hold is now Gossip.",
            "This card is worth 1 Respect. The previous card is now worth −1 Respect. Plan accordingly.",
            "If {P1} has read every card up to this one, {P1} is the Reeve now. Congratulations. The Reeve has no powers.",
            "Tapping Next counts as a Step. You have taken many Steps. You are winning, in a sense, and losing, in another.",
          ])
        ),
      ],
    }),
  ],
];

function asideCard(loc, tier, idx) {
  const w = writer(rng(idx + 1), tier, loc);
  const options = ASIDES.filter(([min]) => min <= tier);
  let roll = w.r() * options.reduce((s, [, wt]) => s + wt, 0);
  const card = options.find(([, wt]) => (roll -= wt) < 0)[2](w, loc);
  return { ...card, sprites: withIcons(w.sprites, loc, 4) };
}

// --- dealing ------------------------------------------------------------------
// Which deck card is page `step` (0-based) of a `total`-page game?
// Part One gets its natural share, but never less than a fifth of a short game,
// and always ends on its "That's Every Piece" card. Part Two is sampled evenly
// and never skips its opening card or the first card of a Stage.
export function cardFor(step, total) {
  const size = deckSize(total);
  if (step < SETUP.length) return step;
  const fromEnd = total - step;
  if (fromEnd <= CLOSING.length) return size - fromEnd;

  const middle = total - SETUP.length - CLOSING.length;
  const piecesDealt = Math.min(PIECES.length, Math.max(Math.round((middle * PIECES.length) / (size - SETUP.length - CLOSING.length)), Math.round(middle / 5)));
  const k = step - SETUP.length;
  if (k < piecesDealt) {
    return PIECES_START + (piecesDealt === 1 ? PIECES.length - 1 : Math.round((k * (PIECES.length - 1)) / (piecesDealt - 1)));
  }

  const partTwoDealt = middle - piecesDealt;
  const partTwoCards = size - CLOSING.length - TURN_OPENING_IDX;
  const span = (j) => TURN_OPENING_IDX + Math.floor((j * partTwoCards) / partTwoDealt);
  const j = k - piecesDealt;
  const raw = span(j);
  const prev = j === 0 ? TURN_OPENING_IDX - 1 : span(j - 1);
  const anchor = layout(size).anchors.find((a) => a > prev && a <= raw);
  return anchor ?? raw;
}

export const tierAt = (step, total) => tierOfCard(cardFor(step, total), deckSize(total));

// Raw card plus where it sits in the tutorial (placeholders still in).
function cardAt(idx, size) {
  if (idx < SETUP.length) return { ...SETUP[idx], section: "Getting Started", title: "Hearthlands" };
  if (idx < TURN_OPENING_IDX) return PIECES[idx - PIECES_START];
  if (idx === TURN_OPENING_IDX) return { ...TURN_OPENING, section: "Part Two · Sequence of Play", title: "Turn 1" };
  const fromEnd = size - idx;
  if (fromEnd <= CLOSING.length) return { ...CLOSING[CLOSING.length - fromEnd], section: "Turn 1", title: "Complete" };

  const tier = tierOfCard(idx, size);
  const loc = locate(idx, size);
  const stageNo = `Turn 1 · Stage ${ROMAN[loc.stage.index]}`;
  const where =
    loc.type === "stage"
      ? { section: stageNo, title: loc.stage.name }
      : { section: `${stageNo} · Phase ${letter(loc.p)}`, title: loc.phase.name };

  if (loc.type === "stage") return { ...stageCard(loc, tier), ...where };
  if (loc.type === "phase") return { ...phaseCard(loc, tier, idx), ...where };
  if (idx % INTERLUDE_EVERY === 0 && (loc.type === "aside" || loc.part === 0)) {
    const pool = INTERLUDES.filter((s) => s.tier <= tier);
    return { ...pool[Math.floor(idx / INTERLUDE_EVERY) % pool.length], ...where };
  }
  const card = loc.type === "aside" ? asideCard(loc, tier, idx) : stepCard(loc, tier, idx);
  return { ...card, ...where };
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

// Page `step` of a `total`-page game, names filled in.
export function renderScreen(step, players, total) {
  const raw = cardAt(cardFor(step, total), deckSize(total));
  const names = playerNames(players);
  const sub = (s) =>
    s
      .replace(/\{P([1-5])\}/g, (_, d) => names[d - 1])
      .replace(/\{PLAYERS\}/g, listNames(players))
      .replace(/\b([Aa]) (?=[AEIOU])/g, "$1n ")
      .replace(/([.!?] )([a-z])/g, (_, gap, c) => gap + c.toUpperCase());
  return {
    page: step + 1,
    section: raw.section,
    title: raw.title,
    kind: raw.kind,
    ribbon: raw.ribbon || null,
    heading: cap(sub(raw.heading)),
    body: raw.body.map((p) => cap(sub(p))),
    sprites: raw.sprites || [],
  };
}
