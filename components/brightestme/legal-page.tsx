import fs from "node:fs/promises"
import path from "node:path"
import Markdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import { BmHeader } from "./site-chrome"

type HastNode = {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

const PLACEHOLDER = /\[[^\]\n]+\]/g
const HAS_PLACEHOLDER = /\[[^\]\n]+\]/

/** Wraps literal [placeholders] left in the text in a span, so they stay visible and easy to spot. */
function rehypePlaceholders() {
  const walk = (node: HastNode) => {
    if (!node.children || node.tagName === "code" || node.tagName === "pre") return
    node.children = node.children.flatMap((child): HastNode[] => {
      if (child.type !== "text" || !child.value || !HAS_PLACEHOLDER.test(child.value)) {
        walk(child)
        return [child]
      }
      const out: HastNode[] = []
      let last = 0
      for (const m of child.value.matchAll(PLACEHOLDER)) {
        if (m.index > last) out.push({ type: "text", value: child.value.slice(last, m.index) })
        out.push({
          type: "element",
          tagName: "span",
          properties: { className: ["bm-placeholder"] },
          children: [{ type: "text", value: m[0] }],
        })
        last = m.index + m[0].length
      }
      if (last < child.value.length) out.push({ type: "text", value: child.value.slice(last) })
      return out
    })
  }
  return (tree: HastNode) => walk(tree)
}

const components: Components = {
  table: ({ children }) => (
    <div className="bm-table-wrap" role="region" aria-label="Table, scrolls sideways" tabIndex={0}>
      <table>{children}</table>
    </div>
  ),
}

export async function LegalPage({ file }: { file: string }) {
  const source = await fs.readFile(path.join(process.cwd(), "content/brightestme", file), "utf8")

  return (
    <>
      <BmHeader />
      <main id="bm-main" className="bm-legal">
        <article className="bm-prose">
          <Markdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypePlaceholders]} components={components}>
            {source}
          </Markdown>
        </article>
      </main>
    </>
  )
}
