// Hand-written screens.
//
// INTRO plays first, in order, and is deliberately straight-faced: it should
// read like a real rulebook so nobody suspects anything yet.
//
// INTERLUDES are sprinkled through the generated rules. Each has a `tier`; a
// guest only sees interludes at or below their current absurdity tier.
//
// Placeholders: {P1} is the guest who scanned the code; {P2}..{P5} are the
// other players (or an Automa if there aren't enough). {PLAYERS} lists everyone.

export const INTRO = [
  {
    kind: "welcome",
    heading: "Welcome to the Hearthlands",
    body: [
      "Welcome, {PLAYERS}. In Hearthlands: Age of Tillage, each player leads a farming Household competing to become the most Respected in the valley.",
      "This short tutorial will teach you everything you need for your first game.",
    ],
    sprites: ["rulebook", "cottage", "barley"],
  },
  {
    kind: "rule",
    heading: "The Object of the Game",
    body: [
      "Earn Respect by building Cottages, Granaries, and Mills, by connecting your Household with Cart Roads, and by trading wisely.",
      "The first Household to reach 10 Respect wins.",
    ],
    sprites: ["respect", "cottage", "granary"],
  },
  {
    kind: "component",
    heading: "What's in the Box",
    body: [
      "19 terrain hexes, 95 Resource cards, 5 sets of Household pieces, 1 Reeve, 1 Harvest Die, and this rulebook.",
    ],
    sprites: ["barley_rise", "card_back", "harvest_die", "reeve"],
  },
  {
    kind: "component",
    heading: "The Five Resources",
    body: [
      "Barley, Flax, Mutton, Peat, and Wicker.",
      "Each comes from a different type of terrain, and each is used to build different things.",
    ],
    sprites: ["barley", "flax", "mutton", "peat", "wicker"],
  },
  {
    kind: "component",
    heading: "The Terrain",
    body: [
      "Barley Rise produces Barley. Flax Fields produce Flax. Mutton Downs produce Mutton. The Peat Bog produces Peat. Wicker Marsh produces Wicker.",
    ],
    sprites: ["barley_rise", "mutton_downs", "peat_bog", "wicker_marsh"],
  },
  {
    kind: "component",
    heading: "Your Household Pieces",
    body: ["Each player takes the pieces in their color: 5 Cottages, 4 Granaries, 2 Mills, and 15 Cart Roads."],
    sprites: ["cottage", "granary", "mill", "cart_road"],
  },
  {
    kind: "rule",
    heading: "Choosing Colors",
    body: [
      "Players choose from red, blue, cream, orange, and green.",
      "{P1} chooses first, then play proceeds clockwise.",
    ],
    sprites: ["pawn_red", "pawn_blue", "pawn_cream", "pawn_orange", "pawn_green"],
  },
  {
    kind: "rule",
    heading: "Building the Board",
    body: [
      "Shuffle the terrain hexes and arrange them face-up in a large hexagon.",
      "Place a number token on each hex. The Peat Bog in the center receives no number.",
    ],
    sprites: ["peat_bog", "barley_rise", "wicker_marsh"],
  },
  {
    kind: "rule",
    heading: "Placing the Reeve",
    body: [
      "The Reeve begins the game on the center hex.",
      "While the Reeve is on a hex, that hex does not produce resources.",
    ],
    sprites: ["reeve"],
  },
  {
    kind: "rule",
    heading: "Starting Positions",
    body: [
      "In turn order, each player places one Cottage and one attached Cart Road on the board.",
      "Then, in reverse order, each player places a second Cottage and Cart Road.",
    ],
    sprites: ["cottage", "cart_road"],
  },
  {
    kind: "rule",
    heading: "Starting Resources",
    body: ["Each player takes one Resource card for each hex touching their second Cottage."],
    sprites: ["card_back", "cottage"],
  },
  {
    kind: "rule",
    heading: "Taking a Turn",
    body: [
      "Each turn has three phases: the Production Phase, the Trade Phase, and the Build Phase.",
      "Play proceeds clockwise, beginning with {P1}.",
    ],
    sprites: ["harvest_die", "card_back", "cottage"],
  },
  {
    kind: "rule",
    heading: "The Production Phase",
    body: [
      "Roll the Harvest Die. Every hex showing that number produces its resource.",
      "Each player with a Cottage touching that hex takes one card. Each player with a Granary takes two.",
    ],
    sprites: ["harvest_die", "barley"],
  },
  {
    kind: "example",
    heading: "Example of Play",
    body: [
      "{P1} rolls a 6. The Barley Rise showing 6 produces. {P1} has a Cottage there and takes 1 Barley. {P2} has a Granary there and takes 2 Barley.",
    ],
    sprites: ["harvest_die", "barley", "cottage", "granary"],
  },
  {
    kind: "rule",
    heading: "Rolling a 7",
    body: [
      "When a 7 is rolled, no hexes produce. Instead, any player with more than seven Resource cards discards half of them.",
      "The active player then moves the Reeve to a new hex.",
    ],
    sprites: ["harvest_die", "reeve"],
  },
  {
    kind: "rule",
    heading: "The Trade Phase",
    body: [
      "The active player may trade Resource cards with any other player, on any terms both agree to.",
      "They may also trade with the supply at a rate of 4 identical cards for 1 card of their choice.",
    ],
    sprites: ["card_back", "flax", "mutton"],
  },
  {
    kind: "rule",
    heading: "The Build Phase",
    body: ["The active player may spend resources to build as many pieces as they can afford."],
    sprites: ["cottage", "cart_road"],
  },
  {
    kind: "table",
    heading: "Building Costs",
    body: [
      "Cart Road: 1 Wicker, 1 Peat",
      "Cottage: 1 Wicker, 1 Peat, 1 Barley, 1 Mutton",
      "Granary (upgrades a Cottage): 2 Barley, 3 Flax",
      "Mill: 1 Barley, 1 Flax, 2 Peat",
    ],
    sprites: ["cart_road", "cottage", "granary", "mill"],
  },
  {
    kind: "rule",
    heading: "Placement Rules",
    body: [
      "Cottages must be placed on an intersection connected to one of your Cart Roads.",
      "No Cottage may be placed adjacent to another Cottage.",
    ],
    sprites: ["cottage", "cart_road"],
  },
  {
    kind: "rule",
    heading: "Scoring Respect",
    body: ["Each Cottage is worth 1 Respect. Each Granary is worth 2 Respect. Each Mill is worth 1 Respect."],
    sprites: ["respect", "cottage", "granary", "mill"],
  },
  {
    kind: "rule",
    heading: "The Longest Cart Road",
    body: [
      "The first player to build a continuous Cart Road of five or more segments earns 2 bonus Respect.",
      "If another player builds a longer one, the bonus moves to them.",
    ],
    sprites: ["cart_road", "respect"],
  },
  {
    kind: "rule",
    heading: "Winning the Game",
    body: ["The game ends immediately when a player reaches 10 Respect on their turn. That player wins."],
    sprites: ["respect"],
  },
  {
    kind: "note",
    heading: "You're Ready to Learn the Details",
    body: [
      "That covers the core game, {P1}! The following chapters cover the remaining rules, variants, and edge cases.",
      "Most groups find them helpful.",
    ],
    sprites: ["rulebook"],
  },
  {
    kind: "rule",
    heading: "Weather",
    body: [
      "At the start of each round, roll the Weather Cube. Its result affects production for that round.",
      "Sun: no effect. Rain: Barley Rise produces double. Fog: no trading with the supply.",
    ],
    sprites: ["weather_cube"],
  },
  {
    kind: "rule",
    heading: "The Tax Assessor",
    body: [
      "The Tax Assessor is a second neutral piece. It moves one hex clockwise each round.",
      "Players with a building next to the Tax Assessor pay one resource of their choice.",
    ],
    sprites: ["assessor"],
  },
  {
    kind: "rule",
    heading: "Almanac Cards",
    body: [
      "Almanac cards may be bought for 1 Flax, 1 Mutton, and 1 Barley.",
      "Each card has a one-time effect. You may play one Almanac card per turn.",
    ],
    sprites: ["almanac"],
  },
];

export const INTERLUDES = [
  {
    tier: 1,
    kind: "note",
    heading: "A Brief Pause",
    body: ["You're making great progress, {P1}.", "Remember that these detailed rules are what make Hearthlands so rewarding."],
    sprites: ["reeve", "favor"],
  },
  {
    tier: 1,
    kind: "note",
    heading: "Hydration Reminder",
    body: ["Hearthlands is best enjoyed with a beverage.", "Beverages are not a resource."],
    sprites: ["well"],
  },
  {
    tier: 2,
    kind: "note",
    heading: "Checking In",
    body: ["How is {P2} holding up? If {P2} has fallen asleep, place a Rumor chit on their forehead. This is legal."],
    sprites: ["rumor"],
  },
  {
    tier: 2,
    kind: "errata",
    heading: "Errata",
    body: [
      "Everything on the previous page was correct, except for the parts that were not.",
      "Please re-read the previous page with that in mind. (We'll wait.)",
    ],
    sprites: ["ledger"],
  },
  {
    tier: 2,
    kind: "note",
    heading: "You Are Making Progress",
    body: ["Statistically, most players who reach this page go on to finish the tutorial.", "That statistic was generated by the Village Idiot."],
    sprites: ["idiot"],
  },
  {
    tier: 2,
    kind: "note",
    heading: "Intermission",
    body: [
      "The Unwelcome Bard will now perform a ballad summarizing the rules so far.",
      "The ballad is 400 verses. For your convenience, it has been omitted. For the Bard's sake, you should feel bad about that.",
    ],
    sprites: ["bard"],
  },
  {
    tier: 3,
    kind: "note",
    heading: "A Message from the Goose",
    body: ["HONK."],
    sprites: ["goose"],
  },
  {
    tier: 3,
    kind: "note",
    heading: "Encouragement",
    body: [
      "Every great Tiller once sat exactly where you're sitting, {P1}, tapping \"Next\" and wondering about their choices.",
      "Most of them became great Tillers. Some of them became Scarecrows.",
    ],
    sprites: ["scarecrow"],
  },
  {
    tier: 3,
    kind: "rule",
    heading: "Table Talk",
    body: [
      "{P3} and {P4} may not discuss strategy during the tutorial. They may, however, discuss their feelings about the tutorial.",
      "Their feelings are not relevant to the rules.",
    ],
    sprites: ["gossip"],
  },
  {
    tier: 3,
    kind: "note",
    heading: "Have You Tried the Unmapped Hex?",
    body: ["Don't."],
    sprites: ["the_unmapped"],
  },
  {
    tier: 4,
    kind: "note",
    heading: "A Message from the Goose",
    body: ["HONK HONK. HONK HONK HONK.", "(Translation: the Goose is proud of you, {P1}. The Goose would never say so.)"],
    sprites: ["goose", "laurel"],
  },
  {
    tier: 4,
    kind: "note",
    heading: "The Rulebook Would Like a Word",
    body: [
      "{P1}. It's me. The rulebook.",
      "Nobody has ever read this far. I don't have anything prepared. Please keep going; I'll think of something.",
    ],
    sprites: ["rulebook", "quill"],
  },
  {
    tier: 4,
    kind: "rule",
    heading: "Rule ∞",
    body: ["There is always one more rule."],
    sprites: ["scroll"],
  },
  {
    tier: 4,
    kind: "faq",
    heading: "Frequently Asked Question",
    body: ["Q: What time is it?", "A: Later than when you started, {P1}. Much later."],
    sprites: ["hourglass"],
  },
];
