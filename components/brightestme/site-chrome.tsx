import Link from "next/link"
import Image from "next/image"
import { BRIGHTESTME } from "@/lib/brightestme"

export function BmHeader() {
  return (
    <header className="bm-header">
      <Link href="/brightestme" className="bm-brand">
        <Image src="/brightestme/brightestme-mark.svg" alt="" width={32} height={32} />
        <span>
          Brightest<span className="bm-strong">Me</span>
        </span>
      </Link>
    </header>
  )
}

export function BmFooter() {
  const email = BRIGHTESTME.supportEmail
  const isPlaceholder = email.startsWith("[")

  return (
    <footer className="bm-footer">
      <nav aria-label="Footer">
        <ul>
          <li>
            BrightestMe by <Link href="/">5MinutesMe</Link>
          </li>
          <li>
            <Link href="/brightestme/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/brightestme/terms">Terms</Link>
          </li>
          <li>
            <Link href="/brightestme/delete-account">Delete account</Link>
          </li>
          <li>
            <Link href="/impressum">Impressum</Link>
          </li>
          <li>
            <Link href="/kontakt">Contact form</Link>
          </li>
          <li>
            Contact:{" "}
            {isPlaceholder ? (
              <span className="bm-placeholder">{email}</span>
            ) : (
              <a href={`mailto:${email}`}>{email}</a>
            )}
          </li>
        </ul>
      </nav>
    </footer>
  )
}
