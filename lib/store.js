// Tiny JSON-file store for settings, games, and completions.
// On Railway, attach a volume; RAILWAY_VOLUME_MOUNT_PATH is picked up automatically.
import fs from "node:fs";
import path from "node:path";

const DIR = process.env.DATA_DIR || process.env.RAILWAY_VOLUME_MOUNT_PATH || path.resolve("data");
const FILE = path.join(DIR, "hearthlands.json");
const MAX_UNFINISHED = 2000;

export const DEFAULT_SETTINGS = { targetMinutes: 75, pagesPerMinute: 40 };
export const MIN_PAGES = 60;
export const MAX_PAGES = 20000;

let data = { settings: { ...DEFAULT_SETTINGS }, games: {} };
let dirty = false;

try {
  const loaded = JSON.parse(fs.readFileSync(FILE, "utf8"));
  data = { settings: { ...DEFAULT_SETTINGS, ...loaded.settings }, games: loaded.games || {} };
  console.log(`[store] loaded ${Object.keys(data.games).length} games from ${FILE}`);
} catch (e) {
  if (e.code !== "ENOENT") console.error("[store] could not read data file:", e.message);
  else console.log(`[store] starting fresh at ${FILE}`);
}

function flush() {
  if (!dirty) return;
  try {
    fs.mkdirSync(DIR, { recursive: true });
    const tmp = `${FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data));
    fs.renameSync(tmp, FILE);
    dirty = false;
  } catch (e) {
    console.error("[store] write failed:", e.message);
  }
}
setInterval(flush, 10_000).unref();
for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => {
    flush();
    process.exit(0);
  });
}

function prune() {
  const unfinished = Object.values(data.games).filter((g) => !g.finishedAt);
  if (unfinished.length <= MAX_UNFINISHED) return;
  unfinished
    .sort((a, b) => a.lastAt - b.lastAt)
    .slice(0, unfinished.length - MAX_UNFINISHED)
    .forEach((g) => delete data.games[g.id]);
}

export function totalPages(settings = data.settings) {
  const pages = Math.round(settings.targetMinutes * settings.pagesPerMinute);
  return Math.min(MAX_PAGES, Math.max(MIN_PAGES, pages));
}

export const getSettings = () => ({ ...data.settings });

export function saveSettings({ targetMinutes, pagesPerMinute }) {
  const m = Number(targetMinutes);
  const p = Number(pagesPerMinute);
  if (!(m > 0 && m <= 1000) || !(p > 0 && p <= 200)) return null;
  data.settings = { targetMinutes: m, pagesPerMinute: p };
  dirty = true;
  flush();
  return getSettings();
}

// Called on start, on every page, and on resume. `state` is the token contents.
export function recordProgress(state, { activeMsDelta = 0 } = {}) {
  const now = Date.now();
  let g = data.games[state.id];
  if (!g) {
    g = data.games[state.id] = {
      id: state.id,
      players: state.players,
      total: state.total,
      startedAt: state.startedAt,
      step: 0,
      activeMs: 0,
      lastAt: now,
    };
    prune();
  }
  if (state.step >= g.step) {
    g.step = state.step;
    g.lastAt = now;
  }
  g.activeMs += activeMsDelta;
  if (state.finishedAt && !g.finishedAt) {
    g.finishedAt = state.finishedAt;
    g.claim = state.claim;
    dirty = true;
    flush(); // completions are never left waiting in memory
    return g;
  }
  dirty = true;
  return g;
}

export function setRedeemed(id, redeemed) {
  const g = data.games[id];
  if (!g || !g.finishedAt) return false;
  g.redeemedAt = redeemed ? Date.now() : null;
  dirty = true;
  flush();
  return true;
}

export const allGames = () => Object.values(data.games);
