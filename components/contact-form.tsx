"use client"

import Link from "next/link"
import { useRef, useState, type FormEvent } from "react"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ERRORS: Record<string, { de: string; en: string }> = {
  invalid: {
    de: "Bitte prüfe deine Angaben: E-Mail-Adresse, Nachricht und Einwilligung sind erforderlich.",
    en: "Please check your details: email, message and consent are required.",
  },
  too_fast: {
    de: "Das ging etwas zu schnell. Bitte warte einen Moment und sende das Formular erneut.",
    en: "That was a little too fast. Please wait a moment and send the form again.",
  },
  expired: {
    de: "Das Formular ist abgelaufen. Bitte lade die Seite neu und versuche es noch einmal.",
    en: "The form has expired. Please reload the page and try again.",
  },
  rate_limited: {
    de: "Zu viele Nachrichten in kurzer Zeit. Bitte versuche es später noch einmal.",
    en: "Too many messages in a short time. Please try again later.",
  },
  default: {
    de: "Die Nachricht konnte nicht gesendet werden. Bitte versuche es später noch einmal oder schreib uns an support@5minutesme.com.",
    en: "Your message could not be sent. Please try again later or email support@5minutesme.com.",
  },
}

const MAX = { name: 200, message: 5000 }

const labelClass = "block text-sm font-medium text-foreground"
const hintClass = "block text-xs text-muted-foreground"

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; code: string }

export function ContactForm({
  token,
  initialStatus,
  initialCode,
}: {
  token: string
  initialStatus?: string
  initialCode?: string
}) {
  const [status, setStatus] = useState<Status>(
    initialStatus === "sent"
      ? { state: "sent" }
      : initialStatus === "error"
        ? { state: "error", code: initialCode ?? "default" }
        : { state: "idle" }
  )
  const feedbackRef = useRef<HTMLDivElement>(null)

  const focusFeedback = () => window.setTimeout(() => feedbackRef.current?.focus(), 0)

  // Progressive enhancement: without JavaScript the form posts normally and the server redirects back.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({ state: "sending" })
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean; code?: string } | null
      setStatus(data?.ok ? { state: "sent" } : { state: "error", code: data?.code ?? "default" })
    } catch {
      setStatus({ state: "error", code: "default" })
    }
    focusFeedback()
  }

  if (status.state === "sent") {
    return (
      <div
        ref={feedbackRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-border bg-card p-6 focus:outline-none"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Danke! Deine Nachricht ist angekommen.</h2>
            <p className="text-muted-foreground" lang="en">
              Thank you, your message has been sent. We&apos;ll reply to the email address you gave us.
            </p>
            <p className="pt-2">
              <Link href="/" className="text-primary underline-offset-4 hover:underline">
                Zur Startseite · Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const error = status.state === "error" ? (ERRORS[status.code] ?? ERRORS.default) : null

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={onSubmit}
      className="space-y-6"
      aria-describedby={error ? "contact-error" : undefined}
    >
      {error && (
        <div
          id="contact-error"
          ref={feedbackRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/60 bg-destructive/10 p-4 focus:outline-none"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
          <div className="space-y-1 text-sm">
            <p className="text-foreground">{error.de}</p>
            <p className="text-muted-foreground" lang="en">
              {error.en}
            </p>
          </div>
        </div>
      )}

      <input type="hidden" name="token" value={token} />

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-name" className={labelClass}>
          Name <span className="font-normal text-muted-foreground">(optional)</span>
          <span className={hintClass} lang="en">
            Name
          </span>
        </label>
        <Input id="contact-name" name="name" type="text" autoComplete="name" maxLength={MAX.name} />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className={labelClass}>
          E-Mail-Adresse <span className="font-normal text-muted-foreground">(erforderlich)</span>
          <span className={hintClass} lang="en">
            Email address, required
          </span>
        </label>
        <Input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className={labelClass}>
          Nachricht <span className="font-normal text-muted-foreground">(erforderlich)</span>
          <span className={hintClass} lang="en">
            Message, required
          </span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={7}
          maxLength={MAX.message}
          className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        <label htmlFor="contact-consent" className="text-sm text-foreground">
          Ich bin damit einverstanden, dass meine Angaben zur Beantwortung meiner Anfrage verwendet werden
          (siehe{" "}
          <Link href="/privacy" className="text-primary underline underline-offset-4">
            Datenschutzerklärung
          </Link>
          ).
          <span className={`${hintClass} mt-1`} lang="en">
            I agree that my details are used to answer my request (see{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            ).
          </span>
        </label>
      </div>

      <Button type="submit" disabled={status.state === "sending"} className="w-full sm:w-auto">
        {status.state === "sending" ? "Wird gesendet… · Sending…" : "Nachricht senden · Send message"}
      </Button>
    </form>
  )
}
