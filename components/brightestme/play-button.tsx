import Image from "next/image"
import { BRIGHTESTME } from "@/lib/brightestme"

export function PlayButton() {
  const url = BRIGHTESTME.googlePlayUrl.trim()

  if (!url) {
    return <span className="bm-play-soon">Coming soon to Google Play</span>
  }

  return (
    <a href={url} className="bm-play" rel="noopener">
      <Image
        src="/GetItOnGooglePlay_Badge_Web_color_English.png"
        alt="Get it on Google Play"
        width={478}
        height={140}
        className="bm-play-badge"
      />
    </a>
  )
}
