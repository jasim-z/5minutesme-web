import type { ReactNode } from "react"
import type { Viewport } from "next"
import localFont from "next/font/local"
import { BmFooter } from "@/components/brightestme/site-chrome"
import "./brightestme.css"

// All fonts are self-hosted: next/font/local bundles them and serves them from this site.
const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces-400.woff", weight: "400", style: "normal" },
    { path: "./fonts/Fraunces-600.woff", weight: "600", style: "normal" },
  ],
  variable: "--bm-font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
})

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--bm-font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
})

export const viewport: Viewport = {
  themeColor: "#0E0F14",
  colorScheme: "dark",
}

export default function BrightestMeLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`bm ${fraunces.variable} ${inter.variable}`}>
      <a href="#bm-main" className="bm-skip">
        Skip to content
      </a>
      {children}
      <BmFooter />
    </div>
  )
}
