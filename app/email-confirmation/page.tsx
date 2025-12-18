import type { Metadata } from "next"
import { EmailConfirmationClient } from "@/components/email-confirmation-client"

export const metadata: Metadata = {
  title: "5MinutesMe - Email Verified",
  description: "Your email was verified successfully. You can now sign in to the 5MinutesMe app.",
}

export default function EmailConfirmationPage() {
  return <EmailConfirmationClient />
}


