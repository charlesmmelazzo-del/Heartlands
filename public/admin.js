const root = document.getElementById("admin");
let state = null;
let refreshTimer = null;

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) el.setAttribute(k, v);
  }
  for (const c of children.flat()) if (c != null && c !== false) el.append(c);
  return el;
}

async function api(action, body) {
  const res = await fetch(`/api/admin/${action}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    credentials: "same-origin",
  });
  return { status: res.status, data: await res.json().catch(() => ({})) };
}

const num = (n, digits = 0) =>
  n == null ? "—" : Number(n).toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits });

function when(ms, opts = { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) {
  return ms ? new Date(ms).toLocaleString("en-US", { timeZone: state?.tz, ...opts }) : "—";
}

function ago(ms) {
  const mins = Math.round((Date.now() - ms) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return when(ms, { month: "short", day: "numeric" });
}

function duration(minutes) {
  if (minutes == null) return "—";
  const m = Math.round(minutes);
  if (m < 1) return "under 1 min";
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} min`;
}

// --- login ------------------------------------------------------------------
function login(message = "") {
  clearInterval(refreshTimer);
  const input = h("input", { type: "password", autocomplete: "current-password", placeholder: "Admin password", "aria-label": "Admin password" });
  const error = h("p", { class: "form-error", role: "alert" }, message);
  const button = h("button", { class: "btn primary", type: "submit" }, "Open the Ledger");
  root.replaceChildren(
    h(
      "form",
      {
        class: "setup login",
        onsubmit: async (e) => {
          e.preventDefault();
          button.disabled = true;
          const { status, data } = await api("login", { password: input.value });
          button.disabled = false;
          if (status === 200) return load();
          error.textContent = data.error || "Could not sign in.";
          input.select();
        },
      },
      h("p", { class: "eyebrow dark" }, "Hearthlands"),
      h("h1", { class: "setup-title" }, "The Tavern Ledger"),
      input,
      error,
      button
    )
  );
  input.focus();
}

// --- dashboard --------------------------------------------------------------
async function load() {
  const { status, data } = await api("state");
  if (status === 401) return login();
  if (status !== 200) return login(data.error || "Something went wrong.");
  state = data;
  render();
  clearInterval(refreshTimer);
  refreshTimer = setInterval(async () => {
    if (document.hidden || document.activeElement?.tagName === "INPUT") return;
    const r = await api("state");
    if (r.status === 200) {
      state = r.data;
      render();
    }
  }, 30_000);
}

function tile(label, value, sub) {
  return h("div", { class: "tile" }, h("span", { class: "tile-label" }, label), h("b", { class: "tile-value" }, value), sub ? h("span", { class: "tile-sub" }, sub) : null);
}

function playersCell(players, big) {
  const [first, ...rest] = players;
  return h("div", { class: "who" }, h(big ? "strong" : "span", { class: "who-first" }, first), rest.length ? h("span", { class: "who-rest" }, `with ${rest.join(", ")}`) : null);
}

function settingsCard() {
  const s = state.settings;
  const minutes = h("input", { type: "number", min: "1", max: "1000", step: "1", value: s.targetMinutes, inputmode: "numeric", id: "minutes" });
  const pace = h("input", { type: "number", min: "1", max: "200", step: "1", value: s.pagesPerMinute, inputmode: "numeric", id: "pace" });
  const result = h("p", { class: "calc" });
  const msg = h("p", { class: "save-msg", role: "status" });

  const recalc = () => {
    const raw = Math.round(Number(minutes.value) * Number(pace.value));
    const pages = Math.min(state.limits.maxPages, Math.max(state.limits.minPages, raw || 0));
    const changed = Number(minutes.value) !== s.targetMinutes || Number(pace.value) !== s.pagesPerMinute;
    result.replaceChildren(
      "New games will be ",
      h("b", {}, `${num(pages)} pages`),
      raw !== pages ? ` (limit is ${num(state.limits.minPages)}–${num(state.limits.maxPages)})` : "",
      "."
    );
    save.disabled = !changed;
  };

  const measured = state.stats.medianPace;
  const useMeasured =
    measured && state.stats.pacedGames >= 3
      ? h(
          "button",
          {
            class: "btn link small",
            type: "button",
            onclick: () => {
              pace.value = Math.round(measured);
              recalc();
            },
          },
          `Use measured pace (${num(measured)}/min)`
        )
      : null;

  const save = h("button", { class: "btn primary", type: "submit" }, "Save");
  minutes.addEventListener("input", recalc);
  pace.addEventListener("input", recalc);
  recalc();

  return h(
    "form",
    {
      class: "card settings",
      onsubmit: async (e) => {
        e.preventDefault();
        save.disabled = true;
        const { status, data } = await api("settings", { targetMinutes: minutes.value, pagesPerMinute: pace.value });
        if (status === 200) {
          state = data;
          render();
          document.querySelector(".save-msg").textContent = "Saved. New games use this length.";
        } else {
          msg.textContent = data.error || "Could not save.";
          save.disabled = false;
        }
      },
    },
    h("h2", {}, "Game Length"),
    h("p", { class: "help" }, "How long should it take someone tapping Next as fast as they can to reach the free shot?"),
    h(
      "div",
      { class: "fields" },
      h("label", { for: "minutes" }, h("span", {}, "Minutes to finish"), minutes),
      h("label", { for: "pace" }, h("span", {}, "Pages per minute"), pace)
    ),
    useMeasured,
    result,
    h(
      "p",
      { class: "help small" },
      `Next unlocks after about ${num(state.limits.minDwellMs / 1000, 1)} sec per page, so a fast human manages about 40 pages/min and an auto-clicker about 60. `,
      "Games already in progress keep the length they started with. The jokes still escalate all the way. Shorter games just skip more cards."
    ),
    save,
    msg
  );
}

function redeemButton(g) {
  return h(
    "button",
    {
      class: `redeem ${g.redeemedAt ? "done" : ""}`,
      type: "button",
      "aria-pressed": g.redeemedAt ? "true" : "false",
      onclick: async (e) => {
        if (g.redeemedAt && !confirm("Mark this shot as NOT redeemed?")) return;
        e.currentTarget.disabled = true;
        const { status, data } = await api("redeem", { id: g.id, redeemed: !g.redeemedAt });
        if (status === 200) {
          state = data;
          render();
        }
      },
    },
    g.redeemedAt ? `✓ Poured ${when(g.redeemedAt, { month: "short", day: "numeric" })}` : "Mark shot poured"
  );
}

function completionsCard() {
  const list = state.completions;
  return h(
    "section",
    { class: "card" },
    h("h2", {}, "Winners ", h("span", { class: "count" }, num(list.length))),
    list.length
      ? h(
          "ul",
          { class: "rows" },
          list.map((g) =>
            h(
              "li",
              { class: "row winner" },
              playersCell(g.players, true),
              h(
                "dl",
                { class: "facts" },
                h("dt", {}, "Finished"),
                h("dd", {}, when(g.finishedAt)),
                h("dt", {}, "Reading time"),
                h("dd", {}, duration(g.activeMinutes)),
                h("dt", {}, "Pages"),
                h("dd", {}, num(g.total)),
                h("dt", {}, "Claim"),
                h("dd", { class: "mono" }, `#${g.claim || "—"}`)
              ),
              redeemButton(g)
            )
          )
        )
      : h("p", { class: "empty" }, "Nobody has made it through yet.")
  );
}

function recentCard() {
  const list = state.recent;
  return h(
    "section",
    { class: "card" },
    h("h2", {}, "Recent Games"),
    list.length
      ? h(
          "ul",
          { class: "rows" },
          list.map((g) => {
            const pct = Math.min(100, (g.step / g.total) * 100);
            return h(
              "li",
              { class: `row ${g.finishedAt ? "is-done" : ""}` },
              h("div", { class: "row-top" }, playersCell(g.players), h("span", { class: "muted" }, ago(g.lastAt))),
              h("div", { class: "bar", "aria-hidden": "true" }, h("div", { style: `width:${pct}%` })),
              h(
                "p",
                { class: "row-meta" },
                g.finishedAt ? "🏆 Finished · " : "",
                `Page ${num(g.step + (g.finishedAt ? 0 : 1))} of ${num(g.total)}`,
                ` · ${num(pct, pct < 10 ? 1 : 0)}%`,
                g.pace ? ` · ${num(g.pace)} pages/min` : "",
                ` · started ${when(g.startedAt)}`
              )
            );
          })
        )
      : h("p", { class: "empty" }, "No games yet. Scan the QR code to test.")
  );
}

function render() {
  const st = state.stats;
  const f = st.furthest;
  root.replaceChildren(
    h(
      "header",
      { class: "admin-head" },
      h("div", {}, h("p", { class: "eyebrow" }, "Hearthlands: Age of Tillage"), h("h1", {}, "The Tavern Ledger")),
      h(
        "button",
        {
          class: "btn link light",
          onclick: async () => {
            await api("logout", {});
            login();
          },
        },
        "Sign out"
      )
    ),
    h(
      "section",
      { class: "tiles" },
      tile("Games today", num(st.startedToday), `${num(st.startedWeek)} this week · ${num(st.startedAll)} all time`),
      tile("Winners", num(st.finishedAll), `${num(st.finishedWeek)} this week`),
      tile(
        "Measured pace",
        st.medianPace ? `${num(st.medianPace)}/min` : "—",
        st.pacedGames ? `median of ${num(st.pacedGames)} games · fastest ${num(st.fastestPace)}` : "needs games past page 30"
      ),
      tile(
        "Furthest (unfinished)",
        f ? `${num((f.step / f.total) * 100, 1)}%` : "—",
        f ? `${f.players[0]} · page ${num(f.step + 1)} of ${num(f.total)}` : "no one yet"
      )
    ),
    settingsCard(),
    completionsCard(),
    recentCard()
  );
}

load();
