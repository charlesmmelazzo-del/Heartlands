// Hand-written cards.
//
// SETUP is always shown first, in full: welcome, how to play on one phone.
// PIECES (Part One) describes every sprite in the game, in order, straight-faced.
// INTERLUDES are sprinkled through Part Two by absurdity tier.
//
// Placeholders: {P1} is the guest who scanned the code; {P2}..{P5} are the
// other players (or an Automa if there aren't enough). {PLAYERS} lists everyone.

export const SETUP = [
  {
    kind: "welcome",
    heading: "Welcome to the Hearthlands",
    body: [
      "Welcome, {PLAYERS}. Hearthlands: Age of Tillage is a game of farming, building, and trading for 1–5 players, played right here on this phone.",
      "Before the first turn, this tutorial will teach you how to play.",
    ],
    sprites: ["reeve", "cottage", "barley"],
  },
  {
    kind: "rule",
    heading: "One Phone, Many Tillers",
    body: [
      "Hearthlands is pass-and-play. On your turn, you hold the phone. When your turn ends, hand it to the player on your left.",
      "{P1} goes first, since {P1} is already holding it.",
    ],
    sprites: ["pawn_red", "pawn_blue", "pawn_cream", "pawn_orange", "pawn_green"],
  },
  {
    kind: "rule",
    heading: "The Goal",
    body: [
      "Each player leads a farming Household. Build Cottages, Granaries, and Mills, connect them with Cart Roads, and trade wisely.",
      "The first Household to earn 10 Respect wins.",
    ],
    sprites: ["respect", "laurel", "cottage"],
  },
  {
    kind: "rule",
    heading: "How This Tutorial Works",
    body: [
      "Part One introduces every piece you'll see on the board. Part Two walks through a single Turn, one Step at a time.",
      "Tap Next to continue. The game begins as soon as the Turn has been explained.",
    ],
    sprites: ["rulebook", "scroll"],
  },
];

const P = "Part One · The Pieces";

export const PIECES = [
  // --- Terrain -------------------------------------------------------------
  { kind: "component", group: "The Board", heading: "The Board", body: ["The app deals a fresh board of hexagonal tiles at the start of every game. Each tile is a type of terrain, and most terrain produces one resource.", "Pinch to zoom. Drag to look around."], sprites: ["barley_rise", "peat_bog", "mutton_downs"] },
  { kind: "component", group: "The Board", heading: "Barley Rise", body: ["Gentle golden hills. Barley Rise produces Barley.", "It is the most common tile, and the most peaceful."], sprites: ["barley_rise", "barley"] },
  { kind: "component", group: "The Board", heading: "Flax Fields", body: ["Rows of pale blue flowers. Flax Fields produce Flax."], sprites: ["flax_fields", "flax"] },
  { kind: "component", group: "The Board", heading: "Mutton Downs", body: ["Open pasture, dotted with sheep. Mutton Downs produce Mutton.", "The sheep are counted every Turn. See the Livestock Stage."], sprites: ["mutton_downs", "mutton"] },
  { kind: "component", group: "The Board", heading: "Peat Bog", body: ["Damp, dark, and useful. The Peat Bog produces Peat.", "The center tile of every board is a Peat Bog."], sprites: ["peat_bog", "peat"] },
  { kind: "component", group: "The Board", heading: "Wicker Marsh", body: ["Willows and reeds. Wicker Marsh produces Wicker."], sprites: ["wicker_marsh", "wicker"] },
  { kind: "component", group: "The Board", heading: "Loamfields", body: ["Freshly plowed furrows. Loamfields produce Loam, which improves the yield of neighboring tiles."], sprites: ["loamfields", "loam"] },
  { kind: "component", group: "The Board", heading: "Brine Flats", body: ["Shallow salt pools. Brine Flats produce Brine, which is used for rations and for preserving Mutton."], sprites: ["brine_flats", "brine"] },
  { kind: "component", group: "The Board", heading: "Tallow Mines", body: ["A rocky hillside with a timber entrance. Tallow Mines produce Tallow.", "Nobody is entirely sure why Tallow is mined."], sprites: ["tallow_mines", "tallow"] },
  { kind: "component", group: "The Board", heading: "The Unmapped Hex", body: ["Every board contains one blank tile. It produces nothing.", "You can tap it. We'd recommend that you don't."], sprites: ["the_unmapped"] },

  // --- Resources -----------------------------------------------------------
  { kind: "component", group: "Resources", heading: "Resource Cards", body: ["Resources are held as cards in your hand, shown along the bottom of your screen when you hold the phone.", "Keep your hand hidden from other players by tilting the phone away from them."], sprites: ["card_back"] },
  { kind: "component", group: "Resources", heading: "Barley", body: ["Used for Cottages, Granaries, and Almanac cards. Also the main ingredient in several Steps of the Turn."], sprites: ["barley"] },
  { kind: "component", group: "Resources", heading: "Flax", body: ["Used for Granaries and Mills. Flax can also be woven, though the app does not currently support weaving."], sprites: ["flax"] },
  { kind: "component", group: "Resources", heading: "Mutton", body: ["Used for Cottages and for feeding Drovers. Mutton spoils unless salted with Brine."], sprites: ["mutton"] },
  { kind: "component", group: "Resources", heading: "Peat", body: ["Used for Cart Roads and Mills. Peat keeps Cottages warm during Frostmonth."], sprites: ["peat"] },
  { kind: "component", group: "Resources", heading: "Wicker", body: ["Used for Cart Roads, Cottages, and Wattle Fences. Lightweight and dependable."], sprites: ["wicker"] },
  { kind: "component", group: "Resources", heading: "Loam", body: ["Loam is not spent. It is spread. Each Loam spread on a tile raises that tile's yield for the rest of the game."], sprites: ["loam"] },
  { kind: "component", group: "Resources", heading: "Tallow", body: ["Used for candles, which extend your working hours into the Quiet Hour.", "Tallow melts in warm weather. See the Tallow Melt Check."], sprites: ["tallow"] },
  { kind: "component", group: "Resources", heading: "Brine", body: ["Used for rations and for salting Mutton. Each Drover requires Brine every Turn."], sprites: ["brine"] },
  { kind: "component", group: "Resources", heading: "Turnips", body: ["Turnips are not produced by any tile. They simply appear, usually when you have no room for them."], sprites: ["turnip"] },
  { kind: "component", group: "Resources", heading: "Gossip", body: ["Gossip is a resource that is passed between players by whispering the name of the card.", "It cannot be spent, only spread."], sprites: ["gossip"] },
  { kind: "component", group: "Resources", heading: "Respect", body: ["Respect is your score. It is shown as bronze medallions next to your Household name.", "The first player to 10 Respect wins."], sprites: ["respect"] },

  // --- Buildings -----------------------------------------------------------
  { kind: "component", group: "Buildings", heading: "Cottage", body: ["Your first building. A Cottage collects resources from each tile it touches. Worth 1 Respect.", "To build, drag a Cottage from your supply onto a corner of the board."], sprites: ["cottage"] },
  { kind: "component", group: "Buildings", heading: "Granary", body: ["An upgraded Cottage. Collects twice as many resources and stores surplus. Worth 2 Respect."], sprites: ["granary"] },
  { kind: "component", group: "Buildings", heading: "Cart Road", body: ["Roads connect your buildings. You may only build new buildings at the end of your own Cart Roads.", "Drag along the edge of a tile to place one."], sprites: ["cart_road"] },
  { kind: "component", group: "Buildings", heading: "Mill", body: ["A Mill converts two of one resource into one of another, once per Turn. Worth 1 Respect."], sprites: ["mill"] },
  { kind: "component", group: "Buildings", heading: "Well", body: ["A Well supplies Brine-free water to nearby Drovers, reducing their ration needs."], sprites: ["well"] },
  { kind: "component", group: "Buildings", heading: "Drover", body: ["A Drover moves your livestock and Hay Carts along Cart Roads. Drovers need Mutton and Brine every Turn, and good morale."], sprites: ["drover"] },
  { kind: "component", group: "Buildings", heading: "Tithe Barn", body: ["A Tithe Barn protects nearby buildings from the Tax Assessor, but pays a tithe of its own to the Reeve."], sprites: ["tithe_barn"] },
  { kind: "component", group: "Buildings", heading: "Wattle Fence", body: ["A Wattle Fence marks your boundary. Fences block Drovers, Hay Carts, and most sheep."], sprites: ["fence"] },
  { kind: "component", group: "Buildings", heading: "Hay Cart", body: ["Hay Carts carry resources between your buildings. Each cart has an axle that wears down with use."], sprites: ["cart"] },
  { kind: "component", group: "Buildings", heading: "Scarecrow", body: ["A Scarecrow protects one tile from Blight. It also protects against the Goose, in theory."], sprites: ["scarecrow"] },
  { kind: "component", group: "Buildings", heading: "Hedgerow", body: ["Hedgerows grow on their own along boundaries. They can be trimmed, but they remember."], sprites: ["hedge"] },
  { kind: "component", group: "Buildings", heading: "Chapel of Mild Concern", body: ["A small chapel that grants 1 Respect to its owner.", "It is concerned about something. It has not said what."], sprites: ["chapel"] },

  // --- Characters ----------------------------------------------------------
  { kind: "component", group: "Characters", heading: "Characters", body: ["Characters are neutral pieces controlled by the app. They move on their own during the Turn.", "You can tap a character to see what it's planning. It won't always tell you."], sprites: ["reeve", "assessor", "goose"] },
  { kind: "component", group: "Characters", heading: "The Reeve", body: ["The village official. The Reeve blocks production on whichever tile he stands on, and settles disputes."], sprites: ["reeve"] },
  { kind: "component", group: "Characters", heading: "The Tax Assessor", body: ["Walks the Cart Roads collecting the Levy. His route is calculated every Turn. His lunch break is not negotiable."], sprites: ["assessor"] },
  { kind: "component", group: "Characters", heading: "The Tinker", body: ["Wanders the board repairing Hay Cart axles, for a price."], sprites: ["tinker"] },
  { kind: "component", group: "Characters", heading: "Gerald, the Communal Ox", body: ["Gerald belongs to everyone. Any player may borrow Gerald to pull a Hay Cart, if Gerald isn't tired."], sprites: ["ox"] },
  { kind: "component", group: "Characters", heading: "The Goose", body: ["The Goose moves after every Stage. It cannot be removed from the board.", "It is best not to have opinions about the Goose."], sprites: ["goose"] },
  { kind: "component", group: "Characters", heading: "The Unwelcome Bard", body: ["The Bard improves Drover morale by singing. The Bard lowers everyone else's morale by singing."], sprites: ["bard"] },
  { kind: "component", group: "Characters", heading: "The Village Idiot", body: ["Moves randomly. Votes in all disputes. His vote counts double."], sprites: ["idiot"] },
  { kind: "component", group: "Characters", heading: "The Magistrate of Hedges", body: ["Rules on boundary disputes. Always brings shears. Always uses them."], sprites: ["magistrate"] },
  { kind: "component", group: "Characters", heading: "The Hedge Witch", body: ["Sells remedies for Blight and Plague. Payment is in Flax, or in something she'll name later."], sprites: ["witch"] },
  { kind: "component", group: "Characters", heading: "The Lost Pilgrim", body: ["Always holding the map upside down. The Pilgrim is trying to reach the Unmapped Hex."], sprites: ["pilgrim"] },
  { kind: "component", group: "Characters", heading: "The Weather Prophet", body: ["Predicts the weather one Turn in advance. He is right about half the time, which he considers excellent."], sprites: ["prophet"] },
  { kind: "component", group: "Characters", heading: "The Rat King", body: ["Lives beneath the most crowded Granary. Holds court once per Turn. You will be expected to attend."], sprites: ["rat_king"] },

  // --- Tokens --------------------------------------------------------------
  { kind: "component", group: "Tokens", heading: "Tokens", body: ["Tokens track everything else. They appear on your Household screen and on the board. Tap any token to see what it does."], sprites: ["harvest_die", "grudge", "favor"] },
  { kind: "component", group: "Tokens", heading: "The Harvest Die", body: ["The app rolls the Harvest Die for you at the start of each Turn. Every tile showing the rolled number produces.", "The Harvest Die has thirteen sides."], sprites: ["harvest_die"] },
  { kind: "component", group: "Tokens", heading: "Weather Cube", body: ["Shows Sun, Rain, or Fog. The weather changes how tiles produce, how fast Tallow melts, and how the Goose feels."], sprites: ["weather_cube"] },
  { kind: "component", group: "Tokens", heading: "Almanac Cards", body: ["Buy Almanac cards to gain one-time advantages. Each card is worded carefully. Read them carefully."], sprites: ["almanac"] },
  { kind: "component", group: "Tokens", heading: "Favor of the Reeve", body: ["Earned by following the rules exactly. A Favor lets you ignore one Step of your choosing."], sprites: ["favor"] },
  { kind: "component", group: "Tokens", heading: "Ledger Pages", body: ["The Ledger records every trade, tax, and dispute. You can review the Ledger at any time by swiping down."], sprites: ["ledger"] },
  { kind: "component", group: "Tokens", heading: "Reeve's Seal", body: ["Makes a trade or ruling official. Unsealed trades may be reversed during the Levy Stage."], sprites: ["wax_seal"] },
  { kind: "component", group: "Tokens", heading: "Grudge Tokens", body: ["Any player may declare a Grudge against another player, a tile, or a character. Grudges affect trading, voting, and scoring."], sprites: ["grudge"] },
  { kind: "component", group: "Tokens", heading: "Debt Pebbles", body: ["Taken when you can't pay the Levy. Debt Pebbles grow each Turn. Slowly, then not slowly."], sprites: ["debt"] },
  { kind: "component", group: "Tokens", heading: "Blight Cubes", body: ["Blight spreads from tile to tile, reducing yield. Scarecrows and the Hedge Witch can help."], sprites: ["blight"] },
  { kind: "component", group: "Tokens", heading: "Rumor Chits", body: ["Rumors are placed face-down on other players' Households. Nobody may check what a Rumor says until the Reckoning Stage."], sprites: ["rumor"] },
  { kind: "component", group: "Tokens", heading: "Plague Markers", body: ["If Plague reaches a Cottage, that Cottage stops producing until the Quarantine Phase is resolved."], sprites: ["plague"] },
  { kind: "component", group: "Tokens", heading: "The Dawdling Hourglass", body: ["Some Steps are timed. The Dawdling Hourglass runs during those Steps.", "It runs slower when you look at it."], sprites: ["hourglass"] },

  // --- Households ----------------------------------------------------------
  { kind: "component", group: "Households", heading: "Household Colors", body: ["Each player's pieces appear in their Household color: red, blue, cream, orange, or green. {P1} is red."], sprites: ["pawn_red", "pawn_blue", "pawn_cream", "pawn_orange", "pawn_green"] },
  { kind: "component", group: "Households", heading: "The Beige Household", body: ["Beige belongs to the Tax Assessor. No player may choose beige.", "If the app ever shows you in beige, see the Levy Stage immediately."], sprites: ["pawn_beige", "assessor"] },
  { kind: "component", group: "Households", heading: "The Compass", body: ["The board always faces north. North is indicated by the compass in the corner of the screen.", "North may change during the Turn."], sprites: ["compass"] },
  { kind: "note", group: "Households", heading: "That's Every Piece", body: ["You've now met every piece in Hearthlands, {P1}.", "Next, Part Two explains a single Turn. A Turn has a few Stages."], sprites: ["rulebook", "cottage", "goose"] },
].map((card) => ({ ...card, section: P, title: card.group }));

export const TURN_OPENING = {
  kind: "welcome",
  heading: "Part Two: Sequence of Play",
  body: [
    "Hearthlands is played in Turns. Each Turn is divided into Stages. Each Stage is divided into Phases, each Phase into Segments, and each Segment into Steps.",
    "Players perform every Step, in order. Most Steps only take a moment. Turn 1 begins now.",
  ],
  sprites: ["scroll", "hourglass", "harvest_die"],
};

export const INTERLUDES = [
  { tier: 1, kind: "note", heading: "A Brief Pause", body: ["You're making great progress, {P1}.", "The level of detail in each Turn is what makes Hearthlands so rewarding."], sprites: ["reeve", "favor"] },
  { tier: 1, kind: "note", heading: "A Reminder", body: ["If the phone has been with {P1} for a while, that's normal. It's still {P1}'s turn."], sprites: ["hourglass"] },
  { tier: 1, kind: "note", heading: "Hydration Reminder", body: ["Hearthlands is best enjoyed with a beverage.", "Beverages are not a resource."], sprites: ["well"] },
  { tier: 2, kind: "note", heading: "Checking In", body: ["How is {P2} holding up? If {P2} has fallen asleep, tap their Household twice. This is legal."], sprites: ["rumor"] },
  { tier: 2, kind: "errata", heading: "Errata", body: ["Everything on the previous card was correct, except for the parts that were not.", "Please re-read the previous card with that in mind. (We'll wait.)"], sprites: ["ledger"] },
  { tier: 2, kind: "note", heading: "You Are Making Progress", body: ["Statistically, most players who reach this card go on to finish the Turn.", "That statistic was generated by the Village Idiot."], sprites: ["idiot"] },
  { tier: 2, kind: "note", heading: "Intermission", body: ["The Unwelcome Bard will now perform a ballad summarizing the Turn so far.", "The ballad is 400 verses. It has been muted. The Bard has not been told."], sprites: ["bard"] },
  { tier: 3, kind: "note", heading: "A Message from the Goose", body: ["HONK."], sprites: ["goose"] },
  { tier: 3, kind: "note", heading: "Encouragement", body: ["Every great Tiller once sat exactly where you're sitting, {P1}, tapping Next and wondering about their choices.", "Most of them became great Tillers. Some of them became Scarecrows."], sprites: ["scarecrow"] },
  { tier: 3, kind: "rule", heading: "Table Talk", body: ["{P3} and {P4} may not discuss strategy during the Turn. They may, however, discuss their feelings about the Turn.", "Their feelings are not relevant to the Turn."], sprites: ["gossip"] },
  { tier: 3, kind: "note", heading: "Have You Tapped the Unmapped Hex?", body: ["Don't."], sprites: ["the_unmapped"] },
  { tier: 4, kind: "note", heading: "A Message from the Goose", body: ["HONK HONK. HONK HONK HONK.", "(Translation: the Goose is proud of you, {P1}. The Goose would never say so.)"], sprites: ["goose", "laurel"] },
  { tier: 4, kind: "note", heading: "The Tutorial Would Like a Word", body: ["{P1}. It's me. The tutorial.", "Nobody has ever gotten this far. I don't have anything prepared. Please keep tapping; I'll think of something."], sprites: ["rulebook", "quill"] },
  { tier: 4, kind: "rule", heading: "Step ∞", body: ["There is always one more Step."], sprites: ["scroll"] },
  { tier: 4, kind: "faq", heading: "Frequently Asked Question", body: ["Q: What time is it?", "A: Later than when you started, {P1}. Much later."], sprites: ["hourglass"] },
];

export const CLOSING = [
  { kind: "clarification", heading: "Final Clarification", body: ["There are no further Steps.", "(See the Recursive Stage for exceptions.)"], sprites: ["ledger"] },
  { kind: "welcome", heading: "Turn 1 Is Explained", body: ["{PLAYERS}: you now know how to play one complete Turn of Hearthlands: Age of Tillage.", "Tap Next to begin the game."], sprites: ["reeve", "goose", "cottage"] },
];
