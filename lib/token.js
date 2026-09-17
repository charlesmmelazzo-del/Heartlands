// Signed progress tokens. The server never stores anything: all progress lives
// in a token the guest's phone holds, signed so it can't be edited.
import crypto from "node:crypto";

let SECRET = process.env.TOKEN_SECRET;
if (!SECRET) {
  SECRET = crypto.randomBytes(32).toString("hex");
  console.warn(
    "[hearthlands] TOKEN_SECRET is not set — using a random one. Guests' saved progress will be lost whenever the server restarts."
  );
}

const b64 = (buf) => Buffer.from(buf).toString("base64url");
const sign = (body) => crypto.createHmac("sha256", SECRET).update(body).digest("base64url");

export function encode(state) {
  const body = b64(JSON.stringify(state));
  return `${body}.${sign(body)}`;
}

export function decode(token) {
  if (typeof token !== "string" || token.length > 4000) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

// Short code shown on the victory screen, unique to that run.
export function claimCode(state) {
  const h = crypto.createHmac("sha256", SECRET).update(`claim:${state.id}`).digest("hex");
  return h.slice(0, 6).toUpperCase();
}

export function newId() {
  return crypto.randomBytes(9).toString("base64url");
}
