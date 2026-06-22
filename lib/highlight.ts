import { codeToHtml } from "shiki"

/**
 * Y2K-themed syntax highlighting using shiki.
 * Uses the rose-pine theme which fits the pastel aesthetic.
 */
export async function highlightCode(
  code: string,
  lang: string = "tsx"
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang,
      theme: "github-light",
      transformers: [
        {
          // Remove the default background from shiki output
          pre(node) {
            node.properties.style = "background: transparent; margin: 0; padding: 0;"
          },
          code(node) {
            node.properties.style = "background: transparent;"
          },
        },
      ],
    })
    return html
  } catch (error) {
    // Fallback: return plain code if highlighting fails
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}