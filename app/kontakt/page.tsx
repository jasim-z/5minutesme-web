import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { LegalLinks } from "@/components/legal-links"
import { createFormToken } from "@/lib/contact"

export const metadata: Metadata = {
  title: "Kontakt · 5MinutesMe",
  description: "Schreib uns über das Kontaktformular. Contact 5MinutesMe and BrightestMe.",
  alternates: { canonical: "/kontakt" },
}

// Rendered per request so each visitor gets a fresh, signed form timestamp.
export const dynamic = "force-dynamic"

export default async function Kontakt({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; code?: string }>
}) {
  const { status, code } = await searchParams

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-0">
              <Logo size={32} className="h-8 w-8" />
              <span className="text-xl font-semibold text-foreground">MinutesMe</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <Link href="/">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="mb-10 space-y-3" lang="de">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Kontakt</h1>
            <p className="text-foreground leading-relaxed">
              Schreib uns eine Nachricht zu 5MinutesMe oder BrightestMe. Wir antworten an die
              E-Mail-Adresse, die du angibst.
            </p>
            <p className="text-muted-foreground leading-relaxed" lang="en">
              Send us a message about 5MinutesMe or BrightestMe. We&apos;ll reply to the email address
              you enter. You can also email{" "}
              <a href="mailto:support@5minutesme.com" className="text-primary underline-offset-4 hover:underline">
                support@5minutesme.com
              </a>
              .
            </p>
          </div>

          <div lang="de">
            <ContactForm token={createFormToken()} initialStatus={status} initialCode={code} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-0">
              <Logo size={24} className="h-6 w-6" />
              <span className="text-sm font-medium text-foreground">MinutesMe</span>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} 5MinutesMe. All rights reserved.
              </p>
              <LegalLinks />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
