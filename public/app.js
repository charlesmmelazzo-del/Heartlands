import { spriteEl } from "./sprites.js";

const app = document.getElementById("app");
const SAVE_KEY = "hearthlands.save.v1";
const READ_DELAY_MS = 1000; // server enforces a little less than this
const PAWNS = ["pawn_red", "pawn_blue", "pawn_cream", "pawn_orange", "pawn_green"];

const KIND_LABELS = {
  welcome: "Welcome",
  rule: "Rule",
  component: "Components",
  example: "Example of Play",
  faq: "FAQ",
  note: "Designer's Note",
  errata: "Errata",
  clarification: "Clarification",
  table: "Scoring",
};

// --- storage (never required to work) --------------------------------------
const save = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY));
    } catch {
      return null;
    }
  },
  set(v) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(v));
    } catch {}
  },
  clear() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {}
  },
};

async function api(name, body) {
  const res = await fetch(`/api/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) el.setAttribute(k, v);
  }
  for (const c of children.flat()) if (c != null) el.append(c);
  return el;
}

function show(...nodes) {
  app.replaceChildren(...nodes);
  window.scrollTo(0, 0);
}

// --- landing ----------------------------------------------------------------
function landing() {
  const saved = save.get();
  const inputs = [0, 1, 2, 3, 4].map((i) =>
    h("input", {
      type: "text",
      maxlength: "24",
      autocomplete: "off",
      autocapitalize: "words",
      enterkeyhint: i === 4 ? "go" : "next",
      placeholder: i === 0 ? "Your name" : `Player ${i + 1} (optional)`,
      "aria-label": i === 0 ? "Your name" : `Player ${i + 1} name`,
    })
  );
  const error = h("p", { class: "form-error", role: "alert" });

  const form = h(
    "form",
    {
      class: "setup",
      onsubmit: async (e) => {
        e.preventDefault();
        const players = inputs.map((i) => i.value.trim()).filter(Boolean);
        if (!inputs[0].value.trim()) {
          error.textContent = "The Reeve requires your name.";
          inputs[0].focus();
          return;
        }
        button.disabled = true;
        button.textContent = "Shuffling hexes…";
        const { status, data } = await api("start", { players });
        if (status !== 200) {
          error.textContent = data.error || "Something went wrong. Try again.";
          button.disabled = false;
          button.textContent = "Begin the Game";
          return;
        }
        handle(data);
      },
    },
    h("h2", { class: "setup-title" }, "Gather Your Tillers"),
    h(
      "ol",
      { class: "players" },
      inputs.map((input, i) =>
        h("li", { class: i === 0 ? "player you" : "player" }, spriteEl(PAWNS[i], 30), input)
      )
    ),
    error
  );
  const button = h("button", { class: "btn primary", type: "submit" }, "Begin the Game");
  form.append(button);

  show(
    h(
      "div",
      { class: "landing" },
      boxArt(),
      saved?.token
        ? h(
            "section",
            { class: "resume" },
            h("p", {}, `A tutorial is in progress for ${saved.players?.join(", ") || "your table"}.`),
            h("p", { class: "resume-page" }, `Page ${(saved.page || 1).toLocaleString()}`),
            h("button", { class: "btn primary", onclick: resume }, "Resume the Tutorial"),
            h(
              "button",
              {
                class: "btn link",
                onclick: () => {
                  if (confirm("Abandon your progress? The Reeve will be disappointed.")) {
                    save.clear();
                    landing();
                  }
                },
              },
              "Abandon and start a new game"
            )
          )
        : form,
      h(
        "p",
        { class: "fineprint" },
        "© Hearthworks Game Co. Contains small parts, large rules, and one Goose."
      )
    )
  );
}

function boxArt() {
  const hexes = ["loamfields", "barley_rise", "peat_bog", "wicker_marsh", "mutton_downs", "brine_flats", "tallow_mines"];
  return h(
    "header",
    { class: "box" },
    h("div", { class: "hexes", "aria-hidden": "true" }, hexes.map((id) => h("div", { class: "hex" }, spriteEl(id, 34)))),
    h("p", { class: "eyebrow" }, "A Game of Soil, Strategy & Spite"),
    h("h1", { class: "logo" }, "Hearthlands", h("span", {}, "Age of Tillage")),
    h(
      "ul",
      { class: "box-stats" },
      h("li", {}, h("b", {}, "2–5"), "Tillers"),
      h("li", {}, h("b", {}, "21+"), "Ages"),
      h("li", {}, h("b", {}, "45 min*"), "Playtime")
    ),
    h("p", { class: "asterisk" }, "*not including Rules Tutorial")
  );
}

// --- tutorial ---------------------------------------------------------------
let current = null; // { token, screen }

async function resume() {
  const saved = save.get();
  if (!saved?.token) return landing();
  show(h("p", { class: "loading" }, "Finding your place in the rulebook…"));
  const { status, data } = await api("current", { token: saved.token });
  if (status !== 200) {
    save.clear();
    return landing();
  }
  handle(data);
}

function handle(data) {
  const players = data.victory?.players || current?.players || save.get()?.players;
  if (data.done) {
    save.set({ token: data.token, players, page: data.victory.pages, done: true });
    return victory(data.victory);
  }
  current = { token: data.token, screen: data.screen, players: players || [] };
  save.set({ token: data.token, players: current.players, page: data.screen.page });
  tutorial(data.screen);
}

function tutorial(s) {
  const pct = (s.page / s.totalPages) * 100;
  const next = h("button", { class: "btn primary next", disabled: true }, "Next");
  const hint = h("p", { class: "hint", role: "status" });

  const card = h(
    "article",
    { class: `page kind-${s.kind}` },
    h("div", { class: "ribbon" }, KIND_LABELS[s.kind] || "Rule"),
    h("h2", { class: "page-heading" }, s.heading),
    s.sprites.length ? h("div", { class: "sprites" }, s.sprites.map((id) => spriteEl(id, 60))) : null,
    s.kind === "table"
      ? h("ul", { class: "score-table" }, s.body.map((line) => h("li", {}, line)))
      : s.body.map((p) => h("p", {}, p))
  );

  show(
    h(
      "div",
      { class: "tutorial" },
      h(
        "header",
        { class: "rulebook-bar" },
        h("span", { class: "chapter" }, `Chapter ${s.chapter} of ${s.totalChapters}`),
        h("span", { class: "page-no" }, `Page ${s.page.toLocaleString()}`),
        h("span", { class: "chapter-title" }, s.chapterTitle),
        h("div", { class: "progress", "aria-hidden": "true" }, h("div", { style: `width:${Math.max(pct, 0.3)}%` }))
      ),
      card,
      h("footer", { class: "controls" }, next, hint)
    )
  );

  // "Reading" fill, then enable.
  next.style.setProperty("--read", `${READ_DELAY_MS}ms`);
  next.classList.add("reading");
  setTimeout(() => {
    next.disabled = false;
    next.classList.remove("reading");
  }, READ_DELAY_MS);

  next.addEventListener("click", async () => {
    next.disabled = true;
    const { status, data } = await api("next", { token: current.token });
    if (status === 200) return handle(data);
    if (status === 429) {
      hint.textContent = data.error;
      setTimeout(() => (next.disabled = false), data.retryIn || 500);
      return;
    }
    if (status === 401) {
      save.clear();
      return landing();
    }
    hint.textContent = "The messenger got lost. Tap Next again.";
    next.disabled = false;
  });
}

// --- the end ----------------------------------------------------------------
function victory(v) {
  const clock = h("span", { class: "clock" });
  const fmt = (ms, opts) => new Date(ms).toLocaleString("en-US", { timeZone: v.tz, ...opts });
  const tick = () => (clock.textContent = fmt(Date.now(), { hour: "numeric", minute: "2-digit", second: "2-digit" }));
  tick();
  setInterval(tick, 1000);

  const mins = Math.round((v.finishedAt - v.startedAt) / 60000);
  const took = mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins} min`;
  const [you, ...others] = v.players;

  show(
    h(
      "div",
      { class: "victory" },
      h("div", { class: "seal", "aria-hidden": "true" }, spriteEl("shot_glass", 64)),
      h("p", { class: "eyebrow" }, "You finished the Rules Tutorial"),
      h("h1", {}, "Okay. You got us."),
      h(
        "p",
        {},
        `There is no game. There never was a game. Hearthlands is a ${v.pages.toLocaleString()}-page rulebook for a board game that does not exist, and you read every single page of it.`
      ),
      h("p", {}, "We are genuinely impressed, a little worried, and very grateful."),
      h(
        "section",
        { class: "claim" },
        h("p", { class: "claim-lead" }, "Show this screen to your server for"),
        h("p", { class: "claim-prize" }, "A Free Shot of Malört"),
        h("p", { class: "claim-for" }, "awarded to"),
        h("p", { class: "claim-name" }, you),
        others.length ? h("p", { class: "claim-others" }, `with the moral support of ${others.join(", ")}`) : null,
        h("p", { class: "claim-id" }, "Photo ID must match"),
        h(
          "dl",
          { class: "claim-meta" },
          h("dt", {}, "Right now"),
          h("dd", {}, clock),
          h("dt", {}, "Finished"),
          h("dd", {}, fmt(v.finishedAt, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })),
          h("dt", {}, "Time spent"),
          h("dd", {}, took),
          h("dt", {}, "Claim"),
          h("dd", {}, `#${v.claim}`)
        )
      ),
      h("p", { class: "fineprint" }, "One shot per victory. Thank you for playing Hearthlands.")
    )
  );
}

// --- boot -------------------------------------------------------------------
const saved = save.get();
if (saved?.done && saved.token) resume();
else landing();
