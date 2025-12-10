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
    setMounted(true)
  }, [])

  // Image paths based on theme
  const images = [
    { name: "1", ext: "PNG" },
    { name: "2", ext: "jpeg" },
    { name: "3", ext: "PNG" },
    { name: "4", ext: "PNG" },
  ]

  const imagePath = (name: string, ext: string) => 
    `/images/screens/${theme}/${theme}_${name}.${ext}`

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
    setCurrentIndex(0)
  }, [theme])

  if (!mounted) {
    // Return placeholder during SSR to prevent hydration mismatch
    return (
      <div className="relative w-full max-w-sm">
        <div className="relative bg-card border-2 border-border rounded-[3rem] p-4 shadow-2xl">
          <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19.5] flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
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
    <div className="relative w-full max-w-sm">
      <div className="relative bg-card border-2 border-border rounded-[3rem] p-4 shadow-2xl">
        <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative">
          {/* Image Carousel */}
          <div className="relative w-full h-full">
            {images.map((img, index) => (
              <div
                key={`${theme}_${img.name}`}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={imagePath(img.name, img.ext)}
                  alt={`App screen ${img.name} - ${theme} theme`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            ))}
          </div>
          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/40 hover:bg-primary/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10"></div>
    </div>
  )
}

