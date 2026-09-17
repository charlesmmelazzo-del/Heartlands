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

// Every sprite has art in /art/<id>.webp (sliced by scripts/slice_sprites.py).
// The emoji above are only a fallback if an image is missing.
export function spriteEl(id, size) {
  const wrap = document.createElement("span");
  wrap.className = "sprite";
  if (size) wrap.style.setProperty("--size", `${size}px`);
  const img = document.createElement("img");
  img.src = `/art/${id}.webp`;
  img.alt = "";
  img.decoding = "async";
  img.onerror = () => {
    wrap.textContent = SPRITES[id] || "";
    wrap.classList.add("emoji");
  };
  wrap.appendChild(img);
  return wrap;
}
