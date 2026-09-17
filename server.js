// Hearthlands: Age of Tillage — zero-dependency Node server.
//
// Anti-cheat: the browser never has the rulebook or the ending. It holds a
// signed token saying which page the guest is on and when that page was shown.
// /api/next only advances if the guest spent at least MIN_DWELL_MS on the
// page, and the victory screen is only ever built here, on the server.
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { encode, decode, claimCode, newId } from "./lib/token.js";
import { renderScreen } from "./lib/content.js";
import * as store from "./lib/store.js";

const PORT = Number(process.env.PORT) || 3000;
const MIN_DWELL_MS = Number(process.env.MIN_DWELL_MS) || 900;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");
const TZ = process.env.TZ_DISPLAY || "America/Chicago";
const ADMIN_COOKIE = "hl_admin";
const ADMIN_SESSION_MS = 30 * 24 * 60 * 60 * 1000;
// Gaps longer than this between pages count as a break, not reading time.
const ACTIVE_GAP_MS = 60_000;

if (!ADMIN_PASSWORD) console.warn("[hearthlands] ADMIN_PASSWORD is not set — the admin page is disabled.");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
};

function send(res, status, data, headers = {}) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers });
  res.end(JSON.stringify(data));
}

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 8000) throw new Error("too large");
  }
  return raw ? JSON.parse(raw) : {};
}

function cleanNames(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((n) => String(n ?? "").replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 24))
    .filter(Boolean)
    .slice(0, 5);
}

function payload(state) {
  if (state.step >= state.total) {
    return {
      token: encode(state),
      done: true,
      victory: {
        players: state.players,
        claim: claimCode(state),
        startedAt: state.startedAt,
        finishedAt: state.finishedAt,
        pages: state.total,
        tz: TZ,
      },
    };
  }
  return { token: encode(state), screen: renderScreen(state.step, state.players, state.total) };
}

// Tokens from before game length was configurable carry no total.
const withTotal = (state) => (state && !state.total ? { ...state, total: 3000 } : state);

const game = {
  // Start a new game: { players: ["You", "Friend", ...] }
  async start(body) {
    const players = cleanNames(body.players);
    if (!players.length) return [400, { error: "At least one Tiller must be named." }];
    const now = Date.now();
    // Length is locked in at the start, so changing settings never moves the finish line mid-game.
    const state = { id: newId(), players, total: store.totalPages(), step: 0, shownAt: now, startedAt: now };
    store.recordProgress(state);
    return [200, payload(state)];
  },

  // Resume from a saved token without advancing.
  async current(body) {
    const state = withTotal(decode(body.token));
    if (!state) return [401, { error: "invalid" }];
    state.shownAt = Math.min(state.shownAt, Date.now());
    if (state.step >= state.total) state.claim = claimCode(state);
    store.recordProgress(state);
    return [200, payload(state)];
  },

  // Advance one page.
  async next(body) {
    const state = withTotal(decode(body.token));
    if (!state) return [401, { error: "invalid" }];
    if (state.step >= state.total) return [200, payload(state)];
    const now = Date.now();
    const waited = now - state.shownAt;
    if (waited < MIN_DWELL_MS) {
      return [429, { error: "The Reeve insists you read carefully.", retryIn: MIN_DWELL_MS - waited }];
    }
    const nextState = { ...state, step: state.step + 1, shownAt: now };
    if (nextState.step >= nextState.total) {
      nextState.finishedAt = now;
      nextState.claim = claimCode(nextState);
    }
    store.recordProgress(nextState, { activeMsDelta: waited < ACTIVE_GAP_MS ? waited : 0 });
    return [200, payload(nextState)];
  },
};

// --- admin ------------------------------------------------------------------
const loginAttempts = new Map(); // ip -> [timestamps]

function cookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || "").split(";").map((c) => c.trim().split("=")).filter(([k]) => k)
  );
}

function isAdmin(req) {
  if (!ADMIN_PASSWORD) return false;
  const session = decode(cookies(req)[ADMIN_COOKIE]);
  return Boolean(session?.admin && session.exp > Date.now());
}

function sessionCookie(req, value, maxAgeSec) {
  const secure = req.headers["x-forwarded-proto"] === "https" ? "; Secure" : "";
  return `${ADMIN_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAgeSec}${secure}`;
}

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

const median = (xs) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function dayKey(ms) {
  return new Date(ms).toLocaleDateString("en-CA", { timeZone: TZ });
}

function adminState() {
  const games = store.allGames();
  const now = Date.now();
  const today = dayKey(now);
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const pace = (g) => (g.activeMs > 0 ? g.step / (g.activeMs / 60000) : null);
  const paces = games.filter((g) => g.step >= 30 && g.activeMs > 0).map(pace);
  const completions = games.filter((g) => g.finishedAt).sort((a, b) => b.finishedAt - a.finishedAt);
  const furthest = games.filter((g) => !g.finishedAt).sort((a, b) => b.step / b.total - a.step / a.total)[0];

  const view = (g) => ({
    id: g.id,
    players: g.players,
    startedAt: g.startedAt,
    lastAt: g.lastAt,
    finishedAt: g.finishedAt || null,
    step: g.step,
    total: g.total,
    pace: pace(g),
    activeMinutes: g.activeMs / 60000,
    claim: g.claim || null,
    redeemedAt: g.redeemedAt || null,
  });

  const settings = store.getSettings();
  return {
    tz: TZ,
    settings,
    totalPages: store.totalPages(settings),
    limits: { minPages: store.MIN_PAGES, maxPages: store.MAX_PAGES, minDwellMs: MIN_DWELL_MS },
    stats: {
      startedToday: games.filter((g) => dayKey(g.startedAt) === today).length,
      startedWeek: games.filter((g) => g.startedAt >= weekAgo).length,
      startedAll: games.length,
      finishedWeek: completions.filter((g) => g.finishedAt >= weekAgo).length,
      finishedAll: completions.length,
      medianPace: median(paces),
      fastestPace: paces.length ? Math.max(...paces) : null,
      pacedGames: paces.length,
      furthest: furthest ? view(furthest) : null,
    },
    completions: completions.map(view),
    recent: games
      .sort((a, b) => b.lastAt - a.lastAt)
      .slice(0, 100)
      .map(view),
  };
}

async function handleAdmin(req, res, action) {
  if (!ADMIN_PASSWORD) return send(res, 503, { error: "Set ADMIN_PASSWORD on the server to enable the admin page." });
  const body = req.method === "POST" ? await readJson(req) : {};

  if (action === "login") {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress;
    const recent = (loginAttempts.get(ip) || []).filter((t) => t > Date.now() - 60_000);
    if (recent.length >= 8) return send(res, 429, { error: "Too many attempts. Wait a minute." });
    loginAttempts.set(ip, [...recent, Date.now()]);
    if (!safeEqual(body.password || "", ADMIN_PASSWORD)) return send(res, 401, { error: "Wrong password." });
    const token = encode({ admin: true, exp: Date.now() + ADMIN_SESSION_MS });
    return send(res, 200, { ok: true }, { "Set-Cookie": sessionCookie(req, token, ADMIN_SESSION_MS / 1000) });
  }
  if (action === "logout") {
    return send(res, 200, { ok: true }, { "Set-Cookie": sessionCookie(req, "", 0) });
  }
  if (!isAdmin(req)) return send(res, 401, { error: "Not signed in." });

  if (action === "state" && req.method === "GET") return send(res, 200, adminState());
  if (action === "settings" && req.method === "POST") {
    const saved = store.saveSettings(body);
    if (!saved) return send(res, 400, { error: "Minutes must be 1–1000 and pages per minute 1–200." });
    return send(res, 200, adminState());
  }
  if (action === "redeem" && req.method === "POST") {
    if (!store.setRedeemed(String(body.id), Boolean(body.redeemed))) return send(res, 404, { error: "Not found." });
    return send(res, 200, adminState());
  }
  return send(res, 404, { error: "not found" });
}

// --- static -----------------------------------------------------------------
async function serveStatic(req, res) {
  let urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (urlPath === "/") urlPath = "/index.html";
  if (urlPath === "/admin" || urlPath === "/admin/") urlPath = "/admin.html";
  const file = path.normalize(path.join(PUBLIC, urlPath));
  if (!file.startsWith(PUBLIC)) return send(res, 404, { error: "not found" });
  try {
    const stat = await fs.stat(file);
    const ext = path.extname(file);
    // Code and pages revalidate on every load (a cheap 304 when unchanged), so a
    // deploy reaches phones immediately. Art may be reused for a day.
    const etag = `W/"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
    const headers = {
      "Content-Type": TYPES[ext] || "application/octet-stream",
      "Cache-Control": urlPath.startsWith("/art/") ? "public, max-age=86400" : "no-cache",
      ETag: etag,
    };
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304, headers);
      return res.end();
    }
    res.writeHead(200, headers);
    res.end(await fs.readFile(file));
  } catch {
    // Unknown paths get the app, so a mistyped QR link still lands somewhere.
    const html = await fs.readFile(path.join(PUBLIC, "index.html"));
    res.writeHead(200, { "Content-Type": TYPES[".html"], "Cache-Control": "no-cache" });
    res.end(html);
  }
}

http
  .createServer(async (req, res) => {
    const pathname = req.url.split("?")[0];
    try {
      const adminMatch = pathname.match(/^\/api\/admin\/(login|logout|state|settings|redeem)$/);
      if (adminMatch) return await handleAdmin(req, res, adminMatch[1]);

      const match = pathname.match(/^\/api\/(start|current|next)$/);
      if (match) {
        if (req.method !== "POST") return send(res, 405, { error: "POST only" });
        const [status, data] = await game[match[1]](await readJson(req));
        return send(res, status, data);
      }
    } catch {
      return send(res, 400, { error: "bad request" });
    }
    if (pathname === "/health") return send(res, 200, { ok: true });
    return serveStatic(req, res);
  })
  .listen(PORT, () => console.log(`Hearthlands listening on :${PORT} (${store.totalPages()} pages per game)`));
