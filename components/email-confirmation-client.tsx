"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { CheckCircle2, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export function EmailConfirmationClient() {
  const deepLink = useMemo(() => "5minutesme://", [])
  const [secondsLeft, setSecondsLeft] = useState(15)

  const redirectTimeoutRef = useRef<number | null>(null)
  const countdownIntervalRef = useRef<number | null>(null)

  const clearTimers = () => {
    if (redirectTimeoutRef.current !== null) {
      window.clearTimeout(redirectTimeoutRef.current)
      redirectTimeoutRef.current = null
    }
    if (countdownIntervalRef.current !== null) {
      window.clearInterval(countdownIntervalRef.current)
      countdownIntervalRef.current = null
    }
  }

  const openApp = () => {
    clearTimers()
    window.location.href = deepLink
  }

  useEffect(() => {
    // Countdown (runs in callback, not synchronously in the effect body)
    countdownIntervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)

    // Redirect
    redirectTimeoutRef.current = window.setTimeout(() => {
      window.location.href = deepLink
    }, 15000)

    return () => clearTimers()
    // deepLink is stable via useMemo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <div className="container mx-auto max-w-2xl">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm text-center space-y-6">
            <div className="mx-auto size-14 rounded-full bg-primary/15 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Email verified successfully
              </h1>
              <p className="text-muted-foreground">
                You can now sign in to the 5MinutesMe app.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Redirecting you to the app in{" "}
                <span className="font-semibold text-foreground">{secondsLeft}s</span>…
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={openApp} className="h-11">
                  Open app
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                If you’re on desktop, open this page on your phone to launch the app.
              </p>
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


