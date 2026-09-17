// The world of Hearthlands, arranged by ABSURDITY TIER.
//
//   Tier 0 — sounds like a real board game.
//   Tier 1 — a real board game with a fussy designer.
//   Tier 2 — the designer has opinions about geese.
//   Tier 3 — the rules have started noticing you.
//   Tier 4 — the rulebook has achieved something like consciousness.
//
// Nouns carry a `tier` (the earliest tier they may appear). Phrase lists are
// arrays of arrays: index = tier. The generator only draws from tiers at or
// below the guest's current tier, weighted toward the current one.
// Every noun id has a sprite in public/sprites.js.

export const resources = [
  { tier: 0, id: "barley", name: "Barley", plural: "Barley" },
  { tier: 0, id: "flax", name: "Flax", plural: "Flax" },
  { tier: 0, id: "mutton", name: "Mutton", plural: "Mutton" },
  { tier: 0, id: "peat", name: "Peat", plural: "Peat" },
  { tier: 0, id: "wicker", name: "Wicker", plural: "Wicker" },
  { tier: 1, id: "loam", name: "Loam", plural: "Loam" },
  { tier: 1, id: "tallow", name: "Tallow", plural: "Tallow" },
  { tier: 1, id: "brine", name: "Brine", plural: "Brine" },
  { tier: 2, id: "turnip", name: "Turnip", plural: "Turnips" },
  { tier: 2, id: "gossip", name: "Gossip", plural: "Gossip" },
];

export const terrain = [
  { tier: 0, id: "barley_rise", name: "Barley Rise" },
  { tier: 0, id: "flax_fields", name: "Flax Fields" },
  { tier: 0, id: "mutton_downs", name: "Mutton Downs" },
  { tier: 0, id: "peat_bog", name: "Peat Bog" },
  { tier: 0, id: "wicker_marsh", name: "Wicker Marsh" },
  { tier: 1, id: "loamfields", name: "Loamfields" },
  { tier: 1, id: "brine_flats", name: "Brine Flats" },
  { tier: 1, id: "tallow_mines", name: "Tallow Mines" },
  { tier: 3, id: "the_unmapped", name: "Unmapped Hex" },
];

export const pieces = [
  { tier: 0, id: "cottage", name: "Cottage", plural: "Cottages" },
  { tier: 0, id: "granary", name: "Granary", plural: "Granaries" },
  { tier: 0, id: "cart_road", name: "Cart Road", plural: "Cart Roads" },
  { tier: 0, id: "mill", name: "Mill", plural: "Mills" },
  { tier: 1, id: "well", name: "Well", plural: "Wells" },
  { tier: 1, id: "drover", name: "Drover", plural: "Drovers" },
  { tier: 1, id: "tithe_barn", name: "Tithe Barn", plural: "Tithe Barns" },
  { tier: 1, id: "fence", name: "Wattle Fence", plural: "Wattle Fences" },
  { tier: 1, id: "cart", name: "Hay Cart", plural: "Hay Carts" },
  { tier: 2, id: "scarecrow", name: "Scarecrow", plural: "Scarecrows" },
  { tier: 2, id: "hedge", name: "Hedgerow", plural: "Hedgerows" },
  { tier: 3, id: "chapel", name: "Chapel of Mild Concern", plural: "Chapels of Mild Concern" },
];

export const neutrals = [
  { tier: 0, id: "reeve", name: "the Reeve" },
  { tier: 1, id: "assessor", name: "the Tax Assessor" },
  { tier: 1, id: "tinker", name: "the Tinker" },
  { tier: 2, id: "goose", name: "the Goose" },
  { tier: 2, id: "ox", name: "Gerald, the Communal Ox" },
  { tier: 2, id: "bard", name: "the Unwelcome Bard" },
  { tier: 2, id: "idiot", name: "the Village Idiot" },
  { tier: 2, id: "magistrate", name: "the Magistrate of Hedges" },
  { tier: 3, id: "witch", name: "the Hedge Witch" },
  { tier: 3, id: "pilgrim", name: "the Lost Pilgrim" },
  { tier: 3, id: "prophet", name: "the Weather Prophet" },
  { tier: 4, id: "rat_king", name: "the Rat King" },
];

export const tokens = [
  { tier: 3, id: "harvest_die", name: "Harvest Die", plural: "Harvest Dice" },
  { tier: 0, id: "respect", name: "Respect point", plural: "Respect points" },
  { tier: 0, id: "card_back", name: "Resource card", plural: "Resource cards" },
  { tier: 1, id: "favor", name: "Favor of the Reeve", plural: "Favors of the Reeve" },
  { tier: 1, id: "weather_cube", name: "Weather Cube", plural: "Weather Cubes" },
  { tier: 1, id: "almanac", name: "Almanac card", plural: "Almanac cards" },
  { tier: 1, id: "ledger", name: "Ledger page", plural: "Ledger pages" },
  { tier: 2, id: "grudge", name: "Grudge token", plural: "Grudge tokens" },
  { tier: 2, id: "debt", name: "Debt Pebble", plural: "Debt Pebbles" },
  { tier: 2, id: "blight", name: "Blight cube", plural: "Blight cubes" },
  { tier: 2, id: "wax_seal", name: "Reeve's Seal", plural: "Reeve's Seals" },
  { tier: 3, id: "rumor", name: "Rumor chit", plural: "Rumor chits" },
  { tier: 3, id: "plague", name: "Plague marker", plural: "Plague markers" },
  { tier: 3, id: "hourglass", name: "Dawdling Hourglass", plural: "Dawdling Hourglasses" },
];

export const seasons = [
  ["Spring", "Summer", "Harvest", "Winter"],
  ["Sowing", "High Harvest", "Frostmonth"],
  ["Mudtide", "the Long Damp", "the Lean Weeks"],
  ["the Season of Mild Regret", "Second Winter", "the Week the Goose Left"],
  ["a season not yet invented", "the Season of This Tutorial"],
];

// What a Step makes you do. Lowercase, completes "must ___".
export const actions = [
  [
    "discard one {res}",
    "take one {res} from the supply",
    "move the Reeve to another hex",
    "pass one Resource card to the player on their left",
    "reroll the Harvest Die",
    "return one Cart Road to their supply",
    "draw one Resource card",
    "discard half their Resource cards, rounded down",
  ],
  [
    "take a {tok}",
    "place a {tok} on the {terrain}",
    "pay one {res} to the Tax Assessor",
    "consult the Almanac (see the Almanac Stage)",
    "flip the Weather Cube to Drizzle",
    "skip {phase}",
    "move their Drover one hex toward the nearest {terrain}",
    "record the transaction on a Ledger page",
    "discard one {res} for each {piece} they control",
  ],
  [
    "declare a Grudge against {player}",
    "remove a {piece} from the board and apologize to it",
    "recount their {res} aloud, slowly",
    "move {neutral} one hex toward the nearest {terrain}",
    "narrate, in character, what their {piece} had for breakfast",
    "offer {player} a trade they are obligated to refuse",
    "gain 2 {res}, then lose 3 {res}",
    "hide a {tok} on their Household screen",
    "stand for the remainder of {phase}",
    "honk once",
  ],
  [
    "hum until {phase} ends",
    "rotate their {piece} 60° clockwise for luck and 60° back for balance",
    "surrender their name to {neutral} until the end of the round",
    "describe the smell of {res} to {player} without using the word \"{sameres}\"",
    "type a short apology to the {terrain} and send it to no one",
    "draw an Almanac card and read only the second sentence, in a whisper",
    "trade places with {player}, both physically and spiritually",
    "remember a time they were kind to {neutral}",
    "tell {player} one secret about Flax",
    "pretend the last three turns were a dream",
  ],
  [
    "become {neutral} until someone asks \"is this allowed\"",
    "tap Next (this one counts)",
    "forget everything they know about {res}, then relearn it faster",
    "acknowledge that {player} was right about the Goose all along",
    "read this Step again, but louder",
    "close the app, metaphorically, while leaving it open",
    "gain one Respect point for each card of this tutorial they have read (so far: a lot)",
    "accept that {neutral} has always been inside this phone",
    "swap their {res} for a {tok} that exists only in their heart",
    "begin the game again from the beginning, but only in their mind",
  ],
];

// What triggers a Step. Completes "When ___".
export const triggers = [
  [
    "a player rolls a 7",
    "a player builds a {piece}",
    "a {piece} is placed next to the {terrain}",
    "a player has more than seven Resource cards",
    "two players want to build on the same spot",
    "the supply of {res} runs out",
    "a player completes a Cart Road of five or more",
  ],
  [
    "the Weather Cube shows Fog",
    "a player holds more {res} than {res2}",
    "the Tax Assessor ends its movement on the {terrain}",
    "a trade involves exactly one {res}",
    "it is {season}",
    "a player builds their third {piece}",
    "a {tok} is revealed during {phase}",
  ],
  [
    "the Harvest Die shows a 13",
    "{neutral} ends its movement on a hex containing {res}",
    "{player} sneezes during {phase}",
    "any player says the word \"sheep\"",
    "{neutral} and {neutral2} occupy the same hex",
    "the phone is held upside-down",
    "{player} has not built anything in two rounds",
    "the Goose is looking at someone",
  ],
  [
    "{player} thinks about Barley, even briefly",
    "the Unmapped Hex is mentioned aloud",
    "a {piece} develops a personality",
    "a player opens a different app (this includes checking the time)",
    "{neutral} has a bad dream",
    "the room gets a little too quiet",
    "a player remembers a Step they have not read yet",
  ],
  [
    "you are reading this",
    "the Goose is promoted",
    "time moves in any direction",
    "{player} realizes the Tutorial may itself be the game",
    "the tutorial begins to play itself",
    "{neutral} achieves ownership of the phone",
    "there are more Steps than there were a moment ago",
  ],
];

// Completes "unless ___".
export const exceptions = [
  [
    "they already built this turn",
    "the hex is occupied",
    "it is the first round of the game",
    "they have no Resource cards",
    "every other player agrees",
  ],
  [
    "the {terrain} is Fallow",
    "they hold a Favor of the Reeve",
    "the Weather Cube has not been flipped since {phase}",
    "a Tithe Barn is within two hexes",
    "it is the first round of {season}",
  ],
  [
    "{neutral} is facing north",
    "the player has already declared a Grudge this turn",
    "{player} objects within five seconds",
    "the Goose is asleep (see Goose Awakening)",
    "all players agree, which they will not",
  ],
  [
    "the {piece} was built on a Tuesday (real-world)",
    "they can spell \"Hearthlands\" backwards without pausing",
    "{player} is wearing something beige",
    "the player has made peace with the Unmapped Hex",
    "{neutral} believes in them",
  ],
  [
    "this Step has already happened",
    "they were never here to begin with",
    "the Goose says otherwise (it will)",
    "they are the tutorial",
    "reading this exception has triggered a second exception",
  ],
];

export const designerNotes = [
  [
    "We wanted resource trading to feel fair but tense. Playtesting showed four players is the sweet spot.",
    "Cart Roads are cheap on purpose. Early expansion keeps the game moving.",
    "The Reeve was added so that no single player can dominate one region of the board.",
  ],
  [
    "Early versions had a resource called Honey. It was removed for being too sticky, balance-wise.",
    "Some players ask why Tallow is worth more than Barley. Have you ever tried to make a candle out of Barley?",
    "We playtested this Step for eleven years. We think it's close.",
  ],
  [
    "This Step exists because of an incident in 2014. The Goose knows what it did.",
    "We considered removing this Step, but it holds up four other Steps structurally.",
    "The Harvest Die has thirteen sides. Our lead programmer insists this is fine. Our lead programmer has thirteen fingers.",
    "Playtesters reported this Stage was \"too much.\" We added three more Phases.",
    "Yes, this contradicts Step II.B.3.4. Step II.B.3.4 knows what it did.",
  ],
  [
    "Our lawyers asked us to clarify that Gerald the Ox is fictional. Gerald would disagree. Gerald has his own lawyers.",
    "The Village Idiot was originally a game mechanic. Now it's more of a lifestyle.",
    "Three of our playtesters are no longer speaking to each other. One of them is no longer speaking at all, only honking.",
    "We don't talk about the Trebuchet.",
  ],
  [
    "The developers of Hearthlands are no longer available for comment. The Goose has taken over the studio.",
    "This note was written before the game existed. The game was written before this note.",
    "If you are reading this, you are further than any of us ever got.",
    "We never finished playtesting. We never finished the tutorial.",
  ],
];

export const faqs = [
  [
    ["Can I trade with players who aren't taking their turn?", "No. You may only trade with the active player."],
    ["Can two Cottages be placed next to each other?", "No. Cottages must be at least two intersections apart."],
    ["What happens if the supply runs out of a resource?", "No one receives that resource this Turn."],
  ],
  [
    ["Can I trade {res} for {res2} during {phase}?", "Only if the Reeve is not on either hex involved."],
    ["Does a Hay Cart count as a building?", "For scoring, yes. For the Levy, no. For the Almanac, it depends."],
    ["What if two players both want to be the Reeve?", "The Reeve is not a player. Please stop asking."],
  ],
  [
    ["Does {neutral} count as a player for the purpose of Grudges?", "Yes, but it will remember."],
    ["What happens if I drop the phone?", "The game is over. Everyone loses, especially the phone."],
    ["Is Gossip a resource or a condition?", "Both, depending on the season."],
    ["How many Grudge tokens is too many?", "There is no upper limit. There is, however, a spiritual one."],
    ["Is the Goose friendly?", "The Goose is not friendly. The Goose is not unfriendly. The Goose is the Goose."],
  ],
  [
    ["My {piece} is on fire. Is that a feature?", "Not yet. See the next update."],
    ["Can the Unmapped Hex be mapped?", "It has been tried."],
    ["Why does {neutral} keep looking at me?", "Because you keep looking at {neutral}."],
    ["Can I skip the tutorial?", "There is a way to skip the tutorial. It is explained in the tutorial."],
    ["Can I play on two phones?", "No. The Goose can only be in one place at a time."],
  ],
  [
    ["How long does a typical game take?", "Yes."],
    ["Are we playing yet?", "In a sense, {P1}, you have been playing this whole time."],
    ["Who wrote this tutorial?", "HONK."],
    ["Is there an end?", "Keep going."],
  ],
];

// Wrapping lines for worked examples.
export const exampleOutcomes = [
  ["Play passes to the left.", "{player} builds a Cottage. Play continues.", "Nobody scores this round."],
  ["{player} records it on a Ledger page. Play continues.", "Everyone agrees this is fair.", "{player} asks if this is a real Step. It is."],
  ["{player} declares a Grudge. Play continues.", "The table falls silent. The Goose honks once.", "Everyone agrees this is fair. (It is not.)"],
  ["{player} weeps quietly. This is correct play.", "Nobody gains Respect. Nobody deserves it.", "The {piece} is never spoken of again."],
  ["The phone becomes the board. The board becomes the phone.", "{player} wins, retroactively, a game from 1987.", "Everyone is the Goose now."],
];

// Names for missing players when a guest plays with fewer than 5.
export const automa = ["the Automa", "Old Tobias (Automa)", "a Very Patient Ghost", "Cousin Wendel (Automa)"];
