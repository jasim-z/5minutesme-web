import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { LegalLinks } from "@/components/legal-links"

export const metadata: Metadata = {
  title: "Impressum · 5MinutesMe",
  description: "Legal notice (Impressum) for 5minutesme.com under § 5 DDG.",
  alternates: { canonical: "/impressum" },
}

export default function Impressum() {
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
        <div className="container mx-auto max-w-3xl">
          <Link href="/">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <article lang="de" className="space-y-10 text-foreground leading-relaxed">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">Impressum</h1>
              <p className="text-muted-foreground" lang="en">
                Legal notice for 5minutesme.com, including 5MinutesMe and BrightestMe.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Angaben gemäß § 5 DDG</h2>
              <address className="not-italic">
                Jasim Labadakath Zainudheen
                <br />
                5MinutesMe
                <br />
                Therese-Giehse-Allee 46
                <br />
                81739 München
                <br />
                Deutschland
              </address>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Kontakt</h2>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:support@5minutesme.com"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  support@5minutesme.com
                </a>
              </p>
              <p>
                Kontaktformular:{" "}
                <Link href="/kontakt" className="underline underline-offset-4 hover:text-primary">
                  5minutesme.com/kontakt
                </Link>
              </p>
            </section>
          </article>
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
