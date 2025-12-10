import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

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
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Title */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {currentDate}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <p className="text-foreground leading-relaxed">
                Welcome to 5MinutesMe. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains what data we collect, how we use it, and your rights regarding your information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
              <p className="text-foreground">
                We may collect the following types of information when you use our app:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">• Account Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                    <li>Name</li>
                    <li>Email address (if provided)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">• Activity Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                    <li>Activities you create or track</li>
                    <li>Completion timestamps</li>
                    <li>Duration of activities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">• Device Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                    <li>Device identifiers required for app functionality</li>
                    <li>OS and app version data (for debugging)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">• Notification Preferences</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                    <li>Reminder settings</li>
                    <li>Local device permission status</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
              <p className="text-foreground">We use your information to:</p>
              <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                <li>Provide core app functionality</li>
                <li>Track your activity progress</li>
                <li>Send reminder notifications (if enabled)</li>
                <li>Improve user experience and app performance</li>
                <li>Diagnose crashes and errors</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Data Storage & Security</h2>
              <p className="text-foreground">
                Your data is securely stored using Supabase, a cloud database provider.
              </p>
              <p className="text-foreground">
                We use encryption in transit and apply industry-standard security practices to protect your data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Third-Party Services</h2>
              <p className="text-foreground">We use trusted third-party services:</p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Supabase</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                    <li>Data storage</li>
                    <li>Authentication</li>
                    <li>Backend API</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">Sentry</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                    <li>Error tracking</li>
                    <li>Performance monitoring</li>
                  </ul>
                </div>
              </div>

              <p className="text-foreground">
                These services have their own privacy policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Your Rights</h2>
              <p className="text-foreground">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 text-foreground ml-4">
                <li>Access your personal information</li>
                <li>Export your data</li>
                <li>Request deletion of all your app data and account</li>
                <li>Disable notifications at any time</li>
                <li>Withdraw permissions from your device settings</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. Children&apos;s Privacy</h2>
              <p className="text-foreground">
                The app is not intended for children under 13.
              </p>
              <p className="text-foreground">
                We do not knowingly collect data from children under 13 years old.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. Changes to This Policy</h2>
              <p className="text-foreground">
                We may update this policy from time to time. Updates will be posted on this page with a new Last Updated date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">8. Contact Us</h2>
              <p className="text-foreground">
                If you have any questions regarding this Privacy Policy, please contact us at:
              </p>
              <p className="text-foreground">
                <a 
                  href="mailto:support@5minutesme.com" 
                  className="text-primary hover:underline"
                >
                  support@5minutesme.com
                </a>
              </p>
            </section>
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
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 5MinutesMe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

