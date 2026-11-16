import "server-only"
import { createHmac, timingSafeEqual } from "node:crypto"
import nodemailer from "nodemailer"

/*
 * Contact form helpers. Server-only: settings come from non-public env vars,
 * nothing is stored, and failures are logged as an error code only.
 */

export const LIMITS = { name: 200, email: 254, message: 5000 } as const

/** Spam protection: the form must be open at least this long before submitting… */
const MIN_FILL_MS = 3_000
/** …and the form token expires after this long. */
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000

/** In-memory rate limit per IP (per server instance; resets on restart). */
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX = 5

export type ContactErrorCode =
  | "invalid"
  | "too_fast"
  | "expired"
  | "rate_limited"
  | "not_configured"
  | "send_failed"

// The token secret never leaves the server. It reuses the Brevo key so no extra env var is needed.
function tokenSecret() {
  return process.env.BREVO_SMTP_KEY || "contact-form-dev-secret"
}

function sign(value: string) {
  return createHmac("sha256", tokenSecret()).update(value).digest("base64url")
}

/** Signed render timestamp, put in a hidden field so a bot can't fake the fill time. */
export function createFormToken(now = Date.now()) {
  const ts = String(now)
  return `${ts}.${sign(ts)}`
}

export function checkFormToken(token: string, now = Date.now()): ContactErrorCode | null {
  const [ts, mac] = token.split(".")
  if (!ts || !mac) return "invalid"
  const expected = Buffer.from(sign(ts))
  const given = Buffer.from(mac)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return "invalid"
  const age = now - Number(ts)
  if (!Number.isFinite(age) || age < 0) return "invalid"
  if (age < MIN_FILL_MS) return "too_fast"
  if (age > MAX_FORM_AGE_MS) return "expired"
  return null
}

const hits = new Map<string, number[]>()

export function isRateLimited(ip: string, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  // Keep the map small: drop IPs with no recent hits.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/

export type ContactInput = { name: string; email: string; message: string }

export function validate(form: FormData): ContactInput | null {
  const str = (key: string) => {
    const v = form.get(key)
    return typeof v === "string" ? v.trim() : ""
  }
  const name = str("name").replace(/[\r\n]+/g, " ")
  const email = str("email")
  const message = str("message")
  const consent = form.get("consent")

  if (!consent) return null
  if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) return null
  if (!message || message.length > LIMITS.message) return null
  if (name.length > LIMITS.name) return null
  return { name, email, message }
}

function smtpConfig() {
  const {
    BREVO_SMTP_HOST: host,
    BREVO_SMTP_PORT: port,
    BREVO_SMTP_USER: user,
    BREVO_SMTP_KEY: pass,
    CONTACT_TO_EMAIL: to,
    CONTACT_FROM_EMAIL: from,
  } = process.env
  if (!host || !port || !user || !pass || !to || !from) return null
  return { host, port: Number(port), user, pass, to, from }
}

export async function sendContactMail(input: ContactInput): Promise<ContactErrorCode | null> {
  const cfg = smtpConfig()
  if (!cfg) return "not_configured"

  const transport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
  })

  const sender = input.name || input.email
  try {
    await transport.sendMail({
      from: { name: "5MinutesMe Kontaktformular", address: cfg.from },
      to: cfg.to,
      replyTo: input.name ? { name: input.name, address: input.email } : input.email,
      subject: `Kontaktformular: ${sender}`.slice(0, 180),
      text: [
        "Neue Nachricht über das Kontaktformular auf 5minutesme.com",
        "",
        `Name: ${input.name || "(nicht angegeben)"}`,
        `E-Mail: ${input.email}`,
        "",
        "Nachricht:",
        input.message,
      ].join("\n"),
    })
    return null
  } catch {
    return "send_failed"
  }
}
