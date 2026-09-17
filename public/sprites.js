// Every sprite the game can show. Until real art is dropped into /art/<id>.png
// (and the id added to ART below), the emoji stands in.
export const SPRITES = {
  // 01-resources
  loam: "🟫", barley: "🌾", tallow: "🕯️", flax: "🪢", mutton: "🍖", peat: "🧱",
  brine: "🧂", wicker: "🧺", turnip: "🥔", gossip: "💬", respect: "🏅", card_back: "🂠",
  // 02-buildings
  cottage: "🏠", granary: "🏚️", tithe_barn: "🛖", mill: "🌬️", drover: "🧑‍🌾", scarecrow: "🧍",
  cart_road: "🛤️", well: "🪣", chapel: "⛪", hedge: "🌳", fence: "🪵", cart: "🛒",
  // 03-characters
  assessor: "🧐", goose: "🪿", reeve: "🤴", idiot: "🤪", bard: "🪕", witch: "🧙",
  tinker: "🔧", ox: "🐂", magistrate: "⚖️", rat_king: "🐀", pilgrim: "🥾", prophet: "🌦️",
  // 04-tokens
  grudge: "😠", favor: "🎖️", plague: "☠️", weather_cube: "🎲", almanac: "📜", debt: "🪨",
  rumor: "🗯️", blight: "🍂", ledger: "📒", harvest_die: "🎲", hourglass: "⏳", wax_seal: "🔴",
  // 05-terrain
  loamfields: "🟤", flax_fields: "🌿", peat_bog: "🟫", barley_rise: "🟨", wicker_marsh: "🟩",
  mutton_downs: "🐑", brine_flats: "🌊", tallow_mines: "⛏️", the_unmapped: "⬡",
  // 06-pawns
  pawn_red: "🔴", pawn_blue: "🔵", pawn_cream: "⚪", pawn_orange: "🟠", pawn_green: "🟢", pawn_beige: "🟤",
  // 07-extras
  rulebook: "📖", quill: "🪶", scroll: "📜", shot_glass: "🥃", laurel: "🌿", compass: "🧭",
};

// Ids that have real art in /art. Filled in when sprite sheets are sliced.
export const ART = new Set([]);

export function spriteEl(id, size = 56) {
  const wrap = document.createElement("span");
  wrap.className = "sprite";
  wrap.style.setProperty("--size", `${size}px`);
  if (ART.has(id)) {
    const img = document.createElement("img");
    img.src = `/art/${id}.png`;
    img.alt = "";
    wrap.appendChild(img);
  } else {
    wrap.textContent = SPRITES[id] || "❔";
    wrap.classList.add("emoji");
  }
  return wrap;
}
