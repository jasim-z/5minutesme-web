import { LegalPage } from "@/components/brightestme/legal-page"
import { brightestMeMetadata } from "@/lib/brightestme"

export const metadata = brightestMeMetadata({
  title: "Terms of Use · BrightestMe",
  description: "The terms that apply when you use the BrightestMe app.",
  path: "/brightestme/terms",
})

export default function BrightestMeTerms() {
  return <LegalPage file="terms.md" />
}
