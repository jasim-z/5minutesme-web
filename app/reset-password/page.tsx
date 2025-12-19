import type { Metadata } from "next"
import { ResetPasswordClient } from "@/components/reset-password-client"

export const metadata: Metadata = {
  title: "5MinutesMe - Reset Password",
  description: "Reset your password for your 5MinutesMe account.",
}

export default function ResetPasswordPage() {
  return <ResetPasswordClient />
}

