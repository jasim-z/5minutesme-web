import type { Metadata } from "next"

/**
 * BrightestMe site config.
 *
 * googlePlayUrl: leave empty until the app is public on Google Play.
 * While empty, every Play button shows "Coming soon to Google Play".
 */
export const BRIGHTESTME = {
  googlePlayUrl: "",
  /** Shown in the footer. Remove the square brackets once confirmed to make it a mailto link. */
  supportEmail: "support@5minutesme.com",
} as const

const OG_IMAGE = {
  url: "/brightestme/og-image-1024x500.png",
  width: 1024,
  height: 500,
  alt: "BrightestMe: keep the parts of you that matter glowing.",
}

/** Full per-page metadata for BrightestMe pages (Next replaces, not merges, nested openGraph objects). */
export function brightestMeMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    icons: {
      icon: [
        { url: "/brightestme/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/brightestme/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/brightestme/icon-180.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      siteName: "BrightestMe",
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
