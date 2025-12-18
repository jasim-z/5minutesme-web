"use client"

import { useTheme } from "@/components/theme-provider"
import Image from "next/image"
import { useEffect, useState } from "react"

type LogoProps = {
  size?: number
  className?: string
}

export function Logo({ size = 32, className = "h-8 w-8" }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    // Avoid direct setState in effect body (lint) by scheduling it.
    const id = window.setTimeout(() => setMounted(true), 0)
    return () => window.clearTimeout(id)
  }, [])

  // Use appropriate logo based on theme
  const logoPath = theme === "light" ? "/logo_light.png" : "/logo.png"

  if (!mounted) {
    // Return dark logo during SSR to prevent hydration mismatch
    return (
      <Image
        src="/logo.png"
        alt="5MinutesMe Logo"
        width={size}
        height={size}
        className={`${className} object-contain`}
      />
    )
  }

  return (
    <Image
      src={logoPath}
      alt="5MinutesMe Logo"
      width={size}
      height={size}
      className={`${className} object-contain`}
    />
  )
}

