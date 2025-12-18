"use client"

import { useTheme } from "@/components/theme-provider"
import Image from "next/image"
import { useEffect, useState } from "react"

export function AppScreens() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Prevent hydration mismatch
  useEffect(() => {
    // Avoid direct setState in effect body (lint) by scheduling it.
    const id = window.setTimeout(() => setMounted(true), 0)
    return () => window.clearTimeout(id)
  }, [])

  // Image paths based on theme
  // Uses:
  // - /public/images/screens/dark/1.jpg ... 4.jpg
  // - /public/images/screens/light/1.jpg ... 4.jpg
  const images = ["1", "2", "3", "4"] as const

  const imagePath = (name: string) => `/images/screens/${theme}/${name}.jpg`
  console.log(imagePath("1"), "imagePath")

  // Auto-rotate carousel
  useEffect(() => {
    if (!mounted) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [mounted, images.length])

  // Reset to first image when theme changes
  useEffect(() => {
    // Avoid direct setState in effect body (lint) by scheduling it.
    const id = window.setTimeout(() => setCurrentIndex(0), 0)
    return () => window.clearTimeout(id)
  }, [theme])

  if (!mounted) {
    // Return placeholder during SSR to prevent hydration mismatch
    return (
      <div className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-sm">
        <div className="relative bg-card border-2 border-border rounded-[2.25rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-2xl">
          <div className="bg-background rounded-[1.9rem] sm:rounded-[2.5rem] overflow-hidden aspect-[9/19.5] flex items-center justify-center">
            <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <p className="text-muted-foreground text-sm">
                  Loading screens...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[320px] lg:max-w-sm">
      <div className="relative bg-card border-2 border-border rounded-[2.25rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-2xl">
        <div className="bg-background rounded-[1.9rem] sm:rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative">
          {/* Image Carousel */}
          <div className="relative w-full h-full">
            {images.map((name, index) => (
              <div
                key={`${theme}_${name}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={imagePath(name)}
                  alt={`App screen ${name} - ${theme} theme`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-accent/20 rounded-full blur-3xl -z-10"></div>
    </div>
  )
}

