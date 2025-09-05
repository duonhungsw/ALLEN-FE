import { useState } from "react"

export function useHighlight() {
  const [highlights, setHighlights] = useState<string[]>([])

  const handleTextSelection = (highlightMode: boolean) => {
    if (!highlightMode) return

    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      const selectedText = selection.toString().trim()
      setHighlights((prev) => [...prev, selectedText])

      // Add highlight styling
      const range = selection.getRangeAt(0)
      const span = document.createElement("span")
      span.className = "bg-yellow-200 px-1 rounded"
      span.appendChild(range.extractContents())
      range.insertNode(span)

      selection.removeAllRanges()
    }
  }

  return {
    highlights,
    handleTextSelection,
  }
}
