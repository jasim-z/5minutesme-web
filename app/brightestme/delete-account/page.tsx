import { LegalPage } from "@/components/brightestme/legal-page"
import { brightestMeMetadata } from "@/lib/brightestme"

export const metadata = brightestMeMetadata({
  title: "Delete your account · BrightestMe",
  description:
    "How to delete your BrightestMe account and all its data, in the app or by email, and what we delete and keep.",
  path: "/brightestme/delete-account",
})

export default function BrightestMeDeleteAccount() {
  return <LegalPage file="delete-account.md" />
}
