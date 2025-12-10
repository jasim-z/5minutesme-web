import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { ArrowLeft, Trash2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DeleteAccount() {
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
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="h-8 w-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Delete Your 5MinutesMe Account
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              You can delete your 5MinutesMe account at any time.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* How to Delete in App */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                How to Delete Your Account (Inside the App)
              </h2>
              
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <ol className="list-decimal list-inside space-y-4 text-foreground">
                  <li>Open the 5MinutesMe app</li>
                  <li>Go to Profile</li>
                  <li>Tap Settings</li>
                  <li>Select Delete Account</li>
                  <li>Confirm your deletion</li>
                </ol>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-3">
                <p className="font-semibold text-foreground">Once confirmed:</p>
                <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                  <li>Your account will be permanently deleted</li>
                  <li>All associated personal data will be removed from our servers</li>
                  <li>Activity history, reminders, and settings will also be deleted</li>
                  <li>Deleted data cannot be restored</li>
                  <li>Some technical logs (e.g., crash logs) may be retained for up to 30 days for security and debugging</li>
                </ul>
              </div>
            </section>

            {/* Request via Email */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Request Account Deletion via Email
                </h2>
              </div>
              
              <p className="text-foreground leading-relaxed">
                If you cannot access the app, you can request deletion by emailing us at:
              </p>

              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Email:</p>
                  <a 
                    href="mailto:support@5minutesme.com?subject=Delete My Account" 
                    className="text-primary hover:underline text-lg font-medium"
                  >
                    support@5minutesme.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Subject:</p>
                  <p className="text-foreground font-medium">Delete My Account</p>
                </div>
                <p className="text-foreground">
                  We will verify your identity and complete your request within 7 business days.
                </p>
              </div>
            </section>

            {/* Warning Box */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">
                    Important: This action cannot be undone
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Once your account is deleted, all your data will be permanently removed and cannot be recovered. Please make sure you want to proceed before confirming deletion.
                  </p>
                </div>
              </div>
            </div>
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

