"use client"

import { useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type EmailLandingProps = {
  source: string | null
  email: string | null
}

type PostHogLike = {
  capture: (event: string, properties?: Record<string, unknown>) => void
}

function captureEvent(event: string, properties?: Record<string, unknown>) {
  // PostHog placeholder: wire up your real client later.
  const posthog = (globalThis as unknown as { posthog?: PostHogLike }).posthog

  if (posthog?.capture) {
    posthog.capture(event, properties)
    return
  }

  // Keep this quiet in production; still useful during integration.
  if (process.env.NODE_ENV !== "production") {
    console.debug("[posthog placeholder]", event, properties)
  }
}

export default function StartPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { source, email } = useMemo<EmailLandingProps>(() => {
    const sourceParam = searchParams.get("source")
    const emailParam = searchParams.get("email")
    return { source: sourceParam, email: emailParam }
  }, [searchParams])

  useEffect(() => {
    console.log("[/start] source:", source, "email:", email)

    captureEvent("email_landing_opened", {
      source,
      ...(email ? { email } : {}),
    })
  }, [source, email])

  const onStartSession = () => {
    captureEvent("start_session_clicked", { source, ...(email ? { email } : {}) })
    router.push("/session")
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-[480px]">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome to your first 5-minute session 👋
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              This takes just 5 minutes. No pressure. Just start.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartSession}
            className="w-full rounded-lg bg-primary px-4 py-3 text-base font-medium text-primary-foreground shadow-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Start Session
          </button>

          <div className="pt-2 text-center">
            <p className="text-sm text-muted-foreground">Prefer using the app?</p>
            <div className="mt-2 flex items-center justify-center gap-6">
              <a
                href="fiveminutesme://start"
                className="text-sm font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                Open App
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.fiveminutesme.app"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                Download App
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

