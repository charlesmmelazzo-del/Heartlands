// Renders every page and fails on broken placeholders. Prints samples per tier.
import { renderScreen, tierAt, TOTAL_SCREENS } from "../lib/content.js";
import { SPRITES } from "../public/sprites.js";

const players = ["Mike", "Dana"];
let bad = 0;
const samples = {};
for (let i = 0; i < TOTAL_SCREENS; i++) {
  const s = renderScreen(i, players);
  const text = [s.heading, ...s.body].join(" ");
  if (/[{}]|undefined|NaN/.test(text)) {
    bad++;
    if (bad < 10) console.log("BAD", i + 1, text);
  }
  for (const id of s.sprites) if (!SPRITES[id]) { bad++; console.log("NO SPRITE", id, "page", i + 1); }
  (samples[tierAt(i)] ||= []).push(`p${s.page} [${s.kind}] ${s.heading} — ${s.body.join(" / ")}`);
}
const show = Number(process.argv[2] || 4);
for (const [tier, list] of Object.entries(samples)) {
  console.log(`\n=== Tier ${tier}: pages ${list[0].split(" ")[0]}–${list.at(-1).split(" ")[0]} ===`);
  for (let k = 0; k < show; k++) console.log(list[Math.floor((k * list.length) / show) + (tier > 0 ? 7 : 0)] ?? "");
}
console.log(`\n${TOTAL_SCREENS} pages, ${bad} problems`);
process.exit(bad ? 1 : 0);
