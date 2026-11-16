import Link from "next/link"

const linkClass =
  "text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"

/** Site-wide footer links: contact form and legal notice (§ 5 DDG). Keep them in every page footer. */
export function LegalLinks({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      <Link href="/kontakt" className={linkClass}>
        Contact
      </Link>
      <Link href="/impressum" className={linkClass}>
        Impressum
      </Link>
    </span>
  )
}
