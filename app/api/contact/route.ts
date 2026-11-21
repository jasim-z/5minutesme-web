import { NextResponse, type NextRequest } from "next/server"
import {
  checkFormToken,
  isRateLimited,
  sendContactMail,
  validate,
  type ContactErrorCode,
} from "@/lib/contact"

export const runtime = "nodejs"

const HTTP_STATUS: Record<ContactErrorCode, number> = {
  invalid: 400,
  too_fast: 400,
  expired: 400,
  rate_limited: 429,
  not_configured: 500,
  send_failed: 502,
}

/**
 * Contact form endpoint. Works two ways:
 * - plain form post (no JavaScript): redirects back to /kontakt with ?status=…
 * - fetch with `Accept: application/json`: returns { ok, code }
 */
export async function POST(req: NextRequest) {
  const wantsJson = req.headers.get("accept")?.includes("application/json") ?? false

  const respond = (code: ContactErrorCode | null) => {
    if (code && (code === "not_configured" || code === "send_failed")) {
      // Error code only: no names, emails, messages or IPs in logs.
      console.error(`[contact] ${code}`)
    }
    if (wantsJson) {
      return NextResponse.json({ ok: !code, code }, { status: code ? HTTP_STATUS[code] : 200 })
    }
    const url = new URL("/kontakt", req.url)
    url.searchParams.set("status", code ? "error" : "sent")
    if (code) url.searchParams.set("code", code)
    return NextResponse.redirect(url, 303)
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return respond("invalid")
  }

  // Honeypot: humans never see this field. Pretend success so bots learn nothing.
  const honeypot = form.get("website")
  if (typeof honeypot === "string" && honeypot.trim() !== "") return respond(null)

  const tokenError = checkFormToken(String(form.get("token") ?? ""))
  if (tokenError) return respond(tokenError)

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  if (isRateLimited(ip)) return respond("rate_limited")

  const input = validate(form)
  if (!input) return respond("invalid")

  return respond(await sendContactMail(input))
}
