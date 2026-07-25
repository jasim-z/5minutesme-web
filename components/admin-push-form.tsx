"use client"

import { useCallback, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Audience = "all" | "user_ids" | "inactive_days"

type Props = {
  accessToken: string
}

export function AdminPushForm({ accessToken }: Props) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [audience, setAudience] = useState<Audience>("all")
  const [userIdsText, setUserIdsText] = useState("")
  const [inactiveDays, setInactiveDays] = useState("3")
  const [screen, setScreen] = useState("home")
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const userIds = useMemo(
    () =>
      userIdsText
        .split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean),
    [userIdsText]
  )

  const send = useCallback(async () => {
    setSending(true)
    setError(null)
    setResult(null)

    const payload: Record<string, unknown> = {
      title: title.trim(),
      body: body.trim(),
      audience,
      data: { type: "campaign", screen: screen.trim() || "home" },
    }

    if (audience === "user_ids") {
      payload.userIds = userIds
    }
    if (audience === "inactive_days") {
      payload.inactiveDays = Number(inactiveDays) || 3
    }

    try {
      const res = await fetch("/api/admin/send-push", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(
          typeof data?.error === "string"
            ? data.error
            : `Request failed (${res.status})`
        )
      } else {
        setResult(JSON.stringify(data, null, 2))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error")
    } finally {
      setSending(false)
    }
  }, [
    accessToken,
    audience,
    body,
    inactiveDays,
    screen,
    title,
    userIds,
  ])

  return (
    <form
      className="space-y-5 rounded-lg border border-border bg-card p-6"
      onSubmit={(e) => {
        e.preventDefault()
        void send()
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="push-title">
          Title
        </label>
        <Input
          id="push-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={80}
          required
          placeholder="A quiet moment for you"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="push-body">
          Body
        </label>
        <textarea
          id="push-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={4}
          maxLength={200}
          placeholder="Five minutes is enough to reconnect."
          className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="push-audience">
          Audience
        </label>
        <select
          id="push-audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value as Audience)}
          className="flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
        >
          <option value="all">All opted-in devices</option>
          <option value="user_ids">Specific user IDs</option>
          <option value="inactive_days">Inactive for N days</option>
        </select>
      </div>

      {audience === "user_ids" && (
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="push-user-ids">
            User IDs (comma or newline separated UUIDs)
          </label>
          <textarea
            id="push-user-ids"
            value={userIdsText}
            onChange={(e) => setUserIdsText(e.target.value)}
            required
            rows={3}
            className="flex w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm"
            placeholder="945de2a6-d97d-408d-ad2a-8ca090229e11"
          />
        </div>
      )}

      {audience === "inactive_days" && (
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="push-inactive-days">
            Inactive days
          </label>
          <Input
            id="push-inactive-days"
            type="number"
            min={1}
            value={inactiveDays}
            onChange={(e) => setInactiveDays(e.target.value)}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="push-screen">
          Deep link screen
        </label>
        <select
          id="push-screen"
          value={screen}
          onChange={(e) => setScreen(e.target.value)}
          className="flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
        >
          <option value="home">Home</option>
          <option value="moments">Moments</option>
          <option value="stats">Stats</option>
          <option value="reminders">Reminders</option>
        </select>
      </div>

      <Button type="submit" disabled={sending} className="w-full">
        {sending ? "Sending…" : "Send notification"}
      </Button>

      {error && (
        <pre className="overflow-x-auto rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
          {error}
        </pre>
      )}
      {result && (
        <pre className="overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs text-foreground">
          {result}
        </pre>
      )}
    </form>
  )
}
