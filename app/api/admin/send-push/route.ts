import { NextResponse } from "next/server"
import {
  getPushAdminSecret,
  getSupabaseFunctionsUrl,
} from "@/lib/admin"
import { requireAdminUser } from "@/lib/require-admin"

type Audience = "all" | "user_ids" | "inactive_days"

type SendPushBody = {
  title?: string
  body?: string
  data?: Record<string, unknown>
  audience?: Audience
  userIds?: string[]
  inactiveDays?: number
}

export async function POST(request: Request) {
  const auth = await requireAdminUser(request)
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const secret = getPushAdminSecret()
  if (!secret) {
    return NextResponse.json(
      { error: "PUSH_ADMIN_SECRET is not configured on the server" },
      { status: 500 }
    )
  }

  let payload: SendPushBody
  try {
    payload = (await request.json()) as SendPushBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!payload.title?.trim() || !payload.body?.trim() || !payload.audience) {
    return NextResponse.json(
      { error: "title, body, and audience are required" },
      { status: 400 }
    )
  }

  if (!["all", "user_ids", "inactive_days"].includes(payload.audience)) {
    return NextResponse.json({ error: "Invalid audience" }, { status: 400 })
  }

  if (payload.audience === "user_ids" && !payload.userIds?.length) {
    return NextResponse.json(
      { error: "userIds required when audience is user_ids" },
      { status: 400 }
    )
  }

  const edgeBody = {
    title: payload.title.trim(),
    body: payload.body.trim(),
    data: payload.data ?? { screen: "home", type: "campaign" },
    audience: payload.audience,
    userIds: payload.userIds,
    inactiveDays: payload.inactiveDays,
    createdBy: auth.user.email ?? auth.user.id,
  }

  const url = `${getSupabaseFunctionsUrl()}/send-push`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(edgeBody),
  })

  const text = await res.text()
  let data: unknown = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { error: text || "Upstream error" }
  }

  return NextResponse.json(data, { status: res.status })
}
