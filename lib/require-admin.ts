import { createClient, type User } from "@supabase/supabase-js"
import { isAdminEmail } from "@/lib/admin"

/**
 * Verify Bearer access token and ensure the user is on the admin allowlist.
 */
export async function requireAdminUser(
  request: Request
): Promise<{ user: User } | { error: string; status: number }> {
  const auth = request.headers.get("Authorization") ?? ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : ""
  if (!token) {
    return { error: "Missing Authorization bearer token", status: 401 }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    return { error: "Supabase env not configured", status: 500 }
  }

  const supabase = createClient(url, anon, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    return { error: "Invalid or expired session", status: 401 }
  }

  if (!isAdminEmail(data.user.email)) {
    return { error: "Forbidden", status: 403 }
  }

  return { user: data.user }
}
