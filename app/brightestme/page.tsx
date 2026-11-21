import Image from "next/image"
import { PlayButton } from "@/components/brightestme/play-button"
import { brightestMeMetadata } from "@/lib/brightestme"

export const metadata = brightestMeMetadata({
  title: "BrightestMe: keep the parts of you that matter glowing",
  description:
    "A calm self-care app for Android. Choose 3 to 5 parts of yourself, tend them one day at a time and watch their light grow. No streaks, no ads, private first.",
  path: "/brightestme",
})

const steps = [
  {
    title: "Choose what matters.",
    body: "Pick 3 to 5 parts of yourself: your health, your creativity, your family, your calm. Together they form your core.",
  },
  {
    title: "Tend them, one day at a time.",
    body: "Hold a part to tend it. Take a walk, call someone, rest, write a page. Its light grows warmer.",
  },
  {
    title: "Watch it take root.",
    body: "Glow rises when you tend and fades slowly when you don’t. Parts you keep tending grow deep roots, so their light stays.",
  },
]

const features = [
  {
    title: "No streaks to break.",
    body: "Missing a day costs you nothing. The light waits for you.",
  },
  {
    title: "Quiet by design.",
    body: "No ads, no feeds, no points or leaderboards. At most one gentle reminder a day.",
  },
  {
    title: "Private first.",
    body: "Works offline, syncs securely in the EU, and analytics stay off unless you turn them on.",
  },
]

export default function BrightestMeHome() {
  return (
    <main id="bm-main">
      <section className="bm-hero" aria-labelledby="bm-title">
        <div className="bm-container">
          <div className="bm-mark">
            <Image src="/brightestme/brightestme-mark.svg" alt="" width={168} height={168} priority />
          </div>
          <h1 id="bm-title" className="bm-title">
            Brightest<span className="bm-strong">Me</span>
          </h1>
          <p className="bm-tagline">Keep the parts of you that matter glowing.</p>
          <p className="bm-line">Treat yourself like someone you are responsible for helping.</p>
          <div className="bm-cta">
            <PlayButton />
          </div>
        </div>
      </section>

      <section className="bm-section" aria-labelledby="bm-how">
        <div className="bm-container">
          <h2 id="bm-how">How it works</h2>
          <ol className="bm-steps">
            {steps.map((step, i) => (
              <li key={step.title} className="bm-step">
                <span className="bm-step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bm-section" aria-labelledby="bm-different">
        <div className="bm-container">
          <h2 id="bm-different">What makes it different</h2>
          <ul className="bm-features">
            {features.map((f) => (
              <li key={f.title} className="bm-card">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bm-closing" aria-labelledby="bm-start">
        <div className="bm-container">
          <h2 id="bm-start">Start with the parts of you that matter most.</h2>
          <div className="bm-cta">
            <PlayButton />
          </div>
          <p className="bm-smallprint">
            BrightestMe is a reflection and habit tool, not therapy or medical care.
          </p>
        </div>
      </section>
    </main>
  )
}
