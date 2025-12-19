"use client"

import { useState, FormEvent, useEffect } from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react"
import { supabase } from "@/lib/supabase"

type PageState = 
  | "verifying" 
  | "verified" 
  | "error" 
  | "success"

export function ResetPasswordClient() {
  const [pageState, setPageState] = useState<PageState>("verifying")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{
    newPassword?: string
    confirmPassword?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Extract tokens from hash fragment and set session
  useEffect(() => {
    const extractTokensAndSetSession = async () => {
      try {
        // Get hash fragment (remove the #)
        const hash = window.location.hash.substring(1)
        
        if (!hash) {
          setPageState("error")
          setErrorMessage("Reset link is invalid or expired. Please request a new password reset link from the app.")
          // Clear hash from URL
          window.history.replaceState(null, "", window.location.pathname)
          return
        }

        // Parse hash parameters
        const params = new URLSearchParams(hash)
        const accessToken = params.get("access_token")
        const refreshToken = params.get("refresh_token")
        const type = params.get("type")

        // Verify it's a recovery type
        if (type !== "recovery") {
          setPageState("error")
          setErrorMessage("Invalid reset link type. Please request a new password reset link from the app.")
          window.history.replaceState(null, "", window.location.pathname)
          return
        }

        // Check if tokens exist
        if (!accessToken || !refreshToken) {
          setPageState("error")
          setErrorMessage("Reset link is missing required tokens. Please request a new password reset link from the app.")
          window.history.replaceState(null, "", window.location.pathname)
          return
        }

        // Set Supabase session
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (error) {
          setPageState("error")
          setErrorMessage(
            error.message || "Reset link is invalid or expired. Please request a new password reset link from the app."
          )
          window.history.replaceState(null, "", window.location.pathname)
          return
        }

        if (!data.session) {
          setPageState("error")
          setErrorMessage("Failed to verify reset link. Please request a new password reset link from the app.")
          window.history.replaceState(null, "", window.location.pathname)
          return
        }

        // Success - clear hash and allow password reset
        window.history.replaceState(null, "", window.location.pathname)
        setPageState("verified")
      } catch (error) {
        console.error("Error setting session:", error)
        setPageState("error")
        setErrorMessage("An unexpected error occurred. Please try again or request a new password reset link from the app.")
        window.history.replaceState(null, "", window.location.pathname)
      }
    }

    extractTokensAndSetSession()
  }, [])

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!newPassword) {
      newErrors.newPassword = "Password is required"
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) {
        setErrorMessage(error.message || "Failed to update password. Please try again.")
        setIsSubmitting(false)
        return
      }

      // Success
      setPageState("success")
    } catch (error) {
      console.error("Error updating password:", error)
      setErrorMessage("An unexpected error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  const openApp = () => {
    window.location.href = "5minutesme://"
  }

  // Verifying state
  if (pageState === "verifying") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-0">
                <Logo size={32} className="h-8 w-8" />
                <span className="text-xl font-semibold text-foreground">MinutesMe</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-md">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center animate-pulse">
                  <Lock className="h-8 w-8 text-foreground" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-foreground">Verifying reset link...</h1>
              <p className="text-muted-foreground">Please wait while we verify your password reset link.</p>
            </div>
          </div>
        </main>

        <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-0">
                <Logo size={24} className="h-6 w-6" />
                <span className="text-sm font-medium text-foreground">MinutesMe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} 5MinutesMe. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Error state
  if (pageState === "error") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-0">
                <Logo size={32} className="h-8 w-8" />
                <span className="text-xl font-semibold text-foreground">MinutesMe</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-md">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  </div>
                </div>
                <h1 className="text-2xl font-semibold text-foreground">Reset Link Invalid</h1>
                <p className="text-muted-foreground">{errorMessage}</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  To request a new password reset link:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                  <li>Open the 5MinutesMe app</li>
                  <li>Go to the login screen</li>
                  <li>Tap &quot;Forgot Password&quot;</li>
                  <li>Enter your email and check your inbox</li>
                </ol>
              </div>

              <div className="text-center">
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-0">
                <Logo size={24} className="h-6 w-6" />
                <span className="text-sm font-medium text-foreground">MinutesMe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} 5MinutesMe. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Success state
  if (pageState === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-0">
                <Logo size={32} className="h-8 w-8" />
                <span className="text-xl font-semibold text-foreground">MinutesMe</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-md">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-2xl font-semibold text-foreground">Password Reset Successful</h1>
                <p className="text-muted-foreground">
                  Your password has been updated successfully. You can now sign in to the app with your new password.
                </p>
              </div>

              <Button
                onClick={openApp}
                className="w-full h-11"
                size="lg"
              >
                Open App
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-0">
                <Logo size={24} className="h-6 w-6" />
                <span className="text-sm font-medium text-foreground">MinutesMe</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} 5MinutesMe. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Verified state - show password reset form
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-0">
              <Logo size={32} className="h-8 w-8" />
              <span className="text-xl font-semibold text-foreground">MinutesMe</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-md">
          <div className="space-y-8">
            {/* Title */}
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Lock className="h-8 w-8 text-foreground" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Reset Password
              </h1>
              <p className="text-muted-foreground">
                Choose a new password for your account
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <p className="text-sm text-destructive">{errorMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password (min. 8 characters)"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                      if (errors.newPassword) {
                        setErrors({ ...errors, newPassword: undefined })
                      }
                    }}
                    disabled={isSubmitting}
                    className={errors.newPassword ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    disabled={isSubmitting}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-destructive">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground flex items-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (errors.confirmPassword) {
                        setErrors({ ...errors, confirmPassword: undefined })
                      }
                    }}
                    disabled={isSubmitting}
                    className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating Password..." : "Reset Password"}
              </Button>
            </form>

            {/* Back to Home Link */}
            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-0">
              <Logo size={24} className="h-6 w-6" />
              <span className="text-sm font-medium text-foreground">MinutesMe</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 5MinutesMe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
