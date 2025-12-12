"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

type AppBadgesProps = {
  appStoreUrl?: string
  googlePlayUrl?: string
  appStoreAvailable?: boolean
  className?: string
}

export function AppBadges({ 
  appStoreUrl = "#", 
  googlePlayUrl = "https://play.google.com/store/apps/details?id=com.fiveminutesme.app",
  appStoreAvailable = false,
  className = ""
}: AppBadgesProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showMobileTooltip, setShowMobileTooltip] = useState(false)

  useEffect(() => {
    // Prevent hydration mismatch
    if (typeof window !== 'undefined') {
      setMounted(true)
    }
  }, [])

  const handleAppStoreClick = (e: React.MouseEvent) => {
    if (!appStoreAvailable) {
      e.preventDefault()
      // Show tooltip on mobile tap
      setShowMobileTooltip(true)
      // Hide tooltip after 2 seconds
      setTimeout(() => {
        setShowMobileTooltip(false)
      }, 2000)
    }
  }

  // App Store badge - use appropriate version based on theme
  // For dark theme, use white badge (shows better on dark background)
  // For light theme, use black badge (shows better on light background)
  const appStoreBadge = theme === "dark" 
    ? "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83&releaseDate=1276560000"
    : "https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1276560000"

  // Google Play badge - using local image from public folder
  const googlePlayBadge = "/GetItOnGooglePlay_English.png"

  if (!mounted) {
    return (
      <div className={`flex flex-row gap-2 sm:gap-4 justify-center ${className}`}>
        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className="h-14 w-40 bg-muted animate-pulse rounded" />
        </a>
        <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className="h-14 w-40 bg-muted animate-pulse rounded" />
        </a>
      </div>
    )
  }

  return (
    <div className={`flex flex-row gap-2 sm:gap-4 items-center justify-center ${className}`}>
      {/* App Store Badge */}
      {appStoreAvailable ? (
        <a 
          href={appStoreUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-opacity hover:opacity-80 relative shrink-0"
          style={{ height: '50px', width: '150px', minWidth: '150px' }}
        >
          <img
            src={appStoreBadge}
            alt="Download on the App Store"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </a>
      ) : (
        <div className="relative shrink-0 group">
          <div 
            className="block relative opacity-50 cursor-not-allowed"
            style={{ height: '50px', width: '150px', minWidth: '150px' }}
            onClick={handleAppStoreClick}
            title="Coming soon to the App Store"
          >
            <img
              src={appStoreBadge}
              alt="Download on the App Store (Coming Soon)"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          {/* Desktop hover tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 hidden sm:block">
            Coming Soon
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
          </div>
          {/* Mobile tap tooltip */}
          {showMobileTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded whitespace-nowrap z-10 sm:hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              Coming Soon
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
            </div>
          )}
        </div>
      )}

      {/* Google Play Badge */}
      <a 
        href={googlePlayUrl} 
        target="_blank" 
        rel="noopener noreferrer"
          className="block transition-opacity hover:opacity-80 relative shrink-0"
        style={{ height: '50px', width: '150px', minWidth: '150px' }}
      >
        <img
          src={googlePlayBadge}
          alt="Get it on Google Play"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </a>
    </div>
  )
}

