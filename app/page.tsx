import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Apple, Play, Timer, Heart, Sparkles, Shield, Leaf } from "lucide-react"
import { AppScreens } from "@/components/app-screens"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-0">
              <Logo size={32} className="h-8 w-8" />
              <span className="text-xl font-semibold text-foreground">MinutesMe</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Transform Your Life in Just{" "}
                  <span className="text-primary">5 Minutes</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Build meaningful habits and reconnect with what matters. 
                  No judgment, no perfection—just you and five minutes that belong only to you.
                </p>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="h-14 px-8 bg-foreground text-background hover:bg-foreground/90 flex items-center gap-3"
                  asChild
                >
                  <a href="#" className="flex items-center gap-3">
                    <Apple className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-xs leading-none">Download on the</div>
                      <div className="text-lg font-semibold leading-tight">App Store</div>
                    </div>
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border-2 flex items-center gap-3"
                  asChild
                >
                  <a href="#" className="flex items-center gap-3">
                    <Play className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-xs leading-none">Get it on</div>
                      <div className="text-lg font-semibold leading-tight">Google Play</div>
                    </div>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: App Screens */}
            <div className="relative flex justify-center lg:justify-end">
              <AppScreens />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why 5MinutesMe?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A mindful habit companion built for real life—no pressure, just progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg bg-background border border-border space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No Judgment
              </h3>
              <p className="text-muted-foreground">
                You&apos;re not here to be judged. No scores, no failures, and streaks don&apos;t define you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg bg-background border border-border space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                No Perfection Needed
              </h3>
              <p className="text-muted-foreground">
                Starting for 5 minutes is enough. You don&apos;t need perfection—just start.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg bg-background border border-border space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Timer className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Just 5 Minutes
              </h3>
              <p className="text-muted-foreground">
                Five minutes is your safe place. No expectations beyond that—just show up.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-lg bg-background border border-border space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Action First
              </h3>
              <p className="text-muted-foreground">
                This app is different—action first, thinking later. No theory, psychology, or pressure.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-lg bg-background border border-border space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Reconnect with What Matters
              </h3>
              <p className="text-muted-foreground">
                You&apos;re reconnecting with something you love, not &quot;fixing yourself.&quot;
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-lg bg-background border border-border space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Your 5-Minute Doorway
              </h3>
              <p className="text-muted-foreground">
                Think of something that once brought you joy. Give it just five minutes. Every moment counts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download 5MinutesMe today and begin transforming your life, one 5-minute activity at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="h-14 px-8 bg-foreground text-background hover:bg-foreground/90 flex items-center gap-3"
              asChild
            >
              <a href="#" className="flex items-center gap-3">
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs leading-none">Download on the</div>
                  <div className="text-lg font-semibold leading-tight">App Store</div>
                </div>
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 border-2 flex items-center gap-3"
              asChild
            >
              <a href="#" className="flex items-center gap-3">
                <Play className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs leading-none">Get it on</div>
                  <div className="text-lg font-semibold leading-tight">Google Play</div>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </section>

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
