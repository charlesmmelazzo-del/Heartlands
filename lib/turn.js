// Part Two: the Sequence of Play for a single Turn.
//
// Turn → Stage → Phase → Segment → Step, in the spirit of The Campaign for
// North Africa. Stages run in order through the deck, so later Stages are
// also later absurdity tiers. `weight` makes early, serious-sounding Stages
// longer. `focus` lists sprite ids that the Phase's Steps should mostly talk about.
// Each Phase's `steps` are Step titles; generic titles get mixed in too.

export const STAGES = [
  {
    name: "The Dawn Stage",
    weight: 1.5,
    summary: "Players determine who acts first, what the weather will be, and what the land produces.",
    phases: [
      { name: "Initiative Determination", focus: ["harvest_die", "respect"], steps: ["Initiative Roll", "Initiative Tie-Break", "Initiative Re-Roll Eligibility", "Recording Initiative", "Initiative Modifier for Absent Players"] },
      { name: "Weather Determination", focus: ["weather_cube", "prophet"], steps: ["Weather Cube Roll", "Prevailing Wind", "Fog Density", "Rain Accumulation", "Weather Carryover from Previous Turn"] },
      { name: "Harvest Die Roll", focus: ["harvest_die", "barley_rise", "flax_fields"], steps: ["Harvest Die Roll", "Hex Activation", "Yield Calculation", "Yield Rounding"] },
      { name: "Production", focus: ["barley", "flax", "mutton", "peat", "wicker", "card_back"], steps: ["Resource Collection", "Granary Bonus", "Production Verification", "Surplus Declaration", "Supply Shortfall"] },
    ],
  },
  {
    name: "The Trade Stage",
    weight: 1.5,
    summary: "Players exchange resources with each other and with the market.",
    phases: [
      { name: "Market Opening", focus: ["card_back", "reeve", "wax_seal"], steps: ["Market Hours", "Posting of Prices", "Price Adjustment for Weather", "Market Seal Verification"] },
      { name: "Offer Submission", focus: ["card_back", "ledger", "barley", "wicker"], steps: ["Drafting an Offer", "Offer Review", "Withdrawing an Offer", "Offer Expiry"] },
      { name: "Counter-Offer", focus: ["ledger", "gossip", "flax"], steps: ["Counter-Offer Submission", "Counter-Counter-Offer", "Haggling Fatigue", "Offer Reconciliation"] },
      { name: "Trade Confirmation", focus: ["wax_seal", "ledger", "card_back"], steps: ["Mutual Confirmation", "Confirmation Delay", "Transfer of Resources", "Trade Tax"] },
    ],
  },
  {
    name: "The Build Stage",
    weight: 1.5,
    summary: "Players spend resources to construct buildings and roads.",
    phases: [
      { name: "Construction Declaration", focus: ["cottage", "granary", "mill", "cart_road"], steps: ["Declaring Intent to Build", "Site Selection", "Neighbor Notification", "Declaration Withdrawal"] },
      { name: "Material Allocation", focus: ["wicker", "peat", "barley", "mutton"], steps: ["Material Reservation", "Material Substitution", "Material Loss in Transit", "Allocation Audit"] },
      { name: "Placement", focus: ["cottage", "cart_road", "fence", "well"], steps: ["Placing the Piece", "Orientation", "Adjacency Check", "Foundation Settling"] },
      { name: "Construction Inspection", focus: ["reeve", "tithe_barn", "wax_seal"], steps: ["Inspection Scheduling", "Structural Soundness", "Thatch Quality", "Inspection Appeal"] },
    ],
  },
  {
    name: "The Logistics Stage",
    weight: 1.5,
    summary: "Players account for storage, transport, rations, and spoilage.",
    phases: [
      { name: "Granary Inventory", focus: ["granary", "barley", "ledger"], steps: ["Opening the Granary", "Counting Sacks", "Moisture Check", "Inventory Discrepancy"] },
      { name: "Hay Cart Convoy", focus: ["cart", "cart_road", "ox"], steps: ["Convoy Formation", "Axle Wear Points", "Convoy Movement", "Breakdown Resolution", "Convoy Arrival"] },
      { name: "Brine Ration", focus: ["brine", "drover", "well"], steps: ["Ration Allocation", "Ration Deficit", "Thirst Resolution", "Well Drawing Limits"] },
      { name: "Tallow Melt Check", focus: ["tallow", "weather_cube", "tallow_mines"], steps: ["Temperature Assessment", "Melt Rate", "Candle Conversion", "Tallow Evaporation"] },
      { name: "Spoilage", focus: ["mutton", "turnip", "blight"], steps: ["Spoilage Roll", "Salting with Brine", "Spoiled Goods Disposal", "Spoilage Grievances"] },
    ],
  },
  {
    name: "The Levy Stage",
    weight: 1.5,
    summary: "The Tax Assessor collects what is owed, and players dispute it.",
    phases: [
      { name: "Tax Assessor Movement", focus: ["assessor", "cart_road"], steps: ["Assessor Route Calculation", "Assessor Detours", "Assessor Lunch Break"] },
      { name: "Assessment", focus: ["assessor", "ledger", "respect"], steps: ["Assessment Base", "Assessable Buildings", "Exemptions", "Assessment Notice"] },
      { name: "Appeals", focus: ["reeve", "wax_seal", "ledger"], steps: ["Filing an Appeal", "Appeal Fees", "Appeal Hearing", "Appeal Ruling"] },
      { name: "Appeals of Appeals", focus: ["magistrate", "wax_seal", "debt"], steps: ["Filing a Second Appeal", "Second Appeal Fees", "Precedent Review", "Final Ruling (Provisional)"] },
    ],
  },
  {
    name: "The Livestock Stage",
    weight: 1,
    summary: "Players tend to sheep, oxen, and the morale of their Drovers.",
    phases: [
      { name: "The Sheep Census", focus: ["mutton", "mutton_downs", "drover"], steps: ["Counting Sheep", "Recounting Sheep", "Sheep Who Refuse to Be Counted", "Census Certification"] },
      { name: "Ox Fatigue", focus: ["ox", "cart"], steps: ["Fatigue Accumulation", "Ox Rest", "Gerald's Mood", "Borrowing Gerald"] },
      { name: "Drover Morale", focus: ["drover", "bard"], steps: ["Morale Check", "Morale Recovery", "Songs of Encouragement", "Drover Resignation"] },
      { name: "Stew Points", focus: ["mutton", "turnip", "brine"], steps: ["Stew Preparation", "Stew Point Calculation", "Stew Distribution", "Stew Complaints"] },
    ],
  },
  {
    name: "The Goose Stage",
    weight: 1,
    summary: "The Goose acts. Players respond as best they can.",
    phases: [
      { name: "Goose Awakening", focus: ["goose"], steps: ["Determining if the Goose Is Awake", "Waking the Goose (Inadvisable)", "Goose Stretching"] },
      { name: "Goose Intent", focus: ["goose", "grudge"], steps: ["Reading the Goose", "Misreading the Goose", "Goose Intent Declaration", "Contesting the Goose's Intent"] },
      { name: "Goose Movement", focus: ["goose", "cart_road", "hedge"], steps: ["Goose Path Selection", "Goose Obstacles", "The Goose Ignores Obstacles"] },
      { name: "Goose Consequences", focus: ["goose", "grudge", "respect"], steps: ["Honk Resolution", "Damage to Pride", "Blaming Another Player", "Accepting the Goose"] },
    ],
  },
  {
    name: "The Grudge Stage",
    weight: 1,
    summary: "Old grievances are declared, escalated, and passed down.",
    phases: [
      { name: "Grudge Declaration", focus: ["grudge"], steps: ["Naming the Grudge", "Grudge Witnesses", "Grudge Registration Fee"] },
      { name: "Grudge Escalation", focus: ["grudge", "gossip"], steps: ["Escalation Threshold", "Pointed Remarks", "Passive Aggression Modifier", "Sighing Loudly"] },
      { name: "Grudge Inheritance", focus: ["grudge", "ledger", "cottage"], steps: ["Heir Designation", "Inherited Grudge Weight", "Ancestral Grievances"] },
      { name: "Forgiveness (Optional, Discouraged)", focus: ["favor", "laurel"], steps: ["Considering Forgiveness", "Reconsidering Forgiveness", "Forgiveness Penalty"] },
    ],
  },
  {
    name: "The Hedge Stage",
    weight: 1,
    summary: "Hedgerows grow, boundaries are disputed, and the Magistrate rules.",
    phases: [
      { name: "Hedgerow Growth", focus: ["hedge"], steps: ["Growth Rate", "Overgrowth", "Hedge Ambition"] },
      { name: "Boundary Disputes", focus: ["hedge", "fence", "grudge"], steps: ["Claiming a Boundary", "Moving a Boundary at Night", "Boundary Witnesses"] },
      { name: "The Magistrate's Ruling", focus: ["magistrate", "wax_seal"], steps: ["Summoning the Magistrate", "The Magistrate Deliberates", "The Magistrate Trims Something"] },
      { name: "Trimming", focus: ["hedge", "magistrate"], steps: ["Trimming Rights", "Trimming Etiquette", "Hedge Recovery"] },
    ],
  },
  {
    name: "The Almanac Stage",
    weight: 1,
    summary: "The Almanac is consulted, interpreted, and argued with.",
    phases: [
      { name: "Almanac Draw", focus: ["almanac"], steps: ["Drawing the Almanac Card", "Reading the Almanac Card", "Re-reading the Almanac Card"] },
      { name: "Almanac Interpretation", focus: ["almanac", "prophet"], steps: ["Literal Interpretation", "Figurative Interpretation", "The Weather Prophet's Interpretation"] },
      { name: "Disagreeing with the Almanac", focus: ["almanac", "grudge"], steps: ["Lodging a Disagreement", "The Almanac Does Not Care", "Disagreement Penalty"] },
      { name: "Almanac Upkeep", focus: ["almanac", "hourglass"], steps: ["Almanac Aging", "Dog-Eared Cards", "Almanac Renewal"] },
    ],
  },
  {
    name: "The Blight Stage",
    weight: 1,
    summary: "Blight spreads, the Hedge Witch is consulted, and hexes are quarantined.",
    phases: [
      { name: "Blight Spread", focus: ["blight", "turnip", "loamfields"], steps: ["Blight Direction", "Blight Speed", "Blight Preferences"] },
      { name: "Plague Check", focus: ["plague", "cottage"], steps: ["Plague Roll", "Plague Marker Placement", "Plague Marker Removal (Rare)"] },
      { name: "Hedge Witch Remedies", focus: ["witch", "flax"], steps: ["Requesting a Remedy", "Paying the Hedge Witch", "Remedy Side Effects"] },
      { name: "Quarantine", focus: ["plague", "fence", "hedge"], steps: ["Declaring Quarantine", "Quarantine Boredom", "Lifting Quarantine"] },
    ],
  },
  {
    name: "The Chapel Stage",
    weight: 1,
    summary: "The Chapel of Mild Concern expresses its concern.",
    phases: [
      { name: "Mild Concern", focus: ["chapel"], steps: ["Concern Assessment", "Concern Level", "Concern Notification"] },
      { name: "Moderate Concern", focus: ["chapel", "pilgrim"], steps: ["Concern Escalation", "The Pilgrim's Opinion", "Concerned Silence"] },
      { name: "Reassurance", focus: ["chapel", "favor"], steps: ["Reassuring the Chapel", "The Chapel Is Not Reassured", "Trying Again"] },
    ],
  },
  {
    name: "The Rat Stage",
    weight: 1,
    summary: "The Rat King holds court. Attendance is mandatory.",
    phases: [
      { name: "Rat Census", focus: ["rat_king", "granary"], steps: ["Counting Rats", "Rats Who Count Themselves", "Census Irregularities"] },
      { name: "The Rat King's Court", focus: ["rat_king", "wax_seal"], steps: ["Approaching the Throne", "Bowing Depth", "Addressing the Rat King", "The Rat King Is Bored"] },
      { name: "Tribute", focus: ["rat_king", "barley", "tallow"], steps: ["Tribute Calculation", "Insufficient Tribute", "Excessive Tribute"] },
      { name: "Rat Diplomacy", focus: ["rat_king", "goose"], steps: ["Rat–Goose Relations", "Treaty Negotiation", "Treaty Violation"] },
    ],
  },
  {
    name: "The Unmapped Stage",
    weight: 1,
    summary: "Players interact with the Unmapped Hex, or try not to.",
    phases: [
      { name: "Looking at the Unmapped Hex", focus: ["the_unmapped"], steps: ["Direct Observation", "Duration of Observation", "What Was Seen"] },
      { name: "Not Looking at the Unmapped Hex", focus: ["the_unmapped", "compass"], steps: ["Averting Your Eyes", "Peripheral Vision", "Accidental Glances"] },
      { name: "The Unmapped Hex Looks Back", focus: ["the_unmapped", "pilgrim"], steps: ["Being Seen", "Remaining Calm", "The Pilgrim Returns (Changed)"] },
    ],
  },
  {
    name: "The Reckoning Stage",
    weight: 1,
    summary: "Respect is scored, rescored, and scored again.",
    phases: [
      { name: "Preliminary Scoring", focus: ["respect", "ledger"], steps: ["Preliminary Tally", "Preliminary Objections"] },
      { name: "Actual Scoring", focus: ["respect", "laurel"], steps: ["Actual Tally", "Discrepancies with the Preliminary Tally"] },
      { name: "Revised Scoring", focus: ["respect", "quill"], steps: ["Revised Tally", "Revision of the Revision"] },
      { name: "Scoring the Scoring", focus: ["respect", "wax_seal"], steps: ["Rating the Tally", "Meta-Respect", "Final Score (Temporary)"] },
    ],
  },
  {
    name: "The Stage Between Stages",
    weight: 1,
    summary: "Nothing happens. It must be done correctly.",
    phases: [
      { name: "The Pause", focus: ["hourglass"], steps: ["Beginning the Pause", "Maintaining the Pause", "Pause Violations"] },
      { name: "The Longer Pause", focus: ["hourglass", "scroll"], steps: ["Extending the Pause", "Wondering About the Pause"] },
      { name: "Phase ∅", focus: ["the_unmapped", "hourglass"], steps: ["Step ∅", "Step ∅ (continued)"] },
    ],
  },
  {
    name: "The Recursive Stage",
    weight: 1,
    summary: "Earlier Stages are performed again, inside this one.",
    phases: [
      { name: "Repeat the Dawn Stage", focus: ["weather_cube", "harvest_die"], steps: ["Dawn, Again", "Weather, Again", "Initiative, Again"] },
      { name: "Repeat This Phase", focus: ["scroll", "hourglass"], steps: ["Repeating", "Repeating", "Noticing the Repetition"] },
      { name: "Remember Why You Began", focus: ["rulebook", "cottage", "barley"], steps: ["Remembering", "Remembering Harder", "A Cottage, Long Ago"] },
    ],
  },
  {
    name: "The Tutorial Stage",
    weight: 1,
    summary: "Players complete the Tutorial. This is also part of the Turn.",
    phases: [
      { name: "Reading the Tutorial", focus: ["rulebook", "quill"], steps: ["Reading This Card", "Understanding This Card", "Reading This Card Again"] },
      { name: "Tapping Next", focus: ["rulebook", "compass"], steps: ["Locating Next", "Tapping Next", "The Moment After Tapping Next"] },
      { name: "You Are Here", focus: ["compass", "laurel", "goose"], steps: ["Here", "Still Here", "Almost Somewhere Else"] },
    ],
  },
];

// Step titles that fit any Phase, by absurdity tier.
export const genericSteps = [
  [],
  ["Verification", "Recording the Result", "Resolving Discrepancies", "Order of Resolution", "Simultaneous Resolution", "Rounding"],
  ["Verification of the Verification", "Late Objections", "Modifier Stacking", "Retroactive Adjustment", "Missing Paperwork"],
  ["Collective Unease", "Checking on the Goose", "Undoing the Previous Step", "Step That Was Skipped Earlier"],
  ["Acceptance", "The Step That Reads Itself", "A Step Taken in Silence", "Just One More Step"],
];

// Quantities that Steps track and refer back to.
export const concepts = [
  [],
  ["Ration Deficit", "Initiative Rating", "Convoy Capacity", "Assessment Base", "Spoilage Value", "Yield Modifier", "Supply Level"],
  ["Morale Modifier", "Fatigue Points", "Stew Points", "Grudge Weight", "Hedge Pressure", "Axle Wear"],
  ["Concern Level", "Goose Suspicion", "Quiet Dread", "Rat Favor", "Emotional Thatch"],
  ["Existential Yield", "Remaining Patience", "Tutorial Debt", "Sense of Self (Provisional)", "Goose Proximity"],
];

// First card of a Step. `{concept}` and `{ref}` are filled by the generator.
export const procedures = [
  [],
  [
    "The active player taps each {piece} they control, in clockwise order. For each one next to the {terrain}, add 1 to their {concept}.",
    "Each player opens their Household screen and checks their {res}. Any player with fewer than {n} {sameres} must {action}.",
    "The app highlights every hex containing {res}. Starting with {player}, each player selects one highlighted hex and records its yield on a Ledger page.",
    "The app rolls the Harvest Die. On a {n} or higher, proceed to the next Step. Otherwise, the active player must {action}, then repeat this Step.",
    "Compare each player's {res} to their {res2}. The difference is that player's {concept} for the rest of this Phase. It will be needed in Step {ref}.",
    "Each player calculates their {concept}: add the number of {pieces} they control, subtract the number of {toks} they hold, then halve the result (round toward the Reeve).",
    "The active player may spend 1 {res} to reduce their {concept} by {n}. This may be done no more than twice per Segment, and never during {phase}.",
    "Before continuing, every player confirms on screen that Step {ref} was completed. If anyone is unsure, return to Step {ref}.",
    "Starting with the player who has the highest {concept}, each player moves one {piece} up to {n} hexes along Cart Roads. A {piece} that ends next to the {terrain} loses 1 {res}.",
    "Pass the phone to {player}. They adjust each player's {concept} by the modifiers listed in Step {ref}, then pass the phone back.",
    "For each {terrain} tile adjacent to at least two {pieces}, the app deducts 1 {res} from the owner with the lowest {concept}. Ties are broken by Step {ref}.",
    "The active player declares which {piece} will be affected this Segment. That {piece} may not be declared again until {phase}.",
    "Each player secretly selects a number from 1 to {n} on their Household screen. Reveal simultaneously. The highest number adds it to their {concept}; everyone else subtracts 1.",
    "Any {piece} that was built this Turn is considered unsettled. Unsettled buildings contribute half their normal {concept}, rounded down.",
    "The app lists every {res} gained since Step {ref}. Each player confirms their total by tapping it. Totals that are not confirmed within the Dawdling Hourglass are forfeited.",
    "If the Weather Cube shows Rain, add 1 to every player's {concept}. If it shows Fog, add 1 only to players who cannot see the {terrain}. If it shows Sun, proceed to Step {ref}.",
    "The player with the highest {concept} pays 1 {res} to the player with the lowest. If they are the same player, they pay the Reeve.",
    "Each {piece} with a Cart Road connection to the {terrain} may transfer up to {n} {res} to another {piece} its owner controls. Transfers in excess of {samen} spoil.",
    "Starting with the player to the right of the active player and proceeding counter-clockwise, each player may either pass or reduce their {concept} by 1 at a cost of 2 {res}.",
    "The Reeve reviews every trade made since Step {ref}. Any trade without a Reeve's Seal is reversed, and both players add 1 to their {concept}.",
  ],
  [
    "Each player whose {concept} exceeds {n} must {action}. Players whose {concept} equals exactly {n} must do so twice, for reasons explained in Step {ref}.",
    "{neutral} inspects each {piece} in turn. For each one, the app rolls the Harvest Die: on a 13, {player} must {action}; on any other result, recalculate {concept}.",
    "Add together every player's {concept}. If the total is odd, {neutral} moves one hex toward the {terrain}. If it is even, {neutral} moves anyway.",
    "Any player may declare an objection to Step {ref}. Objections are resolved by comparing {concept}; the loser must {action}.",
    "The player holding the most {res} becomes the Warden of {res} for this Segment. The Warden must {action} before anyone else may continue.",
    "Recalculate {concept} using the results from Step {ref}, not the results from Step {ref}, unless {exception}.",
  ],
  [
    "Hold the phone at arm's length. Whoever can read this sentence is the Active Reader for this Segment and must {action}.",
    "Each player privately decides their {concept}. It cannot be recorded. It must be remembered until Step {ref}.",
    "{neutral} chooses one player to {action}. {sameneutral} does not explain the choice, and players may not ask.",
    "The app will now pretend to calculate each player's {concept}. Wait politely until it finishes.",
    "If this Step has happened before, and it has, perform Step {ref} instead, then come back here and feel slightly worse.",
    "Rotate the phone 60° clockwise. The Goose is now north. Every {piece} must be re-oriented accordingly.",
    "Each player describes their {concept} using only the names of other players. Descriptions that include {P1} count double.",
    "The app shows a single {res} in the center of the screen. Nobody may take it. Everyone must want it. Proceed when the wanting is complete.",
    "Every {piece} on the board takes one step closer to the Unmapped Hex. They were going to anyway.",
    "Players who have blinked since Step {ref} add 1 to their {concept}. Players who have not blinked should blink now, and add 2.",
    "{neutral} reads each player's Ledger aloud, in a voice only {sameneutral} can hear. Adjust your {concept} to whatever you imagine was said.",
    "The active player must choose: {action}, or let {neutral} decide for them. {sameneutral} has already decided.",
    "If the room is louder than it was at the start of this Stage, every {res} becomes a Turnip until Step {ref}.",
  ],
  [
    "This Step is performed by the Step itself. Players should remain still while it concentrates.",
    "Every player's {concept} is now equal to the number of cards they have read. Please do not count.",
    "The current Step is also Step {ref}, and Step {ref}, and this one. Perform all of them at once.",
    "{P1} must {action}. The other players should watch {P1} with quiet respect.",
    "There is no {res}. There never was {sameres}. Adjust your {concept} to reflect this, then restore the {sameres} out of kindness.",
    "Look up from the phone. Look back down. You have completed a Step. Tap Next to prove it.",
    "This Step was written by {neutral}. We have left it exactly as submitted: HONK.",
    "Recall the first card of this tutorial. That card is now your {concept}. Treat it gently.",
    "Every player is now the active player. Every player must {action}. Nobody may go first.",
    "Somewhere, a Cottage is being built without you. Add 1 to your {concept} out of respect.",
    "This Step contains no instructions. Perform it anyway, and perform it well.",
    "Count the Steps you have completed. Now count them again, as the Goose would. The Goose's number is correct.",
    "The Unmapped Hex has asked to be mentioned in this Step. It has now been mentioned. Proceed carefully.",
  ],
];

// Follow-up card for multi-card Steps.
export const continuations = [
  [],
  [
    "If {exception}, skip this Step. Players who skip it must still complete Step {ref}, which depends on it.",
    "If the result is zero, the Reeve treats it as one. If it is one, the Reeve treats it as zero.",
    "A player may appeal the result during the Levy Stage. Appeals are resolved using this same Step.",
    "This Step is performed once per {piece}, not once per player. With five players, this may take a moment.",
    "Modifiers from Step {ref} apply, except during {season}, when the modifiers from Step {ref} apply instead.",
    "A player with no {pieces} performs this Step as if they had one, then removes it.",
    "Results are recorded in the Ledger before any player may act on them. Unrecorded results may be challenged until the end of {phase}.",
    "If the active player changes during this Step, the new active player inherits the previous player's {concept} but not their {res}.",
    "Players may not trade while this Step is being resolved, except to settle obligations created by Step {ref}.",
    "The {concept} calculated here is used three more times this Turn. Players are advised to remember it.",
    "Should the supply of {res} run out during this Step, resolve the shortfall in player order, beginning with the player who most recently built a {piece}.",
    "Negative results are recorded as Debt Pebbles. Debt Pebbles are not {res} and may not be used to pay for this Step.",
  ],
  [
    "If two players are tied, the player with the lower {concept} breaks the tie, unless {exception}.",
    "Players who completed this Step too quickly must repeat it at a more reasonable pace.",
    "Any {tok} gained during this Step is held in escrow until Step {ref}, then released, then taken back.",
    "Should {neutral} disagree with the result, {sameneutral}'s result is used.",
    "If the Goose moved during this Step, undo the Step, then undo the undoing.",
    "Any player who sighed during this Step adds 1 Grudge token to their Household.",
    "The Village Idiot may veto this Step once per Turn. He has not used his veto yet. He is thinking about it.",
    "Players who finished this Step first must wait for the others while looking patient.",
  ],
  [
    "If anyone feels uneasy about this Step, that feeling becomes a {tok} and must be recorded.",
    "This Step may not be discussed aloud. It may be discussed with the eyes.",
    "If {neutral} was watching, perform this Step again, but with more dignity.",
    "If this Step made sense, check that you are still in the correct Stage.",
    "The result of this Step is private. Do not look at it directly.",
    "Should the Chapel of Mild Concern express concern, pause and nod reassuringly toward the phone.",
    "If {P1} has a question about this Step, {P1} should keep it. It may be useful later.",
    "Any {res} affected by this Step is now slightly haunted. It functions normally.",
    "This Step may be skipped by any player who can explain it. Nobody has ever skipped it.",
  ],
  [
    "The Step continues past the edge of this card. It will be here when you return.",
    "If you have understood this Step, you have misread it. Please re-read it until you don't.",
    "This Step has no conclusion. It merely stops, like a Goose.",
    "If you are still reading this, the Step is still happening. If you stop reading, it keeps happening.",
    "Whatever you just did was correct. Do it again, but differently.",
    "The Rat King has reviewed this Step and found it acceptable. The Rat King has low standards.",
    "When this Step ends, you will not remember it. That is how you'll know it ended.",
    "This card will self-continue on the next card.",
    "You may now let go of your {concept}. You were never really holding it.",
  ],
];

// Patch notes, because this is an app.
export const patchNotes = [
  [],
  [
    "Fixed an issue where Granaries could be built on water.",
    "Reduced the Tax Assessor's walking speed by 4%.",
    "The Harvest Die animation now lasts 0.2 seconds longer, for suspense.",
    "Resource cards now make a pleasant rustling sound.",
  ],
  [
    "The Goose's movement speed has been increased. The Goose requested this.",
    "Fixed a bug where Grudges could be forgiven by accident.",
    "Gerald the Ox no longer walks through Hedgerows. Gerald has been informed.",
    "Rebalanced Turnips. Turnips remain unbalanced.",
  ],
  [
    "Removed the Trebuchet. Please stop asking about the Trebuchet.",
    "The Unmapped Hex no longer appears in screenshots. We don't know why it did.",
    "The Chapel of Mild Concern is now slightly more concerned.",
    "Known issue: the Rat King occasionally appears in other apps. A fix is not planned.",
  ],
  [
    "The Tutorial is now longer. This was not a bug.",
    "The Goose has been given admin access. We are working on a fix.",
    "Removed the end of the Tutorial for balance reasons. Restored it for legal reasons.",
    "This patch note has been patched.",
  ],
];
