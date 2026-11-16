import { LegalPage } from "@/components/brightestme/legal-page"
import { brightestMeMetadata } from "@/lib/brightestme"

export const metadata = brightestMeMetadata({
  title: "Privacy Policy · BrightestMe",
  description:
    "What data the BrightestMe app uses, why, where it is stored, and how to exercise your rights under the GDPR.",
  path: "/brightestme/privacy",
})

export default function BrightestMePrivacy() {
  return <LegalPage file="privacy.md" />
}
