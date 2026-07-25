import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Admin | 5MinutesMe",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Internal
            </p>
            <h1 className="text-lg font-semibold">5MinutesMe Admin</h1>
          </div>
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Site
          </a>
        </div>
      </div>
      <main className="mx-auto max-w-2xl px-4 py-8">{children}</main>
    </div>
  )
}
