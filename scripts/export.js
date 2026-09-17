// Writes the whole rulebook to docs/RULEBOOK.txt for proofreading, plus a
// shorter docs/RULEBOOK-SAMPLER.txt (intro + every 12th page) for AI reviewers.
// Usage: [PAGES=3000] node scripts/export.js [Player1 Player2 ...]
import fs from "node:fs";
import { renderScreen, tierAt, MASTER_SIZE } from "../lib/content.js";

const TOTAL_SCREENS = Number(process.env.PAGES) || MASTER_SIZE;
import { SETUP, PIECES } from "../lib/handwritten.js";

const players = process.argv.slice(2).length ? process.argv.slice(2) : ["Mike", "Dana", "Rosa"];
const TIER_NAMES = ["Straight-faced", "Fussy", "Goose-obsessed", "Self-aware", "Cosmic"];
function build(include, title) {
  const out = [
    `HEARTHLANDS: AGE OF TILLAGE — ${title}`,
    `${TOTAL_SCREENS} cards total · rendered with players: ${players.join(", ")}`,
    "Each card is one phone screen. Tier = absurdity level (0 = sounds real, 4 = fully absurd).",
    "",
  ];
  let chapter = "";
  for (let i = 0; i < TOTAL_SCREENS; i++) {
    if (!include(i)) continue;
    const s = renderScreen(i, players, TOTAL_SCREENS);
    const heading = `${s.section}: ${s.title}`;
    if (heading !== chapter) {
      chapter = heading;
      out.push("", "=".repeat(70), heading.toUpperCase(), "=".repeat(70), "");
    }
    const t = tierAt(i, TOTAL_SCREENS);
    out.push(`--- Card ${s.page} · ${s.ribbon || s.kind.toUpperCase()} · Tier ${t} (${TIER_NAMES[t]}) ---`);
    out.push(s.heading.toUpperCase());
    for (const p of s.body) out.push(p);
    if (s.sprites.length) out.push(`[icons: ${s.sprites.join(", ")}]`);
    out.push("");
  }
  return out.join("\n");
}

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/RULEBOOK.txt", build(() => true, "FULL RULES TUTORIAL"));
fs.writeFileSync(
  "docs/RULEBOOK-SAMPLER.txt",
  build((i) => i < SETUP.length + PIECES.length + 1 || i % 12 === 0 || i >= TOTAL_SCREENS - 2, "SAMPLER (setup, all pieces, then every 12th card)")
);
console.log(`Wrote docs/RULEBOOK.txt and docs/RULEBOOK-SAMPLER.txt (${TOTAL_SCREENS} pages)`);
