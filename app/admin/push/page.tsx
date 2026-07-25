import type { Metadata } from "next"
import { AdminPushClient } from "@/components/admin-push-client"

export const metadata: Metadata = {
  title: "Send push | Admin | 5MinutesMe",
  robots: { index: false, follow: false },
}

export default function AdminPushPage() {
  return <AdminPushClient />
}
