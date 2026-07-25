/**
 * Server-only admin helpers for ops routes.
 */

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? ""
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  const allow = getAdminEmails()
  if (allow.length === 0) return false
  return allow.includes(email.trim().toLowerCase())
}

export function getPushAdminSecret(): string | null {
  const secret = process.env.PUSH_ADMIN_SECRET?.trim()
  return secret || null
}

export function getSupabaseFunctionsUrl(): string {
  const base =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ??
    ""
  return `${base}/functions/v1`
}
