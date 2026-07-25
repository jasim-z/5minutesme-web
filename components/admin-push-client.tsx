"use client"

import { useCallback, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminPushForm } from "@/components/admin-push-form"

function adminRedirectUrl() {
  if (typeof window === "undefined") return undefined
  return `${window.location.origin}/admin/push`
}

export function AdminPushClient() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)
  const [signingIn, setSigningIn] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  useEffect(() => {
    let mounted = true

    // Completes OAuth redirect (hash / PKCE) then loads session
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      setUser(next?.user ?? null)
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    setSigningIn(true)
    setAuthError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: adminRedirectUrl(),
        queryParams: {
          prompt: "select_account",
        },
      },
    })
    if (error) {
      setAuthError(error.message)
      setSigningIn(false)
    }
    // On success the browser redirects away
  }, [])

  const signInWithPassword = useCallback(async () => {
    setSigningIn(true)
    setAuthError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) setAuthError(error.message)
    setSigningIn(false)
  }, [email, password])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Checking session…</p>
    )
  }

  if (!session || !user) {
    return (
      <div className="space-y-6 rounded-lg border border-border bg-card p-6">
        <div>
          <h2 className="text-xl font-semibold">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use the same Google account as the app. Only allowlisted admin emails
            can send pushes.
          </p>
        </div>

        <Button
          type="button"
          className="w-full"
          disabled={signingIn}
          onClick={() => void signInWithGoogle()}
        >
          {signingIn ? "Redirecting…" : "Continue with Google"}
        </Button>

        <button
          type="button"
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
          onClick={() => setShowPasswordForm((v) => !v)}
        >
          {showPasswordForm ? "Hide email sign-in" : "Use email & password instead"}
        </button>

        {showPasswordForm && (
          <form
            className="space-y-4 border-t border-border pt-4"
            onSubmit={(e) => {
              e.preventDefault()
              void signInWithPassword()
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="admin-email">
                Email
              </label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="admin-password">
                Password
              </label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={signingIn} className="w-full" variant="outline">
              {signingIn ? "Signing in…" : "Sign in with email"}
            </Button>
          </form>
        )}

        {authError && (
          <p className="text-sm text-destructive">{authError}</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Send push notification</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as {user.email}
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => void signOut()}>
          Sign out
        </Button>
      </div>
      <AdminPushForm accessToken={session.access_token} />
    </div>
  )
}
